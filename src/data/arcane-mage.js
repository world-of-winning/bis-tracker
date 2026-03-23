export var SPEC_LABEL = "Arcane Mage";
export var SPEC_KEY = "arcane-mage";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "arcane";
export var SPEC_ICON = "spell_holy_magicalsentry";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/arcane-mage-raid-guide";
export var STORAGE_KEY = "bis-arcane-mage-v1";

export var THEME = {
  accent: "#69CCF0",
  accentLight: "#a5e0f6",
  accentBg: "#101f24",
  accentBorder: "#254754",
  shimmer: "linear-gradient(90deg,#3f7a90,#69CCF0,#a5e0f6,#69CCF0,#3f7a90)",
  btnBg: "linear-gradient(135deg,#3f7a90,#69CCF0)",
};

export var BIS = [
  { slot: "head", en: "Voidbreaker's Veil", ko: "공허파괴자의 면사포", id: 250060, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Voidbreaker's Leyline Nexi", ko: "공허파괴자의 지맥 연결체", id: 250058, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Voidbreaker's Robe", ko: "공허파괴자의 로브", id: 250063, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", en: "Martyr's Bindings", ko: "순교자의 손목띠", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", en: "Voidbreaker's Gloves", ko: "공허파괴자의 장갑", id: 250061, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", en: "Whisper-Inscribed Sash", ko: "속삭임이 새겨진 장식띠", id: 249376, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "legs", en: "Commander's Faded Breeches", ko: "사령관의 빛바랜 짧은바지", id: 251090, source: "Windrunner Spire", stats: ["mastery","vers"] },
  { slot: "feet", en: "Dream-Scorched Striders", ko: "꿈의 불꽃 성큼장화", id: 249373, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Masterwork Sin'dorei Band", ko: "걸작 신도레이 고리", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Vaelgor's Final Stare", ko: "바엘고어의 마지막 시선", id: 249346, source: "Vaelgor & Ezzorak", stats: [] },
  { slot: "main_hand", en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", id: 258578, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Palebone Robes", ko: "창백한 뼈 로브", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Bracers of Blazing Light", ko: "작열하는 빛의 팔보호구", id: 258580, source: "Skyreach", stats: ["mastery","vers"] },
  { slot: "hands", en: "Handwraps of the Ascended", ko: "승천자의 손등싸개", id: 151300, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "waist", en: "Cord of Unraveling Reality", ko: "무너지는 현실의 장식끈", id: 151302, source: "Seat of the Triumvirate", stats: ["mastery","vers"] },
  { slot: "legs", en: "Commander's Faded Breeches", ko: "사령관의 빛바랜 짧은바지", id: 251090, source: "Windrunner Spire", stats: ["mastery","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Vessel of Tortured Souls", ko: "괴로워하는 영혼의 그릇", id: 250258, source: "Maisara Caverns", stats: ["mastery"] },
  { slot: "trinket2", en: "Nevermelting Ice Crystal", ko: "영구결빙 수정", id: 50259, source: "Pit of Saron", stats: [] },
  { slot: "main_hand", en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", id: 258514, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "가슴", id: 151303, en: "Voidbender Robe", ko: "공허술사 로브", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "목", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", dungeon: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "목", id: 249368, en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", dungeon: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249277, en: "Bellamy's Final Judgement", ko: "벨라미의 마지막 심판", dungeon: "Lightblinded Vanguard", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 249284, en: "Belo'ren's Swift Talon", ko: "벨로렌의 날렵한 갈퀴발톱", dungeon: "Belo'ren", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251077, en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", dungeon: "Windrunner Spire", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", dungeon: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "무기", id: 258218, en: "Skybreaker's Blade", ko: "하늘파괴자의 칼날", dungeon: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "반지", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "반지", id: 249369, en: "Bond of Light", ko: "빛의 결속", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "반지", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "손목", id: 251108, en: "Wraps of Watchful Wrath", ko: "경계하는 진노의 싸개", dungeon: "Magisters' Terrace", stats: ["mastery","vers"] },
  { forSlot: "어깨", id: 249328, en: "Echoing Void Mantle", ko: "메아리치는 공허 어깨덧옷", dungeon: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "어깨", id: 251213, en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "arcane-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49812:["crit","haste"],49825:["crit","haste"],50228:["crit","haste"],50259:[],
  151300:["crit","mastery"],151302:["mastery","vers"],151303:["crit","haste"],151337:["crit","mastery"],
  239648:[],240949:[],249277:["crit","mastery"],249284:["crit","mastery"],
  249328:["haste","mastery"],249337:["crit","haste"],249343:["mastery"],249346:[],
  249368:["haste","mastery"],249369:["haste","mastery"],249373:["crit","mastery"],249376:["haste","mastery"],
  249920:["haste"],250031:["crit","mastery"],250042:["crit","mastery"],250058:["haste","vers"],
  250060:["haste","mastery"],250061:["haste","mastery"],250062:["haste","mastery"],250063:["crit","haste"],
  250247:["haste","mastery"],250258:["mastery"],251077:["crit","mastery"],251090:["mastery","vers"],
  251093:["haste","mastery"],251108:["mastery","vers"],251115:["haste","mastery"],251168:["crit","mastery"],
  251213:["haste","mastery"],251217:["crit","haste"],258218:["crit","mastery"],258514:["crit","mastery"],
  258575:["crit","mastery"],258578:["haste","mastery"],258580:["mastery","vers"],258584:["haste","mastery"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Maisara Caverns",
];
