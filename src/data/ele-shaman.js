export var SPEC_LABEL = "정기 주술사";
export var SPEC_KEY = "ele-shaman";
export var SIMC_CLASS = "shaman";
export var SIMC_SPEC = "elemental";
export var SPEC_ICON = "spell_nature_lightning";
export var STORAGE_KEY = "bis-ele-shaman-v1";

export var THEME = {
  accent: "#0070DD",
  accentLight: "#66a9eb",
  accentBg: "#001121",
  accentBorder: "#00274d",
  shimmer: "linear-gradient(90deg,#004385,#0070DD,#66a9eb,#0070DD,#004385)",
  btnBg: "linear-gradient(135deg,#004385,#0070DD)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "목", simcSlot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, dungeon: "Seat of the Triumvirute", stats: ["haste","vers"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Pauldrons of the Void Hunter", ko: "공허 사냥꾼의 견갑", id: 151323, dungeon: "Seat of the Triumvirute", stats: ["haste","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "가슴", simcSlot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "손목", simcSlot: "wrist", en: "Corewarden Cuffs", ko: "핵감시관 소매장식", id: 251209, dungeon: "Nexus-Point Xenas", stats: ["mastery","vers"] },
  { slot: "장갑", simcSlot: "hands", en: "Grips of Forgotten Honor", ko: "잊힌 명예의 손장갑", id: 251089, dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Wickedweave Trousers", ko: "교활매듭 긴바지", id: 251170, dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { slot: "발", simcSlot: "feet", en: "Void-Coated Stompers", ko: "공허로 뒤덮인 디딤장화", id: 151320, dungeon: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, dungeon: "Widnrunner Spire", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Widnrunner Spire", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", id: 251111, dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "방패", simcSlot: "off_hand", en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", id: 251105, dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "다리", id: 251215, en: "Greaves of the Divine Guile", ko: "천상의 기만의 경갑", dungeon: "Nexus-Point Xenas", stats: ["crit","mastery"] },
  { forSlot: "목", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "무기", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 258049, en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "ele-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49810:["crit","haste"],49824:["crit","haste"],
  51802:["crit","haste"],151309:["haste","vers"],151320:["haste","mastery"],151323:["haste","mastery"],
  250144:[],251089:["haste","mastery"],251093:["haste","mastery"],251095:["crit","haste"],
  251096:["haste","vers"],251105:["crit","mastery"],251111:["crit","haste"],251115:["haste","mastery"],
  251162:["crit","haste"],251168:["crit","mastery"],251170:["crit","mastery"],251175:["crit","mastery"],
  251178:["crit","haste"],251209:["mastery","vers"],251215:["crit","mastery"],258049:["crit","mastery"],
  258525:["crit","haste"],258576:["crit","haste"],260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Seat of the Triumvirute", "Skyreach", "Widnrunner Spire",
];
