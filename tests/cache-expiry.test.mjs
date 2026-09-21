import { describe, expect, it } from "vitest";
import { pickStats, tooltipExpired } from "../scripts/cache-expiry.mjs";

const NOW = Date.parse("2026-09-21T00:00:00Z");
const daysAgo = (n) => NOW - n * 24 * 60 * 60 * 1000;

describe("tooltipExpired", () => {
    it("never expires a name lookup", () => {
        // An item's id does not change, so the name that found it needs no
        // refetch. Only what the tooltip says about the item goes stale.
        expect(tooltipExpired("search:Aqirbane Reliquary", daysAgo(400), NOW)).toBe(false);
        expect(tooltipExpired("search:Aqirbane Reliquary", null, NOW)).toBe(false);
    });

    it("keeps a tooltip inside the window and drops one past it", () => {
        expect(tooltipExpired("268265-0", daysAgo(13), NOW)).toBe(false);
        expect(tooltipExpired("268265-0", daysAgo(15), NOW)).toBe(true);
    });

    it("treats a tooltip with no recorded fetch time as expired", () => {
        // The 4552 tooltips written before fetch times were kept are exactly
        // the ones holding known-wrong stats. Trusting them would preserve
        // the defect this expiry exists to catch.
        expect(tooltipExpired("268265-0", null, NOW)).toBe(true);
    });
});

describe("pickStats", () => {
    it("does not let an expired tooltip overwrite what the file holds", () => {
        // 268265's cached tooltip predates Blizzard re-itemising it. --fix
        // rebuilds KNOWN_STATS with no network, so trusting that entry would
        // reinstate the wrong stats over a correction someone just made.
        expect(
            pickStats({ cached: ["crit"], stale: true, existing: ["crit", "haste", "mastery", "vers"] }),
        ).toEqual(["crit", "haste", "mastery", "vers"]);
    });

    it("takes a fresh tooltip over what the file holds", () => {
        expect(
            pickStats({ cached: ["crit", "haste"], stale: false, existing: ["crit"] }),
        ).toEqual(["crit", "haste"]);
    });

    it("falls back to the file when the item is not cached at all", () => {
        expect(pickStats({ cached: null, stale: false, existing: ["mastery"] })).toEqual(["mastery"]);
    });

    it("answers with no stats when neither source knows the item", () => {
        expect(pickStats({ cached: null, stale: false, existing: null })).toEqual([]);
    });
});
