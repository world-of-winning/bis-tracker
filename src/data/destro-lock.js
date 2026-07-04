export var SPEC_LABEL = "Destruction Warlock";
export var SPEC_KEY = "destro-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/destruction-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "destruction";
export var SPEC_ICON = "spell_shadow_rainoffire";
export var STORAGE_KEY = "bis-destro-lock-v1";

export var THEME = {
  accent: "#ca4d4d",
  accentLight: "#df9494",
  accentBg: "#1e0c0c",
  accentBorder: "#471b1b",
  shimmer: "linear-gradient(90deg,#792e2e,#ca4d4d,#df9494,#ca4d4d,#792e2e)",
  btnBg: "linear-gradient(135deg,#792e2e,#ca4d4d)",
};

export var BIS = [
  { slot: "head", id: 250042, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251085, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 250045, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 250043, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 249319, source: "Imperator Averzian", stats: ["crit","haste"] },
  { slot: "legs", id: 250041, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 268282, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "finger1", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "trinket2", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", id: 258047, source: "Skyreach", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", id: 151303, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "wrist", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", id: 151302, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 50259, source: "Pit of Saron", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 50227, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "off_hand", id: 193709, source: "Algeth'ar Academy", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "chest", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "chest", id: 268284, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249328, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249276, source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258436, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258516, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 260423, source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249315, source: "Vorasius", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["crit","haste","mastery","vers"];

export var STAT_CACHE_KEY = "destro-lock-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49812:["crit","haste"],49825:["crit","haste"],50227:["crit","vers"],
  50228:["crit","haste"],50259:[],151300:["crit","mastery"],151302:["mastery","vers"],
  151303:["crit","haste"],151305:["haste","mastery"],151337:["crit","mastery"],193708:["crit","mastery"],
  193709:["crit","haste"],193710:["haste","mastery"],239648:[],239656:[],
  239664:["crit","haste"],249276:["crit","haste"],249283:["haste","mastery"],249294:["haste","mastery"],
  249315:["haste","mastery"],249319:["crit","haste"],249328:["haste","mastery"],249337:["crit","haste"],
  249343:["mastery"],249346:[],249369:["haste","mastery"],249919:["crit","mastery"],
  250041:["crit","haste"],250042:["crit","mastery"],250043:["crit","haste"],250045:["haste","mastery"],
  250247:["haste","mastery"],250256:[],251085:["crit","mastery"],251093:["haste","mastery"],
  251115:["haste","mastery"],251122:["haste","mastery"],251172:["crit","haste"],251213:["haste","mastery"],
  251217:["crit","haste"],251513:["crit","mastery"],258047:["haste","mastery"],258436:["haste","mastery"],
  258516:["crit","vers"],258574:["haste","vers"],258575:["crit","mastery"],258578:["haste","mastery"],
  258584:["haste","mastery"],260423:["crit","haste"],268282:["crit","mastery"],268284:["haste","mastery"],
  268287:["haste","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

