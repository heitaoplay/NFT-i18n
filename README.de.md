# NFT — Nest of Fluffy Treasures

> Eine Bondage-Club-Mod. Mehrsprachige README:
> [English](README.md) · [简体中文](README.cn.md) · [繁體中文](README.tw.md) · [Français](README.fr.md) · [Русский](README.ru.md) · [Українська](README.ua.md)

NFT ermöglicht es dir, **`ItemHandheld`- / `ItemMisc`-Gegenstände zu speichern und
neu zu laden** – samt vollständigem Aussehen, Herstellerinfo und Eigenschaften.
So kannst du deine Lieblingsprops in und aus den Slots tauschen, ohne die
Konfiguration zu verlieren.

| Sprache    | Dokument     |
|------------|--------------|
| English    | README.md    |
| 简体中文    | README.cn.md |
| 繁體中文    | README.tw.md |
| Deutsch    | README.de.md |
| Français   | README.fr.md |
| Русский    | README.ru.md |
| Українська | README.ua.md |

## Funktionen

- Den aktuell ausgerüsteten Hand-/Sonstige-Gegenstand unter einem benannten Slot speichern.
- Gespeicherte Gegenstände über eine ziehbare schwebende Schaltfläche laden und verwalten.
- Volle Vorschau von Aussehen, Farbe, Hersteller und erweiterten Eigenschaften.
- Speicher als JSON exportieren / importieren (Backup oder Teilen).
- Merkt sich die Position der schwebenden Schaltfläche zwischen den Sitzungen.

## Installation

1. Installiere einen Userscript-Manager: **Tampermonkey** (empfohlen) oder **Violentmonkey**.
2. Klicke **[NFT.user.js installieren](https://raw.githubusercontent.com/heitaoplay/NFT-i18n/main/NFT.user.js)** – dein Manager öffnet direkt den Installationsdialog.
   - Es ist ein **selbstaktualisierendes** Installationsskript: `@updateURL` / `@downloadURL`
     zeigen auf die Rohdatei auf GitHub, sodass Tampermonkey automatisch nach Updates sucht.
   - Bei jedem Start lädt es die Mod (`NFT.js`) vom **jsDelivr-CDN**
     (`https://cdn.jsdelivr.net/gh/heitaoplay/NFT-i18n@main/NFT.js`), das stets die neueste Version ausliefert.
3. Öffne Bondage Club, logge dich ein – eine kleine schwebende Schaltfläche erscheint.
   Klicke (oder ziehe) sie, um den „Held Item Saver“ zu öffnen.

> **Entwickler:** `NFT-dev.js` ist ein lokaler Build (Mod-Name `NFT - DEV`),
> den du direkt über eine `file://`-URL ohne CDN laden kannst.

## Internationalisierung

Die Mod folgt zur Laufzeit Bondage Clubs `TranslationLanguage` und fällt für nicht
unterstützte Codes auf Englisch zurück. Übersetzungsquellen liegen in `locales/`:

| Datei      | Sprache    | BC-Code |
|------------|------------|---------|
| `en.json`  | English    | EN      |
| `de.json`  | Deutsch    | DE      |
| `fr.json`  | Français   | FR      |
| `ru.json`  | Русский    | RU      |
| `cn.json`  | 简体中文    | CN      |
| `tw.json`  | 繁體中文    | TW      |
| `ua.json`  | Українська | UA      |

Schlüssel sind flach und punkt-namespaced (z. B. `save.button`, `load.apply`) und
verwenden `{placeholder}`-Platzhalter für Laufzeitwerte. Die Übersetzungsdaten werden
vom Build-Schritt in die Einzeldatei `NFT.js` eingebettet – es gibt **kein Laufzeit-Fetch**,
und die ausgelieferte Datei ist zu 100 % ASCII (codierungssicher auf jedem Host).

## Entwicklung

```bash
node test-locales.cjs   # Schlüssel- & Platzhalter-Parität aller Sprachen prüfen
node build.cjs          # Locales in NFT.js einbetten und NFT-dev.js neu erzeugen
node test-i18n.cjs      # Die ausgelieferte T()-Engine zur Laufzeit prüfen
```

## Danksagung

Ursprüngliche Mod von **Nicole, Felix, Tifa** (gitlab.com/nicole-bc-group/NFT).
Mehrsprachigkeit und Fehlerbehebungen in diesem Fork hinzugefügt. Gebaut auf dem
[Bondage Club Mod SDK](https://github.com/Jomshir98/bondage-club-mod-sdk).
