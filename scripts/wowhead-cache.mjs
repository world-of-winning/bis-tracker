/**
 * Wowhead tooltip API cache.
 * Caches nether.wowhead.com responses by item ID + locale to a local JSON file.
 *
 * Fetch times live in a sidecar index rather than in the entries themselves,
 * so the cache file stays exactly what arrived from Wowhead. File mtime is not
 * usable for this — anything that rewrites the cache rewrites every entry's
 * apparent age at once.
 *
 * Name lookups are permanent; tooltips expire. See ./cache-expiry.mjs.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tooltipExpired } from './cache-expiry.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = resolve(__dirname, '.wowhead-cache.json');
const INDEX_FILE = resolve(__dirname, '.wowhead-cache-index.json');

let cache = {};
if (existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8')); } catch { cache = {}; }
}

// key -> epoch ms. Entries written before this index existed are absent, and
// tooltipExpired reads that absence as expired: those are precisely the ones
// holding stats nobody has rechecked.
let fetchedAt = {};
if (existsSync(INDEX_FILE)) {
  try { fetchedAt = JSON.parse(readFileSync(INDEX_FILE, 'utf8')); } catch { fetchedAt = {}; }
}

let dirty = false;

function cacheKey(itemId, locale) {
  return `${itemId}-${locale}`;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * Fetch Wowhead tooltip with caching.
 * @param {number} itemId
 * @param {number} locale - 0 for English, 1 for Korean
 * @returns {Promise<object>} parsed JSON response
 */
export async function fetchTooltip(itemId, locale = 0, retries = 5) {
  const key = cacheKey(itemId, locale);
  if (cache[key] && !isStale(key)) return cache[key];

  const url = `https://nether.wowhead.com/tooltip/item/${itemId}?dataEnv=1&locale=${locale}`;
  for (let i = 0; i < retries; i++) {
    await delay(150);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BiSTracker/1.0)' },
      });
      if (res.status === 403 || res.status === 429) {
        const wait = Math.min(60000 * Math.pow(2, i), 300000);
        console.log(`  ${res.status} rate limited for ${itemId}, retrying in ${(wait / 1000).toFixed(0)}s... (${i + 1}/${retries})`);
        await delay(wait);
        continue;
      }
      if (!res.ok) {
        if (i < retries - 1) { await delay(3000 * (i + 1)); continue; }
        throw new Error(`HTTP ${res.status}`);
      }
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (i < retries - 1) {
          const wait = Math.min(60000 * Math.pow(2, i), 300000);
          console.log(`  Non-JSON response for ${itemId}, retrying in ${(wait / 1000).toFixed(0)}s... (${i + 1}/${retries})`);
          await delay(wait);
          continue;
        }
        throw new Error('Non-JSON response');
      }
      cache[key] = data;
      fetchedAt[key] = Date.now();
      dirty = true;
      return data;
    } catch (err) {
      if (i === retries - 1) throw err;
      await delay(3000 * (i + 1));
    }
  }
}

/**
 * Generic cache get/set for arbitrary keys (e.g. search results).
 */
export function cacheGet(key) {
  return cache[key] ?? null;
}

export function cacheSet(key, value) {
  cache[key] = value;
  fetchedAt[key] = Date.now();
  dirty = true;
}

/**
 * Whether a cached entry has passed its expiry. cacheGet still returns it —
 * --fix reads the cache with no network and has nothing better to use — so a
 * caller that cares has to ask.
 */
export function isStale(key, now = Date.now()) {
  return tooltipExpired(key, fetchedAt[key] ?? null, now);
}

export function cacheDelete(key) {
  if (key in cache) {
    delete cache[key];
    delete fetchedAt[key];
    dirty = true;
  }
}

/** Write cache to disk. Call once at the end of your script. */
export function saveCache() {
  if (!dirty) return;
  writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf8');
  writeFileSync(INDEX_FILE, JSON.stringify(fetchedAt), 'utf8');
  const count = Object.keys(cache).length;
  console.log(`Cache saved: ${count} entries`);
}
