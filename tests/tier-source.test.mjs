import { describe, expect, it } from "vitest";
import { normalizeSourceFields, tierSource } from "../scripts/tier-source.mjs";

describe("tierSource", () => {
    it("leaves a tier-set item filed under a non-tier slot alone", () => {
        // Maxroll files the Vengeance tier helm under the Neck row. Tier-set
        // armour occupies five slots and neck is not one of them, so the set
        // marker says nothing about this row except that the row is wrong.
        // Writing "Tier" here launders a mis-filed row into a plausible one.
        expect(tierSource("neck", true, "Ula'tek")).toBe("Ula'tek");
    });

    it("names a tier-set item Tier in a slot tier armour occupies", () => {
        expect(tierSource("head", true, "Ula'tek")).toBe("Tier");
    });

    it("keeps the fallback for an item carrying no set marker", () => {
        expect(tierSource("head", false, "Murder Row")).toBe("Murder Row");
    });
});

// --fix re-reads a written data file, so it has to recover the slot from the
// row's own text. It used to match on the item id alone, which is why the
// guard above could not be applied there at all.
const deps = { isTier: () => true, normalizeSource: (v) => v };

describe("normalizeSourceFields", () => {
    it("does not rewrite a neck row's source to Tier", () => {
        const row = `  { slot: "neck", id: 271537, source: "Ula'tek", stats: ["crit","mastery"] },`;
        const { content, changes } = normalizeSourceFields(row, deps);
        expect(content).toBe(row);
        expect(changes).toEqual([]);
    });

    it("rewrites a head row's source to Tier and reports the change", () => {
        const row = `  { slot: "head", id: 271537, source: "Ula'tek", stats: ["crit","mastery"] },`;
        const { content, changes } = normalizeSourceFields(row, deps);
        expect(content).toContain('source: "Tier"');
        expect(changes).toEqual(["Ula'tek \u2192 Tier"]);
    });

    it("reads an ALTS row's forSlot as the slot", () => {
        // Asserting only that a forSlot neck row is left alone proves
        // nothing: a pattern that does not match an ALTS row at all returns
        // the content unchanged too. The head row is what tells the two
        // apart — it can only be rewritten if forSlot was read as the slot.
        const neck = `  { forSlot: "neck", id: 271537, source: "Ula'tek", stats: ["crit"] },`;
        expect(normalizeSourceFields(neck, deps).content).toBe(neck);

        const head = `  { forSlot: "head", id: 271537, source: "Ula'tek", stats: ["crit"] },`;
        expect(normalizeSourceFields(head, deps).content).toContain(
            'source: "Tier"',
        );
    });
});
