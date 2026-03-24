export var SPEC_LABEL = "Unholy Death Knight";
export var SPEC_KEY = "unholy-dk";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/unholy-death-knight-raid-guide";
export var SIMC_CLASS = "deathknight";
export var SIMC_SPEC = "unholy";
export var SPEC_ICON = "spell_deathknight_unholypresence";
export var STORAGE_KEY = "bis-unholy-dk-v1";

export var THEME = {
  accent: "#7a9b3a",
  accentLight: "#afc389",
  accentBg: "#121709",
  accentBorder: "#2b3614",
  shimmer: "linear-gradient(90deg,#495d23,#7a9b3a,#afc389,#7a9b3a,#495d23)",
  btnBg: "linear-gradient(135deg,#495d23,#7a9b3a)",
};

export var BIS = [
  { slot: "head", en: "Relentless Rider's Crown", ko: "가혹한 기수의 왕관", id: 249970, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Shoulderplates of Frozen Blood", ko: "얼어붙은 피의 어깨철갑", id: 50234, source: "The Great Vault", stats: ["crit","mastery"] },
  { slot: "back", en: "Adherent's Silken Shroud", ko: "신봉자의 비단 수의", id: 239656, source: "Crafted", stats: [] },
  { slot: "chest", en: "Relentless Rider's Cuirass", ko: "가혹한 기수의 흉갑", id: 249973, source: "Tier", stats: ["crit","haste"] },
  { slot: "wrist", en: "Spellbreaker's Bracers", ko: "주문파괴자의 팔보호구", id: 237834, source: "Crafted", stats: [] },
  { slot: "hands", en: "Relentless Rider's Bonegrasps", ko: "가혹한 기수의 해골손아귀", id: 249971, source: "Tier", stats: ["haste","mastery"] },
  { slot: "waist", en: "Hate-Tied Waistchain", ko: "증오매듭 허리사슬", id: 249380, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "legs", en: "Relentless Rider's Legguards", ko: "가혹한 기수의 다리보호대", id: 249969, source: "Tier", stats: ["crit","mastery"] },
  { slot: "feet", en: "Greaves of the Unformed", ko: "형성되지 않은 자의 경갑", id: 249381, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Sin'dorei Band of Hope", ko: "희망의 신도레이 고리", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "finger2", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, source: "The Great Vault", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Light Company Guidon", ko: "빛의 부대기", id: 249344, source: "Belo'ren", stats: [] },
  { slot: "main_hand", en: "Bellamy's Final Judgement", ko: "벨라미의 마지막 심판", id: 249277, source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Crown of the Dark Envoy", ko: "암흑 특사의 관", id: 151333, source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Shoulderplates of Frozen Blood", ko: "얼어붙은 피의 어깨철갑", id: 50234, source: "Pit of Saron", stats: ["crit","mastery"] },
  { slot: "chest", en: "Frost Wyrm Ribcage", ko: "서리고룡 뼈갑옷", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Vambraces of Lost Hope", ko: "잃어버린 희망의 완갑", id: 151328, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "hands", en: "Incarnadine Gauntlets", ko: "진홍빛 건틀릿", id: 258583, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Legplates of Lingering Dusk", ko: "잔존하는 암흑의 다리갑옷", id: 251118, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "feet", en: "Oathsworn Stompers", ko: "서약신도 디딤장화", id: 251107, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "finger1", en: "Platinum Star Band", ko: "백금 별의 고리", id: 193708, source: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, source: "Skyreach", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", id: 251168, source: "Maisara Caverns", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "chest", id: 249309, en: "Sunbound Breastplate", ko: "태양결속 가슴보호갑", source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "feet", id: 249332, en: "Parasite Stompers", ko: "기생 디딤장화", source: "Vorasius", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 251169, en: "Footwraps of Ill-Fate", ko: "불길한 운명의 발등싸개", source: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "neck", id: 249368, en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251142, en: "Pendant of Malefic Fury", ko: "사악한 격노의 펜던트", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251093, en: "Omission of Light", ko: "소외된 빛", source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251513, en: "Loa Worshiper's Band", ko: "로아 신봉자의 고리", source: "Crafted", stats: ["crit","mastery"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "unholy-dk-stat-cache-v1";

export var KNOWN_STATS = {
  49808:["crit","haste"],50228:["crit","haste"],50234:["crit","mastery"],50272:["crit","haste"],
  151328:["crit","haste"],151333:["crit","mastery"],193708:["crit","mastery"],237834:[],
  239656:[],249277:["crit","mastery"],249309:["crit","haste"],249332:["haste","mastery"],
  249337:["crit","haste"],249343:["mastery"],249344:[],249368:["haste","mastery"],
  249369:["haste","mastery"],249380:["crit","mastery"],249381:["crit","mastery"],249919:["crit","mastery"],
  249969:["crit","mastery"],249970:["haste","mastery"],249971:["haste","mastery"],249973:["crit","haste"],
  250247:["haste","mastery"],250256:[],251093:["haste","mastery"],251107:["haste","mastery"],
  251115:["haste","mastery"],251118:["crit","mastery"],251142:["haste","mastery"],251168:["crit","mastery"],
  251169:["haste","mastery"],251513:["crit","mastery"],252420:[],258583:["crit","mastery"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
