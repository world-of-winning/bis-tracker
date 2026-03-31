import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { load, save as persist } from '../storage.js';
import { DUNGEON_COLORS as DC, TIERS, GEAR_SLOTS, fetchItemStats, resolveSlots, parseSimC, CLASS_ARMOR, ARMOR_SLOTS } from '../data/shared.js';
import { sanitizeHTML } from '../sanitize.js';
import { findSpecBySimC } from '../data/specs.js';
import { useLocale } from '../i18n/index.jsx';

// WoW spec IDs for Wowhead tooltip spec-specific rendering (e.g. "Strength or Intellect")
var WH_SPEC_IDS = {
  "blood-dk": 250, "frost-dk": 251, "unholy-dk": 252,
  "havoc-dh": 577, "devourer-dh": 577, "veng-dh": 581,
  "balance-druid": 102, "feral-druid": 103, "guardian-druid": 104, "resto-druid": 105,
  "dev-evoker": 1467, "pres-evoker": 1468, "aug-evoker": 1473,
  "bm-hunter": 253, "mm-hunter": 254, "surv-hunter": 255,
  "arcane-mage": 62, "fire-mage": 63, "frost-mage": 64,
  "brew-monk": 268, "ww-monk": 269, "mw-monk": 270,
  "holy-paladin": 65, "prot-paladin": 66, "ret-paladin": 70,
  "disc-priest": 256, "holy-priest": 257, "shadow-priest": 258,
  "assa-rogue": 259, "outlaw-rogue": 260, "sub-rogue": 261,
  "ele-shaman": 262, "enh-shaman": 263, "resto-shaman": 264,
  "aff-lock": 265, "demo-lock": 266, "destro-lock": 267,
  "arms-warrior": 71, "fury-warrior": 72, "prot-warrior": 73,
};

function sameStats(a, b) {
  if (!a || !b || !a.length || !b.length) return false;
  if (a.length !== b.length) return false;
  var x = a.slice().sort(), y = b.slice().sort();
  return x.every(function(v, i) { return v === y[i]; });
}
function getSource(item) { return item.source; }
// Count items that need farming (tier 1 / red) per source, using the same logic as card display
function calcSourceFarmCount(source, BIS, ALTS, sr, targetIlvl, stats, priorityStats, acq) {
  var bisItems = BIS.filter(function(i) { return getSource(i) === source; });
  var bisNeed = sr ? bisItems.filter(function(i) {
    if (acq[i.id]) return false;
    return calcPriority(i, sr, targetIlvl, stats, priorityStats).tier === 1;
  }).length : bisItems.length;
  var altItems = ALTS.filter(function(a) { return getSource(a) === source; });
  var altNeed = sr ? altItems.filter(function(a) {
    return calcAltPriority(a, sr, stats, priorityStats, targetIlvl, acq).tier === 1;
  }).length : altItems.length;
  return { bis: bisNeed, alt: altNeed };
}
function matchBiS(BIS, gear, bag, stats, knownBisIds, priorityStats) {
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
  // Top 2 priority stats set for priority-match detection
  var top2 = (priorityStats && priorityStats.length >= 2) ? priorityStats.slice(0, 2) : null;
  BIS.forEach(function(bi) {
    if (matched[bi.id]) return;
    var eq = eqSlot[bi.id]; if (!eq || eq.id === bi.id) return;
    // stat-less items (trinkets etc): knownBisIds만 비교, stats 체크 불가
    if (!bi.stats.length) {
      if (knownBisIds && knownBisIds.has(eq.id)) altItems[bi.id] = "mythic";
      return;
    }
    var es = stats[eq.id];
    if (es && sameStats(bi.stats, es)) { altItems[bi.id] = "stats"; return; }
    // Priority match: equipped item has exactly top 2 priority stats
    if (top2 && es && es.length) {
      if (top2.every(function(s) { return es.indexOf(s) >= 0; }) && es.filter(function(s) { return top2.indexOf(s) >= 0; }).length === es.length) {
        altItems[bi.id] = "stats"; return;
      }
    }
    // fallback: M+ BiS (stats 불일치인 경우만)
    if (knownBisIds && knownBisIds.has(eq.id)) altItems[bi.id] = "mythic";
  });
  return { matched: matched, eqSlot: eqSlot, bisInBag: bisInBag, altItems: altItems };
}
function calcAltPriority(alt, sr, allStats, priorityStats, targetIlvl, acq) {
  if (acq && acq[alt.id]) return { tier: 4, deficit: 0, ilvl: 0, labelKey: "done", color: "#4dca6b" };
  if (!sr || !sr.gear) return { tier: 1, deficit: targetIlvl || 0, ilvl: 0, label: "\u2014", color: "#ff6b6b" };
  var top2 = (priorityStats && priorityStats.length >= 2) ? priorityStats.slice(0, 2) : null;
  var slots = resolveSlots(alt.forSlot);
  var bestEq = null, bestIlvl = -1;
  slots.forEach(function(slot) {
    var g = sr.gear[slot]; if (!g) return;
    var ilvl = g.ilvl || 0;
    // BiS item in this slot covers the alt requirement unconditionally
    if (sr.matched && sr.matched[g.id]) {
      if (ilvl > bestIlvl) { bestIlvl = ilvl; bestEq = g; }
      return;
    }
    var es = allStats[g.id];
    var statsMatch = alt.stats && alt.stats.length && es && es.length && (
      sameStats(alt.stats, es) ||
      (top2 && top2.every(function(s) { return es.indexOf(s) >= 0; }) && es.filter(function(s) { return top2.indexOf(s) >= 0; }).length === es.length)
    );
    if (!statsMatch) return;
    if (ilvl > bestIlvl) { bestIlvl = ilvl; bestEq = g; }
  });
  if (!bestEq) return { tier: 1, deficit: targetIlvl || 0, ilvl: 0, label: "\u2014", color: "#ff6b6b" };
  var eqIlvl = bestEq.ilvl || 0;
  var deficit = Math.max(0, targetIlvl - eqIlvl);
  if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b" };
  var targetTierIdx = -1; for (var k = 0; k < TIERS.length; k++) { if (targetIlvl <= TIERS[k].max) { targetTierIdx = k; break; } }
  var eqTierIdx = itemTierIdx(bestEq.bonus, eqIlvl);
  if (eqTierIdx >= targetTierIdx) return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", upgradeStatus: "enhance" };
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", upgradeStatus: "tierUp" };
}
// priorityStats = ordered list from best to worst (e.g. ["crit","haste","mastery","vers"])
// statScore: higher = better stats. Sort tiebreaker: lower score = worse stats = more urgent
function statScore(eqId, stats, priorityStats) {
  if (!priorityStats || !priorityStats.length) return 0;
  var es = stats[eqId];
  if (!es || !es.length) return 0;
  var n = priorityStats.length;
  var score = 0;
  es.forEach(function(s) { var idx = priorityStats.indexOf(s); if (idx >= 0) score += (n - idx); });
  return score;
}
// Determine item grade tier index from bonus_id string, fallback to ilvl
function itemTierIdx(bonus, ilvl) {
  if (bonus) {
    var parts = bonus.split(":");
    for (var p = 0; p < parts.length; p++) {
      var b = parseInt(parts[p], 10);
      for (var i = 0; i < TIERS.length; i++) { if (b >= TIERS[i].bonusMin && b <= TIERS[i].bonusMax) return i; }
    }
  }
  if (ilvl) { for (var i = 0; i < TIERS.length; i++) { if (ilvl <= TIERS[i].max) return i; } }
  return -1;
}
// upgradeStatus: null (no label), "enhance" (강화 필요, same grade), "tierUp" (등급↑ 필요, lower grade)
function calcPriority(bisItem, sr, targetIlvl, stats, priorityStats) {
  if (!sr) return { tier: 0, deficit: 0, ilvl: 0, label: "\u2014", color: "#665544", score: 0 };
  var eq = sr.eqSlot ? sr.eqSlot[bisItem.id] : null;
  var isBis = sr.matched ? sr.matched[bisItem.id] : false;
  var isAlt = sr.altItems ? sr.altItems[bisItem.id] : false;
  var inBag = sr.bisInBag ? sr.bisInBag[bisItem.id] : null;
  var eqIlvl = (eq && eq.ilvl) ? eq.ilvl : 0;
  var deficit = Math.max(0, targetIlvl - eqIlvl);
  var score = eq ? statScore(eq.id, stats, priorityStats) : 0;
  var targetTierIdx = -1; for (var k = 0; k < TIERS.length; k++) { if (targetIlvl <= TIERS[k].max) { targetTierIdx = k; break; } }
  var eqTierIdx = eq ? itemTierIdx(eq.bonus, eqIlvl) : -1;
  if (isBis) {
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
    if (eqTierIdx >= targetTierIdx) return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", score: 0, upgradeStatus: "enhance" };
    return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
  }
  if (isAlt) {
    if (isAlt === "mythic") {
      if (deficit <= 0) return { tier: 2, deficit: 0, ilvl: eqIlvl, labelKey: "mythicBisDone", color: "#4dca6b", score: 0 };
      if (eqTierIdx < targetTierIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
      return { tier: 2, deficit: deficit, ilvl: eqIlvl, labelKey: "mythicBis", color: "#e8a84c", score: score };
    }
    if (deficit <= 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
    if (eqTierIdx < targetTierIdx) return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#ff6b6b", score: score, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: deficit, ilvl: eqIlvl, label: eqIlvl + "", color: "#4dca6b", score: score, upgradeStatus: "enhance" };
  }
  if (inBag) {
    var bI = inBag.ilvl || 0, bD = Math.max(0, targetIlvl - bI);
    if (bD <= 0) return { tier: 4, deficit: 0, ilvl: bI, labelKey: "bagDone", color: "#4dca6b", score: 0 };
    var bagTierIdx = itemTierIdx(inBag.bonus, bI);
    if (bagTierIdx < targetTierIdx) return { tier: 1, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#ff6b6b", score: 0, upgradeStatus: "tierUp" };
    return { tier: 3, deficit: bD, ilvl: bI, labelKey: "bag", label: bI + "", color: "#caca3d", score: 0, upgradeStatus: "enhance" };
  }
  if (deficit <= 0 && eqIlvl > 0) return { tier: 4, deficit: 0, ilvl: eqIlvl, labelKey: "done", color: "#4dca6b", score: 0 };
  return { tier: 1, deficit: deficit, ilvl: eqIlvl, label: eqIlvl > 0 ? eqIlvl + "" : "\u2014", color: "#ff6b6b", score: score };
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
function sortKey(p) { if (p.labelKey === "mythicBisDone") return 3.5; return p.tier; }
function sortByPriority(items, sr, t, stats, priorityStats) {
  return items.slice().sort(function(a, b) {
    var pa = calcPriority(a, sr, t, stats, priorityStats), pb = calcPriority(b, sr, t, stats, priorityStats);
    var sa = sortKey(pa), sb = sortKey(pb);
    if (sa !== sb) return sa - sb;
    if ((pa.upgradeStatus === "tierUp") !== (pb.upgradeStatus === "tierUp")) return pa.upgradeStatus === "tierUp" ? -1 : 1;
    if (pb.deficit !== pa.deficit) return pb.deficit - pa.deficit;
    return pa.score - pb.score;
  });
}

function calcDungeonScore(dungeon, fc, BIS, sr, targetIlvl, stats, priorityStats, acq) {
  if (!sr || !fc) return 0;
  var priorityScore = 0;
  BIS.forEach(function(bi) {
    if (getSource(bi) !== dungeon) return;
    var p = calcPriority(bi, sr, targetIlvl, stats, priorityStats);
    if (acq[bi.id] && p.tier !== 4) p = { tier: 4 };
    if (p.tier === 4) return;
    priorityScore += Math.round((4 - p.tier) * 10) + (p.deficit || 0);
  });
  // 1순위: 파밍 필요 BiS 개수, 2순위: 파밍 필요 Alt 개수, 3순위: 우선순위 점수
  return fc.bis * 10000 + fc.alt * 100 + priorityScore;
}

function StatPills({ stats: itemStats }) {
  var { t } = useLocale();
  if (!itemStats || !itemStats.length) return null;
  var colors = { crit: { bg: "#2a1a1a", fg: "#e88", bd: "#4a2222" }, haste: { bg: "#1a2a1a", fg: "#8e8", bd: "#224a22" }, mastery: { bg: "#1a1a2a", fg: "#88e", bd: "#22224a" }, vers: { bg: "#2a2a1a", fg: "#ee8", bd: "#4a4a22" } };
  return (<span style={{ display: "inline-flex", gap: 2 }}>{itemStats.map(function(s) { var c = colors[s]; return (<span key={s} style={{ display: "inline-flex", padding: "1px 5px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: c.bg, color: c.fg, border: "1px solid " + c.bd }}>{t("stats." + s)}</span>); })}</span>);
}

var DIFF_ORDER = ["amr", "stat3", "stat4", "stat5", "stat71", "stat72", "stat73", "stat74", "stat7", "rtg32", "rtg36", "rtg49", "rtg40", "rtg24", "rtg25", "rtg62"];
// DIFF_LABELS moved to i18n (diffLabels section in ko.json/en.json)
function parseTooltipStats(html) {
  var stats = {};
  var re = /<!--(amr|stat\d+|rtg\d+)-->[^\d<]*?(\d[\d,]*)/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    stats[m[1]] = (stats[m[1]] || 0) + parseInt(m[2].replace(/,/g, ""), 10);
  }
  return stats;
}
// whSpecId → primary stat key (stat3=agi, stat4=str, stat5=int)
var SPEC_PRIMARY = (function() {
  var m = {};
  // Strength: DK, Paladin Prot/Ret, Warrior
  [250,251,252, 66,70, 71,72,73].forEach(function(id) { m[id] = "stat4"; });
  // Agility: DH, Druid Feral/Guardian, Hunter, Monk Brew/WW, Rogue, Shaman Enh
  [577,581, 103,104, 253,254,255, 268,269, 259,260,261, 263].forEach(function(id) { m[id] = "stat3"; });
  // Intellect: Druid Balance/Resto, Evoker, Mage, Monk MW, Paladin Holy, Priest, Shaman Ele/Resto, Warlock
  [102,105, 1467,1468,1473, 62,63,64, 270, 65, 256,257,258, 262,264, 265,266,267].forEach(function(id) { m[id] = "stat5"; });
  return m;
})();
var PRIMARY_KEYS = { stat3: 1, stat4: 1, stat5: 1 };
function computeStatDiff(newStats, oldStats, whSpecId) {
  var myPrimary = SPEC_PRIMARY[whSpecId];
  var allKeys = {};
  Object.keys(newStats).forEach(function(k) { allKeys[k] = true; });
  Object.keys(oldStats).forEach(function(k) { allKeys[k] = true; });
  var diff = [];
  DIFF_ORDER.forEach(function(k) {
    if (!allKeys[k]) return;
    delete allKeys[k];
    if (myPrimary && PRIMARY_KEYS[k] && k !== myPrimary) return;
    var d = (newStats[k] || 0) - (oldStats[k] || 0);
    if (d !== 0) diff.push({ key: k, val: d });
  });
  Object.keys(allKeys).forEach(function(k) {
    if (myPrimary && PRIMARY_KEYS[k] && k !== myPrimary) return;
    var d = (newStats[k] || 0) - (oldStats[k] || 0);
    if (d !== 0) diff.push({ key: k, val: d });
  });
  return diff;
}
function renderDiffHTML(diff, labels, header) {
  var lines = ['<br><span style="border-top:1px solid #333;display:block;padding-top:6px;margin-top:2px;color:#ffd100;font-size:11px">' + header + '</span>'];
  diff.forEach(function(d) {
    var color = d.val > 0 ? "#0f0" : "#f44";
    var sign = d.val > 0 ? "+" : "";
    lines.push('<span style="display:block;color:' + color + ';font-size:12px">' + sign + d.val + ' ' + (labels[d.key] || d.key) + '</span>');
  });
  return lines.join("");
}

var eqTooltipCache = {};
function EqTooltipObserver({ locale, whSpecId, t }) {
  var loc = locale === "ko" ? 1 : 0;
  var elRef = useRef(null);
  useEffect(function() {
    var el = document.getElementById("eq-tooltip-singleton");
    if (!el) {
      el = document.createElement("div");
      el.id = "eq-tooltip-singleton";
      el.className = "eq-tooltip-wrap";
      el.style.cssText = "position:fixed;z-index:99998;pointer-events:none;padding:20px 6px 6px;display:none;";
      el.innerHTML = '<div class="eq-tooltip-label" style="position:absolute;top:3px;left:10px;font-size:10px;font-weight:700;color:#ffd100;letter-spacing:.5px;pointer-events:none;background:#1a1a2e;padding:2px 8px;border-radius:3px;border:1px solid #ffd10066;text-shadow:0 1px 2px rgba(0,0,0,.8)"></div><div class="wowhead-tooltip" data-eq-tooltip="true"><table><tbody><tr><td class="eq-td"></td><th style="background-position:right top"></th></tr><tr><th style="background-position:left bottom"></th><th style="background-position:right bottom"></th></tr></tbody></table></div>';
      document.body.appendChild(el);
    }
    elRef.current = el;
  }, []);
  useEffect(function() {
    // Clear cached tooltips when spec changes (primary stats differ by spec)
    for (var k in eqTooltipCache) delete eqTooltipCache[k];
    var lastEqKey = null;
    var rafId = null;
    var activeLink = null;
    var diffComputed = false;
    var hoverTime = 0;
    var eqLabelText = t("ui.equipped");
    var diffHeader = t("diffLabels.header");
    var diffLabels = {};
    DIFF_ORDER.forEach(function(k) { diffLabels[k] = t("diffLabels." + k); });

    function trackPosition() {
      var el = elRef.current; if (!el || !activeLink) return;
      var whTip = document.querySelector(".wowhead-tooltip:not([data-eq-tooltip])");
      if (!whTip || whTip.getBoundingClientRect().width === 0) {
        rafId = requestAnimationFrame(trackPosition);
        return;
      }
      var r = whTip.getBoundingClientRect();
      var left = r.right;
      if (left + 340 > window.innerWidth) left = r.left - 340;
      var top = Math.min(r.top, window.innerHeight - 400);
      el.style.top = (Math.max(4, top) - 20) + "px";
      el.style.left = (Math.max(4, left) - 6) + "px";
      el.style.display = "block";
      if (!diffComputed && Date.now() - hoverTime > 300) {
        var eqHtml = eqTooltipCache[lastEqKey];
        if (eqHtml) {
          var bisHtml = whTip.innerHTML;
          var bisStats = parseTooltipStats(bisHtml);
          if (Object.keys(bisStats).length > 0) {
            diffComputed = true;
            var td = el.querySelector(".eq-td");
            if (td) {
              var diffDiv = td.querySelector(".eq-stat-diff");
              if (!diffDiv) {
                diffDiv = document.createElement("div");
                diffDiv.className = "eq-stat-diff";
                td.appendChild(diffDiv);
              }
              var eqStats = parseTooltipStats(eqHtml);
              var diff = computeStatDiff(bisStats, eqStats, whSpecId);
              diffDiv.innerHTML = diff.length > 0 ? renderDiffHTML(diff, diffLabels, diffHeader) : "";
            }
          }
        }
      }
      rafId = requestAnimationFrame(trackPosition);
    }

    function onOver(e) {
      var link = e.target.closest("a[data-eq-id]");
      if (!link || link === activeLink) return;
      activeLink = link;
      diffComputed = false;
      hoverTime = Date.now();
      var el = elRef.current; if (!el) return;
      var eqId = link.getAttribute("data-eq-id");
      var eqBonus = link.getAttribute("data-eq-bonus");
      var eqIlvl = link.getAttribute("data-eq-ilvl");
      var eqKey = eqId + "-" + eqBonus + "-" + eqIlvl;
      var lbl = el.querySelector(".eq-tooltip-label");
      if (lbl) lbl.textContent = eqLabelText;
      if (eqKey !== lastEqKey) {
        lastEqKey = eqKey;
        var td = el.querySelector(".eq-td");
        if (eqTooltipCache[eqKey]) { td.innerHTML = sanitizeHTML(eqTooltipCache[eqKey]); }
        else {
          td.innerHTML = '<span style="color:#556666;padding:12px">Loading...</span>';
          fetch("https://nether.wowhead.com/tooltip/item/" + eqId + "?dataEnv=1&locale=" + loc + (whSpecId ? "&spec=" + whSpecId : "") + (eqBonus ? "&bonus=" + eqBonus : "") + (eqIlvl ? "&ilvl=" + eqIlvl : ""))
            .then(function(res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
            .then(function(data) {
              eqTooltipCache[eqKey] = sanitizeHTML(data.tooltip);
              if (lastEqKey === eqKey) td.innerHTML = eqTooltipCache[eqKey];
            })
            .catch(function() {
              if (lastEqKey === eqKey) td.innerHTML = '<span style="color:#aa5555;padding:12px">Failed to load</span>';
            });
        }
      }
      if (!rafId) rafId = requestAnimationFrame(trackPosition);
    }

    function onOut(e) {
      var link = e.target.closest("a[data-eq-id]");
      if (!link && !e.target.closest(".eq-tooltip-wrap")) return;
      // Check if we moved to another eq-link
      var related = e.relatedTarget;
      if (related && related.closest && related.closest("a[data-eq-id]")) return;
      activeLink = null;
      lastEqKey = null;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      var el = elRef.current; if (el) el.style.display = "none";
    }

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    return function() {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loc, whSpecId]);
  return null;
}

function ItemCard({ item, isAlt, priority: p, sr, onToggle, idx, theme, allStats, targetBonus, targetIlvl, knownBisIds, whSpecId, armorTypes, expectedArmor }) {
  var { t, itemName, locale } = useLocale();
  var itemSource = getSource(item);
  var isDungeon = !!DC[itemSource];
  var c = DC[itemSource] || { b: "#8866aa", t: "#c4aadd", g: "#1a1028" };
  var eq = !isAlt && sr && sr.eqSlot ? sr.eqSlot[item.id] : null;
  var altEq = isAlt && sr && sr.gear ? (function() {
    var slots = resolveSlots(item.forSlot);
    for (var i = 0; i < slots.length; i++) { if (sr.gear[slots[i]] && sr.gear[slots[i]].id === item.id) return sr.gear[slots[i]]; }
    if (slots.length > 1 && knownBisIds) {
      var candidates = slots.map(function(s) { return sr.gear[s]; }).filter(Boolean);
      var replaceable = candidates.filter(function(g) { return !knownBisIds.has(g.id); });
      if (replaceable.length > 0) return replaceable.sort(function(a, b) { return (a.ilvl || 0) - (b.ilvl || 0); })[0];
    }
    return sr.gear[slots[0]] || sr.gear[slots[1]];
  })() : null;
  var hasDiff = eq && eq.id !== item.id;
  var altHasDiff = isAlt && altEq;
  var eqForTooltip = hasDiff ? eq : (altHasDiff ? altEq : null);
  var isSimcAlt = !isAlt && sr && sr.altItems ? sr.altItems[item.id] : false;
  // Detect wrong armor type on the equipped item
  var eqToCheck = eq || altEq;
  var eqSlotName = isAlt ? item.forSlot : item.slot;
  var wrongArmor = null;
  if (expectedArmor && eqToCheck && armorTypes && ARMOR_SLOTS.has(eqSlotName)) {
    var eqArmor = armorTypes[eqToCheck.id];
    if (eqArmor && eqArmor !== expectedArmor) wrongArmor = eqArmor;
  }
  var tier = (p && p.tier) ? p.tier : 0;
  var isDoneState = wrongArmor ? false : tier === 4;
  var canToggle = wrongArmor ? false : (isDoneState || !(p && p.deficit > 0));
  var isMythicBisDone = !wrongArmor && p && p.labelKey === "mythicBisDone";
  var visualTier = wrongArmor ? 1 : (isMythicBisDone || (p && p.upgradeStatus === "enhance")) ? 4 : (p && p.upgradeStatus === "tierUp") ? 2 : tier;
  var cardClass = "ic card-enter";
  if (wrongArmor) cardClass += " t1 wrong-armor"; else if (visualTier === 1) cardClass += " t1"; else if (visualTier === 2) cardClass += " t2"; else if (visualTier === 3) cardClass += " t3"; else if (visualTier === 4) cardClass += " t4";
  if (isAlt && !isDoneState) cardClass += " altc";
  var bgs = { 0: "linear-gradient(135deg, #101018, " + c.g + "88)", 1: "linear-gradient(135deg, #140e0e, #1a0f0f)", 2: "linear-gradient(135deg, #14120a, #1a150d)", 3: "linear-gradient(135deg, #14120a, #1a150d)", 4: "linear-gradient(135deg, #0d120d, #0a100a)" };
  if (wrongArmor) bgs[1] = "linear-gradient(135deg, #2a0505, #1a0808)";
  var acs = { 0: c.b, 1: "#ff6b6b", 2: "#c9a227", 3: "#c9a227", 4: "#1a3a1a" };
  var icons = { 1: "\u25B2", 2: "\u25C6", 3: "\u2191", 4: "\u2713" };
  var pLabel = p ? (p.labelKey ? t("ui." + p.labelKey) : p.label) : "";
  var whLocale = locale === "ko" ? "/ko" : "";
  var whSpec = whSpecId ? "&spec=" + whSpecId : "";
  return (
    <div className={cardClass} style={{ animationDelay: (idx * .04) + "s", background: bgs[visualTier] || bgs[0], borderRadius: 10, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: wrongArmor ? 4 : (visualTier >= 1 && visualTier <= 2) ? 3 : 2, background: wrongArmor ? "#ff2020" : (acs[visualTier] || c.b), opacity: wrongArmor ? 1 : (visualTier <= 2 ? .9 : (visualTier === 4 ? .3 : .6)) }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: isAlt ? "#e8a84c" : theme.accent, background: isAlt ? "#2a1f10" : theme.accentBg, padding: "2px 7px", borderRadius: 3, border: "1px solid " + (isAlt ? "#5a4020" : theme.accentBorder) }}>{isAlt ? "ALT \u00B7 " + t("slots." + item.forSlot) : t("slots." + item.slot)}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: c.g, color: c.t, border: "1px solid " + c.b + "44" }}>{isDungeon ? t("dungeons." + itemSource) : (t("sources." + itemSource) || itemSource)}</span>
            <StatPills stats={item.stats} />
          </div>
          <a href={"https://www.wowhead.com" + whLocale + "/item=" + item.id + whSpec + (!hasDiff && eq ? (eq.bonus ? "&bonus=" + eq.bonus : "") + (eq.ilvl ? "&ilvl=" + eq.ilvl : "") : (targetBonus ? "&bonus=" + targetBonus : ""))} target="_blank" rel="noopener noreferrer" data-wh-icon-size="small" {...(eqForTooltip ? {"data-eq-id": eqForTooltip.id, "data-eq-bonus": eqForTooltip.bonus || "", "data-eq-ilvl": eqForTooltip.ilvl || ""} : {})} style={{ display: "block", fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 2, color: isDoneState ? "#556644" : (isAlt ? "#d4b87a" : "#e8dcc0"), textDecoration: isDoneState ? "line-through" : "none", textDecorationColor: "#3a5a2a" }}>{itemName(item)}</a>
          {wrongArmor && (
            <div className="wrong-armor-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 5, fontSize: 12, fontWeight: 800, background: "linear-gradient(135deg,#3a0a0a,#2a0505)", border: "2px solid #ff2020", color: "#ff4444", marginBottom: 6, letterSpacing: .5 }}>
              <span style={{ fontSize: 16 }}>{"\u26A0"}</span>
              <span>{t("ui.wrongArmorType", { expected: t("armorTypes." + expectedArmor), actual: t("armorTypes." + wrongArmor) })}</span>
            </div>
          )}
          {p && tier > 0 && tier < 4 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 700, background: visualTier === 1 ? "linear-gradient(135deg,#2a1515,#1a0f0f)" : visualTier === 2 ? "linear-gradient(135deg,#2a1f10,#1a1508)" : visualTier === 3 ? "linear-gradient(135deg,#2a1f10,#1a1508)" : "#0d1a0d", border: "1px solid " + (visualTier === 1 ? "#6a2020" : visualTier === 2 ? "#6a5020" : visualTier === 3 ? "#6a5020" : "#1a3a1a"), color: p.color }}>
                <span style={{ fontSize: 10 }}>{icons[tier]}</span><span>{pLabel}</span>
                {p.deficit > 0 && <span style={{ opacity: .7, fontSize: 10 }}>{"\uFF08\u2212" + p.deficit + "\uFF09"}</span>}
              </div>
              {p.upgradeStatus && <span style={{ fontSize: 9, color: p.upgradeStatus === "tierUp" ? "#cc8844" : "#5a9a5a" }}>{t(p.upgradeStatus === "tierUp" ? "ui.tierReacquireNeeded" : "ui.tierUpgradeNeeded")}</span>}
              {hasDiff && eq && (
                <a href={"https://www.wowhead.com" + whLocale + "/item=" + eq.id + whSpec + (eq.bonus ? "&bonus=" + eq.bonus : "") + (eq.ilvl ? "&ilvl=" + eq.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 3, background: isSimcAlt ? "#1a1508" : "#1a1520", border: "1px solid " + (isSimcAlt ? "#3a2a10" : "#3a2030"), textDecoration: "none", fontSize: 10, fontWeight: 600, color: isSimcAlt ? "#c9a040" : "#aa7799", whiteSpace: "nowrap" }}>
                  <span>{eq.name}</span>
                  {allStats[eq.id] && allStats[eq.id].length > 0 && allStats[eq.id].map(function(s) {
                    return (<span key={s} style={{ fontSize: 9, color: "#776655" }}>{"\u00B7"}{t("stats." + s)}</span>);
                  })}
                </a>
              )}
            </div>
          )}
          {isAlt && !isDoneState && altEq && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center", marginTop: 4 }}>
              <a href={"https://www.wowhead.com" + whLocale + "/item=" + altEq.id + whSpec + (altEq.bonus ? "&bonus=" + altEq.bonus : "") + (altEq.ilvl ? "&ilvl=" + altEq.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 3, background: "#1a1508", border: "1px solid #3a2a10", textDecoration: "none", fontSize: 10, fontWeight: 600, color: "#c9a040", whiteSpace: "nowrap" }}>
                <span>{altEq.name}{altEq.ilvl ? " (" + altEq.ilvl + ")" : ""}</span>
                {allStats[altEq.id] && allStats[altEq.id].length > 0 && allStats[altEq.id].map(function(s) {
                  return (<span key={s} style={{ fontSize: 9, color: "#776655" }}>{"\u00B7"}{t("stats." + s)}</span>);
                })}
              </a>
            </div>
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

export default function BisTracker({ spec, charName, initialSimcText, onSpecSwitch, onClear, onCharDetected }) {
  var { t, locale } = useLocale();
  var { BIS, MYTHIC, ALTS, KNOWN_STATS, DUNGEONS, STORAGE_KEY: BASE_STORAGE_KEY, THEME: theme, PRIORITY_STATS, STAT_CACHE_KEY, GUIDE_URL, SPEC_KEY } = spec;
  var whSpecId = WH_SPEC_IDS[SPEC_KEY];
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
  var [acq, setAcq] = useState({});
  var [filter, setFilter] = useState("all");
  var [simcOpen, setSimcOpen] = useState(false);
  var [simcText, setSimcText] = useState("");
  var [sr, setSr] = useState(null);
  var [feedback, setFeedback] = useState(null);
  var [targetTier, setTargetTier] = useState("hero");
  var [loaded, setLoaded] = useState(false);
  var [runtimeStats, setRuntimeStats] = useState({});
  var [runtimeArmorTypes, setRuntimeArmorTypes] = useState({});
  var [importing, setImporting] = useState(false);
  var targetInfo = TIERS.find(function(t) { return t.key === targetTier; }) || TIERS[1];
  var expectedArmor = sr && sr.ci && sr.ci.className ? CLASS_ARMOR[sr.ci.className] : null;
  var allStats = useMemo(function() { return Object.assign({}, KNOWN_STATS, runtimeStats); }, [KNOWN_STATS, runtimeStats]);
  var farmCounts = useMemo(function() {
    var c = {};
    var seen = {};
    activeItems.forEach(function(i) { seen[getSource(i)] = true; });
    mergedAlts.forEach(function(a) { seen[getSource(a)] = true; });
    Object.keys(seen).forEach(function(s) {
      c[s] = calcSourceFarmCount(s, activeItems, mergedAlts, sr, targetInfo.max, allStats, PRIORITY_STATS, acq);
    });
    return c;
  }, [activeItems, mergedAlts, sr, targetInfo.max, allStats, PRIORITY_STATS, acq]);

  useEffect(function() {
    var d = load(STORAGE_KEY);
    if (d) {
      setAcq(d.acq || {});
      if (d.sr) { setSr(d.sr); setSimcOpen(false); if (onCharDetected && d.sr.ci) onCharDetected(d.sr.ci.name); } else { setSimcOpen(true); }
      var cached = load(STAT_CACHE_KEY);
      if (cached) setRuntimeStats(cached);
      var cachedAT = load(STAT_CACHE_KEY + "-armor");
      if (cachedAT) setRuntimeArmorTypes(cachedAT);
      if (d.targetTier) setTargetTier(d.targetTier);
      if (d.filter) setFilter(d.filter);
    } else {
      var cached2 = load(STAT_CACHE_KEY);
      if (cached2) setRuntimeStats(cached2);
      var cachedAT2 = load(STAT_CACHE_KEY + "-armor");
      if (cachedAT2) setRuntimeArmorTypes(cachedAT2);
    }
    setLoaded(true);
  }, [STORAGE_KEY, STAT_CACHE_KEY]);
  // Auto-fetch armor types for equipped armor-slot items missing from cache
  useEffect(function() {
    if (!sr || !sr.gear || !sr.ci) return;
    var missing = [];
    GEAR_SLOTS.forEach(function(s) {
      if (!ARMOR_SLOTS.has(s)) return;
      var g = sr.gear[s]; if (!g) return;
      if (!runtimeArmorTypes[g.id]) missing.push(g.id);
    });
    // deduplicate
    missing = missing.filter(function(id, i) { return missing.indexOf(id) === i; });
    if (missing.length === 0) return;
    fetchItemStats(missing).then(function(fetched) {
      var newAT = Object.assign({}, runtimeArmorTypes, fetched.armorTypes);
      setRuntimeArmorTypes(newAT);
      persist(STAT_CACHE_KEY + "-armor", newAT);
      // Also update stats if any were missing
      var newRuntime = Object.assign({}, runtimeStats);
      var changed = false;
      Object.keys(fetched.stats).forEach(function(id) {
        if (newRuntime[id] === undefined && fetched.stats[id] !== null) { newRuntime[id] = fetched.stats[id]; changed = true; }
      });
      if (changed) { setRuntimeStats(newRuntime); persist(STAT_CACHE_KEY, newRuntime); }
    });
  }, [sr, runtimeArmorTypes, STAT_CACHE_KEY]);
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
    // Also fetch armor type for equipped armor-slot items missing from cache
    var armorSlotIds = GEAR_SLOTS.filter(function(s) { return ARMOR_SLOTS.has(s); }).map(function(s) { return parsed.gear[s]; }).filter(Boolean).map(function(g) { return g.id; });
    var missingArmorIds = armorSlotIds.filter(function(id) { return !runtimeArmorTypes[id] && unknownIds.indexOf(id) < 0; });
    if (missingArmorIds.length > 0) unknownIds = unknownIds.concat(missingArmorIds);
    function finishImport(mergedStats) {
      var result = matchBiS(BIS, parsed.gear, parsed.bag, mergedStats, knownBisIds, PRIORITY_STATS);
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
        Object.keys(fetched.stats).forEach(function(id) { newRuntime[id] = fetched.stats[id] !== null ? fetched.stats[id] : []; });
        setRuntimeStats(newRuntime);
        persist(STAT_CACHE_KEY, newRuntime);
        var newAT = Object.assign({}, runtimeArmorTypes, fetched.armorTypes);
        setRuntimeArmorTypes(newAT);
        persist(STAT_CACHE_KEY + "-armor", newAT);
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
    var cachedAT3 = load(STAT_CACHE_KEY + "-armor"); setRuntimeArmorTypes(cachedAT3 || {});
    if (d) {
      setAcq(d.acq || {}); setSr(d.sr || null); setSimcOpen(!d.sr);
      if (d.targetTier) setTargetTier(d.targetTier);
      setFilter(d.filter || "all");
    } else { setAcq({}); setSr(null); setTargetTier("hero"); setSimcOpen(false); setFilter("all"); }
  }, [STORAGE_KEY, STAT_CACHE_KEY]);
  var initialImportDone = useRef(false);
  useEffect(function() {
    if (initialSimcText && initialSimcText.trim() && !initialImportDone.current) {
      initialImportDone.current = true;
      doImport(initialSimcText);
    }
  }, [initialSimcText, doImport]);
  var progressCounts = useMemo(function() {
    var done = 0, green = 0;
    activeItems.forEach(function(b) {
      if (acq[b.id]) { done++; green++; return; }
      if (!sr) return;
      var p = calcPriority(b, sr, targetInfo.max, allStats, PRIORITY_STATS);
      if (p.tier === 4) done++;
      if (p.color === "#4dca6b") green++;
    });
    return { done: done, green: green };
  }, [acq, sr, targetInfo.max, allStats, activeItems, PRIORITY_STATS]);
  var doneCount = progressCounts.done, greenCount = progressCounts.green;
  var displayBis = useMemo(function() { var items = filter === "all" ? activeItems : activeItems.filter(function(i) { return getSource(i) === filter; }); return sr ? sortByPriority(items, sr, targetInfo.max, allStats, PRIORITY_STATS) : items; }, [filter, sr, targetInfo.max, allStats, activeItems, PRIORITY_STATS]);
  var displayAlts = useMemo(function() {
    if (filter === "all") return [];
    var items = mergedAlts.filter(function(a) { return getSource(a) === filter; });
    if (!sr) return items;
    return items.slice().sort(function(a, b) {
      var pa = calcAltPriority(a, sr, allStats, PRIORITY_STATS, targetInfo.max, acq);
      var pb = calcAltPriority(b, sr, allStats, PRIORITY_STATS, targetInfo.max, acq);
      if (pa.tier !== pb.tier) return pa.tier - pb.tier;
      return (pb.deficit || 0) - (pa.deficit || 0);
    });
  }, [filter, mergedAlts, sr, acq, allStats, PRIORITY_STATS, targetInfo.max]);
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
          <div style={{ position: "absolute", height: "100%", width: (greenCount / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: "#4dca6b", opacity: 0.15 }} />
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
          var fc = farmCounts[ns.source] || { bis: 0, alt: 0 };
          var nsBisRem = fc.bis, nsAltRem = fc.alt, nsRem = nsBisRem + nsAltRem;
          var nsDone = sr && nsRem === 0;
          return (
            <button key={ns.source} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : ns.source); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? "#1a1028" : (nsDone ? "#0d1a0d" : "#1a102844"), border: "1px solid " + (act ? "#8866aa" : (nsDone ? "#1a3a1a" : "#8866aa33")), fontSize: 12, fontWeight: 600, color: act ? "#c4aadd" : (nsDone ? "#4dca6b" : "#8866aa") }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: nsDone ? "#4dca6b" : "#aa88cc", display: "inline-block" }} />
              <span>{t("sources." + ns.source) || ns.source}</span>
              {nsDone ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : sr ? <span style={{ fontSize: 11 }}><span style={{ color: nsBisRem > 0 ? "#c4aadd" : "#8866aa44", fontWeight: 700 }}>{nsBisRem}</span>{nsAltRem > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}{nsAltRem > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{nsAltRem}</span>}</span> : <span style={{ fontSize: 11, color: "#8866aa88" }}>{fc.bis}{fc.alt > 0 ? "+" + fc.alt : ""}</span>}
            </button>
          );
        })}
        {(nonDungeonSources.prep.length > 0) && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {DUNGEONS.map(function(d) {
          if (!farmCounts[d]) return null;
          return { source: d, score: sr ? calcDungeonScore(d, farmCounts[d], activeItems, sr, targetInfo.max, allStats, PRIORITY_STATS, acq) : 0 };
        }).filter(Boolean).sort(function(a, b) { return b.score - a.score; }).map(function(item) {
          var d = item.source, c2 = DC[d] || { g: "#333", b: "#555", t: "#aaa" }, act = filter === d;
          var fc = farmCounts[d] || { bis: 0, alt: 0 };
          var bisRem = fc.bis, altRem = fc.alt;
          var rem = bisRem + altRem;
          var doneStyle = sr && rem === 0;
          return (
          <button key={d} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : d); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? c2.g : (doneStyle ? "#0d1a0d" : c2.g + "44"), border: "1px solid " + (act ? c2.b : (doneStyle ? "#1a3a1a" : c2.b) + "33"), fontSize: 12, fontWeight: 600, color: act ? c2.t : (doneStyle ? "#4dca6b" : c2.t) }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: doneStyle ? "#4dca6b" : c2.b, display: "inline-block", animation: doneStyle ? "none" : (sr ? "pulse 2s infinite" : "none") }} />
            <span>{t("dungeons." + d)}</span>
            {doneStyle ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : sr ? <span style={{ fontSize: 11 }}><span style={{ color: bisRem > 0 ? c2.t : c2.b + "88", fontWeight: 700 }}>{bisRem}</span>{altRem > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}{altRem > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{altRem}</span>}</span> : <span style={{ fontSize: 11, color: c2.t + "88" }}>{fc.bis}{fc.alt > 0 ? "+" + fc.alt : ""}</span>}
          </button>); })}
        {nonDungeonSources.raid.length > 0 && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {nonDungeonSources.raid.map(function(ns) {
          var act = filter === ns.source;
          var fc = farmCounts[ns.source] || { bis: 0, alt: 0 };
          var nsBisRem = fc.bis, nsAltRem = fc.alt, nsRem = nsBisRem + nsAltRem;
          var nsDone = sr && nsRem === 0;
          return (
            <button key={ns.source} className={"fbtn" + (act ? " active" : "")} onClick={function() { changeFilter(act ? "all" : ns.source); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: act ? "#1a1028" : (nsDone ? "#0d1a0d" : "#1a102844"), border: "1px solid " + (act ? "#8866aa" : (nsDone ? "#1a3a1a" : "#8866aa33")), fontSize: 12, fontWeight: 600, color: act ? "#c4aadd" : (nsDone ? "#4dca6b" : "#8866aa") }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: nsDone ? "#4dca6b" : "#8866aa", display: "inline-block" }} />
              <span>{t("sources." + ns.source) || ns.source}</span>
              {nsDone ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span> : sr ? <span style={{ fontSize: 11 }}><span style={{ color: nsBisRem > 0 ? "#c4aadd" : "#8866aa44", fontWeight: 700 }}>{nsBisRem}</span>{nsAltRem > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}{nsAltRem > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{nsAltRem}</span>}</span> : <span style={{ fontSize: 11, color: "#8866aa88" }}>{fc.bis}{fc.alt > 0 ? "+" + fc.alt : ""}</span>}
            </button>
          );
        })}
      </div>
      {sr ? (
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10, color: "#556666", flexWrap: "wrap" }}>
          <span><span style={{ color: "#ff6b6b" }}>{"\u25B2"}</span>{" " + t("ui.tierStatMismatch")}</span>
          <span><span style={{ color: "#e8a84c" }}>{"\u25C6"}</span>{" " + t("ui.tierAltEquipped")}</span>
          <span><span style={{ color: "#e8a84c" }}>{"\u2191"}</span>{" " + t("ui.tierBisUpgrade")}</span>
          <span><span style={{ color: "#4dca6b" }}>{"\u2713"}</span>{" " + t("ui.tierDone")}</span>
          <span style={{ color: "#445555" }}>{t("ui.deficitInfo", { max: targetInfo.max })}</span>
        </div>
      ) : (
        <div style={{ marginTop: 8, padding: "8px 14px", borderRadius: 6, background: theme.accentBg, border: "1px solid " + theme.accentBorder, fontSize: 11, color: theme.accent + "aa" }}>
          {t("ui.catalogMode")}
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
            var p = sr ? calcPriority(item, sr, targetInfo.max, allStats, PRIORITY_STATS) : null;
            if (acq[item.id]) { if (!p || p.tier !== 4) p = { tier: 4, deficit: 0, ilvl: p ? p.ilvl : 0, labelKey: "done", color: "#4dca6b", worst: false }; }
            return <ItemCard key={item.slot + "-" + item.id} item={item} isAlt={false} priority={p} sr={sr} onToggle={toggle} idx={idx} theme={theme} allStats={allStats}  targetBonus={targetInfo.tooltipBonus} targetIlvl={targetInfo.max} whSpecId={whSpecId} armorTypes={runtimeArmorTypes} expectedArmor={expectedArmor} />;
          })}
        </div>
        {displayAlts.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e8a84c", marginTop: 20, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{t("ui.altSameStats")}</span><span style={{ height: 1, flex: 1, background: "#3a3020" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {displayAlts.map(function(item, idx) {
                var altP = sr ? calcAltPriority(item, sr, allStats, PRIORITY_STATS, targetInfo.max, acq) : null;
                if (acq[item.id] && (!altP || altP.tier !== 4)) altP = { tier: 4, deficit: 0, ilvl: 0, labelKey: "done", color: "#4dca6b" };
                return <ItemCard key={item.forSlot + "-" + item.id} item={item} isAlt={true} priority={altP} sr={sr} onToggle={toggle} idx={idx} theme={theme} allStats={allStats} targetBonus={targetInfo.tooltipBonus} targetIlvl={targetInfo.max} knownBisIds={knownBisIds} whSpecId={whSpecId} armorTypes={runtimeArmorTypes} expectedArmor={expectedArmor} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
