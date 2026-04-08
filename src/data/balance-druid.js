export var SPEC_LABEL = "Balance Druid";
export var SPEC_KEY = "balance-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/balance-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "balance";
export var SPEC_ICON = "spell_nature_starfall";
export var STORAGE_KEY = "bis-balance-druid-v1";

export var THEME = {
  accent: "#FF7C0A",
  accentLight: "#ffb06c",
  accentBg: "#261302",
  accentBorder: "#592b04",
  shimmer: "linear-gradient(90deg,#994a06,#FF7C0A,#ffb06c,#FF7C0A,#994a06)",
  btnBg: "linear-gradient(135deg,#994a06,#FF7C0A)",
};

export var BIS = [
  { slot: "head", id: 250024, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 250022, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", id: 250027, source: "Tier", stats: ["crit","mastery"] },
  { slot: "wrist", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", id: 250025, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", id: 244573, source: "Crafted", stats: [] },
  { slot: "legs", id: 250023, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", id: 249922, source: "Chimaerus", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 251140, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "shoulder", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", id: 251190, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "chest", id: 251159, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251135, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "hands", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", id: 251130, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", id: 251121, source: "Magisters' Terrace", stats: ["mastery","vers"] },
  { slot: "finger1", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250258, source: "Maisara Caverns", stats: ["mastery"] },
  { slot: "main_hand", id: 251201, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "chest", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 151317, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { forSlot: "feet", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 251204, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "legs", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 151319, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 151315, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, source: "Vorasius", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["mastery","haste","crit","vers"];

export var STAT_CACHE_KEY = "balance-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49817:["haste","mastery"],50264:["crit","haste"],151315:["crit","haste"],
  151317:["mastery","vers"],151319:["crit","mastery"],244573:[],244576:[],
  249283:["haste","mastery"],249287:["haste","mastery"],249312:["haste","mastery"],249321:["crit","mastery"],
  249327:["crit","haste"],249343:["mastery"],249346:[],249368:["haste","mastery"],
  249369:["haste","mastery"],249370:["haste","mastery"],249382:["crit","mastery"],249922:["haste","mastery"],
  250022:["crit","mastery"],250023:["haste","mastery"],250024:["haste","mastery"],250025:["haste","vers"],
  250027:["crit","mastery"],250247:["haste","mastery"],250256:[],250258:["mastery"],
  251082:["crit","mastery"],251092:["haste","mastery"],251093:["haste","mastery"],251099:["crit","mastery"],
  251113:["crit","mastery"],251115:["haste","mastery"],251121:["mastery","vers"],251130:["crit","mastery"],
  251135:["crit","haste"],251140:["haste","mastery"],251142:["haste","mastery"],251159:["haste","mastery"],
  251171:["haste","mastery"],251190:["haste","mastery"],251201:["haste","mastery"],251204:["haste","vers"],
  251216:["haste","mastery"],251217:["crit","haste"],258438:["haste","mastery"],258472:["haste","mastery"],
  258577:["crit","mastery"],
};

