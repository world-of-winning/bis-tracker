export var SPEC_LABEL = "신성 사제";
export var SPEC_KEY = "holy-priest";
export var SIMC_CLASS = "priest";
export var SIMC_SPEC = "holy";
export var SPEC_ICON = "spell_holy_guardianspirit";
export var STORAGE_KEY = "bis-holy-priest-v1";

export var THEME = {
  accent: "#e0e0e0",
  accentLight: "#ececec",
  accentBg: "#222222",
  accentBorder: "#4e4e4e",
  shimmer: "linear-gradient(90deg,#868686,#e0e0e0,#ececec,#e0e0e0,#868686)",
  btnBg: "linear-gradient(135deg,#868686,#e0e0e0)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Organized Pontificator's Mask", ko: "조직화된 법왕의 가면", id: 193703, dungeon: "Academy", stats: ["crit","haste"] },
  { slot: "목", simcSlot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Mantle of Dark Devotion", ko: "어둠의 헌신의 어깨덧옷", id: 251085, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", id: 49823, dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { slot: "가슴", simcSlot: "chest", en: "Wraps of Umbral Descent", ko: "떨어지는 암영의 싸개", id: 251120, dungeon: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "손목", simcSlot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, dungeon: "Seat", stats: ["haste","mastery"] },
  { slot: "장갑", simcSlot: "hands", en: "Fractured Fingerguards", ko: "으스러진 손가락보호대", id: 251211, dungeon: "Nexus-Point", stats: ["crit","vers"] },
  { slot: "허리", simcSlot: "waist", en: "Cord of Unraveling Reality", ko: "무너지는 현실의 장식끈", id: 151302, dungeon: "Seat", stats: ["mastery","vers"] },
  { slot: "다리", simcSlot: "legs", en: "Leyline Leggings", ko: "지맥 다리보호구", id: 251205, dungeon: "Nexus-Point", stats: ["crit","vers"] },
  { slot: "발", simcSlot: "feet", en: "Nightprey Stalkers", ko: "밤사냥감 추적자", id: 251167, dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Leyline Leggings", ko: "지맥 다리보호구", id: 251205, dungeon: "Nexus-Point", stats: ["crit","vers"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Academy", stats: ["crit","mastery"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, dungeon: "Academy", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "무기", simcSlot: "main_hand", en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", id: 258516, dungeon: "Seat", stats: ["crit","vers"] },
  { slot: "보조 무기", simcSlot: "off_hand", en: "Sigil of the Restless Heart", ko: "잠 못 드는 심장의 인장", id: 251094, dungeon: "Windrunner Spire", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "망토", id: 251161, en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 50227, en: "Surgeon's Needle", ko: "외과의사의 바늘", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "무기", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 193723, en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { forSlot: "무기", id: 251163, en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "무기", id: 251202, en: "Reflux Reflector", ko: "역류 굴절 장치", dungeon: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "반지", id: 151308, en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "holy-priest-stat-cache-v1";

export var KNOWN_STATS = {
  49823:["crit","vers"],50227:["crit","vers"],50228:["crit","haste"],51802:["crit","haste"],
  151302:["mastery","vers"],151305:["haste","mastery"],151308:["crit","vers"],193703:["crit","haste"],
  193708:["crit","mastery"],193717:["crit","vers"],193718:[],193723:["crit","vers"],
  251085:["crit","mastery"],251094:["crit","vers"],251120:["crit","vers"],251161:["crit","vers"],
  251163:["crit","vers"],251167:["crit","vers"],251202:["crit","vers"],251205:["crit","vers"],
  251211:["crit","vers"],258516:["crit","vers"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Academy", "Magisters' Terrace", "Nexus-Point", "Pit of Saron", "Seat",
];
