import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DATA_DIR = join(ROOT, 'data');
export const HEALTH_FILE = join(ROOT, 'health', 'repos.json');

export const TYPES = ['course', 'platform', 'lab', 'tool', 'reference', 'list'];
export const LEVELS = ['beginner', 'intermediate', 'advanced'];

/** Category order used in the README and on the website. */
export const CATEGORY_ORDER = [
  'learn', 'labs', 'web', 'recon', 'network-ad', 'exploitation', 'reversing', 'blue-team',
  'cloud-devsecops', 'mobile', 'crypto-passwords', 'hardware-iot', 'ai-security', 'references',
];

export function loadCategories() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
  return files
    .map((file) => {
      const raw = readFileSync(join(DATA_DIR, file), 'utf8');
      let json;
      try {
        json = JSON.parse(raw);
      } catch (err) {
        throw new Error(`${file}: invalid JSON (${err.message})`);
      }
      return { id: file.replace(/\.json$/, ''), file, raw, ...json };
    })
    .sort((a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id));
}

const rank = (id) => {
  const i = CATEGORY_ORDER.indexOf(id);
  return i === -1 ? 999 : i;
};

export function loadHealth() {
  try {
    return JSON.parse(readFileSync(HEALTH_FILE, 'utf8'));
  } catch {
    return { updated: null, repos: {} };
  }
}

export function allResources(categories = loadCategories()) {
  return categories.flatMap((c) => c.resources.map((r) => ({ ...r, category: c.id })));
}

/** Maintenance status from repository activity. */
export function healthStatus(h, now = new Date()) {
  if (!h) return null;
  if (h.archived) return 'archived';
  if (!h.last_commit) return null;
  const days = (now - new Date(`${h.last_commit}T00:00:00Z`)) / 86_400_000;
  if (days <= 180) return 'active';
  if (days <= 540) return 'maintained';
  if (days <= 1095) return 'slow';
  return 'stale';
}

export const STATUS = {
  active: { icon: '🟢', label: 'Active', hint: 'updated in the last 6 months' },
  maintained: { icon: '🔵', label: 'Maintained', hint: 'updated in the last 18 months' },
  slow: { icon: '🟡', label: 'Slow', hint: 'no update for 18 months to 3 years' },
  stale: { icon: '🔴', label: 'Stale', hint: 'no update for over 3 years' },
  archived: { icon: '⚫', label: 'Archived', hint: 'archived by its owner' },
};

export const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-');
