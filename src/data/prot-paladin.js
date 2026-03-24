export var SPEC_LABEL = "Protection Paladin";
export var SPEC_KEY = "prot-paladin";
export var SIMC_CLASS = "paladin";
export var SIMC_SPEC = "protection";
export var SPEC_ICON = "ability_paladin_shieldofthetemplar";
export var GUIDE_URL = "https://maxroll.gg/wow/class-guides/protection-paladin-raid-guide";
export var STORAGE_KEY = "bis-prot-paladin-v1";

export var THEME = {
  accent: "#c9a227",
  accentLight: "#dfc77d",
  accentBg: "#1e1806",
  accentBorder: "#46390e",
  shimmer: "linear-gradient(90deg,#796117,#c9a227,#dfc77d,#c9a227,#796117)",
  btnBg: "linear-gradient(135deg,#796117,#c9a227)",
};

export var BIS = [
  { slot: "head", en: "Luminant Verdict's Unwavering Gaze", ko: "빛나는 선고의 흔들림 없는 시선", id: 249961, source: "Tier", stats: ["haste","mastery"] },
  { slot: "neck", en: "Masterwork Sin'dorei Amulet", ko: "걸작 신도레이 아뮬렛", id: 240950, source: "Crafted", stats: [] },
  { slot: "shoulder", en: "Luminant Verdict's Providence Watch", ko: "빛나는 선고의 섭리의 경계", id: 249959, source: "Tier", stats: ["crit","mastery"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Sunbound Breastplate", ko: "태양결속 가슴보호갑", id: 249309, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "wrist", en: "Vambraces of Lost Hope", ko: "잃어버린 희망의 완갑", id: 151328, source: "Midnight Falls", stats: ["crit","haste"] },
  { slot: "hands", en: "Luminant Verdict's Gauntlets", ko: "빛나는 선고의 건틀릿", id: 249962, source: "Tier", stats: ["haste","vers"] },
  { slot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Luminant Verdict's Greaves", ko: "빛나는 선고의 경갑", id: 249960, source: "Tier", stats: ["crit","haste"] },
  { slot: "feet", en: "Sabatons of Furious Revenge", ko: "격노한 복수의 발덮개", id: 251091, source: "Windrunner Spire", stats: ["crit","vers"] },
  { slot: "finger1", en: "Signet of Azerothian Blessings", ko: "아제로스의 축복 인장", id: 241140, source: "Crafted", stats: ["mastery","vers"] },
  { slot: "finger2", en: "Eye of Midnight", ko: "한밤의 눈", id: 249920, source: "Midnight Falls", stats: ["haste"] },
  { slot: "trinket1", en: "Gaze of the Alnseer", ko: "알른 선견자의 응시", id: 249343, source: "Chimaerus", stats: ["mastery"] },
  { slot: "trinket2", en: "Umbral Plume", ko: "암영의 꽁지깃", id: 260235, source: "Belo'ren", stats: [] },
  { slot: "main_hand", en: "Turalyon's False Echo", ko: "투랄리온의 마지막 메아리", id: 249295, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Bulwark of Noble Resolve", ko: "귀족의 결의 보루 방패", id: 249275, source: "Imperator Averzian", stats: ["crit","vers"] },
];

export var MYTHIC = [
  { slot: "head", en: "Skeleton Lord's Cranium", ko: "해골 군주의 두개골", id: 49819, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "neck", en: "Barbed Ymirheim Choker", ko: "뾰족한 이미르하임 목장식", id: 50228, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "shoulder", en: "Searing Spaulders", ko: "작열하는 어깨덮개", id: 251157, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "back", en: "Defiant Defender's Drape", ko: "저항하는 수호자의 외투", id: 260312, source: "Magisters' Terrace", stats: ["crit","haste"] },
  { slot: "chest", en: "Frost Wyrm Ribcage", ko: "서리고룡 뼈갑옷", id: 50272, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "wrist", en: "Kasreth's Bindings", ko: "카스레스의 결속띠", id: 251203, source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { slot: "hands", en: "Embergrove Grasps", ko: "잿불숲 손아귀", id: 251081, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "waist", en: "Bent Gold Belt", ko: "구부러진 황금띠", id: 49808, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "legs", en: "Lightscarred Cuisses", ko: "빛흉터 다리가리개", id: 251208, source: "Nexus-Point Xenas", stats: ["haste","vers"] },
  { slot: "feet", en: "Sabatons of Furious Revenge", ko: "격노한 복수의 발덮개", id: 251091, source: "Windrunner Spire", stats: ["crit","vers"] },
  { slot: "finger1", en: "Occlusion of Void", ko: "공허의 맞물림", id: 251217, source: "Nexus-Point Xenas", stats: ["crit","haste"] },
  { slot: "finger2", en: "Purloined Wedding Ring", ko: "훔친 결혼반지", id: 49812, source: "Pit of Saron", stats: ["crit","haste"] },
  { slot: "trinket1", en: "Heart of Wind", ko: "바람의 심장", id: 250256, source: "Windrunner Spire", stats: ["crit","haste"] },
  { slot: "trinket2", en: "Solarflare Prism", ko: "태양섬광 분광경", id: 252420, source: "Skyreach", stats: [] },
  { slot: "main_hand", en: "Scepter of the Endless Night", ko: "끝없는 밤의 홀", id: 258525, source: "Seat of the Triumvirate", stats: ["crit","haste"] },
  { slot: "off_hand", en: "Viryx's Indomitable Bulwark", ko: "비릭스의 불굴의 보루 방패", id: 258049, source: "Skyreach", stats: ["crit","mastery"] },
];

export var ALTS = [
  { forSlot: "hands", id: 151332, en: "Voidclaw Gauntlets", ko: "공허발톱 건틀릿", source: "Seat of the Triumvirate", stats: ["haste","vers"] },
  { forSlot: "neck", id: 249337, en: "Ribbon of Coiled Malice", ko: "뒤틀린 악의의 리본", source: "Fallen-King Salhadaar", stats: ["crit","haste"] },
  { forSlot: "ring", id: 221200, en: "Radiant Necromancer's Band", ko: "찬란한 강령술사의 고리", source: "Midnight Falls", stats: ["mastery","vers"] },
  { forSlot: "shoulder", id: 50234, en: "Shoulderplates of Frozen Blood", ko: "얼어붙은 피의 어깨철갑", source: "Pit of Saron", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 49802, en: "Garfrost's Two-Ton Hammer", ko: "가프로스트의 2톤 망치", source: "Pit of Saron", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 249277, en: "Bellamy's Final Judgement", ko: "벨라미의 마지막 심판", source: "Lightblinded Vanguard", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251105, en: "Ward of the Spellbreaker", ko: "주문파괴자의 수호물", source: "Magisters' Terrace", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251162, en: "Traitor's Talon", ko: "배신자의 갈퀴발톱", source: "Maisara Caverns", stats: ["crit","haste"] },
  { forSlot: "weapon", id: 251168, en: "Liferipper's Cutlass", ko: "생명 약탈자의 커틀라스", source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251175, en: "Soulblight Cleaver", ko: "영혼역병 가로날도끼", source: "Maisara Caverns", stats: ["crit","mastery"] },
  { forSlot: "weapon", id: 251202, en: "Reflux Reflector", ko: "역류 굴절 장치", source: "Nexus-Point Xenas", stats: ["crit","vers"] },
  { forSlot: "weapon", id: 260423, en: "Arator's Swift Remembrance", ko: "아라토르의 신속한 기억", source: "Crown of the Cosmos", stats: ["crit","haste"] },
];

export var WORST_STATS = ["mastery"];

export var STAT_CACHE_KEY = "prot-paladin-stat-cache-v1";

export var KNOWN_STATS = {
  49802:["crit","haste"],49807:["crit","haste"],49808:["crit","haste"],49812:["crit","haste"],
  49819:["crit","haste"],50228:["crit","haste"],50234:["crit","mastery"],50272:["crit","haste"],
  250256:[],151328:["crit","haste"],151332:["haste","vers"],221200:["mastery","vers"],
  240950:[],241140:["mastery","vers"],249275:["crit","vers"],249277:["crit","mastery"],
  249284:["crit","mastery"],249288:["crit","haste"],249295:["crit","haste"],249309:["crit","haste"],
  249337:["crit","haste"],249343:["mastery"],249920:["haste"],249949:["crit","haste"],
  249951:["crit","haste"],249952:["haste","mastery"],249955:["crit","haste"],249959:["crit","mastery"],
  249960:["crit","haste"],249961:["haste","mastery"],249962:["haste","vers"],249970:["haste","mastery"],
  249973:["crit","haste"],250010:["crit","haste"],251081:["crit","haste"],251091:["crit","vers"],
  251094:["crit","vers"],251095:["crit","haste"],251105:["crit","mastery"],251111:["crit","haste"],
  251157:["crit","haste"],251162:["crit","haste"],251168:["crit","mastery"],251175:["crit","mastery"],
  251178:["crit","haste"],251202:["crit","vers"],251203:["crit","vers"],251208:["haste","vers"],
  251217:["crit","haste"],252420:[],258049:["crit","mastery"],258525:["crit","haste"],
  260235:[],260312:["crit","haste"],260423:["crit","haste"],
};

export var DUNGEONS = [
  "Nexus-Point Xenas", "Windrunner Spire", "Magisters' Terrace", "Pit of Saron", "Seat of the Triumvirate", "Skyreach", "Maisara Caverns",
];
