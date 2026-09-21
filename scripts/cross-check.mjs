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
 * A row naming an item this season does not hand out is the one contradiction
 * that is worse kept than missing — the tracker would send a player to a
 * retired dungeon — so it is dropped when nothing sound replaces it.
 *
 * A slot the primary list never names is the same harm as a contradicted row
 * and gets the same treatment — Wowhead's Beast Mastery page lists no helm at
 * all — so the other publisher, then the data file, fills it.
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
 * Whether a row's source names a place its item actually comes from.
 *
 * A source may name the dungeon or the boss, and an item may drop in more than
 * one place, so any part of the source naming any of the drops is enough.
 */
export function sourceNamesTheDrop(source, drops) {
    if (source && NO_PLACE.test(source)) return true;
    if (!drops || !drops.length) return true; // nothing to check against
    // A row that names nowhere, against an item whose drops are known, is a
    // row to fill in — that is what a stripped [npc=…] leaves behind.
    if (!source) return false;
    const parts = source.split(/\s*[/&]\s*/).map(bare);
    return drops.some((drop) =>
        parts.some(
            (p) =>
                (drop.instance && p === bare(drop.instance)) ||
                (drop.encounter && p === bare(drop.encounter)),
        ),
    );
}

/**
 * Whether every place an item drops is content this season does not run.
 *
 * `inSeason` is set by the caller against the same DUNGEONS and CURRENT_RAIDS
 * the alt pool is gated on, so a row cannot be in season here and out of it
 * there. An item that drops nowhere — crafted, catalysed, a tier piece — says
 * nothing either way.
 */
export function outOfSeason(drops) {
    if (!drops || !drops.length) return false;
    return !drops.some((d) => d.inSeason);
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
    if (outOfSeason(fact.drops))
        faults.push({
            kind: "season",
            says: `it drops only in ${fact.drops.map((d) => d.instance).join(", ")}, which this season does not run`,
        });
    if (!sourceNamesTheDrop(row.source, fact.drops)) {
        const [first] = fact.drops;
        faults.push({
            kind: "source",
            says:
                `it drops from ${first.encounter} in ${first.instance}` +
                (fact.drops.length > 1 ? ` (and ${fact.drops.length - 1} more)` : "") +
                (row.source ? `, not ${row.source}` : `, and the row names nowhere`),
        });
    }
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
            reports.push({ ...report(row, faults), took: "witness", itemId: other.itemId });
            rows.push({ ...other, slot: row.slot });
            continue;
        }

        // A fallback the game contradicts too is no fallback. Taking it would
        // also write it back to the file, where the next run would offer it as
        // a fallback again, and the bad row would outlive every source of it.
        const kept = held.get(row.slot);
        if (kept && kept.itemId !== row.itemId && !faultsOf(kept).length) {
            reports.push({ ...report(row, faults), took: "file", itemId: kept.itemId });
            rows.push({ ...kept, slot: row.slot });
            continue;
        }

        // Nothing sound left. A slot filled wrongly beats a slot missing — a
        // spec with fifteen rows reads as finished — except where the row
        // names gear the season does not hand out, which would have the
        // tracker send a player to a retired dungeon for it.
        if (faults.some((f) => f.kind === "season")) {
            reports.push({ ...report(row, faults), took: "dropped", itemId: row.itemId });
            continue;
        }
        reports.push({ ...report(row, faults), took: null, itemId: row.itemId });
        rows.push(row);
    }

    // Slots the primary list never names at all. A publisher omitting a slot
    // leaves it blank, which is what the fallback exists to prevent, so the
    // same order applies: the other publisher if its row stands up, then
    // whatever the data file already holds.
    const named = new Set(rows.map((r) => r.slot));
    const gap = [{ kind: "gap", says: "the primary list names no such slot" }];
    for (const [slot, row] of witness) {
        if (named.has(slot) || faultsOf(row).length) continue;
        named.add(slot);
        rows.push(row);
        reports.push({ slot, rejected: null, faults: gap, took: "witness", itemId: row.itemId });
    }
    for (const [slot, row] of held) {
        if (named.has(slot) || faultsOf(row).length) continue;
        named.add(slot);
        rows.push(row);
        reports.push({ slot, rejected: null, faults: gap, took: "file", itemId: row.itemId });
    }

    return { rows, reports };
}

function report(row, faults) {
    return { slot: row.slot, rejected: row.itemId, faults };
}

/**
 * One line per contradiction, for the summary at the end of a run.
 *
 * `witness` names the list the second opinion came from, because it is not
 * always the same one: BIS is read against Maxroll, and MYTHIC — itself
 * Maxroll's — is read against Wowhead. A fixed label here said "Maxroll's"
 * over rows that came from Wowhead.
 */
export function formatReport(specKey, report, witness = "the other list") {
    const where =
        report.took === "correction"
            ? `corrected the source to ${report.source}`
            : report.took === "dropped"
              ? `dropped the row, having nothing sound to put there`
            : report.took === "witness"
              ? `took ${witness}'s ${report.itemId}`
              : report.took === "file"
                ? `kept the file's ${report.itemId}`
                : `no sound alternative, kept it`;
    const says = report.faults.map((f) => f.says).join("; ");
    const subject = report.rejected === null ? "" : `${report.rejected} — `;
    return `  ${specKey} ${report.slot}: ${subject}${says} → ${where}`;
}
