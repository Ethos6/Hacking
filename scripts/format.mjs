#!/usr/bin/env node
// Sorts resources by name and normalizes key order and formatting.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR, loadCategories } from './lib.mjs';

const ORDER = ['id', 'name', 'url', 'type', 'description', 'repo', 'level', 'free', 'note', 'tags', 'added'];

for (const cat of loadCategories()) {
  const resources = [...cat.resources]
    .sort((a, b) => String(a.name).toLowerCase().localeCompare(String(b.name).toLowerCase()))
    .map((r) => Object.fromEntries([...ORDER.filter((k) => k in r), ...Object.keys(r).filter((k) => !ORDER.includes(k))].map((k) => [k, r[k]])));
  const out = `${JSON.stringify({ category: cat.category, description: cat.description, resources }, null, 2)}\n`;
  if (out !== cat.raw) {
    writeFileSync(join(DATA_DIR, cat.file), out);
    console.log(`formatted ${cat.file}`);
  }
}
