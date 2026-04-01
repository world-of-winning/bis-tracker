export var SPEC_LABEL = "Restoration Druid";
export var SPEC_KEY = "resto-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/restoration-druid-raid-guide";
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
  { slot: "trinket2", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
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
  { slot: "trinket1", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "trinket2", en: "Emerald Coach's Whistle", ko: "에메랄드 감독의 호루라기", id: 193718, source: "Algeth'ar Academy", stats: [] },
  { slot: "main_hand", en: "Ceremonial Hexblade", ko: "의식용 사술칼날", id: 251178, source: "Maisara Caverns", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Rukhran's Solar Reliquary", ko: "루크란의 태양 성물함", id: 258472, source: "Skyreach", stats: ["haste","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "chest", id: 251159, en: "War Trial Vestments", ko: "전쟁의 시련 예복", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "feet", id: 249334, en: "Void-Claimed Shinkickers", ko: "공허에 삼켜진 장화", source: "Imperator Averzian", stats: ["haste","vers"] },
  { forSlot: "hands", id: 251204, en: "Corewright's Zappers", ko: "핵장인의 제어 장치", source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "head", id: 251140, en: "Vilefiend's Guise", ko: "썩은마귀의 복면", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 249312, en: "Nightblade's Pantaloons", ko: "밤의 검의 통바지", source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 249368, en: "Eternal Voidsong Chain", ko: "영원한 공허노래 사슬", source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { forSlot: "neck", id: 251096, en: "Pendant of Aching Grief", ko: "괴로운 비탄의 펜던트", source: "Windrunner Spire", stats: ["haste","vers"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 151319, en: "Twilight's Edge Spaulders", ko: "황혼의 서슬 어깨덮개", source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 151316, en: "Cinch of the Umbral Lasher", ko: "암영 덩굴손의 허리끈", source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "weapon", id: 249287, en: "Clutchmates' Caress", ko: "혈족의 애정", source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249922, en: "Tome of Alnscorned Regret", ko: "알른멸시 회한의 고서", source: "Chimaerus", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258047, en: "Spire of the Furious Construct", ko: "격노한 피조물의 척추", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258438, en: "Blazing Sunclaws", ko: "타오르는 태양발톱", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["haste","mastery","vers","crit"];

export var STAT_CACHE_KEY = "resto-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49807:["crit","haste"],49817:["haste","mastery"],151309:["haste","vers"],151316:["haste","vers"],
  151318:["crit","haste"],151319:["crit","mastery"],151336:["crit","haste"],
  193712:["haste","vers"],193714:["haste","mastery"],193718:[],244573:[],
  245769:[],249283:["haste","mastery"],249287:["haste","mastery"],249295:["crit","haste"],
  249312:["haste","mastery"],249334:["haste","vers"],249343:["mastery"],249368:["haste","mastery"],
  249369:["haste","mastery"],249370:["haste","mastery"],249920:["haste"],249922:["haste","mastery"],
  250022:["crit","mastery"],250023:["haste","mastery"],250024:["haste","mastery"],250025:["haste","vers"],
  250247:["haste","mastery"],250256:[],251092:["haste","mastery"],251093:["haste","mastery"],
  251096:["haste","vers"],251111:["crit","haste"],251115:["haste","mastery"],251140:["haste","mastery"],
  251159:["haste","mastery"],251166:["haste","vers"],251171:["haste","mastery"],
  251178:["crit","haste"],251190:["haste","mastery"],251204:["haste","vers"],251210:["haste","vers"],
  251216:["haste","mastery"],258047:["haste","mastery"],258438:["haste","mastery"],258472:["haste","mastery"],
  258525:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
