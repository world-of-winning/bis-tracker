export var SPEC_LABEL = "Retribution Paladin";
export var SPEC_KEY = "ret-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/retribution-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "retribution";
export var SPEC_ICON = "spell_holy_auraoflight";
export var STORAGE_KEY = "bis-ret-paladin-v1";

export var THEME = {
  accent: "#e06060",
  accentLight: "#eca0a0",
  accentBg: "#220e0e",
  accentBorder: "#4e2222",
  shimmer: "linear-gradient(90deg,#863a3a,#e06060,#eca0a0,#e06060,#863a3a)",
  btnBg: "linear-gradient(135deg,#863a3a,#e06060)",
};

export var BIS = [
  { slot: "head", id: 271465, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271463, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271468, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 268239, source: "The Lost Explorers", stats: ["crit","mastery"] },
  { slot: "hands", id: 271466, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 271462, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 268260, source: "Vashnik the Malignant", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 268249, source: "Nexus-Point Xenas", stats: ["crit","mastery"] },
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
  { forSlot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "feet", id: 273777, source: "Altar of Fangs", stats: ["haste","vers"], fit: "equivalent" },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "trinket", id: 270167, source: "Altar of Fangs", stats: ["haste"], fit: "equivalent" },
  { forSlot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"], fit: "equivalent" },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251149, source: "Den of Nalorakk", stats: ["haste","mastery"], fit: "equivalent" },
  { forSlot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["mastery"],["crit","haste"],["vers"]];

export var STAT_CACHE_KEY = "ret-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158370:["crit","haste"],159409:["crit","haste"],159412:["crit","vers"],
  159413:["crit","mastery"],159418:["haste","mastery"],193753:["haste","mastery"],193763:["crit","haste"],
  250228:[],251126:["crit","mastery"],251132:["crit","mastery"],251133:["crit","haste"],
  251134:["crit","haste"],251136:["crit","mastery"],251138:["haste","mastery"],251149:["haste","mastery"],
  251151:["crit","mastery"],251173:["crit","haste"],251190:["haste","mastery"],251513:["crit","mastery"],
  252258:["haste","mastery"],268213:["crit","mastery"],268222:["haste","mastery"],268239:["crit","mastery"],
  268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],268259:["crit","mastery"],
  268260:["haste","mastery"],268265:["crit"],270167:["haste"],270173:[],
  270175:["crit"],271462:["haste","mastery"],271463:["crit","mastery"],271465:["crit","mastery"],
  271466:["crit","mastery"],271468:["haste","mastery"],271878:["mastery"],273776:["crit","haste"],
  273777:["haste","vers"],273781:["crit","haste"],273782:["crit","haste"],273792:["crit","haste"],
  273796:[],
};

