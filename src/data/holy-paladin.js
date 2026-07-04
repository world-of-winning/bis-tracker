export var SPEC_LABEL = "Holy Paladin";
export var SPEC_KEY = "holy-paladin";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/holy-paladin-raid-guide";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "holy";
export var SPEC_ICON = "spell_holy_holybolt";
export var STORAGE_KEY = "bis-holy-paladin-v1";

export var THEME = {
  accent: "#F48CBA",
  accentLight: "#f8bad6",
  accentBg: "#25151c",
  accentBorder: "#553141",
  shimmer: "linear-gradient(90deg,#925470,#F48CBA,#f8bad6,#F48CBA,#925470)",
  btnBg: "linear-gradient(135deg,#925470,#F48CBA)",
};

export var BIS = [
  { slot: "head", id: 249961, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 251164, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249964, source: "Tier", stats: ["haste","mastery"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 249962, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249960, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", id: 249332, source: "Vorasius", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "finger2", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249809, source: "Windrunner Spire", stats: ["mastery"] },
  { slot: "main_hand", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 258531, source: "Algeth'ar Academy", stats: ["mastery","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 258579, source: "Skyreach", stats: ["mastery","vers"] },
  { slot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", id: 251164, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 251206, source: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "chest", id: 151329, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "wrist", id: 263193, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "hands", id: 151332, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "waist", id: 151327, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "legs", id: 251208, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "feet", id: 251107, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger1", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 193710, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 258531, source: "Algeth'ar Academy", stats: ["mastery","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 239661, source: "Crafted", stats: ["mastery","vers"] },
  { forSlot: "chest", id: 268285, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249963, source: "Catalyst", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251169, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 249958, source: "Catalyst", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var PRIORITY_STATS = ["mastery","haste","vers","crit"];

export var STAT_CACHE_KEY = "holy-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  151309:["haste","vers"],151327:["haste","mastery"],151329:["haste","mastery"],151332:["haste","vers"],
  193710:["haste","mastery"],193718:[],221200:["mastery","vers"],237834:[],
  239656:[],239661:["mastery","vers"],249287:["haste","mastery"],249294:["haste","mastery"],
  249332:["haste","mastery"],249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],
  249809:["mastery"],249958:["haste","mastery"],249960:["crit","haste"],249961:["haste","mastery"],
  249962:["haste","vers"],249963:["haste","mastery"],249964:["haste","mastery"],250256:[],
  251093:["haste","mastery"],251096:["haste","vers"],251107:["haste","mastery"],251115:["haste","mastery"],
  251122:["haste","mastery"],251164:["haste","mastery"],251169:["haste","mastery"],251206:["mastery","vers"],
  251208:["haste","vers"],258531:["mastery","vers"],258579:["mastery","vers"],263193:["haste","mastery"],
  268285:["haste","mastery"],268289:["crit","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

