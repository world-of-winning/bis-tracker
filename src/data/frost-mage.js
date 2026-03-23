export var SPEC_LABEL = "Frost Mage";
export var SPEC_KEY = "frost-mage";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "frost";
export var SPEC_ICON = "spell_frost_frostbolt02";
export var STORAGE_KEY = "bis-frost-mage-v1";

export var THEME = {
  accent: "#3FC7EB",
  accentLight: "#8cddf3",
  accentBg: "#091e23",
  accentBorder: "#164652",
  shimmer: "linear-gradient(90deg,#26778d,#3FC7EB,#8cddf3,#3FC7EB,#26778d)",
  btnBg: "linear-gradient(135deg,#26778d,#3FC7EB)",
};

export var BIS = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Mantle of Dark Devotion", ko: "어둠의 헌신의 어깨덧옷", id: 251085, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Bronze Challenger's Robe", ko: "청동 도전자의 로브", id: 193720, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Wraps of Watchful Wrath", ko: "경계하는 진노의 싸개", id: 251108, dungeon: "Magisters' Terrace", stats: ["mastery","vers"] },
  { slot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", en: "Cord of Unraveling Reality", ko: "무너지는 현실의 장식끈", id: 151302, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, dungeon: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Vessel of Tortured Souls", ko: "괴로워하는 영혼의 그릇", id: 250258, dungeon: "Maisara Caverns", stats: ["mastery"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", id: 258514, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 251077, en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "ring", id: 251093, en: "Omission of Light", ko: "소외된 빛", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 258580, en: "Bracers of Blazing Light", ko: "작열하는 빛의 팔보호구", dungeon: "Skyreach", stats: ["mastery","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "frost-mage-stat-cache-v1";

export var KNOWN_STATS = {
  50228:["crit","haste"],151300:["crit","mastery"],151302:["mastery","vers"],151337:["crit","mastery"],
  193708:["crit","mastery"],193720:["crit","mastery"],250144:[],250258:["mastery"],
  251077:["crit","mastery"],251085:["crit","mastery"],251093:["haste","mastery"],251108:["mastery","vers"],
  251115:["haste","mastery"],251168:["crit","mastery"],258514:["crit","mastery"],258574:["haste","vers"],
  258575:["crit","mastery"],258580:["mastery","vers"],258584:["haste","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
