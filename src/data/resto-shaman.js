export var SPEC_LABEL = "Restoration Shaman";
export var SPEC_KEY = "resto-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/restoration-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_magicimmunity";
export var STORAGE_KEY = "bis-resto-shaman-v1";

export var THEME = {
  accent: "#40a0e0",
  accentLight: "#8cc6ec",
  accentBg: "#0a1822",
  accentBorder: "#16384e",
  shimmer: "linear-gradient(90deg,#266086,#40a0e0,#8cc6ec,#40a0e0,#266086)",
  btnBg: "linear-gradient(135deg,#266086,#40a0e0)",
};

export var BIS = [
  { slot: "head", id: 271483, source: "Tier", stats: ["crit","haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271481, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 271876, source: "Ula'tek", stats: ["crit"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 271484, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 249303, source: "Lightblinded Vanguard", stats: ["crit","vers"] },
  { slot: "legs", id: 271482, source: "Tier", stats: ["haste","vers"] },
  { slot: "feet", id: 268258, source: "The Lost Explorers", stats: ["crit","mastery"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270162, source: "Nek'zali the Soulcoiler", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 251196, source: "The Blinding Vale", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 159374, source: "Temple of Sethraliss", stats: [] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251131, source: "Murder Row", stats: ["crit","vers"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 158355, source: "Kings' Rest", stats: [] },
  { slot: "wrist", id: 159380, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "hands", id: 251165, source: "The Blinding Vale", stats: ["crit","vers"] },
  { slot: "waist", id: 251155, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "legs", id: 159375, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "feet", id: 251125, source: "Murder Row", stats: ["crit","vers"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251148, source: "Den of Nalorakk", stats: ["crit","vers"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 273780, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 251196, source: "The Blinding Vale", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "feet", id: 159388, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 193752, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 268231, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 159664, source: "Temple of Sethraliss", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251186, source: "The Blinding Vale & Voidscar Arena", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251200, source: "The Blinding Vale", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","vers","mastery","haste"];

export var STAT_CACHE_KEY = "resto-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  158355:[],158366:["crit","mastery"],159374:[],159375:["crit","haste"],
  159380:["crit","haste"],159388:["crit","mastery"],159664:["crit","vers"],193752:["crit","mastery"],
  239656:[],244584:[],249303:["crit","vers"],250214:[],
  250215:[],251125:["crit","vers"],251131:["crit","vers"],251132:["crit","mastery"],
  251136:["crit","mastery"],251148:["crit","vers"],251155:["crit","mastery"],251165:["crit","vers"],
  251186:["crit","mastery"],251196:["crit","vers"],251200:["crit","haste"],251234:["crit","mastery"],
  251513:["crit","mastery"],268231:["crit","mastery"],268249:["crit","mastery"],268252:["crit","haste"],
  268258:["crit","mastery"],268265:["crit"],270162:[],270164:[],
  271092:["haste"],271481:["crit","mastery"],271482:["haste","vers"],271483:["crit","haste"],
  271484:["crit","mastery"],271876:["crit"],273780:["crit","mastery"],273792:["crit","haste"],
};

