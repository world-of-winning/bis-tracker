# WoW BiS Tracker

## Overview
BiS (Best in Slot) item tracker for WoW. SimC import for gear analysis, farming priority sorting, per-dungeon alt item display.

## Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** CSS (src/styles.css) + inline styles
- **Storage:** localStorage (src/storage.js)
- **External API:** Wowhead tooltip API (nether.wowhead.com) — dynamic item stat lookup
- **Package Manager:** bun
- **Deployment:** Cloudflare Pages (static build)

## Project Structure
```
src/
├── App.jsx              # Spec selection tabs
├── main.jsx             # Entry point
├── sanitize.js          # Input sanitization utilities
├── storage.js           # localStorage wrapper
├── styles.css           # Global CSS + animations
├── components/
│   ├── BisTracker.jsx   # Core tracker component (spec-agnostic)
│   └── TutorialOverlay.jsx  # First-time user tutorial overlay
└── data/
    ├── shared.js         # Dungeon colors, tiers, stat names, fetchItemStats()
    ├── specs.js          # Spec registry (40 specs)
    ├── changelog.js      # Version changelog data
    ├── tutorial.js       # Tutorial content/steps
    ├── sample.js         # Sample SimC data for demo
    ├── prot-paladin.js   # Example: Protection Paladin BiS/Alt/KNOWN_STATS
    └── ...               # 40 spec data files total
```

## Architecture

### Data Flow
1. Spec data (BIS, ALTS, KNOWN_STATS, PRIORITY_STATS) → passed as props to BisTracker
2. SimC text parsing → extract equipped/bag item IDs
3. IDs not in KNOWN_STATS → dynamic lookup via `fetchItemStats()` (Wowhead API)
4. `allStats = KNOWN_STATS + runtimeStats` merge → priority/Alt/worst stat evaluation

### Priority System (tier 1→4)
- **tier 1 ▲:** Stat mismatch (equipped item fits neither the BiS item nor any Alt)
- **tier 2 ◆:** Another list's M+ BiS equipped — a real item, wrong one for this slot
- **tier 3 ↑:** BiS equipped but below target tier
- **tier 4 ✓:** Done
- Within same tier: worst stat equipped → first, larger deficit → first

### Item Grade System (Midnight Season 2)
Items have grade tiers with ilvl caps. Items can be upgraded within their grade but **cannot cross grade boundaries** — a Champion item maxed at 308 must be re-acquired at Hero grade to reach 321.

| Grade | Key | ilvl range | bonus_id range | TIERS bonus |
|---|---|---|---|---|
| Adventurer (모험가) | adventurer | 266–282 | 12817–12824 | 12822 |
| Veteran (노련가) | veteran | 279–295 | 12825–12832 | 12830 |
| Champion (챔피언) | champion | 292–308 | 12833–12840 | 12838 |
| Hero (영웅) | hero | 305–321 | 12841–12848 | 12846 |
| Myth (신화) | myth | 318–334 | 12849–12856 | 12854 |

Defined in `src/data/shared.js` as `TIERS[]`. The baseline an item is judged against is **per item**, not per screen: `dropIlvl(item, plan)` reads the item's acquisition path and the player's farming difficulty and returns the ceiling of the track that content hands over (ADR 0005). If an equipped/bag item's grade max < that, it shows "재획득 필요" (re-acquire needed) because upgrading alone cannot reach it.

`FARMING_DIFFICULTY` in `shared.js` maps each notch to a track: Mythic+ `keys2` → Champion and `keys6` → Hero, raid `normal`/`heroic`/`mythic` → Champion/Hero/Myth. The Mythic+ axis has two bands rather than one per key level because the track is all that separates them — the end-of-dungeon chest turns Hero at +6 and stays Hero through +10 and beyond. What +10 adds is a Myth slot in the Great Vault, and `vaultVerdict` reads the top grade directly and never consults the plan. Crafted answers to neither axis and caps at `CRAFTED_ILVL` (331).

**Adventurer and Veteran are `hidden: true`** — no content the tracker's audience runs hands them over, so nothing in the UI names them, but they must stay in `TIERS`. Drop a row and its bonus_ids match nothing, and the ilvl fallback grades the item one track too high — a 282-capped Adventurer item read as Veteran, a 295-capped Veteran item read as Champion — so the tracker tells the user to upgrade an item that cannot be upgraded. Anything reading `TIERS` for the UI filters on `!hidden`; anything grading an item does not.

Regenerate the table with `node scripts/generate-tiers.mjs --write`, which derives it from Raidbots' bonus data (`--season N` to pin a season, print-only without `--write`). The Season 1 table was written by hand and sat a step out of alignment with the real bonus_id blocks.

### Game Mechanics (Domain Logic)

> Rules encoding WoW-specific mechanics. Each subsection documents a concept that is frequently misunderstood.

#### 1. bonus_id vs ilvl — Not Interchangeable
- **bonus_id**: Encoded grade indicator from SimC (`####/####` slash-separated → stored as `####:####` colon-separated). Each TIERS entry has a `bonusMin..bonusMax` range.
- **ilvl**: Item power level (e.g., 295, 308, 321, 334). Represents upgrade progress *within* a grade.
- Grade ilvl bands **overlap** — 305 is both Champion 5/6 and Hero 1/6 — so the ilvl fallback picks the *highest* grade containing the ilvl. Guessing low would claim an item must be re-farmed when it only needs upgrading; guessing high merely withholds a warning.
- `itemTierIdx(bonus, ilvl)` in `src/logic/priority.js`: checks bonus_id ranges **first** → falls back to ilvl **only** if no bonus_id match.
```
WRONG: Treating bonus_id and ilvl as equivalent for grade detection
RIGHT: bonus_id determines grade; ilvl is fallback only when bonus_id is absent
```

#### 2. Grade Boundaries Cannot Be Crossed by Upgrade
This is the single most misunderstood mechanic. A Veteran item at max ilvl 295 **cannot** be upgraded to Hero 321 — it must be **re-acquired** (re-farmed) at Hero grade. Grade beats ilvl: a Champion 6/6 at 308 still reads "re-acquire" against a Hero target, even though 308 is above Hero's floor of 305.

Two distinct upgrade statuses (`upgradeStatus` field):
- **`"tierUp"`** → "재획득 필요" (re-acquire needed): item's grade < target grade. Must re-farm the item.
- **`"enhance"`** → "강화 필요" (upgrade needed): item's grade >= target grade but ilvl < target ilvl. Can upgrade in place.
```
WRONG: "ilvl 295, target 321 → upgrade needed"
RIGHT: "Veteran grade (max 295), target Hero (321) → RE-ACQUIRE needed (tierUp)"
       "Hero grade at ilvl 311, target Hero 321 → UPGRADE needed (enhance)"
       "Champion grade at ilvl 308, target Hero 321 → RE-ACQUIRE needed (tierUp)"
```

#### 3. Priority Tier Calculation (in `calcPriority`)

| Tier | Icon | Condition | upgradeStatus |
|------|------|-----------|---------------|
| 4 ✓ | Green | BiS/Alt at target ilvl, or user-marked acquired | null |
| 3 ↑ | Yellow | BiS/Alt equipped, at target grade, ilvl below target | `"enhance"` |
| 2 ◆ | Orange | An item from `knownBisIds` equipped — someone's M+ BiS, not a fit for this slot | varies |
| 1 ▲ | Red | No fit (`fitKind` returned null) OR below target grade | `"tierUp"` |

An **equivalent fit** grades exactly like an exact one — 4 or 3, green. It is a fit; the
slot is done. What distinguishes the two is a label: `matchBiS` records `fitKind`'s own
answer in `altItems` (`"exact"` / `"equivalent"` / `"mythic"`), and `ItemCard` renders
`ui.equivalentFit` off it. Keep the two in the same vocabulary — remapping one to a
different word is how a reader loses the thread.

**Alt rows are not graded.** The table above is about the item the player has equipped
against the slot's BiS. An ALTS row is one of the slot's other options, and there are
around eighty a spec: `calcAltPriority` asks only whether the player already has that
item (acquired, or equipped at target ilvl) and leaves every other row uncoloured. Alts
also stay out of `calcSourceFarmCount` and `calcDungeonScore` — with eighty rows an alt
count never reaches zero, so a dungeon's "done" would never light up.

**visualTier** (for UI display) differs from actual priority tier:
- `wrongArmor` OR `wrongPrimary` → visualTier **always 1** (red warning)
- `upgradeStatus === "enhance"` → visualTier **4** (green, just needs upgrade currency)
- `upgradeStatus === "tierUp"` → visualTier **2** (orange, needs re-farming)
- Otherwise → visualTier = actual priority tier
```
WRONG: Using priority tier value directly for UI display
RIGHT: Apply visualTier overrides — enhance shows green, tierUp shows orange, wrong armor always red
```

**Sort order** within same tier: worse stat score first (lower `statScore` = worse stats = higher farming priority), then larger ilvl deficit first.

#### 4. Stat Matching (`fitKind` in `src/logic/matching.js`)
- **PRIORITY_STATS**: a list of **equivalence groups**, best group first — `[["haste"], ["mastery","crit"], ["vers"]]`. Two stats share a group when the spec values them closely enough that swapping one for the other is not worth a re-farm. A flat array of four reads as four groups of one.
- **`fitKind(itemStats, bisStats, priorityStats)`** answers `"exact"`, `"equivalent"`, or `null`:
  - **exact** — the same set of stats.
  - **equivalent** — replacing each stat with the index of its group yields the same multiset. Equal size falls out of that, so a one-stat item stands in only for a one-stat BiS item.
  - **null** — neither. Sharing a group is not enough: crit+mastery against a haste+mastery BiS is `null`, because the multisets differ.
- An equivalent fit **is a fit** — the slot is done, green, no re-farm.
- **`fitKind` grades; it does not select.** Its one caller is `matchBiS`, asking whether the equipped item stands in for the slot's BiS. It used to gate the alt list too, and that was wrong: the rosters show 42 of 50 Blood DKs wearing a haste/mastery helm although the spec's pair is crit/mastery, because a tier piece is worn for its set bonus whatever it rolls and secondaries get tuned with rings, neck, gems and enchants. Gating the list on stats hid every such item. See `docs/adr/0002-alt-candidates-from-drop-tables.md`.
- **`scoreStats(itemStats, priorityStats)`**, beside it, answers the other question — which of a slot's options to look at first. It sums `n - groupIndex(stat)`, so higher is better and stats sharing a group score alike. `find-alts.mjs` orders ALTS with it and `statScore` in `priority.js` delegates to it. Two questions, one definition each; do not let either grow into the other.
- **Stat-less items** (some trinkets with empty `stats` array): `fitKind` declines to answer; the caller matches by item ID only.
- **statScore formula**: `sum of (n - groupIndex(stat))` where n = number of groups. Higher score = better stats; lower score farms first. Reading **group** position rather than list position is the point — stats in one group score the same and stop breaking ties against each other.
```
WRONG: taking the top two stats of the priority and demanding an item carry exactly those
RIGHT: fitKind over equivalence groups — and a one-stat item never satisfies a two-stat BiS
```
The top-two rule is gone rather than kept alongside. It was guessing at equivalence with no
number behind it and guessing wrong — Blood Death Knight's top two sit at 0.88, well outside
the 0.95 that makes a re-farm pointless. A spec whose stats are genuinely close now says so
in its groups. **Do not reintroduce a positional shortcut**: any "top N" rule is a claim about
distance that only the measured means can make.

#### 5. Slot Matching & Weapons
- **Rings**: finger1 ↔ finger2 interchangeable. If BiS finger1 matches equipped finger2, auto-redirects.
- **Trinkets**: trinket1 ↔ trinket2 interchangeable. Same redirect logic.
- **Weapons**: 1H+shield vs 2H are **NOT interchangeable** → `weaponMismatch` flag blocks matching.
- **ALTS `forSlot` expansion**: `"ring"` → finger1+finger2, `"trinket"` → trinket1+trinket2, `"weapon"` → main_hand+off_hand.

#### 6. Armor Type & Primary Stat
| Armor | Classes |
|-------|---------|
| Plate | Warrior, Paladin, Death Knight |
| Mail | Hunter, Shaman, Evoker |
| Leather | Rogue, Monk, Druid, Demon Hunter |
| Cloth | Mage, Warlock, Priest |

- **Armor-restricted slots** (`ARMOR_SLOTS`): head, shoulder, chest, wrist, hands, waist, legs, feet
- Accessories (neck, back, rings, trinkets) have **no** armor type restriction
- Wrong armor type or wrong primary stat → **visualTier forced to 1** regardless of actual match

#### 7. Data Pipeline Rules

> Execution order and the dependency graph — which script has to have run first, and what breaks when it hasn't — are in `docs/agents/pipeline.md`. The rules below are what each script enforces once it runs.

- **`priority-stats.json`** is **generated**, from the stat chart murlok publishes on each spec's guide page. See `docs/adr/0003-stat-priority-from-the-published-chart.md`, which supersedes 0001. Entries are lists of **equivalence groups**, not a flat order: two stats sit in one group when a spec values them closely enough that swapping one for the other is not worth a re-farm. A flat four-stat array still reads correctly — it means four groups of one.
  - Source is the guide page itself, `https://murlok.io/{class}/{spec}/m+`, server-rendered. `parseStatChart` reads the bar heights for the ratios and the `+NNN` totals for the record. **Bars are matched by label, never by position** — the page draws a second chart for tertiary stats whose own tallest bar is also 100%, and reading it positionally would put leech above haste. Fewer than four secondary bars means the page changed shape; the spec keeps what it had.
  - **The ratings are read, not computed.** Summing them off the roster JSON was the earlier approach and cannot work: that payload carries no enchants and no gems, which is where haste and versatility mostly sit, and it carries whatever retired-season gear a player has not replaced. Blood Death Knight came out `mastery > crit > haste > vers` against an observable `haste > crit ≈ mastery > vers`. Do not reintroduce an aggregation step.
  - **The grouping is ours.** The page prints a flat order beside the chart, and for Blood Death Knight it puts crit above mastery at a ratio of 0.992. That is the exact failure the groups exist to fix.
  - Group boundaries are cut where the ratio between neighbouring bar heights drops below **0.95**. One threshold, not two: the old thin-sample variant existed because our own mean over few characters was noisy, and the page does not publish a sample size to condition on.
  - The endpoint rate-limits at roughly **three requests a minute**, on a sliding window that escalates once tripped. Pacing does not get a forty-spec pass through it and nothing in the pipeline claims otherwise — the cache is what makes a run complete. Requests are still paced (40s, widening by half on every 401) and retried on a patient ladder, but a cold pass expects to be interrupted.
  - **A failed fetch never blanks a spec.** In order: a fresh cached page is used as-is; a stale one is refetched; a stale one that cannot be refetched is used anyway and reported; a spec with no cached page at all keeps the priority it already had. Old numbers carry a date, an old priority does not.
  - Every spec whose priority changes is logged, and **order changes and group-boundary changes are reported apart**. A spec can keep its order and still change what the matcher does: merging mastery with crit turns every crit item in that slot from a re-farm order into a finished slot, and splitting them turns it back. Comparing flattened orders sees neither, so the loudest change in a run would pass silently.
  - Regenerate with `node scripts/generate-priority-stats.mjs --write`, print-only without `--write`. `--spec <key>` narrows to one spec, `--max-age <days>` sets when a cached page expires (default 14), `--refresh` is `--max-age 0`. The derivation is a pure function in `scripts/priority-groups.mjs`, tested against stored fixtures; fetching and caching sit outside it.
  - The cache in `scripts/.murlok-cache/` holds each **page as it arrived**, not a trimmed copy, with `index.json` carrying the fetch times that decide expiry. Trimming happens on the way out, so widening what the parser reads does not mean refetching forty specs through the rate limit. Do not use file mtime for expiry — anything that touches a file rewrites it.
  - Test fixtures come out of that cache via `node scripts/make-fixture.mjs <key>`. A fixture keeps **both** charts, tertiary included: picking the right one is part of what the parser does, and a fixture that had already picked would not test it.
  - `PRIORITY_STATS` in each spec data file carries the same groups. Everything that reads it goes through `statGroups()` in `src/logic/matching.js`, which lifts a flat array of four into four groups of one, so a spec the generator never reached still works.
- **`find-alts.mjs`** builds the season pool once — `buildSeasonPool()` joins the client's `JournalEncounterItem` through `JournalEncounter` to `JournalInstance` (via `scripts/wago-db2.mjs`) and keeps the instances named in `DUNGEONS` plus `CURRENT_RAID`. Non-gear drops (recipes, consumables, furnishings) have no inventory slot and fall out on their own. Then, per spec, every pool item the spec can *wear* becomes an alt: armour class, primary stat, class lock, weapon type and hand count are the gate. **Secondary stats are not a gate**, only the sort order. Nothing is preserved between runs — the pool is regenerated whole, which is what stops ALTS becoming append-only.
- **The season gate is the pool, not a filter.** A retired dungeon is not in `DUNGEONS`, so its loot never enters. This replaced a cross-referenced index that needed stale-guide detection by spec and by row; none of that is needed now, because a lagging Maxroll guide can no longer contribute items to anyone else.
- **`CURRENT_RAID`** (in `shared.js`) is maintained by hand beside `DUNGEONS`. The loot table carries every raid ever shipped and marks no season — `DisplaySeasonID` is 0 on 23,902 of its 23,978 rows. `buildSeasonPool` cross-checks it against the instance holding the highest item id and warns on a mismatch, but that heuristic assumes Blizzard never adds an item to an older raid, so it does not get to decide.
- **Wrong slots upstream**: an item whose Wowhead tooltip contradicts the slot Maxroll filed it under is warned about during generation and kept out of the alt index, but left in its own spec's data. Do not invent a replacement.
- **`--fix`**: Read-only cache, normalize data only, no network calls. Safe to run anytime.
- **`--regenerate`**: Purges Wowhead cache for target specs, full re-fetch. Slow and should be used sparingly.
- **Duplicate item IDs**: When same ID appears in multiple slots, prefer existing file's version for stability.
- **Item source/dungeon names**: Do NOT arbitrarily replace when source doesn't match expectations — verify with Wowhead first.
- **Localized dungeon/boss names**: `node scripts/generate-source-names.mjs` fills four blocks in `src/i18n/*.json` from the client's own DB2 tables, served as per-locale CSV by wago.tools (`MapChallengeMode` for dungeons, `JournalEncounter`/`JournalInstance` for bosses and raids). Rows join across locales by DB2 row ID, never by name. Print-only without `--write`; `--resolve` prints candidate rows for a key that has no ID yet; `--refresh` bypasses the CSV cache in `scripts/.wago-cache/`.
  - **Stage 1** writes `dungeonsFull` and `sourcesFull` — the client's own strings, every locale including `en`.
  - **Stage 2** derives the short labels the filter row uses. `dungeons` is generated for **ko/zhCN/zhTW only**; the Latin and Cyrillic locales keep their hand-written English acronyms, which is what the tooling those players already use ships them (the Raider.IO addon hands `POS`/`SR` to every client regardless of locale, and `MapChallengeMode` has no `ShortName_lang` to draw a localized one from). `sources` is trimmed from `sourcesFull` by rule — leading bracketed epithet, appositive clause after a comma, trailing determiner clause that is not part of a prepositional phrase.
  - **Ownership is per block, not per file**: `en.dungeons` (M+ acronyms) and `en.sources` (trimmed badge labels) are hand-written and never generated; the `*Full` blocks beside them are.
  - A `dungeons` label wider than 18 display columns (CJK counts 2) needs an entry in `scripts/dungeon-short.json`; two dungeons resolving to the same label is also fatal. Both exit non-zero rather than shipping a button the user cannot read or tell apart. Wide `sources` labels only warn — fix them in `scripts/source-short.json` if the filter row bothers you.
- **Season swap**: update `VALID_DUNGEONS` (`generate-spec-data.mjs`), `DUNGEONS`, `CURRENT_RAID`, `FARMING_DIFFICULTY` and `CRAFTED_ILVL` (`shared.js`) and `TIERS` (via `generate-tiers.mjs`) **before** running the pipeline, and rebuild `PART_FIXES` from scratch. Stale entries are worse than none: Season 1 mapped "Murder Row" and "Den of Nalorakk" onto Magisters' Terrace, and both are standalone dungeons in Season 2. Confirm the dungeon pool against **two or more** specs — a single spec takes nothing from some dungeons.
i

## Bug Fix Approach
- When fixing a bug, identify the EXACT root cause before changing code. Do not attribute bugs to HMR/caching without evidence.
- Make minimal, targeted fixes. Do not add global mappings or broad fixes that affect unrelated items/specs.
- When filtering or transforming data, verify the change doesn't break adjacent features (e.g., removing ALTS, destroying manual data).
- If the first approach fails, step back and re-analyze rather than patching the patch.

### Per-Spec Data File Format
```js
export var SPEC_LABEL = "Spec Name";
export var SPEC_KEY = "url-safe-key";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/{spec}-raid-guide";
export var STORAGE_KEY = "bis-{key}-v1";
export var STAT_CACHE_KEY = "{key}-stat-cache-v1";
export var THEME = { accent, accentLight, accentBg, accentBorder, shimmer, btnBg };
export var PRIORITY_STATS = [["mastery"],["haste","crit"],["vers"]];  // equivalence groups
export var KNOWN_STATS = { itemId: ["crit","haste"], ... };  // BiS+Alt only
export var BIS = [ { slot, simcSlot?, id, source, stats }, ... ];
export var ALTS = [ { forSlot, id, source, stats }, ... ];  // every pool item the spec can wear, best stats first
// Item names are not in these files — they come from src/i18n/items/*.json.
export var DUNGEONS = [ ... ];  // Midnight first, legacy dungeons after
```

## Adding a New Spec
1. Prepare BiS list for 16 slots (English name + dungeon)
2. Get Item IDs via Wowhead search API: `wowhead.com/search/suggestions-template?id=items&q={name}`
3. Get Korean names via Wowhead tooltip API: `nether.wowhead.com/tooltip/item/{id}?dataEnv=1&locale=1`
4. Get stats via Wowhead tooltip API: `nether.wowhead.com/tooltip/item/{id}?dataEnv=1&locale=0` → `<!--rtg32-->` crit, `<!--rtg36-->` haste, `<!--rtg49-->` mastery, `<!--rtg40-->` vers
5. Find Alt items from dungeon zone drop tables (same slot + same secondary stat combo)
6. Create `src/data/{spec-key}.js` → add import to `src/data/specs.js`

## Language Rules
- UI text: i18n supported
- Code variables/functions: English
- Item, Skill, and other WoW related names for each language should be fetched from Wowhead links: e.g. `/{lang}/item={itemId}`

## Build & Dev
```bash
bun install
bun run dev      # Dev server (WSL: --host auto-enabled)
bun run build    # Production build → dist/
bun run preview  # Preview built output
bun run test     # vitest, once
```

Tests live in `tests/`, run under `vitest.config.js` rather than the app's own
vite config — the app config loads the Cloudflare plugin and boots a worker, and
nothing under test needs a bundler or a DOM. Fixtures in `tests/fixtures/` are
upstream payloads trimmed to the fields the code under test reads.

## External Dependencies
- **Wowhead power.js:** Loaded via `<script>` in `index.html`. Shows in-game tooltips on item hover.
- **Wowhead tooltip API:** Dynamic stat lookup for unregistered items during SimC import. No CORS issues (self-hosted domain).
- **Google Fonts:** Cinzel + Noto Sans KR

## Agent skills

### Issue tracker

Issues live as GitHub issues on `world-of-winning/bis-tracker`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

### Data pipeline

The generators under `scripts/` run in a fixed order and share three caches. See `docs/agents/pipeline.md`.

## Branching

**One branch per issue, cut from `main`, named `<type>/<issue>-<slug>`** — the type is
the conventional-commit type the work will carry (`feat`, `fix`, `chore`), so
`feat/5-observed-stat-priority`. commitlint already enforces that vocabulary on the
commits; the branch reading the same way means the PR title writes itself.

Never commit to `main`. If work has already started in the working tree, `git switch -c`
carries it over — uncommitted changes follow the switch, so there is no reason to have
committed first.

One branch per **shippable unit**, which is not always one issue. A parent issue and its
children share a branch when the children cannot ship apart — #4 → #5, #6 is one branch
named for the parent, because #5 alone would land scaffolding whose only purpose is for
#6 to delete it, and a reviewer would be reading a diff that undoes itself. Split them
only when each child is worth shipping on its own.

Worktrees (`git worktree add`) only when two branches genuinely need to be checked out at
once — a long review while other work continues, or agents editing the same files in
parallel. They are not free here: each worktree needs its own `bun install`, and
`scripts/.murlok-cache/` is per-worktree, so a fresh one starts with a cold page cache
and a rate limit that will not let it warm up quickly.

## Notes
- Do NOT call `localStorage` directly → use `load()`/`save()` from `src/storage.js`
- BiS/Alt item stats are statically registered in `KNOWN_STATS`; equipped items use dynamic lookup
- Artifact (claude.ai) version is managed separately — uses `window.storage` API, manual sync if needed
