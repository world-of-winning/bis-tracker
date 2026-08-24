# Data pipeline: what runs, in what order

Everything under `scripts/` writes into `src/`. Nothing in `src/` writes back. The
rules each script enforces are in CLAUDE.md § *Data Pipeline Rules*; this file is
the execution order and the dependency graph — which script needs which one to
have run first, and what breaks when it hasn't.

## Layer 1 — libraries (imported, never run)

| File | Role |
|---|---|
| `wowhead-cache.mjs` | Wowhead tooltip fetch with a persistent cache. Exports `fetchTooltip`, `saveCache`, `cacheGet/Set/Delete`. |
| `priority-groups.mjs` | The observed-priority derivation: roster → equivalence groups. No network, no disk, so it is testable against fixtures. |
| `src/logic/matching.js` | `fitKind`, `fitRank`, `statGroups`. **The scripts import the app's logic**, not a copy of it — that is what keeps the pipeline and the tracker agreeing on what counts as a fit. |

`wowhead-cache` is used by `generate-spec-data`, `find-alts`, `generate-item-names`.
`priority-groups` is used by `generate-priority-stats`, `generate-spec-data`, and the tests.

## Layer 2 — season prep (by hand, before any generator)

1. `node scripts/generate-tiers.mjs --write` — Raidbots bonus data → the `TIERS` block in `src/data/shared.js`. Depends on nothing else; print-only without `--write`.
2. By hand: `VALID_DUNGEONS` (inside `generate-spec-data.mjs`), `DUNGEONS` (`src/data/shared.js`), and `PART_FIXES` rebuilt from scratch.

Run these first. A generator pass against last season's dungeon pool files every
item under the wrong source, and `find-alts` then indexes the wrong set.

## Layer 3 — the pipeline

```
generate-priority-stats.mjs --write
    │  murlok.io  →  scripts/priority-stats.json
    │             →  PRIORITY_STATS in every src/data/{spec}.js
    ▼
generate-spec-data.mjs
    │  maxroll + Wowhead  →  src/data/{spec}.js  (BIS, KNOWN_STATS, ALTS)
    │  reads priority-stats.json for PRIORITY_STATS
    └─ calls find-alts in-process for every spec it wrote
    ▼
generate-item-names.mjs              generate-source-names.mjs --write
    src/i18n/items/{locale}.json     src/i18n/{locale}.json
```

### 1. `generate-priority-stats.mjs`

Runs first, because `generate-spec-data` reads what it writes. It writes
`scripts/priority-stats.json` **and** patches `PRIORITY_STATS` in each spec file
directly, so a priority-only change needs nothing downstream.

`--write` to commit, print-only without it. `--spec <key>` narrows, `--max-age
<days>` sets cache expiry (default 14), `--refresh` is `--max-age 0`.

Upstream rate-limits at roughly three requests a minute and escalates once
tripped, so a cold forty-spec pass expects to be interrupted; the roster cache in
`scripts/.murlok-cache/` is what lets a run finish. A failed fetch never blanks a
spec — the worst case keeps the priority already on disk.

### 2. `generate-spec-data.mjs`

The big one. Scrapes Maxroll guides, resolves items through Wowhead, writes the
whole spec file.

The link to priority is two-way. It reads `priority-stats.json` for the spec's
groups; if there is no entry it falls back to Maxroll's own stat-priority widget
and **writes that back** into `priority-stats.json`. So the file is not purely
generate-priority-stats' output — a spec the observed generator never reached
gets backfilled here. With neither source, `PRIORITY_STATS` lands as `[]` and the
matcher has nothing to rank with.

Flags: bare spec key for one spec, `--list`, `--missing`, `--skip-done`,
`--force`, `--fix` (rebuild from cache, no network), `--regenerate` (purge cache,
full re-fetch — slow, use sparingly).

**It runs `find-alts` itself** at the end, over the specs it wrote plus any spec
whose `ALTS` is empty. You do not normally invoke `find-alts` separately.

### 3. `find-alts.mjs` — only on its own when re-cross-referencing

Standalone runs are for re-linking alts without regenerating spec data. It builds
one index across **all** spec files, so:

- every spec file must already exist and be current;
- run it with **no argument**. Passing a single spec key recomputes only that
  spec's alts — the index is still global, but the other specs keep whatever
  alts they had, which is stale the moment BiS lists move.

### 4. `generate-item-names.mjs`

Scans the spec files for item IDs, fetches localized names, writes
`src/i18n/items/{locale}.json`. **After** spec data — it has nothing to scan
otherwise. Locale args narrow the run (`fr de`); `--missing` fetches only IDs not
already in the locale files; `--list` prints the IDs.

### 5. `generate-source-names.mjs`

Independent of the item-name run, but still after spec data, because new dungeons
and bosses enter the vocabulary there. It takes its keys from `en.json`'s
`dungeons` / `sources` blocks and maps them to DB2 row IDs held in the script's
own `SOURCE_IDS`. **A new boss needs its row ID first**: run `--resolve` to print
candidate rows, confirm one, add it to `SOURCE_IDS`, then `--write`.

`--refresh` bypasses the CSV cache. Fatal on a `dungeons` label over 18 display
columns or on two dungeons collapsing to the same label; wide `sources` labels
only warn.

## Off the pipeline

- `make-fixture.mjs <spec-key>` — trims a cached roster into `tests/fixtures/`. Only when adding a priority test. Never commit a raw response.
- `check-secrets.sh` — the husky `pre-commit` hook calls it. Nothing to run by hand.

## The three caches

| Path | Expiry | Bypass |
|---|---|---|
| `scripts/.wowhead-cache.json` | Never — persistent across runs | Delete the file, or `generate-spec-data --regenerate` |
| `scripts/.murlok-cache/` | `fetchedAt` in `index.json`, 14 days default | `--refresh` / `--max-age` |
| `scripts/.wago-cache/` | Never | `--refresh` |

File mtime is never expiry: anything that touches a file rewrites it.

The 14-day default on the roster cache was chosen for stat priority, which is the
only thing the rosters are used for and which moves slowly. Early in a season they
churn faster than that, so refresh by hand (`--refresh`) when a season is young and
the priorities look behind what players are actually wearing. Budget for it: the
upstream allows roughly three requests a minute, so a full forty-spec pass is a
long, interruptible job.

Do not reach for the rosters as a source of *farmable items* — that was measured on
 #9 and rejected. An equipment snapshot shows what players have not replaced yet, so
61% of the candidates it produced were last season's. #12 takes that job to the
client's own drop tables instead.

## Recipes

```bash
# Normalize data files only. Read-only cache, no network. Safe anytime.
node scripts/generate-spec-data.mjs --fix

# One spec is wrong upstream and has been fixed.
node scripts/generate-spec-data.mjs blood-dk    # runs find-alts for it
node scripts/find-alts.mjs                      # then re-link across all specs

# Stat priority only — nothing downstream needs re-running.
node scripts/generate-priority-stats.mjs --write

# Full season swap.
node scripts/generate-tiers.mjs --write
#   ... then VALID_DUNGEONS / DUNGEONS / PART_FIXES by hand ...
node scripts/generate-priority-stats.mjs --write
node scripts/generate-spec-data.mjs
node scripts/generate-item-names.mjs
node scripts/generate-source-names.mjs --write
```
