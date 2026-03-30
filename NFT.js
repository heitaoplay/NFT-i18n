// NFT - Nest of Fluffy Treasures 1.4.0
var bcModSDK = function () { "use strict"; const o = "1.2.0"; function e(o) { alert("Mod ERROR:\n" + o); const e = new Error(o); throw console.error(e), e } const t = new TextEncoder; function n(o) { return !!o && "object" == typeof o && !Array.isArray(o) } function r(o) { const e = new Set; return o.filter((o => !e.has(o) && e.add(o))) } const i = new Map, a = new Set; function c(o) { a.has(o) || (a.add(o), console.warn(o)) } function s(o) { const e = [], t = new Map, n = new Set; for (const r of f.values()) { const i = r.patching.get(o.name); if (i) { e.push(...i.hooks); for (const [e, a] of i.patches.entries()) t.has(e) && t.get(e) !== a && c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e) || ""}\nPatch2:\n${a}`), t.set(e, a), n.add(r.name) } } e.sort(((o, e) => e.priority - o.priority)); const r = function (o, e) { if (0 === e.size) return o; let t = o.toString().replaceAll("\r\n", "\n"); for (const [n, r] of e.entries()) t.includes(n) || c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(o.original, t); let i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, o.name, n), c = r.apply(this, e); return null == a || a(), c }; for (let t = e.length - 1; t >= 0; t--) { const n = e[t], r = i; i = function (e) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, o.name, n.mod), c = n.hook.apply(this, [e, o => { if (1 !== arguments.length || !Array.isArray(e)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`); return r.call(this, o) }]); return null == a || a(), c } } return { hooks: e, patches: t, patchesSources: n, enter: i, final: r } } function l(o, e = !1) { let r = i.get(o); if (r) e && (r.precomputed = s(r)); else { let e = window; const a = o.split("."); for (let t = 0; t < a.length - 1; t++)if (e = e[a[t]], !n(e)) throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const c = e[a[a.length - 1]]; if ("function" != typeof c) throw new Error(`ModSDK: Function ${o} to be patched not found`); const l = function (o) { let e = -1; for (const n of t.encode(o)) { let o = 255 & (e ^ n); for (let e = 0; e < 8; e++)o = 1 & o ? -306674912 ^ o >>> 1 : o >>> 1; e = e >>> 8 ^ o } return ((-1 ^ e) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(c.toString().replaceAll("\r\n", "\n")), d = { name: o, original: c, originalHash: l }; r = Object.assign(Object.assign({}, d), { precomputed: s(d), router: () => { }, context: e, contextProperty: a[a.length - 1] }), r.router = function (o) { return function (...e) { return o.precomputed.enter.apply(this, [e]) } }(r), i.set(o, r), e[r.contextProperty] = r.router } return r } function d() { for (const o of i.values()) o.precomputed = s(o) } function p() { const o = new Map; for (const [e, t] of i) o.set(e, { name: e, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((o => o.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return o } const f = new Map; function u(o) { f.get(o.name) !== o && e(`Failed to unload mod '${o.name}': Not registered`), f.delete(o.name), o.loaded = !1, d() } function g(o, t) { o && "object" == typeof o || e("Failed to register mod: Expected info object, got " + typeof o), "string" == typeof o.name && o.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o.name); let r = `'${o.name}'`; "string" == typeof o.fullName && o.fullName || e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`), r = `'${o.fullName} (${o.name})'`, "string" != typeof o.version && e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`), o.repository || (o.repository = void 0), void 0 !== o.repository && "string" != typeof o.repository && e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`), null == t && (t = {}), t && "object" == typeof t || e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`); const i = !0 === t.allowReplace, a = f.get(o.name); a && (a.allowReplace && i || e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(a)); const c = o => { let e = g.patching.get(o.name); return e || (e = { hooks: [], patches: new Map }, g.patching.set(o.name, e)), e }, s = (o, t) => (...n) => { var i, a; const c = null === (a = (i = m.errorReporterHooks).apiEndpointEnter) || void 0 === a ? void 0 : a.call(i, o, g.name); g.loaded || e(`Mod ${r} attempted to call SDK function after being unloaded`); const s = t(...n); return null == c || c(), s }, p = { unload: s("unload", (() => u(g))), hookFunction: s("hookFunction", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); "number" != typeof t && e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`), "function" != typeof n && e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`); const s = { mod: g.name, priority: t, hook: n }; return a.hooks.push(s), d(), () => { const o = a.hooks.indexOf(s); o >= 0 && (a.hooks.splice(o, 1), d()) } })), patchFunction: s("patchFunction", ((o, t) => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const i = l(o), a = c(i); n(t) || e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`); for (const [n, i] of Object.entries(t)) "string" == typeof i ? a.patches.set(n, i) : null === i ? a.patches.delete(n) : e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`); d() })), removePatches: s("removePatches", (o => { "string" == typeof o && o || e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`); const t = l(o); c(t).patches.clear(), d() })), callOriginal: s("callOriginal", ((o, t, n) => { "string" == typeof o && o || e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`); const i = l(o); return Array.isArray(t) || e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`), i.original.apply(null != n ? n : globalThis, t) })), getOriginalHash: s("getOriginalHash", (o => { "string" == typeof o && o || e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`); return l(o).originalHash })) }, g = { name: o.name, fullName: o.fullName, version: o.version, repository: o.repository, allowReplace: i, api: p, loaded: !0, patching: new Map }; return f.set(o.name, g), Object.freeze(p) } function h() { const o = []; for (const e of f.values()) o.push({ name: e.name, fullName: e.fullName, version: e.version, repository: e.repository }); return o } let m; const y = void 0 === window.bcModSdk ? window.bcModSdk = function () { const e = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) }; return m = e, Object.freeze(e) }() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();
//Bondage Club Mod Script Development Kit (1.2.0) for more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
const NFTver = "1.4.0";
const NFT_API = bcModSDK.registerMod({
    name: 'NFT',
    fullName: 'Nest of Fluffy Treasures',
    version: NFTver,
    repository: 'https://gitgud.io/NicoleBC/nest-of-fluffy-treasures'
});

const SUPPORTED_SLOTS = ["ItemHandheld", "ItemMisc"];
const STORAGE_KEY     = "BC_ItemSaver_HeldV1";
const BTN_POS_KEY     = "BC_ItemSaver_BtnPos";
const UI_ID           = "bc-item-saver";
const BTN_SIZE        = 46;

// â”€â”€â”€ Storage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const store = {
    load: () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; } },
    save: (d) => localStorage.setItem(STORAGE_KEY, JSON.stringify(d)),
};

// â”€â”€â”€ Serialise â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function serializeItem(item, slotName) {
    if (!item) return null;
    const cl = (v) => (v !== undefined ? JSON.parse(JSON.stringify(v)) : undefined);
    return {
        Asset:      { Group: slotName, Name: item.Asset?.Name ?? null },
        Color:      cl(item.Color),
        Difficulty: item.Difficulty,
        Property:   cl(item.Property),
        Craft:      cl(item.Craft),
        _savedAt:   new Date().toISOString(),
    };
}

// â”€â”€â”€ Apply snapshot â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function applySnapshot(snap) {
    const { Group, Name } = snap.Asset ?? {};
    if (!Group || !Name) return { ok: false, msg: "Snapshot missing asset info." };
    const player = Player;
    if (!player) return { ok: false, msg: "Player not found." };
    const existing = InventoryGet(player, Group);
    if (!existing || existing.Asset?.Name !== Name) {
        InventoryWear(player, Name, Group, snap.Color ?? "Default");
    }
    const item = InventoryGet(player, Group);
    if (!item) return { ok: false, msg: `Could not equip "${Name}" in "${Group}". Asset may not exist.` };
    if (snap.Color      !== undefined) item.Color      = JSON.parse(JSON.stringify(snap.Color));
    if (snap.Difficulty !== undefined) item.Difficulty = snap.Difficulty;
    if (snap.Property   !== undefined) item.Property   = JSON.parse(JSON.stringify(snap.Property));
    if (snap.Craft      !== undefined) item.Craft      = JSON.parse(JSON.stringify(snap.Craft));
    CharacterLoadCanvas(player);
    return { ok: true, msg: `Applied "${snap.Craft?.Name ?? Name}" to ${Group}.` };
}

// â”€â”€â”€ UI helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function el(tag, styleStr, props = {}) {
    const e = document.createElement(tag);
    if (styleStr) e.style.cssText = styleStr;
    Object.assign(e, props);
    return e;
}

function btn(text, extraStyle = "", onClick) {
    const b = el("button",
        `background:rgba(128,128,128,0.15);border:1px solid rgba(255,255,255,0.2);
        border-radius:8px;color:#dcc8ff;cursor:pointer;font-size:13px;font-weight:600;
        padding:9px 16px;transition:background .15s;${extraStyle}`
    );
    b.textContent = text;
    b.onmouseenter = () => (b.style.background = "rgba(255,255,255,0.18)");
    b.onmouseleave = () => (b.style.background = "rgba(255,255,255,0.08)");
    if (onClick) b.onclick = onClick;
    return b;
}

function selectEl(extraStyle = "") {
    return el("select",
        `width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#f0f0f0;
        padding:8px 10px;font-size:13px;margin-bottom:12px;outline:none;${extraStyle}`
    );
}

function inputEl(placeholder) {
    const i = el("input",
        `width:100%;box-sizing:border-box;background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#f0f0f0;
        padding:8px 10px;font-size:13px;margin-bottom:12px;outline:none;`
    );
    i.placeholder = placeholder;
    return i;
}

function lbl(text) {
    return el("div",
        `font-size:11px;text-transform:uppercase;letter-spacing:1px;
        color:#888888;margin-bottom:5px;margin-top:2px;`,
        { textContent: text }
    );
}

function note(text, bg = "rgba(255,255,255,0.05)") {
    return el("div",
        `background:${bg};border:1px solid rgba(255,255,255,0.1);border-radius:8px;
        padding:10px 14px;font-size:12px;color:#cccccc;line-height:1.65;margin-bottom:14px;`,
        { textContent: text }
    );
}

function setStatus(bar, msg, type = "ok") {
    bar.textContent = msg;
    bar.style.color = type === "ok" ? "#86efac" : type === "error" ? "#fca5a5" : "#fde68a";
}

// â”€â”€â”€ Slot toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function slotToggle(onChange) {
    let selected = SUPPORTED_SLOTS[0];
    const wrap = el("div", `display:flex;gap:8px;margin-bottom:14px;`);
    const colors = {
        ItemHandheld: { active: "rgba(99,200,130,0.3)",  border: "rgba(99,200,130,0.7)",  text: "#a8f0be" },
        ItemMisc:     { active: "rgba(99,160,255,0.3)",  border: "rgba(99,160,255,0.7)",  text: "#a8d0ff" },
    };
    const inactive = "rgba(255,255,255,0.04)";
    const inactiveBorder = "rgba(255,255,255,0.12)";
    const buttons = {};
    SUPPORTED_SLOTS.forEach(slot => {
        const c = colors[slot];
        const b = el("button",
            `flex:1;padding:10px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;
            border:2px solid;transition:all .15s;letter-spacing:.3px;`
        );
        b.textContent = slot;
        b.onclick = () => {
            selected = slot;
            SUPPORTED_SLOTS.forEach(s => {
                buttons[s].style.background  = s === slot ? colors[s].active  : inactive;
                buttons[s].style.borderColor = s === slot ? colors[s].border  : inactiveBorder;
                buttons[s].style.color       = s === slot ? colors[s].text    : "#555555";
            });
            if (onChange) onChange(slot);
        };
        b.style.background  = slot === selected ? c.active  : inactive;
        b.style.borderColor = slot === selected ? c.border  : inactiveBorder;
        b.style.color       = slot === selected ? c.text    : "#8f7fbf";
        buttons[slot] = b;
        wrap.appendChild(b);
    });
    return { container: wrap, getSlot: () => selected };
}

// â”€â”€â”€ Preview renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderPreview(snap, box) {
    if (!snap) { box.textContent = "Nothing in this slot."; return; }
    const c = snap.Craft;
    const lines = [
        `Asset    : ${snap.Asset?.Name ?? "\u2014"}`,
        `Slot     : ${snap.Asset?.Group ?? "\u2014"}`,
        `Colour   : ${Array.isArray(snap.Color) ? snap.Color.join(", ") : (snap.Color ?? "Default")}`,
    ];
    if (c) {
        lines.push("\u2500\u2500 Craft \u2500\u2500");
        if (c.Name)        lines.push(`  Name     : ${c.Name}`);
        if (c.MemberName)  lines.push(`  Crafter  : ${c.MemberName} (#${c.MemberNumber ?? "?"})`);
        if (c.Description) lines.push(`  Desc     : ${c.Description}`);
        if (c.Color)       lines.push(`  Color    : ${c.Color}`);
        if (c.Property)    lines.push(`  Property : ${c.Property}`);
    }
    if (snap.Property && Object.keys(snap.Property).length) {
        lines.push("\u2500\u2500 Extended props \u2500\u2500");
        for (const [k, v] of Object.entries(snap.Property))
            lines.push(`  ${k}: ${JSON.stringify(v)}`);
    }
    box.textContent = lines.join("\n");
}

// â”€â”€â”€ Save list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function fillSaveSelect(sel) {
    sel.innerHTML = "";
    const saves = store.load();
    const keys = Object.keys(saves).sort((a, b) =>
        (saves[b].snap?._savedAt ?? "").localeCompare(saves[a].snap?._savedAt ?? "")
    );
    if (!keys.length) {
        const o = document.createElement("option");
        o.value = ""; o.disabled = true; o.textContent = "\u2014 no saves yet \u2014";
        sel.appendChild(o);
        return;
    }
    keys.forEach(k => {
        const e = saves[k];
        const d = e.snap?._savedAt ? new Date(e.snap._savedAt).toLocaleDateString() : "?";
        const o = document.createElement("option");
        o.value = k;
        o.textContent = `[${e.snap?.Asset?.Group ?? "?"}]  ${e.label}  \u2014 ${e.snap?.Asset?.Name ?? "?"}  (${d})`;
        sel.appendChild(o);
    });
}

// â”€â”€â”€ JSON export / import â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function exportJSON() {
    const blob = new Blob([JSON.stringify(store.load(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "BC_HeldItemSaves.json";
    a.click();
    URL.revokeObjectURL(a.href);
}

function importJSON(file, onDone) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const incoming = JSON.parse(e.target.result);
            const merged = { ...incoming, ...store.load() };
            store.save(merged);
            onDone(null, Object.keys(incoming).length);
        } catch (err) { onDone(err.message); }
    };
    reader.readAsText(file);
}



// â”€â”€â”€ Main UI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openUI() {
    if (document.getElementById(UI_ID)) return;

    const backdrop = el("div",
        `position:fixed;inset:0;z-index:99999;display:flex;align-items:center;
        justify-content:center;background:rgba(0,0,0,0.62);backdrop-filter:blur(4px);
        font-family:'Segoe UI',system-ui,sans-serif;`
    );
    backdrop.id = UI_ID + "-backdrop";
    backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };

    const panel = el("div",
        `background:linear-gradient(155deg,#1a1a1a 0%,#0d0d0d 100%);
        border:1px solid rgba(255,255,255,0.15);border-radius:14px;
        box-shadow:0 0 40px rgba(255,255,255,0.05),0 24px 64px rgba(0,0,0,0.85);
        width:min(95vw,640px);max-height:90vh;
        display:flex;flex-direction:column;overflow:hidden;color:#f0f0f0;`
    );
    panel.id = UI_ID;

    // Header
    const header = el("div",
        `padding:16px 20px 13px;border-bottom:1px solid rgba(255,255,255,0.1);
        display:flex;align-items:center;gap:10px;`
    );
    const titleEl = el("span",
        `font-size:17px;font-weight:700;flex:1;letter-spacing:.4px;
        background:linear-gradient(90deg,#ffffff,#aaaaaa);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;`,
        { textContent: "\u2736 Held Item Saver" }
    );
    const closeB = btn("\u2715", "padding:4px 10px;font-size:14px;");
    closeB.onclick = () => backdrop.remove();
    header.append(titleEl, closeB);

    // Tabs
    const tabBar = el("div",
        `display:flex;border-bottom:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.3);`
    );
    const tabBtns  = {};
    const tabPanes = {};

    ["save", "load"].forEach((id, i) => {
        const tb = el("button",
            `flex:1;padding:11px;background:none;border:none;cursor:pointer;font-size:13px;
            font-weight:600;transition:all .2s;
            color:${i === 0 ? "#ffffff" : "#666666"};
            border-bottom:${i === 0 ? "2px solid #ffffff" : "2px solid transparent"};`
        );
        tb.textContent = id === "save" ? "\uD83D\uDCBE  Save Item" : "\uD83D\uDCE6  Load / Manage";
        tb.onclick = () => {
            Object.entries(tabBtns).forEach(([tid, b]) => {
                b.style.color        = tid === id ? "#ffffff" : "#666666";
                b.style.borderBottom = tid === id ? "2px solid #ffffff" : "2px solid transparent";
            });
            Object.entries(tabPanes).forEach(([tid, p]) => { p.style.display = tid === id ? "" : "none"; });
            if (id === "load") fillSaveSelect(saveSel);
        };
        tabBtns[id] = tb;
        tabBar.appendChild(tb);
    });

    const body = el("div", `flex:1;overflow-y:auto;padding:18px 20px;`);

    // â”€â”€ Save Pane â”€â”€
    const savePane = el("div");
    tabPanes.save = savePane;

    savePane.appendChild(lbl("Which slot do you want to save?"));

    const savePreview = el("div",
        `background:rgba(0,0,0,0.3);border-radius:8px;padding:12px 14px;font-size:12px;
        line-height:1.7;color:#dddddd;margin-bottom:14px;white-space:pre-wrap;
        word-break:break-all;min-height:72px;`
    );

    function refreshSavePreview(slot) {
        const item = Player ? InventoryGet(Player, slot) : null;
        if (!item) {
            savePreview.textContent = `Slot ${slot} is currently empty.`;
            savePreview.style.color = "#c07060";
        } else {
            savePreview.style.color = "#dddddd";
            renderPreview(serializeItem(item, slot), savePreview);
        }
    }

    const { container: toggleWrap, getSlot } = slotToggle((slot) => refreshSavePreview(slot));
    savePane.appendChild(toggleWrap);
    refreshSavePreview(getSlot());

    savePane.appendChild(note("Current item in selected slot:"));
    savePane.appendChild(savePreview);

    savePane.appendChild(lbl("Save name"));
    const nameIn = inputEl("e.g. My enchanted lantern");
    savePane.appendChild(nameIn);

    const saveB = btn("\uD83D\uDCBE  Save Item", "width:100%;padding:11px;margin-top:4px;");
    saveB.onclick = () => {
        const slot = getSlot();
        const nm   = nameIn.value.trim();
        if (!nm) return setStatus(statusBar, "\u26A0 Enter a save name.", "warn");
        const it = InventoryGet(Player, slot);
        if (!it) return setStatus(statusBar, `\u2715 Slot ${slot} is empty \u2014 nothing to save.`, "error");
        const snap  = serializeItem(it, slot);
        const saves = store.load();
        saves[nm + "__" + Date.now()] = { label: nm, snap };
        store.save(saves);
        nameIn.value = "";
        setStatus(statusBar, `\u2713 Saved "${nm}" (${snap.Asset.Name} / ${slot}).`, "ok");
    };
    savePane.appendChild(saveB);

    // â”€â”€ Load Pane â”€â”€
    const loadPane = el("div", "display:none;");
    tabPanes.load = loadPane;

    loadPane.appendChild(note("Pick a save, check the preview, then apply it."));

    loadPane.appendChild(lbl("Saved items"));
    const saveSel = selectEl();
    fillSaveSelect(saveSel);
    loadPane.appendChild(saveSel);

    const loadPreview = el("div",
        `background:rgba(0,0,0,0.3);border-radius:8px;padding:12px 14px;font-size:12px;
        line-height:1.7;color:#dddddd;margin-bottom:14px;white-space:pre-wrap;
        word-break:break-all;min-height:90px;`,
        { textContent: "Select a save to preview\u2026" }
    );
    loadPane.appendChild(loadPreview);

    saveSel.onchange = () => {
        const snap = store.load()[saveSel.value]?.snap ?? null;
        if (snap) { loadPreview.style.color = "#dddddd"; renderPreview(snap, loadPreview); }
        else loadPreview.textContent = "Select a save to preview\u2026";
    };

    loadPane.appendChild(lbl("Apply to slot (auto from save)"));
    const slotOverride = selectEl();
    [["", "Auto (use slot from save)"], ...SUPPORTED_SLOTS.map(s => [s, s])].forEach(([v, t]) => {
        const o = document.createElement("option");
        o.value = v; o.textContent = t;
        slotOverride.appendChild(o);
    });
    loadPane.appendChild(slotOverride);

    const actionRow = el("div", `display:flex;gap:8px;margin-top:4px;`);

    const applyB = btn("\uD83D\uDCE6  Apply", "flex:1;padding:11px;");
    applyB.onclick = () => {
        const entry = store.load()[saveSel.value];
        if (!entry) return setStatus(statusBar, "\u26A0 Select a save first.", "warn");
        let snap = entry.snap;
        if (slotOverride.value) snap = { ...snap, Asset: { ...snap.Asset, Group: slotOverride.value } };
        const { ok, msg } = applySnapshot(snap);
        setStatus(statusBar, (ok ? "\u2713 " : "\u2715 ") + msg, ok ? "ok" : "error");
    };

    const delB = btn("\uD83D\uDDD1  Delete",
        `flex:0 0 auto;padding:11px 16px;
        background:rgba(180,30,60,0.3);border-color:rgba(255,80,100,0.4);`
    );
    delB.onmouseenter = () => (delB.style.background = "rgba(180,30,60,0.55)");
    delB.onmouseleave = () => (delB.style.background = "rgba(180,30,60,0.3)");
    delB.onclick = () => {
        const key = saveSel.value;
        if (!key) return setStatus(statusBar, "\u26A0 Select a save first.", "warn");
        const saves = store.load();
        const label = saves[key]?.label ?? key;
        delete saves[key];
        store.save(saves);
        fillSaveSelect(saveSel);
        loadPreview.textContent = "Select a save to preview\u2026";
        setStatus(statusBar, `\uD83D\uDDD1 Deleted "${label}".`, "warn");
    };

    actionRow.append(applyB, delB);
    loadPane.appendChild(actionRow);

    // Import / Export
    const ioRow = el("div",
        `display:flex;gap:8px;margin-top:16px;padding-top:14px;
        border-top:1px solid rgba(255,255,255,0.08);`
    );
    const exportB = btn("\u2B06 Export JSON", "flex:1;font-size:12px;padding:8px;");
    exportB.onclick = () => { exportJSON(); setStatus(statusBar, "\u2713 JSON downloaded.", "ok"); };

    const importLbl = el("label",
        `flex:1;display:flex;align-items:center;justify-content:center;
        background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);
        border-radius:8px;color:#dcc8ff;cursor:pointer;font-size:12px;font-weight:600;
        padding:8px 16px;transition:background .15s;`,
        { textContent: "\u2B07 Import JSON" }
    );
    importLbl.onmouseenter = () => (importLbl.style.background = "rgba(255,255,255,0.18)");
    importLbl.onmouseleave = () => (importLbl.style.background = "rgba(255,255,255,0.08)");
    const fileIn = el("input", "display:none;");
    fileIn.type = "file"; fileIn.accept = ".json";
    fileIn.onchange = () => {
        if (!fileIn.files[0]) return;
        importJSON(fileIn.files[0], (err, count) => {
            if (err) return setStatus(statusBar, `\u2715 Import failed: ${err}`, "error");
            fillSaveSelect(saveSel);
            setStatus(statusBar, `\u2713 Imported ${count} save(s). Existing saves kept.`, "ok");
        });
        fileIn.value = "";
    };
    importLbl.appendChild(fileIn);
    ioRow.append(exportB, importLbl);
    loadPane.appendChild(ioRow);

    body.append(savePane, loadPane);

    const statusBar = el("div",
        `padding:9px 20px;border-top:1px solid rgba(255,255,255,0.08);
        font-size:12px;color:#777777;min-height:34px;background:rgba(0,0,0,0.25);`,
        { textContent: "Ready." }
    );

    panel.append(header, tabBar, body, statusBar);
    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);
}

// â”€â”€â”€ Draggable floating button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function addTriggerButton() {
    if (document.getElementById(UI_ID + "-trigger")) return;

    const b = document.createElement("button");
    b.id    = UI_ID + "-trigger";
    b.title = "NFT â€” Nest of Fluffy Treasures";
    b.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASsSURBVFhH1VdbKKVrGHbKOJ/lUExyKkIuMBnnw4TIWc6liCKRwQUmp2YuZESKQhFCTnGDkuKCC0JciJRDMVJcGIqw3t3z1r9a659/MbPbbXs/9dW//u973+95z/9Sk8lkhzKZ7OqN1qGaTCb7SW8E3A0CV+KNfwu4+/9H4MePHzQ9PU0NDQ1UWFhIBQUFVF1dTf39/bS/vy8+/iL+iMD6+jplZWWRrq4uqampqVxhYWE0MzMjFpfEbxG4v7+n0tJS+QXm5uaUlpZG3d3dNDs7S3Nzc9Tb28uesLW1lZ+Lj4+ns7MzsTolvErg+vqaPn78yApheUpKCo2MjPDe0dERnZ+f08PDg/z87e0tdXV1kYWFBcvY29vT7u6ugkZlvEgAln/48EFuUXJyMo2NjdHKygptbW2RgYEBffv2jfLy8ujx8VFJ9uTkhPz8/FjO2tqaf0vhRQJFRUWs4N27d5STk0NNTU2cdIuLi+Tj48OhgFfwLIWbmxvy9PRkHf7+/vT8/Cw+oprA6uqq3HJnZ2fy8vIiOzs7Ojw85BDgfXFxMRkaGpK+vr7KWO/t7ZGOjg6fR86IoZJATEyMnICbmxtZWVnx5YODg/T+/Xt+D2/ExsaSsbExBQcHQ5lYDUNIYMgp5gsgSeD09JS0tLRYCCUFD6Dmv3z5QiEhIaStrU2amppkampKNjY2FBcXRw4ODlRbW6uoRo6dnR1SV1dnfQsLC0p7kgSGh4f5sKWlJeXn55Oenh6lp6ezxZ8+fWJCcD2sr6mpYZK5ubm8JwXEHgSh8/Pnz0p7kgTQ1XA4OjqaAgMD2VokU1VVFZWVlbEXhPDA9QkJCfyMXDg+PlZUJYcgExUVpfRekgCsxuHU1FQKDQ1lAgEBAXw5KsDV1ZX30Wjq6uo4xiCKd8j2u7s7RXWM8PBw3hdXjCQBdDThgpKSEtLQ0KCgoCB2Hyz09vbmjoeyjIiI4PaMUCAEkEPFoIoU4eLiwnu+vr5K7yUJIJlwODIyklpbW9kDiDtCMDAwQPX19dwbTExMOCEzMzM5RwQvIOHQmgVgQEEH9pCwipAkMD4+zocdHR156pmZmbEXUAlIuKurK+6COOPh4cEyFxcX1NfXR42Njb90vfLycnnOwFOKkCSAcQsLIbC8vMyhwHNGRgYvkFpaWuJ3OAevqMLm5iZ7SSAAfYqQJAAkJSWxABIRl6Hlwo1tbW2cydvb2zQ1NcVhgGeksLa2xg1MuBxhFM8MlQQ2NjbkgkNDQzQ6OsrPGCyILwZTe3s7hwtdE6ulpYUmJiaop6eHEhMTuVegSwpNCB8sYqgkAKDsIAjrMQGF6kBj6ujooObmZsrOzuZkFchiIT/QQ7AnjGWUsxReJAB3CQ0EJL5//85LGLP4TkCVYD6ge8JTyIfOzk6uDGEIYQYgr6TwIgEAIxWZL1iHuscF+A4AOSMjI7YYzcnd3V0p5lhOTk50cHAgVivHqwSAp6cnqqys5FIUFGMQob8jCRUvVFz4bLu8vBSrU8JvERCAzMfXjxBXqYVQodmIp54q/BEBAWhE8/PzHP+KigpuNF+/fqXJyclfmtBr+FsE/kn8Zwi8+Z/TN/17/heq/Kgp31FL5AAAAABJRU5ErkJggg==" style="width:34px;height:34px;object-fit:contain;pointer-events:none;filter:invert(1);" />';

    Object.assign(b.style, {
        position:     "fixed",
        zIndex:       "99997",
        width:        BTN_SIZE + "px",
        height:       BTN_SIZE + "px",
        borderRadius: "8px",
        background:   "linear-gradient(135deg,#222222,#111111)",
        border:       "2px solid rgba(255,255,255,0.3)",
        boxShadow:    "0 4px 20px rgba(0,0,0,0.6)",
        color:        "white",
        fontSize:     "20px",
        cursor:       "grab",
        userSelect:   "none",
        touchAction:  "none",
        transition:   "box-shadow .15s",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        padding:      "0",
    });

    // Clamp position inside viewport
    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    function applyPos(x, y) {
        b.style.left   = clamp(x, 0, window.innerWidth  - BTN_SIZE) + "px";
        b.style.top    = clamp(y, 0, window.innerHeight - BTN_SIZE) + "px";
        b.style.right  = "auto";
        b.style.bottom = "auto";
    }

    // Restore or default position
    const saved = (() => { try { return JSON.parse(localStorage.getItem(BTN_POS_KEY)); } catch { return null; } })();
    if (saved?.x != null) {
        applyPos(saved.x, saved.y);
    } else {
        applyPos(window.innerWidth - BTN_SIZE - 18, window.innerHeight - BTN_SIZE - 80);
    }

    // Drag state â€” mouseDown tracks whether the button is actually held
    let mouseDown = false;
    let dragging  = false;
    let startX, startY, startLeft, startTop;

    b.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        mouseDown = true;
        dragging  = false;
        startX    = e.clientX;
        startY    = e.clientY;
        startLeft = parseInt(b.style.left);
        startTop  = parseInt(b.style.top);
        b.setPointerCapture(e.pointerId);
        b.style.transition = "none";
    });

    b.addEventListener("pointermove", (e) => {
        // Only drag if mouse button is actually held down
        if (!mouseDown) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        // Require 5px movement to avoid accidental drags on normal clicks
        if (!dragging && Math.hypot(dx, dy) < 5) return;
        if (!dragging) {
            dragging = true;
            b.style.cursor    = "grabbing";
            b.style.transform = "scale(1.1)";
        }
        applyPos(startLeft + dx, startTop + dy);
    });

    b.addEventListener("pointerup", () => {
        mouseDown          = false;
        b.style.cursor     = "grab";
        b.style.transition = "box-shadow .15s";
        b.style.transform  = "";
        if (dragging) {
            localStorage.setItem(BTN_POS_KEY, JSON.stringify({
                x: parseInt(b.style.left),
                y: parseInt(b.style.top),
            }));
        } else {
            openUI();
        }
        dragging = false;
    });

    // Reset if pointer leaves the capture area unexpectedly
    b.addEventListener("pointercancel", () => {
        mouseDown = false;
        dragging  = false;
        b.style.cursor     = "grab";
        b.style.transition = "box-shadow .15s";
        b.style.transform  = "";
    });

    b.onmouseenter = () => { if (!dragging) b.style.boxShadow = "0 6px 30px rgba(255,255,255,0.15)"; };
    b.onmouseleave = () => { b.style.boxShadow = "0 4px 20px rgba(0,0,0,0.6)"; };

    // Keep inside viewport on window resize
    window.addEventListener("resize", () => applyPos(parseInt(b.style.left), parseInt(b.style.top)));

    document.body.appendChild(b);
}

// â”€â”€â”€ Init â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function waitForGame() {
    if (typeof Player !== "undefined" && typeof InventoryGet !== "undefined") {
        addTriggerButton();
    } else {
        setTimeout(waitForGame, 1000);
    }
}

function initNFT() {
    waitForGame();
}
initNFT();
