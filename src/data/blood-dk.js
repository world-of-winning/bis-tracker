export var SPEC_LABEL = "혈기 죽음의 기사";
export var SPEC_KEY = "blood-dk";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "blood";
export var SPEC_ICON = "spell_deathknight_bloodpresence";
export var STORAGE_KEY = "bis-blood-dk-v1";

export var THEME = {
  accent: "#C41E3A",
  accentLight: "#dc7889",
  accentBg: "#1d0509",
  accentBorder: "#450b14",
  shimmer: "linear-gradient(90deg,#761223,#C41E3A,#dc7889,#C41E3A,#761223)",
  btnBg: "linear-gradient(135deg,#761223,#C41E3A)",
};

export var BIS = [
  { slot: "머리", simcSlot: "head", en: "Crown of the Dark Envoy", ko: "암흑 특사의 관", id: 151333, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "목", simcSlot: "neck", en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", id: 251096, dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "어깨", simcSlot: "shoulder", en: "Shoulderplates of Frozen Blood", ko: "얼어붙은 피의 어깨철갑", id: 50234, dungeon: "Pit of Saron", stats: ["crit","mastery"] },
  { slot: "망토", simcSlot: "back", en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", id: 251161, dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "가슴", simcSlot: "chest", en: "Arcane Guardian's Shell", ko: "비전 수호병의 껍질", id: 251101, dungeon: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "손목", simcSlot: "wrist", en: "Kasreth's Bindings", ko: "카스레스의 결속띠", id: 251203, dungeon: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "장갑", simcSlot: "hands", en: "Incarnadine Gauntlets", ko: "진홍빛 건틀릿", id: 258583, dungeon: "Skyreach", stats: ["crit","mastery"] },
  { slot: "허리", simcSlot: "waist", en: "Shadowsplit Girdle", ko: "어둠분열 요대", id: 251112, dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "다리", simcSlot: "legs", en: "Venerated Professor's Greaves", ko: "존경받는 교수의 경갑", id: 193706, dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
  { slot: "발", simcSlot: "feet", en: "Trap Jammers", ko: "함정 방어 장화", id: 151330, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "반지 1", simcSlot: "finger1", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "반지 2", simcSlot: "finger2", en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", id: 151308, dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "장신구 1", simcSlot: "trinket1", en: "Solar Core Igniter", ko: "태양 핵 점화자", id: 252418, dungeon: "Skyreach", stats: [] },
  { slot: "장신구 2", simcSlot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "무기", simcSlot: "main_hand", en: "Emberdawn Defender", ko: "잿불여명 수호검", id: 251078, dungeon: "Windrunner Spire", stats: ["mastery","vers"] },
];

export var ALTS = [
  { forSlot: "망토", id: 49823, en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "목", id: 151309, en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", dungeon: "Seat of the Triumvirute", stats: ["haste","vers"] },
  { forSlot: "반지", id: 251205, en: "Leyline Leggings", ko: "지맥 다리보호구", dungeon: "Nexus-Point", stats: ["crit","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "blood-dk-stat-cache-v1";

export var KNOWN_STATS = {
  49823:["crit","vers"],50234:["crit","mastery"],151308:["crit","vers"],151309:["haste","vers"],
  151330:["mastery","vers"],151333:["crit","mastery"],193706:["crit","vers"],193708:["crit","mastery"],
  251078:["mastery","vers"],251096:["haste","vers"],251101:["crit","vers"],251112:["haste","vers"],
  251161:["crit","vers"],251203:["crit","vers"],251205:["crit","vers"],252418:[],
  252420:[],258583:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
