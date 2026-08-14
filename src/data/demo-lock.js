export var SPEC_LABEL = "Demonology Warlock";
export var SPEC_KEY = "demo-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/demonology-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "demonology";
export var SPEC_ICON = "spell_shadow_metamorphosis";
export var STORAGE_KEY = "bis-demo-lock-v1";

export var THEME = {
  accent: "#6d6dca",
  accentLight: "#a7a7df",
  accentBg: "#10101e",
  accentBorder: "#262647",
  shimmer: "linear-gradient(90deg,#414179,#6d6dca,#a7a7df,#6d6dca,#414179)",
  btnBg: "linear-gradient(135deg,#414179,#6d6dca)",
};

export var BIS = [
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271544, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271549, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271547, source: "Tier", stats: ["crit","haste"] },
  { slot: "waist", id: 239649, source: "Crafted", stats: [] },
  { slot: "legs", id: 271545, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "trinket2", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 268197, source: "Entombed Sentinels", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251199, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 251139, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "wrist", id: 251127, source: "Murder Row", stats: ["crit","haste"] },
  { slot: "hands", id: 159247, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "waist", id: 251222, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "legs", id: 251160, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "feet", id: 159259, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 273649, source: "Kings' Rest", stats: [] },
  { slot: "trinket2", id: 273794, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 251123, source: "Murder Row", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251219, source: "Voidscar Arena", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251191, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 268211, source: "Ula'tek & The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","crit","mastery","vers"];

export var STAT_CACHE_KEY = "demo-lock-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158373:["crit","haste"],159247:["crit","haste"],159259:["crit","haste"],
  239031:["crit","haste"],239648:[],239649:[],239664:["crit","haste"],
  251123:["crit","haste"],251127:["crit","haste"],251132:["crit","mastery"],251136:["crit","mastery"],
  251137:["haste","mastery"],251139:["crit","haste"],251160:["crit","haste"],251173:["crit","haste"],
  251190:["haste","mastery"],251191:["haste","mastery"],251195:["crit","haste"],251199:["crit","mastery"],
  251219:["crit","haste"],251222:["crit","haste"],251513:["crit","mastery"],268197:["haste","mastery"],
  268211:["haste","mastery"],268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268255:["haste","mastery"],268265:["crit"],270164:[],271092:["haste"],
  271544:["haste","vers"],271545:["haste","mastery"],271547:["crit","haste"],271549:["haste","mastery"],
  271874:["mastery"],273649:[],273781:["crit","haste"],273792:["crit","haste"],
  273794:[],273796:[],275070:["crit","haste"],
};

