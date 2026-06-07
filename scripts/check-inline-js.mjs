import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const files = ['app.js', 'sw.js', 'vendor/leaflet/leaflet.js', 'vendor/markercluster/leaflet.markercluster.js'];

for (const file of files) {
  const res = spawnSync('node', ['--check', file], { encoding: 'utf8' });
  if (res.status !== 0) {
    process.stderr.write(res.stdout || '');
    process.stderr.write(res.stderr || '');
    throw new Error(`${file}: JavaScript syntax check failed`);
  }
  const script = readFileSync(file, 'utf8');
  console.log(`${file}: JS ok (${script.length} chars)`);
}

for (const file of ['index.html', 'index_nrw.html', 'legal.html']) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('<script>') || html.includes('<style>') || /\son[a-z]+\s*=|\sstyle\s*=/.test(html)) {
    throw new Error(`${file}: inline script/style/event handler found`);
  }
  console.log(`${file}: no inline script/style/event handlers`);
}
