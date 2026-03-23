export var SPEC_LABEL = "Protection Warrior";
export var SPEC_KEY = "prot-warrior";
export var SIMC_CLASS = "warrior";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_warrior_defensivestance";
export var STORAGE_KEY = "bis-prot-warrior-v1";

export var THEME = {
  accent: "#8b7040",
  accentLight: "#b9a98c",
  accentBg: "#15110a",
  accentBorder: "#312716",
  shimmer: "linear-gradient(90deg,#534326,#8b7040,#b9a98c,#8b7040,#534326)",
  btnBg: "linear-gradient(135deg,#534326,#8b7040)",
};

export var BIS = [
  { slot: "head", en: "Skeleton Lord's Cranium", ko: "해골 군주의 두개골", id: 49819, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Searing Spaulders", ko: "작열하는 어깨덮개", id: 251157, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Frost Wyrm Ribcage", ko: "서리고룡 뼈갑옷", id: 50272, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Kasreth's Bindings", ko: "카스레스의 결속띠", id: 251203, dungeon: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", en: "Embergrove Grasps", ko: "잿불숲 손아귀", id: 251081, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Lightscarred Cuisses", ko: "빛흉터 다리가리개", id: 251208, dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "feet", en: "Sabatons of Furious Revenge", ko: "격노한 복수의 발덮개", id: 251091, dungeon: "Windrunner Spire", stats: ["crit","vers"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, dungeon: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Purloined Wedding Ring", ko: "훔친 결혼반지", id: 49812, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", id: 258525, dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", id: 258049, dungeon: "Skyreach", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251105, en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
];

export var WORST_STATS = ["mastery"];

export var STAT_CACHE_KEY = "prot-warrior-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49808:["crit","haste"],49812:["crit","haste"],
  49819:["crit","haste"],50228:["crit","haste"],50272:["crit","haste"],51802:["crit","haste"],
  251081:["crit","haste"],251091:["crit","vers"],251095:["crit","haste"],251105:["crit","mastery"],
  251111:["crit","haste"],251157:["crit","haste"],251162:["crit","haste"],251168:["crit","mastery"],
  251175:["crit","mastery"],251178:["crit","haste"],251203:["crit","vers"],251208:["haste","vers"],
  251217:["crit","haste"],252420:[],258049:["crit","mastery"],258525:["crit","haste"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
