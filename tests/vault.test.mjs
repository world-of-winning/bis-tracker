import { describe, expect, it } from "vitest";
import { vaultVerdict } from "../src/logic/vault.js";

const BIS = [
    { slot: "chest", id: 120 },
    { slot: "hands", id: 121 },
];

describe("vaultVerdict", () => {
    it("takes the vault item when it is a BiS the player does not have", () => {
        const { take } = vaultVerdict([{ slot: "chest", id: 120, ilvl: 334 }], BIS, {}, []);
        expect(take.id).toBe(120);
    });

    it("takes the Voidcore when nothing on offer is BiS", () => {
        const { candidates, take } = vaultVerdict(
            [{ slot: "waist", id: 999, ilvl: 334 }], BIS, {}, []);
        expect(take).toBe(null);
        expect(candidates[0].isBis).toBe(false);
    });

    // An equivalent-stat fit finishes a slot for the tracker, but it does not
    // beat a roll that can reach the BiS itself.
    it("does not take a non-BiS item however good its stats look", () => {
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 500, ilvl: 334 }], BIS, {}, []);
        expect(take).toBe(null);
    });

    it("takes the Voidcore over a BiS already held at that item level", () => {
        const gear = { chest: { id: 120, ilvl: 334 } };
        const { candidates, take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 334 }], BIS, gear, []);
        expect(take).toBe(null);
        expect(candidates[0].isBis).toBe(true);
        expect(candidates[0].gain).toBe(0);
    });

    it("still takes a BiS the player only holds at a lower item level", () => {
        const gear = { chest: { id: 120, ilvl: 321 } };
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 334 }], BIS, gear, []);
        expect(take.id).toBe(120);
        expect(take.gain).toBe(13);
    });

    it("counts a copy sitting in the bags as held", () => {
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 334 }], BIS, {}, [{ id: 120, ilvl: 334 }]);
        expect(take).toBe(null);
    });

    it("picks the larger gain when the vault offers two BiS items", () => {
        const gear = { hands: { id: 121, ilvl: 321 } };
        const { take } = vaultVerdict([
            { slot: "chest", id: 120, ilvl: 321 },
            { slot: "hands", id: 121, ilvl: 334 },
        ], BIS, gear, []);
        expect(take.id).toBe(120);
    });

    it("survives an empty vault", () => {
        expect(vaultVerdict([], BIS, {}, [])).toEqual({ candidates: [], take: null });
        expect(vaultVerdict(null, BIS, {}, []).take).toBe(null);
    });
});

describe("isVaultStale", () => {
    const DAY = 24 * 60 * 60 * 1000;
    const NOW = Date.UTC(2026, 7, 29, 12, 0, 0);

    it("treats an import with no timestamp as stale", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(null, NOW)).toBe(true);
        expect(isVaultStale(undefined, NOW)).toBe(true);
    });

    it("keeps an import from within the last seven days", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(NOW - 6 * DAY, NOW)).toBe(false);
        expect(isVaultStale(NOW, NOW)).toBe(false);
    });

    it("drops an import older than seven days", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(NOW - 8 * DAY, NOW)).toBe(true);
    });
});

describe("lastVaultReset", () => {
    it("holds each region's boundary at the same UTC instant all year", async () => {
        const { lastVaultReset } = await import("../src/logic/vault.js");
        // Blizzard pins the reset in UTC, so the winter and summer boundaries
        // sit at the same hour however the local clocks have moved.
        expect(new Date(lastVaultReset(Date.UTC(2026, 0, 15, 12), "us")).toISOString())
            .toBe("2026-01-13T15:00:00.000Z");
        expect(new Date(lastVaultReset(Date.UTC(2026, 6, 15, 12), "us")).toISOString())
            .toBe("2026-07-14T15:00:00.000Z");
        expect(new Date(lastVaultReset(Date.UTC(2026, 0, 15, 12), "eu")).toISOString())
            .toBe("2026-01-14T04:00:00.000Z");
        expect(new Date(lastVaultReset(Date.UTC(2026, 6, 15, 12), "eu")).toISOString())
            .toBe("2026-07-15T04:00:00.000Z");
    });

    // Wednesday 23:00 UTC is Thursday 08:00 in Seoul, which is the reset a
    // Korean player actually sees.
    it("puts KR, TW and CN on Wednesday 23:00 UTC", async () => {
        const { lastVaultReset } = await import("../src/logic/vault.js");
        const now = Date.UTC(2026, 6, 16, 12);
        ["kr", "tw", "cn"].forEach((r) => {
            expect(new Date(lastVaultReset(now, r)).toISOString()).toBe("2026-07-15T23:00:00.000Z");
        });
    });

    // Asked on the reset weekday but before the hour, the week that is running
    // began at the previous one.
    it("looks back a full week when the reset is still ahead today", async () => {
        const { lastVaultReset } = await import("../src/logic/vault.js");
        expect(new Date(lastVaultReset(Date.UTC(2026, 6, 15, 12), "kr")).toISOString())
            .toBe("2026-07-08T23:00:00.000Z");
        expect(new Date(lastVaultReset(Date.UTC(2026, 6, 15, 23, 1), "kr")).toISOString())
            .toBe("2026-07-15T23:00:00.000Z");
    });

    it("reads the region case-insensitively and declines an unknown one", async () => {
        const { lastVaultReset } = await import("../src/logic/vault.js");
        const now = Date.UTC(2026, 6, 15, 12);
        expect(lastVaultReset(now, "KR")).toBe(lastVaultReset(now, "kr"));
        expect(lastVaultReset(now, "xx")).toBe(null);
        expect(lastVaultReset(now, undefined)).toBe(null);
    });
});

describe("isVaultStale by region", () => {
    const NOW = Date.UTC(2026, 6, 16, 12); // Thursday, after the KR reset

    it("drops an import from before this week's reset", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(Date.UTC(2026, 6, 15, 22), NOW, "kr")).toBe(true);
    });

    it("keeps an import taken after it, even minutes later", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(Date.UTC(2026, 6, 15, 23, 1), NOW, "kr")).toBe(false);
    });

    // The same import, the same age, judged opposite ways. This is what
    // reading the region buys over counting elapsed days.
    it("splits one import between two regions on their different resets", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        const importedAt = Date.UTC(2026, 6, 15, 12);
        expect(isVaultStale(importedAt, NOW, "us")).toBe(false);
        expect(isVaultStale(importedAt, NOW, "kr")).toBe(true);
    });

    it("falls back on elapsed time when the export names no region", async () => {
        const { isVaultStale } = await import("../src/logic/vault.js");
        expect(isVaultStale(NOW - 2 * 24 * 60 * 60 * 1000, NOW, null)).toBe(false);
        expect(isVaultStale(NOW - 8 * 24 * 60 * 60 * 1000, NOW, null)).toBe(true);
    });
});

describe("vaultVerdict edge cases the addon produces", () => {
    const BIS2 = [{ slot: "chest", id: 120 }, { slot: "hands", id: 121 }];

    // The addon writes the "# Name (ilvl)" comment only when it knows both, so
    // an item the client has not cached arrives with no item level at all.
    // Reading that as a zero gain hid a BiS the player had never looted.
    it("takes an unowned BiS whose item level the addon could not name", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { take } = vaultVerdict([{ slot: "chest", id: 120, ilvl: null }], BIS2, {}, []);
        expect(take.id).toBe(120);
    });

    it("treats a ✓ mark as owning the item", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 334 }], BIS2, {}, [], { 120: true });
        expect(take).toBe(null);
    });

    // ✓ means "stop farming", not "at the ceiling". A copy known to sit lower
    // than the offer is still worth the pick.
    it("still takes a ✓ item the player only holds below the offer", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const gear = { chest: { id: 120, ilvl: 321 } };
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 334 }], BIS2, gear, [], { 120: true });
        expect(take.id).toBe(120);
    });

    it("prefers an item never looted over one being pushed a few levels", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const gear = { hands: { id: 121, ilvl: 305 } };
        const { take } = vaultVerdict([
            { slot: "hands", id: 121, ilvl: 334 },
            { slot: "chest", id: 120, ilvl: 318 },
        ], BIS2, gear, []);
        expect(take.id).toBe(120);
    });

    // The vault presents up to nine rows across three tracks and can offer one
    // item on more than one of them.
    it("keeps every row when the same item is offered twice", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { candidates } = vaultVerdict([
            { slot: "chest", id: 120, ilvl: 321 },
            { slot: "chest", id: 120, ilvl: 334 },
        ], BIS2, {}, []);
        expect(candidates).toHaveLength(2);
    });
});

describe("vaultVerdict grade floor", () => {
    const BIS3 = [{ slot: "chest", id: 120 }];
    const MYTH_BONUS = "12849";   // Myth track
    const HERO_BONUS = "12841";   // Hero track

    // A grade boundary cannot be crossed by upgrading, so a Hero item is a
    // re-farm waiting to happen — and the roll it would be spent instead of
    // lands at vault item level anyway.
    it("does not put a Hero-grade BiS forward", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { candidates, take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 305, bonus: HERO_BONUS }], BIS3, {}, []);
        expect(take).toBe(null);
        expect(candidates[0].isBis).toBe(true);
        expect(candidates[0].take).toBe(false);
    });

    it("puts a Myth-grade BiS forward at the bottom of the track", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 318, bonus: MYTH_BONUS }], BIS3, {}, []);
        expect(take.id).toBe(120);
    });

    // Grade beats item level: a Hero 6/6 at 321 reads above a Myth 1/6 at 318
    // on the number alone, and is still the one that has to be re-farmed.
    it("reads the grade, not the item level, when the two disagree", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: 321, bonus: HERO_BONUS }], BIS3, {}, []);
        expect(take).toBe(null);
    });

    // Nothing to read the grade from is not evidence the grade is low. The
    // same call as the missing item level: only a known shortfall excludes.
    it("still puts a BiS forward when the grade cannot be read at all", async () => {
        const { vaultVerdict } = await import("../src/logic/vault.js");
        const { take } = vaultVerdict(
            [{ slot: "chest", id: 120, ilvl: null, bonus: null }], BIS3, {}, []);
        expect(take.id).toBe(120);
    });
});
