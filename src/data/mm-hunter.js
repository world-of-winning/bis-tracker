export var SPEC_LABEL = "Marksmanship Hunter";
export var SPEC_KEY = "mm-hunter";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/marksmanship-hunter-raid-guide";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "marksmanship";
export var SPEC_ICON = "ability_hunter_focusedaim";
export var STORAGE_KEY = "bis-mm-hunter-v1";

export var THEME = {
  accent: "#71b040",
  accentLight: "#aad08c",
  accentBg: "#111a0a",
  accentBorder: "#283e16",
  shimmer: "linear-gradient(90deg,#446a26,#71b040,#aad08c,#71b040,#446a26)",
  btnBg: "linear-gradient(135deg,#446a26,#71b040)",
};

export var BIS = [
  { slot: "head", id: 159374, source: "Temple of Sethraliss", stats: [] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 268231, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271876, source: "Ula'tek", stats: ["crit"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 160213, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "waist", id: 244581, source: "Crafted", stats: [] },
  { slot: "legs", id: 271491, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 268233, source: "Crafted", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
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
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 271490, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["crit"],["mastery"],["haste"],["vers"]];

export var STAT_CACHE_KEY = "mm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158370:["crit","haste"],159374:[],159375:["crit","haste"],
  159380:["crit","haste"],159388:["crit","mastery"],159637:["crit","haste"],160213:["haste","mastery"],
  193752:["crit","mastery"],239049:["crit","haste"],244581:[],244584:[],
  250228:[],251132:["crit","mastery"],251134:["crit","haste"],251136:["crit","mastery"],
  251155:["crit","mastery"],251190:["haste","mastery"],251200:["crit","haste"],251233:["crit","haste"],
  251234:["crit","mastery"],251513:["crit","mastery"],268207:["crit"],268231:["crit","mastery"],
  268233:["haste","mastery"],268249:["crit","mastery"],268253:["haste","mastery"],268258:["crit","mastery"],
  268265:["crit"],270164:[],270175:["crit"],271490:["crit","haste"],
  271491:["haste","mastery"],271876:["crit"],273782:["crit","haste"],273796:[],
};

