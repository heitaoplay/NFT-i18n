# NFT — Nest of Fluffy Treasures（毛絨寶窩）

> 一款 Bondage Club 模組。多語言 README：
> [English](README.md) · [简体中文](README.cn.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md) · [Українська](README.ua.md)

NFT 是一款 **Bondage Club 模組**。它可以讓你**儲存並重新載入 `ItemHandheld` / `ItemMisc` 道具**，
保留其完整外觀、製作者資訊與屬性，方便你在不同槽位間切換心愛的道具而不遺失設定。

| 語言       | 文件          |
|------------|---------------|
| English    | README.md     |
| 简体中文    | README.cn.md  |
| 繁體中文    | README.tw.md  |
| Deutsch    | README.de.md  |
| Français   | README.fr.md  |
| Русский    | README.ru.md  |
| Українська | README.ua.md  |

## 功能

- 將目前裝備的手持 / 雜項道具儲存到具名槽位。
- 透過可拖曳的浮動按鈕載入與管理已儲存的道具。
- 完整預覽外觀、顏色、製作者與擴充屬性。
- 將存檔匯出 / 匯入為 JSON，便於備份或分享。
- 記住浮動按鈕的位置（跨會話保留）。

## 安裝

1. 安裝使用者腳本管理器：**Tampermonkey**（推薦）或 **Violentmonkey**。
2. 開啟 [`NFT.user.js`](NFT.user.js) 並交由管理器安裝。
   - 它是一個**支援自動更新**的安裝器：`@updateURL` / `@downloadURL` 指向 GitHub 上的原始檔案，
     Tampermonkey 會自動檢查更新。
   - 每次執行時會從 **jsDelivr CDN** 載入模組（`NFT.js`）：
     `https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`，始終提供最新發布版本。
3. 開啟 Bondage Club 並登入，會出現一個小小的浮動按鈕——點擊（或拖動）它即可開啟「手持道具存檔器」。

> **開發者：** `NFT-dev.js` 是本地建置版本（模組名為 `NFT - DEV`），可直接從 `file://` 路徑載入，無需 CDN。

## 多語言

模組在執行時跟隨 Bondage Club 的 `TranslationLanguage`，對不支援的語言回退到英文。
翻譯原始檔位於 `locales/`：

| 檔案        | 語言        | BC 代碼 |
|-------------|-------------|---------|
| `en.json`   | English     | EN      |
| `de.json`   | Deutsch     | DE      |
| `fr.json`   | Français    | FR      |
| `ru.json`   | Русский     | RU      |
| `cn.json`   | 简体中文     | CN      |
| `tw.json`   | 繁體中文     | TW      |
| `ua.json`   | Українська  | UA      |

鍵名為扁平的點分隔命名（如 `save.button`、`load.apply`），執行時值使用 `{placeholder}` 占位符。
翻譯資料由建置步驟打包進單一檔案 `NFT.js`，因此**無需執行時請求**，
部署檔案為 100% ASCII（任意主機均不會亂碼）。

## 開發

```bash
node test-locales.cjs   # 校驗所有語言的鍵名與占位符一致性
node build.cjs          # 將翻譯注入 NFT.js 並重新生成 NFT-dev.js
node test-i18n.cjs      # 執行時檢查內建的 T() 翻譯引擎
```

## 致謝

原模組作者 **Nicole, Felix, Tifa**（gitlab.com/nicole-bc-group/NFT）。
本分支增加了多語言支援與問題修復。基於
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk) 建置。
