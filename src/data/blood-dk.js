export var SPEC_LABEL = "Blood Death Knight";
export var SPEC_KEY = "blood-dk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/blood-death-knight-raid-guide";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "blood";
export var SPEC_ICON = "spell_deathknight_bloodpresence";
export var STORAGE_KEY = "bis-blood-dk-v1";

export var THEME = {
  accent: "#C41E3A",
  accentLight: "#dc7889",
  accentBg: "#1d0509",
  accentBorder: "#450b14",
  shimmer: "linear-gradient(90deg,#761223,#C41E3A,#dc7889,#C41E3A,#761223)",
  btnBg: "linear-gradient(135deg,#761223,#C41E3A)",
};

export var BIS = [
  { slot: "head", id: 271474, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271472, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271475, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271473, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", id: 273777, source: "Altar of Fangs", stats: ["haste","vers"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268213, source: "The Coiled Altar", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 239050, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251193, source: "The Blinding Vale", stats: ["haste","vers"] },
  { slot: "wrist", id: 159425, source: "Temple of Sethraliss", stats: ["haste","vers"] },
  { slot: "hands", id: 251221, source: "Voidscar Arena", stats: ["mastery","vers"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 159435, source: "Temple of Sethraliss", stats: ["crit","vers"] },
  { slot: "feet", id: 273777, source: "Altar of Fangs", stats: ["haste","vers"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 251148, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "trinket1", id: 250244, source: "Den of Nalorakk", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251181, source: "The Blinding Vale", stats: ["haste","vers"] },
];

export var ALTS = [
  { forSlot: "chest", id: 193753, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
];

export var PRIORITY_STATS = ["vers","crit","mastery","haste"];

export var STAT_CACHE_KEY = "blood-dk-stat-cache-v1";

export var KNOWN_STATS = {
  159413:["crit","mastery"],159418:["haste","mastery"],159425:["haste","vers"],159435:["crit","vers"],
  159459:["haste","vers"],193753:["haste","mastery"],193763:["crit","haste"],237834:[],
  239037:["crit","haste"],239050:["haste","vers"],239656:[],250228:[],
  250244:[],251126:["crit","mastery"],251148:["crit","vers"],251173:["crit","haste"],
  251181:["haste","vers"],251193:["haste","vers"],251221:["mastery","vers"],252258:["haste","mastery"],
  268213:["crit","mastery"],268222:["haste","mastery"],268259:["crit","mastery"],268265:["crit"],
  268266:["haste","vers"],270173:[],270175:["crit"],271472:["haste","vers"],
  271473:["crit","mastery"],271474:["crit","mastery"],271475:["crit","mastery"],273777:["haste","vers"],
  273781:["crit","haste"],
};

