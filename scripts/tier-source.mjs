// The one encoding of "when does a gear row's source read Tier".
//
// Two callers share it: generation, which has the slot and the tooltip in
// hand, and --fix, which re-reads a written data file. They used to answer
// separately, and drifted — --fix stamped "Tier" on a neck row, a state
// generation cannot produce, and that is how a tier helm came to sit in
// Vengeance Demon Hunter's neck slot.

// Tier-set armour always occupies these five slots. An item carrying a set
// marker in any other slot says nothing about that row except that the row
// was filed wrong, so the marker must not be allowed to rename its source.
export const TIER_SLOTS = new Set(["head", "shoulder", "chest", "hands", "legs"]);

export function tierSource(slot, isTier, fallback) {
    return isTier && TIER_SLOTS.has(slot) ? "Tier" : fallback;
}

// Rewrite the source/dungeon values of a written data file's gear rows.
//
// The slot is captured alongside the id because tierSource needs it. Matching
// on the id alone is what let --fix write a state generation cannot produce.
// ALTS spell the field forSlot, and BIS rows may carry a simcSlot between the
// slot and the id; both shapes are the same row to this rule.
const GEAR_ROW =
    /((?:slot|forSlot):\s*"([^"]+)",\s*(?:simcSlot:\s*"[^"]+",\s*)?id:\s*(\d+),\s*(?:source|dungeon):\s*)"([^"]+)"/g;

export function normalizeSourceFields(content, { isTier, normalizeSource }) {
    const changes = [];
    const rewritten = content.replace(
        GEAR_ROW,
        (match, prefix, slot, id, value) => {
            const normalized = tierSource(
                slot,
                isTier(Number(id)),
                normalizeSource(value),
            );
            if (normalized === value) return match;
            changes.push(`${value} → ${normalized}`);
            return `${prefix}"${normalized}"`;
        },
    );
    return { content: rewritten, changes };
}
