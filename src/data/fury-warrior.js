export var SPEC_LABEL = "Fury Warrior";
export var SPEC_KEY = "fury-warrior";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/fury-warrior-raid-guide";
export var SIMC_CLASS = "warrior";
export var SIMC_SPEC = "fury";
export var SPEC_ICON = "ability_warrior_innerrage";
export var STORAGE_KEY = "bis-fury-warrior-v1";

export var THEME = {
  accent: "#ca6040",
  accentLight: "#dfa08c",
  accentBg: "#1e0e0a",
  accentBorder: "#472216",
  shimmer: "linear-gradient(90deg,#793a26,#ca6040,#dfa08c,#ca6040,#793a26)",
  btnBg: "linear-gradient(135deg,#793a26,#ca6040)",
};

export var BIS = [
  { slot: "head", id: 249952, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 249950, source: "Tier", stats: ["haste","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 249955, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249951, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249332, source: "Vorasius", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249342, source: "Vorasius", stats: [] },
  { slot: "main_hand", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 237848, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 49819, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 151328, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", id: 251081, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251118, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", id: 251169, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 249309, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "feet", id: 251107, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251164, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249949, source: "Rotmire + Catalyst", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251105, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251175, source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258049, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "fury-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],49812:["crit","haste"],49819:["crit","haste"],50228:["crit","haste"],
  50272:["crit","haste"],151328:["crit","haste"],151332:["haste","vers"],237834:[],
  237848:[],249284:["crit","mastery"],249309:["crit","haste"],249332:["haste","mastery"],
  249337:["crit","haste"],249342:[],249343:["mastery"],249368:["haste","mastery"],
  249369:["haste","mastery"],249920:["haste"],249949:["crit","haste"],249950:["haste","mastery"],
  249951:["crit","haste"],249952:["haste","mastery"],249955:["crit","haste"],250256:[],
  251081:["crit","haste"],251093:["haste","mastery"],251105:["crit","mastery"],251107:["haste","mastery"],
  251115:["haste","mastery"],251118:["crit","mastery"],251157:["crit","haste"],251164:["haste","mastery"],
  251168:["crit","mastery"],251169:["haste","mastery"],251175:["crit","mastery"],251217:["crit","haste"],
  252420:[],258049:["crit","mastery"],258218:["crit","mastery"],260312:["crit","haste"],
  268289:["crit","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

