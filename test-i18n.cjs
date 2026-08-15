#!/usr/bin/env node
/* eslint-disable */
/**
 * Runtime check of the SHIPPED i18n engine.
 * Extracts the real NFT_LOCALES data and the real T()/NFT_resolveLang()
 * functions from the built NFT.js (no re-implementation), then asserts:
 *   - EN is returned when TranslationLanguage is EN (or missing),
 *   - the active BC language is honoured (CN, DE, ...),
 *   - unsupported codes fall back to EN,
 *   - {placeholder} tokens are substituted,
 *   - missing keys degrade to the raw key without throwing.
 */
const fs = require("fs");
const path = require("path");

const REPO = __dirname;
const src = fs.readFileSync(path.join(REPO, "NFT.js"), "utf8");

// --- pull the injected locale object ---
const s = src.indexOf("/*__NFT_LOCALES_START__*/");
const e = src.indexOf("/*__NFT_LOCALES_END__*/");
const block = src.slice(s, e);
const objStart = block.indexOf("const NFT_LOCALES =");
const objEnd = block.indexOf(";", objStart);
const objSrc = block.slice(objStart, objEnd + 1);

// --- pull the two real functions via brace matching ---
function extractFn(name) {
  const i = src.indexOf("function " + name);
  if (i < 0) throw new Error("function " + name + " not found");
  let depth = 0, started = false, j = i;
  for (; j < src.length; j++) {
    const c = src[j];
    if (c === "{") { depth++; started = true; }
    else if (c === "}") { depth--; if (started && depth === 0) { j++; break; } }
  }
  return src.slice(i, j);
}
const resolveSrc = extractFn("NFT_resolveLang");
const tSrc = extractFn("T");

// --- build a sandbox exposing a mutable TranslationLanguage ---
const factory = new Function(
  "TranslationLanguage",
  objSrc + "\n" + resolveSrc + "\n" + tSrc +
  "\nreturn { NFT_LOCALES, NFT_resolveLang, T };"
);

let failures = 0;
function check(label, cond) {
  if (cond) console.log("✓ " + label);
  else { console.error("✗ " + label); failures++; }
}

function engine(lang) {
  const TL = lang;
  return factory(TL);
}

// EN baseline
{
  const { T } = engine("EN");
  check("EN: ui.title resolved", T("ui.title") === "✶ Held Item Saver");
  check("EN: tab.save resolved", T("tab.save") === "💾 Save Item");
}

// active language honoured
{
  const { T } = engine("CN");
  check("CN: ui.title translated", T("ui.title") === "✶ 手持道具存档");
  check("CN: save.button translated", T("save.button") === "💾 保存道具");
}

// unsupported code falls back to EN
{
  const { T, NFT_resolveLang } = engine("ES");
  check("ES: resolves to EN", NFT_resolveLang() === "EN");
  check("ES: falls back to EN text", T("ui.title") === "✶ Held Item Saver");
}

// missing TranslationLanguage (undefined) -> EN
{
  const { T } = engine(undefined);
  check("undefined lang -> EN", T("status.ready") === "Ready.");
}

// placeholder substitution
{
  const { T } = engine("CN");
  const out = T("save.saved", { nm: "灯", name: "魔法灯笼", slot: "ItemHandheld" });
  check("CN placeholder substituted", out === '已保存“灯”（魔法灯笼 / ItemHandheld）。');
  check("CN no leftover {tokens}", !/\{/.test(out));
}

// missing key degrades to raw key
{
  const { T } = engine("EN");
  check("missing key -> raw key", T("does.not.exist") === "does.not.exist");
}

// every language resolves every EN key without throwing
{
  const langs = ["EN", "DE", "FR", "RU", "CN", "TW", "UA"];
  const { NFT_LOCALES } = engine("EN");
  const refKeys = Object.keys(NFT_LOCALES.EN);
  let allOk = true;
  for (const l of langs) {
    const { T } = engine(l);
    for (const k of refKeys) {
      const v = T(k);
      if (typeof v !== "string" || v === k && k in NFT_LOCALES.EN === false) { allOk = false; }
    }
  }
  check("all 7 languages resolve all 45 keys", allOk && refKeys.length === 45);
}

if (failures) {
  console.error(`\n❌ ${failures} i18n runtime check(s) failed.`);
  process.exit(1);
}
console.log("\n✅ i18n runtime engine behaves correctly (resolution, fallback, placeholders, missing-key).");
