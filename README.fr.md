# NFT — Nest of Fluffy Treasures

> Un mod Bondage Club. README multilingue :
> [English](README.md) · [简体中文](README.cn.md) · [繁體中文](README.tw.md) · [Deutsch](README.de.md) · [Русский](README.ru.md) · [Українська](README.ua.md)

NFT vous permet de **sauvegarder et recharger les objets `ItemHandheld` / `ItemMisc`**
avec leur apparence complète, les infos du créateur et leurs propriétés, afin de
pouvoir échanger vos objets favoris entre les emplacements sans perdre leur configuration.

| Langue     | Document     |
|------------|--------------|
| English    | README.md    |
| 简体中文    | README.cn.md |
| 繁體中文    | README.tw.md |
| Deutsch    | README.de.md |
| Français   | README.fr.md |
| Русский    | README.ru.md |
| Українська | README.ua.md |

## Fonctionnalités

- Sauvegarder l'objet tenu / divers actuellement équipé dans un emplacement nommé.
- Charger / gérer les objets sauvegardés depuis un bouton flottant déplaçable.
- Aperçu complet de l'apparence, de la couleur, du créateur et des propriétés étendues.
- Exporter / importer vos sauvegardes en JSON pour les sauvegarder ou les partager.
- Mémorise la position du bouton flottant entre les sessions.

## Installation

1. Installez un gestionnaire de userscript : **Tampermonkey** (recommandé) ou **Violentmonkey**.
2. Cliquez sur **[Installer NFT.user.js](https://raw.githubusercontent.com/heitaoplay/NFT-i18n/main/NFT.user.js)** – votre gestionnaire affiche directement la fenêtre d'installation.
   - C'est un installateur **auto-mise-à-jour** : `@updateURL` / `@downloadURL` pointent
     vers le fichier brut sur GitHub, Tampermonkey vérifie donc les mises à jour automatiquement.
   - À chaque lancement, il charge la mod (`NFT.js`) depuis le **CDN jsDelivr**
     (`https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`), qui sert toujours la dernière version publiée.
3. Ouvrez Bondage Club, connectez-vous : un petit bouton flottant apparaît —
   cliquez (ou glissez) dessus pour ouvrir le « Held Item Saver ».

> **Développeurs :** `NFT-dev.js` est un build local (nom de mod `NFT - DEV`)
> que vous pouvez charger directement depuis une URL `file://` sans CDN.

## Internationalisation

La mod suit `TranslationLanguage` de Bondage Club au runtime et revient à l'anglais
pour tout code non pris en charge. Les sources de traduction se trouvent dans `locales/` :

| Fichier    | Langue     | Code BC |
|------------|------------|---------|
| `en.json`  | English    | EN      |
| `de.json`  | Deutsch    | DE      |
| `fr.json`  | Français   | FR      |
| `ru.json`  | Русский    | RU      |
| `cn.json`  | 简体中文    | CN      |
| `tw.json`  | 繁體中文    | TW      |
| `ua.json`  | Українська | UA      |

Les clés sont plates et séparées par des points (ex. `save.button`, `load.apply`) et
utilisent des jetons `{placeholder}` pour les valeurs à l'exécution. Les données de
traduction sont intégrées dans le fichier unique `NFT.js` par l'étape de build, donc
**aucun fetch au runtime** et le fichier déployé est 100 % ASCII (sûr pour l'encodage sur n'importe quel hôte).

## Développement

```bash
node test-locales.cjs   # valider la parité des clés et des placeholders
node build.cjs          # injecter les locales dans NFT.js et régénérer NFT-dev.js
node test-i18n.cjs      # vérifier le moteur T() livré à l'exécution
```

## Crédits

Mod originale par **Nicole, Felix, Tifa** (gitlab.com/nicole-bc-group/NFT).
Prise en charge multilingue et corrections de bugs ajoutées dans ce fork. Construit sur le
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk).
