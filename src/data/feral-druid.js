export var SPEC_LABEL = "Feral Druid";
export var SPEC_KEY = "feral-druid";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/feral-druid-raid-guide";
export var SIMC_CLASS = "druid";
export var SIMC_SPEC = "feral";
export var SPEC_ICON = "ability_druid_catform";
export var STORAGE_KEY = "bis-feral-druid-v1";

export var THEME = {
  accent: "#d4a017",
  accentLight: "#e5c674",
  accentBg: "#201803",
  accentBorder: "#4a3808",
  shimmer: "linear-gradient(90deg,#7f600e,#d4a017,#e5c674,#d4a017,#7f600e)",
  btnBg: "linear-gradient(135deg,#7f600e,#d4a017)",
};

export var BIS = [
  { slot: "head", en: "Branches of the Luminous Bloom", ko: "영롱한 꽃의 나뭇가지", id: 250024, source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { slot: "neck", en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", id: 249337, source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Seedpods of the Luminous Bloom", ko: "영롱한 꽃의 씨앗 깍지", id: 250022, source: "Fallen-King Salhadaar", stats: ["crit","mastery"] },
  { slot: "back", en: "Draconic Nullcape", ko: "용족 무위단망토", id: 249370, source: "Vaelgor & Ezzorak", stats: ["haste","mastery"] },
  { slot: "chest", en: "Trunk of the Luminous Bloom", ko: "영롱한 꽃의 밑동", id: 250027, source: "Chimaerus", stats: ["crit","mastery"] },
  { slot: "wrist", en: "Silvermoon Agent's Deflectors", ko: "실버문 요원의 굴절보호대", id: 244576, source: "Crafted", stats: [] },
  { slot: "hands", en: "Arbortenders of the Luminous Bloom", ko: "영롱한 꽃의 나무지기", id: 250025, source: "Vorasius", stats: ["haste","vers"] },
  { slot: "waist", en: "Scorn-Scarred Shul'ka's Belt", ko: "멸시의 자취가 남은 술카의 허리띠", id: 249374, source: "Chimaerus", stats: ["crit","haste"] },
  { slot: "legs", en: "Nightblade's Pantaloons", ko: "밤의 검의 통바지", id: 249312, source: "Crown of the Cosmos", stats: ["haste","mastery"] },
  { slot: "feet", en: "Canopy Walker's Footwraps", ko: "나무 지붕 방랑자의 발등싸개", id: 249382, source: "Crown of the Cosmos", stats: ["crit","mastery"] },
  { slot: "finger1", en: "Masterwork Sin'dorei Band", ko: "걸작 신도레이 고리", id: 240949, source: "Crafted", stats: [] },
  { slot: "finger2", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", en: "Algeth'ar Puzzle Box", ko: "알게타르 수수께끼 상자", id: 193701, source: "Algeth'ar Academy", stats: [] },
  { slot: "trinket2", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "main_hand", en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
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
  { slot: "main_hand", en: "Roostwarden's Bough", ko: "뿌리감시관의 가지", id: 251077, source: "Windrunner Spire", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "back", id: 251190, en: "Bloodthorn Burnous", ko: "핏빛가시 겉옷", source: "Skyreach", stats: ["haste","mastery"] },
  { forSlot: "hands", id: 249321, en: "Vaelgor's Fearsome Grasp", ko: "바엘고어의 섬찟한 손아귀", source: "Vaelgor & Ezzorak", stats: ["crit","mastery"] },
  { forSlot: "hands", id: 251204, en: "Corewright's Zappers", ko: "핵장인의 제어 장치", source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { forSlot: "head", id: 251140, en: "Vilefiend's Guise", ko: "썩은마귀의 복면", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 49817, en: "Shaggy Wyrmleather Leggings", ko: "털이 많은 고룡가죽 다리보호구", source: "Pit of Saron", stats: ["haste","mastery"] },
  { forSlot: "legs", id: 250023, en: "Phloemwraps of the Luminous Bloom", ko: "영롱한 꽃의 체관싸개", source: "Tier", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 49812, en: "Purloined Wedding Ring", ko: "훔친 결혼반지", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "ring", id: 249369, en: "Bond of Light", ko: "빛의 결속", source: "Lightblinded Vanguard", stats: ["haste","mastery"] },
  { forSlot: "ring", id: 251115, en: "Bifurcation Band", ko: "분기점의 고리", source: "Magisters' Terrace", stats: ["haste","mastery"] },
  { forSlot: "shoulder", id: 151319, en: "Twilight's Edge Spaulders", ko: "황혼의 서슬 어깨덮개", source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "shoulder", id: 251092, en: "Fallen Grunt's Mantle", ko: "전사한 그런트의 어깨덧옷", source: "Windrunner Spire", stats: ["haste","mastery"] },
  { forSlot: "waist", id: 49806, en: "Flayer's Black Belt", ko: "바위갈퀴의 검은띠", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 49807, en: "Krick's Beetle Stabber", ko: "크리크의 딱정벌레 단도", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249277, en: "Bellamy's Final Judgement", ko: "벨라미의 마지막 심판", source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 258514, en: "Umbral Spire of Zuraal", ko: "주라알의 암영 뾰족지팡이", source: "Seat of the Triumvirate", stats: ["crit","mastery"] },
  { forSlot: "wrist", id: 151315, en: "Bracers of Dark Binding", ko: "암흑의 구속 팔보호구", source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 249327, en: "Void-Skinned Bracers", ko: "공허로 무두질한 팔보호구", source: "Vorasius", stats: ["crit","haste"] },
  { forSlot: "wrist", id: 251135, en: "Fury-fletched Armlets", ko: "지옥 새김 팔찌", source: "Magisters' Terrace", stats: ["crit","haste"] },
];

export var PRIORITY_STATS = ["crit","mastery","haste","vers"];

export var STAT_CACHE_KEY = "feral-druid-stat-cache-v1";

export var KNOWN_STATS = {
  49806:["crit","haste"],49807:["crit","haste"],49812:["crit","haste"],49817:["haste","mastery"],
  50228:["crit","haste"],50264:["crit","haste"],151315:["crit","haste"],151319:["crit","mastery"],
  151336:["crit","haste"],193701:[],240949:[],244576:[],
  249277:["crit","mastery"],249312:["haste","mastery"],249321:["crit","mastery"],249327:["crit","haste"],
  249337:["crit","haste"],249343:["mastery"],249369:["haste","mastery"],249370:["haste","mastery"],
  249374:["crit","haste"],249382:["crit","mastery"],249920:["haste"],250022:["crit","mastery"],
  250023:["haste","mastery"],250024:["haste","mastery"],250025:["haste","vers"],250027:["crit","mastery"],
  250256:[],251077:["crit","mastery"],251082:["crit","mastery"],251087:["crit","haste"],
  251092:["haste","mastery"],251093:["haste","mastery"],251099:["crit","mastery"],251113:["crit","mastery"],
  251115:["haste","mastery"],251135:["crit","haste"],251140:["haste","mastery"],251171:["haste","mastery"],
  251190:["haste","mastery"],251204:["haste","vers"],251217:["crit","haste"],258514:["crit","mastery"],
  258575:["crit","mastery"],258577:["crit","mastery"],
};

