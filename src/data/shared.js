// b: badge/border accent, t: text color, g: gradient background
export var DUNGEONS = {
  "Pit of Saron": { b: "#3d8ecf", t: "#7dc4ff", g: "#0f2640" },
  "Nexus-Point Xenas": { b: "#9b4dca", t: "#c88dff", g: "#25103a" },
  "Windrunner Spire": { b: "#4dca6b", t: "#8dffaa", g: "#0f2818" },
  "Magisters' Terrace": { b: "#ca7a3d", t: "#ffb86c", g: "#3a1a0f" },
  "Skyreach": { b: "#caca3d", t: "#ffff7d", g: "#33330f" },
  "Seat of the Triumvirate": { b: "#4d6dca", t: "#8da8ff", g: "#0f1a3a" },
  "Algeth'ar Academy": { b: "#6daa6d", t: "#a0dda0", g: "#0f280f" },
  "Maisara Caverns": { b: "#aa6d9b", t: "#dda0cc", g: "#280f22" },
};

export var TIERS = [
  { key: "veteran", max: 250, color: "#6daa6d", bonusMin: 12776, bonusMax: 12783, tooltipBonus: 12782 },
  { key: "champion", max: 263, color: "#4d8ecf", bonusMin: 12784, bonusMax: 12791, tooltipBonus: 12790 },
  { key: "hero", max: 276, color: "#9b4dca", bonusMin: 12792, bonusMax: 12799, tooltipBonus: 12798 },
  { key: "myth", max: 289, color: "#ca7a3d", bonusMin: 12800, bonusMax: 12807, tooltipBonus: 12806 },
];

// Class → expected armor type mapping
export var CLASS_ARMOR = {
  warrior: "Plate", paladin: "Plate", deathknight: "Plate",
  hunter: "Mail", shaman: "Mail", evoker: "Mail",
  rogue: "Leather", monk: "Leather", druid: "Leather", demonhunter: "Leather",
  mage: "Cloth", warlock: "Cloth", priest: "Cloth",
};

// Slots that have an armor type (exclude accessories/weapons/back)
export var ARMOR_SLOTS = new Set(["head", "shoulder", "chest", "wrist", "hands", "waist", "legs", "feet"]);

// Spec → primary stat mapping (by SPEC_KEY)
// Wowhead tooltip stat markers: <!--stat4--> Str, <!--stat3--> Int, <!--stat2--> Agi
// Hybrid: <!--stat72--> Agi/Str, <!--stat73--> Str/Int, <!--stat74--> Agi/Int, <!--stat71--> Agi/Str/Int
export var SPEC_PRIMARY_STAT = {
  "blood-dk": "str", "frost-dk": "str", "unholy-dk": "str",
  "havoc-dh": "agi", "devourer-dh": "int", "veng-dh": "agi",
  "balance-druid": "int", "feral-druid": "agi", "guardian-druid": "agi", "resto-druid": "int",
  "dev-evoker": "int", "pres-evoker": "int", "aug-evoker": "int",
  "bm-hunter": "agi", "mm-hunter": "agi", "surv-hunter": "agi",
  "arcane-mage": "int", "fire-mage": "int", "frost-mage": "int",
  "brew-monk": "agi", "ww-monk": "agi", "mw-monk": "int",
  "holy-paladin": "int", "prot-paladin": "str", "ret-paladin": "str",
  "disc-priest": "int", "holy-priest": "int", "shadow-priest": "int",
  "assa-rogue": "agi", "outlaw-rogue": "agi", "sub-rogue": "agi",
  "ele-shaman": "int", "enh-shaman": "agi", "resto-shaman": "int",
  "aff-lock": "int", "demo-lock": "int", "destro-lock": "int",
  "arms-warrior": "str", "fury-warrior": "str", "prot-warrior": "str",
};

// Fetch stats from Wowhead tooltip API for unknown items
export function fetchItemStats(ids) {
  var stats = {};
  var armorTypes = {};
  var primaryStats = {};
  var promises = ids.map(function(id) {
    return fetch("https://nether.wowhead.com/tooltip/item/" + id + "?dataEnv=1&locale=0")
      .then(function(r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function(data) {
        var html = data.tooltip || "";
        var s = [];
        if (html.indexOf("<!--rtg32-->") >= 0) s.push("crit");
        if (html.indexOf("<!--rtg36-->") >= 0) s.push("haste");
        if (html.indexOf("<!--rtg49-->") >= 0) s.push("mastery");
        if (html.indexOf("<!--rtg40-->") >= 0) s.push("vers");
        stats[id] = s;
        // Extract armor type from tooltip HTML (e.g. <span class="q1">Plate</span>)
        var am = html.match(/<span class="q1">(Plate|Mail|Leather|Cloth)<\/span>/);
        if (am) armorTypes[id] = am[1];
        // Extract primary stat: fixed (stat4=str, stat5=int, stat3=agi) or hybrid (stat72/73/74)
        var ps = [];
        if (html.indexOf("<!--stat4-->") >= 0) ps.push("str");
        if (html.indexOf("<!--stat5-->") >= 0) ps.push("int");
        if (html.indexOf("<!--stat3-->") >= 0) ps.push("agi");
        // Hybrid primary stats (adapts to spec)
        if (html.indexOf("<!--stat72-->") >= 0) ps = ["agi", "str"];
        else if (html.indexOf("<!--stat73-->") >= 0) ps = ["agi", "int"];
        else if (html.indexOf("<!--stat74-->") >= 0) ps = ["str", "int"];
        primaryStats[id] = ps;
      })
      .catch(function() { stats[id] = null; });
  });
  return Promise.all(promises).then(function() { return { stats: stats, armorTypes: armorTypes, primaryStats: primaryStats }; });
}

export function resolveSlots(forSlot) {
  if (forSlot === "ring") return ["finger1", "finger2"];
  if (forSlot === "trinket") return ["trinket1", "trinket2"];
  if (forSlot === "weapon") return ["main_hand", "off_hand"];
  if (forSlot === "off_hand") return ["off_hand"];
  return [forSlot];
}

export var GEAR_SLOTS = [
  "head", "neck", "shoulder", "back", "chest", "wrist", "hands", "waist",
  "legs", "feet", "finger1", "finger2", "trinket1", "trinket2", "main_hand", "off_hand",
];

export function parseSimC(text) {
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
