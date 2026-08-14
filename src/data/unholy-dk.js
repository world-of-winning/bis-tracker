export var SPEC_LABEL = "Unholy Death Knight";
export var SPEC_KEY = "unholy-dk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/unholy-death-knight-raid-guide";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "unholy";
export var SPEC_ICON = "spell_deathknight_unholypresence";
export var STORAGE_KEY = "bis-unholy-dk-v1";

export var THEME = {
  accent: "#7a9b3a",
  accentLight: "#afc389",
  accentBg: "#121709",
  accentBorder: "#2b3614",
  shimmer: "linear-gradient(90deg,#495d23,#7a9b3a,#afc389,#7a9b3a,#495d23)",
  btnBg: "linear-gradient(135deg,#495d23,#7a9b3a)",
};

export var BIS = [
  { slot: "head", id: 271474, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271472, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271477, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271475, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "trinket2", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "main_hand", id: 268213, source: "The Coiled Altar", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 159412, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250228, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 273797, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251133, source: "Murder Row", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "unholy-dk-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158370:["crit","haste"],159409:["crit","haste"],159412:["crit","vers"],
  159413:["crit","mastery"],159418:["haste","mastery"],237828:[],237834:[],
  239037:["crit","haste"],250228:[],251126:["crit","mastery"],251132:["crit","mastery"],
  251133:["crit","haste"],251134:["crit","haste"],251136:["crit","mastery"],251151:["crit","mastery"],
  251190:["haste","mastery"],251234:["crit","mastery"],251513:["crit","mastery"],252258:["haste","mastery"],
  268213:["crit","mastery"],268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268259:["crit","mastery"],268265:["crit"],270173:[],270175:["crit"],
  271472:["haste","vers"],271474:["crit","mastery"],271475:["crit","mastery"],271477:["crit","mastery"],
  271878:["mastery"],273776:["crit","haste"],273782:["crit","haste"],273792:["crit","haste"],
  273797:[],
};

