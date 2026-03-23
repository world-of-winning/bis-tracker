export var SPEC_LABEL = "Arcane Mage";
export var SPEC_KEY = "arcane-mage";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "arcane";
export var SPEC_ICON = "spell_holy_magicalsentry";
export var STORAGE_KEY = "bis-arcane-mage-v1";

export var THEME = {
  accent: "#69CCF0",
  accentLight: "#a5e0f6",
  accentBg: "#101f24",
  accentBorder: "#254754",
  shimmer: "linear-gradient(90deg,#3f7a90,#69CCF0,#a5e0f6,#69CCF0,#3f7a90)",
  btnBg: "linear-gradient(135deg,#3f7a90,#69CCF0)",
};

export var BIS = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Palebone Robes", ko: "창백한 뼈 로브", id: 49825, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Bracers of Blazing Light", ko: "작열하는 빛의 팔보호구", id: 258580, dungeon: "Skyreach", stats: ["mastery","vers"] },
  { slot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", en: "Cord of Unraveling Reality", ko: "무너지는 현실의 장식끈", id: 151302, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", en: "Commander's Faded Breeches", ko: "사령관의 빛바랜 짧은바지", id: 251090, dungeon: "Windrunner Spire", stats: ["mastery","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Vessel of Tortured Souls", ko: "괴로워하는 영혼의 그릇", id: 250258, dungeon: "Maisara Caverns", stats: ["mastery"] },
  { slot: "trinket2", en: "Nevermelting Ice Crystal", ko: "영구결빙 수정", id: 50259, dungeon: "Pit of Saron", stats: [] },
  { slot: "main_hand", en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", id: 258514, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 151303, en: "Voidbender Robe", ko: "공허술사 로브", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251077, en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 251108, en: "Wraps of Watchful Wrath", ko: "경계하는 진노의 싸개", dungeon: "Magisters' Terrace", stats: ["mastery","vers"] },
  { forSlot: "shoulder", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", dungeon: "Nexus-Point", stats: ["haste","mastery"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "arcane-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],50259:[],
  151300:["crit","mastery"],151302:["mastery","vers"],151303:["crit","haste"],151337:["crit","mastery"],
  250258:["mastery"],251077:["crit","mastery"],251090:["mastery","vers"],251093:["haste","mastery"],
  251108:["mastery","vers"],251115:["haste","mastery"],251168:["crit","mastery"],251213:["haste","mastery"],
  251217:["crit","haste"],258514:["crit","mastery"],258575:["crit","mastery"],258578:["haste","mastery"],
  258580:["mastery","vers"],258584:["haste","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
