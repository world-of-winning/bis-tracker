export var SPEC_LABEL = "Blood Death Knight";
export var SPEC_KEY = "blood-dk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/blood-death-knight-raid-guide";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "blood";
export var SPEC_ICON = "spell_deathknight_bloodpresence";
export var STORAGE_KEY = "bis-blood-dk-v1";

export var THEME = {
  accent: "#C41E3A",
  accentLight: "#dc7889",
  accentBg: "#1d0509",
  accentBorder: "#450b14",
  shimmer: "linear-gradient(90deg,#761223,#C41E3A,#dc7889,#C41E3A,#761223)",
  btnBg: "linear-gradient(135deg,#761223,#C41E3A)",
};

export var BIS = [
  { slot: "head", id: 249970, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "neck", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", id: 249968, source: "Fallen-King Salhadaar", stats: ["haste","vers"] },
  { slot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", id: 268285, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "wrist", id: 251203, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", id: 249971, source: "Vorasius", stats: ["haste","mastery"] },
  { slot: "waist", id: 268289, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "legs", id: 249969, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "feet", id: 151330, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "finger2", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249806, source: "Belo'ren", stats: [] },
  { slot: "main_hand", id: 249277, source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", id: 151333, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", id: 251096, source: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "shoulder", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { slot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", id: 251101, source: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "wrist", id: 251203, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", id: 258583, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "waist", id: 251112, source: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "legs", id: 193706, source: "Algeth'ar Academy", stats: ["crit","vers"] },
  { slot: "feet", id: 151330, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "trinket1", id: 252418, source: "Skyreach", stats: [] },
  { slot: "trinket2", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", id: 251078, source: "Windrunner Spire", stats: ["mastery","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "back", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "chest", id: 151329, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 251118, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251205, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "neck", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "ring", id: 221200, source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "ring", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { forSlot: "ring", id: 249919, source: "Belo'ren Child of Al'ar", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["vers","crit","mastery","haste"];

export var STAT_CACHE_KEY = "blood-dk-stat-cache-v1";

export var KNOWN_STATS = {
  49823:["crit","vers"],50234:["crit","mastery"],151308:["crit","vers"],151309:["haste","vers"],
  151329:["haste","mastery"],151330:["mastery","vers"],151333:["crit","mastery"],193706:["crit","vers"],
  193708:["crit","mastery"],221200:["mastery","vers"],240950:[],241140:["mastery","vers"],
  249277:["crit","mastery"],249335:["crit","vers"],249336:["crit","vers"],249343:["mastery"],
  249806:[],249919:["crit","mastery"],249968:["haste","vers"],249969:["crit","mastery"],
  249970:["haste","mastery"],249971:["haste","mastery"],251078:["mastery","vers"],251096:["haste","vers"],
  251101:["crit","vers"],251112:["haste","vers"],251118:["crit","mastery"],251161:["crit","vers"],
  251168:["crit","mastery"],251203:["crit","vers"],251205:["crit","vers"],251513:["crit","mastery"],
  252418:[],252420:[],258583:["crit","mastery"],268285:["haste","mastery"],
  268289:["crit","mastery"],
};

