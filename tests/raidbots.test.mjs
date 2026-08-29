import { describe, expect, it } from "vitest";
import { buildRaidbotsExport } from "../src/logic/raidbots.js";

const MYTH = { key: "myth", min: 318, max: 334, tooltipBonus: 12854 };

const RAW = [
  'paladin="Uther"',
  "level=80",
  "spec=protection",
  "head=,id=100,bonus_id=12841/1234",
  "finger1=,id=200",
].join("\n");

const BIS = [
  { slot: "head", id: 100 },
  { slot: "finger2", id: 200 },
  { slot: "chest", id: 300 },
  { slot: "main_hand", id: 400 },
];

describe("buildRaidbotsExport", () => {
    it("returns null without raw text", () => {
        expect(buildRaidbotsExport(null, BIS, {}, [], MYTH)).toBe(null);
        expect(buildRaidbotsExport("   \n", BIS, {}, [], MYTH)).toBe(null);
    });

    it("appends only the BiS items absent from gear and bags", () => {
        const gear = { head: { id: 100 }, finger2: { id: 200 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [{ id: 400 }], MYTH);
        expect(out).toContain("# chest=,id=300,bonus_id=12854,ilevel=334");
        expect(out).not.toContain("id=100,bonus_id=12854");
        expect(out).not.toContain("# finger2=");
        expect(out).not.toContain("# main_hand=");
    });

    it("treats a BiS ring equipped on the other finger as owned", () => {
        // BIS lists the ring under finger2; the player wears it on finger1.
        const gear = { finger1: { id: 200 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [], MYTH);
        expect(out).not.toContain("# finger2=");
    });

    it("writes the addon's bag shape: a name line, then the item line", () => {
        const out = buildRaidbotsExport(RAW, [{ slot: "chest", id: 300 }], {}, [], MYTH,
            (id) => (id === 300 ? "Breastplate of Testing" : null));
        expect(out).toContain("# Breastplate of Testing (334)\n# chest=,id=300,bonus_id=12854,ilevel=334");
    });

    it("falls back to the item id when no name is known", () => {
        const out = buildRaidbotsExport(RAW, [{ slot: "chest", id: 300 }], {}, [], MYTH);
        expect(out).toContain("# Item 300 (334)");
    });

    it("prefers simcSlot over slot for the item line", () => {
        const out = buildRaidbotsExport(RAW, [{ slot: "weapon", simcSlot: "main_hand", id: 400 }], {}, [], MYTH);
        expect(out).toContain("# main_hand=,id=400");
    });

    it("preserves the original text verbatim as the prefix", () => {
        const out = buildRaidbotsExport(RAW + "\n\n", BIS, {}, [], MYTH);
        expect(out.startsWith(RAW)).toBe(true);
        expect(out).toContain("### BiS candidates (bis-tracker)");
    });

    it("returns the raw text untouched when every BiS is owned", () => {
        const gear = { head: { id: 100 }, finger2: { id: 200 }, chest: { id: 300 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [{ id: 400 }], MYTH);
        expect(out).toBe(RAW);
    });

    it("round-trips: its own output still parses as candidates by our reader", async () => {
        const { parseSimC } = await import("../src/data/shared.js");
        const out = buildRaidbotsExport(RAW, BIS, {}, [], MYTH, (id) => "Thing " + id);
        const parsed = parseSimC(out);
        const bagIds = parsed.bag.map((b) => b.id).sort();
        expect(bagIds).toEqual([100, 200, 300, 400]);
        const chest = parsed.bag.find((b) => b.id === 300);
        expect(chest.name).toBe("Thing 300");
        expect(chest.ilvl).toBe(334);
    });
});
