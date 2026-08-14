export var SPEC_LABEL = "Elemental Shaman";
export var SPEC_KEY = "ele-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/elemental-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "elemental";
export var SPEC_ICON = "spell_nature_lightning";
export var STORAGE_KEY = "bis-ele-shaman-v1";

export var THEME = {
  accent: "#0070DD",
  accentLight: "#66a9eb",
  accentBg: "#001121",
  accentBorder: "#00274d",
  shimmer: "linear-gradient(90deg,#004385,#0070DD,#66a9eb,#0070DD,#004385)",
  btnBg: "linear-gradient(135deg,#004385,#0070DD)",
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
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 270167, source: "Nymrissa Wavecaller", stats: ["haste"] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 268262, source: "Nymrissa Wavecaller", stats: ["haste","mastery"] },
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
  { slot: "trinket1", id: 273649, source: "Kings' Rest", stats: [] },
  { slot: "trinket2", id: 250224, source: "Voidscar Arena", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251150, source: "Den of Nalorakk", stats: ["haste","mastery"] },
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
  { forSlot: "weapon", id: 251224, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268209, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","crit","vers"];

export var STAT_CACHE_KEY = "ele-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159375:["crit","haste"],159380:["crit","haste"],159388:["crit","mastery"],
  160213:["haste","mastery"],193752:["crit","mastery"],239049:["crit","haste"],239656:[],
  244584:[],250224:[],251136:["crit","mastery"],251142:["haste","mastery"],
  251150:["haste","mastery"],251190:["haste","mastery"],251200:["crit","haste"],251220:["haste","mastery"],
  251224:["haste","mastery"],251228:["haste","mastery"],251233:["crit","haste"],251513:["crit","mastery"],
  252258:["haste","mastery"],268209:["haste","mastery"],268231:["crit","mastery"],268233:["haste","mastery"],
  268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268254:["haste","mastery"],268258:["crit","mastery"],268262:["haste","mastery"],268265:["crit"],
  270164:[],270167:["haste"],271092:["haste"],271481:["crit","mastery"],
  271482:["haste","vers"],271483:["crit","haste"],271484:["crit","mastery"],271876:["crit"],
  273649:[],273778:["haste","mastery"],273792:["crit","haste"],
};

