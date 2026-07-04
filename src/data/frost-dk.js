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
  { slot: "head", id: 249970, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 249968, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249973, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", id: 249971, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249969, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", id: 249381, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "finger1", id: 193708, source: "The Great Vault", stats: ["crit","mastery"] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249344, source: "Imperator Averzian", stats: [] },
  { slot: "main_hand", id: 249277, source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151333, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { slot: "chest", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", id: 151328, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", id: 258583, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "waist", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 251118, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", id: 251107, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger1", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", id: 252420, source: "Skyreach", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 249309, source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "chest", id: 249973, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "feet", id: 249332, source: "Vorasius", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251169, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 268290, source: "Rotmire", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251175, source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258218, source: "Skyreach", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "frost-dk-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],50228:["crit","haste"],50234:["crit","mastery"],50272:["crit","haste"],
  151328:["crit","haste"],151333:["crit","mastery"],193708:["crit","mastery"],237834:[],
  239656:[],249277:["crit","mastery"],249309:["crit","haste"],249332:["haste","mastery"],
  249337:["crit","haste"],249343:["mastery"],249344:[],249368:["haste","mastery"],
  249369:["haste","mastery"],249381:["crit","mastery"],249919:["crit","mastery"],249968:["haste","vers"],
  249969:["crit","mastery"],249970:["haste","mastery"],249971:["haste","mastery"],249973:["crit","haste"],
  250256:[],251093:["haste","mastery"],251107:["haste","mastery"],251115:["haste","mastery"],
  251118:["crit","mastery"],251168:["crit","mastery"],251169:["haste","mastery"],251175:["crit","mastery"],
  251513:["crit","mastery"],252420:[],258218:["crit","mastery"],258583:["crit","mastery"],
  268289:["crit","mastery"],268290:["haste","mastery"],268291:["crit","mastery"],
};

