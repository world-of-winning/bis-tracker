/**
 * Fetching and caching Wowhead BiS guide pages.
 *
 * The parser is in ./wowhead-guide.mjs and knows nothing about the network.
 * This is the other half: the request Wowhead's edge will accept, and a cache
 * of pages as they arrived.
 *
 * Wowhead answers a plain user-agent with "403 Request blocked" on the first
 * request of a session, and answers the same URLs with 200 once the headers a
 * browser navigation carries are present. robots.txt permits /guide/ to * and
 * sets no crawl delay; a forty-spec pass at this pacing takes about three
 * minutes and drew no throttling in testing. See ADR 0006.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = resolve(__dirname, ".wowhead-guide-cache");
const INDEX_FILE = resolve(CACHE_DIR, "index.json");
const DAY_MS = 24 * 60 * 60 * 1000;

export const GUIDE_MAX_AGE_DAYS = 14;

const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9," +
        "image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
};

// The class slug is the SimC class with a hyphen at the word boundary; the
// spec slug is the SimC spec verbatim, with one exception. Checked against
// all forty specs, every one a 200.
const SPEC_SLUG_FIXES = { beastmastery: "beast-mastery" };
const CLASS_SLUG_FIXES = {
    deathknight: "death-knight",
    demonhunter: "demon-hunter",
};

export function guideUrl(simcClass, simcSpec) {
    const cls = CLASS_SLUG_FIXES[simcClass] ?? simcClass;
    const spec = SPEC_SLUG_FIXES[simcSpec] ?? simcSpec;
    return `https://www.wowhead.com/guide/classes/${cls}/${spec}/bis-gear`;
}

function readIndex() {
    if (!existsSync(INDEX_FILE)) return {};
    try {
        return JSON.parse(readFileSync(INDEX_FILE, "utf8"));
    } catch {
        return {};
    }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * The guide page for one spec, from cache when it is young enough.
 *
 * A page that cannot be refetched is used stale and reported, the way the
 * page cache in generate-priority-stats already behaves: an old page beats no
 * page, and the caller is told which it got.
 */
export async function fetchGuidePage(
    key,
    simcClass,
    simcSpec,
    { maxAgeDays = GUIDE_MAX_AGE_DAYS, pacingMs = 4000 } = {},
) {
    if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
    const file = resolve(CACHE_DIR, `${key}.html`);
    const index = readIndex();
    const cached = existsSync(file) ? readFileSync(file, "utf8") : null;
    const age = index[key] ? Date.now() - index[key] : Infinity;
    if (cached && age <= maxAgeDays * DAY_MS) {
        return { html: cached, from: "cache" };
    }

    const url = guideUrl(simcClass, simcSpec);
    try {
        await delay(pacingMs);
        const res = await fetch(url, { headers: HEADERS });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        writeFileSync(file, html, "utf8");
        index[key] = Date.now();
        writeFileSync(INDEX_FILE, JSON.stringify(index), "utf8");
        return { html, from: "network" };
    } catch (err) {
        if (cached) return { html: cached, from: "stale", error: err.message };
        throw err;
    }
}
