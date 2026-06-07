# Angelspots NRW

Mobile-first Angelspot-Web-App für NRW mit Hagen-Fokus.

## Inhalt

- Kombinierte NRW- und Hagen-Daten
- 257 kuratierte Spots + 1.707 OSM/Overpass-Kandidaten
- Leaflet-Karte mit Markercluster
- Ortssuche mit Autocomplete
- Standort-Fokus mit Entfernungssortierung
- Filter nach Region, Status, Quellenqualität, Praxislevel und Zielfisch
- Live-Wetter, 7-Tage-Planer und Pegel-Näherung, wo passend
- Mobile Bottom-Sheet-Detailansicht
- PWA-Manifest für Homescreen-Nutzung

## Lokal starten

```bash
cd /home/gawli/angelspots-hagen
npm run serve
```

Dann öffnen:

```text
http://127.0.0.1:8766/
```

## Prüfen

```bash
npm run check
```

Prüft:

- Inline-JavaScript in `index.html`
- Inline-JavaScript in `index_nrw.html`
- `manifest.webmanifest`

## Deployment

Empfohlen: **Cloudflare Pages**.

Die App ist statisch. Kein Build nötig.

Cloudflare Pages Settings:

- Framework preset: `None`
- Build command: leer
- Build output directory: `/`
- Root: Projektordnerinhalt

Siehe auch `DEPLOYMENT.md`.

## Wichtiger Hinweis

Die Website ist eine Recherchehilfe, keine Rechtsauskunft. Vor dem Angeln immer aktuelle Erlaubnisscheine/Gastkarten, Vereins-Gewässerkarten, Schonzeiten, Mindestmaße, Sperrbereiche und Beschilderung prüfen.
