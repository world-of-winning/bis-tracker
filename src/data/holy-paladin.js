export var SPEC_LABEL = "Holy Paladin";
export var SPEC_KEY = "holy-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/holy-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "holy";
export var SPEC_ICON = "spell_holy_holybolt";
export var STORAGE_KEY = "bis-holy-paladin-v1";

export var THEME = {
  accent: "#F48CBA",
  accentLight: "#f8bad6",
  accentBg: "#25151c",
  accentBorder: "#553141",
  shimmer: "linear-gradient(90deg,#925470,#F48CBA,#f8bad6,#F48CBA,#925470)",
  btnBg: "linear-gradient(135deg,#925470,#F48CBA)",
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
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 268262, source: "Nymrissa Wavecaller", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251138, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 159412, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "trinket2", id: 273649, source: "Kings' Rest", stats: [] },
  { slot: "main_hand", id: 160216, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 251150, source: "Den of Nalorakk", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 193753, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268209, source: "Ula'tek", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273780, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251133, source: "Murder Row", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","haste","vers","crit"];

export var STAT_CACHE_KEY = "holy-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159409:["crit","haste"],159412:["crit","vers"],159413:["crit","mastery"],
  159418:["haste","mastery"],160216:["crit","mastery"],193753:["haste","mastery"],237828:[],
  237834:[],249294:["haste","mastery"],250214:[],251126:["crit","mastery"],
  251132:["crit","mastery"],251133:["crit","haste"],251136:["crit","mastery"],251138:["haste","mastery"],
  251150:["haste","mastery"],251151:["crit","mastery"],251190:["haste","mastery"],251224:["haste","mastery"],
  251234:["crit","mastery"],251513:["crit","mastery"],268209:["haste","mastery"],268211:["haste","mastery"],
  268222:["haste","mastery"],268249:["crit","mastery"],268253:["haste","mastery"],268259:["crit","mastery"],
  268262:["haste","mastery"],268265:["crit"],270164:[],270167:["haste"],
  271463:["crit","mastery"],271465:["crit","mastery"],271466:["crit","mastery"],271468:["haste","mastery"],
  271878:["mastery"],273649:[],273776:["crit","haste"],273780:["crit","mastery"],
};

