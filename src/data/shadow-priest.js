export var SPEC_LABEL = "Shadow Priest";
export var SPEC_KEY = "shadow-priest";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/shadow-priest-raid-guide";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "shadow";
export var SPEC_ICON = "spell_shadow_shadowwordpain";
export var STORAGE_KEY = "bis-shadow-priest-v1";

export var THEME = {
  accent: "#8080ca",
  accentLight: "#b3b3df",
  accentBg: "#13131e",
  accentBorder: "#2d2d47",
  shimmer: "linear-gradient(90deg,#4d4d79,#8080ca,#b3b3df,#8080ca,#4d4d79)",
  btnBg: "linear-gradient(135deg,#4d4d79,#8080ca)",
};

export var BIS = [
  { slot: "head", id: 250051, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250049, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250054, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", id: 249319, source: "Imperator Averzian", stats: ["crit","haste"] },
  { slot: "legs", id: 250050, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 151303, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "wrist", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250258, source: "Maisara Caverns", stats: ["mastery"] },
  { slot: "main_hand", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "off_hand", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "chest", id: 268284, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "head", id: 193703, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { forSlot: "waist", id: 251102, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249922, source: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251111, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "shadow-priest-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],50263:["haste","vers"],
  151303:["crit","haste"],151305:["haste","mastery"],151337:["crit","mastery"],193703:["crit","haste"],
  239648:[],239664:["crit","haste"],245769:[],249283:["haste","mastery"],
  249287:["haste","mastery"],249295:["crit","haste"],249315:["haste","mastery"],249319:["crit","haste"],
  249328:["haste","mastery"],249337:["crit","haste"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249920:["haste"],
  249922:["haste","mastery"],250049:["crit","mastery"],250050:["haste","mastery"],250051:["crit","haste"],
  250054:["haste","mastery"],250247:["haste","mastery"],250256:[],250258:["mastery"],
  251085:["crit","mastery"],251093:["haste","mastery"],251102:["haste","vers"],251111:["crit","haste"],
  251115:["haste","mastery"],251172:["crit","haste"],251178:["crit","haste"],251190:["haste","mastery"],
  251213:["haste","mastery"],258436:["haste","mastery"],258472:["haste","mastery"],258525:["crit","haste"],
  258574:["haste","vers"],258578:["haste","mastery"],258584:["haste","mastery"],260312:["crit","haste"],
  268284:["haste","mastery"],268287:["haste","mastery"],268290:["haste","mastery"],
};

