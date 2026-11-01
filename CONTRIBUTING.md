# Contributing

Thank you for helping keep this map accurate and useful. Quality matters more than size: every entry should help someone learn, defend or test responsibly.

## What we accept

- **Courses and platforms** where people can learn or practice legally.
- **Labs**: deliberately vulnerable apps and environments.
- **Tools** that are widely used, documented and maintained.
- **References and curated lists** that are well organized and maintained.

## What we don't accept

- Malware, stealers, RATs, ransomware or anything designed to harm people who didn't consent.
- Collections of working exploits for unpatched vulnerabilities, leaked data or credentials.
- GitHub projects that are archived or have had no commits for more than 2 years (unless they are a well-known reference with no modern replacement, explained in the pull request).
- Paid products with no free tier, and marketing pages.
- Duplicates of something already listed, unless it's clearly better. Then replace the old entry in the same pull request.

## Adding a resource

1. Choose the right file in [`data/`](data). Each file is one category.
2. Add an entry:

   ```json
   {
     "id": "example-tool",
     "name": "Example Tool",
     "url": "https://example.org/",
     "type": "tool",
     "description": "What it does, in one factual sentence.",
     "repo": "example/example-tool",
     "level": "intermediate",
     "free": true,
     "tags": ["web", "scanner"],
     "added": "2026-11-01"
   }
   ```

   | Field | Notes |
   | :-- | :-- |
   | `type` | `course`, `platform`, `lab`, `tool`, `reference` or `list` |
   | `level` | `beginner`, `intermediate` or `advanced` (omit if it fits everyone) |
   | `repo` | `owner/name` if the project lives on GitHub. Health data is fetched automatically. |
   | `free` | `true` only if it's free to use. Use `note` to explain free plans with limits. |
   | `description` | 20-180 characters, factual, no superlatives, in your own words |

3. Run the checks (Node.js 20+, no dependencies):

   ```bash
   npm run format
   npm run check
   ```

   If you added a new GitHub project, `npm run check` will ask for health data. Either run `GITHUB_TOKEN=<token> npm run health`, or leave it to a maintainer.
4. Open a pull request with one resource per pull request.

## Fixing or removing a resource

Open a pull request or a [problem report](https://github.com/Ethos6/Hacking/issues/new?template=problem.yml). If a listed project has been compromised or now ships malware, please report it privately through [Security advisories](https://github.com/Ethos6/Hacking/security/advisories/new) instead.

## Learning paths

Paths live in [`paths/`](paths). Improvements are welcome: keep steps ordered, explain *why* each step matters, and link only to resources that are on the map.
