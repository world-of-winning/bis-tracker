export var SPEC_LABEL = "Guardian Druid";
export var SPEC_KEY = "guardian-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/guardian-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "guardian";
export var SPEC_ICON = "ability_racial_bearform";
export var STORAGE_KEY = "bis-guardian-druid-v1";

export var THEME = {
  accent: "#ca7a3d",
  accentLight: "#dfaf8b",
  accentBg: "#1e1209",
  accentBorder: "#472b15",
  shimmer: "linear-gradient(90deg,#794925,#ca7a3d,#dfaf8b,#ca7a3d,#794925)",
  btnBg: "linear-gradient(135deg,#794925,#ca7a3d)",
};

export var BIS = [
  { slot: "head", id: 250024, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", id: 250022, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 193712, source: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", id: 250027, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", id: 250025, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 251166, source: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "legs", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", id: 249334, source: "Imperator Averzian", stats: ["haste","vers"] },
  { slot: "finger1", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", id: 249278, source: "Chimaerus", stats: ["haste","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 193712, source: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251103, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", id: 251204, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "waist", id: 151316, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "legs", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", id: 251210, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 151311, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 251162, source: "Maisara Caverns", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49802, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","vers","crit","mastery"];

export var STAT_CACHE_KEY = "guardian-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],151309:["haste","vers"],
  151311:["haste","vers"],151316:["haste","vers"],151319:["crit","mastery"],151336:["crit","haste"],
  193712:["haste","vers"],221200:["mastery","vers"],240950:[],241140:["mastery","vers"],
  249278:["haste","vers"],249334:["haste","vers"],249343:["mastery"],249920:["haste"],
  250022:["crit","mastery"],250024:["haste","mastery"],250025:["haste","vers"],250027:["crit","mastery"],
  250256:[],251087:["crit","haste"],251092:["haste","mastery"],251096:["haste","vers"],
  251099:["crit","mastery"],251103:["haste","vers"],251140:["haste","mastery"],251159:["haste","mastery"],
  251162:["crit","haste"],251166:["haste","vers"],251171:["haste","mastery"],251204:["haste","vers"],
  251210:["haste","vers"],251216:["haste","mastery"],251217:["crit","haste"],252420:[],
  260235:[],
};

