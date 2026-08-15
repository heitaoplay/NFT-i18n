# NFT — Nest of Fluffy Treasures

A Bondage Club mod that lets you **save and reload `ItemHandheld` / `ItemMisc` items**
with their full appearance, crafter info and properties, so you can swap favourite
props in and out of your slots without losing how they were configured.

> Multilingual release (v1.5.0): the UI automatically follows Bondage Club's own
> language setting. Supported languages: **English, Deutsch, Français, Русский,
> 简体中文, 繁體中文, Українська** — the seven languages shipped by the BC client.

## Features

- Save the currently equipped handheld / misc item under a named slot.
- Load / manage saved items from a draggable floating button.
- Full preview of appearance, colour, crafter and extended properties.
- Export / import your saves as JSON for backup or sharing.
- Remembers the floating button position between sessions.

## Installation

Install the userscript with a manager such as Tampermonkey / Violentmonkey:

- `NFT.user.js` — loads the mod from jsDelivr:
  `https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`
- `NFT-dev.js` — a local development build (mod name `NFT - DEV`) that you can
  load directly from a `file://` URL without a CDN.

Open Bondage Club, log in, and a small floating button appears — click it (or drag
it) to open the Held Item Saver.

## Internationalisation

The mod follows Bondage Club's `TranslationLanguage` at runtime and falls back to
English for any unsupported code. Translation source files live in `locales/`:

| File            | Language            | BC code |
|-----------------|---------------------|---------|
| `en.json`       | English             | EN      |
| `de.json`       | Deutsch             | DE      |
| `fr.json`       | Français            | FR      |
| `ru.json`       | Русский             | RU      |
| `cn.json`       | 简体中文             | CN      |
| `tw.json`       | 繁體中文             | TW      |
| `ua.json`       | Українська          | UA      |

Keys are flat dot-namespaced (e.g. `save.button`, `load.apply`) and use
`{placeholder}` tokens for runtime values. The locale data is bundled into the
single-file `NFT.js` by the build step (see below), so there is **no runtime
fetch** and the deployed file is 100% ASCII (encoding-safe on any host).

## Development

```bash
node test-locales.cjs   # validate key & placeholder parity across all languages
node build.cjs          # inject locales into NFT.js and regenerate NFT-dev.js
node test-i18n.cjs      # runtime-check the shipped T() engine (resolution/fallback)
```

`build.cjs` reads `locales/*.json`, escapes every non-ASCII character to `\uXXXX`,
and injects the dictionary between the sentinels in `NFT.js`. It also regenerates
`NFT-dev.js` so the two files can never drift apart.

## Credits

Original mod by **Nicole, Felix, Tifa** (gitlab.com/nicole-bc-group/NFT).
Multilingual support and bug fixes added in this fork. Built on the
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk).
