import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

for (const file of ['index.html', 'index_nrw.html']) {
  const html = readFileSync(file, 'utf8');
  const start = html.lastIndexOf('<script>');
  const end = html.lastIndexOf('</script>');
  if (start < 0 || end < 0 || end <= start) {
    throw new Error(`${file}: inline script not found`);
  }
  const script = html.slice(start + '<script>'.length, end);
  const tmp = `/tmp/${file.replace(/[^a-z0-9]/gi, '_')}.inline.js`;
  writeFileSync(tmp, script);
  const res = spawnSync('node', ['--check', tmp], { encoding: 'utf8' });
  if (res.status !== 0) {
    process.stderr.write(res.stdout || '');
    process.stderr.write(res.stderr || '');
    throw new Error(`${file}: JavaScript syntax check failed`);
  }
  console.log(`${file}: JS ok (${script.length} chars)`);
}
