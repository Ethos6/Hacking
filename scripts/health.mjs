#!/usr/bin/env node
// Refreshes health/repos.json from the GitHub API: stars, last commit, archived flag
// and renames. Needs a token in GITHUB_TOKEN (the default Actions token works).
//   GITHUB_TOKEN=... node scripts/health.mjs
import { writeFileSync } from 'node:fs';
import { HEALTH_FILE, allResources, loadHealth } from './lib.mjs';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('Set GITHUB_TOKEN to refresh repository health.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'hacking-health-check',
};

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers, redirect: 'follow' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

const old = loadHealth();
const repos = [...new Set(allResources().map((r) => r.repo).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
const next = {};
const problems = [];

for (const repo of repos) {
  try {
    const info = await api(`/repos/${repo}`);
    if (!info) {
      problems.push(`- **${repo}**: not found (deleted or made private)`);
      next[repo] = { ...(old.repos[repo] ?? {}), missing: true };
      continue;
    }
    // pushed_at changes on any push; the default branch's latest commit is the better signal.
    const commits = await api(`/repos/${repo}/commits?per_page=1&sha=${encodeURIComponent(info.default_branch)}`);
    const last = commits?.[0]?.commit?.committer?.date ?? info.pushed_at;
    next[repo] = {
      stars: info.stargazers_count,
      last_commit: last.slice(0, 10),
      archived: info.archived,
      ...(info.full_name.toLowerCase() !== repo.toLowerCase() ? { renamed_to: info.full_name } : {}),
      ...(info.license?.spdx_id && info.license.spdx_id !== 'NOASSERTION' ? { license: info.license.spdx_id } : {}),
    };
    if (info.archived) problems.push(`- **${repo}**: archived by its owner`);
    if (next[repo].renamed_to) problems.push(`- **${repo}**: moved to ${info.full_name}, update \`repo\` and \`url\``);
  } catch (err) {
    problems.push(`- **${repo}**: ${err.message}`);
    if (old.repos[repo]) next[repo] = old.repos[repo];
  }
}

writeFileSync(
  HEALTH_FILE,
  `${JSON.stringify({ updated: new Date().toISOString().slice(0, 10), source: 'GitHub API', repos: next }, null, 2)}\n`,
);
console.log(`✔ Refreshed ${Object.keys(next).length} repositories`);
if (problems.length) {
  console.log(`\nNeeds attention:\n${problems.join('\n')}`);
  writeFileSync('health-report.md', `The weekly health check found:\n\n${problems.join('\n')}\n`);
}
