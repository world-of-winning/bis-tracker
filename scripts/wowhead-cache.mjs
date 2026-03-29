/**
 * Wowhead tooltip API cache.
 * Caches nether.wowhead.com responses by item ID + locale to a local JSON file.
 * Cache is persistent across runs — delete the file to invalidate.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = resolve(__dirname, '.wowhead-cache.json');

let cache = {};
if (existsSync(CACHE_FILE)) {
  try { cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8')); } catch { cache = {}; }
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
  if (cache[key]) return cache[key];

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
  dirty = true;
}

export function cacheDelete(key) {
  if (key in cache) {
    delete cache[key];
    dirty = true;
  }
}

/** Write cache to disk. Call once at the end of your script. */
export function saveCache() {
  if (!dirty) return;
  writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf8');
  const count = Object.keys(cache).length;
  console.log(`Cache saved: ${count} entries`);
}
