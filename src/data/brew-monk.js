export var SPEC_LABEL = "Brewmaster Monk";
export var SPEC_KEY = "brew-monk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/brewmaster-monk-raid-guide";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "brewmaster";
export var SPEC_ICON = "spell_monk_brewmaster_spec";
export var STORAGE_KEY = "bis-brew-monk-v1";

export var THEME = {
  accent: "#00AA60",
  accentLight: "#66cca0",
  accentBg: "#001a0e",
  accentBorder: "#003b22",
  shimmer: "linear-gradient(90deg,#00663a,#00AA60,#66cca0,#00AA60,#00663a)",
  btnBg: "linear-gradient(135deg,#00663a,#00AA60)",
};

export var BIS = [
  { slot: "head", id: 250015, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", id: 250013, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", id: 250018, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", id: 250016, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "waist", id: 249314, source: "Fallen-King Salhadaar", stats: ["mastery","vers"] },
  { slot: "legs", id: 151314, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", id: 151317, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "finger2", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", id: 193723, source: "Algeth'ar Academy", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 251177, source: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", id: 151313, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "wrist", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", id: 193721, source: "Algeth'ar Academy", stats: ["mastery","vers"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 151314, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", id: 151317, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 252418, source: "Skyreach", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 193723, source: "Algeth'ar Academy", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "back", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "feet", id: 251121, source: "Magisters' Terrace", stats: ["mastery","vers"] },
  { forSlot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "legs", id: 251205, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["vers","crit","mastery","haste"];

export var STAT_CACHE_KEY = "brew-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49823:["crit","vers"],151308:["crit","vers"],151309:["haste","vers"],
  151313:["crit","vers"],151314:["mastery","vers"],151317:["mastery","vers"],151319:["crit","mastery"],
  151336:["crit","haste"],193708:["crit","mastery"],193721:["mastery","vers"],193723:["crit","vers"],
  221200:["mastery","vers"],240950:[],241140:["mastery","vers"],249314:["mastery","vers"],
  249335:["crit","vers"],249336:["crit","vers"],249343:["mastery"],249919:["crit","mastery"],
  250013:["haste","mastery"],250015:["crit","haste"],250016:["crit","vers"],250018:["crit","haste"],
  251082:["crit","mastery"],251092:["haste","mastery"],251096:["haste","vers"],251103:["haste","vers"],
  251121:["mastery","vers"],251161:["crit","vers"],251171:["haste","mastery"],251177:["crit","vers"],
  251205:["crit","vers"],251513:["crit","mastery"],252418:[],252420:[],
  260235:[],
};

