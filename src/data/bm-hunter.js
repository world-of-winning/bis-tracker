export var SPEC_LABEL = "Beast Mastery Hunter";
export var SPEC_KEY = "bm-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/beast-mastery-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "beastmastery";
export var SPEC_ICON = "ability_hunter_bestialdiscipline";
export var STORAGE_KEY = "bis-bm-hunter-v1";

export var THEME = {
  accent: "#AAD372",
  accentLight: "#cce5aa",
  accentBg: "#1a2011",
  accentBorder: "#3b4a28",
  shimmer: "linear-gradient(90deg,#667f44,#AAD372,#cce5aa,#AAD372,#667f44)",
  btnBg: "linear-gradient(135deg,#667f44,#AAD372)",
};

export var BIS = [
  { slot: "head", id: 271492, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271490, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271876, source: "Ula'tek", stats: ["crit"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 271493, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 244581, source: "Crafted", stats: [] },
  { slot: "legs", id: 271491, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 268233, source: "Sszorak", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Vashnik the Malignant", stats: ["haste"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 268207, source: "Ula'tek", stats: ["crit"] },
];

export var MYTHIC = [
  { slot: "head", id: 159374, source: "Temple of Sethraliss", stats: [] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239049, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251233, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "hands", id: 193752, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "waist", id: 251155, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "legs", id: 159375, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "feet", id: 159388, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 159637, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268258, source: "The Lost Explorers", stats: ["crit","mastery"] },
  { forSlot: "head", id: 251220, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "bm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158370:["crit","haste"],159374:[],159375:["crit","haste"],
  159380:["crit","haste"],159388:["crit","mastery"],159637:["crit","haste"],193752:["crit","mastery"],
  239049:["crit","haste"],244581:[],244584:[],249920:["haste"],
  250228:[],251132:["crit","mastery"],251134:["crit","haste"],251136:["crit","mastery"],
  251155:["crit","mastery"],251190:["haste","mastery"],251200:["crit","haste"],251220:["haste","mastery"],
  251233:["crit","haste"],251234:["crit","mastery"],251513:["crit","mastery"],252258:["haste","mastery"],
  268207:["crit"],268233:["haste","mastery"],268249:["crit","mastery"],268253:["haste","mastery"],
  268258:["crit","mastery"],268265:["crit"],270164:[],270175:["crit"],
  271490:["crit","haste"],271491:["haste","mastery"],271492:["haste","mastery"],271493:["haste","vers"],
  271876:["crit"],273782:["crit","haste"],273796:[],
};

