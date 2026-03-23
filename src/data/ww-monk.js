export var SPEC_LABEL = "Windwalker Monk";
export var SPEC_KEY = "ww-monk";
export var SIMC_CLASS = "monk";
export var SIMC_SPEC = "windwalker";
export var SPEC_ICON = "spell_monk_windwalker_spec";
export var STORAGE_KEY = "bis-ww-monk-v1";

export var THEME = {
  accent: "#00FF98",
  accentLight: "#66ffc1",
  accentBg: "#002617",
  accentBorder: "#005935",
  shimmer: "linear-gradient(90deg,#00995b,#00FF98,#66ffc1,#00FF98,#00995b)",
  btnBg: "linear-gradient(135deg,#00995b,#00FF98)",
};

export var BIS = [
  { slot: "head", en: "Fearsome Visage of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 무시무시한 안면", id: 250015, source: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { slot: "neck", en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", id: 249368, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Aurastones of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 기의 돌", id: 250013, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", en: "Windwrap of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 바람포", id: 250010, source: "Catalyst", stats: ["crit","haste"] },
  { slot: "chest", en: "Battle Garb of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 전투복", id: 250018, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "wrist", en: "Silvermoon Agent's Deflectors", ko: "실버문 요원의 굴절보호대", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", en: "Vaelgor's Fearsome Grasp", ko: "바엘고어의 섬찟한 손아귀", id: 249321, source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { slot: "waist", en: "Stormsigil of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 폭풍인장", id: 250012, source: "Catalyst", stats: ["haste","mastery"] },
  { slot: "legs", en: "Swiftsweepers of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 싹쓸이 바지", id: 250014, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "feet", en: "Storm Crashers of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 폭풍추적화", id: 250017, source: "Catalyst", stats: ["crit","haste"] },
  { slot: "finger1", en: "Loa Worshiper's Band", ko: "로아 신봉자의 고리", id: 251513, source: "Crafted", stats: ["crit","mastery"] },
  { slot: "finger2", en: "Sin'dorei Band of Hope", ko: "희망의 신도레이 고리", id: 249919, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "trinket1", en: "Radiant Plume", ko: "광휘의 꽁지깃", id: 249806, source: "Belo'ren", stats: [] },
  { slot: "trinket2", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", en: "Clutchmates' Caress", ko: "혈족의 애정", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Clutchmates' Caress", ko: "혈족의 애정", id: 249287, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Spellsnap Shadowmask", ko: "주문절단 그림자복면", id: 251109, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", en: "Flayer's Black Belt", ko: "바위갈퀴의 검은띠", id: 49806, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Shadowslash Slicer", ko: "어둠칼날 절단기", id: 251122, source: "Magisters' Terrace", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "다리", id: 249312, en: "Nightblade's Pantaloons", ko: "밤의 검의 통바지", dungeon: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "다리", id: 250023, en: "Phloemwraps of the Luminous Bloom", ko: "영롱한 꽃의 체관싸개", dungeon: "Catalyst / Raid", stats: ["haste","mastery"] },
  { forSlot: "머리", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "머리", id: 151336, en: "Voidlashed Hood", ko: "공허에 스친 두건", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "목", id: 250247, en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", dungeon: "Midnight Falls", stats: ["haste","mastery"] },
  { forSlot: "목", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "무기", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249283, en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", dungeon: "Belo'ren", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249294, en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249922, en: "Tome of Alnscorned Regret", ko: "알른멸시 회한의 고서", dungeon: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258472, en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", dungeon: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "반지", id: 193708, en: "Platinum Star Band", ko: "백금 별의 고리", dungeon: "Algeth'ar Academy", stats: ["crit","mastery"] },
  { forSlot: "반지", id: 249369, en: "Bond of Light", ko: "빛의 결속", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "발", id: 249382, en: "Canopy Walker's Footwraps", ko: "나무 지붕 방랑자의 발등싸개", dungeon: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { forSlot: "어깨", id: 250004, en: "Venom Casks of the Grim Jest", ko: "암담한 재담의 맹독 보관통", dungeon: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { forSlot: "어깨", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "장갑", id: 250007, en: "Sleight of Hand of the Grim Jest", ko: "암담한 재담의 손재주", dungeon: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "장갑", id: 250034, en: "Devouring Reaver's Essence Grips", ko: "포식의 파괴자 정수 손장갑", dungeon: "Tier", stats: ["crit","haste"] },
  { forSlot: "장갑", id: 251113, en: "Gloves of Viscous Goo", ko: "농후한 찐득이 장갑", dungeon: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "허리", id: 249374, en: "Scorn-Scarred Shul'ka's Belt", ko: "멸시의 자취가 남은 술카의 허리띠", dungeon: "Chimaerus", stats: ["crit","haste"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "ww-monk-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],51802:["crit","haste"],
  151309:["haste","vers"],151318:["crit","haste"],151336:["crit","haste"],193701:[],
  193707:["haste","mastery"],193708:["crit","mastery"],193710:["haste","mastery"],193714:["haste","mastery"],
  244576:[],249283:["haste","mastery"],249287:["haste","mastery"],249294:["haste","mastery"],
  249312:["haste","mastery"],249321:["crit","mastery"],249343:["mastery"],249368:["haste","mastery"],
  249369:["haste","mastery"],249374:["crit","haste"],249382:["crit","mastery"],249806:[],
  249919:["crit","mastery"],249922:["haste","mastery"],250004:["haste","mastery"],250007:["crit","haste"],
  250010:["crit","haste"],250012:["haste","mastery"],250013:["haste","mastery"],250014:["haste","mastery"],
  250015:["crit","haste"],250017:["crit","haste"],250018:["crit","haste"],250023:["haste","mastery"],
  250034:["crit","haste"],250247:["haste","mastery"],251092:["haste","mastery"],251093:["haste","mastery"],
  251096:["haste","vers"],251109:["crit","mastery"],251113:["crit","mastery"],251115:["haste","mastery"],
  251122:["haste","mastery"],251171:["haste","mastery"],251174:["haste","mastery"],251201:["haste","mastery"],
  251216:["haste","mastery"],251513:["crit","mastery"],258472:["haste","mastery"],258577:["crit","mastery"],
  260312:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
