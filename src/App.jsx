import { useState, useCallback } from 'react';
import { SPECS, getSpec, findSpecBySimC, CLASS_KO, SPEC_KO } from './data/specs.js';
import { load, save as persist } from './storage.js';
import { GEAR_SLOTS } from './data/shared.js';
import BisTracker from './components/BisTracker.jsx';

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

function findInitialChar() {
  migrateOldData();
  var index = loadCharsIndex();
  for (var i = 0; i < SPECS.length; i++) {
    var chars = index[SPECS[i].SPEC_KEY];
    if (chars && chars.length > 0) {
      return { specKey: SPECS[i].SPEC_KEY, charName: chars[0] };
    }
  }
  return null;
}

export default function App() {
  var initial = findInitialChar();
  var [specKey, setSpecKey] = useState(initial ? initial.specKey : null);
  var [charName, setCharName] = useState(initial ? initial.charName : null);
  var [pendingSimcText, setPendingSimcText] = useState("");
  var [landingText, setLandingText] = useState("");
  var [landingFeedback, setLandingFeedback] = useState(null);
  var [charInfo, setCharInfo] = useState(null);

  var spec = specKey ? getSpec(specKey) : null;
  var charsIndex = loadCharsIndex();
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
    var s = getSpec(sk);
    var d = load(s.STORAGE_KEY + ":" + cn);
    if (d && d.sr && d.sr.ci) {
      setCharInfo({ name: d.sr.ci.name, avgIlvl: d.sr.ci.avgIlvl, bisCount: Object.keys(d.sr.matched || {}).length, altCount: Object.keys(d.sr.altItems || {}).length });
    } else {
      setCharInfo(null);
    }
  }

  var handlePaste = useCallback(function(e) {
    var text = e.clipboardData.getData('text');
    if (!text || !text.trim()) return;
    e.preventDefault();
    setLandingText(text);
    var result = detectSimC(text);
    if (result.cnt === 0) {
      setLandingFeedback({ ok: false, msg: "장비 데이터를 찾을 수 없습니다." });
      return;
    }
    if (!result.ci.className || !result.ci.spec) {
      setLandingFeedback({ ok: false, msg: "직업/특성 정보를 찾을 수 없습니다." });
      return;
    }
    var found = findSpecBySimC(result.ci.className, result.ci.spec);
    if (found) {
      var name = result.ci.name || "Unknown";
      addCharToIndex(found.SPEC_KEY, name);
      setSpecKey(found.SPEC_KEY);
      setCharName(name);
      setPendingSimcText(text);
      setLandingFeedback(null);
    } else {
      var clsName = CLASS_KO[result.ci.className] || result.ci.className;
      var specName = SPEC_KO[result.ci.spec] || result.ci.spec;
      setLandingFeedback({ ok: false, msg: clsName + " " + specName + " 은(는) 아직 지원되지 않는 전문화입니다." });
    }
  }, []);

  var handleSpecSwitch = useCallback(function(newSpecKey, simcText) {
    var result = detectSimC(simcText);
    var name = (result.ci && result.ci.name) || "Unknown";
    addCharToIndex(newSpecKey, name);
    setSpecKey(newSpecKey);
    setCharName(name);
    setPendingSimcText(simcText);
  }, []);

  var handleImport = useCallback(function(info) {
    setCharInfo(info);
    if (info && info.name && specKey) {
      if (info.name !== charName) {
        addCharToIndex(specKey, info.name);
        setCharName(info.name);
      }
    }
  }, [specKey, charName]);

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
      setCharInfo(null);
      setPendingSimcText("");
    } else {
      setCharInfo(null);
      setSpecKey(null);
      setCharName(null);
      setPendingSimcText("");
      setLandingText("");
      setLandingFeedback(null);
    }
  }, [specKey, charName]);

  // Landing page: no spec selected
  if (!spec) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg,#c9a227,#e8c84c,#c9a227)", letterSpacing: 2, marginBottom: 8 }}>
          BiS Tracker
        </h1>
        <p style={{ fontSize: 13, color: "#556666", marginBottom: 24 }}>WoW Midnight · Season 1</p>
        <div style={{ width: "100%", maxWidth: 600, background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#c9a227" }}>SimC 가져오기</span>
          </div>
          <p style={{ fontSize: 12, color: "#778888", marginBottom: 12 }}>게임 내에서 <span style={{ color: "#c9a227", fontWeight: 600 }}>/simc</span> 명령어를 입력한 뒤, 출력된 텍스트를 아래에 붙여넣으세요.</p>
          <textarea className="sta" value={landingText} onChange={function(e) { setLandingText(e.target.value); }} onPaste={handlePaste} placeholder="/simc 출력 전체를 여기에 붙여넣으세요" style={{ minHeight: 120 }} />
          {landingFeedback && (
            <div style={{ marginTop: 12, padding: "8px 14px", borderRadius: 6, background: "#1a1015", border: "1px solid #3a2030", fontSize: 13, fontWeight: 600, color: landingFeedback.ok ? "#8dffaa" : "#ff8d8d" }}>
              {landingFeedback.msg}
            </div>
          )}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: "#445555", marginBottom: 10 }}>지원 전문화</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {Object.keys(SPEC_GROUPS).map(function(cls) {
                var specs = SPEC_GROUPS[cls];
                var clsColor = CLASS_COLOR[cls] || "#888";
                return (
                  <div key={cls} style={{ background: "#0a0a14", border: "1px solid #1e1e30", borderRadius: 8, padding: "10px 14px", minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <img src={ICON_BASE + CLASS_ICON[cls] + ".jpg"} alt={CLASS_KO[cls]} style={{ width: 22, height: 22, borderRadius: 4, border: "1px solid " + clsColor + "44" }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: clsColor }}>{CLASS_KO[cls]}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 4 }}>
                      {specs.map(function(s) {
                        return (
                          <div key={s.SPEC_KEY} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <img src={ICON_BASE + s.SPEC_ICON + ".jpg"} alt={s.SPEC_LABEL} style={{ width: 18, height: 18, borderRadius: 3, border: "1px solid " + s.THEME.accent + "44" }} />
                            <span style={{ fontSize: 12, color: s.THEME.accent, fontWeight: 600 }}>{SPEC_KO[s.SIMC_SPEC] || s.SIMC_SPEC}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif" }}>
      <div style={{ padding: "24px 24px 0", background: "linear-gradient(180deg,#0c0c14 0%,transparent 100%)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg," + spec.THEME.accent + "," + spec.THEME.accentLight + "," + spec.THEME.accent + ")", letterSpacing: 1 }}>
            BiS Tracker
          </h1>
          {allChars.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
              {allChars.map(function(c) {
                var active = c.specKey === specKey && c.charName === charName;
                return (
                  <button key={c.specKey + ":" + c.charName} onClick={function() { if (!active) selectChar(c.specKey, c.charName); }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: active ? "default" : "pointer", background: active ? c.spec.THEME.accentBg : "#0a0a14", border: "1px solid " + (active ? c.spec.THEME.accent + "66" : "#1e1e30"), color: active ? c.spec.THEME.accent : "#556666", transition: "all 0.2s" }}>
                    <img src={ICON_BASE + c.spec.SPEC_ICON + ".jpg"} alt="" style={{ width: 14, height: 14, borderRadius: 2, opacity: active ? 1 : 0.5 }} />
                    {c.charName}
                  </button>
                );
              })}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 13 }}>
            <img src={ICON_BASE + spec.SPEC_ICON + ".jpg"} alt="" style={{ width: 20, height: 20, borderRadius: 3 }} />
            <span style={{ fontWeight: 600, color: spec.THEME.accent }}>{SPEC_KO[spec.SIMC_SPEC] + " " + CLASS_KO[spec.SIMC_CLASS]}</span>
            {charInfo && (<span style={{ color: spec.THEME.accent + "aa" }}>{charInfo.name + " \u2014 \uD3C9\uADE0 " + charInfo.avgIlvl + " \u00B7 BiS " + charInfo.bisCount + "\uAC1C"}{charInfo.altCount > 0 ? " \u00B7 Alt " + charInfo.altCount + "\uAC1C" : ""}</span>)}
          </div>
        </div>
      </div>

      <BisTracker key={specKey + ":" + charName} spec={spec} charName={charName} initialSimcText={pendingSimcText} onSpecSwitch={handleSpecSwitch} onClear={handleClear} onImport={handleImport} />

      <div style={{ maxWidth: 960, margin: "24px auto 0", padding: "0 24px 40px", textAlign: "center", fontSize: 11, color: "#223333" }}>
        WoW Midnight · BiS Tracker
      </div>
    </div>
  );
}
