export var SPEC_LABEL = "Arms Warrior";
export var SPEC_KEY = "arms-warrior";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/arms-warrior-raid-guide";
export var SIMC_CLASS = "warrior";
export var SIMC_SPEC = "arms";
export var SPEC_ICON = "ability_warrior_savageblow";
export var STORAGE_KEY = "bis-arms-warrior-v1";

export var THEME = {
  accent: "#C69B6D",
  accentLight: "#ddc3a7",
  accentBg: "#1e1710",
  accentBorder: "#453626",
  shimmer: "linear-gradient(90deg,#775d41,#C69B6D,#ddc3a7,#C69B6D,#775d41)",
  btnBg: "linear-gradient(135deg,#775d41,#C69B6D)",
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
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268213, source: "The Coiled Altar", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
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
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193761, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251123, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","crit","mastery","vers"];

export var STAT_CACHE_KEY = "arms-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158370:["crit","haste"],159409:["crit","haste"],159412:["crit","vers"],
  159413:["crit","mastery"],159418:["haste","mastery"],193753:["haste","mastery"],193761:["crit","mastery"],
  193763:["crit","haste"],237828:[],237834:[],250228:[],
  251123:["crit","haste"],251126:["crit","mastery"],251133:["crit","haste"],251134:["crit","haste"],
  251136:["crit","mastery"],251138:["haste","mastery"],251151:["crit","mastery"],251173:["crit","haste"],
  251190:["haste","mastery"],251214:["crit","haste"],251513:["crit","mastery"],252258:["haste","mastery"],
  268213:["crit","mastery"],268222:["haste","mastery"],268249:["crit","mastery"],268252:["crit","haste"],
  268253:["haste","mastery"],268259:["crit","mastery"],268265:["crit"],270173:[],
  270175:["crit"],271454:["crit","mastery"],271456:["crit","haste"],271457:["crit","haste"],
  271459:["crit","mastery"],271878:["mastery"],273776:["crit","haste"],273781:["crit","haste"],
  273782:["crit","haste"],273792:["crit","haste"],273796:[],
};

