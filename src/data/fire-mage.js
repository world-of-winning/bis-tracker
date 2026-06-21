export var SPEC_LABEL = "Fire Mage";
export var SPEC_KEY = "fire-mage";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/fire-mage-raid-guide";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "fire";
export var SPEC_ICON = "spell_fire_firebolt02";
export var STORAGE_KEY = "bis-fire-mage-v1";

export var THEME = {
  accent: "#ca5030",
  accentLight: "#df9683",
  accentBg: "#1e0c07",
  accentBorder: "#471c11",
  shimmer: "linear-gradient(90deg,#79301d,#ca5030,#df9683,#ca5030,#79301d)",
  btnBg: "linear-gradient(135deg,#79301d,#ca5030)",
};

export var BIS = [
  { slot: "head", id: 250060, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250058, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 268284, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 250061, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 249376, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "legs", id: 250059, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 250062, source: "Tier", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249286, source: "Midnight Falls", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 193707, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 151303, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "chest", id: 250063, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","mastery","vers","crit"];

export var STAT_CACHE_KEY = "fire-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49825:["crit","haste"],50263:["haste","vers"],151303:["crit","haste"],151305:["haste","mastery"],
  151309:["haste","vers"],151337:["crit","mastery"],193707:["haste","mastery"],239648:[],
  239656:[],249286:["mastery"],249315:["haste","mastery"],249328:["haste","mastery"],
  249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],
  249376:["haste","mastery"],249920:["haste"],250058:["haste","vers"],250059:["crit","haste"],
  250060:["haste","mastery"],250061:["haste","mastery"],250062:["haste","mastery"],250063:["crit","haste"],
  250144:[],250247:["haste","mastery"],250256:[],251093:["haste","mastery"],
  251096:["haste","vers"],251102:["haste","vers"],251115:["haste","mastery"],251172:["crit","haste"],
  251190:["haste","mastery"],251201:["haste","mastery"],251213:["haste","mastery"],258047:["haste","mastery"],
  258574:["haste","vers"],258578:["haste","mastery"],258584:["haste","mastery"],260312:["crit","haste"],
  268284:["haste","mastery"],268287:["haste","mastery"],268290:["haste","mastery"],
};

