// One-time migration script: convert Korean slot/forSlot/SPEC_LABEL to English in all spec data files
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

var SLOT_KO_TO_EN = {
  "머리": "head", "목": "neck", "어깨": "shoulder", "망토": "back",
  "가슴": "chest", "손목": "wrist", "장갑": "hands", "허리": "waist",
  "다리": "legs", "발": "feet",
  "반지 1": "finger1", "반지 2": "finger2",
  "장신구 1": "trinket1", "장신구 2": "trinket2",
  "무기": "main_hand", "보조 무기": "off_hand", "주 무기": "main_hand_2h", "방패": "off_hand_shield",
};

var FOR_SLOT_KO_TO_EN = {
  "머리": "head", "목": "neck", "어깨": "shoulder", "망토": "back",
  "가슴": "chest", "손목": "wrist", "장갑": "hands", "허리": "waist",
  "다리": "legs", "발": "feet",
  "무기": "weapon", "반지": "ring", "장신구": "trinket",
};

// SPEC_LABEL mapping: Korean -> English
var SPEC_LABEL_MAP = {
  "혈기 죽음의 기사": "Blood Death Knight",
  "냉기 죽음의 기사": "Frost Death Knight",
  "부정 죽음의 기사": "Unholy Death Knight",
  "파멸 악마사냥꾼": "Havoc Demon Hunter",
  "포식 악마사냥꾼": "Devourer Demon Hunter",
  "복수 악마사냥꾼": "Vengeance Demon Hunter",
  "조화 드루이드": "Balance Druid",
  "야성 드루이드": "Feral Druid",
  "수호 드루이드": "Guardian Druid",
  "복원 드루이드": "Restoration Druid",
  "황폐 기원사": "Devastation Evoker",
  "보존 기원사": "Preservation Evoker",
  "증강 기원사": "Augmentation Evoker",
  "야수 사냥꾼": "Beast Mastery Hunter",
  "사격 사냥꾼": "Marksmanship Hunter",
  "생존 사냥꾼": "Survival Hunter",
  "비전 마법사": "Arcane Mage",
  "화염 마법사": "Fire Mage",
  "냉기 마법사": "Frost Mage",
  "양조 수도사": "Brewmaster Monk",
  "풍운 수도사": "Windwalker Monk",
  "운무 수도사": "Mistweaver Monk",
  "신성 성기사": "Holy Paladin",
  "보호 성기사": "Protection Paladin",
  "징벌 성기사": "Retribution Paladin",
  "수양 사제": "Discipline Priest",
  "신성 사제": "Holy Priest",
  "암흑 사제": "Shadow Priest",
  "암살 도적": "Assassination Rogue",
  "무법 도적": "Outlaw Rogue",
  "잠행 도적": "Subtlety Rogue",
  "정기 주술사": "Elemental Shaman",
  "고양 주술사": "Enhancement Shaman",
  "복원 주술사": "Restoration Shaman",
  "고통 흑마법사": "Affliction Warlock",
  "악마 흑마법사": "Demonology Warlock",
  "파괴 흑마법사": "Destruction Warlock",
  "무기 전사": "Arms Warrior",
  "분노 전사": "Fury Warrior",
  "보호 전사": "Protection Warrior",
};

var dataDir = join(import.meta.dirname, '..', 'src', 'data');
var files = readdirSync(dataDir).filter(f => f.endsWith('.js') && f !== 'shared.js' && f !== 'specs.js');

var changed = 0;
for (var file of files) {
  var path = join(dataDir, file);
  var content = readFileSync(path, 'utf8');
  var original = content;

  // 1. Replace SPEC_LABEL
  content = content.replace(/^(export var SPEC_LABEL = )"([^"]+)";/m, function(_, prefix, koLabel) {
    var en = SPEC_LABEL_MAP[koLabel];
    if (!en) { console.warn("  WARN: no mapping for SPEC_LABEL=" + koLabel + " in " + file); return prefix + '"' + koLabel + '";'; }
    return prefix + '"' + en + '";';
  });

  // 2. Replace BIS items: { slot: "Korean", simcSlot: "english", ... } -> { slot: "english", ... }
  content = content.replace(/\{ slot: "[^"]*", simcSlot: "([^"]*)",/g, function(_, simcSlot) {
    return '{ slot: "' + simcSlot + '",';
  });

  // 3. Replace ALTS forSlot: "Korean" -> forSlot: "english"
  content = content.replace(/forSlot: "([^"]*)"/g, function(_, koSlot) {
    var en = FOR_SLOT_KO_TO_EN[koSlot];
    if (!en) { console.warn("  WARN: no mapping for forSlot=" + koSlot + " in " + file); return 'forSlot: "' + koSlot + '"'; }
    return 'forSlot: "' + en + '"';
  });

  if (content !== original) {
    writeFileSync(path, content, 'utf8');
    changed++;
    console.log("  migrated: " + file);
  }
}

console.log("\nDone: " + changed + " files migrated out of " + files.length + " total.");
