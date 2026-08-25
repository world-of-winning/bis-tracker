import { useLocale, LOCALE_META } from '../i18n/index.jsx';
import { DUNGEONS, ARMOR_SLOTS } from '../data/shared.js';
import { getSource } from '../logic/priority.js';
import { assessGain, replacedItem } from '../logic/expectation.js';
import EqTooltipObserver from './EqTooltipObserver.jsx';

var STAT_COLORS = { crit: { bg: "#2a1a1a", fg: "#e88", bd: "#4a2222" }, haste: { bg: "#1a2a1a", fg: "#8e8", bd: "#224a22" }, mastery: { bg: "#1a1a2a", fg: "#88e", bd: "#22224a" }, vers: { bg: "#2a2a1a", fg: "#ee8", bd: "#4a4a22" } };

function StatPills({ stats: itemStats }) {
  var { t } = useLocale();
  if (!itemStats || !itemStats.length) return null;
  return (<span style={{ display: "inline-flex", gap: 2 }}>{itemStats.map(function(s) { var c = STAT_COLORS[s]; return (<span key={s} style={{ display: "inline-flex", padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: c.bg, color: c.fg, border: "1px solid " + c.bd }}>{t("stats." + s)}</span>); })}</span>);
}

// Maxroll files some items under two sources at once ("Kings' Rest & Crafted").
// Translate each side rather than looking up the joined string, which would
// need a new key for every combination that ever shows up.
// t() returns the key itself on a miss, so an untranslated source would
// otherwise render as the literal text "sources.Kings' Rest & Crafted".
// A badge showing one source has room for the client's full name, which is
// what the reader recognises; a joined source doubles the width, so both
// halves drop to the short label the filter row uses. Keys with no full form
// (Tier, Crafted, Catalyst, The Great Vault are UI concepts, not DB entries)
// fall back to the short one — t() hands back the key itself on a miss.
function localizeSource(source, t) {
  var parts = source.split(" & ");
  var solo = parts.length === 1;
  return parts
    .map(function(part) {
      var block = DUNGEONS[part] ? "dungeons" : "sources";
      if (solo) {
        var fullKey = block + "Full." + part;
        var full = t(fullKey);
        if (full !== fullKey) return full;
      }
      return t(block + "." + part);
    })
    .join(" & ");
}

export default function ItemCard({ item, isAlt, priority: p, sr, onToggle, idx, theme, allStats, targetBonus, targetIlvl, whSpecId, armorTypes, expectedArmor, simcSpec, primaryStats, expectedPrimary, gainCtx }) {
  var { t, itemName, locale } = useLocale();
  var itemSource = getSource(item);
  var isDungeon = !!DUNGEONS[itemSource];
  var c = DUNGEONS[itemSource] || { b: "#8866aa", t: "#c4aadd", g: "#1a1028" };
  var eq = !isAlt && sr && sr.eqSlot ? sr.eqSlot[item.id] : null;
  // The same call the dungeon ordering makes, so the card names the item the
  // score was computed against rather than a second guess at it.
  var altEq = isAlt && gainCtx ? replacedItem(item, sr, gainCtx.settled) : null;
  var hasDiff = eq && eq.id !== item.id;
  var displayEq = isAlt ? altEq : (hasDiff ? eq : null);
  var eqForTooltip = hasDiff ? eq : (isAlt && altEq ? altEq : null);
  var isSimcAlt = !isAlt && sr && sr.altItems ? sr.altItems[item.id] : false;
  // An alt row is an option, not a verdict, so it carries no grade — but the
  // player still needs to know what it would replace and by how much. Item
  // levels are the only number here; a trade down in secondaries is a marker,
  // because nothing in this project can say how many item levels it costs.
  var alt = (isAlt && gainCtx && altEq) ? assessGain(item, gainCtx) : null;
  var altGain = alt ? alt.gain : 0;
  var altStatsDown = !!(alt && alt.statsRegress);
  // Every row worth nothing says why. The step-back case is left to the arrow,
  // which already carries that sentence; the other two would otherwise sit at
  // the bottom of the list with nothing to explain how they got there.
  var altNoGain = (alt && alt.gain === 0 && alt.reason && alt.reason !== "statsDown") ? alt.reason : null;
  // An equivalent fit is a fit — the slot is done — but it is not the exact
  // item, and chasing that late in a season is legitimate. Say which it is
  // rather than leaving the two states looking identical. This is about the
  // equipped item only; alt rows carry no fit, being options rather than
  // verdicts.
  var isEquivalentFit = !isAlt && isSimcAlt === "equivalent";
  // Detect wrong armor type on the equipped item
  var eqToCheck = eq || altEq;
  var eqSlotName = isAlt ? item.forSlot : item.slot;
  var wrongArmor = null;
  if (expectedArmor && eqToCheck && armorTypes && ARMOR_SLOTS.has(eqSlotName)) {
    var eqArmor = armorTypes[eqToCheck.id];
    if (eqArmor && eqArmor !== expectedArmor) wrongArmor = eqArmor;
  }
  // Detect wrong primary stat on the equipped item (e.g. int weapon on a str spec)
  var wrongPrimary = null;
  if (expectedPrimary && eqToCheck && primaryStats) {
    var eqPrimary = primaryStats[eqToCheck.id];
    if (eqPrimary && eqPrimary.length > 0 && eqPrimary.indexOf(expectedPrimary) < 0) wrongPrimary = eqPrimary[0];
  }
  var tier = (p && p.tier) ? p.tier : 0;
  var isDoneState = (wrongArmor || wrongPrimary) ? false : tier === 4;
  var canToggle = (wrongArmor || wrongPrimary) ? false : (isDoneState || !(p && p.deficit > 0));
  var isMythicBisDone = !wrongArmor && p && p.labelKey === "mythicBisDone";
  var visualTier = (wrongArmor || wrongPrimary) ? 1 : (isMythicBisDone || (p && p.upgradeStatus === "enhance")) ? 4 : (p && p.upgradeStatus === "tierUp") ? 2 : tier;
  var cardClass = "ic card-enter";
  if (wrongArmor) cardClass += " t1 wrong-armor"; else if (visualTier === 1) cardClass += " t1"; else if (visualTier === 2) cardClass += " t2"; else if (visualTier === 3) cardClass += " t3"; else if (visualTier === 4) cardClass += " t4";
  if (isAlt && !isDoneState) cardClass += " altc";
  var bgs = { 0: "linear-gradient(135deg, #101018, " + c.g + "88)", 1: "linear-gradient(135deg, #140e0e, #1a0f0f)", 2: "linear-gradient(135deg, #14120a, #1a150d)", 3: "linear-gradient(135deg, #14120a, #1a150d)", 4: "linear-gradient(135deg, #0d120d, #0a100a)" };
  if (wrongArmor) bgs[1] = "linear-gradient(135deg, #2a0505, #1a0808)";
  var acs = { 0: c.b, 1: "#ff6b6b", 2: "#c9a227", 3: "#c9a227", 4: "#1a3a1a" };
  var icons = { 1: "\u25B2", 2: "\u25C6", 3: "\u2191", 4: "\u2713" };
  var pLabel = p ? (p.labelKey ? t("ui." + p.labelKey) : p.label) : "";
  var whLocale = (LOCALE_META[locale] || LOCALE_META.en).whPath;
  var whSpec = whSpecId ? "&spec=" + whSpecId : "";
  return (
    <div className={cardClass} style={{ animationDelay: (idx * .04) + "s", background: bgs[visualTier] || bgs[0], borderRadius: 10, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: wrongArmor ? 4 : (visualTier >= 1 && visualTier <= 2) ? 3 : 2, background: wrongArmor ? "#ff2020" : (acs[visualTier] || c.b), opacity: wrongArmor ? 1 : (visualTier <= 2 ? .9 : (visualTier === 4 ? .3 : .6)) }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: isAlt ? "#e8a84c" : theme.accent, background: isAlt ? "#2a1f10" : theme.accentBg, padding: "2px 7px", borderRadius: 3, border: "1px solid " + (isAlt ? "#5a4020" : theme.accentBorder) }}>{isAlt ? "ALT \u00B7 " + t("slots." + item.forSlot) : t("slots." + item.slot)}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: c.g, color: c.t, border: "1px solid " + c.b + "44" }}>{localizeSource(itemSource, t)}</span>
            <StatPills stats={item.stats} />
            {isEquivalentFit && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: "#14201a", color: "#7fb08a", border: "1px solid #2c4634" }}>{"\u2248 " + t("ui.equivalentFit")}</span>}
          </div>
          <a href={"https://www.wowhead.com" + whLocale + "/item=" + item.id + whSpec + (!hasDiff && eq ? (eq.bonus ? "&bonus=" + eq.bonus : "") + (eq.ilvl ? "&ilvl=" + eq.ilvl : "") : (targetBonus ? "&bonus=" + targetBonus : ""))} target="_blank" rel="noopener noreferrer" data-wh-icon-size="small" {...(eqForTooltip ? {"data-eq-id": eqForTooltip.id, "data-eq-bonus": eqForTooltip.bonus || "", "data-eq-ilvl": eqForTooltip.ilvl || ""} : {})} style={{ display: "block", fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 2, color: isDoneState ? "#556644" : (isAlt ? "#d4b87a" : "#e8dcc0"), textDecoration: isDoneState ? "line-through" : "none", textDecorationColor: "#3a5a2a" }}>{itemName(item)}</a>
          {wrongArmor && (
            <div className="wrong-armor-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 5, fontSize: 12, fontWeight: 800, background: "linear-gradient(135deg,#3a0a0a,#2a0505)", border: "2px solid #ff2020", color: "#ff4444", marginBottom: 6, letterSpacing: .5 }}>
              <span style={{ fontSize: 16 }}>{"\u26A0"}</span>
              <span>{t("ui.wrongArmorType", { expected: t("armorTypes." + expectedArmor), actual: t("armorTypes." + wrongArmor) })}</span>
            </div>
          )}
          {!wrongArmor && wrongPrimary && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 5, fontSize: 12, fontWeight: 800, background: "linear-gradient(135deg,#3a0a0a,#2a0505)", border: "2px solid #ff2020", color: "#ff4444", marginBottom: 6, letterSpacing: .5 }}>
              <span style={{ fontSize: 16 }}>{"\u26A0"}</span>
              <span>{t("ui.wrongPrimaryStat", { expected: t("primaryStats." + expectedPrimary), actual: t("primaryStats." + wrongPrimary) })}</span>
            </div>
          )}
          {p && tier > 0 && tier < 4 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700, background: visualTier === 1 ? "linear-gradient(135deg,#2a1515,#1a0f0f)" : visualTier === 2 ? "linear-gradient(135deg,#2a1f10,#1a1508)" : visualTier === 3 ? "linear-gradient(135deg,#2a1f10,#1a1508)" : "#0d1a0d", border: "1px solid " + (visualTier === 1 ? "#6a2020" : visualTier === 2 ? "#6a5020" : visualTier === 3 ? "#6a5020" : "#1a3a1a"), color: p.color }}>
                <span style={{ fontSize: 10 }}>{icons[tier]}</span><span>{pLabel}</span>
                {p.deficit > 0 && <span style={{ opacity: .7, fontSize: 10 }}>{"\uFF08\u2212" + p.deficit + "\uFF09"}</span>}
              </div>
              {p.upgradeStatus && <span style={{ fontSize: 9, color: p.upgradeStatus === "tierUp" ? "#cc8844" : "#5a9a5a" }}>{t(p.upgradeStatus === "tierUp" ? "ui.tierReacquireNeeded" : "ui.tierUpgradeNeeded")}</span>}
              {p.weaponMismatch && <span style={{ fontSize: 9, color: "#cc8844" }}>{t("ui.weaponMismatch", { spec: t("specs." + simcSpec), slot: t("slots." + item.slot) })}</span>}
            </div>
          )}
          {displayEq && (
            <a href={"https://www.wowhead.com" + whLocale + "/item=" + displayEq.id + whSpec + (displayEq.bonus ? "&bonus=" + displayEq.bonus : "") + (displayEq.ilvl ? "&ilvl=" + displayEq.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 3, background: (isAlt || isSimcAlt) ? "#1a1508" : "#1a1520", border: "1px solid " + ((isAlt || isSimcAlt) ? "#3a2a10" : "#3a2030"), textDecoration: "none", fontSize: 10, fontWeight: 600, color: (isAlt || isSimcAlt) ? "#c9a040" : "#aa7799", whiteSpace: "nowrap", marginTop: 2 }}>
              <span>{displayEq.name}{isAlt && displayEq.ilvl ? " (" + displayEq.ilvl + ")" : ""}</span>
              {allStats[displayEq.id] && allStats[displayEq.id].length > 0 && allStats[displayEq.id].map(function(s) {
                return (<span key={s} style={{ fontSize: 9, color: "#776655" }}>{"\u00B7"}{t("stats." + s)}</span>);
              })}
              {altGain > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: "#7fb08a" }}>{"\u2192 +" + altGain}</span>}
              {altStatsDown && <span style={{ fontSize: 10, fontWeight: 700, color: "#a06a6a" }} title={t("ui.statsDowngrade")}>{"\u2193"}</span>}
              {altNoGain && <span style={{ fontSize: 9, color: "#5a5a66" }}>{t("ui.gain" + altNoGain.charAt(0).toUpperCase() + altNoGain.slice(1))}</span>}
            </a>
          )}
        </div>
        <div className="ck" onClick={function() { if (canToggle) onToggle(item.id); }} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: isDoneState ? "#1a3a1a" : "#1a1a28", border: "2px solid " + (isDoneState ? "#4dca6b" : "#2a2a3a"), flexShrink: 0, marginTop: 2, cursor: canToggle ? "pointer" : "not-allowed", opacity: (!isDoneState && !canToggle) ? 0.35 : 1 }}>
          {isDoneState ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4dca6b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : <div style={{ width: 14, height: 14, borderRadius: 3, border: "2px solid #333344" }} />}
        </div>
      </div>
      <EqTooltipObserver locale={locale} whSpecId={whSpecId} t={t} />
    </div>
  );
}
