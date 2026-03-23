export var SPEC_LABEL = "Brewmaster Monk";
export var SPEC_KEY = "brew-monk";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "brewmaster";
export var SPEC_ICON = "spell_monk_brewmaster_spec";
export var STORAGE_KEY = "bis-brew-monk-v1";

export var THEME = {
  accent: "#00AA60",
  accentLight: "#66cca0",
  accentBg: "#001a0e",
  accentBorder: "#003b22",
  shimmer: "linear-gradient(90deg,#00663a,#00AA60,#66cca0,#00AA60,#00663a)",
  btnBg: "linear-gradient(135deg,#00663a,#00AA60)",
};

export var BIS = [
  { slot: "head", en: "Fetid Vilecrown", ko: "악취 나는 부정왕관", id: 251177, dungeon: "Magisters' Terrace", stats: ["crit","vers"] },
  { slot: "neck", en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", id: 251096, dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Twilight's Edge Spaulders", ko: "황혼의 서슬 어깨덮개", id: 151319, dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "back", en: "Soulhunter's Mask", ko: "영혼사냥꾼의 가면", id: 251161, dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { slot: "chest", en: "Vest of the Void's Embrace", ko: "공허의 포옹 조끼", id: 151313, dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "wrist", en: "Custodial Cuffs", ko: "관리인의 소매장식", id: 251103, dungeon: "Magisters' Terrace", stats: ["haste","vers"] },
  { slot: "hands", en: "Ruby Contestant's Gloves", ko: "루비 참가자의 장갑", id: 193721, dungeon: "Algeth'ar Academy", stats: ["mastery","vers"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Shifting Stalker Hide Pants", ko: "변화의 추적자 가죽 바지", id: 151314, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "feet", en: "Footpads of Seeping Dread", ko: "스며드는 공포의 발보호구", id: 151317, dungeon: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "finger1", en: "Eredath Seal of Nobility", ko: "에레다스 귀족의 인장", id: 151308, dungeon: "Seat of the Triumvirate", stats: ["crit","vers"] },
  { slot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Solar Core Igniter", ko: "태양 핵 점화자", id: 252418, dungeon: "Skyreach", stats: [] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, dungeon: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Obsidian Goaltending Spire", ko: "흑요석 골대지킴이 뾰족지팡이", id: 193723, dungeon: "Algeth'ar Academy", stats: ["crit","vers"] },
];

export var ALTS = [
  { forSlot: "back", id: 49823, en: "Cloak of the Fallen Cardinal", ko: "쓰러진 추기경의 망토", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "neck", id: 151309, en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", dungeon: "Seat of the Triumvirute", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 50227, en: "Surgeon's Needle", ko: "외과의사의 바늘", dungeon: "Pit of Saron", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 193717, en: "Mystakria's Harvester", ko: "미스타크리아의 수확기", dungeon: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 251163, en: "Berserker's Hexclaws", ko: "광전사의 사술발톱", dungeon: "Maisara Caverns", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 258516, en: "Wand of Saprish's Gaze", ko: "사프리쉬의 시선 마법봉", dungeon: "Seat", stats: ["crit","vers"] },
  { forSlot: "ring", id: 251205, en: "Leyline Leggings", ko: "지맥 다리보호구", dungeon: "Nexus-Point", stats: ["crit","vers"] },
  { forSlot: "feet", id: 251121, en: "Domanaar's Dire Treads", ko: "도마나르의 광포한 발보호대", dungeon: "Magisters' Terrace", stats: ["mastery","vers"] },
];

export var WORST_STATS = [];

export var STAT_CACHE_KEY = "brew-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49823:["crit","vers"],50227:["crit","vers"],151308:["crit","vers"],151309:["haste","vers"],
  151313:["crit","vers"],151314:["mastery","vers"],151317:["mastery","vers"],151319:["crit","mastery"],
  193708:["crit","mastery"],193717:["crit","vers"],193721:["mastery","vers"],193723:["crit","vers"],
  251082:["crit","mastery"],251096:["haste","vers"],251103:["haste","vers"],251121:["mastery","vers"],
  251161:["crit","vers"],251163:["crit","vers"],251177:["crit","vers"],251205:["crit","vers"],
  252418:[],252420:[],258516:["crit","vers"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Seat of the Triumvirate", "Skyreach",
];
