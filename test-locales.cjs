#!/usr/bin/env node
/* eslint-disable */
/**
 * Locale self-check for the NFT mod.
 * Validates that every language file:
 *   1. is valid JSON,
 *   2. has the exact same key set as the English reference (en.json),
 *   3. uses the exact same placeholder tokens ({name}, {slot}, ...) per key,
 *      so runtime substitution can never silently drop a value.
 *
 * Exits with code 1 on any failure.
 */
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "locales");
const REFERENCE = "en";
const PLACEHOLDER_RE = /\{([a-zA-Z_][\w]*)\}/g;

function load(code) {
  const file = path.join(LOCALES_DIR, code + ".json");
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    console.error(`✗ [${code}] JSON parse error: ${e.message}`);
    process.exitCode = 1;
    return null;
  }
  return data;
}

function placeholders(value) {
  const set = new Set();
  if (typeof value !== "string") return set;
  let m;
  while ((m = PLACEHOLDER_RE.exec(value)) !== null) set.add(m[1]);
  return set;
}

const codes = fs
  .readdirSync(LOCALES_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();

console.log(`Checking locale files: ${codes.join(", ")}\n`);

const dicts = {};
let ok = true;
for (const c of codes) {
  const d = load(c);
  if (!d) { ok = false; continue; }
  dicts[c] = d;
}

if (!dicts[REFERENCE]) {
  console.error(`✗ Reference language "${REFERENCE}" is missing or unparseable.`);
  process.exit(1);
}

const refKeys = Object.keys(dicts[REFERENCE]).sort();
const refKeySet = new Set(refKeys);

for (const c of codes) {
  if (c === REFERENCE || !dicts[c]) continue;
  const keys = Object.keys(dicts[c]).sort();

  // 1) key parity
  const missing = refKeys.filter((k) => !(k in dicts[c]));
  const extra = keys.filter((k) => !refKeySet.has(k));
  if (missing.length || extra.length) {
    ok = false;
    if (missing.length) console.error(`✗ [${c}] missing keys: ${missing.join(", ")}`);
    if (extra.length) console.error(`✗ [${c}] extra keys: ${extra.join(", ")}`);
  } else {
    console.log(`✓ [${c}] key count matches (${refKeys.length})`);
  }

  // 2) placeholder parity per key
  for (const k of refKeys) {
    const refPh = placeholders(dicts[REFERENCE][k]);
    const ph = placeholders(dicts[c][k]);
    for (const p of refPh) if (!ph.has(p)) {
      ok = false;
      console.error(`✗ [${c}] key "${k}" is missing placeholder {${p}}`);
    }
    for (const p of ph) if (!refPh.has(p)) {
      ok = false;
      console.error(`✗ [${c}] key "${k}" has unexpected placeholder {${p}}`);
    }
  }
}

// Reference self-consistency
console.log(`\nReference (${REFERENCE}) keys: ${refKeys.length}`);
if (ok) {
  console.log("\n✅ All locale files pass: key parity and placeholder parity OK.");
} else {
  console.error("\n❌ Locale check failed. Fix the files above before building.");
  process.exit(1);
}
