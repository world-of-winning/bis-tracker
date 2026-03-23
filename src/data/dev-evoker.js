export var SPEC_LABEL = "Devastation Evoker";
export var SPEC_KEY = "dev-evoker";
export var SIMC_CLASS = "evoker";
export var SIMC_SPEC = "devastation";
export var SPEC_ICON = "classicon_evoker_devastation";
export var STORAGE_KEY = "bis-dev-evoker-v1";

export var THEME = {
  accent: "#29a8d4",
  accentLight: "#7fcbe5",
  accentBg: "#061920",
  accentBorder: "#0e3b4a",
  shimmer: "linear-gradient(90deg,#19657f,#29a8d4,#7fcbe5,#29a8d4,#19657f)",
  btnBg: "linear-gradient(135deg,#19657f,#29a8d4)",
};

export var BIS = [
  { slot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "feet", en: "Boots of Explosive Growth", ko: "폭발적인 성장의 장화", id: 193715, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", id: 251111, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Vexamus' Expulsion Rod", ko: "벡사무스의 배출 마법봉", id: 193709, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "legs", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "dev-evoker-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49810:["crit","haste"],49812:["crit","haste"],
  49824:["crit","haste"],50228:["crit","haste"],50233:["crit","haste"],51802:["crit","haste"],
  151321:["crit","mastery"],193709:["crit","haste"],193715:["crit","haste"],250144:[],
  251079:["crit","mastery"],251089:["haste","mastery"],251093:["haste","mastery"],251095:["crit","haste"],
  251111:["crit","haste"],251115:["haste","mastery"],251162:["crit","haste"],251170:["crit","mastery"],
  251178:["crit","haste"],251215:["crit","mastery"],251217:["crit","haste"],258525:["crit","haste"],
  258576:["crit","haste"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
