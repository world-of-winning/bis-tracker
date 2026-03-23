export var SPEC_LABEL = "Destruction Warlock";
export var SPEC_KEY = "destro-lock";
export var SIMC_CLASS = "warlock";
export var SIMC_SPEC = "destruction";
export var SPEC_ICON = "spell_shadow_rainoffire";
export var STORAGE_KEY = "bis-destro-lock-v1";

export var THEME = {
  accent: "#ca4d4d",
  accentLight: "#df9494",
  accentBg: "#1e0c0c",
  accentBorder: "#471b1b",
  shimmer: "linear-gradient(90deg,#792e2e,#ca4d4d,#df9494,#ca4d4d,#792e2e)",
  btnBg: "linear-gradient(135deg,#792e2e,#ca4d4d)",
};

export var BIS = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Voidbender Robe", ko: "공허술사 로브", id: 151303, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", en: "Cord of Unraveling Reality", ko: "무너지는 현실의 장식끈", id: 151302, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, dungeon: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, dungeon: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Nevermelting Ice Crystal", ko: "영구결빙 수정", id: 50259, dungeon: "Pit of Saron", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "main_hand", en: "Surgeon's Needle", ko: "외과의사의 바늘", id: 50227, dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "off_hand", en: "Vexamus' Expulsion Rod", ko: "벡사무스의 배출 마법봉", id: 193709, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "chest", id: 49825, en: "Palebone Robes", ko: "창백한 뼈 로브", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251163, en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat", stats: ["crit","vers"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", dungeon: "Nexus-Point", stats: ["haste","mastery"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "destro-lock-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49825:["crit","haste"],50227:["crit","vers"],50228:["crit","haste"],
  50259:[],51802:["crit","haste"],151300:["crit","mastery"],151302:["mastery","vers"],
  151303:["crit","haste"],151305:["haste","mastery"],151337:["crit","mastery"],193709:["crit","haste"],
  193717:["crit","vers"],193723:["crit","vers"],251093:["haste","mastery"],251115:["haste","mastery"],
  251163:["crit","vers"],251213:["haste","mastery"],251217:["crit","haste"],258516:["crit","vers"],
  258574:["haste","vers"],258575:["crit","mastery"],258578:["haste","mastery"],258584:["haste","mastery"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
