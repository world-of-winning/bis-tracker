export var SPEC_LABEL = "Fire Mage";
export var SPEC_KEY = "fire-mage";
export var SIMC_CLASS = "mage";
export var SIMC_SPEC = "fire";
export var SPEC_ICON = "spell_fire_firebolt02";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/fire-mage-raid-guide";
export var STORAGE_KEY = "bis-fire-mage-v1";

export var THEME = {
  accent: "#ca5030",
  accentLight: "#df9683",
  accentBg: "#1e0c07",
  accentBorder: "#471c11",
  shimmer: "linear-gradient(90deg,#79301d,#ca5030,#df9683,#ca5030,#79301d)",
  btnBg: "linear-gradient(135deg,#79301d,#ca5030)",
};

export var BIS = [
  { slot: "head", en: "Voidbreaker's Veil", ko: "공허파괴자의 면사포", id: 250060, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Voidbreaker's Leyline Nexi", ko: "공허파괴자의 지맥 연결체", id: 250058, source: "Tier", stats: ["haste","vers"] },
  { slot: "back", en: "Voidbreaker's Encryption", ko: "공허파괴자의 암호", id: 250055, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "chest", en: "Robes of Endless Oblivion", ko: "끝없는 망각의 로브", id: 249912, source: "Midnight Falls", stats: ["haste"] },
  { slot: "wrist", en: "Martyr's Bindings", ko: "순교자의 손목띠", id: 239648, source: "Crafted", stats: [] },
  { slot: "hands", en: "Voidbreaker's Gloves", ko: "공허파괴자의 장갑", id: 250061, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", en: "Whisper-Inscribed Sash", ko: "속삭임이 새겨진 장식띠", id: 249376, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "legs", en: "Voidbreaker's Britches", ko: "공허파괴자의 무릎바지", id: 250059, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", en: "Voidbreaker's Treads", ko: "공허파괴자의 발보호대", id: 250062, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Masterwork Sin'dorei Band", ko: "걸작 신도레이 고리", id: 240949, source: "Crafted", stats: [] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Brazier of the Dissonant Dirge", ko: "불협의 진혼곡 화로", id: 249286, source: "Midnight Falls", stats: ["mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Shadow-Weaver's Crown", ko: "흑마술사의 관", id: 151337, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Nysarra's Mantle", ko: "니사라의 어깨덧옷", id: 251213, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Palebone Robes", ko: "창백한 뼈 로브", id: 49825, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Entropic Wristwraps", ko: "혼돈의 손목싸개", id: 151305, source: "Seat of the Triumvirate", stats: ["haste","mastery"] },
  { slot: "hands", en: "Vilehex Bonds", ko: "부정사술 결속대", id: 251172, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "waist", en: "Braid of Salt and Fire", ko: "빛과 소금 허리띠", id: 50263, source: "Pit of Saron", stats: ["haste","vers"] },
  { slot: "legs", en: "Legwraps of Swirling Light", ko: "소용돌이치는 빛의 다리싸개", id: 258574, source: "Skyreach", stats: ["haste","vers"] },
  { slot: "feet", en: "Lightbinder Treads", ko: "빛의 결속자 발보호대", id: 258584, source: "Skyreach", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emberwing Feather", ko: "잿불날개 깃털", id: 250144, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Final Grade", ko: "최종 학점", id: 193707, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 249370, en: "Draconic Nullcape", ko: "용족 무위단망토", source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 151303, en: "Voidbender Robe", ko: "공허술사 로브", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "chest", id: 250063, en: "Voidbreaker's Robe", ko: "공허파괴자의 로브", source: "Tier", stats: ["crit","haste"] },
  { forSlot: "neck", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", source: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "neck", id: 251142, en: "Pendant of Malefic Fury", ko: "사악한 격노의 펜던트", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 249328, en: "Echoing Void Mantle", ko: "메아리치는 공허 어깨덧옷", source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 258578, en: "Lightbinder Shoulderguards", ko: "빛의 결속자 어깨보호대", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 251102, en: "Clasp of Compliance", ko: "순응의 죔쇠띠", source: "Magisters' Terrace", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249283, en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", source: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249294, en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "wrist", id: 249315, en: "Voracious Wristwraps", ko: "게걸스러운 손목싸개", source: "Vorasius", stats: ["haste","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "fire-mage-stat-cache-v1";

export var KNOWN_STATS = {
  49825:["crit","haste"],50263:["haste","vers"],250256:[],151303:["crit","haste"],
  151305:["haste","mastery"],151309:["haste","vers"],151337:["crit","mastery"],193707:["haste","mastery"],
  193710:["haste","mastery"],239648:[],240949:[],249283:["haste","mastery"],
  249286:["mastery"],249287:["haste","mastery"],249294:["haste","mastery"],249315:["haste","mastery"],
  249328:["haste","mastery"],249343:["mastery"],249368:["haste","mastery"],249369:["haste","mastery"],
  249370:["haste","mastery"],249376:["haste","mastery"],249912:["haste"],249920:["haste"],
  250010:["crit","haste"],250041:["crit","haste"],250042:["crit","mastery"],250043:["crit","haste"],
  250055:["haste","mastery"],250058:["haste","vers"],250059:["crit","haste"],250060:["haste","mastery"],
  250061:["haste","mastery"],250062:["haste","mastery"],250063:["crit","haste"],250144:[],
  250247:["haste","mastery"],251093:["haste","mastery"],251096:["haste","vers"],251102:["haste","vers"],
  251115:["haste","mastery"],251122:["haste","mastery"],251142:["haste","mastery"],251172:["crit","haste"],
  251174:["haste","mastery"],251190:["haste","mastery"],251201:["haste","mastery"],251213:["haste","mastery"],
  258438:["haste","mastery"],258574:["haste","vers"],258578:["haste","mastery"],258584:["haste","mastery"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Algeth'ar Academy", "Maisara Caverns",
];
