#!/usr/bin/env node
// Validates data/*.json and health/repos.json. Exits with code 1 on any problem.
import { LEVELS, TYPES, loadCategories, loadHealth } from './lib.mjs';

const KEYS = ['id', 'name', 'url', 'type', 'description', 'repo', 'level', 'free', 'note', 'tags', 'added'];
const errors = [];
const ids = new Map();
const urls = new Map();
const today = new Date().toISOString().slice(0, 10);
const health = loadHealth();

const https = (u) => {
  try {
    return new URL(u).protocol === 'https:';
  } catch {
    return false;
  }
};

for (const cat of loadCategories()) {
  const err = (r, msg) => errors.push(`${cat.file}${r ? ` > ${r.id ?? r.name ?? '?'}` : ''}: ${msg}`);
  if (!cat.category || !cat.description) err(null, 'needs "category" and "description"');
  if (!Array.isArray(cat.resources) || cat.resources.length === 0) {
    err(null, '"resources" must be a non-empty array');
    continue;
  }
  const names = cat.resources.map((r) => String(r.name).toLowerCase());
  if (names.join('\n') !== [...names].sort((a, b) => a.localeCompare(b)).join('\n')) err(null, 'resources must be sorted by name (run `npm run format`)');
  if (cat.raw !== `${JSON.stringify(JSON.parse(cat.raw), null, 2)}\n`) err(null, 'not formatted (run `npm run format`)');

  for (const r of cat.resources) {
    for (const k of Object.keys(r)) if (!KEYS.includes(k)) err(r, `unknown field "${k}"`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id ?? '')) err(r, '"id" must be lowercase-kebab-case');
    if (ids.has(r.id)) err(r, `duplicate id (also in ${ids.get(r.id)})`);
    ids.set(r.id, cat.file);
    if (!r.name || r.name.length > 60) err(r, '"name" is required (max 60 chars)');
    if (!https(r.url)) err(r, '"url" must be https');
    const normalized = String(r.url).replace(/\/+$/, '').toLowerCase();
    if (urls.has(normalized)) err(r, `duplicate url (also ${urls.get(normalized)})`);
    urls.set(normalized, r.id);
    if (!TYPES.includes(r.type)) err(r, `"type" must be one of ${TYPES.join(', ')}`);
    if (!r.description || r.description.length < 20 || r.description.length > 180) err(r, '"description" must be 20-180 chars');
    if (/\b(best|ultimate|amazing|awesome)\b/i.test(r.description) && !/awesome/i.test(r.name)) err(r, 'keep descriptions factual (no superlatives)');
    if ('level' in r && !LEVELS.includes(r.level)) err(r, `"level" must be one of ${LEVELS.join(', ')}`);
    if ('free' in r && typeof r.free !== 'boolean') err(r, '"free" must be a boolean');
    if ('note' in r && (typeof r.note !== 'string' || r.note.length > 160)) err(r, '"note" must be a string up to 160 chars');
    if ('tags' in r && (!Array.isArray(r.tags) || r.tags.some((t) => !/^[a-z0-9-]+$/.test(t)))) err(r, '"tags" must be kebab-case strings');
    if ('repo' in r) {
      if (!/^[A-Za-z0-9-]+\/[A-Za-z0-9._-]+$/.test(r.repo)) err(r, '"repo" must look like owner/name');
      else if (!health.repos[r.repo]) err(r, `"repo" ${r.repo} has no health data yet (run \`npm run health\` with GITHUB_TOKEN set)`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.added ?? '') || r.added > today) err(r, '"added" must be a YYYY-MM-DD date, not in the future');
  }
}

if (errors.length) {
  console.error(`✖ ${errors.length} problem(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`✔ ${ids.size} resources are valid`);
