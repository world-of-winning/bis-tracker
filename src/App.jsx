import { useState, useCallback } from 'react';
import { SPECS, getSpec, findSpecBySimC } from './data/specs.js';
import { CHANGELOG } from './data/changelog.js';
import { load, save as persist } from './storage.js';
import { GEAR_SLOTS } from './data/shared.js';
import { useLocale } from './i18n/index.jsx';
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
  for (var i = 0; i < SPECS.length; i++) {
    var chars = index[SPECS[i].SPEC_KEY];
    if (chars && chars.length > 0) {
      return { specKey: SPECS[i].SPEC_KEY, charName: chars[0] };
    }
  }
  return null;
}

export default function App() {
  var { t, locale, setLocale } = useLocale();
  var initial = findInitialChar();
  var [specKey, setSpecKey] = useState(initial ? initial.specKey : null);
  var [charName, setCharName] = useState(initial ? initial.charName : null);
  var [pendingSimcText, setPendingSimcText] = useState("");
  var [landingText, setLandingText] = useState("");
  var [landingFeedback, setLandingFeedback] = useState(null);
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
    } else {
      var clsName = t("classes." + result.ci.className) || result.ci.className;
      var specName = t("specs." + result.ci.spec) || result.ci.spec;
      setLandingFeedback({ ok: false, msg: t("ui.unsupportedSpec", { cls: clsName, spec: specName }) });
    }
  }, [t]);

  var handleSpecSwitch = useCallback(function(newSpecKey, simcText) {
    var result = detectSimC(simcText);
    var name = (result.ci && result.ci.name) || "Unknown";
    setSpecKey(newSpecKey);
    setCharName(name);
    setPendingSimcText(simcText);
  }, []);

  var handleCharDetected = useCallback(function(name) {
    if (name && specKey) {
      addCharToIndex(specKey, name);
      if (name !== charName) {
        setCharName(name);
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
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg,#c9a227,#e8c84c,#c9a227)", letterSpacing: 2, marginBottom: 8 }}>
          BiS Tracker
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
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: "#445555", marginBottom: 10 }}>{t("ui.changelog")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {CHANGELOG.map(function(entry, i) {
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < CHANGELOG.length - 1 ? "1px solid #1a1a2a" : "none" }}>
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
          <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ fontSize: 12, color: "#556666", background: "none", border: "1px solid #2a2a3a", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}>{locale === "ko" ? "EN" : "KO"}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif" }}>
      <div style={{ padding: "24px 24px 0", background: "linear-gradient(180deg,#0c0c14 0%,transparent 100%)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg," + spec.THEME.accent + "," + spec.THEME.accentLight + "," + spec.THEME.accent + ")", letterSpacing: 1 }}>
              BiS Tracker
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ padding: "5px 10px", borderRadius: 6, background: "#1a1a2822", border: "1px solid #2a2a3a44", color: "#889999", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{locale === "ko" ? "EN" : "KO"}</button>
              <a href="https://discord.gg/ry7RYjBT" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, background: "#5865F222", border: "1px solid #5865F244", color: "#5865F2", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
              </a>
            </div>
          </div>
          {allChars.length >= 1 && (
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
        </div>
      </div>

      <BisTracker key={specKey + ":" + charName} spec={spec} charName={charName} initialSimcText={pendingSimcText} onSpecSwitch={handleSpecSwitch} onClear={handleClear} onCharDetected={handleCharDetected} />

      <div style={{ maxWidth: 960, margin: "24px auto 0", padding: "0 24px 40px", textAlign: "center", fontSize: 11, color: "#223333" }}>
        WoW Midnight · BiS Tracker
      </div>
    </div>
  );
}
