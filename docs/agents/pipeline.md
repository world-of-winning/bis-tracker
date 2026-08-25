# Data pipeline: what runs, in what order

Everything under `scripts/` writes into `src/`. Nothing in `src/` writes back. The
rules each script enforces are in CLAUDE.md § *Data Pipeline Rules*; this file is
the execution order and the dependency graph — which script needs which one to
have run first, and what breaks when it hasn't.

## Layer 1 — libraries (imported, never run)

| File | Role |
|---|---|
| `wowhead-cache.mjs` | Wowhead tooltip fetch with a persistent cache. Exports `fetchTooltip`, `saveCache`, `cacheGet/Set/Delete`. |
| `wago-db2.mjs` | The client's DB2 tables as CSV from wago.tools: an RFC 4180 parser, a cached fetch, a name index, and `dropTable()` — the `JournalEncounterItem` → `JournalEncounter` → `JournalInstance` join that says what drops where. |
| `priority-groups.mjs` | The stat-priority derivation: murlok's published chart → equivalence groups. No network, no disk, so it is testable against fixtures. |
| `src/logic/matching.js` | `fitKind`, `fitRank`, `statGroups`. **The scripts import the app's logic**, not a copy of it — that is what keeps the pipeline and the tracker agreeing on what counts as a fit. |

`wowhead-cache` is used by `generate-spec-data`, `find-alts`, `generate-item-names`.
`wago-db2` is used by `find-alts` (the loot table) and `generate-source-names` (the names).
`priority-groups` is used by `generate-priority-stats`, `generate-spec-data`, and the tests.

## Layer 2 — season prep (by hand, before any generator)

1. `node scripts/generate-tiers.mjs --write` — Raidbots bonus data → the `TIERS` block in `src/data/shared.js`. Depends on nothing else; print-only without `--write`.
2. By hand: `VALID_DUNGEONS` (inside `generate-spec-data.mjs`), `DUNGEONS` and `CURRENT_RAID` (`src/data/shared.js`), and `PART_FIXES` rebuilt from scratch.

`DUNGEONS` and `CURRENT_RAID` are load-bearing twice over now: they name the guides to
scrape, *and* they are the season gate on the alt pool. Get them wrong and `find-alts`
either builds an empty pool or fills it with a retired dungeon's loot.

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
tripped, so a cold forty-spec pass expects to be interrupted; the page cache in
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

### 3. `find-alts.mjs` — standalone when only the alt lists need rebuilding

`buildSeasonPool()` joins the client's loot table and keeps the instances named in
`DUNGEONS` plus `CURRENT_RAID`, then reads each item's slot, armour class, primary
stat and weapon type off its Wowhead tooltip. Non-gear drops — recipes, consumables,
furnishings — have no inventory slot and fall out there. The legacy dungeons carry
both an item and its Midnight re-issue under one name; the re-issue is the one that
rolls secondary stats, and the original is dropped.

Per spec, every pool item the spec can *wear* becomes an alt. Secondary stats do not
gate the list, only order it. See `docs/adr/0002-alt-candidates-from-drop-tables.md`.

Unlike the cross-referenced index it replaced, a run needs nothing from the other spec
files, so `node scripts/find-alts.mjs blood-dk` is a complete answer for one spec.
Nothing is preserved between runs: the pool is rebuilt whole, which is what keeps
`ALTS` from becoming append-only.

It warns if `CURRENT_RAID` disagrees with the instance holding the highest item id.
That is a cross-check, not a correction — go and look at the constant.

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

- `make-fixture.mjs <spec-key>` — cuts the stat charts out of a cached guide page into `tests/fixtures/`. Only when adding a priority test. Never commit a whole page.
- `check-secrets.sh` — the husky `pre-commit` hook calls it. Nothing to run by hand.

## The three caches

| Path | Expiry | Bypass |
|---|---|---|
| `scripts/.wowhead-cache.json` | Never — persistent across runs | Delete the file, or `generate-spec-data --regenerate` |
| `scripts/.murlok-cache/` | `fetchedAt` in `index.json`, 14 days default | `--refresh` / `--max-age` |
| `scripts/.wago-cache/` | Never — the tables change when Blizzard patches | `--refresh` |

File mtime is never expiry: anything that touches a file rewrites it.

The 14-day default on the page cache suits a figure that moves slowly — murlok
restamps a spec every day or so, and the gear behind a group boundary shifts over
weeks. Early in a season it moves faster, so refresh by hand (`--refresh`) when a
season is young and the priorities look behind what players are actually wearing.
Budget for it: the upstream allows roughly three requests a minute, so a full
forty-spec pass is a long, interruptible job.

The cache holds the **guide page**, not the roster JSON. The ratings are read off
the page's own chart rather than summed from equipment — see
`docs/adr/0003-stat-priority-from-the-published-chart.md` for why summing cannot
work. The roster endpoint still exists and still carries per-item, per-character
detail this pipeline no longer fetches; anything needing that (which stats a spec
picks for a crafted item, say) has to fetch it for itself.

## Recipes

```bash
# Normalize data files only. Read-only cache, no network. Safe anytime.
node scripts/generate-spec-data.mjs --fix

# One spec is wrong upstream and has been fixed.
node scripts/generate-spec-data.mjs blood-dk    # runs find-alts for it

# Alt lists only — after a DUNGEONS or CURRENT_RAID change, say.
node scripts/find-alts.mjs                      # all specs
node scripts/find-alts.mjs blood-dk             # or one

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
