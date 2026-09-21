// When a cached Wowhead response stops being worth trusting.
//
// The cache holds two kinds of entry under one flat namespace. A name
// lookup ("search:<name>" -> item id) answers a question whose answer
// cannot change: an item keeps its id. A tooltip ("<id>-<locale>")
// answers one that can, and does — Blizzard re-itemised 268265 mid-season
// from a single 428-point crit to four secondaries at 107 each, and the
// cache carried the old answer into every judgement made about that slot.

export const TOOLTIP_MAX_AGE_DAYS = 14;

const TOOLTIP_KEY = /^\d+-\d+$/;
const DAY_MS = 24 * 60 * 60 * 1000;

export function tooltipExpired(key, fetchedAt, now, maxAgeDays = TOOLTIP_MAX_AGE_DAYS) {
    if (!TOOLTIP_KEY.test(key)) return false;
    if (!fetchedAt) return true;
    return now - fetchedAt > maxAgeDays * DAY_MS;
}

/**
 * Which account of an item's secondary stats wins.
 *
 * --fix rebuilds KNOWN_STATS with no network, so an expired tooltip is the
 * only thing it could read — but reading it and *writing* it are different
 * acts. Writing one reinstates whatever the cache last saw, over a value that
 * may have been corrected since. The no-network contract says --fix must not
 * refetch; it does not say --fix must repeat a stale claim.
 */
export function pickStats({ cached, stale, existing }) {
    if (cached && !stale) return cached;
    return existing ?? [];
}
