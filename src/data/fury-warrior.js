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
  { slot: "head", id: 271456, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271454, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271459, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271457, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 268260, source: "Vashnik the Malignant", stats: ["haste","mastery"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268213, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 237848, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 251138, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 193753, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251133, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 159412, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "off_hand", id: 193755, source: "Ruby Life Pools", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 160216, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251186, source: "The Blinding Vale & Voidscar Arena", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 268196, source: "The Lost Explorers", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273780, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["haste"],["mastery"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "fury-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158373:["crit","haste"],159409:["crit","haste"],159412:["crit","vers"],
  159413:["crit","mastery"],159418:["haste","mastery"],160216:["crit","mastery"],193753:["haste","mastery"],
  193755:["crit","haste"],193763:["crit","haste"],193767:["crit","haste"],237834:[],
  237848:[],250228:[],251126:["crit","mastery"],251133:["crit","haste"],
  251136:["crit","mastery"],251138:["haste","mastery"],251142:["haste","mastery"],251151:["crit","mastery"],
  251186:["crit","mastery"],251190:["haste","mastery"],251195:["crit","haste"],251214:["crit","haste"],
  251513:["crit","mastery"],252258:["haste","mastery"],268196:["crit","haste"],268213:["crit","mastery"],
  268222:["haste","mastery"],268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],
  268253:["haste","mastery"],268259:["crit","mastery"],268260:["haste","mastery"],268265:["crit"],
  270173:[],270175:["crit"],271454:["crit","mastery"],271456:["crit","haste"],
  271457:["crit","haste"],271459:["crit","mastery"],271878:["mastery"],273776:["crit","haste"],
  273780:["crit","mastery"],273782:["crit","haste"],273792:["crit","haste"],273796:[],
  275070:["crit","haste"],
};

