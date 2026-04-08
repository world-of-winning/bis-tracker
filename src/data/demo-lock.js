export var SPEC_LABEL = "Demonology Warlock";
export var SPEC_KEY = "demo-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/demonology-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "demonology";
export var SPEC_ICON = "spell_shadow_metamorphosis";
export var STORAGE_KEY = "bis-demo-lock-v1";

export var THEME = {
  accent: "#6d6dca",
  accentLight: "#a7a7df",
  accentBg: "#10101e",
  accentBorder: "#262647",
  shimmer: "linear-gradient(90deg,#414179,#6d6dca,#a7a7df,#6d6dca,#414179)",
  btnBg: "linear-gradient(135deg,#414179,#6d6dca)",
};

export var BIS = [
  { slot: "head", id: 250042, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 250045, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 250043, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 250039, source: "Tier", stats: ["crit","mastery"] },
  { slot: "legs", id: 250041, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249305, source: "Vaelgor & Ezzorak", stats: ["crit","haste"] },
  { slot: "finger1", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "finger2", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", id: 249809, source: "Crown of the Cosmos", stats: ["mastery"] },
  { slot: "trinket2", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
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
  { slot: "trinket1", id: 250223, source: "Maisara Caverns", stats: [] },
  { slot: "trinket2", id: 50259, source: "Pit of Saron", stats: [] },
  { slot: "main_hand", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249922, source: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["haste","crit","mastery","vers"];

export var STAT_CACHE_KEY = "demo-lock-stat-cache-v1";

export var KNOWN_STATS = {
  50228:["crit","haste"],50259:[],50263:["haste","vers"],151300:["crit","mastery"],
  151301:["haste","vers"],151305:["haste","mastery"],151337:["crit","mastery"],193703:["crit","haste"],
  193708:["crit","mastery"],193710:["haste","mastery"],193720:["crit","mastery"],239648:[],
  239656:[],249283:["haste","mastery"],249294:["haste","mastery"],249305:["crit","haste"],
  249315:["haste","mastery"],249328:["haste","mastery"],249337:["crit","haste"],249368:["haste","mastery"],
  249369:["haste","mastery"],249809:["mastery"],249919:["crit","mastery"],249920:["haste"],
  249922:["haste","mastery"],250039:["crit","mastery"],250041:["crit","haste"],250042:["crit","mastery"],
  250043:["crit","haste"],250045:["haste","mastery"],250144:[],250223:[],
  250247:["haste","mastery"],251085:["crit","mastery"],251093:["haste","mastery"],251102:["haste","vers"],
  251115:["haste","mastery"],251122:["haste","mastery"],251172:["crit","haste"],251201:["haste","mastery"],
  251213:["haste","mastery"],251513:["crit","mastery"],258472:["haste","mastery"],258574:["haste","vers"],
  258575:["crit","mastery"],258578:["haste","mastery"],
};

