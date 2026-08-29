import { describe, expect, it } from "vitest";
import { pasteAction } from "../src/logic/simc-paste.js";

const PROFILE = [
    'paladin="Uther"',
    "level=90",
    "spec=protection",
    "head=,id=100,bonus_id=12841",
].join("\n");

describe("pasteAction", () => {
    it("puts the clipboard where the caret is, leaving the rest alone", () => {
        const r = pasteAction("abcdef", 3, 3, "XY");
        expect(r.next).toBe("abcXYdef");
        expect(r.action).toBe("edit");
    });

    it("replaces only the selected run", () => {
        expect(pasteAction("abcdef", 1, 4, "Z").next).toBe("aZef");
    });

    // The box selects itself on focus, so the ordinary import is a paste over
    // the whole value. That still has to import.
    it("imports when the whole value is replaced by a profile", () => {
        const r = pasteAction("old text", 0, "old text".length, PROFILE);
        expect(r.next).toBe(PROFILE);
        expect(r.action).toBe("import");
    });

    // The paste is judged on what the box will hold afterwards, not on the
    // clipboard alone: a profile dropped into the middle of other text does
    // not make a profile.
    it("does not import a profile pasted into the middle of other text", () => {
        const r = pasteAction("junk", 2, 2, PROFILE);
        expect(r.next).toBe("ju" + PROFILE + "nk");
        expect(r.action).not.toBe("import");
    });

    it("warns, but still pastes, when the result names a character and carries no gear", () => {
        const r = pasteAction("", 0, 0, 'paladin="Uther"\nspec=protection\n');
        expect(r.action).toBe("warn");
        expect(r.next).toBe('paladin="Uther"\nspec=protection\n');
    });

    it("leaves an empty clipboard to the browser", () => {
        expect(pasteAction("abc", 1, 1, "   ").action).toBe("edit");
    });
});
