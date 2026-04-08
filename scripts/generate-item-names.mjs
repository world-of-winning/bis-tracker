#!/usr/bin/env node
/**
 * Generate per-locale item name files from Wowhead tooltip API.
 *
 * Scans all spec data files for unique item IDs (BIS, MYTHIC, ALTS),
 * fetches localized names from Wowhead, and writes src/i18n/items/{locale}.json.
 *
 * Usage:
 *   node scripts/generate-item-names.mjs              # all locales
 *   node scripts/generate-item-names.mjs fr de        # specific locales only
 *   node scripts/generate-item-names.mjs --list       # list all item IDs found
 *   node scripts/generate-item-names.mjs --missing    # only fetch items not yet in locale files
 *
 * If Wowhead rate-limits (403), the script saves progress and reports failed items.
 * Failed items can be retried later or fetched via Chrome MCP using the tooltip URL:
 *   https://nether.wowhead.com/tooltip/item/{id}?dataEnv=1&locale={code}
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { fetchTooltip, saveCache } from './wowhead-cache.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '../src/data');
const ITEMS_DIR = resolve(__dirname, '../src/i18n/items');

// Wowhead locale codes
const LOCALES = {
  en:   { code: 0, name: 'English' },
  ko:   { code: 1, name: 'Korean' },
  fr:   { code: 2, name: 'French' },
  de:   { code: 3, name: 'German' },
  zhCN: { code: 4, name: 'Simplified Chinese' },
  es:   { code: 6, name: 'Spanish' },
  ru:   { code: 7, name: 'Russian' },
  pt:   { code: 8, name: 'Portuguese' },
  it:   { code: 9, name: 'Italian' },
  zhTW: { code: 10, name: 'Traditional Chinese' },
};

const SKIP_FILES = new Set(['shared.js', 'specs.js', 'sample.js', 'tutorial.js', 'changelog.js']);

// ─── Collect all unique item IDs from spec data files ───────
function collectItemIds() {
  const files = readdirSync(DATA_DIR).filter(f =>
    f.endsWith('.js') && !SKIP_FILES.has(f)
  );

  const ids = new Set();

  for (const file of files) {
    const content = readFileSync(resolve(DATA_DIR, file), 'utf8');

    // Match IDs from BIS, MYTHIC, ALTS arrays
    // Pattern: id: <number> or id:<number>
    const re = /\bid:\s*(\d+)/g;
    let m;
    while ((m = re.exec(content))) {
      ids.add(parseInt(m[1]));
    }
  }

  return [...ids].sort((a, b) => a - b);
}

// ─── Fetch names for a single locale ────────────────────────
async function fetchLocaleNames(ids, localeKey) {
  const { code, name } = LOCALES[localeKey];
  const names = {};
  let fetched = 0;

  console.log(`\nFetching ${name} (${localeKey}, locale=${code}) for ${ids.length} items...`);

  for (const id of ids) {
    try {
      const data = await fetchTooltip(id, code);
      if (data && data.name) {
        names[id] = data.name;
      }
      fetched++;
      if (fetched % 50 === 0) {
        console.log(`  ${fetched}/${ids.length} done`);
      }
    } catch (err) {
      console.warn(`  WARNING: Failed to fetch ${id} for ${localeKey}: ${err.message}`);
    }
  }

  console.log(`  ${Object.keys(names).length}/${ids.length} names resolved`);
  return names;
}

// ─── Write locale JSON file ─────────────────────────────────
function writeLocaleFile(localeKey, names) {
  mkdirSync(ITEMS_DIR, { recursive: true });
  const filePath = resolve(ITEMS_DIR, `${localeKey}.json`);

  // Sort by item ID for stable diffs
  const sorted = {};
  for (const id of Object.keys(names).sort((a, b) => Number(a) - Number(b))) {
    sorted[id] = names[id];
  }

  writeFileSync(filePath, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  console.log(`  Written: ${filePath} (${Object.keys(sorted).length} entries)`);
}

// ─── Main ───────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list')) {
    const ids = collectItemIds();
    console.log(`Found ${ids.length} unique item IDs:`);
    console.log(ids.join(', '));
    return;
  }

  // Determine which locales to generate
  const targetLocales = args.length > 0
    ? args.filter(a => LOCALES[a])
    : Object.keys(LOCALES);

  if (args.length > 0) {
    const unknown = args.filter(a => !LOCALES[a]);
    if (unknown.length) {
      console.warn(`Unknown locales: ${unknown.join(', ')}`);
      console.warn(`Available: ${Object.keys(LOCALES).join(', ')}`);
    }
  }

  const ids = collectItemIds();
  console.log(`Found ${ids.length} unique item IDs across all spec files`);

  for (const localeKey of targetLocales) {
    const names = await fetchLocaleNames(ids, localeKey);
    writeLocaleFile(localeKey, names);
  }

  saveCache();
  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  saveCache(); // Save cache even on error
  process.exit(1);
});
