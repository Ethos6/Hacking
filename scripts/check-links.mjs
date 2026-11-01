#!/usr/bin/env node
// Checks that every resource URL responds. Bot-protection codes are reported
// separately because many sites block automated requests.
//   node scripts/check-links.mjs [--report report.md]
import { writeFileSync } from 'node:fs';
import { allResources } from './lib.mjs';

const i = process.argv.indexOf('--report');
const reportFile = i > -1 ? process.argv[i + 1] : undefined;
const SOFT = new Set([401, 403, 405, 406, 429, 503]);

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20_000);
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'hacking-link-check (+https://github.com/Ethos6/Hacking)' } });
      if (res.ok) return { ok: true };
      if (method === 'GET') return { ok: false, soft: SOFT.has(res.status), status: res.status };
    } catch (err) {
      if (method === 'GET') return { ok: false, soft: false, status: err.name === 'AbortError' ? 'timeout' : err.message };
    } finally {
      clearTimeout(timer);
    }
  }
}

const items = allResources();
const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (next < items.length) {
      const r = items[next++];
      results.push({ r, ...(await probe(r.url)) });
    }
  }),
);

const broken = results.filter((x) => !x.ok && !x.soft);
const blocked = results.filter((x) => !x.ok && x.soft);
const line = (x) => `- **${x.r.name}** (\`${x.r.id}\`): ${x.r.url} → ${x.status}`;
const report = [
  `Checked ${results.length} links.`,
  '',
  `### Broken (${broken.length})`,
  ...(broken.length ? broken.map(line) : ['None']),
  '',
  `### Blocked automated check, verify by hand (${blocked.length})`,
  ...(blocked.length ? blocked.map(line) : ['None']),
].join('\n');
console.log(report);
if (reportFile) writeFileSync(reportFile, `${report}\n`);
process.exit(broken.length ? 1 : 0);
