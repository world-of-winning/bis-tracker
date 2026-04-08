export var SPEC_LABEL = "Affliction Warlock";
export var SPEC_KEY = "aff-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/affliction-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "affliction";
export var SPEC_ICON = "spell_shadow_deathcoil";
export var STORAGE_KEY = "bis-aff-lock-v1";

export var THEME = {
  accent: "#8788EE",
  accentLight: "#b7b8f5",
  accentBg: "#141424",
  accentBorder: "#2f3053",
  shimmer: "linear-gradient(90deg,#51528f,#8788EE,#b7b8f5,#8788EE,#51528f)",
  btnBg: "linear-gradient(135deg,#51528f,#8788EE)",
};

export var BIS = [
  { slot: "head", id: 250042, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250045, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
  { slot: "hands", id: 250043, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "legs", id: 250041, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249373, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 193703, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 193720, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "wrist", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "legs", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", id: 151301, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "aff-lock-stat-cache-v1";

export var KNOWN_STATS = {
  50228:["crit","haste"],50263:["haste","vers"],151300:["crit","mastery"],151301:["haste","vers"],
  151305:["haste","mastery"],151337:["crit","mastery"],193703:["crit","haste"],193710:["haste","mastery"],
  193720:["crit","mastery"],240949:[],245769:[],249283:["haste","mastery"],
  249294:["haste","mastery"],249315:["haste","mastery"],249328:["haste","mastery"],249337:["crit","haste"],
  249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],
  249373:["crit","mastery"],249920:["haste"],250041:["crit","haste"],250042:["crit","mastery"],
  250043:["crit","haste"],250045:["haste","mastery"],250144:[],250247:["haste","mastery"],
  250256:[],251093:["haste","mastery"],251102:["haste","vers"],251115:["haste","mastery"],
  251122:["haste","mastery"],251172:["crit","haste"],251190:["haste","mastery"],251201:["haste","mastery"],
  251213:["haste","mastery"],258574:["haste","vers"],258575:["crit","mastery"],258578:["haste","mastery"],
};

