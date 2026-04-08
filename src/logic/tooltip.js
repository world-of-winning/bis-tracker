export var DIFF_ORDER = ["amr", "stat3", "stat4", "stat5", "stat71", "stat72", "stat73", "stat74", "stat7", "rtg32", "rtg36", "rtg49", "rtg40", "rtg24", "rtg25", "rtg62"];

export function parseTooltipStats(html) {
  var stats = {};
  var re = /<!--(amr|stat\d+|rtg\d+)-->[^\d<]*?(\d[\d,]*)/g;
  var m;
  while ((m = re.exec(html)) !== null) {
    stats[m[1]] = (stats[m[1]] || 0) + parseInt(m[2].replace(/,/g, ""), 10);
  }
  return stats;
}

// whSpecId → primary stat key (stat3=agi, stat4=str, stat5=int)
export var SPEC_PRIMARY = (function() {
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

export function computeStatDiff(newStats, oldStats, whSpecId) {
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

export function renderDiffHTML(diff, labels, header) {
  var lines = ['<br><span style="border-top:1px solid #333;display:block;padding-top:6px;margin-top:2px;color:#ffd100;font-size:11px">' + header + '</span>'];
  diff.forEach(function(d) {
    var color = d.val > 0 ? "#0f0" : "#f44";
    var sign = d.val > 0 ? "+" : "";
    lines.push('<span style="display:block;color:' + color + ';font-size:12px">' + sign + d.val + ' ' + (labels[d.key] || d.key) + '</span>');
  });
  return lines.join("");
}
