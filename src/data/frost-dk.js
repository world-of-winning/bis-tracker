export var SPEC_LABEL = "Frost Death Knight";
export var SPEC_KEY = "frost-dk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/frost-death-knight-raid-guide";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "frost";
export var SPEC_ICON = "spell_deathknight_frostpresence";
export var STORAGE_KEY = "bis-frost-dk-v1";

export var THEME = {
  accent: "#4d9dca",
  accentLight: "#94c4df",
  accentBg: "#0c181e",
  accentBorder: "#1b3747",
  shimmer: "linear-gradient(90deg,#2e5e79,#4d9dca,#94c4df,#4d9dca,#2e5e79)",
  btnBg: "linear-gradient(135deg,#2e5e79,#4d9dca)",
};

export var BIS = [
  { slot: "head", id: 271474, source: "Tier", stats: ["crit","mastery"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271472, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271477, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 271475, source: "Tier", stats: ["crit","mastery"] },
  { slot: "waist", id: 268259, source: "The Coiled Altar", stats: ["crit","mastery"] },
  { slot: "legs", id: 271878, source: "Ula'tek", stats: ["mastery"] },
  { slot: "feet", id: 237828, source: "Crafted", stats: [] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "trinket2", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "main_hand", id: 268209, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 268202, source: "Ula'tek", stats: ["haste"] },
];

export var MYTHIC = [
  { slot: "head", id: 251126, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { slot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { slot: "chest", id: 251151, source: "Den of Nalorakk", stats: ["crit","mastery"] },
  { slot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
  { slot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { slot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { slot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "feet", id: 159412, source: "Kings' Rest", stats: ["crit","vers"] },
  { slot: "finger1", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "finger2", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 250228, source: "Murder Row", stats: [] },
  { slot: "trinket2", id: 273797, source: "Altar of Fangs", stats: [] },
  { slot: "main_hand", id: 158373, source: "Temple of Sethraliss", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 159413, source: "Kings' Rest", stats: ["crit","mastery"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193767, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251195, source: "The Blinding Vale", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251224, source: "Den of Nalorakk", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 268211, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 251133, source: "Murder Row", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = [["mastery"],["crit"],["haste"],["vers"]];

export var STAT_CACHE_KEY = "frost-dk-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],158373:["crit","haste"],159409:["crit","haste"],159412:["crit","vers"],
  159413:["crit","mastery"],159418:["haste","mastery"],193763:["crit","haste"],193767:["crit","haste"],
  237828:[],237834:[],239037:["crit","haste"],250228:[],
  251126:["crit","mastery"],251133:["crit","haste"],251136:["crit","mastery"],251151:["crit","mastery"],
  251173:["crit","haste"],251190:["haste","mastery"],251195:["crit","haste"],251214:["crit","haste"],
  251224:["haste","mastery"],251513:["crit","mastery"],268202:["haste"],268209:["haste","mastery"],
  268211:["haste","mastery"],268249:["crit","mastery"],268252:["crit","haste"],268253:["haste","mastery"],
  268259:["crit","mastery"],268265:["crit"],270173:[],270175:["crit"],
  271472:["haste","vers"],271474:["crit","mastery"],271475:["crit","mastery"],271477:["crit","mastery"],
  271878:["mastery"],273776:["crit","haste"],273781:["crit","haste"],273792:["crit","haste"],
  273797:[],
};

