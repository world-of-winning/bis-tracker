export var DUNGEON_COLORS = {
  "Pit of Saron": { b: "#3d8ecf", t: "#7dc4ff", g: "#0f2640" },
  "Nexus-Point Xenas": { b: "#9b4dca", t: "#c88dff", g: "#25103a" },
  "Windrunner Spire": { b: "#4dca6b", t: "#8dffaa", g: "#0f2818" },
  "Magisters' Terrace": { b: "#ca7a3d", t: "#ffb86c", g: "#3a1a0f" },
  "Skyreach": { b: "#caca3d", t: "#ffff7d", g: "#33330f" },
  "Seat of the Triumvirate": { b: "#4d6dca", t: "#8da8ff", g: "#0f1a3a" },
  "Algeth'ar Academy": { b: "#6daa6d", t: "#a0dda0", g: "#0f280f" },
  "Maisara Caverns": { b: "#aa6d9b", t: "#dda0cc", g: "#280f22" },
};

export var DUNGEON_SHORT = {
  "Pit of Saron": "사론",
  "Nexus-Point Xenas": "제나스",
  "Windrunner Spire": "윈첨",
  "Magisters' Terrace": "마정",
  "Skyreach": "하늘탑",
  "Seat of the Triumvirate": "삼두정",
  "Algeth'ar Academy": "알대",
  "Maisara Caverns": "마이사라",
};

export var TIERS = [
  { key: "veteran", ko: "노련가", max: 250, color: "#6daa6d", bonus: 12782 },
  { key: "champion", ko: "챔피언", max: 263, color: "#4d8ecf", bonus: 12790 },
  { key: "hero", ko: "영웅", max: 276, color: "#9b4dca", bonus: 12798 },
  { key: "myth", ko: "신화", max: 289, color: "#ca7a3d", bonus: 12806 },
];

export var STAT_KO = { crit: "치명타", haste: "가속", mastery: "특화", vers: "유연성" };

// Fetch stats from Wowhead tooltip API for unknown items
export function fetchItemStats(ids) {
  var results = {};
  var promises = ids.map(function(id) {
    return fetch("https://nether.wowhead.com/tooltip/item/" + id + "?dataEnv=1&locale=0")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var html = data.tooltip || "";
        var stats = [];
        if (html.indexOf("<!--rtg32-->") >= 0) stats.push("crit");
        if (html.indexOf("<!--rtg36-->") >= 0) stats.push("haste");
        if (html.indexOf("<!--rtg49-->") >= 0) stats.push("mastery");
        if (html.indexOf("<!--rtg40-->") >= 0) stats.push("vers");
        results[id] = stats;
      })
      .catch(function() { results[id] = null; });
  });
  return Promise.all(promises).then(function() { return results; });
}

export var GEAR_SLOTS = [
  "head", "neck", "shoulder", "back", "chest", "wrist", "hands", "waist",
  "legs", "feet", "finger1", "finger2", "trinket1", "trinket2", "main_hand", "off_hand",
];
