export var SPEC_LABEL = "Restoration Shaman";
export var SPEC_KEY = "resto-shaman";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/restoration-shaman-raid-guide";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_magicimmunity";
export var STORAGE_KEY = "bis-resto-shaman-v1";

export var THEME = {
  accent: "#40a0e0",
  accentLight: "#8cc6ec",
  accentBg: "#0a1822",
  accentBorder: "#16384e",
  shimmer: "linear-gradient(90deg,#266086,#40a0e0,#8cc6ec,#40a0e0,#266086)",
  btnBg: "linear-gradient(135deg,#266086,#40a0e0)",
};

export var BIS = [
  { slot: "head", id: 249914, source: "Midnight Falls", stats: ["crit"] },
  { slot: "neck", id: 268291, source: "Rotmire", stats: ["crit","mastery"] },
  { slot: "shoulder", id: 249977, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "back", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", id: 249982, source: "Chimaerus", stats: ["haste","mastery"] },
  { slot: "wrist", id: 244584, source: "Crafted", stats: [] },
  { slot: "hands", id: 249980, source: "Vorasius", stats: ["crit","mastery"] },
  { slot: "waist", id: 249303, source: "Lightblinded Vanguard", stats: ["crit","vers"] },
  { slot: "legs", id: 249978, source: "Rotmire", stats: ["crit","vers"] },
  { slot: "feet", id: 268287, source: "Rotmire", stats: ["haste","mastery"] },
  { slot: "finger1", id: 249336, source: "Vorasius", stats: ["crit","vers"] },
  { slot: "finger2", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", id: 249809, source: "Crown of the Cosmos", stats: ["mastery"] },
  { slot: "main_hand", id: 249293, source: "Imperator Averzian", stats: ["crit","vers"] },
  { slot: "off_hand", id: 249275, source: "Imperator Averzian", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", id: 49824, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", id: 50233, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", id: 49823, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "chest", id: 258576, source: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", id: 151321, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", id: 151322, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "waist", id: 49810, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", id: 49811, source: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "feet", id: 193715, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", id: 151308, source: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", id: 151311, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "trinket1", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", id: 50227, source: "Skyreach", stats: ["crit","vers"] },
  { slot: "off_hand", id: 251202, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 249335, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "back", id: 251161, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "feet", id: 151320, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 244610, source: "Crafted", stats: ["crit","vers"] },
  { forSlot: "feet", id: 249377, source: "Belo'ren", stats: ["crit","haste"] },
  { forSlot: "hands", id: 249325, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 251205, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "neck", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "ring", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 193704, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 249977, source: "Tier", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249293, source: "Imperator Averzian", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251163, source: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "wrist", id: 249304, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 251079, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var PRIORITY_STATS = ["crit","vers","mastery","haste"];

export var STAT_CACHE_KEY = "resto-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49811:["crit","vers"],49823:["crit","vers"],49824:["crit","haste"],
  50227:["crit","vers"],50228:["crit","haste"],50233:["crit","haste"],151308:["crit","vers"],
  151311:["haste","vers"],151320:["haste","mastery"],151321:["crit","mastery"],151322:["mastery","vers"],
  193704:["crit","mastery"],193708:["crit","mastery"],193715:["crit","haste"],239656:[],
  244584:[],244610:["crit","vers"],249275:["crit","vers"],249293:["crit","vers"],
  249303:["crit","vers"],249304:["crit","mastery"],249325:["crit","mastery"],249335:["crit","vers"],
  249336:["crit","vers"],249337:["crit","haste"],249343:["mastery"],249377:["crit","haste"],
  249809:["mastery"],249914:["crit"],249919:["crit","mastery"],249977:["crit","haste"],
  249978:["crit","vers"],249980:["crit","mastery"],249982:["haste","mastery"],250144:[],
  250256:[],251079:["crit","mastery"],251161:["crit","vers"],251163:["crit","vers"],
  251202:["crit","vers"],251205:["crit","vers"],251513:["crit","mastery"],258576:["crit","haste"],
  268287:["haste","mastery"],268291:["crit","mastery"],
};

