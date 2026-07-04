export var SPEC_LABEL = "Subtlety Rogue";
export var SPEC_KEY = "sub-rogue";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/subtlety-rogue-raid-guide";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "subtlety";
export var SPEC_ICON = "ability_stealth";
export var STORAGE_KEY = "bis-sub-rogue-v1";

export var THEME = {
  accent: "#ca9060",
  accentLight: "#dfbca0",
  accentBg: "#1e160e",
  accentBorder: "#473222",
  shimmer: "linear-gradient(90deg,#79563a,#ca9060,#dfbca0,#ca9060,#79563a)",
  btnBg: "linear-gradient(135deg,#79563a,#ca9060)",
};

export var BIS = [
  { slot: "head", id: 250006, source: "Tier", stats: ["mastery","vers"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 250004, source: "Tier", stats: ["haste","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250009, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250007, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 268286, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "finger2", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { slot: "trinket1", id: 249344, source: "Imperator Averzian", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251109, source: "Priory of the Sacred Flame", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 151314, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251217, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "off_hand", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 258586, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 178819, source: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "sub-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49812:["crit","haste"],49817:["haste","mastery"],50228:["crit","haste"],
  151314:["mastery","vers"],151318:["crit","haste"],178819:["haste","mastery"],193701:[],
  193708:["crit","mastery"],193714:["haste","mastery"],221200:["mastery","vers"],237837:[],
  241140:["mastery","vers"],244576:[],249284:["crit","mastery"],249295:["crit","haste"],
  249312:["haste","mastery"],249321:["crit","mastery"],249337:["crit","haste"],249343:["mastery"],
  249344:[],249369:["haste","mastery"],249370:["haste","mastery"],249382:["crit","mastery"],
  249919:["crit","mastery"],250004:["haste","mastery"],250006:["mastery","vers"],250007:["crit","haste"],
  250009:["crit","mastery"],250247:["haste","mastery"],250256:[],251082:["crit","mastery"],
  251092:["haste","mastery"],251093:["haste","mastery"],251099:["crit","mastery"],251109:["crit","mastery"],
  251111:["crit","haste"],251113:["crit","mastery"],251115:["haste","mastery"],251159:["haste","mastery"],
  251171:["haste","mastery"],251175:["crit","mastery"],251178:["crit","haste"],251190:["haste","mastery"],
  251216:["haste","mastery"],251217:["crit","haste"],251513:["crit","mastery"],258218:["crit","mastery"],
  258525:["crit","haste"],258575:["crit","mastery"],258577:["crit","mastery"],258586:["haste","mastery"],
  260423:["crit","haste"],268286:["crit","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

