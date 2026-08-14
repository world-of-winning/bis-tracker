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
  { slot: "head", id: 249961, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 249959, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 249964, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 249962, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 249958, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "legs", id: 249960, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249963, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249342, source: "Vorasius", stats: [] },
  { slot: "main_hand", id: 237848, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", id: 49819, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 151328, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", id: 251081, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251118, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", id: 251169, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 49802, source: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 193763, source: "Ruby Life Pools", stats: ["crit","haste"] },
  { forSlot: "chest", id: 193753, source: "Ruby Life Pools", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 268222, source: "The Coiled Altar", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 271468, source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 268260, source: "Vashnik the Malignant", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 251214, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "legs", id: 273776, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "neck", id: 251173, source: "Den of Nalorakk", stats: ["crit","haste"] },
  { forSlot: "neck", id: 273781, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "ring", id: 252258, source: "Voidscar Arena", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 268252, source: "Sszorak", stats: ["crit","haste"] },
  { forSlot: "ring", id: 273792, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 239037, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "shoulder", id: 271463, source: "Tier", stats: ["crit","mastery"] },
  { forSlot: "waist", id: 159418, source: "Kings' Rest", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 158370, source: "Temple of Sethraliss", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251134, source: "Murder Row", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 273782, source: "Altar of Fangs", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 159409, source: "Kings' Rest", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251133, source: "Murder Row", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "ret-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49808:["crit","haste"],49819:["crit","haste"],50228:["crit","haste"],
  50272:["crit","haste"],151328:["crit","haste"],158370:["crit","haste"],159409:["crit","haste"],
  159418:["haste","mastery"],193753:["haste","mastery"],193763:["crit","haste"],237834:[],
  237848:[],239037:["crit","haste"],249337:["crit","haste"],249342:[],
  249343:["mastery"],249920:["haste"],249958:["haste","mastery"],249959:["crit","mastery"],
  249960:["crit","haste"],249961:["haste","mastery"],249962:["haste","vers"],249963:["haste","mastery"],
  249964:["haste","mastery"],250256:[],251081:["crit","haste"],251093:["haste","mastery"],
  251118:["crit","mastery"],251133:["crit","haste"],251134:["crit","haste"],251157:["crit","haste"],
  251169:["haste","mastery"],251173:["crit","haste"],251214:["crit","haste"],251217:["crit","haste"],
  252258:["haste","mastery"],252420:[],260312:["crit","haste"],268222:["haste","mastery"],
  268252:["crit","haste"],268260:["haste","mastery"],271463:["crit","mastery"],271468:["haste","mastery"],
  273776:["crit","haste"],273781:["crit","haste"],273782:["crit","haste"],273792:["crit","haste"],
};

