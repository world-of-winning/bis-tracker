import { useState, useCallback } from 'react';
import { SPECS, getSpec, findSpecBySimC } from './data/specs.js';
import { CHANGELOG } from './data/changelog.js';
import { getSampleChars, SAMPLE_CHARS } from './data/sample.js';
import { load, save as persist } from './storage.js';
import { GEAR_SLOTS, TIERS } from './data/shared.js';
import { useLocale } from './i18n/index.jsx';
import BisTracker from './components/BisTracker.jsx';
import TutorialOverlay from './components/TutorialOverlay.jsx';
import { TUTORIAL_STEPS } from './data/tutorial.js';

var ICON_BASE = "https://wow.zamimg.com/images/wow/icons/medium/";
var CLASS_COLOR = {
  paladin: "#F48CBA", warrior: "#C69B6D", mage: "#3FC7EB", priest: "#FFFFFF",
  shaman: "#0070DD", druid: "#FF7C0A", hunter: "#AAD372", warlock: "#8788EE",
  rogue: "#FFF468", monk: "#00FF98", deathknight: "#C41E3A",
  demonhunter: "#A330C9", evoker: "#33937F"
};
var CLASS_ICON = {
  paladin: "classicon_paladin", warrior: "classicon_warrior", mage: "classicon_mage",
  priest: "classicon_priest", shaman: "classicon_shaman", druid: "classicon_druid",
  hunter: "classicon_hunter", warlock: "classicon_warlock", rogue: "classicon_rogue",
  monk: "classicon_monk", deathknight: "classicon_deathknight",
  demonhunter: "classicon_demonhunter", evoker: "classicon_evoker"
};
var CHARS_KEY = "bis-chars";
var LAST_CHAR_KEY = "bis-last-char";

var SPEC_GROUPS = (function() {
  var groups = {};
  SPECS.forEach(function(s) {
    var cls = s.SIMC_CLASS;
    if (!groups[cls]) groups[cls] = [];
    groups[cls].push(s);
  });
  return groups;
})();

function detectSimC(text) {
  var lines = text.split("\n"), ci = {}, cnt = 0;
  var sp = GEAR_SLOTS.join("|");
  for (var i = 0; i < lines.length; i++) {
    var t = lines[i].trim();
    var cm0 = t.match(/^(paladin|warrior|mage|priest|shaman|druid|hunter|warlock|rogue|monk|deathknight|demonhunter|evoker)="(.+)"$/);
    if (cm0) { ci.className = cm0[1]; ci.name = cm0[2]; continue; }
    if (t.indexOf("spec=") === 0) { ci.spec = t.split("=")[1]; continue; }
    var gm = t.match(new RegExp("^(" + sp + ")="));
    if (gm) cnt++;
  }
  return { ci: ci, cnt: cnt };
}

function loadCharsIndex() {
  return load(CHARS_KEY) || {};
}

function saveCharsIndex(index) {
  persist(CHARS_KEY, index);
}

function addCharToIndex(specKey, charName) {
  var index = loadCharsIndex();
  if (!index[specKey]) index[specKey] = [];
  if (index[specKey].indexOf(charName) === -1) index[specKey].push(charName);
  saveCharsIndex(index);
}

function removeCharFromIndex(specKey, charName) {
  var index = loadCharsIndex();
  if (!index[specKey]) return;
  index[specKey] = index[specKey].filter(function(n) { return n !== charName; });
  if (index[specKey].length === 0) delete index[specKey];
  saveCharsIndex(index);
}

// Migrate old single-character storage to new per-character format
function migrateOldData() {
  var migrated = false;
  SPECS.forEach(function(s) {
    var d = load(s.STORAGE_KEY);
    if (d && d.sr && d.sr.ci && d.sr.ci.name) {
      var name = d.sr.ci.name;
      var newKey = s.STORAGE_KEY + ":" + name;
      if (!load(newKey)) {
        persist(newKey, d);
        addCharToIndex(s.SPEC_KEY, name);
        migrated = true;
      }
      persist(s.STORAGE_KEY, null);
      try { localStorage.removeItem(s.STORAGE_KEY); } catch(e) {}
    }
  });
  return migrated;
}

function cleanCharsIndex() {
  var index = loadCharsIndex();
  var changed = false;
  Object.keys(index).forEach(function(sk) {
    var s = SPECS.find(function(sp) { return sp.SPEC_KEY === sk; });
    if (!s) { delete index[sk]; changed = true; return; }
    index[sk] = index[sk].filter(function(name) {
      var d = load(s.STORAGE_KEY + ":" + name);
      if (!d || !d.sr) { changed = true; return false; }
      return true;
    });
    if (index[sk].length === 0) { delete index[sk]; changed = true; }
  });
  if (changed) saveCharsIndex(index);
  return index;
}

function findInitialChar() {
  migrateOldData();
  var index = cleanCharsIndex();
  var last = load(LAST_CHAR_KEY);
  if (last && index[last.specKey] && index[last.specKey].indexOf(last.charName) !== -1) {
    return last;
  }
  for (var i = 0; i < SPECS.length; i++) {
    var chars = index[SPECS[i].SPEC_KEY];
    if (chars && chars.length > 0) {
      return { specKey: SPECS[i].SPEC_KEY, charName: chars[0] };
    }
  }
  return null;
}

var LEGAL_CONTENT = {
  terms: {
    ko: {
      title: "이용약관",
      sections: [
        { heading: "제1조 (목적)", body: "이 약관은 Midnight BiS Tracker(이하 '서비스')의 이용에 관한 기본적인 사항을 규정합니다." },
        { heading: "제2조 (서비스의 내용)", body: "서비스는 World of Warcraft의 Best in Slot 아이템을 추적하기 위한 무료 도구를 제공합니다. 서비스는 Blizzard Entertainment와 공식적인 관련이 없으며, World of Warcraft 및 관련 상표는 Blizzard Entertainment, Inc.에 귀속됩니다." },
        { heading: "제3조 (데이터 저장)", body: "모든 사용자 데이터는 브라우저의 localStorage에 저장되며, 외부 서버로 전송되지 않습니다. 브라우저 데이터를 삭제하면 저장된 정보가 사라질 수 있습니다." },
        { heading: "제4조 (면책조항)", body: "서비스는 '있는 그대로' 제공되며, 정확성이나 완전성을 보장하지 않습니다. BiS 데이터는 Maxroll.gg 등 외부 출처를 기반으로 하며, 게임 패치에 따라 변경될 수 있습니다. 서비스 이용으로 인한 어떠한 손해에 대해서도 책임을 지지 않습니다." },
        { heading: "제5조 (외부 서비스)", body: "서비스는 Wowhead 툴팁 API 및 스크립트를 사용합니다. 해당 외부 서비스의 이용에는 각 서비스의 이용약관 및 개인정보처리방침이 적용됩니다." },
        { heading: "제6조 (지적재산권)", body: "서비스의 소스 코드는 GitHub에서 공개되어 있습니다. World of Warcraft 관련 콘텐츠의 저작권은 Blizzard Entertainment, Inc.에 있습니다." },
        { heading: "제7조 (약관의 변경)", body: "본 약관은 사전 고지 없이 변경될 수 있으며, 변경된 약관은 서비스에 게시됨과 동시에 효력이 발생합니다." }
      ]
    },
    en: {
      title: "Terms of Service",
      sections: [
        { heading: "1. Purpose", body: "These terms govern the use of Midnight BiS Tracker (the 'Service')." },
        { heading: "2. Service Description", body: "The Service provides a free tool for tracking Best in Slot items in World of Warcraft. The Service is not affiliated with Blizzard Entertainment. World of Warcraft and related trademarks belong to Blizzard Entertainment, Inc." },
        { heading: "3. Data Storage", body: "All user data is stored in your browser's localStorage and is never transmitted to external servers. Clearing your browser data may result in loss of saved information." },
        { heading: "4. Disclaimer", body: "The Service is provided 'as is' without warranty of accuracy or completeness. BiS data is based on external sources such as Maxroll.gg and may change with game patches. We are not liable for any damages resulting from use of the Service." },
        { heading: "5. Third-Party Services", body: "The Service uses the Wowhead tooltip API and scripts. Use of these external services is subject to their respective terms of service and privacy policies." },
        { heading: "6. Intellectual Property", body: "The Service's source code is available on GitHub. World of Warcraft content copyrights belong to Blizzard Entertainment, Inc." },
        { heading: "7. Changes to Terms", body: "These terms may be updated without prior notice. Changes take effect upon posting to the Service." }
      ]
    }
  },
  privacy: {
    ko: {
      title: "개인정보처리방침",
      sections: [
        { heading: "제1조 (수집하는 개인정보)", body: "본 서비스는 별도의 회원가입을 요구하지 않으며, 서버에 개인정보를 수집하거나 저장하지 않습니다. 사용자가 입력한 캐릭터 정보 및 장비 데이터는 오직 브라우저의 localStorage에만 저장됩니다." },
        { heading: "제2조 (쿠키 및 로컬 스토리지)", body: "서비스는 기능 제공을 위해 브라우저의 localStorage를 사용합니다. 이 데이터는 사용자의 기기에만 존재하며 외부로 전송되지 않습니다." },
        { heading: "제3조 (제3자 서비스)", body: "서비스는 다음 외부 서비스를 사용하며, 각 서비스의 개인정보처리방침이 적용됩니다:\n• Wowhead (wow.zamimg.com) — 아이템 툴팁 표시 및 스탯 조회\n• Google Fonts — 웹 폰트 제공\n• Cloudflare Pages — 웹사이트 호스팅\n\n이러한 외부 서비스는 자체적으로 IP 주소 등 기본적인 접속 정보를 수집할 수 있습니다." },
        { heading: "제4조 (데이터 삭제)", body: "브라우저의 사이트 데이터 삭제 기능을 통해 언제든지 저장된 모든 데이터를 삭제할 수 있습니다. 서비스 내 '초기화' 기능을 통해 개별 캐릭터 데이터를 삭제할 수도 있습니다." },
        { heading: "제5조 (아동의 개인정보)", body: "본 서비스는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다." },
        { heading: "제6조 (방침의 변경)", body: "본 개인정보처리방침은 사전 고지 없이 변경될 수 있으며, 변경 사항은 서비스에 게시됨과 동시에 효력이 발생합니다." },
        { heading: "연락처", body: "개인정보 관련 문의는 Discord 채널을 통해 접수하실 수 있습니다." }
      ]
    },
    en: {
      title: "Privacy Policy",
      sections: [
        { heading: "1. Information We Collect", body: "The Service does not require registration and does not collect or store personal information on any server. Character and gear data entered by users is stored only in the browser's localStorage." },
        { heading: "2. Cookies & Local Storage", body: "The Service uses browser localStorage to provide its functionality. This data exists only on your device and is never transmitted externally." },
        { heading: "3. Third-Party Services", body: "The Service uses the following external services, each subject to their own privacy policies:\n• Wowhead (wow.zamimg.com) — Item tooltips and stat lookups\n• Google Fonts — Web font delivery\n• Cloudflare Pages — Website hosting\n\nThese external services may collect basic connection information such as IP addresses." },
        { heading: "4. Data Deletion", body: "You can delete all stored data at any time through your browser's site data settings. You can also delete individual character data using the 'Reset' feature within the Service." },
        { heading: "5. Children's Privacy", body: "The Service does not intentionally collect personal information from children under the age of 14." },
        { heading: "6. Changes to This Policy", body: "This privacy policy may be updated without prior notice. Changes take effect upon posting to the Service." },
        { heading: "Contact", body: "For privacy-related inquiries, please reach out through our Discord channel." }
      ]
    }
  }
};

function LegalModal(props) {
  var page = props.page;
  var locale = props.locale;
  var onClose = props.onClose;
  if (!page) return null;
  var content = LEGAL_CONTENT[page][locale] || LEGAL_CONTENT[page].en;
  return (
    <div onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.75)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={function(e) { e.stopPropagation(); }} style={{ background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 12, maxWidth: 640, width: "100%", maxHeight: "80vh", overflow: "auto", padding: "32px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#c9a227", fontFamily: "'Cinzel',serif" }}>{content.title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #2a2a3a", borderRadius: 6, color: "#556666", fontSize: 18, cursor: "pointer", padding: "2px 10px", lineHeight: 1.2 }}>&times;</button>
        </div>
        {content.sections.map(function(sec, i) {
          return (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#998866", marginBottom: 6 }}>{sec.heading}</h3>
              <p style={{ fontSize: 13, color: "#778888", lineHeight: 1.7, whiteSpace: "pre-line" }}>{sec.body}</p>
            </div>
          );
        })}
        <div style={{ marginTop: 16, fontSize: 11, color: "#334444", textAlign: "center" }}>
          {locale === "ko" ? "최종 수정일: 2026년 3월 24일" : "Last updated: March 24, 2026"}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var { t, locale, setLocale } = useLocale();
  var initial = findInitialChar();
  var [specKey, setSpecKey] = useState(initial ? initial.specKey : null);
  var [charName, setCharName] = useState(initial ? initial.charName : null);
  var [pendingSimcText, setPendingSimcText] = useState("");
  var [landingText, setLandingText] = useState("");
  var [landingFeedback, setLandingFeedback] = useState(null);
  var [charsRev, setCharsRev] = useState(0);
  var [tutorialStep, setTutorialStep] = useState(null);
  var [legalPage, setLegalPage] = useState(null);
  var [sampleMode, setSampleMode] = useState(function() {
    // Detect sample mode by checking if any sample character exists
    var index = loadCharsIndex();
    return SAMPLE_CHARS.some(function(c) {
      return index[c.specKey] && index[c.specKey].indexOf(c.name) !== -1;
    });
  });
  var spec = specKey ? getSpec(specKey) : null;
  var charsIndex = cleanCharsIndex();
  var allChars = [];
  SPECS.forEach(function(s) {
    var chars = charsIndex[s.SPEC_KEY];
    if (chars) chars.forEach(function(name) {
      allChars.push({ specKey: s.SPEC_KEY, charName: name, spec: s });
    });
  });

  function selectChar(sk, cn) {
    setSpecKey(sk);
    setCharName(cn);
    setPendingSimcText("");
    persist(LAST_CHAR_KEY, { specKey: sk, charName: cn });
  }

  var handlePaste = useCallback(function(e) {
    var text = e.clipboardData.getData('text');
    if (!text || !text.trim()) return;
    e.preventDefault();
    setLandingText(text);
    var result = detectSimC(text);
    if (result.cnt === 0) {
      setLandingFeedback({ ok: false, msg: t("ui.noGearData") });
      return;
    }
    if (!result.ci.className || !result.ci.spec) {
      setLandingFeedback({ ok: false, msg: t("ui.noClassSpec") });
      return;
    }
    var found = findSpecBySimC(result.ci.className, result.ci.spec);
    if (found) {
      var name = result.ci.name || "Unknown";
      setSpecKey(found.SPEC_KEY);
      setCharName(name);
      setPendingSimcText(text);
      setLandingFeedback(null);
      persist(LAST_CHAR_KEY, { specKey: found.SPEC_KEY, charName: name });
    } else {
      var clsName = t("classes." + result.ci.className) || result.ci.className;
      var specName = t("specs." + result.ci.spec) || result.ci.spec;
      setLandingFeedback({ ok: false, msg: t("ui.unsupportedSpec", { cls: clsName, spec: specName }) });
    }
  }, [t]);

  var handleTrySample = useCallback(function() {
    var samples = getSampleChars();
    // Pre-populate storage for all sample characters
    samples.forEach(function(s) {
      addCharToIndex(s.spec.SPEC_KEY, s.name);
    });
    // Load the first sample character
    var first = samples[0];
    // Pre-set target tier based on sample ilvl for the first character
    var firstKey = first.spec.STORAGE_KEY + ":" + first.name;
    var existing = load(firstKey);
    if (!existing) persist(firstKey, { acq: {}, sr: null, targetTier: null });
    setSpecKey(first.spec.SPEC_KEY);
    setCharName(first.name);
    setPendingSimcText(first.simcText);
    setLandingFeedback(null);
    setCharsRev(function(r) { return r + 1; });
    persist(LAST_CHAR_KEY, { specKey: first.spec.SPEC_KEY, charName: first.name });
    // Trigger import for remaining characters via their BisTracker storage
    samples.slice(1).forEach(function(s) {
      var key = s.spec.STORAGE_KEY + ":" + s.name;
      if (!load(key)) {
        // Parse and store directly
        var lines = s.simcText.split("\n"), gear = {}, ci = {}, pend = null;
        var sp = "head|neck|shoulder|back|chest|wrist|hands|waist|legs|feet|finger1|finger2|trinket1|trinket2|main_hand|off_hand";
        for (var i = 0; i < lines.length; i++) {
          var t = lines[i].trim();
          var cm0 = t.match(/^(paladin|warrior|mage|priest|shaman|druid|hunter|warlock|rogue|monk|deathknight|demonhunter|evoker)="(.+)"$/);
          if (cm0) { ci.className = cm0[1]; ci.name = cm0[2]; continue; }
          if (t.indexOf("spec=") === 0) { ci.spec = t.split("=")[1]; continue; }
          var cm = t.match(/^#\s+(.+?)\s*\((\d+)\)\s*$/);
          if (cm) { pend = { name: cm[1], ilvl: parseInt(cm[2], 10) }; continue; }
          var gm = t.match(new RegExp("^(" + sp + ")=([^,]*),id=(\\d+)"));
          if (gm) {
            var bMatch = t.match(/bonus_id=([0-9/]+)/);
            gear[gm[1]] = { id: parseInt(gm[3], 10), name: pend ? pend.name : "Item", ilvl: pend ? pend.ilvl : null, bonus: bMatch ? bMatch[1].replace(/\//g, ":") : null };
            pend = null; continue;
          }
        }
        var ilvls = Object.values(gear).map(function(g) { return g.ilvl || 0; }).filter(function(v) { return v > 0; });
        ci.avgIlvl = ilvls.length > 0 ? Math.round(ilvls.reduce(function(a, b) { return a + b; }, 0) / ilvls.length) : 0;
        // Match BIS
        var BIS_IDS = new Set(s.spec.BIS.map(function(b) { return b.id; }));
        var matched = {}, eqSlot = {};
        s.spec.BIS.forEach(function(bi) {
          var d = gear[bi.slot];
          if (d && d.id === bi.id) { matched[bi.id] = true; eqSlot[bi.id] = d; return; }
          if (d) eqSlot[bi.id] = d;
        });
        var altItems = {};
        s.spec.BIS.forEach(function(bi) {
          if (matched[bi.id] || !bi.stats.length) return;
          var eq = eqSlot[bi.id]; if (!eq || eq.id === bi.id) return;
          var es = s.spec.KNOWN_STATS[eq.id];
          if (es && bi.stats.slice().sort().join() === es.slice().sort().join()) altItems[bi.id] = true;
        });
        // Auto-select target tier based on avgIlvl
        var autoTier = TIERS[TIERS.length - 1].key;
        for (var ti = 0; ti < TIERS.length; ti++) {
          var gap = ti < TIERS.length - 1 ? (TIERS[ti + 1].max - TIERS[ti].max) / 2 : 0;
          if (ci.avgIlvl < TIERS[ti].max - gap) { autoTier = TIERS[ti].key; break; }
        }
        persist(key, { acq: {}, sr: { ci: ci, eqSlot: eqSlot, bisInBag: {}, altItems: altItems, matched: matched }, targetTier: autoTier });
      }
    });
    setSampleMode(true);
    // Start tutorial after a short delay for render
    setTimeout(function() { setTutorialStep(0); }, 500);
  }, []);

  var handleExitSample = useCallback(function() {
    // Remove all sample character data
    SAMPLE_CHARS.forEach(function(c) {
      var s = SPECS.find(function(sp) { return sp.SPEC_KEY === c.specKey; });
      if (s) {
        removeCharFromIndex(c.specKey, c.name);
        try { localStorage.removeItem(s.STORAGE_KEY + ":" + c.name); } catch(e) {}
      }
    });
    setSampleMode(false);
    setTutorialStep(null);
    setCharsRev(function(r) { return r + 1; });
    // Check if there are real characters left
    var index = loadCharsIndex();
    var next = null;
    for (var i = 0; i < SPECS.length; i++) {
      var chars = index[SPECS[i].SPEC_KEY];
      if (chars && chars.length > 0) { next = { specKey: SPECS[i].SPEC_KEY, charName: chars[0] }; break; }
    }
    if (next) {
      setSpecKey(next.specKey);
      setCharName(next.charName);
      setPendingSimcText("");
    } else {
      setSpecKey(null);
      setCharName(null);
      setPendingSimcText("");
      setLandingText("");
      setLandingFeedback(null);
    }
    persist(LAST_CHAR_KEY, next);
  }, []);

  var handleSpecSwitch = useCallback(function(newSpecKey, simcText) {
    var result = detectSimC(simcText);
    var name = (result.ci && result.ci.name) || "Unknown";
    setSpecKey(newSpecKey);
    setCharName(name);
    setPendingSimcText(simcText);
    persist(LAST_CHAR_KEY, { specKey: newSpecKey, charName: name });
  }, []);

  var handleCharDetected = useCallback(function(name) {
    if (name && specKey) {
      addCharToIndex(specKey, name);
      setCharsRev(function(r) { return r + 1; });
      persist(LAST_CHAR_KEY, { specKey: specKey, charName: name });
      if (name !== charName) {
        setCharName(name);
      }
    }
  }, [specKey, charName]);

  var handleResetAll = useCallback(function() {
    // Remove all character data
    var index = loadCharsIndex();
    Object.keys(index).forEach(function(sk) {
      var s = SPECS.find(function(sp) { return sp.SPEC_KEY === sk; });
      if (!s) return;
      (index[sk] || []).forEach(function(name) {
        try { localStorage.removeItem(s.STORAGE_KEY + ":" + name); } catch(e) {}
      });
    });
    // Remove stat caches
    SPECS.forEach(function(s) {
      try { localStorage.removeItem(s.STAT_CACHE_KEY); } catch(e) {}
    });
    // Remove index and last char
    try { localStorage.removeItem(CHARS_KEY); } catch(e) {}
    try { localStorage.removeItem(LAST_CHAR_KEY); } catch(e) {}
    // Reset state
    setSpecKey(null);
    setCharName(null);
    setPendingSimcText("");
    setLandingText("");
    setLandingFeedback(null);
    setCharsRev(function(r) { return r + 1; });
    setLegalPage(null);
  }, []);

  var handleClear = useCallback(function() {
    if (specKey && charName) {
      removeCharFromIndex(specKey, charName);
      var s = getSpec(specKey);
      try { localStorage.removeItem(s.STORAGE_KEY + ":" + charName); } catch(e) {}
    }
    // Find next available character
    var index = loadCharsIndex();
    var next = null;
    for (var i = 0; i < SPECS.length; i++) {
      var chars = index[SPECS[i].SPEC_KEY];
      if (chars && chars.length > 0) { next = { specKey: SPECS[i].SPEC_KEY, charName: chars[0] }; break; }
    }
    if (next) {
      setSpecKey(next.specKey);
      setCharName(next.charName);
      setPendingSimcText("");
    } else {
      setSpecKey(null);
      setCharName(null);
      setPendingSimcText("");
      setLandingText("");
      setLandingFeedback(null);
    }
  }, [specKey, charName]);

  // Landing page: no spec selected
  if (!spec) {
    var PARTICLES = [
      { left: "12%", size: "2px", dur: "14s", delay: "0s", drift: "15px", opacity: 0.3, color: "void" },
      { left: "28%", size: "3px", dur: "11s", delay: "2s", drift: "-20px", opacity: 0.5, color: "gold" },
      { left: "45%", size: "2px", dur: "16s", delay: "4s", drift: "10px", opacity: 0.25, color: "void" },
      { left: "62%", size: "4px", dur: "10s", delay: "1s", drift: "-15px", opacity: 0.55, color: "gold" },
      { left: "78%", size: "2px", dur: "13s", delay: "6s", drift: "25px", opacity: 0.35, color: "void" },
      { left: "88%", size: "3px", dur: "15s", delay: "3s", drift: "-10px", opacity: 0.4, color: "gold" },
      { left: "35%", size: "2px", dur: "18s", delay: "8s", drift: "12px", opacity: 0.2, color: "void" },
      { left: "55%", size: "3px", dur: "12s", delay: "5s", drift: "-18px", opacity: 0.45, color: "gold" },
    ];
    return (
      <><div className="landing-bg" style={{ color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif" }}>
        {/* Floating particles */}
        <div className="landing-particles">
          {PARTICLES.map(function(p, i) {
            return <div key={i} className={"landing-particle" + (p.color === "void" ? " landing-particle--void" : "")} style={{ "--p-left": p.left, "--p-size": p.size, "--p-dur": p.dur, "--p-delay": p.delay, "--p-drift": p.drift, "--p-opacity": p.opacity }} />;
          })}
        </div>
        {/* Bottom mist */}
        <div className="landing-mist" />
        {/* Gothic spires silhouette */}
        <svg className="landing-spires" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="#0a0a14">
          <polygon points="0,80 60,80 50,45 40,80 30,50 20,80 10,60" />
          <polygon points="80,80 110,80 100,20 95,40 90,15 85,45" />
          <polygon points="150,80 200,80 190,50 180,35 170,55 160,40" />
          <polygon points="1000,80 1050,80 1040,40 1030,25 1020,50 1010,35" />
          <polygon points="1100,80 1150,80 1145,55 1135,30 1125,50 1115,40 1105,60" />
          <polygon points="1160,80 1200,80 1195,50 1185,65 1175,45" />
          <rect x="0" y="75" width="1200" height="5" />
        </svg>
        <div className="landing-content">
        {/* Midnight Void emblem */}
        <svg className="landing-emblem" viewBox="0 0 512 512" fill="none">
          <defs>
            <radialGradient id="heroVoidBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#28104F" />
              <stop offset="40%" stopColor="#120830" />
              <stop offset="100%" stopColor="#080412" />
            </radialGradient>
            <filter id="heroVoidGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="heroMGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feFlood floodColor="#7832C8" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
              <feMerge><feMergeNode in="colorBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="heroRuneGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCC03C" />
              <stop offset="50%" stopColor="#B48C28" />
              <stop offset="100%" stopColor="#DCC03C" />
            </linearGradient>
          </defs>
          <circle cx="256" cy="256" r="245" fill="url(#heroVoidBg)" />
          {/* Void tendrils */}
          <g opacity="0.15" filter="url(#heroVoidGlow)">
            <path d="M256,180 Q310,200 280,256 Q350,230 300,300" stroke="#7832C8" strokeWidth="3" fill="none" />
            <path d="M256,180 Q200,200 230,256 Q160,230 210,300" stroke="#7832C8" strokeWidth="3" fill="none" />
            <path d="M200,200 Q230,280 180,320" stroke="#5020A0" strokeWidth="2" fill="none" />
            <path d="M310,200 Q280,280 330,320" stroke="#5020A0" strokeWidth="2" fill="none" />
          </g>
          {/* Runed ring */}
          <circle cx="256" cy="256" r="235" fill="none" stroke="#120830" strokeWidth="30" opacity="0.8" />
          <circle cx="256" cy="256" r="235" fill="none" stroke="#2A1050" strokeWidth="28" />
          <circle cx="256" cy="256" r="250" fill="none" stroke="#7832C8" strokeWidth="1" opacity="0.4" />
          <circle cx="256" cy="256" r="220" fill="none" stroke="#A050FF" strokeWidth="1" opacity="0.3" />
          {/* Rune marks */}
          <g fill="url(#heroRuneGold)" opacity="0.7">
            <polygon points="256,28 262,42 256,56 250,42" opacity="0.8" />
            <rect x="375" y="90" width="3" height="16" transform="rotate(30,376,98)" opacity="0.6" />
            <circle cx="440" cy="170" r="4" fill="none" stroke="url(#heroRuneGold)" strokeWidth="1.5" opacity="0.7" />
            <polygon points="484,256 470,262 456,256 470,250" opacity="0.8" />
            <rect x="440" y="335" width="3" height="16" transform="rotate(-30,441,343)" opacity="0.6" />
            <circle cx="376" cy="415" r="4" fill="none" stroke="url(#heroRuneGold)" strokeWidth="1.5" opacity="0.7" />
            <polygon points="256,484 262,470 256,456 250,470" opacity="0.8" />
            <rect x="133" y="408" width="3" height="16" transform="rotate(30,134,416)" opacity="0.6" />
            <circle cx="72" cy="340" r="4" fill="none" stroke="url(#heroRuneGold)" strokeWidth="1.5" opacity="0.7" />
            <polygon points="28,256 42,262 56,256 42,250" opacity="0.8" />
            <rect x="72" y="160" width="3" height="16" transform="rotate(-30,73,168)" opacity="0.6" />
            <circle cx="136" cy="96" r="4" fill="none" stroke="url(#heroRuneGold)" strokeWidth="1.5" opacity="0.7" />
          </g>
          <circle cx="256" cy="256" r="235" fill="none" stroke="url(#heroRuneGold)" strokeWidth="0.5" opacity="0.3" strokeDasharray="8,20" />
          {/* Central M */}
          <g filter="url(#heroMGlow)">
            <polyline points="148,380 148,165 160,148 170,165 256,310 342,165 352,148 364,165 364,380" fill="none" stroke="#C88CFF" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="148,380 148,165 160,148 170,165 256,310 342,165 352,148 364,165 364,380" fill="none" stroke="#DCBEFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Peak glows */}
          <circle cx="160" cy="148" r="12" fill="#A050FF" opacity="0.5" filter="url(#heroVoidGlow)" />
          <circle cx="160" cy="148" r="5" fill="#DCBEFF" opacity="0.8" />
          <circle cx="352" cy="148" r="12" fill="#A050FF" opacity="0.5" filter="url(#heroVoidGlow)" />
          <circle cx="352" cy="148" r="5" fill="#DCBEFF" opacity="0.8" />
          <circle cx="256" cy="256" r="252" fill="none" stroke="#501E8C" strokeWidth="3" opacity="0.2" />
        </svg>
        <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg,#c9a227,#e8c84c,#c9a227)", letterSpacing: 2, marginBottom: 8 }}>
          Midnight BiS Tracker <span style={{ fontSize: 11, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, WebkitTextFillColor: "#c9a227", color: "#c9a227", background: "#c9a22718", border: "1px solid #c9a22744", borderRadius: 4, padding: "1px 6px", verticalAlign: "middle", letterSpacing: 0 }}>BETA</span>
        </h1>
        <p style={{ fontSize: 15, color: "#99887a", marginBottom: 4, fontWeight: 600 }}>{t("ui.seasonLabel")}</p>
        <p style={{ fontSize: 12, color: "#556666", marginBottom: 24 }}>{t("ui.seasonSub")}</p>
        <div style={{ width: "100%", maxWidth: 600, background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#c9a227" }}>{t("ui.simcImport")}</span>
          </div>
          <p style={{ fontSize: 12, color: "#778888", marginBottom: 12 }}>{t("ui.simcInstructions").split("<cmd>").map(function(part, i) { if (i === 0) return part; var parts = part.split("</cmd>"); return [<span key={i} style={{ color: "#c9a227", fontWeight: 600 }}>{parts[0]}</span>, parts[1]]; })}</p>
          <textarea className="sta" value={landingText} onChange={function(e) { setLandingText(e.target.value); }} onPaste={handlePaste} placeholder={t("ui.simcPlaceholder")} style={{ minHeight: 120 }} />
          {landingFeedback && (
            <div style={{ marginTop: 12, padding: "8px 14px", borderRadius: 6, background: "#1a1015", border: "1px solid #3a2030", fontSize: 13, fontWeight: 600, color: landingFeedback.ok ? "#8dffaa" : "#ff8d8d" }}>
              {landingFeedback.msg}
            </div>
          )}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button onClick={handleTrySample}
              style={{ padding: "10px 24px", borderRadius: 8, background: "transparent", border: "1px dashed #c9a22766", color: "#c9a227", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              {t("ui.trySample")}
            </button>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: "#445555", marginBottom: 10 }}>{t("ui.changelog")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CHANGELOG.slice(0, 5).map(function(entry, i, arr) {
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #1a1a2a" : "none" }}>
                    <span style={{ fontSize: 11, color: "#445555", fontFamily: "monospace", whiteSpace: "nowrap", minWidth: 80 }}>{entry.date}</span>
                    <span style={{ fontSize: 12, color: "#99887a" }}>{locale === "ko" ? entry.text.ko : entry.text.en}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
          <a href="https://discord.gg/ry7RYjBT" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#5865F2", textDecoration: "none", fontWeight: 600 }}>{t("ui.feedbackAndInquiry")}</a>
          <span style={{ color: "#223333" }}>·</span>
          <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ fontSize: 16, lineHeight: 1, background: "none", border: "1px solid #2a2a3a", borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}>{locale === "ko" ? "🇰🇷" : "🇺🇸"}</button>
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: "#334444", display: "flex", justifyContent: "center", gap: 4 }}>
          <button onClick={function() { setLegalPage("terms"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.terms")}</button>
          <span>·</span>
          <button onClick={function() { setLegalPage("privacy"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.privacy")}</button>
        </div>
        </div>
      </div>
      <LegalModal page={legalPage} locale={locale} onClose={function() { setLegalPage(null); }} />
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ padding: "24px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg," + spec.THEME.accent + "," + spec.THEME.accentLight + "," + spec.THEME.accent + ")", letterSpacing: 1 }}>
              Midnight BiS Tracker <span style={{ fontSize: 10, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, WebkitTextFillColor: spec.THEME.accent, color: spec.THEME.accent, background: spec.THEME.accentBg, border: "1px solid " + spec.THEME.accent + "44", borderRadius: 4, padding: "1px 6px", verticalAlign: "middle", letterSpacing: 0 }}>BETA</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {sampleMode && (
                <button onClick={handleExitSample} style={{ padding: "5px 12px", borderRadius: 6, background: "#1a101822", border: "1px solid #3a203044", color: "#ff8d8d", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>{t("ui.exitSample")}</button>
              )}
              <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ padding: "3px 6px", borderRadius: 6, background: "#1a1a2822", border: "1px solid #2a2a3a44", fontSize: 16, lineHeight: 1, cursor: "pointer" }}>{locale === "ko" ? "🇰🇷" : "🇺🇸"}</button>
              <a href="https://discord.gg/ry7RYjBT" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "5px 8px", borderRadius: 6, background: "#5865F222", border: "1px solid #5865F244", textDecoration: "none", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
              </a>
              <a href="https://github.com/world-of-winning/bis-tracker" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "5px 8px", borderRadius: 6, background: "#22222822", border: "1px solid #33333844", textDecoration: "none", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#778888"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
            </div>
          </div>
          {allChars.length >= 1 && (
            <div data-tutorial="char-bar" style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {allChars.map(function(c) {
                var active = c.specKey === specKey && c.charName === charName;
                var specLabel = t("specs." + c.spec.SIMC_SPEC) || c.spec.SIMC_SPEC;
                return (
                  <button key={c.specKey + ":" + c.charName} onClick={function() { if (!active) selectChar(c.specKey, c.charName); }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: active ? "default" : "pointer", background: active ? c.spec.THEME.accentBg : "#0a0a14", border: "1px solid " + (active ? c.spec.THEME.accent + "66" : "#1e1e30"), color: active ? c.spec.THEME.accent : "#556666", transition: "all 0.2s" }}>
                    <img src={ICON_BASE + c.spec.SPEC_ICON + ".jpg"} alt="" style={{ width: 14, height: 14, borderRadius: 2, opacity: active ? 1 : 0.5 }} />
                    {c.charName + " · " + specLabel}
                  </button>
                );
              })}
            </div>
          )}
        </div>

      <BisTracker key={specKey + ":" + charName} spec={spec} charName={charName} initialSimcText={pendingSimcText} onSpecSwitch={handleSpecSwitch} onClear={handleClear} onCharDetected={handleCharDetected} tutorialStep={tutorialStep} />

      <div style={{ marginTop: 24, paddingBottom: 40, textAlign: "center", fontSize: 11, color: "#334444" }}>
        <div>wowbis.gg</div>
        <div style={{ marginTop: 4, color: "#223333" }}>{t("ui.bisAttribution")} <a href="https://maxroll.gg/wow/class-guides" target="_blank" rel="noopener noreferrer" style={{ color: "#445555", textDecoration: "underline" }}>Maxroll.gg</a></div>
        <div style={{ marginTop: 6, display: "flex", justifyContent: "center", gap: 4 }}>
          <button onClick={function() { setLegalPage("terms"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.terms")}</button>
          <span>·</span>
          <button onClick={function() { setLegalPage("privacy"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.privacy")}</button>
          <span>·</span>
          <button onClick={function() { if (window.confirm(t("ui.resetAllConfirm"))) handleResetAll(); }} style={{ background: "none", border: "none", color: "#663333", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.resetAll")}</button>
        </div>
      </div>
      </div>
      <TutorialOverlay step={tutorialStep} onNext={function() { setTutorialStep(function(s) { return s >= TUTORIAL_STEPS.length - 1 ? null : s + 1; }); }} onPrev={function() { setTutorialStep(function(s) { return s <= 0 ? 0 : s - 1; }); }} onSkip={function() { setTutorialStep(null); }} />
      <LegalModal page={legalPage} locale={locale} onClose={function() { setLegalPage(null); }} />
    </div>
  );
}
