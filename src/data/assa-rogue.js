export var SPEC_LABEL = "Assassination Rogue";
export var SPEC_KEY = "assa-rogue";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/assassination-rogue-raid-guide";
export var SIMC_CLASS = "rogue";
export var SIMC_SPEC = "assassination";
export var SPEC_ICON = "ability_rogue_deadlybrew";
export var STORAGE_KEY = "bis-assa-rogue-v1";

export var THEME = {
  accent: "#d0c060",
  accentLight: "#e3d9a0",
  accentBg: "#1f1d0e",
  accentBorder: "#494322",
  shimmer: "linear-gradient(90deg,#7d733a,#d0c060,#e3d9a0,#d0c060,#7d733a)",
  btnBg: "linear-gradient(135deg,#7d733a,#d0c060)",
};

export var BIS = [
  { slot: "head", en: "Masquerade of the Grim Jest", ko: "암담한 재담의 가면", id: 250006, source: "Lightblinded Vanguard", stats: ["mastery","vers"] },
  { slot: "neck", en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Venom Casks of the Grim Jest", ko: "암담한 재담의 맹독 보관통", id: 250004, source: "Fallen-King Salhadaar", stats: ["haste","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Fantastic Finery of the Grim Jest", ko: "암담한 재담의 광적인 치장", id: 250009, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Silvermoon Agent's Deflectors", ko: "실버문 요원의 굴절보호대", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", en: "Sleight of Hand of the Grim Jest", ko: "암담한 재담의 손재주", id: 250007, source: "Vorasius", stats: ["crit","haste"] },
  { slot: "waist", en: "Scorn-Scarred Shul'ka's Belt", ko: "멸시의 자취가 남은 술카의 허리띠", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "legs", en: "Nightblade's Pantaloons", ko: "밤의 검의 통바지", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", en: "Canopy Walker's Footwraps", ko: "나무 지붕 방랑자의 발등싸개", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Masterwork Sin'dorei Band", ko: "걸작 신도레이 고리", id: 240949, source: "Crafted", stats: [] },
  { slot: "finger2", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", en: "Belo'ren's Swift Talon", ko: "벨로렌의 날렵한 갈퀴발톱", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
  { slot: "off_hand", en: "Belo'ren's Swift Talon", ko: "벨로렌의 날렵한 갈퀴발톱", id: 249284, source: "Belo'ren", stats: ["crit","mastery"] },
];

export var MYTHIC = [
  { slot: "head", en: "Voidlashed Hood", ko: "공허에 스친 두건", id: 151336, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Enthralled Bonespines", ko: "마법에 걸린 해골가시", id: 251171, source: "Maisara Caverns", stats: ["haste","mastery"] },
  { slot: "back", en: "Rigid Scale Greatcloak", ko: "강도 높은 미늘 큰망토", id: 258575, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "chest", en: "Vest of the Howling Gale", ko: "울부짖는 강풍의 조끼", id: 251099, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Chewed Leather Wristguards", ko: "물어뜯긴 가죽 손목보호구", id: 50264, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "hands", en: "Gloves of Viscous Goo", ko: "농후한 찐득이 장갑", id: 251113, source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { slot: "waist", en: "Snapvine Cinch", ko: "치악덩굴 허리끈", id: 251082, source: "Windrunner Spire", stats: ["crit","mastery"] },
  { slot: "legs", en: "Legwraps of Lingering Legacies", ko: "머무는 유산의 다리싸개", id: 251087, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "feet", en: "Boots of Burning Focus", ko: "타오르는 집중의 장화", id: 258577, source: "Skyreach", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Algeth'ar Academy", stats: ["crit","haste"] },
  { slot: "finger2", en: "Omission of Light", ko: "소외된 빛", id: 251093, source: "Nexus-Point Xenas", stats: ["haste","mastery"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: [] },
  { slot: "main_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", id: 49807, source: "Pit of Saron", stats: ["crit","haste"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 151318, en: "Gloves of the Dark Shroud", ko: "암흑 구름의 장갑", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "hands", id: 249321, en: "Vaelgor's Fearsome Grasp", ko: "바엘고어의 섬찟한 손아귀", source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "legs", id: 49817, en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 178819, en: "Skyterror's Stonehide Leggings", ko: "하늘공포의 돌껍질 다리보호구", source: "Halls of Atonement", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 49806, en: "Flayer's Black Belt", ko: "바위갈퀴의 검은띠", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249295, en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", source: "Windrunner Spire", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251111, en: "Splitshroud Stinger", ko: "갈라진 장막의 쐐기", source: "Magisters' Terrace", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", source: "Algeth'ar Academy & Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251178, en: "Ceremonial Hexblade", ko: "의식용 사술칼날", source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 258218, en: "Skybreaker's Blade", ko: "하늘파괴자의 칼날", source: "Skyreach", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258525, en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", source: "Crown of the Cosmos", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 151315, en: "Bracers of Dark Binding", ko: "암흑의 구속 팔보호구", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, en: "Void-Skinned Bracers", ko: "공허로 무두질한 팔보호구", source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, en: "Fury-fletched Armlets", ko: "지옥 새김 팔찌", source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","haste","mastery","vers"];

export var STAT_CACHE_KEY = "assa-rogue-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],49817:["haste","mastery"],
  50228:["crit","haste"],50264:["crit","haste"],151315:["crit","haste"],151318:["crit","haste"],
  151336:["crit","haste"],178819:["haste","mastery"],193701:[],240949:[],
  244576:[],249284:["crit","mastery"],249295:["crit","haste"],249312:["haste","mastery"],
  249321:["crit","mastery"],249327:["crit","haste"],249337:["crit","haste"],249343:["mastery"],
  249369:["haste","mastery"],249370:["haste","mastery"],249374:["crit","haste"],249382:["crit","mastery"],
  249920:["haste"],250004:["haste","mastery"],250006:["mastery","vers"],250007:["crit","haste"],
  250009:["crit","mastery"],250256:[],251082:["crit","mastery"],251087:["crit","haste"],
  251092:["haste","mastery"],251093:["haste","mastery"],251099:["crit","mastery"],251111:["crit","haste"],
  251113:["crit","mastery"],251115:["haste","mastery"],251135:["crit","haste"],251171:["haste","mastery"],
  251175:["crit","mastery"],251178:["crit","haste"],251190:["haste","mastery"],251217:["crit","haste"],
  258218:["crit","mastery"],258525:["crit","haste"],258575:["crit","mastery"],258577:["crit","mastery"],
  260423:["crit","haste"],
};

export var DUNGEONS = [
  "Maisara Caverns", "Nexus-Point Xenas", "Windrunner Spire", "Algeth'ar Academy", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach",
];
