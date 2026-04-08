export function sameStats(a, b) {
  if (!a || !b || !a.length || !b.length) return false;
  if (a.length !== b.length) return false;
  var x = a.slice().sort(), y = b.slice().sort();
  return x.every(function(v, i) { return v === y[i]; });
}

export function matchBiS(BIS, gear, bag, stats, knownBisIds, priorityStats) {
  var BIS_IDS = new Set(BIS.map(function(i) { return i.id; }));
  // Detect weapon type mismatch (e.g. 1H+shield source vs 2H target or vice versa)
  var bisHasOffhand = BIS.some(function(b) { return b.slot === "off_hand"; });
  var bisHasMainhand = BIS.some(function(b) { return b.slot === "main_hand"; });
  var gearHasOffhand = !!gear["off_hand"];
  var gearHasMainhand = !!gear["main_hand"];
  // Weapon mismatch: only when both sides have weapons but different types (1H+shield vs 2H)
  var weaponMismatch = gearHasMainhand && bisHasMainhand && bisHasOffhand !== gearHasOffhand;
  var matched = {}, eqSlot = {}, bisInBag = {}, altItems = {}, weaponMismatchIds = {};
  BIS.forEach(function(bi) {
    var s = bi.slot, d = gear[s];
    // Weapon type mismatch (1H+shield vs 2H): show equipped but never match/alt
    if (weaponMismatch && (s === "main_hand" || s === "off_hand")) {
      if (d) eqSlot[bi.id] = d;
      weaponMismatchIds[bi.id] = true;
      return;
    }
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
  return { matched: matched, eqSlot: eqSlot, bisInBag: bisInBag, altItems: altItems, weaponMismatch: weaponMismatchIds };
}
