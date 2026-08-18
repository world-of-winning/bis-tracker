export var SPEC_LABEL = "Enhancement Shaman";
export var SPEC_KEY = "enh-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/enhancement-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "enhancement";
export var SPEC_ICON = "spell_shaman_improvedstormstrike";
export var STORAGE_KEY = "bis-enh-shaman-v1";

export var THEME = {
  accent: "#2090dd",
  accentLight: "#79bceb",
  accentBg: "#051621",
  accentBorder: "#0b324d",
  shimmer: "linear-gradient(90deg,#135685,#2090dd,#79bceb,#2090dd,#135685)",
  btnBg: "linear-gradient(135deg,#135685,#2090dd)",
};

export var BIS = [
  { slot: "head", id: 271483, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271481, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 271876, source: "Tier", stats: ["crit"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 271484, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268254, source: "Vashnik the Malignant", stats: ["haste","mastery"] },
  { slot: "legs", id: 271482, source: "Tier", stats: ["haste","vers"] },
  { slot: "feet", id: 268233, source: "Sszorak", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "trinket2", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "main_hand", id: 268209, source: "Ula'tek", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251224, source: "The Blinding Vale", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251220, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 239049, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 251233, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
  { slot: "hands", id: 160213, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "waist", id: 251228, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "legs", id: 159375, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "feet", id: 159388, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250225, source: "Kings' Rest", stats: [] },
  { slot: "trinket2", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268258, source: "The Lost Explorers", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 193752, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 268231, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251150, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268262, source: "Nymrissa Wavecaller", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["mastery"],["haste"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "enh-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159375:["crit","haste"],159380:["crit","haste"],159388:["crit","mastery"],
  160213:["haste","mastery"],193752:["crit","mastery"],239049:["crit","haste"],239656:[],
  244584:[],250225:[],251136:["crit","mastery"],251142:["haste","mastery"],
  251150:["haste","mastery"],251190:["haste","mastery"],251200:["crit","haste"],251220:["haste","mastery"],
  251224:["haste","mastery"],251228:["haste","mastery"],251233:["crit","haste"],251513:["crit","mastery"],
  252258:["haste","mastery"],268209:["haste","mastery"],268231:["crit","mastery"],268233:["haste","mastery"],
  268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268254:["haste","mastery"],268258:["crit","mastery"],268262:["haste","mastery"],268265:["crit"],
  270173:[],270175:["crit"],271481:["crit","mastery"],271482:["haste","vers"],
  271483:["crit","haste"],271484:["crit","mastery"],271876:["crit"],273778:["haste","mastery"],
  273792:["crit","haste"],273796:[],
};

