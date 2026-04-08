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

### Item Grade System (Midnight Season 1)
Items have grade tiers with ilvl caps. Items can be upgraded within their grade but **cannot cross grade boundaries** — a Champion item maxed at 263 must be re-acquired at Hero grade to reach 276.

| Grade | Key | Max ilvl | TIERS bonus |
|---|---|---|---|
| Veteran (노련가) | veteran | 250 | 12782 |
| Champion (챔피언) | champion | 263 | 12790 |
| Hero (영웅) | hero | 276 | 12798 |
| Myth (신화) | myth | 289 | 12806 |

Defined in `src/data/shared.js` as `TIERS[]`. The target grade filter determines `targetIlvl`. If an equipped/bag item's grade max < targetIlvl, it shows "재획득 필요" (re-acquire needed) because upgrading alone cannot reach the target.

### Game Mechanics (Domain Logic)

> Rules encoding WoW-specific mechanics. Each subsection documents a concept that is frequently misunderstood.

#### 1. bonus_id vs ilvl — Not Interchangeable
- **bonus_id**: Encoded grade indicator from SimC (`####/####` slash-separated → stored as `####:####` colon-separated). Each TIERS entry has a `bonusMin..bonusMax` range.
- **ilvl**: Item power level (e.g., 250, 263, 276, 289). Represents upgrade progress *within* a grade.
- `itemTierIdx(bonus, ilvl)` in BisTracker.jsx: checks bonus_id ranges **first** → falls back to ilvl **only** if no bonus_id match.
```
WRONG: Treating bonus_id and ilvl as equivalent for grade detection
RIGHT: bonus_id determines grade; ilvl is fallback only when bonus_id is absent
```

#### 2. Grade Boundaries Cannot Be Crossed by Upgrade
This is the single most misunderstood mechanic. A Veteran item at max ilvl 250 **cannot** be upgraded to Hero 276 — it must be **re-acquired** (re-farmed) at Hero grade.

Two distinct upgrade statuses (`upgradeStatus` field):
- **`"tierUp"`** → "재획득 필요" (re-acquire needed): item's grade < target grade. Must re-farm the item.
- **`"enhance"`** → "강화 필요" (upgrade needed): item's grade >= target grade but ilvl < target ilvl. Can upgrade in place.
```
WRONG: "ilvl 250, target 276 → upgrade needed"
RIGHT: "Veteran grade (max 250), target Hero (276) → RE-ACQUIRE needed (tierUp)"
       "Hero grade at ilvl 270, target Hero 276 → UPGRADE needed (enhance)"
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
- **`find-alts.mjs`** runs once across ALL specs (cross-referencing BiS lists) — not per-spec. Existing weapon ALTS from `generate-spec-data` are preserved.
- **`--fix`**: Read-only cache, normalize data only, no network calls. Safe to run anytime.
- **`--regenerate`**: Purges Wowhead cache for target specs, full re-fetch. Slow and should be used sparingly.
- **Duplicate item IDs**: When same ID appears in multiple slots, prefer existing file's version for stability.
- **Item source/dungeon names**: Do NOT arbitrarily replace when source doesn't match expectations — verify with Wowhead first.
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

## Notes
- Do NOT call `localStorage` directly → use `load()`/`save()` from `src/storage.js`
- BiS/Alt item stats are statically registered in `KNOWN_STATS`; equipped items use dynamic lookup
- Artifact (claude.ai) version is managed separately — uses `window.storage` API, manual sync if needed

<!-- rtk-instructions v2 -->
# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:
```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)
```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (90-99% savings)
```bash
rtk cargo test          # Cargo test failures only (90%)
rtk vitest run          # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)
```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)
```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)
```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)
```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%)
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)
```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)
```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)
```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands
```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category | Commands | Typical Savings |
|----------|----------|-----------------|
| Tests | vitest, playwright, cargo test | 90-99% |
| Build | next, tsc, lint, prettier | 70-87% |
| Git | status, log, diff, add, commit | 59-80% |
| GitHub | gh pr, gh run, gh issue | 26-87% |
| Package Managers | pnpm, npm, npx | 70-90% |
| Files | ls, read, grep, find | 60-75% |
| Infrastructure | docker, kubectl | 85% |
| Network | curl, wget | 65-70% |

Overall average: **60-90% token reduction** on common development operations.
<!-- /rtk-instructions -->
