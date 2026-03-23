# Changelog

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
