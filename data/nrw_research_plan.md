# NRW-Ausweitung Angelspots

Stand: erste NRW-Beta.

- 1.707 OSM/Overpass-Kandidaten als Research-Layer eingebunden.
- 30 kuratierte Startspots mit Fischarten/Erlaubnisstatus/Quellen eingebaut.
- Weitere manuelle Recherche sollte regionsweise erfolgen: Niederrhein/Düsseldorf, Ruhrgebiet, Münsterland, Rheinland Köln/Bonn, Aachen/Eifel, Sauerland/Siegerland/Bergisches, OWL.
- Foren-/Geheimspot-Hinweise nur aufnehmen, wenn öffentlich auffindbar und rechtlich konservativ als `unclear` markiert. Keine privaten/illegalen Kleinstellen als Empfehlung.


## Kuratierung Fortschritt

### Ruhrgebiet – erste kuratierte Runde

Datei: `data/nrw_curated_ruhrgebiet.json`

- 21 zusätzliche Ruhrgebiet-Records recherchiert/erfasst.
- Nach Namens-Dedupe zeigt die NRW-Seite aktuell 49 kuratierte Spots.
- Enthält: Rhein Duisburg, Rhein-Herne-Kanal-Abschnitte, Wesel-Datteln-Kanal, Datteln-Hamm-Kanal, Dortmund-Ems-Kanal, Baldeneysee, Hengsteysee, Harkortsee, Kemnader See, Ruhrabschnitte, PHOENIX See, Cappenberger See sowie Warn-/Ausschlussmarker wie Hallerey.
- Status bleibt konservativ: `public` nur bei öffentlich belegter Erlaubnisstruktur; sonst `limited`, `unclear` oder `closed`.

Nächste Regionsempfehlung: Niederrhein/Düsseldorf oder Sauerland/Talsperren.


### NRW-weite Kuratierung – Runde 1 komplett

Eingebaute externe kuratierte Datensätze:

- `nrw_curated_ruhrgebiet.json` – 21 Records
- `nrw_curated_niederrhein_duesseldorf.json` – 15 Records
- `nrw_curated_rheinland_koeln_bonn.json` – 14 Records
- `nrw_curated_aachen_eifel.json` – 15 Records
- `nrw_curated_muensterland.json` – 15 Records
- `nrw_curated_owl.json` – 15 Records
- `nrw_curated_sauerland_siegerland_bergisches.json` – 15 Records

Die Seite lädt diese Dateien zusätzlich zum eingebetteten Startdatensatz und dedupliziert nach Spotnamen. Aktueller sichtbarer Zähler im Browser: ca. 130 kuratierte Spots + 1.707 OSM-Kandidaten.

Nächste Kurationsrunde: je Region tiefer gehen und aus OSM/Foren-/Vereinsquellen weitere `unclear` Kandidaten zu `public`/`limited`/`closed` hochstufen, inklusive präziserer Quellen und Gewässergrenzen.


### NRW Runde 2 – tiefer kuratiert

Neue Datensätze:

- `nrw_curated_round2_west_rheinland.json` – 13 zusätzliche Records
- `nrw_curated_round2_eifel_muensterland.json` – 15 zusätzliche Records
- `nrw_curated_round2_owl_sauerland.json` – 13 zusätzliche Records

Browser-Zähler nach Dedupe: 171 kuratierte Spots + 1.707 OSM-Kandidaten.
Validierung: JSON-Schema geprüft, `node --check` für eingebettetes Script ok, Screenshot `angelspots-nrw-round2.png`.

Runde-2-Fokus: kleinere Baggerseen/Ville-Seen, Bach-/Nebenflussabschnitte, zusätzliche Angelparks und bewusst gesetzte `closed`-Marker für NSG/Trinkwassertalsperren.

### NRW Runde 3 – Qualitätsrunde Betreiber-/Vereinsquellen

Neue Datei:

- `nrw_curated_round3_quality.json` – 21 zusätzliche/qualitätsverbessernde Records

Schwerpunkte:

- Betreiber-/Vereinsquellen statt OSM-only: BASV Bocholt-Gastkarten, ASV Anholt-Gastkarten/Isselkarte, ASV Brambauer-Stever, ASV Dorsten-Gewässerseite, LFV Westfalen/Lippe für Lippe/Ruhr/Ems.
- Konservative Statuslogik: `public` nur bei belegter Gastkarten-/Kartenstruktur; LFV-/Vereinsstrecken überwiegend `limited`, ein Trinkwasser-False-Friend als `closed`.
- Exakte Ufergrenzen weiterhin nicht aus Text abgeleitet; Kartenheft, Angeln-In-App, Vereinskarte und Beschilderung bleiben maßgeblich.

Validierung Runde 3: JSON ok, keine exakten Namensduplikate, `node --check` für extrahiertes Skript ok, Browser-Test via `http://127.0.0.1:8765/index_nrw.html` mit 192 kuratierten Spots + 1.707 OSM-Kandidaten, Screenshot `~/.hermes/image_cache/angelspots-nrw-round3.png`.


### NRW Runde 4 – UI/Live-/Qualitätsausbau

Umgesetzt in `index_nrw.html`:

- Quellenqualitätsfilter: Betreiber/Verein/Verband, Stadt/Behörde/öffentlich, Verzeichnis/OSM/unklar.
- Praxistauglichkeitsfilter: spontan/planbar, Karte vorher kaufen, Verein/Pächter prüfen, nicht angeln.
- Top-Spot-Filter pro Region/Datensatzlogik: kein closed, Score >= 72, keine schwache Directory-only Quelle.
- Karten-/Listen-Badges für Quellenqualität, Praxislevel und Top-Spot.
- Detailansicht erweitert um Notiz, mehrere Quellenlinks und stärkeren Rechts-/Praxis-Hinweis.
- NRW-Live-Modul erweitert: 7-Tage-Planer via Open-Meteo, Sicherheitsbox bei Sturm/Gewitter/Starkregen, Pegel-Näherung via PEGELONLINE für passende Fluss-/Stausee-Kontexte.

Validierung Runde 4: Inline-JavaScript per `node --check` ok, Browser-Screenshot `~/.hermes/image_cache/angelspots-nrw-quality-ui.png`, sichtbarer Zähler weiterhin 192 kuratierte Spots + 1.707 OSM-Kandidaten.

### NRW Runde 5 – OSM/Overpass-Tiefentriage

Neue Datei:

- `nrw_curated_round5_osm_triage.json` – 33 rechtlich konservativ triagierte Kandidaten aus dem OSM/Overpass-Layer.

Schwerpunkte:

- High-Priority-OSM-Kandidaten regionsweise ausgewählt: Betreiberanlagen/Forellenparks, Vereins-/Pächtergewässer, OSM-only-Bruchseen und False-Friend-/Schutzgewässer.
- Statuslogik strikt: `public` nur bei klarer Betreiber-/Kundenanlage mit erreichbarer Betreiberseite; `limited` bei Verein/Pächter/privat/Detail-POI; `unclear` bei OSM-only oder unstabiler Quellenlage; `closed` nur bei klarer Naturschutz-Warnlogik.
- Keine exakten Ufergrenzen aus OSM-Mittelpunkten abgeleitet; mehrere OSM-Teiche Altenberg zu einem Marker zusammengeführt.

Validierung Runde 5: JSON-Schema ok, keine exakten Namensduplikate, `node --check` für letztes Inline-Script ok, Browser-Test mit 225 kuratierten Spots + 1.707 OSM-Kandidaten, Screenshot `~/.hermes/image_cache/angelspots-nrw-round5.png`.

Offen: nächste inhaltliche Arbeit wäre eine zweite OSM-Triage mit Fokus Ostwestfalen/Sauerland/Aachen und Nachrecherche für die vielen `unclear`-Bruchseen; dabei zuerst offizielle Vereins-/Betreiberkarten suchen, sonst weiter nicht empfehlen.

### NRW Runde 6 – Regionalvertiefung + Hagen-Kombi + Suche

Neue/integrierte Dateien:

- `hagen_local_spots.json` – 15 lokale Hagen-20-km-Spots aus der ursprünglichen Hagen-App in die NRW-App übernommen; nach Namens-Dedupe 12 zusätzliche sichtbare Spots, weil einzelne Gewässer bereits NRW-weit vorhanden waren.
- `nrw_curated_round6_regional_deepening.json` – 20 konservativ recherchierte/markierte Spots/Marker mit Fokus OWL, Sauerland/Siegerland/Bergisches und Aachen/Eifel.

Status Runde 6:

- `limited`: 14
- `closed`: 5
- `unclear`: 1
- `public`: 0

UI-Ausbau in `index_nrw.html`:

- NRW- und Hagen-Daten werden jetzt gemeinsam geladen.
- Neues Ortssuchfeld via Nominatim/OpenStreetMap: z. B. Hagen, Möhnesee, Köln.
- Ortssuche hat jetzt Autocomplete-Dropdown mit bis zu 6 Suchvorschlägen; Klick auf einen Vorschlag setzt den Fokus und zoomt direkt in die Karte.
- Enter nimmt den markierten/ersten Vorschlag, Pfeil hoch/runter wechseln den Vorschlag, Escape schließt das Dropdown.
- Neuer Standort-Button via Browser-Geolocation; funktioniert bei Browser-Freigabe auf localhost/HTTPS.
- Bei Ort/Standort-Fokus wird die Liste nach Entfernung sortiert und die Karte zoomt zum Fokus.

Validierung Runde 6/UI: `hagen_local_spots.json` und `nrw_curated_round6_regional_deepening.json` JSON ok, Inline-JavaScript per `node --check` ok, lokaler HTTP-Test ok, Screenshot `~/.hermes/image_cache/angelspots-nrw-combined-search.png`. Browser-Zähler nach Dedupe: 257 kuratierte Spots + 1.707 OSM-Kandidaten.
Autocomplete-Nachtrag: Nominatim-Test für „Hagen NRW“ ok, Screenshot `~/.hermes/image_cache/angelspots-nrw-autocomplete.png`.

### Mobile-/Deployment-Vorbereitung

- Mobile CSS überarbeitet: Karte oben, Bedien-/Suchbereich unten, Hero/Disclaimer auf Handy ausgeblendet, Ortssuche ohne Scrollen erreichbar, Detailansicht als Bottom-Sheet.
- `index.html` ist jetzt die kombinierte NRW+Hagen-App; alte reine Hagen-App liegt als `index_hagen_legacy.html`.
- `manifest.webmanifest` ergänzt, damit die Seite auf dem Handy eher wie eine kleine Web-App/Homescreen-App wirkt.
- Deployment-Notiz erstellt: `DEPLOYMENT.md` mit Empfehlung Cloudflare Pages und GitHub-Pages-Alternative.
- Validierung: `node --check` ok, Manifest JSON ok, lokaler Root-Test ok, Mobile-Screenshot `~/.hermes/image_cache/angelspots-mobile-v2.png`.
