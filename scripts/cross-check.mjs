/**
 * Reading two publishers' BiS tables against the game, and against each other.
 *
 * Two authors picking different items for one slot is judgement, and since the
 * two lists answer different questions — Maxroll's raid guide states the best
 * raid gear, Wowhead's Overall BiS the best gear over all content — most of
 * those differences are not even disagreements. None of it is reported.
 *
 * A **structural contradiction** is something else: a row that says something
 * the game says is false. A neck row holding an item whose own tooltip says
 * Head. A row sourced to a dungeon the item does not drop in. Those are
 * reported, and they decide — where the two sources name different items for a
 * slot and only one row survives the check, the surviving row is taken.
 *
 * A row that only mislabels where its item drops is corrected rather than
 * replaced: the item is right, and the loot table that caught the label also
 * holds the answer.
 *
 * Everything here is a pure function over rows and facts. Fetching the facts —
 * tooltips, the client's loot table — is the caller's job, which is what makes
 * the rule testable without a network. See ADR 0006.
 */
import { slotFitsInvSlot } from "./gear-slots.mjs";

// Sources that name no place: an item converted at the catalyst or made at a
// profession has no drop to check against.
const NO_PLACE = /^(Tier|Crafted|Catalyst|Vendor|Token)$/i;

const bare = (s) =>
    s
        .replace(/['‘’]/g, "")
        .toLowerCase()
        .replace(/^the\s+/, "")
        .trim();

/**
 * Whether a row's source names the place its item actually comes from.
 *
 * A source may name the dungeon or the boss, and may name two of either where
 * an item drops in more than one place, so any part naming either is enough.
 */
export function sourceNamesTheDrop(source, drop) {
    if (!source || NO_PLACE.test(source)) return true;
    if (!drop) return true; // an item outside the season pool cannot be checked
    const parts = source.split(/\s*[/&]\s*/).map(bare);
    return parts.some(
        (p) =>
            (drop.instance && p === bare(drop.instance)) ||
            (drop.encounter && p === bare(drop.encounter)),
    );
}

/**
 * What the game contradicts in one row.
 *
 * An empty list means the row survived, which includes surviving because
 * nothing was known about the item. Silence here is not a guarantee that the
 * row is right — it is the absence of a demonstrable contradiction.
 *
 * Each fault carries its kind, because the two are not the same kind of
 * problem. A slot fault says the row names the wrong item. A source fault
 * says the row names the right item and mislabels where it comes from, and
 * the loot table that caught it also knows the answer.
 */
export function rowFaults(row, fact) {
    const faults = [];
    if (!fact) return faults;
    if (!slotFitsInvSlot(row.slot, fact.invSlot))
        faults.push({ kind: "slot", says: `the item is a ${fact.invSlot} item` });
    if (!sourceNamesTheDrop(row.source, fact.drop))
        faults.push({
            kind: "source",
            says: `it drops from ${fact.drop.encounter} in ${fact.drop.instance}, not ${row.source}`,
        });
    return faults;
}

/**
 * One slot list, decided.
 *
 * The primary source is taken wherever it stands up. Where it does not, the
 * second witness takes the slot if *it* stands up, and failing that the row
 * already in the data file does — a bad row must not blank a slot, and a run
 * over forty specs must not die for one of them. A row with nowhere to fall
 * back to is kept and reported: the alternative is a spec with fifteen slots.
 *
 * `faultsOf` and `correctionOf` are handed in rather than computed here so
 * that the facts — a tooltip, a loot table — are fetched once by the caller
 * and this stays a function of its arguments.
 */
export function crossCheck({
    primary,
    secondary = [],
    existing = [],
    faultsOf,
    correctionOf = () => null,
}) {
    const witness = new Map(secondary.map((r) => [r.slot, r]));
    const held = new Map(existing.map((r) => [r.slot, r]));
    const rows = [];
    const reports = [];

    for (const row of primary) {
        const faults = faultsOf(row);
        if (!faults.length) {
            rows.push(row);
            continue;
        }

        // A row that only mislabels where its item comes from is not a wrong
        // row, and swapping the item out over it would be the larger error.
        // The dungeon name keys the badge colour and the filter, so a wrong
        // one is worth correcting rather than merely reporting.
        const source = faults.every((f) => f.kind === "source")
            ? correctionOf(row)
            : null;
        if (source) {
            reports.push({ ...report(row, faults), took: "correction", source });
            rows.push({ ...row, source });
            continue;
        }

        const other = witness.get(row.slot);
        if (other && other.itemId !== row.itemId && !faultsOf(other).length) {
            reports.push({ ...report(row, faults), took: "maxroll", itemId: other.itemId });
            rows.push({ ...other, slot: row.slot });
            continue;
        }

        const kept = held.get(row.slot);
        if (kept && kept.itemId !== row.itemId) {
            reports.push({ ...report(row, faults), took: "file", itemId: kept.itemId });
            rows.push({ ...kept, slot: row.slot });
            continue;
        }

        reports.push({ ...report(row, faults), took: null, itemId: row.itemId });
        rows.push(row);
    }

    return { rows, reports };
}

function report(row, faults) {
    return { slot: row.slot, rejected: row.itemId, faults };
}

/** One line per contradiction, for the summary at the end of a run. */
export function formatReport(specKey, report) {
    const where =
        report.took === "correction"
            ? `corrected the source to ${report.source}`
            : report.took === "maxroll"
              ? `took Maxroll's ${report.itemId}`
              : report.took === "file"
                ? `kept the file's ${report.itemId}`
                : `no sound alternative, kept it`;
    const says = report.faults.map((f) => f.says).join("; ");
    return `  ${specKey} ${report.slot}: ${report.rejected} — ${says} → ${where}`;
}
