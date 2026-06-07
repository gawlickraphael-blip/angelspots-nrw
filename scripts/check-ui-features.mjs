import { readFileSync } from 'node:fs';

const files = ['index.html', 'index_nrw.html'];
const requiredSnippets = [
  ['Favoriten-Filter', 'id="favOnly"'],
  ['Favoriten-Zähler', 'id="sFav"'],
  ['localStorage-Key', 'angelspots:nrw:favorites'],
  ['Favoritenfunktion', 'function toggleFavorite'],
  ['Favoritenstatus', 'function isFav'],
  ['Google-Maps-Route', 'google.com/maps/dir/?api=1'],
  ['Apple-Maps-Route', 'maps.apple.com'],
  ['OSM-Route', 'www.openstreetmap.org/directions'],
  ['Event-Propagation für List-Buttons', 'event.stopPropagation()'],
  ['Mobile Aktionsbuttons', 'class="actions"'],
  ['Fischarten-Modal', 'id="fishModal"'],
  ['Fischprofile-Daten', 'data/fish_profiles.json'],
  ['Fischprofil öffnen', 'function openFishProfile'],
  ['Schonzeiten-Funktion', 'function seasonStatus'],
  ['Schonzeiten-Hinweis', 'Schonzeit'],
  ['Mindestmaß-Hinweis', 'Mindestmaß'],
  ['Klickbare Fisch-Chips', 'fishBtn'],
];

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const missing = requiredSnippets.filter(([, snippet]) => !html.includes(snippet));
  if (missing.length) {
    console.error(`${file}: missing UI feature snippets:`);
    for (const [name, snippet] of missing) console.error(`- ${name}: ${snippet}`);
    process.exitCode = 1;
  } else {
    console.log(`${file}: UI feature snippets ok`);
  }
}
