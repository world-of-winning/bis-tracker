import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseSimC } from "../src/data/shared.js";

const FIXTURE = readFileSync(
    fileURLToPath(new URL("./fixtures/simc-sections.txt", import.meta.url)),
    "utf8",
);

describe("parseSimC sections", () => {
    it("reads the equipped gear from the uncommented lines", () => {
        const { gear, cnt } = parseSimC(FIXTURE);
        expect(cnt).toBe(3);
        expect(gear.head).toMatchObject({ id: 100, ilvl: 321, bonus: "12841:1234" });
        expect(gear.neck.id).toBe(101);
        expect(gear.feet.id).toBe(102);
    });

    it("keeps only 'Gear from Bags' items in the bag", () => {
        const { bag } = parseSimC(FIXTURE);
        expect(bag.map((b) => b.id)).toEqual([110, 111]);
    });

    it("collects the weekly reward choices into their own list", () => {
        const { vault } = parseSimC(FIXTURE);
        expect(vault.map((v) => v.id)).toEqual([120, 121, 122]);
        expect(vault[0]).toMatchObject({ slot: "chest", ilvl: 334, bonus: "12849" });
    });

    // A vendor's stock and an item someone linked in chat are not owned. Reading
    // them as bag items marked their slot done, which is the bug this split fixes.
    it("discards merchant stock and linked gear entirely", () => {
        const { bag, vault } = parseSimC(FIXTURE);
        const ids = bag.concat(vault).map((i) => i.id);
        expect(ids).not.toContain(130);
        expect(ids).not.toContain(131);
    });

    it("does not let the vault leak into the equipped-slot count", () => {
        const { gear } = parseSimC(FIXTURE);
        expect(gear.chest).toBeUndefined();
        expect(gear.waist).toBeUndefined();
    });

    // Exports predating the section headers carry commented bag lines with no
    // '### Gear from Bags' above them. Those still belong in the bag.
    it("treats commented items before any section header as bag items", () => {
        const legacy = [
            'paladin="Uther"',
            "spec=protection",
            "head=,id=100,bonus_id=12841",
            "# Spare Pauldrons (308)",
            "# shoulder=,id=110,bonus_id=12833",
        ].join("\n");
        const { bag, vault } = parseSimC(legacy);
        expect(bag.map((b) => b.id)).toEqual([110]);
        expect(vault).toEqual([]);
    });

    it("reports the region so the caller can tell which week the export is from", () => {
        expect(parseSimC(FIXTURE).ci.region).toBe("kr");
    });
});
