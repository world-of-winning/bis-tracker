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
  { slot: "head", id: 249961, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", id: 249959, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { slot: "back", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", id: 249964, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 249962, source: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "waist", id: 249958, source: "Tier", stats: ["haste","mastery"] },
  { slot: "legs", id: 249960, source: "Vaelgor & Ezzorak", stats: ["crit","haste"] },
  { slot: "feet", id: 249963, source: "Tier", stats: ["haste","mastery"] },
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
  { forSlot: "chest", id: 151329, source: "The Great Vault", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 249309, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "feet", id: 249332, source: "Vorasius", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251107, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { forSlot: "waist", id: 151327, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251162, source: "Maisara Caverns", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","crit","haste","vers"];

export var STAT_CACHE_KEY = "ret-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49808:["crit","haste"],49812:["crit","haste"],49819:["crit","haste"],
  50228:["crit","haste"],50234:["crit","mastery"],50272:["crit","haste"],151327:["haste","mastery"],
  151328:["crit","haste"],151329:["haste","mastery"],151332:["haste","vers"],237834:[],
  237848:[],249309:["crit","haste"],249332:["haste","mastery"],249337:["crit","haste"],
  249342:[],249343:["mastery"],249369:["haste","mastery"],249920:["haste"],
  249958:["haste","mastery"],249959:["crit","mastery"],249960:["crit","haste"],249961:["haste","mastery"],
  249962:["haste","vers"],249963:["haste","mastery"],249964:["haste","mastery"],250256:[],
  251081:["crit","haste"],251093:["haste","mastery"],251107:["haste","mastery"],251115:["haste","mastery"],
  251118:["crit","mastery"],251157:["crit","haste"],251162:["crit","haste"],251169:["haste","mastery"],
  251217:["crit","haste"],252420:[],260312:["crit","haste"],
};

