export var SPEC_LABEL = "Protection Paladin";
export var SPEC_KEY = "prot-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/protection-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_paladin_shieldofthetemplar";
export var STORAGE_KEY = "bis-prot-paladin-v1";

export var THEME = {
  accent: "#c9a227",
  accentLight: "#dfc77d",
  accentBg: "#1e1806",
  accentBorder: "#46390e",
  shimmer: "linear-gradient(90deg,#796117,#c9a227,#dfc77d,#c9a227,#796117)",
  btnBg: "linear-gradient(135deg,#796117,#c9a227)",
};

export var BIS = [
  { slot: "head", id: 271465, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271463, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271468, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271466, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268266, source: "Nymrissa Wavecaller", stats: ["haste","vers"] },
  { slot: "finger2", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268209, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 268196, source: "The Lost Explorers", stats: ["crit","haste"] },
];

export var MYTHIC = [
  { slot: "head", id: 239050, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251193, source: "The Blinding Vale", stats: ["haste","vers"] },
  { slot: "wrist", id: 159425, source: "Temple of Sethraliss", stats: ["haste","vers"] },
  { slot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 273777, source: "Altar of Fangs", stats: ["haste","vers"] },
  { slot: "finger1", id: 159459, source: "Kings' Rest", stats: ["haste","vers"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 158367, source: "Temple of Sethraliss", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { slot: "off_hand", id: 159664, source: "Temple of Sethraliss", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 193753, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "ring", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "shoulder", id: 251138, source: "Murder Row", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "waist", id: 271462, source: "Catalyst", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251196, source: "The Blinding Vale", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "weapon", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"], fit: "equivalent" },
  { forSlot: "weapon", id: 251150, source: "Den of Nalorakk", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "weapon", id: 268262, source: "Nymrissa Wavecaller", stats: ["haste","mastery"], fit: "equivalent" },
];

export var PRIORITY_STATS = [["haste"],["mastery","crit"],["vers"]];

export var STAT_CACHE_KEY = "prot-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  158367:[],158373:["crit","haste"],159413:["crit","mastery"],159418:["haste","mastery"],
  159425:["haste","vers"],159459:["haste","vers"],159664:["crit","vers"],193753:["haste","mastery"],
  193763:["crit","haste"],193767:["crit","haste"],237828:[],237834:[],
  239037:["crit","haste"],239050:["haste","vers"],249294:["haste","mastery"],250228:[],
  251126:["crit","mastery"],251138:["haste","mastery"],251142:["haste","mastery"],251150:["haste","mastery"],
  251173:["crit","haste"],251190:["haste","mastery"],251193:["haste","vers"],251195:["crit","haste"],
  251196:["crit","vers"],251214:["crit","haste"],251224:["haste","mastery"],252258:["haste","mastery"],
  268196:["crit","haste"],268209:["haste","mastery"],268211:["haste","mastery"],268222:["haste","mastery"],
  268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],268259:["crit","mastery"],
  268262:["haste","mastery"],268265:["crit"],268266:["haste","vers"],270164:[],
  270173:[],271462:["haste","mastery"],271463:["crit","mastery"],271465:["crit","mastery"],
  271466:["crit","mastery"],271468:["haste","mastery"],271878:["mastery"],273776:["crit","haste"],
  273777:["haste","vers"],273781:["crit","haste"],273792:["crit","haste"],
};

