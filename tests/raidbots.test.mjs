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

    it("appends only the BiS items not owned at the export ilvl", () => {
        const gear = { head: { id: 100, ilvl: 334 }, finger2: { id: 200, ilvl: 334 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [{ id: 400, ilvl: 334 }], MYTH);
        expect(out).toContain("# chest=,id=300,bonus_id=12854,ilevel=334");
        expect(out).not.toContain("id=100,bonus_id=12854");
        expect(out).not.toContain("# finger2=");
        expect(out).not.toContain("# main_hand=");
    });

    it("still appends a BiS the player wears below the export ilvl", () => {
        // Equipped at Hero 321: the original text sims the real copy, but only
        // a candidate line can show what the item is worth at its ceiling.
        const gear = { head: { id: 100, ilvl: 321 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [], MYTH);
        expect(out).toContain("# head=,id=100,bonus_id=12854,ilevel=334");
    });

    it("treats a BiS ring equipped at max on the other finger as owned", () => {
        // BIS lists the ring under finger2; the player wears it on finger1.
        const gear = { finger1: { id: 200, ilvl: 334 } };
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

    it("returns the raw text untouched when every BiS is owned at max", () => {
        const gear = { head: { id: 100, ilvl: 334 }, finger2: { id: 200, ilvl: 334 }, chest: { id: 300, ilvl: 334 } };
        const out = buildRaidbotsExport(RAW, BIS, gear, [{ id: 400, ilvl: 334 }], MYTH);
        expect(out).toBe(RAW);
    });

    it("writes candidate lines in the addon's bag grammar", () => {
        const out = buildRaidbotsExport(RAW, BIS, {}, [], MYTH, (id) => "Thing " + id);
        expect(out).toContain("# Thing 300 (334)\n# chest=,id=300,bonus_id=12854,ilevel=334");
    });

    // The candidates are items the player does not have. Pasting this text back
    // into the tracker must not mark those slots owned, so they sit under a
    // header of our own that parseSimC deliberately does not recognise.
    it("does not read back as owned gear if pasted into the tracker", async () => {
        const { parseSimC } = await import("../src/data/shared.js");
        const out = buildRaidbotsExport(RAW, BIS, {}, [], MYTH, (id) => "Thing " + id);
        const parsed = parseSimC(out);
        expect(parsed.bag).toEqual([]);
        expect(parsed.vault).toEqual([]);
        expect(parsed.gear.head.id).toBe(100);
    });
});

describe("buildRaidbotsExport re-export", () => {
    // The SimC box is prefilled with the stored text and selects itself on
    // focus, so the export sitting on the clipboard is one paste away from
    // becoming the stored text. Appending a second candidate block to it put
    // every unowned BiS into the paste twice.
    it("replaces an earlier candidate block instead of stacking another", () => {
        const once = buildRaidbotsExport(RAW, BIS, {}, [], MYTH, (id) => "Thing " + id);
        const twice = buildRaidbotsExport(once, BIS, {}, [], MYTH, (id) => "Thing " + id);
        expect((twice.match(/### BiS candidates/g) || []).length).toBe(1);
        expect((twice.match(/id=300/g) || []).length).toBe(1);
        expect(twice).toBe(once);
    });

    it("keeps anything the addon wrote after our block", () => {
        const withTail = buildRaidbotsExport(RAW, BIS, {}, [], MYTH) + "\n### Additional Character Info\n# talents\n";
        const out = buildRaidbotsExport(withTail, BIS, {}, [], MYTH);
        expect(out).toContain("### Additional Character Info");
        expect((out.match(/### BiS candidates/g) || []).length).toBe(1);
    });
});
