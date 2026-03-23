export var SPEC_LABEL = "사격 사냥꾼";
export var SPEC_KEY = "mm-hunter";
export var SIMC_CLASS = "hunter";
export var SIMC_SPEC = "marksmanship";
export var SPEC_ICON = "ability_hunter_focusedaim";
export var STORAGE_KEY = "bis-mm-hunter-v1";

export var THEME = {
  accent: "#71b040",
  accentLight: "#aad08c",
  accentBg: "#111a0a",
  accentBorder: "#283e16",
  shimmer: "linear-gradient(90deg,#446a26,#71b040,#aad08c,#71b040,#446a26)",
  btnBg: "linear-gradient(135deg,#446a26,#71b040)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Sharpeye Gleam", ko: "뾰족눈 광투구", id: 258585, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "망토", simcSlot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "가슴", simcSlot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "손목", simcSlot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Whipcoil Sabatons", ko: "채찍뱀 발덮개", id: 251084, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "무기", simcSlot: "main_hand", en: "Hurricane's Heart", ko: "태풍의 심장", id: 251095, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "다리", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "머리", id: 251119, en: "Vortex Visage", ko: "회오리의 안면", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "반지", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "손목", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "mm-hunter-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49810:["crit","haste"],49812:["crit","haste"],
  50228:["crit","haste"],50233:["crit","haste"],151321:["crit","mastery"],193701:[],
  193708:["crit","mastery"],251079:["crit","mastery"],251084:["crit","mastery"],251089:["haste","mastery"],
  251095:["crit","haste"],251111:["crit","haste"],251119:["crit","mastery"],251162:["crit","haste"],
  251170:["crit","mastery"],251178:["crit","haste"],251215:["crit","mastery"],251217:["crit","haste"],
  252420:[],258525:["crit","haste"],258575:["crit","mastery"],258576:["crit","haste"],
  258585:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
