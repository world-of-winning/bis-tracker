import { describe, expect, it } from "vitest";
import { getSampleChars } from "../src/data/sample.js";
import { parseSimC } from "../src/data/shared.js";
import { vaultVerdict } from "../src/logic/vault.js";

// The demo is the only place most visitors see the vault block. If the sample
// export stops carrying a Weekly Reward Choices section, the block silently
// turns into "go open your vault" for a character who has no vault to open.
describe("sample SimC exports", () => {
    const chars = getSampleChars();

    it("give every sample character a vault to decide on", () => {
        chars.forEach((c) => {
            const { vault } = parseSimC(c.simcText);
            expect(vault.length, c.name + " / " + c.spec.SPEC_KEY).toBeGreaterThan(0);
        });
    });

    it("keep the vault out of the bag", () => {
        chars.forEach((c) => {
            const { bag, vault } = parseSimC(c.simcText);
            const bagIds = new Set(bag.map((b) => b.id));
            vault.forEach((v) => expect(bagIds.has(v.id)).toBe(false));
        });
    });

    it("show both verdicts across the sample set", () => {
        const verdicts = chars.map((c) => {
            const p = parseSimC(c.simcText);
            return vaultVerdict(p.vault, c.spec.BIS, p.gear, p.bag).take;
        });
        expect(verdicts.some((v) => v)).toBe(true);
        expect(verdicts.some((v) => !v)).toBe(true);
    });
});
