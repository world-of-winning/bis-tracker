export var SPEC_LABEL = "Feral Druid";
export var SPEC_KEY = "feral-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/feral-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "feral";
export var SPEC_ICON = "ability_druid_catform";
export var STORAGE_KEY = "bis-feral-druid-v1";

export var THEME = {
  accent: "#d4a017",
  accentLight: "#e5c674",
  accentBg: "#201803",
  accentBorder: "#4a3808",
  shimmer: "linear-gradient(90deg,#7f600e,#d4a017,#e5c674,#d4a017,#7f600e)",
  btnBg: "linear-gradient(135deg,#7f600e,#d4a017)",
};

export var BIS = [
  { slot: "head", id: 271875, source: "Ula'tek", stats: ["haste"] },
  { slot: "neck", id: 268265, source: "Ula'tek", stats: ["crit"] },
  { slot: "shoulder", id: 271526, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 268253, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "chest", id: 271531, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271529, source: "Tier", stats: ["mastery","vers"] },
  { slot: "waist", id: 268256, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "legs", id: 249312, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 268249, source: "Vashnik the Malignant", stats: ["crit","mastery"] },
  { slot: "finger2", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 270173, source: "The Coiled Altar", stats: [] },
  { slot: "trinket2", id: 270175, source: "Ula'tek", stats: ["crit"] },
  { slot: "main_hand", id: 268215, source: "Ula'tek", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 271528, source: "Tier", stats: ["haste","vers"] },
  { slot: "neck", id: 251142, source: "Murder Row", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 271526, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 251132, source: "Murder Row", stats: ["crit","mastery"] },
  { slot: "chest", id: 271531, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 271529, source: "Tier", stats: ["mastery","vers"] },
  { slot: "waist", id: 159317, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { slot: "legs", id: 271527, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 244569, source: "Crafted", stats: [] },
  { slot: "finger1", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { slot: "finger2", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { slot: "trinket1", id: 273796, source: "Altar of Fangs", stats: [] },
  { slot: "trinket2", id: 250228, source: "Murder Row", stats: [] },
  { slot: "main_hand", id: 273783, source: "Altar of Fangs", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, source: "The Blinding Vale", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 159337, source: "Temple of Sethraliss", stats: ["mastery","vers"] },
  { forSlot: "neck", id: 268251, source: "The Twin Fangs", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 158366, source: "Temple of Sethraliss", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251136, source: "Murder Row", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 159636, source: "Temple of Sethraliss", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249277, source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251149, source: "Den of Nalorakk", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = [["mastery"],["haste"],["crit"],["vers"]];

export var STAT_CACHE_KEY = "feral-druid-stat-cache-v1";

export var KNOWN_STATS = {
  158366:["crit","mastery"],159317:["haste","mastery"],159337:["mastery","vers"],159636:["haste","mastery"],
  244569:[],244576:[],249277:["crit","mastery"],249312:["haste","mastery"],
  250228:[],251132:["crit","mastery"],251136:["crit","mastery"],251142:["haste","mastery"],
  251149:["haste","mastery"],251190:["haste","mastery"],251513:["crit","mastery"],252258:["haste","mastery"],
  268215:["mastery"],268249:["crit","mastery"],268251:["haste","mastery"],268252:["crit","haste"],
  268253:["haste","mastery"],268256:["haste","mastery"],268265:["crit"],270173:[],
  270175:["crit"],271526:["crit","mastery"],271527:["crit","haste"],271528:["haste","vers"],
  271529:["mastery","vers"],271531:["crit","haste"],271875:["haste"],273783:["haste","mastery"],
  273792:["crit","haste"],273796:[],
};

