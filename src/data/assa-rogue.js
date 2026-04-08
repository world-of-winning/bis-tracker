export var SPEC_LABEL = "Assassination Rogue";
export var SPEC_KEY = "assa-rogue";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/assassination-rogue-raid-guide";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "assassination";
export var SPEC_ICON = "ability_rogue_deadlybrew";
export var STORAGE_KEY = "bis-assa-rogue-v1";

export var THEME = {
  accent: "#d0c060",
  accentLight: "#e3d9a0",
  accentBg: "#1f1d0e",
  accentBorder: "#494322",
  shimmer: "linear-gradient(90deg,#7d733a,#d0c060,#e3d9a0,#d0c060,#7d733a)",
  btnBg: "linear-gradient(135deg,#7d733a,#d0c060)",
};

export var BIS = [
  { slot: "head", id: 250006, source: "Lightblinded Vanguard", stats: ["mastery","vers"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 250004, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250009, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250007, source: "Vorasius", stats: ["crit","haste"] },
  { slot: "waist", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", id: 240949, source: "Crafted", stats: [] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
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
  { forSlot: "hands", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 49806, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 151315, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","haste","mastery","vers"];

export var STAT_CACHE_KEY = "assa-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],49817:["haste","mastery"],
  50228:["crit","haste"],50264:["crit","haste"],151315:["crit","haste"],151318:["crit","haste"],
  151336:["crit","haste"],193701:[],240949:[],244576:[],
  249284:["crit","mastery"],249295:["crit","haste"],249312:["haste","mastery"],249321:["crit","mastery"],
  249327:["crit","haste"],249337:["crit","haste"],249343:["mastery"],249369:["haste","mastery"],
  249370:["haste","mastery"],249374:["crit","haste"],249382:["crit","mastery"],249920:["haste"],
  250004:["haste","mastery"],250006:["mastery","vers"],250007:["crit","haste"],250009:["crit","mastery"],
  250256:[],251082:["crit","mastery"],251087:["crit","haste"],251092:["haste","mastery"],
  251093:["haste","mastery"],251099:["crit","mastery"],251111:["crit","haste"],251113:["crit","mastery"],
  251115:["haste","mastery"],251135:["crit","haste"],251171:["haste","mastery"],251175:["crit","mastery"],
  251178:["crit","haste"],251190:["haste","mastery"],251217:["crit","haste"],258218:["crit","mastery"],
  258525:["crit","haste"],258575:["crit","mastery"],258577:["crit","mastery"],260423:["crit","haste"],
};

