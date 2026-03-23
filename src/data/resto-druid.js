export var SPEC_LABEL = "Restoration Druid";
export var SPEC_KEY = "resto-druid";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "restoration";
export var SPEC_ICON = "spell_nature_healingtouch";
export var STORAGE_KEY = "bis-resto-druid-v1";

export var THEME = {
  accent: "#60d060",
  accentLight: "#a0e3a0",
  accentBg: "#0e1f0e",
  accentBorder: "#224922",
  shimmer: "linear-gradient(90deg,#3a7d3a,#60d060,#a0e3a0,#60d060,#3a7d3a)",
  btnBg: "linear-gradient(135deg,#3a7d3a,#60d060)",
};

export var BIS = [
  { slot: "head", en: "Branches of the Luminous Bloom", ko: "영롱한 꽃의 나뭇가지", id: 250024, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Amulet of the Abyssal Hymn", ko: "심연의 찬가의 아뮬렛", id: 250247, source: "Midnight Falls", stats: ["haste","mastery"] },
  { slot: "shoulder", en: "Seedpods of the Luminous Bloom", ko: "영롱한 꽃의 씨앗 깍지", id: 250022, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Arbortenders of the Luminous Bloom", ko: "영롱한 꽃의 나무지기", id: 250025, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", en: "Silvermoon Agent's Utility Belt", ko: "실버문 요원의 연장허리띠", id: 244573, source: "Crafted", stats: [] },
  { slot: "legs", en: "Phloemwraps of the Luminous Bloom", ko: "영롱한 꽃의 체관싸개", id: 250023, source: "Tier", stats: ["haste","mastery"] },
  { slot: "feet", en: "Eclipse Espadrilles", ko: "일월식 발목화", id: 251210, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Belo'melorn, the Shattered Talon", ko: "벨로멜로른 - 으스러진 갈퀴발톱", id: 249283, source: "Belo'ren", stats: ["haste","mastery"] },
  { slot: "off_hand", en: "Aln'hara Lantern", ko: "알른하라의 등불", id: 245769, source: "Crafted", stats: [] },
];

export var MYTHIC = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Necklace of the Twisting Void", ko: "뒤틀리는 공허의 목걸이", id: 151309, source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Potion-Stained Cloak", ko: "물약으로 얼룩진 망토", id: 193712, source: "Algeth'ar Academy", stats: ["haste","vers"] },
  { slot: "chest", en: "Maledict Vest", ko: "악독한 조끼", id: 251216, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "wrist", en: "Frenzyroot Cuffs", ko: "광란뿌리 소매장식", id: 193714, source: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { slot: "hands", en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", id: 151318, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "waist", en: "Falconer's Cinch", ko: "매사냥꾼의 허리끈", id: 251166, source: "Maisara Caverns", stats: ["haste","vers"] },
  { slot: "legs", en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", id: 49817, source: "Pit of Saron", stats: ["haste","mastery"] },
  { slot: "feet", en: "Eclipse Espadrilles", ko: "일월식 발목화", id: 251210, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "finger1", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "finger2", en: "Bifurcation Band", ko: "분기점의 고리", id: 251115, source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "윈드러너의 심장추적자", id: 51802, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Ceremonial Hexblade", ko: "의식용 사술칼날", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "다리", id: 249312, en: "Nightblade's Pantaloons", ko: "밤의 검의 통바지", dungeon: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "다리", id: 250014, en: "Swiftsweepers of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 싹쓸이 바지", dungeon: "Tier", stats: ["haste","mastery"] },
  { forSlot: "망토", id: 250055, en: "Voidbreaker's Encryption", ko: "공허파괴자의 암호", dungeon: "Catalyst", stats: ["haste","mastery"] },
  { forSlot: "머리", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "머리", id: 250015, en: "Fearsome Visage of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 무시무시한 안면", dungeon: "Lightblinded Vanguard", stats: ["crit","haste"] },
  { forSlot: "머리", id: 250033, en: "Devouring Reaver's Intake", ko: "포식의 파괴자 유입구", dungeon: "Tier", stats: ["haste","mastery"] },
  { forSlot: "목", id: 249368, en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", dungeon: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "목", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", dungeon: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "무기", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", dungeon: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "무기", id: 193707, en: "Final Grade", ko: "최종 학점", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 193710, en: "Spellboon Saber", ko: "주문은총 사브르", dungeon: "Algeth'ar Academy", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249287, en: "Clutchmates' Caress", ko: "혈족의 애정", dungeon: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249288, en: "Ranger-Captain's Lethal Recurve", ko: "순찰대장의 치명적인 곡궁", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "무기", id: 249294, en: "Blade of the Blind Verdict", ko: "맹목적인 선고의 칼날", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "무기", id: 249922, en: "Tome of Alnscorned Regret", ko: "알른멸시 회한의 고서", dungeon: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251095, en: "Hurricane's Heart", ko: "태풍의 심장", dungeon: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", dungeon: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251122, en: "Shadowslash Slicer", ko: "어둠칼날 절단기", dungeon: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", dungeon: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "무기", id: 251174, en: "Deceiver's Rotbow", ko: "기만자의 부식활", dungeon: "Maisara Caverns", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 251201, en: "Corespark Multitool", ko: "핵심불꽃 다용도 도구", dungeon: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { forSlot: "무기", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", dungeon: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "무기", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", dungeon: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "반지", id: 249369, en: "Bond of Light", ko: "빛의 결속", dungeon: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "발", id: 249334, en: "Void-Claimed Shinkickers", ko: "공허에 삼켜진 장화", dungeon: "Imperator Averzian", stats: ["haste","vers"] },
  { forSlot: "어깨", id: 151319, en: "Twilight's Edge Spaulders", ko: "황혼의 서슬 어깨덮개", dungeon: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "어깨", id: 250004, en: "Venom Casks of the Grim Jest", ko: "암담한 재담의 맹독 보관통", dungeon: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { forSlot: "어깨", id: 250013, en: "Aurastones of Ra-den's Chosen", ko: "라덴에게 선택받은 자의 기의 돌", dungeon: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { forSlot: "어깨", id: 250031, en: "Devouring Reaver's Exhaustplates", ko: "포식의 파괴자 배출장갑", dungeon: "Tier", stats: ["crit","mastery"] },
  { forSlot: "어깨", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", dungeon: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "장갑", id: 250007, en: "Sleight of Hand of the Grim Jest", ko: "암담한 재담의 손재주", dungeon: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "장갑", id: 250034, en: "Devouring Reaver's Essence Grips", ko: "포식의 파괴자 정수 손장갑", dungeon: "Tier", stats: ["crit","haste"] },
  { forSlot: "장갑", id: 251204, en: "Corewright's Zappers", ko: "핵장인의 제어 장치", dungeon: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "허리", id: 151316, en: "Cinch of the Umbral Lasher", ko: "암영 덩굴손의 허리끈", dungeon: "Seat of the Triumvirate", stats: ["haste","vers"] },
];

export var WORST_STATS = ["vers"];

export var STAT_CACHE_KEY = "resto-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49817:["haste","mastery"],51802:["crit","haste"],
  151309:["haste","vers"],151316:["haste","vers"],151318:["crit","haste"],151319:["crit","mastery"],
  151336:["crit","haste"],193707:["haste","mastery"],193710:["haste","mastery"],193712:["haste","vers"],
  193714:["haste","mastery"],193718:[],244573:[],245769:[],
  249283:["haste","mastery"],249287:["haste","mastery"],249288:["crit","haste"],249294:["haste","mastery"],
  249295:["crit","haste"],249312:["haste","mastery"],249334:["haste","vers"],249343:["mastery"],
  249368:["haste","mastery"],249369:["haste","mastery"],249370:["haste","mastery"],249920:["haste"],
  249922:["haste","mastery"],250004:["haste","mastery"],250007:["crit","haste"],250013:["haste","mastery"],
  250014:["haste","mastery"],250015:["crit","haste"],250022:["crit","mastery"],250023:["haste","mastery"],
  250024:["haste","mastery"],250025:["haste","vers"],250031:["crit","mastery"],250033:["haste","mastery"],
  250034:["crit","haste"],250055:["haste","mastery"],250247:["haste","mastery"],251092:["haste","mastery"],
  251093:["haste","mastery"],251095:["crit","haste"],251096:["haste","vers"],251111:["crit","haste"],
  251115:["haste","mastery"],251122:["haste","mastery"],251162:["crit","haste"],251166:["haste","vers"],
  251171:["haste","mastery"],251174:["haste","mastery"],251178:["crit","haste"],251201:["haste","mastery"],
  251204:["haste","vers"],251210:["haste","vers"],251216:["haste","mastery"],258472:["haste","mastery"],
  258525:["crit","haste"],260423:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
