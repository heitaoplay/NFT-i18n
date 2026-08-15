# NFT — Nest of Fluffy Treasures

> A Bondage Club mod. Multilingual README:
> [简体中文](README.cn.md) · [繁體中文](README.tw.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md) · [Українська](README.ua.md)

NFT lets you **save and reload `ItemHandheld` / `ItemMisc` items** with their full
appearance, crafter info and properties, so you can swap favourite props in and out
of your slots without losing how they were configured.

| Language   | Document      |
|------------|---------------|
| English    | README.md     |
| 简体中文    | README.cn.md  |
| 繁體中文    | README.tw.md  |
| Deutsch    | README.de.md  |
| Français   | README.fr.md  |
| Русский    | README.ru.md  |
| Українська | README.ua.md  |

## Features

- Save the currently equipped handheld / misc item under a named slot.
- Load / manage saved items from a draggable floating button.
- Full preview of appearance, colour, crafter and extended properties.
- Export / import your saves as JSON for backup or sharing.
- Remembers the floating button position between sessions.

## Installation

1. Install a userscript manager: **Tampermonkey** (recommended) or **Violentmonkey**.
2. Open [`NFT.user.js`](NFT.user.js) and let your manager install it.
   - It is a **self-updating** installer: `@updateURL` / `@downloadURL` point at the
     raw file on GitHub, so Tampermonkey checks for updates automatically.
   - On each run it loads the mod (`NFT.js`) from the **jsDelivr CDN**
     (`https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`),
     which always serves the latest published version.
3. Open Bondage Club, log in, and a small floating button appears — click it (or
   drag it) to open the Held Item Saver.

> **Developers:** `NFT-dev.js` is a local build (mod name `NFT - DEV`) you can load
> directly from a `file://` URL without a CDN.

## Internationalisation

The mod follows Bondage Club's `TranslationLanguage` at runtime and falls back to
English for any unsupported code. Translation sources live in `locales/`:

| File      | Language    | BC code |
|-----------|-------------|---------|
| `en.json` | English     | EN      |
| `de.json` | Deutsch     | DE      |
| `fr.json` | Français    | FR      |
| `ru.json` | Русский     | RU      |
| `cn.json` | 简体中文     | CN      |
| `tw.json` | 繁體中文     | TW      |
| `ua.json` | Українська  | UA      |

Keys are flat dot-namespaced (e.g. `save.button`, `load.apply`) and use
`{placeholder}` tokens for runtime values. The locale data is bundled into the
single-file `NFT.js` by the build step, so there is **no runtime fetch** and the
deployed file is 100% ASCII (encoding-safe on any host).

## Development

```bash
node test-locales.cjs   # validate key & placeholder parity across all languages
node build.cjs          # inject locales into NFT.js and regenerate NFT-dev.js
node test-i18n.cjs      # runtime-check the shipped T() engine
```

## Credits

Original mod by **Nicole, Felix, Tifa** (gitlab.com/nicole-bc-group/NFT).
Multilingual support and bug fixes added in this fork. Built on the
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk).
