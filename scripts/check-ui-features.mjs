import { readFileSync } from 'node:fs';

const htmlFiles = ['index.html', 'index_nrw.html'];
const app = readFileSync('app.js', 'utf8');
const requiredSnippets = [
  ['Favoriten-Filter', 'id="favOnly"'],
  ['Favoriten-Zähler', 'id="sFav"'],
  ['Fischarten-Modal', 'id="fishModal"'],
  ['Datenschutz/Hinweise-Link', 'legal.html'],
  ['Sortierung', 'id="sortBy"'],
  ['Filter zurücksetzen', 'id="resetFilters"'],
  ['Ergebnis-Zusammenfassung', 'id="resultSummary"'],
];
const appSnippets = [
  ['localStorage-Key', 'angelspots:nrw:favorites'],
  ['Favoritenfunktion', 'function toggleFavorite'],
  ['Favoritenstatus', 'function isFav'],
  ['Google-Maps-Route', 'google.com/maps/dir/?api=1'],
  ['Apple-Maps-Route', 'maps.apple.com'],
  ['OSM-Route', 'www.openstreetmap.org/directions'],
  ['Mobile Aktionsbuttons', 'class="actions"'],
  ['Fischprofile-Daten', 'data/fish_profiles.json'],
  ['Fischprofil öffnen', 'function openFishProfile'],
  ['Schonzeiten-Funktion', 'function seasonStatus'],
  ['Schonzeiten-Hinweis', 'Schonzeit'],
  ['Mindestmaß-Hinweis', 'Mindestmaß'],
  ['Klickbare Fisch-Chips', 'fishBtn'],
  ['Delegierte List-Buttons', 'data-open-id'],
  ['Mobile Aktionsbuttons', 'class="actions"'],
  ['Sichere Event-Delegation', 'function initSafeEventDelegation'],
  ['Kanonische Gewässerfilter', 'function canonicalWaterType'],
  ['Kanonische Methodenfilter', 'function canonicalMethod'],
  ['Sortierfunktion', 'function compareSpots'],
  ['Filter-Reset', 'function resetFilters'],
];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const missing = requiredSnippets.filter(([, snippet]) => !html.includes(snippet));
  if (missing.length) {
    console.error(`${file}: missing UI feature snippets:`);
    for (const [name, snippet] of missing) console.error(`- ${name}: ${snippet}`);
    process.exitCode = 1;
  } else {
    console.log(`${file}: HTML UI feature snippets ok`);
  }
}
const missingApp = appSnippets.filter(([, snippet]) => !app.includes(snippet));
if (missingApp.length) {
  console.error('app.js: missing UI feature snippets:');
  for (const [name, snippet] of missingApp) console.error(`- ${name}: ${snippet}`);
  process.exitCode = 1;
} else {
  console.log('app.js: JS UI feature snippets ok');
}
