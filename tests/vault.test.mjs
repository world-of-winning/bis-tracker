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
