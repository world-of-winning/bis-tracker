import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { load, save as persist } from '../storage.js';
import { DUNGEON_COLORS as DC, TIERS, GEAR_SLOTS, fetchItemStats } from '../data/shared.js';
import { findSpecBySimC } from '../data/specs.js';
import { useLocale } from '../i18n/index.jsx';

function sameStats(a, b) {
  if (!a || !b || !a.length || !b.length) return false;
  if (a.length !== b.length) return false;
  var x = a.slice().sort(), y = b.slice().sort();
  return x.every(function(v, i) { return v === y[i]; });
}
function getSource(item) { return item.source; }
function getDungeonCounts(BIS, ALTS, dungeons) {
  var c = {};
  dungeons.forEach(function(d) { c[d] = { bis: 0, alt: 0 }; });
  BIS.forEach(function(b) { var s = getSource(b); if (c[s]) c[s].bis++; });
  ALTS.forEach(function(a) { var s = getSource(a); if (c[s]) c[s].alt++; });
  return c;
}
function parseSimC(text) {
  var lines = text.split("\n"), gear = {}, bag = [], ci = {}, pend = null, sp = GEAR_SLOTS.join("|");
  for (var i = 0; i < lines.length; i++) {
    var t = lines[i].trim();
    var cm0 = t.match(/^(paladin|warrior|mage|priest|shaman|druid|hunter|warlock|rogue|monk|deathknight|demonhunter|evoker)="(.+)"$/);
    if (cm0) { ci.className = cm0[1]; ci.name = cm0[2]; continue; }
    if (t.indexOf("level=") === 0) { ci.level = t.split("=")[1]; continue; }
    if (t.indexOf("spec=") === 0) { ci.spec = t.split("=")[1]; continue; }
    var cm = t.match(/^#\s+(.+?)\s*\((\d+)\)\s*$/);
    if (cm) { pend = { name: cm[1], ilvl: parseInt(cm[2], 10) }; continue; }
    var gm = t.match(new RegExp("^(" + sp + ")=([^,]*),id=(\\d+)"));
    if (gm) {
      var rn = gm[2], fb = rn ? rn.replace(/_/g, " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); }) : null;
      var bMatch = t.match(/bonus_id=([0-9/]+)/);
      gear[gm[1]] = { id: parseInt(gm[3], 10), name: pend ? pend.name : (fb || "Item #" + gm[3]), ilvl: pend ? pend.ilvl : null, bonus: bMatch ? bMatch[1].replace(/\//g, ":") : null };
      pend = null; continue;
    }
    var bm = t.match(new RegExp("^#\\s*(" + sp + ")=([^,]*),id=(\\d+)"));
    if (bm) {
      var brn = bm[2], bfb = brn ? brn.replace(/_/g, " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); }) : null;
      var bMatch2 = t.match(/bonus_id=([0-9/]+)/);
      bag.push({ slot: bm[1], id: parseInt(bm[3], 10), name: pend ? pend.name : (bfb || "Item #" + bm[3]), ilvl: pend ? pend.ilvl : null, bonus: bMatch2 ? bMatch2[1].replace(/\//g, ":") : null });
      pend = null; continue;
    }
    if (t.charAt(0) !== "#") pend = null;
  }
  var ilvls = Object.values(gear).map(function(g) { return g.ilvl || 0; }).filter(function(v) { return v > 0; });
  ci.avgIlvl = ilvls.length > 0 ? Math.round(ilvls.reduce(function(a, b) { return a + b; }, 0) / ilvls.length) : 0;
  return { ci: ci, gear: gear, bag: bag, cnt: Object.keys(gear).length };
}
function matchBiS(BIS, gear, bag, stats, knownBisIds) {
  var BIS_IDS = new Set(BIS.map(function(i) { return i.id; }));
  var matched = {}, eqSlot = {}, bisInBag = {}, altItems = {};
  BIS.forEach(function(bi) {
    var s = bi.slot, d = gear[s];
    if (d && d.id === bi.id) { matched[bi.id] = true; eqSlot[bi.id] = d; return; }
    if (s.indexOf("finger") === 0 || s.indexOf("trinket") === 0) {
      var alt = s.endsWith("1") ? s.replace("1", "2") : s.replace("2", "1");
      if (gear[alt] && gear[alt].id === bi.id) { matched[bi.id] = true; eqSlot[bi.id] = gear[alt]; return; }
    }
    if (d) eqSlot[bi.id] = d;
  });
  // Fix ring/trinket eqSlot: if pointing to a matched BiS item, use the other slot
  BIS.forEach(function(bi) {
    if (matched[bi.id]) return;
    var s = bi.slot;
    if (s.indexOf("finger") !== 0 && s.indexOf("trinket") !== 0) return;
    var eq = eqSlot[bi.id];
    if (!eq || !BIS_IDS.has(eq.id)) return;
    var alt = s.endsWith("1") ? s.replace("1", "2") : s.replace("2", "1");
    if (gear[alt]) eqSlot[bi.id] = gear[alt];
  });
  bag.forEach(function(b) { if (BIS_IDS.has(b.id) && !matched[b.id]) bisInBag[b.id] = b; });
  BIS.forEach(function(bi) {
    if (matched[bi.id]) return;
    var eq = eqSlot[bi.id]; if (!eq || eq.id === bi.id) return;
    // M+ BiS check (works even for stat-less items like trinkets)
    if (knownBisIds && knownBisIds.has(eq.id)) { altItems[bi.id] = "mythic"; return; }
    if (!bi.stats.length) return;
    var es = stats[eq.id];
    if (es && sameStats(bi.stats, es)) altItems[bi.id] = "stats";
  });
  return { matched: matched, eqSlot: eqSlot, bisInBag: bisInBag, altItems: altItems };
}
function hasWorstStat(eqId, stats, worstStats) {
  if (!worstStats || !worstStats.length) return false;
  var es = stats[eqId];
  if (!es || !es.length) return false;
  return worstStats.some(function(ws) { return es.indexOf(ws) >= 0; });
}
function calcPriority(bisItem, sr, targetIlvl, stats, worstStats) {
  if (!sr) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014", color: "#665544", worst: false };
  var eq = sr.eqSlot ? sr.eqSlot[bisItem.id] : null;
  var isBis = sr.matched ? sr.matched[bisItem.id] : false;
  var isAlt = sr.altItems ? sr.altItems[bisItem.id] : false;
  var inBag = sr.bisInBag ? sr.bisInBag[bisItem.id] : null;
  var eqIlvl = (eq && eq.ilvl) ? eq.ilvl : 0;
  var deficit = Math.max(0, targetIlvl - eqIlvl);
  var worst = eq ? hasWorstStat(eq.id, stats, worstStats) : false;
  if (inBag) { var bI = inBag.ilvl || 0, bD = Math.max(0, targetIlvl - bI); if (bD <= 0) return { tier: 4, deficit: 0, ilvl: bI, labelKey: "bagDone", color: "#4dca6b", worst: false }; return { tier: 3, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#caca3d", worst: false }; }
  if (isBis) { if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", worst: false }; var capped = TIERS.some(function(ti) { return ti.max === eqIlvl && ti.max < targetIlvl; }); return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#6dca8b", worst: false, capped: capped }; }
  if (isAlt) {
    // M+ BiS equipped → always tier 2 (raid BiS is different, never truly "done")
    if (isAlt === "mythic") {
      if (deficit <= 0) return { tier: 2, deficit: 0, ilvl: eqIlvl, labelKey: "mythicBisDone", color: "#6dca8b", worst: false };
      return { tier: 2, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#6dca8b", worst: false };
    }
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", worst: false };
    // Alt too far below target (more than one tier gap) → treat as wrong item
    var prevTier = TIERS.filter(function(t) { return t.max < targetIlvl; });
    var prevMax = prevTier.length > 0 ? prevTier[prevTier.length - 1].max : 0;
    if (eqIlvl < prevMax) return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: worst ? "#ff4444" : "#ff6b6b", worst: worst };
    return { tier: 2, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#e8a84c", worst: worst };
  }
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl > 0 ? eqIlvl + "" : "\u2014", color: worst ? "#ff4444" : "#ff6b6b", worst: worst };
}
// Pick the next target tier based on average equipped ilvl.
// If avgIlvl is within reach of a tier (within half the gap to next),
// that tier is considered achieved and we target the next one.
function autoSelectTier(avgIlvl) {
  for (var i = 0; i < TIERS.length; i++) {
    var gap = i < TIERS.length - 1 ? (TIERS[i + 1].max - TIERS[i].max) / 2 : 0;
    if (avgIlvl < TIERS[i].max - gap) return TIERS[i].key;
  }
  return TIERS[TIERS.length - 1].key;
}
function sortByPriority(items, sr, t, stats, worstStats) {
  return items.slice().sort(function(a, b) {
    var pa = calcPriority(a, sr, t, stats, worstStats), pb = calcPriority(b, sr, t, stats, worstStats);
    if (pa.tier !== pb.tier) return pa.tier - pb.tier;
    if (pa.worst !== pb.worst) return pa.worst ? -1 : 1;
    return pb.deficit - pa.deficit;
  });
}

function calcDungeonScore(dungeon, BIS, ALTS, sr, targetIlvl, stats, worstStats, acq) {
  if (!sr) return 0;
  var score = 0;
  BIS.forEach(function(bi) {
    if (getSource(bi) !== dungeon) return;
    var p = calcPriority(bi, sr, targetIlvl, stats, worstStats);
    if (acq[bi.id] && p.tier !== 4) p = { tier: 4 };
    if (p.tier === 4) return;
    // tier 1 (능력치 불일치) = 40 + deficit, tier 2 (alt 장착) = 20 + deficit, tier 3 (등급↑) = 5 + deficit
    var base = p.tier === 1 ? 40 : p.tier === 2 ? 20 : 5;
    score += base + (p.deficit || 0) + (p.worst ? 10 : 0);
  });
  ALTS.forEach(function(a) {
    if (getSource(a) !== dungeon) return;
    score += 2;
  });
  return score;
}

function StatPills({ stats: itemStats }) {
  var { t } = useLocale();
  if (!itemStats || !itemStats.length) return null;
  var colors = { crit: { bg: "#2a1a1a", fg: "#e88", bd: "#4a2222" }, haste: { bg: "#1a2a1a", fg: "#8e8", bd: "#224a22" }, mastery: { bg: "#1a1a2a", fg: "#88e", bd: "#22224a" }, vers: { bg: "#2a2a1a", fg: "#ee8", bd: "#4a4a22" } };
  return (<span style={{ display: "inline-flex", gap: 2 }}>{itemStats.map(function(s) { var c = colors[s]; return (<span key={s} style={{ display: "inline-flex", padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: c.bg, color: c.fg, border: "1px solid " + c.bd }}>{t("stats." + s)}</span>); })}</span>);
}

function ItemCard({ item, isAlt, priority: p, sr, onToggle, idx, theme, allStats, worstStats, targetBonus, knownBisIds }) {
  var { t, itemName, locale } = useLocale();
  var itemSource = getSource(item);
  var isDungeon = !!DC[itemSource];
  var c = DC[itemSource] || { b: "#8866aa", t: "#c4aadd", g: "#1a1028" };
  var eq = !isAlt && sr && sr.eqSlot ? sr.eqSlot[item.id] : null;
  // For ALT cards, look up what's equipped in the alt's target slot
  var altEq = isAlt && sr && sr.gear ? (function() {
    var fs = item.forSlot;
    var slots = fs === "ring" ? ["finger1","finger2"] : fs === "trinket" ? ["trinket1","trinket2"] : fs === "weapon" ? ["main_hand","off_hand"] : fs === "off_hand" ? ["off_hand"] : [fs];
    // Check if this exact alt item is equipped in any matching slot
    for (var i = 0; i < slots.length; i++) { if (sr.gear[slots[i]] && sr.gear[slots[i]].id === item.id) return sr.gear[slots[i]]; }
    // For dual slots, skip items that are already BiS/MYTHIC and pick the replaceable one
    if (slots.length > 1 && knownBisIds) {
      var candidates = slots.map(function(s) { return sr.gear[s]; }).filter(Boolean);
      var replaceable = candidates.filter(function(g) { return !knownBisIds.has(g.id); });
      if (replaceable.length > 0) return replaceable.sort(function(a, b) { return (a.ilvl || 0) - (b.ilvl || 0); })[0];
    }
    return sr.gear[slots[0]] || sr.gear[slots[1]];
  })() : null;
  var altEquipped = isAlt && altEq && altEq.id === item.id;
  var hasDiff = eq && eq.id !== item.id;
  var isSimcAlt = !isAlt && sr && sr.altItems ? sr.altItems[item.id] : false;
  var tier = (p && p.tier) ? p.tier : 0;
  var isMythicBis = p && p.labelKey === "mythicBis";
  var visualTier = isMythicBis ? 3 : tier;
  var cardClass = "ic card-enter";
  if (visualTier === 1) cardClass += " t1"; else if (visualTier === 2) cardClass += " t2"; else if (visualTier === 3) cardClass += " t3"; else if (visualTier === 4) cardClass += " t4";
  if (isAlt && !altEquipped) cardClass += " altc";
  if (altEquipped) cardClass += " t4";
  var bgs = { 0: "linear-gradient(135deg, #101018, " + c.g + "88)", 1: "linear-gradient(135deg, #140e0e, #1a0f0f)", 2: "linear-gradient(135deg, #14120a, #1a150d)", 3: "linear-gradient(135deg, #0e140e, #0f1a0f)", 4: "linear-gradient(135deg, #0d120d, #0a100a)" };
  var acs = { 0: c.b, 1: "#ff6b6b", 2: "#c9a227", 3: "#4dca6b", 4: "#1a3a1a" };
  var icons = { 1: "\u25B2", 2: "\u25C6", 3: "\u2191", 4: "\u2713" };
  var pLabel = p ? (p.labelKey ? t("ui." + p.labelKey) : p.label) : "";
  var whLocale = locale === "ko" ? "/ko" : "";
  return (
    <div className={cardClass} style={{ animationDelay: (idx * .04) + "s", background: altEquipped ? bgs[4] : isAlt ? bgs[2] : (bgs[visualTier] || bgs[0]), borderRadius: 10, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: altEquipped ? 2 : (visualTier >= 1 && visualTier <= 2) ? 3 : 2, background: altEquipped ? "#1a3a1a" : isAlt ? "#c9a227" : (acs[visualTier] || c.b), opacity: altEquipped ? .3 : visualTier <= 2 ? .9 : (visualTier === 4 ? .3 : .6) }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: isAlt ? "#e8a84c" : theme.accent, background: isAlt ? "#2a1f10" : theme.accentBg, padding: "2px 7px", borderRadius: 3, border: "1px solid " + (isAlt ? "#5a4020" : theme.accentBorder) }}>{isAlt ? "ALT \u00B7 " + t("slots." + item.forSlot) : t("slots." + item.slot)}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: c.g, color: c.t, border: "1px solid " + c.b + "44" }}>{isDungeon ? t("dungeons." + itemSource) : (t("sources." + itemSource) || itemSource)}</span>
            <StatPills stats={item.stats} />
          </div>
          <a href={"https://www.wowhead.com" + whLocale + "/item=" + item.id + (tier === 3 && eq ? (eq.bonus ? "&bonus=" + eq.bonus : "") + (eq.ilvl ? "&ilvl=" + eq.ilvl : "") : (targetBonus ? "&bonus=" + targetBonus : ""))} target="_blank" rel="noopener noreferrer" data-wh-icon-size="small" style={{ display: "block", fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 2, color: (tier === 4 || altEquipped) ? "#556644" : (isAlt ? "#d4b87a" : "#e8dcc0"), textDecoration: (tier === 4 || altEquipped) ? "line-through" : "none", textDecorationColor: "#3a5a2a" }}>{itemName(item)}</a>
          <div style={{ fontSize: 11.5, color: tier === 4 ? "#445533" : "#776655", marginBottom: 6 }}>{locale === "ko" ? item.en : item.ko}</div>
          {!isAlt && p && tier > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700, background: visualTier === 1 ? "linear-gradient(135deg,#2a1515,#1a0f0f)" : visualTier === 2 ? "linear-gradient(135deg,#2a1f10,#1a1508)" : visualTier === 3 ? "linear-gradient(135deg,#102a15,#0f1a0f)" : "#0d1a0d", border: "1px solid " + (visualTier === 1 ? "#6a2020" : visualTier === 2 ? "#6a5020" : visualTier === 3 ? "#206a30" : "#1a3a1a"), color: p.color }}>
                <span style={{ fontSize: 10 }}>{icons[tier]}</span><span>{pLabel}</span>
                {p.deficit > 0 && <span style={{ opacity: .7, fontSize: 10 }}>{"\uFF08\u2212" + p.deficit + "\uFF09"}</span>}
              </div>
              {tier === 3 && p.labelKey !== "bag" && p.labelKey !== "bagDone" && <span style={{ fontSize: 9, color: p.capped ? "#cc8844" : "#665544" }}>{t(p.capped ? "ui.tierReacquireNeeded" : "ui.tierUpgradeNeeded")}</span>}
              {hasDiff && eq && (
                <a href={"https://www.wowhead.com" + whLocale + "/item=" + eq.id + (eq.bonus ? "&bonus=" + eq.bonus : "") + (eq.ilvl ? "&ilvl=" + eq.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 3, background: isSimcAlt ? "#1a1508" : "#1a1520", border: "1px solid " + (isSimcAlt ? "#3a2a10" : "#3a2030"), textDecoration: "none", fontSize: 10, fontWeight: 600, color: isSimcAlt ? "#c9a040" : "#aa7799", whiteSpace: "nowrap" }}>
                  <span>{eq.name}</span>
                  {allStats[eq.id] && allStats[eq.id].length > 0 && allStats[eq.id].map(function(s) {
                    var isW = worstStats && worstStats.indexOf(s) >= 0;
                    return (<span key={s} style={{ fontSize: 9, color: isW ? "#ff4444" : "#776655" }}>{isW ? "\u26A0" : "\u00B7"}{t("stats." + s)}</span>);
                  })}
                </a>
              )}
            </div>
          )}
          {isAlt && altEquipped && altEq && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700, background: "#0d1a0d", border: "1px solid #1a3a1a", color: "#4dca6b" }}>
              <span>{"\u2713"}</span><span>{t("ui.done")}{altEq.ilvl ? " (" + altEq.ilvl + ")" : ""}</span>
            </div>
          )}
          {isAlt && !altEquipped && altEq && (function() {
            var eqHasWorst = worstStats && allStats[altEq.id] && worstStats.some(function(ws) { return allStats[altEq.id].indexOf(ws) >= 0; });
            return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center", marginTop: 4 }}>
              <a href={"https://www.wowhead.com" + whLocale + "/item=" + altEq.id + (altEq.bonus ? "&bonus=" + altEq.bonus : "") + (altEq.ilvl ? "&ilvl=" + altEq.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 3, background: eqHasWorst ? "#1a1015" : "#1a1508", border: "1px solid " + (eqHasWorst ? "#3a2030" : "#3a2a10"), textDecoration: "none", fontSize: 10, fontWeight: 600, color: eqHasWorst ? "#aa7799" : "#c9a040", whiteSpace: "nowrap" }}>
                <span>{altEq.name}{altEq.ilvl ? " (" + altEq.ilvl + ")" : ""}</span>
                {allStats[altEq.id] && allStats[altEq.id].length > 0 && allStats[altEq.id].map(function(s) {
                  var isW = worstStats && worstStats.indexOf(s) >= 0;
                  return (<span key={s} style={{ fontSize: 9, color: isW ? "#ff4444" : "#776655" }}>{isW ? "\u26A0" : "\u00B7"}{t("stats." + s)}</span>);
                })}
              </a>
            </div>);
          })()}
        </div>
        {!isAlt && (
          <div className="ck" onClick={function() { onToggle(item.id); }} style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: tier === 4 ? "#1a3a1a" : "#1a1a28", border: "2px solid " + (tier === 4 ? "#4dca6b" : "#2a2a3a"), flexShrink: 0, marginTop: 2 }}>
            {tier === 4 ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4dca6b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> : <div style={{ width: 14, height: 14, borderRadius: 3, border: "2px solid #333344" }} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BisTracker({ spec, charName, initialSimcText, onSpecSwitch, onClear, onCharDetected }) {
  var { t } = useLocale();
  var { BIS, MYTHIC, ALTS, KNOWN_STATS, DUNGEONS, STORAGE_KEY: BASE_STORAGE_KEY, THEME: theme, WORST_STATS, STAT_CACHE_KEY, GUIDE_URL } = spec;
  var STORAGE_KEY = charName ? BASE_STORAGE_KEY + ":" + charName : BASE_STORAGE_KEY;
  // Merge MYTHIC items into ALTS as farmable alternatives
  var mergedAlts = useMemo(function() {
    if (!MYTHIC || !MYTHIC.length) return ALTS;
    var bisIds = new Set(BIS.map(function(b) { return b.id; }));
    var farmableAlts = MYTHIC.filter(function(m) { return !bisIds.has(m.id); }).map(function(m) {
      var forSlot = m.slot;
      if (forSlot.indexOf("finger") === 0) forSlot = "ring";
      else if (forSlot.indexOf("trinket") === 0) forSlot = "trinket";
      else if (forSlot === "main_hand") forSlot = "weapon";
      return { forSlot: forSlot, id: m.id, en: m.en, ko: m.ko, source: m.source, stats: m.stats, farmable: true };
    });
    return farmableAlts.concat(ALTS);
  }, [BIS, MYTHIC, ALTS]);
  // All known good item IDs (BiS + MYTHIC) for alt recognition
  var knownBisIds = useMemo(function() {
    var ids = new Set(BIS.map(function(b) { return b.id; }));
    if (MYTHIC) MYTHIC.forEach(function(m) { ids.add(m.id); });
    return ids;
  }, [BIS, MYTHIC]);
  var activeItems = BIS;
  var dungeonCounts = useMemo(function() { return getDungeonCounts(activeItems, mergedAlts, DUNGEONS); }, [activeItems, mergedAlts, DUNGEONS]);
  var [acq, setAcq] = useState({});
  var [filter, setFilter] = useState("all");
  var [simcOpen, setSimcOpen] = useState(false);
  var [simcText, setSimcText] = useState("");
  var [sr, setSr] = useState(null);
  var [feedback, setFeedback] = useState(null);
  var [targetTier, setTargetTier] = useState("champion");
  var [loaded, setLoaded] = useState(false);
  var [runtimeStats, setRuntimeStats] = useState({});
  var [importing, setImporting] = useState(false);
  var targetInfo = TIERS.find(function(t) { return t.key === targetTier; }) || TIERS[1];
  var allStats = useMemo(function() { return Object.assign({}, KNOWN_STATS, runtimeStats); }, [KNOWN_STATS, runtimeStats]);

  useEffect(function() {
    var d = load(STORAGE_KEY);
    if (d) {
      setAcq(d.acq || {});
      if (d.sr) { setSr(d.sr); setSimcOpen(false); if (onCharDetected && d.sr.ci) onCharDetected(d.sr.ci.name); } else { setSimcOpen(true); }
      var cached = load(STAT_CACHE_KEY);
      if (cached) setRuntimeStats(cached);
      if (d.targetTier) setTargetTier(d.targetTier);
      if (d.filter) setFilter(d.filter);
    } else {
      setSimcOpen(true);
      var cached2 = load(STAT_CACHE_KEY);
      if (cached2) setRuntimeStats(cached2);
    }
    setLoaded(true);
  }, [STORAGE_KEY, STAT_CACHE_KEY]);
  useEffect(function() {
    var t = setTimeout(function() { if (window.$WowheadPower && window.$WowheadPower.refreshLinks) { try { window.$WowheadPower.refreshLinks(); } catch(e) {} } }, 500);
    return function() { clearTimeout(t); };
  }, [filter, sr, targetTier, STORAGE_KEY]);
  var stateRef = useRef({});
  stateRef.current = { acq: acq, sr: sr, targetTier: targetTier, filter: filter };
  var sv = useCallback(function(overrides) { var d = Object.assign({}, stateRef.current, overrides); persist(STORAGE_KEY, { acq: d.acq, sr: d.sr, targetTier: d.targetTier, filter: d.filter }); }, [STORAGE_KEY]);
  function changeFilter(f) { setFilter(f); sv({ filter: f }); }
  var toggle = useCallback(function(id) { setAcq(function(prev) { var next = Object.assign({}, prev); next[id] = !next[id]; sv({ acq: next }); return next; }); }, [sv]);
  var changeTarget = useCallback(function(key) { setTargetTier(key); sv({ targetTier: key }); }, [sv]);
  var doImport = useCallback(function(overrideText) {
    var text = overrideText || simcText;
    if (!text.trim() || importing) return;
    var parsed = parseSimC(text);
    if (!parsed.cnt) { setFeedback({ ok: false, msg: t("ui.noGearData") }); return; }
    var allIds = Object.values(parsed.gear).map(function(g) { return g.id; });
    parsed.bag.forEach(function(b) { allIds.push(b.id); });
    var currentStats = Object.assign({}, KNOWN_STATS, runtimeStats);
    var unknownIds = allIds.filter(function(id, i) { return allIds.indexOf(id) === i && currentStats[id] === undefined; });
    function finishImport(mergedStats) {
      var result = matchBiS(BIS, parsed.gear, parsed.bag, mergedStats, knownBisIds);
      var newSr = { ci: parsed.ci, gear: parsed.gear, eqSlot: result.eqSlot, bisInBag: result.bisInBag, altItems: result.altItems, matched: result.matched };
      var importName = parsed.ci.name || charName;
      var saveKey = importName !== charName ? BASE_STORAGE_KEY + ":" + importName : STORAGE_KEY;
      if (importName === charName) setSr(newSr);
      // Auto-select target tier based on average equipped ilvl
      var autoTier = autoSelectTier(parsed.ci.avgIlvl);
      if (importName === charName) { setTargetTier(autoTier); }
      persist(saveKey, { acq: importName !== charName ? {} : acq, sr: newSr, targetTier: autoTier, filter: "all" });
      var bisSlots = {};
      BIS.forEach(function(b) { bisSlots[b.slot] = true; });
      var empty = Object.keys(bisSlots).filter(function(s) { return !parsed.gear[s]; });
      var msg = t("ui.gearUpdated");
      if (empty.length > 0) msg += "\n" + t("ui.emptySlots", { slots: empty.map(function(s) { return t("slots." + s); }).join(", ") });
      setFeedback({ ok: empty.length === 0, msg: msg }); setSimcText(""); setImporting(false); setSimcOpen(false);
      if (onCharDetected) onCharDetected(importName);
    }
    if (unknownIds.length > 0) {
      setImporting(true);
      setFeedback({ ok: true, msg: t("ui.fetchingStats", { count: unknownIds.length }) });
      fetchItemStats(unknownIds).then(function(fetched) {
        var newRuntime = Object.assign({}, runtimeStats);
        Object.keys(fetched).forEach(function(id) { newRuntime[id] = fetched[id] !== null ? fetched[id] : []; });
        setRuntimeStats(newRuntime);
        persist(STAT_CACHE_KEY, newRuntime);
        finishImport(Object.assign({}, KNOWN_STATS, newRuntime));
      });
    } else { finishImport(currentStats); }
  }, [simcText, acq, targetTier, sv, BIS, KNOWN_STATS, runtimeStats, importing, STAT_CACHE_KEY, BASE_STORAGE_KEY, STORAGE_KEY, charName]);
  var clearSimc = useCallback(function() { setSr(null); setFeedback(null); setSimcOpen(true); persist(STORAGE_KEY, null); if (onClear) onClear(); }, [STORAGE_KEY, onClear]);
  var handlePaste = useCallback(function(e) {
    var text = e.clipboardData.getData('text');
    if (!text || !text.trim()) return;
    var parsed = parseSimC(text);
    e.preventDefault();
    if (parsed.cnt === 0) {
      setSimcText(text);
      setFeedback({ ok: false, msg: t("ui.noGearData") });
      return;
    }
    if (parsed.ci.className && parsed.ci.spec) {
      var detected = findSpecBySimC(parsed.ci.className, parsed.ci.spec);
      if (!detected) {
        var clsName = t("classes." + parsed.ci.className) || parsed.ci.className;
        var specName = t("specs." + parsed.ci.spec) || parsed.ci.spec;
        setSimcText(text);
        setFeedback({ ok: false, msg: t("ui.unsupportedSpec", { cls: clsName, spec: specName }) });
        return;
      }
      if (detected.SPEC_KEY !== spec.SPEC_KEY && onSpecSwitch) {
        onSpecSwitch(detected.SPEC_KEY, text);
        return;
      }
    }
    setSimcText(text);
    doImport(text);
  }, [doImport, spec.SPEC_KEY, onSpecSwitch]);
  useEffect(function() {
    setSimcText(""); setFeedback(null); setImporting(false);
    var d = load(STORAGE_KEY);
    var cached = load(STAT_CACHE_KEY); setRuntimeStats(cached || {});
    if (d) {
      setAcq(d.acq || {}); setSr(d.sr || null); setSimcOpen(!d.sr);
      if (d.targetTier) setTargetTier(d.targetTier);
      setFilter(d.filter || "all");
    } else { setAcq({}); setSr(null); setTargetTier("champion"); setSimcOpen(true); setFilter("all"); }
  }, [STORAGE_KEY, STAT_CACHE_KEY]);
  var initialImportDone = useRef(false);
  useEffect(function() {
    if (initialSimcText && initialSimcText.trim() && !initialImportDone.current) {
      initialImportDone.current = true;
      doImport(initialSimcText);
    }
  }, [initialSimcText, doImport]);
  var doneCount = useMemo(function() { return activeItems.filter(function(b) { if (acq[b.id]) return true; return sr ? calcPriority(b, sr, targetInfo.max, allStats, WORST_STATS).tier === 4 : false; }).length; }, [acq, sr, targetInfo.max, allStats, activeItems, WORST_STATS]);
  var mythicBisCount = useMemo(function() { return sr ? activeItems.filter(function(b) { if (acq[b.id]) return false; var p = calcPriority(b, sr, targetInfo.max, allStats, WORST_STATS); return p.tier === 2 && p.labelKey === "mythicBis"; }).length : 0; }, [acq, sr, targetInfo.max, allStats, activeItems, WORST_STATS]);
  var altCount = useMemo(function() { return sr ? activeItems.filter(function(b) { if (acq[b.id]) return false; var p = calcPriority(b, sr, targetInfo.max, allStats, WORST_STATS); return p.tier === 2 && p.labelKey !== "mythicBis"; }).length : 0; }, [acq, sr, targetInfo.max, allStats, activeItems, WORST_STATS]);
  var displayBis = useMemo(function() { var items = filter === "all" ? activeItems : activeItems.filter(function(i) { return getSource(i) === filter; }); return sr ? sortByPriority(items, sr, targetInfo.max, allStats, WORST_STATS) : items; }, [filter, sr, targetInfo.max, allStats, activeItems, WORST_STATS]);
  var displayAlts = useMemo(function() { return filter === "all" ? [] : mergedAlts.filter(function(a) { return getSource(a) === filter; }); }, [filter, mergedAlts]);
  var nonDungeonSources = useMemo(function() {
    var sources = {};
    activeItems.forEach(function(item) { var s = getSource(item); if (!DC[s]) sources[s] = (sources[s] || 0) + 1; });
    var all = Object.keys(sources).map(function(s) { return { source: s, count: sources[s] }; });
    var prep = all.filter(function(s) { return /^Tier/i.test(s.source) || s.source === "Crafted"; });
    prep.sort(function(a, b) { return (/^Tier/i.test(a.source) ? 0 : 1) - (/^Tier/i.test(b.source) ? 0 : 1); });
    var raid = all.filter(function(s) { return !/^Tier/i.test(s.source) && s.source !== "Crafted"; });
    return { prep: prep, raid: raid };
  }, [activeItems]);

  if (!loaded) return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a12", color: theme.accent }}><span style={{ fontFamily: "'Cinzel', serif", fontSize: 18 }}>{t("ui.loading")}</span></div>);

  return (
    <div style={{ paddingTop: 16, paddingBottom: 24 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
        <div data-tutorial="simc-import" className="tog" onClick={function() { setSimcOpen(!simcOpen); }} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, background: sr ? "#0c0c16" : theme.accentBg, border: "1px solid " + (sr ? "#1e1e30" : theme.accentBorder) }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: sr ? theme.accent + "cc" : theme.accent }}>{sr ? t("ui.simcRefresh") : t("ui.simcImport")}</span>
          {!sr && <span style={{ fontSize: 11, color: theme.accent + "88" }}>{t("ui.simcPasteHint")}</span>}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#445566" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto", transition: "transform .2s", transform: simcOpen ? "rotate(180deg)" : "rotate(0)" }}><polyline points="6 9 12 15 18 9" /></svg>
        </div>
        {GUIDE_URL && <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 12px", borderRadius: 8, background: "#0c0c16", border: "1px solid #1e1e30", textDecoration: "none", fontSize: 11, fontWeight: 600, color: "#778888", whiteSpace: "nowrap" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#778888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>{t("ui.guideLink")}</a>}
        </div>
        {simcOpen && (
          <div style={{ marginTop: 8, padding: 16, background: "#0c0c16", border: "1px solid #1e1e30", borderRadius: 8, overflow: "hidden" }}>
            <textarea className="sta" value={simcText} onChange={function(e) { setSimcText(e.target.value); }} onPaste={handlePaste} placeholder={t("ui.simcPlaceholder")} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {feedback && <span style={{ fontSize: 12, fontWeight: 600, color: feedback.ok ? "#8dffaa" : "#ff8d8d", whiteSpace: "pre-line" }}>{feedback.msg}</span>}
              {sr && <button className="sb" onClick={clearSimc} style={{ marginLeft: "auto", padding: "3px 10px", background: "#1a1520", border: "1px solid #2a2030", color: "#886678", fontSize: 11 }}>{t("ui.reset")}</button>}
            </div>
          </div>
        )}
      </div>
      <div data-tutorial="tier-buttons" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {TIERS.map(function(ti) { var sel = targetTier === ti.key; return (<button key={ti.key} className="tier-btn" onClick={function() { changeTarget(ti.key); }} style={{ borderColor: sel ? ti.color : ti.color + "44", color: ti.color, opacity: sel ? 1 : 0.5, background: sel ? ti.color + "22" : "transparent" }}>{t("tiers." + ti.key) + " (" + ti.max + ")"}</button>); })}
      </div>
      <div data-tutorial="progress-bar" style={{ marginTop: 8, position: "relative" }}>
        <div style={{ height: 20, background: "#1a1a28", borderRadius: 6, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", height: "100%", width: ((doneCount + mythicBisCount + altCount) / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: theme.accent, opacity: 0.1 }} />
          <div style={{ position: "absolute", height: "100%", width: ((doneCount + mythicBisCount) / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: "#4dca6b", opacity: 0.2 }} />
          <div className="pfill" style={{ position: "absolute", height: "100%", width: (doneCount / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: theme.shimmer, backgroundSize: "200% 100%", opacity: 0.35 }} />
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: doneCount === activeItems.length ? "#8dffaa" : theme.accent, letterSpacing: 1, textShadow: "0 1px 3px #0008" }}>{doneCount + " / " + activeItems.length}</span>
          </div>
        </div>
        {sr && sr.ci && sr.ci.avgIlvl > 0 && <span style={{ position: "absolute", right: 6, top: 0, height: "100%", display: "inline-flex", alignItems: "center", fontSize: 10, color: "#556666", pointerEvents: "none", textShadow: "0 1px 3px #000" }}>
          {"ilvl " + sr.ci.avgIlvl}
        </span>}
      </div>
      <div data-tutorial="dungeon-filters" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        <button className={"fbtn" + (filter === "all" ? " active" : "")} onClick={function() { changeFilter("all"); }} style={{ padding: "4px 12px", borderRadius: 6, background: filter === "all" ? theme.accentBg : "#0f0f18", color: filter === "all" ? theme.accent : "#556666", fontSize: 12, fontWeight: 600 }}>{t("ui.all")}</button>
        {nonDungeonSources.prep.map(function(ns) {
          var act = filter === ns.source;
          var nsBis = activeItems.filter(function(i) { return getSource(i) === ns.source; });
          var nsBisRem = nsBis.length - nsBis.filter(function(i) { if (acq[i.id]) return true; return sr ? calcPriority(i, sr, targetInfo.max, allStats, WORST_STATS).tier === 4 : false; }).length;
          var nsAltItems = mergedAlts.filter(function(a) { return getSource(a) === ns.source; });
          var nsAltDone = sr && sr.gear ? nsAltItems.filter(function(a) { var fs = a.forSlot; var slots = fs === "ring" ? ["finger1","finger2"] : fs === "trinket" ? ["trinket1","trinket2"] : fs === "weapon" ? ["main_hand","off_hand"] : fs === "off_hand" ? ["off_hand"] : [fs]; return slots.some(function(s) { return sr.gear[s] && sr.gear[s].id === a.id; }); }).length : 0;
          var nsAltRem = nsAltItems.length - nsAltDone;
          var nsRem = nsBisRem + nsAltRem;
          return (
            <button key={ns.source} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : ns.source); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? "#1a1028" : (nsRem === 0 ? "#0d1a0d" : "#1a102844"), border: "1px solid " + (act ? "#8866aa" : (nsRem === 0 ? "#1a3a1a" : "#8866aa33")), fontSize: 12, fontWeight: 600, color: act ? "#c4aadd" : (nsRem === 0 ? "#4dca6b" : "#8866aa") }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: nsRem === 0 ? "#4dca6b" : "#aa88cc", display: "inline-block" }} />
              <span>{t("sources." + ns.source) || ns.source}</span>
              {nsRem === 0 ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : <span style={{ fontSize: 11 }}><span style={{ color: nsBisRem > 0 ? "#c4aadd" : "#8866aa44", fontWeight: 700 }}>{nsBisRem}</span>{nsAltRem > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}{nsAltRem > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{nsAltRem}</span>}</span>}
            </button>
          );
        })}
        {(nonDungeonSources.prep.length > 0) && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {DUNGEONS.map(function(d) {
          var cnt = dungeonCounts[d]; if (!cnt || (cnt.bis === 0 && cnt.alt === 0)) return null;
          return { source: d, score: sr ? calcDungeonScore(d, activeItems, mergedAlts, sr, targetInfo.max, allStats, WORST_STATS, acq) : 0 };
        }).filter(Boolean).sort(function(a, b) { return b.score - a.score; }).map(function(item) {
          var d = item.source, c2 = DC[d], act = filter === d;
          var bisItems = activeItems.filter(function(i) { return getSource(i) === d; });
          var bisRem = bisItems.length - bisItems.filter(function(i) { if (acq[i.id]) return true; return sr ? calcPriority(i, sr, targetInfo.max, allStats, WORST_STATS).tier === 4 : false; }).length;
          var altItems = mergedAlts.filter(function(a) { return getSource(a) === d; });
          var altDone = sr && sr.gear ? altItems.filter(function(a) {
            var fs = a.forSlot;
            var slots = fs === "ring" ? ["finger1","finger2"] : fs === "trinket" ? ["trinket1","trinket2"] : fs === "weapon" ? ["main_hand","off_hand"] : fs === "off_hand" ? ["off_hand"] : [fs];
            return slots.some(function(s) { return sr.gear[s] && sr.gear[s].id === a.id; });
          }).length : 0;
          var altRem = altItems.length - altDone;
          var rem = bisRem + altRem;
          return (
          <button key={d} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : d); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? c2.g : (rem === 0 ? "#0d1a0d" : c2.g + "44"), border: "1px solid " + (act ? c2.b : (rem === 0 ? "#1a3a1a" : c2.b) + "33"), fontSize: 12, fontWeight: 600, color: act ? c2.t : (rem === 0 ? "#4dca6b" : c2.t) }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: rem === 0 ? "#4dca6b" : c2.b, display: "inline-block", animation: rem === 0 ? "none" : "pulse 2s infinite" }} />
            <span>{t("dungeons." + d)}</span>
            {rem === 0 ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : <span style={{ fontSize: 11 }}><span style={{ color: bisRem > 0 ? c2.t : c2.b + "88", fontWeight: 700 }}>{bisRem}</span>{altRem > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}{altRem > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{altRem}</span>}</span>}
          </button>); })}
        {nonDungeonSources.raid.length > 0 && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {nonDungeonSources.raid.map(function(ns) {
          var act = filter === ns.source;
          var nsBis = activeItems.filter(function(i) { return getSource(i) === ns.source; });
          var nsBisRem = nsBis.length - nsBis.filter(function(i) { if (acq[i.id]) return true; return sr ? calcPriority(i, sr, targetInfo.max, allStats, WORST_STATS).tier === 4 : false; }).length;
          var nsRem = nsBisRem;
          return (
            <button key={ns.source} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : ns.source); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? "#1a1028" : (nsRem === 0 ? "#0d1a0d" : "#1a102844"), border: "1px solid " + (act ? "#8866aa" : (nsRem === 0 ? "#1a3a1a" : "#8866aa33")), fontSize: 12, fontWeight: 600, color: act ? "#c4aadd" : (nsRem === 0 ? "#4dca6b" : "#8866aa") }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: nsRem === 0 ? "#4dca6b" : "#8866aa", display: "inline-block" }} />
              <span>{t("sources." + ns.source) || ns.source}</span>
              {nsRem === 0 ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : <span style={{ color: "#c4aadd", fontSize: 11, fontWeight: 700 }}>{nsRem}</span>}
            </button>
          );
        })}
      </div>
      {sr && (
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10, color: "#556666", flexWrap: "wrap" }}>
          <span><span style={{ color: "#ff6b6b" }}>{"\u25B2"}</span>{" " + t("ui.tierStatMismatch")}</span>
          <span><span style={{ color: "#e8a84c" }}>{"\u25C6"}</span>{" " + t("ui.tierAltEquipped")}</span>
          <span><span style={{ color: "#6dca8b" }}>{"\u2191"}</span>{" " + t("ui.tierBisUpgrade")}</span>
          <span><span style={{ color: "#4dca6b" }}>{"\u2713"}</span>{" " + t("ui.tierDone")}</span>
          <span style={{ color: "#445555" }}>{t("ui.deficitInfo", { max: targetInfo.max })}</span>
        </div>
      )}
      {filter !== "all" && (
        <div style={{ padding: "8px 0" }}>
          {DC[filter] ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: DC[filter].g + "cc", border: "1px solid " + DC[filter].b + "44" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: DC[filter].t, fontFamily: "'Cinzel',serif" }}>{t("dungeonsFull." + filter)}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#778888" }}>{"BiS " + displayBis.length}{displayAlts.length > 0 ? " + Alt " + displayAlts.length : ""}{sr && " \u00B7 " + t("ui.priority")}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "#1a1028cc", border: "1px solid #8866aa44" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#c4aadd", fontFamily: "'Cinzel',serif" }}>{filter}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#778888" }}>{"BiS " + displayBis.length}{sr && " \u00B7 " + t("ui.priority")}</span>
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        {filter !== "all" && displayBis.length > 0 && <div style={{ fontSize: 11, fontWeight: 700, color: theme.accent, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t("ui.bisItems")}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {displayBis.map(function(item, idx) {
            var p = sr ? calcPriority(item, sr, targetInfo.max, allStats, WORST_STATS) : null;
            if (acq[item.id] && p && p.tier !== 4) p = { tier: 4, deficit: 0, ilvl: p.ilvl, labelKey: "done", color: "#4dca6b", worst: false };
            return <ItemCard key={item.slot + "-" + item.id} item={item} isAlt={false} priority={p} sr={sr} onToggle={toggle} idx={idx} theme={theme} allStats={allStats} worstStats={WORST_STATS} targetBonus={targetInfo.bonus} />;
          })}
        </div>
        {displayAlts.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e8a84c", marginTop: 20, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{t("ui.altSameStats")}</span><span style={{ height: 1, flex: 1, background: "#3a3020" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {displayAlts.map(function(item, idx) {
                return <ItemCard key={item.forSlot + "-" + item.id} item={item} isAlt={true} priority={null} sr={sr} onToggle={function() {}} idx={idx} theme={theme} allStats={allStats} worstStats={WORST_STATS} targetBonus={targetInfo.bonus} knownBisIds={knownBisIds} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
