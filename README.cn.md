# NFT — Nest of Fluffy Treasures（毛绒宝窝）

> 一款 Bondage Club 模组。多语言 README：
> [English](README.md) · [繁體中文](README.tw.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Русский](README.ru.md) · [Українська](README.ua.md)

NFT 是一款 **Bondage Club 模组**。它让你可以**保存并重新载入 `ItemHandheld` / `ItemMisc` 道具**，
保留其完整外观、制作者信息与属性，方便你在不同槽位间切换心爱的道具而不丢失配置。

| 语言       | 文档          |
|------------|---------------|
| English    | README.md     |
| 简体中文    | README.cn.md  |
| 繁體中文    | README.tw.md  |
| Deutsch    | README.de.md  |
| Français   | README.fr.md  |
| Русский    | README.ru.md  |
| Українська | README.ua.md  |

## 功能

- 将当前装备的手持 / 杂项道具保存到具名槽位。
- 通过可拖拽的浮动按钮载入与管理已保存的道具。
- 完整预览外观、颜色、制作者与扩展属性。
- 将存档导出 / 导入为 JSON，便于备份或分享。
- 记住浮动按钮的位置（跨会话保留）。

## 安装

1. 安装用户脚本管理器：**Tampermonkey**（推荐）或 **Violentmonkey**。
2. 打开 [`NFT.user.js`](NFT.user.js) 并交由管理器安装。
   - 它是一个**支持自动更新**的安装器：`@updateURL` / `@downloadURL` 指向 GitHub 上的原始文件，
     Tampermonkey 会自动检查更新。
   - 每次运行时会从 **jsDelivr CDN** 载入模组（`NFT.js`）：
     `https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`，始终提供最新发布版本。
3. 打开 Bondage Club 并登录，会出现一个小小的浮动按钮——点击（或拖动）它即可打开「手持道具存档器」。

> **开发者：** `NFT-dev.js` 是本地构建版本（模组名为 `NFT - DEV`），可直接从 `file://` 路径加载，无需 CDN。

## 多语言

模组在运行时跟随 Bondage Club 的 `TranslationLanguage`，对不支持的语言回退到英文。
翻译源文件位于 `locales/`：

| 文件        | 语言        | BC 代码 |
|-------------|-------------|---------|
| `en.json`   | English     | EN      |
| `de.json`   | Deutsch     | DE      |
| `fr.json`   | Français    | FR      |
| `ru.json`   | Русский     | RU      |
| `cn.json`   | 简体中文     | CN      |
| `tw.json`   | 繁體中文     | TW      |
| `ua.json`   | Українська  | UA      |

键名为扁平的点分隔命名（如 `save.button`、`load.apply`），运行时值使用 `{placeholder}` 占位符。
翻译数据由构建步骤打包进单文件 `NFT.js`，因此**无需运行时请求**，
部署文件为 100% ASCII（任意主机均不会乱码）。

## 开发

```bash
node test-locales.cjs   # 校验所有语言的键名与占位符一致性
node build.cjs          # 将翻译注入 NFT.js 并重新生成 NFT-dev.js
node test-i18n.cjs      # 运行时检查内置的 T() 翻译引擎
```

## 致谢

原模组作者 **Nicole, Felix, Tifa**（gitlab.com/nicole-bc-group/NFT）。
本分支增加了多语言支持与问题修复。基于
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk) 构建。
