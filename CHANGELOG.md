# Changelog

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
