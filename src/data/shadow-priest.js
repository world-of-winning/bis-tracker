export var SPEC_LABEL = "Shadow Priest";
export var SPEC_KEY = "shadow-priest";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/shadow-priest-raid-guide";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "shadow";
export var SPEC_ICON = "spell_shadow_shadowwordpain";
export var STORAGE_KEY = "bis-shadow-priest-v1";

export var THEME = {
  accent: "#8080ca",
  accentLight: "#b3b3df",
  accentBg: "#13131e",
  accentBorder: "#2d2d47",
  shimmer: "linear-gradient(90deg,#4d4d79,#8080ca,#b3b3df,#8080ca,#4d4d79)",
  btnBg: "linear-gradient(135deg,#4d4d79,#8080ca)",
};

export var BIS = [
  { slot: "head", id: 271874, source: "Ula'tek", stats: ["mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271553, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271558, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271556, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { slot: "legs", id: 271554, source: "Tier", stats: ["haste","vers"] },
  { slot: "feet", id: 268255, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "finger1", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { slot: "finger2", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 268197, source: "Entombed Sentinels", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251199, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 271553, source: "Tier", stats: ["crit","haste"] },
  { slot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { slot: "chest", id: 271558, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", id: 271556, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { slot: "legs", id: 271554, source: "Tier", stats: ["haste","vers"] },
  { slot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250224, source: "Voidscar Arena", stats: [] },
  { slot: "main_hand", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 251191, source: "The Blinding Vale", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "hands", id: 273773, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "waist", id: 251222, source: "Voidscar Arena", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["haste"],["mastery"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "shadow-priest-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],239031:["crit","haste"],239648:[],239664:["crit","haste"],
  250215:[],250224:[],251136:["crit","mastery"],251137:["haste","mastery"],
  251142:["haste","mastery"],251190:["haste","mastery"],251191:["haste","mastery"],251199:["crit","mastery"],
  251222:["crit","haste"],251513:["crit","mastery"],252258:["haste","mastery"],268197:["haste","mastery"],
  268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268255:["haste","mastery"],268265:["crit"],270164:[],271092:["haste"],
  271553:["crit","haste"],271554:["haste","vers"],271556:["crit","mastery"],271558:["crit","mastery"],
  271874:["mastery"],273773:["crit","mastery"],273778:["haste","mastery"],273792:["crit","haste"],
};

