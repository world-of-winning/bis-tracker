# Changelog

## v2.0.0-rc.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.12.4...v2.0.0-rc.1)

### 🚀 Enhancements

- **data:** Grade gear on Midnight Season 2 upgrade tracks ([38195a1](https://github.com/world-of-winning/bis-tracker/commit/38195a1))
- **scripts:** Crawl Maxroll for the Midnight Season 2 pool ([bda0f9a](https://github.com/world-of-winning/bis-tracker/commit/bda0f9a))
- **data:** Regenerate all 40 specs for Midnight Season 2 ([3aa0fee](https://github.com/world-of-winning/bis-tracker/commit/3aa0fee))
- **i18n:** Translate Season 2 dungeon and source names in ten locales ([56655c9](https://github.com/world-of-winning/bis-tracker/commit/56655c9))
- **i18n:** Localize dungeon and boss names from client DB2 ([fce7339](https://github.com/world-of-winning/bis-tracker/commit/fce7339))
- **ui:** Announce Midnight Season 2 and refresh site metadata ([bc5a22d](https://github.com/world-of-winning/bis-tracker/commit/bc5a22d))

### 🩹 Fixes

- **data:** File The Coiled Altar as a raid boss, not a dungeon ([d0c677e](https://github.com/world-of-winning/bis-tracker/commit/d0c677e))
- **scripts:** Recover trinket and dual-wield rows from Season 2 tables ([4cd62d5](https://github.com/world-of-winning/bis-tracker/commit/4cd62d5))

### 📖 Documentation

- Describe the Season 2 grade system and season-swap procedure ([a1433ab](https://github.com/world-of-winning/bis-tracker/commit/a1433ab))

### 🏡 Chore

- Remove rtk-instructions block, add Agent skills section ([3f3dbe3](https://github.com/world-of-winning/bis-tracker/commit/3f3dbe3))
- **dev:** Pin dev server ports above the WSL2 ephemeral range ([c1a4aa6](https://github.com/world-of-winning/bis-tracker/commit/c1a4aa6))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.12.4

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.12.3...v1.12.4)

### 🩹 Fixes

- Verify Tier-set items via set-bonus marker instead of text guessing ([2397ffd](https://github.com/world-of-winning/bis-tracker/commit/2397ffd))

### 🏡 Chore

- Update BiS data from Maxroll (2026-07-04) ([b86f214](https://github.com/world-of-winning/bis-tracker/commit/b86f214))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.12.3

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.12.2...v1.12.3)

### 🏡 Chore

- Update prot-paladin BiS data from Maxroll (2026-06-21) ([f0f4a23](https://github.com/world-of-winning/bis-tracker/commit/f0f4a23))
- Update BiS data from Maxroll (2026-06-21) ([26bda46](https://github.com/world-of-winning/bis-tracker/commit/26bda46))
- Add bis-data-sync skill for Maxroll data updates ([fce82b8](https://github.com/world-of-winning/bis-tracker/commit/fce82b8))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.12.2

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.12.1...v1.12.2)

### 🩹 Fixes

- Allow unsafe-eval in CSP for Wowhead power.js ([881af06](https://github.com/world-of-winning/bis-tracker/commit/881af06))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.12.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.12.0...v1.12.1)

### 🚀 Enhancements

- Add multi-language SEO support for all 10 locales ([fa166b0](https://github.com/world-of-winning/bis-tracker/commit/fa166b0))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.12.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.11.2...v1.12.0)

### 🚀 Enhancements

- Add multi-language support for 10 locales ([d5a8cf3](https://github.com/world-of-winning/bis-tracker/commit/d5a8cf3))

### 💅 Refactors

- Extract logic modules and components from BisTracker ([464227a](https://github.com/world-of-winning/bis-tracker/commit/464227a))
- Remove duplicate locale map and dead code from i18n ([6b1272e](https://github.com/world-of-winning/bis-tracker/commit/6b1272e))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.11.2

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.11.1...v1.11.2)

### 🩹 Fixes

- Replace remaining DC reference with DUNGEONS ([21800b1](https://github.com/world-of-winning/bis-tracker/commit/21800b1))

### 💅 Refactors

- Derive dungeon list dynamically from BIS/ALTS sources ([3eb6825](https://github.com/world-of-winning/bis-tracker/commit/3eb6825))
- Remove DC alias and clarify DUNGEONS color keys ([e1c8639](https://github.com/world-of-winning/bis-tracker/commit/e1c8639))

### 📖 Documentation

- Update project structure and spec count to 40 ([9a3f613](https://github.com/world-of-winning/bis-tracker/commit/9a3f613))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.11.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.9.1...v1.11.1)

### 🩹 Fixes

- Show grade-up label on stat-mismatched items, fix Devourer DH tooltip primary stat ([ad85314](https://github.com/world-of-winning/bis-tracker/commit/ad85314))
- Correct Krick's Beetle Stabber slot from head to weapon across 9 specs ([fa7c53e](https://github.com/world-of-winning/bis-tracker/commit/fa7c53e))
- Correct Leyline Leggings slot from ring to legs, remove duplicate entries ([6001cab](https://github.com/world-of-winning/bis-tracker/commit/6001cab))
- Correct item source values across 5 spec data files ([2dfb616](https://github.com/world-of-winning/bis-tracker/commit/2dfb616))
- Fuzzy slot name matching in generate-spec-data ([543d8ad](https://github.com/world-of-winning/bis-tracker/commit/543d8ad))
- Veng-dh crafted cloak stats, holy-paladin missing main_hand ([7104fb4](https://github.com/world-of-winning/bis-tracker/commit/7104fb4))
- Unify BIS/ALT equipped item display into single code path ([8238dbf](https://github.com/world-of-winning/bis-tracker/commit/8238dbf))

### 🏡 Chore

- **release:** V1.10.0 ([7b70e61](https://github.com/world-of-winning/bis-tracker/commit/7b70e61))
- **release:** V1.10.1 ([55962fb](https://github.com/world-of-winning/bis-tracker/commit/55962fb))
- Re-sort ALTS and KNOWN_STATS via find-alts script ([28c5745](https://github.com/world-of-winning/bis-tracker/commit/28c5745))
- **release:** V1.11.0 ([e152870](https://github.com/world-of-winning/bis-tracker/commit/e152870))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.7.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.7.0...v1.7.1)

### 🩹 Fixes

- Strip invalid Sitemap line when VITE_SITE_URL is unset ([edbac2b](https://github.com/world-of-winning/bis-tracker/commit/edbac2b))
- Strip canonical and OG URL tags when VITE_SITE_URL is unset ([c51a2c6](https://github.com/world-of-winning/bis-tracker/commit/c51a2c6))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.7.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.6.0...v1.7.0)

### 🚀 Enhancements

- Add SEO, structured data, and accessibility improvements ([e8367d6](https://github.com/world-of-winning/bis-tracker/commit/e8367d6))

### 🩹 Fixes

- Update Discord invite link ([76e5e01](https://github.com/world-of-winning/bis-tracker/commit/76e5e01))

### 💅 Refactors

- Move hardcoded Korean text to i18n ([25f0f4b](https://github.com/world-of-winning/bis-tracker/commit/25f0f4b))

### 📖 Documentation

- Update season name and Discord invite link ([ac5633b](https://github.com/world-of-winning/bis-tracker/commit/ac5633b))

### 🏡 Chore

- Add .env.example and allow it in secret detection ([f7c2a37](https://github.com/world-of-winning/bis-tracker/commit/f7c2a37))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.6.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.5.2...v1.6.0)

### 🚀 Enhancements

- Catalog mode — browse BiS/Alt lists without SimC import ([9df2ec1](https://github.com/world-of-winning/bis-tracker/commit/9df2ec1))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.5.2

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.5.1...v1.5.2)

### 🩹 Fixes

- Revert Eye of Midnight source to Midnight Falls, remove non-season item 251142 ([eba0874](https://github.com/world-of-winning/bis-tracker/commit/eba0874))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.5.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.5.0...v1.5.1)

### 🩹 Fixes

- Filter non-spec primary stats from tooltip diff, fix Eye of Midnight source ([96683ca](https://github.com/world-of-winning/bis-tracker/commit/96683ca))

### 💅 Refactors

- Merge --rebuild into --fix, add --regenerate, prioritize manual stat data ([e09012d](https://github.com/world-of-winning/bis-tracker/commit/e09012d))

### 📖 Documentation

- Update changelog with v1.2.4~v1.5.0 highlights ([59861e2](https://github.com/world-of-winning/bis-tracker/commit/59861e2))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.4.3

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.4.2...v1.4.3)

### 🩹 Fixes

- Unify farming count logic and make tierUp red across all item types ([c6aa059](https://github.com/world-of-winning/bis-tracker/commit/c6aa059))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.4.2

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.4.1...v1.4.2)

### 🔥 Performance

- Split vendor chunk to eliminate large bundle warning ([897d134](https://github.com/world-of-winning/bis-tracker/commit/897d134))

### 🩹 Fixes

- Shorten dungeon abbreviations in Korean locale ([0cb5ca7](https://github.com/world-of-winning/bis-tracker/commit/0cb5ca7))
- Detect duplicate item IDs in generate-spec-data and preserve manual overrides ([866ee28](https://github.com/world-of-winning/bis-tracker/commit/866ee28))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.4.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.4.0...v1.4.1)

### 🩹 Fixes

- Refactor item grade detection using bonus_id ranges and unified upgradeStatus ([0b2c357](https://github.com/world-of-winning/bis-tracker/commit/0b2c357))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.4.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.3.0...v1.4.0)

### 🚀 Enhancements

- Unify completion conditions and fix BiS/ALT priority logic ([1112958](https://github.com/world-of-winning/bis-tracker/commit/1112958))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.3.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.8...v1.3.0)

### 🚀 Enhancements

- Add stat diff comparison on equipped item tooltip ([7d26737](https://github.com/world-of-winning/bis-tracker/commit/7d26737))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.8

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.7...v1.2.8)

### 🩹 Fixes

- Correct priority colors and sorting for upgrade-needed items ([e70731f](https://github.com/world-of-winning/bis-tracker/commit/e70731f))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.7

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.6...v1.2.7)

### 🩹 Fixes

- Allow Wowhead CSS in Content-Security-Policy ([c46834d](https://github.com/world-of-winning/bis-tracker/commit/c46834d))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.6

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.5...v1.2.6)

### 🩹 Fixes

- Merge Catalyst source into Tier and fix Windrunner Spire typo ([a4101f3](https://github.com/world-of-winning/bis-tracker/commit/a4101f3))

### ❤️ Contributors

- World Of Winning

## v1.2.5

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.3...v1.2.5)

### 🩹 Fixes

- Equipped tooltip, auto WORST_STATS, data normalization ([bce0cce](https://github.com/world-of-winning/bis-tracker/commit/bce0cce))
- Add explicit text color to locale toggle buttons ([096e01c](https://github.com/world-of-winning/bis-tracker/commit/096e01c))

### 💅 Refactors

- Security hardening and code deduplication ([75290f8](https://github.com/world-of-winning/bis-tracker/commit/75290f8))

### 🏡 Chore

- **release:** V1.2.4 ([3d425da](https://github.com/world-of-winning/bis-tracker/commit/3d425da))

### ❤️ Contributors

- World Of Winning

## v1.2.3

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.2...v1.2.3)

### 🩹 Fixes

- Raid alt tracking, dungeon filter accuracy, tutorial update ([32ea962](https://github.com/world-of-winning/bis-tracker/commit/32ea962))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.2

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.2.1...v1.2.2)

### 🚀 Enhancements

- M+ bis tracking, alt card improvements, and data fixes ([27885ce](https://github.com/world-of-winning/bis-tracker/commit/27885ce))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.1

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.1.1...v1.2.1)

### 🚀 Enhancements

- Widen layout to 4-column grid, unify container, and improve tier status labels ([7f7327e](https://github.com/world-of-winning/bis-tracker/commit/7f7327e))
- Add class restriction check to find-alts script and expand sample demo data ([213b457](https://github.com/world-of-winning/bis-tracker/commit/213b457))

### 🩹 Fixes

- Use English keys for ALTS forSlot values ([0be8da2](https://github.com/world-of-winning/bis-tracker/commit/0be8da2))
- Add weapon type filtering to find-alts script ([9eca3b6](https://github.com/world-of-winning/bis-tracker/commit/9eca3b6))

### 💅 Refactors

- Rename ALTS dungeon field to source, update alt items for all specs ([28dffde](https://github.com/world-of-winning/bis-tracker/commit/28dffde))

### 📖 Documentation

- Add changelog entry for v1.2.0 layout and tier-cap improvements ([d62117a](https://github.com/world-of-winning/bis-tracker/commit/d62117a))

### 🏡 Chore

- **release:** V1.2.0 ([f42793a](https://github.com/world-of-winning/bis-tracker/commit/f42793a))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.2.0

[compare changes](https://github.com/world-of-winning/bis-tracker/compare/v1.1.1...v1.2.0)

### 🚀 Enhancements

- Widen layout to 4-column grid, unify container, and improve tier status labels ([7f7327e](https://github.com/world-of-winning/bis-tracker/commit/7f7327e))

### 🩹 Fixes

- Use English keys for ALTS forSlot values ([0be8da2](https://github.com/world-of-winning/bis-tracker/commit/0be8da2))

### ❤️ Contributors

- World Of Winning ([@world-of-winning](https://github.com/world-of-winning))

## v1.1.0

### 🚀 Features

- Add BiS/M+ dual view — separate raid BiS and dungeon M+ item lists per spec
- Add non-dungeon source filters (Tier, Crafted, raid bosses) with dedicated filter UI
- Add source translations (ko/en) for raid bosses, crafting, and catalyst

### 📦 Data

- Update all 39 spec data files with raid BiS items and expanded alt lists
- Migrate item source field from `dungeon` to `source` for non-dungeon items
- Add `MYTHIC` export for dungeon-farmable alternatives

### 🔧 Improvements

- Limit changelog display to 5 most recent entries
- Overhaul `generate-spec-data` script to support new BiS/Mythic data format
- Update `find-alts` script to index MYTHIC items

### 🏡 Chore

- Add versioning automation with changelogen and commitlint
- Add pre-commit secret detection hook

## v1.0.0

### 🚀 Features

- Initial WoW BiS Tracker
- Add i18n support, Cloudflare Pages config, and all spec data updates
- Show character selector bar even with single character
- Detect browser locale
- Add BETA badge, remember last viewed character, show current locale
- Add alt items to progress bar with translucent layer
- Add interactive demo with tutorial overlay and sample data

### 🩹 Fixes

- Fix _redirects infinite loop with force rewrite
- Remove _redirects rules to fix Cloudflare Pages validation error
- Simplify landing page with changelog, fix dungeon name translations
- Fix character list not updating on new char
- Remove Midnight from app title
- Fix spec icons, devourer DH matching, GitHub link, and char display

### 🏡 Chore

- Regenerate bun.lock for Cloudflare Pages compatibility
