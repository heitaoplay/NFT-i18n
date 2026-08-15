#!/usr/bin/env node
/* eslint-disable */
/**
 * Build step for the NFT mod.
 *
 *  - Reads locales/*.json (flat dot-keys, BC language codes).
 *  - Validates key parity and placeholder parity across all languages.
 *  - Escapes every non-ASCII character to \uXXXX so the deployed single
 *    file is pure ASCII (immune to charset/mojibake issues on any host).
 *  - Injects the resulting dictionary between the sentinels in NFT.js.
 *  - Generates NFT-dev.js from NFT.js (only the mod name differs), so the
 *    two files can never drift apart again.
 *
 * Run: node build.cjs
 */
const fs = require("fs");
const path = require("path");

const REPO = __dirname;
const LOCALES_DIR = path.join(REPO, "locales");
const NFT_JS = path.join(REPO, "NFT.js");
const NFT_DEV_JS = path.join(REPO, "NFT-dev.js");

const CODES = ["EN", "DE", "FR", "RU", "CN", "TW", "UA"];
const REFERENCE = "EN";
const PLACEHOLDER_RE = /\{([a-zA-Z_][\w]*)\}/g;

function load(code) {
  return JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, code + ".json"), "utf8"));
}

function placeholders(value) {
  const set = new Set();
  if (typeof value !== "string") return set;
  let m;
  while ((m = PLACEHOLDER_RE.exec(value)) !== null) set.add(m[1]);
  return set;
}

// Validate parity before building — fail fast on a broken locale.
function validate(dicts) {
  const refKeys = Object.keys(dicts[REFERENCE]).sort();
  const refKeySet = new Set(refKeys);
  let ok = true;
  for (const c of CODES) {
    if (c === REFERENCE) continue;
    const keys = Object.keys(dicts[c]).sort();
    const missing = refKeys.filter((k) => !(k in dicts[c]));
    const extra = keys.filter((k) => !refKeySet.has(k));
    if (missing.length || extra.length) {
      ok = false;
      if (missing.length) console.error(`✗ [${c}] missing keys: ${missing.join(", ")}`);
      if (extra.length) console.error(`✗ [${c}] extra keys: ${extra.join(", ")}`);
    }
    for (const k of refKeys) {
      const refPh = placeholders(dicts[REFERENCE][k]);
      const ph = placeholders(dicts[c][k]);
      for (const p of refPh) if (!ph.has(p)) { ok = false; console.error(`✗ [${c}] "${k}" missing {${p}}`); }
      for (const p of ph) if (!refPh.has(p)) { ok = false; console.error(`✗ [${c}] "${k}" unexpected {${p}}`); }
    }
  }
  if (!ok) {
    console.error("\n❌ Locale validation failed. Fix locales before building.");
    process.exit(1);
  }
  console.log(`✓ Locale validation passed (${refKeys.length} keys × ${CODES.length} languages).`);
}

// Serialise a string as a JS string literal, escaping everything >= 0x80.
function toJsString(s) {
  let out = '"';
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (ch === '"' || ch === "\\") out += "\\" + ch;
    else if (cp === 0x0a) out += "\\n";
    else if (cp === 0x0d) out += "\\r";
    else if (cp === 0x09) out += "\\t";
    else if (cp < 0x80) out += ch;
    else if (cp <= 0xffff) out += "\\u" + cp.toString(16).padStart(4, "0");
    else {
      const v = cp - 0x10000;
      const hi = 0xd800 + (v >> 10);
      const lo = 0xdc00 + (v & 0x3ff);
      out += "\\u" + hi.toString(16).padStart(4, "0") + "\\u" + lo.toString(16).padStart(4, "0");
    }
  }
  out += '"';
  return out;
}

function buildLocales(dicts) {
  let out = "const NFT_LOCALES = {\n";
  for (const code of CODES) {
    const dict = dicts[code];
    out += "  " + JSON.stringify(code) + ": {\n";
    for (const [k, v] of Object.entries(dict)) {
      out += "    " + JSON.stringify(k) + ": " + toJsString(v) + ",\n";
    }
    out += "  },\n";
  }
  out += "};";
  return out;
}

const START = "/*__NFT_LOCALES_START__*/";
const END = "/*__NFT_LOCALES_END__*/";

function inject(content, block) {
  const i = content.indexOf(START);
  const j = content.indexOf(END);
  if (i < 0 || j < 0) {
    console.error("✗ Sentinels not found in NFT.js — cannot inject locales.");
    process.exit(1);
  }
  return content.slice(0, i + START.length) + "\n" + block + "\n" + content.slice(j);
}

function main() {
  const dicts = {};
  for (const c of CODES) dicts[c] = load(c);
  validate(dicts);

  const block = buildLocales(dicts);
  // Read as UTF-8 and drop a leading BOM so the deployed file is clean ASCII.
  const built = inject(fs.readFileSync(NFT_JS, "utf8").replace(/^\uFEFF/, ""), block);

  // Guard against accidental double-injection (string count, not regex).
  const startCount = built.split(START).length - 1;
  const endCount = built.split(END).length - 1;
  if (startCount !== 1 || endCount !== 1) {
    console.error(`✗ Unexpected sentinel count after injection (start=${startCount}, end=${endCount}).`);
    process.exit(1);
  }

  fs.writeFileSync(NFT_JS, built, "utf8");
  console.log("✓ Injected locales into NFT.js");

  // NFT-dev.js: identical, except the mod name carries a "- DEV" suffix.
  const dev = built.replace("name: 'NFT',", "name: 'NFT - DEV',");
  if (dev === built) {
    console.error("✗ Could not find mod name to rewrite for NFT-dev.js.");
    process.exit(1);
  }
  fs.writeFileSync(NFT_DEV_JS, dev, "utf8");
  console.log("✓ Generated NFT-dev.js from NFT.js");

  // Report how many source characters were escaped (encoding safety check).
  const nonAscii = (built.match(/[^\x00-\x7F]/g) || []).length;
  console.log(`✓ Deployed NFT.js is ${nonAscii === 0 ? "100% ASCII" : nonAscii + " non-ASCII chars remaining"} (encoding-safe).`);
}

main();
