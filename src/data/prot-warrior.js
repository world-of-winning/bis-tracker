export var SPEC_LABEL = "Protection Warrior";
export var SPEC_KEY = "prot-warrior";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/protection-warrior-raid-guide";
export var SIMC_CLASS = "warrior";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_warrior_defensivestance";
export var STORAGE_KEY = "bis-prot-warrior-v1";

export var THEME = {
  accent: "#8b7040",
  accentLight: "#b9a98c",
  accentBg: "#15110a",
  accentBorder: "#312716",
  shimmer: "linear-gradient(90deg,#534326,#8b7040,#b9a98c,#8b7040,#534326)",
  btnBg: "linear-gradient(135deg,#534326,#8b7040)",
};

export var BIS = [
  { slot: "head", id: 249952, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 249950, source: "Tier", stats: ["haste","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249955, source: "Rotmire + Catalyst", stats: ["crit","haste"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "waist", id: 249949, source: "Rotmire + Catalyst", stats: ["crit","haste"] },
  { slot: "legs", id: 249951, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249954, source: "Tier", stats: ["crit","haste"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249806, source: "Belo'ren", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249295, source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { slot: "off_hand", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 49819, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 251203, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", id: 251081, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251208, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "feet", id: 251091, source: "Windrunner Spire", stats: ["crit","vers"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "off_hand", id: 258049, source: "Skyreach", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 249309, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251164, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "prot-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49808:["crit","haste"],49812:["crit","haste"],49819:["crit","haste"],
  50228:["crit","haste"],50272:["crit","haste"],151332:["haste","vers"],237834:[],
  239656:[],249284:["crit","mastery"],249295:["crit","haste"],249309:["crit","haste"],
  249337:["crit","haste"],249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],
  249806:[],249920:["haste"],249949:["crit","haste"],249950:["haste","mastery"],
  249951:["crit","haste"],249952:["haste","mastery"],249954:["crit","haste"],249955:["crit","haste"],
  250247:["haste","mastery"],250256:[],251081:["crit","haste"],251091:["crit","vers"],
  251093:["haste","mastery"],251105:["crit","mastery"],251111:["crit","haste"],251115:["haste","mastery"],
  251157:["crit","haste"],251164:["haste","mastery"],251175:["crit","mastery"],251178:["crit","haste"],
  251203:["crit","vers"],251208:["haste","vers"],251217:["crit","haste"],252420:[],
  258049:["crit","mastery"],258525:["crit","haste"],260312:["crit","haste"],260423:["crit","haste"],
  268290:["haste","mastery"],
};

