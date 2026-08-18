export var SPEC_LABEL = "Destruction Warlock";
export var SPEC_KEY = "destro-lock";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/destruction-warlock-raid-guide";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "destruction";
export var SPEC_ICON = "spell_shadow_rainoffire";
export var STORAGE_KEY = "bis-destro-lock-v1";

export var THEME = {
  accent: "#ca4d4d",
  accentLight: "#df9494",
  accentBg: "#1e0c0c",
  accentBorder: "#471b1b",
  shimmer: "linear-gradient(90deg,#792e2e,#ca4d4d,#df9494,#ca4d4d,#792e2e)",
  btnBg: "linear-gradient(135deg,#792e2e,#ca4d4d)",
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
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 270164, source: "The Lost Explorers", stats: [] },
  { slot: "main_hand", id: 271092, source: "Ula'tek", stats: ["haste"] },
  { slot: "off_hand", id: 268197, source: "Entombed Sentinels", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251199, source: "The Blinding Vale", stats: ["crit","mastery"] },
  { slot: "neck", id: 251234, source: "Voidscar Arena", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 239031, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 159257, source: "Temple of Sethraliss", stats: [] },
  { slot: "wrist", id: 251154, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "hands", id: 273773, source: "Altar of Fangs", stats: ["crit","mastery"] },
  { slot: "waist", id: 251222, source: "Voidscar Arena", stats: ["crit","haste"] },
  { slot: "legs", id: 193750, source: "Ruby Life Pools", stats: ["crit","mastery"] },
  { slot: "feet", id: 159259, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "finger1", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250215, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 250214, source: "The Blinding Vale", stats: [] },
  { slot: "main_hand", id: 160216, source: "Kings' Rest", stats: ["crit","mastery"] },
  { slot: "off_hand", id: 273779, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251137, source: "Murder Row", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251219, source: "Voidscar Arena", stats: ["crit","haste"] },
  { forSlot: "hands", id: 159247, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "legs", id: 159234, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "waist", id: 239664, source: "Crafted", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251191, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "Ula'tek & The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 273778, source: "Altar of Fangs", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 275070, source: "Altar of Fangs", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["haste"],["crit"],["mastery"],["vers"]];

export var STAT_CACHE_KEY = "destro-lock-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159234:["crit","mastery"],159247:["crit","haste"],159257:[],
  159259:["crit","haste"],160216:["crit","mastery"],193750:["crit","mastery"],193763:["crit","haste"],
  239031:["crit","haste"],239648:[],239649:[],239664:["crit","haste"],
  249294:["haste","mastery"],250214:[],250215:[],251136:["crit","mastery"],
  251137:["haste","mastery"],251154:["crit","mastery"],251190:["haste","mastery"],251191:["haste","mastery"],
  251199:["crit","mastery"],251219:["crit","haste"],251222:["crit","haste"],251234:["crit","mastery"],
  251513:["crit","mastery"],268197:["haste","mastery"],268211:["haste","mastery"],268249:["crit","mastery"],
  268252:["crit","haste"],268253:["haste","mastery"],268255:["haste","mastery"],268265:["crit"],
  270164:[],271092:["haste"],271544:["haste","vers"],271545:["haste","mastery"],
  271547:["crit","haste"],271549:["haste","mastery"],271874:["mastery"],273773:["crit","mastery"],
  273778:["haste","mastery"],273779:["crit","haste"],273792:["crit","haste"],275070:["crit","haste"],
};

