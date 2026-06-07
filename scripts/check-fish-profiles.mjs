import { readFileSync } from 'node:fs';

const profiles = JSON.parse(readFileSync('data/fish_profiles.json', 'utf8'));
const required = ['Hecht', 'Zander', 'Barsch', 'Aal', 'Karpfen', 'Wels', 'Bachforelle', 'Regenbogenforelle', 'Äsche'];
for (const name of required) {
  const p = profiles[name];
  if (!p) throw new Error(`fish profile missing: ${name}`);
  for (const field of ['scientific', 'image', 'description', 'season', 'minSizeCm', 'source']) {
    if (!(field in p)) throw new Error(`${name}: missing field ${field}`);
  }
  if (!String(p.image).startsWith('https://') && !String(p.image).startsWith('assets/')) throw new Error(`${name}: image must be https or local asset`);
  if (!String(p.description).includes('.')) throw new Error(`${name}: description too short`);
}
if (!profiles.Rotauge.image.includes('Blausteinsee_Tierwelt_03.jpg')) throw new Error('Rotauge image must use working original Wikimedia file');
if (!profiles.Zander.image.endsWith('/2/2f/Zander.jpg')) throw new Error('Zander image must use working original Wikimedia file');
console.log(`fish profiles ok (${Object.keys(profiles).length} entries)`);
