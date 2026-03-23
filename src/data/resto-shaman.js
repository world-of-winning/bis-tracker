export var SPEC_LABEL = "복원 주술사";
export var SPEC_KEY = "resto-shaman";
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
  { slot: "머리", simcSlot: "head", en: "Horns of the Spurned Val'kyr", ko: "쫓겨난 발키르의 뿔", id: 49824, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Spurned Val'kyr Shoulderguards", ko: "쫓겨난 발키르의 어깨보호대", id: 50233, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "망토", simcSlot: "back", en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", id: 49823, dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "가슴", simcSlot: "chest", en: "Sharpeye Chestguard", ko: "뾰족눈 가슴보호대", id: 258576, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "손목", simcSlot: "wrist", en: "Darkfang Scale Wristguards", ko: "검은송곳니 비늘 손목보호구", id: 151321, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Void-Touched Grips", ko: "공허에 물든 손장갑", id: 151322, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "허리", simcSlot: "waist", en: "Scabrous Zombie Leather Belt", ko: "거친 좀비 가죽 허리띠", id: 49810, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "다리", simcSlot: "legs", en: "Black Dragonskin Breeches", ko: "검은용가죽 짧은바지", id: 49811, dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "발", simcSlot: "feet", en: "Boots of Explosive Growth", ko: "폭발적인 성장의 장화", id: 193715, dungeon: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", id: 151308, dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Band of the Triumvirate", ko: "삼두정의 고리", id: 151311, dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Algeth'ar Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Skyreach", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Surgeon's Needle", ko: "외과의사의 바늘", id: 50227, dungeon: "Skyreach", stats: ["crit","vers"] },
  { slot: "방패", simcSlot: "off_hand", en: "Reflux Reflector", ko: "역류 굴절 장치", id: 251202, dungeon: "Nexus-Point Xenas", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "망토", id: 251161, en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "무기", id: 251094, en: "Sigil of the Restless Heart", ko: "잠 못 드는 심장의 인장", dungeon: "Windrunner Spire", stats: ["crit","vers"] },
  { forSlot: "무기", id: 251163, en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat", stats: ["crit","vers"] },
  { forSlot: "반지", id: 251205, en: "Leyline Leggings", ko: "지맥 다리보호구", dungeon: "Nexus-Point", stats: ["crit","vers"] },
  { forSlot: "손목", id: 251079, en: "Amberfrond Bracers", ko: "호박석잎 팔보호구", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "resto-shaman-stat-cache-v1";

export var KNOWN_STATS = {
  49810:["crit","haste"],49811:["crit","vers"],49823:["crit","vers"],49824:["crit","haste"],
  50227:["crit","vers"],50228:["crit","haste"],50233:["crit","haste"],51802:["crit","haste"],
  151308:["crit","vers"],151311:["haste","vers"],151321:["crit","mastery"],151322:["mastery","vers"],
  193715:["crit","haste"],193717:["crit","vers"],193718:[],193723:["crit","vers"],
  251079:["crit","mastery"],251094:["crit","vers"],251161:["crit","vers"],251163:["crit","vers"],
  251202:["crit","vers"],251205:["crit","vers"],258516:["crit","vers"],258576:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Algeth'ar Academy", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
