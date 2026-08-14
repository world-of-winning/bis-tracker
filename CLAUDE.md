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
- **tier 1 ▲:** Stat mismatch (equipped item is neither BiS nor Alt)
- **tier 2 ◆:** Alt equipped (same stats, but not BiS item)
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

Defined in `src/data/shared.js` as `TIERS[]`. The target grade filter determines `targetIlvl`. If an equipped/bag item's grade max < targetIlvl, it shows "재획득 필요" (re-acquire needed) because upgrading alone cannot reach the target.

**Adventurer is `hidden: true`** — it gets no target button, but it must stay in `TIERS`. Drop it and its bonus_ids match nothing, the ilvl fallback grades a 282-capped Adventurer item as Veteran, and the tracker tells the user to upgrade an item that cannot be upgraded. Anything reading `TIERS` for the UI filters on `!hidden`; anything grading an item does not.

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
| 2 ◆ | Orange | Alt equipped (stat match but not BiS item ID) | varies |
| 1 ▲ | Red | Stat mismatch OR below target grade | `"tierUp"` |

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

#### 4. Stat Matching (`matchBiS` function)
- **PRIORITY_STATS**: Ordered array `[best, ..., worst]` of 4 secondary stats (crit, haste, mastery, vers) per spec.
- **Exact match**: equipped item stats === BiS item stats (same set)
- **Top-2 match**: equipped item has BOTH top 2 priority stats AND has ONLY those stats
- **Stat-less items** (some trinkets with empty `stats` array): skip stat check, match by item ID only
- **statScore formula**: `sum of (n - indexOf(stat))` where n = total priority stats count. Higher score = better stats. Items with lower score appear first in farming priority.

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
- **`priority-stats.json`** is manually curated — **never auto-purge or regenerate**. Manual entries take precedence over Maxroll auto-fetch.
- **`find-alts.mjs`** runs once across ALL specs (cross-referencing BiS lists) — not per-spec. It preserves existing **weapon** ALTS from `generate-spec-data`, and only while their source still exists this season. Preserving anything else would make ALTS append-only: nothing else ever deletes an entry, so a retired season's items would live in the files forever.
- **Stale upstream guides**: Maxroll updates guides one at a time, so at a season boundary some still carry last season's dungeons. `find-alts` keeps those out of the cross-spec index — by spec (no current dungeon anywhere in its data) and by row (a MYTHIC entry whose source is not a current dungeon) — so one lagging guide does not hand every other spec alts it cannot farm. The lagging spec keeps its own stale data; re-run the pipeline once Maxroll updates.
- **Wrong slots upstream**: an item whose Wowhead tooltip contradicts the slot Maxroll filed it under is warned about during generation and kept out of the alt index, but left in its own spec's data. Do not invent a replacement.
- **`--fix`**: Read-only cache, normalize data only, no network calls. Safe to run anytime.
- **`--regenerate`**: Purges Wowhead cache for target specs, full re-fetch. Slow and should be used sparingly.
- **Duplicate item IDs**: When same ID appears in multiple slots, prefer existing file's version for stability.
- **Item source/dungeon names**: Do NOT arbitrarily replace when source doesn't match expectations — verify with Wowhead first.
- **Season swap**: update `VALID_DUNGEONS` (`generate-spec-data.mjs`), `DUNGEONS` (`shared.js`) and `TIERS` (via `generate-tiers.mjs`) **before** running the pipeline, and rebuild `PART_FIXES` from scratch. Stale entries are worse than none: Season 1 mapped "Murder Row" and "Den of Nalorakk" onto Magisters' Terrace, and both are standalone dungeons in Season 2. Confirm the dungeon pool against **two or more** specs — a single spec takes nothing from some dungeons.
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
export var PRIORITY_STATS = ["mastery","haste","crit","vers"];
export var KNOWN_STATS = { itemId: ["crit","haste"], ... };  // BiS+Alt only
export var BIS = [ { slot, simcSlot, en, ko, id, dungeon, stats }, ... ];
export var ALTS = [ { forSlot, id, en, ko, dungeon, stats }, ... ];
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
```

## External Dependencies
- **Wowhead power.js:** Loaded via `<script>` in `index.html`. Shows in-game tooltips on item hover.
- **Wowhead tooltip API:** Dynamic stat lookup for unregistered items during SimC import. No CORS issues (self-hosted domain).
- **Google Fonts:** Cinzel + Noto Sans KR

## Agent skills

### Issue tracker

Issues live as GitHub issues on `world-of-winning/bis-tracker`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at repo root (create lazily, not yet present). See `docs/agents/domain.md`.

## Notes
- Do NOT call `localStorage` directly → use `load()`/`save()` from `src/storage.js`
- BiS/Alt item stats are statically registered in `KNOWN_STATS`; equipped items use dynamic lookup
- Artifact (claude.ai) version is managed separately — uses `window.storage` API, manual sync if needed
