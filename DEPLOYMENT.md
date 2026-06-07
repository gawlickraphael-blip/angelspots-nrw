# Deployment Angelspots NRW

## Empfehlung

Für diese statische App ist Cloudflare Pages die beste Standardlösung:

- kostenloser HTTPS-Link
- funktioniert mobil und unterwegs
- Browser-Standortfreigabe funktioniert nur sauber über HTTPS/localhost
- später eigene Domain möglich
- keine Serverwartung
- App besteht nur aus HTML/CSS/JS + `data/` JSON/GeoJSON

Alternative: GitHub Pages. Einfach, aber Repository ist meist öffentlich und weniger flexibel bei Domain/CDN.

## Aktueller Deploy-Root

Das Projekt ist jetzt so vorbereitet, dass die kombinierte NRW+Hagen-App direkt unter `/` läuft:

- `/home/gawli/angelspots-hagen/index.html` → kombinierte App
- `/home/gawli/angelspots-hagen/index_nrw.html` → gleiche kombinierte App/Arbeitsdatei
- `/home/gawli/angelspots-hagen/legal.html` → Datenschutz-/Hinweise-Seite für die öffentliche Beta
- `/home/gawli/angelspots-hagen/app.js` und `styles.css` → ausgelagerter App-Code für aktive CSP
- `/home/gawli/angelspots-hagen/vendor/` → lokal vendored Leaflet/Markercluster-Dateien
- `/home/gawli/angelspots-hagen/data/` → Datendateien
- `/home/gawli/angelspots-hagen/manifest.webmanifest` → mobile App-/Homescreen-Metadaten

## Cloudflare Pages Weg A: Direkt-Upload

1. In Cloudflare anmelden.
2. Workers & Pages → Create application → Pages → Upload assets.
3. Projektordner `/home/gawli/angelspots-hagen` als Upload-Basis verwenden.
4. Kein Build command.
5. Output/root directory: `/` bzw. hochgeladener Ordnerinhalt.
6. Danach bekommst du eine `*.pages.dev` HTTPS-Adresse.

## Cloudflare Pages Weg B: GitHub-Repo

1. Neues GitHub-Repo erstellen, z. B. `angelspots-nrw`.
2. Projekt nach GitHub pushen.
3. Cloudflare Pages mit GitHub verbinden.
4. Build settings:
   - Framework preset: None
   - Build command: leer
   - Build output directory: `/`
5. Jede Änderung wird dann automatisch deployed.

## Lokal testen

```bash
cd /home/gawli/angelspots-hagen
python3 -m http.server 8766 --bind 127.0.0.1
```

Dann öffnen:

```text
http://127.0.0.1:8766/
```

## Wichtig

- Standortfreigabe funktioniert auf Handys zuverlässig nur über HTTPS. Cloudflare Pages/GitHub Pages lösen das automatisch.
- Die Seite ist Recherchehilfe, keine Rechtsfreigabe fürs Angeln.
- Die aktive CSP in `_headers` erlaubt Skripte nur von `self`; Leaflet/Markercluster sind deshalb lokal im `vendor/`-Ordner enthalten.
- Service Worker und Cloudflare-Header sind auf kurze Revalidierung für App-Code/Vendor-Dateien eingestellt, damit Sicherheitsupdates nicht dauerhaft aus altem Cache laufen.
- Drittanbieteraufrufe aus dem Browser:
  - OpenStreetMap-Tiles für Kartenkacheln
  - Nominatim/OpenStreetMap für Ortssuche; für viel Traffic später eigenen Geocoder/Cache überlegen
  - Open-Meteo für Wetterdaten
  - PEGELONLINE/WSV für Pegel-Näherungen
  - Wikimedia/Commons für Fischbilder
  - Google Maps/Apple Maps/OpenStreetMap nur, wenn ein Nutzer einen Routenlink öffnet
