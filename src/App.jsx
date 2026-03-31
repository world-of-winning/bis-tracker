import { useState, useCallback, useEffect, useRef } from 'react';
import { SPECS, getSpec, findSpecBySimC } from './data/specs.js';
import { CHANGELOG } from './data/changelog.js';
import { getSampleChars, SAMPLE_CHARS } from './data/sample.js';
import { load, save as persist, remove } from './storage.js';
import { TIERS, parseSimC } from './data/shared.js';
import { useLocale } from './i18n/index.jsx';
import BisTracker from './components/BisTracker.jsx';
import TutorialOverlay from './components/TutorialOverlay.jsx';
import { TUTORIAL_STEPS, CATALOG_TUTORIAL_STEPS } from './data/tutorial.js';
import { version as APP_VERSION } from '../package.json';

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
  var order = [];
  SPECS.forEach(function(s) {
    var cls = s.SIMC_CLASS;
    if (!groups[cls]) { groups[cls] = []; order.push(cls); }
    groups[cls].push(s);
  });
  groups._order = order;
  return groups;
})();

function readUrlParams() {
  var params = new URLSearchParams(window.location.search);
  var cls = params.get("class");
  var sp = params.get("spec");
  if (cls && !SPEC_GROUPS[cls]) { cls = null; sp = null; }
  if (sp && cls) {
    var found = SPEC_GROUPS[cls].find(function(s) { return s.SIMC_SPEC === sp; });
    if (!found) sp = null;
  }
  return { cls: cls, spec: sp };
}

function buildUrl(cls, sp) {
  if (!cls) return window.location.pathname;
  var p = new URLSearchParams();
  p.set("class", cls);
  if (sp) p.set("spec", sp);
  return window.location.pathname + "?" + p.toString();
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

function findCrossSpecSources(targetSpecKey) {
  var targetSpec = getSpec(targetSpecKey);
  var targetClass = targetSpec.SIMC_CLASS;
  var index = loadCharsIndex();
  var sources = [];
  SPECS.forEach(function(s) {
    if (s.SIMC_CLASS !== targetClass || s.SPEC_KEY === targetSpecKey) return;
    var chars = index[s.SPEC_KEY];
    if (!chars || !chars.length) return;
    chars.forEach(function(name) {
      var d = load(s.STORAGE_KEY + ":" + name);
      if (d && d.sr && d.sr.gear) {
        sources.push({
          specKey: s.SPEC_KEY,
          specLabel: s.SPEC_LABEL,
          simcSpec: s.SIMC_SPEC,
          charName: name,
          storageKey: s.STORAGE_KEY + ":" + name,
          statCacheKey: s.STAT_CACHE_KEY,
          hasBag: !!(d.sr.bag && d.sr.bag.length),
        });
      }
    });
  });
  return sources;
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
      remove(s.STORAGE_KEY);
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

// Legal content moved to i18n (legal section in ko.json/en.json)

function VersionBadge({ accent, bg, border, size }) {
  var { locale } = useLocale();
  var [open, setOpen] = useState(false);
  var ref = useRef(null);
  var timerRef = useRef(null);
  function enter() { clearTimeout(timerRef.current); setOpen(true); }
  function leave() { timerRef.current = setTimeout(function() { setOpen(false); }, 200); }
  return (
    <span ref={ref} onMouseEnter={enter} onMouseLeave={leave} style={{ position: "relative", display: "inline-block", verticalAlign: "middle" }}>
      <span style={{ fontSize: size || 10, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 700, color: accent, background: bg || (accent + "18"), border: "1px solid " + (border || (accent + "44")), borderRadius: 4, padding: "1px 6px", letterSpacing: 0, cursor: "default" }}>{"v" + APP_VERSION}</span>
      {open && (
        <div onMouseEnter={enter} onMouseLeave={leave} style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 10000, background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 8, padding: "12px 14px", minWidth: 300, maxHeight: 320, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#556666", marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>Changelog</div>
          {CHANGELOG.map(function(entry, i) {
            return (
              <div key={i} style={{ display: "flex", gap: 10, padding: "4px 0", borderBottom: i < CHANGELOG.length - 1 ? "1px solid #1a1a2a" : "none" }}>
                <span style={{ fontSize: 10, color: "#445555", fontFamily: "monospace", whiteSpace: "nowrap", minWidth: 72 }}>{entry.date}</span>
                <span style={{ fontSize: 11, color: "#99887a" }}>{locale === "ko" ? entry.text.ko : entry.text.en}</span>
              </div>
            );
          })}
        </div>
      )}
    </span>
  );
}

function LegalModal(props) {
  var page = props.page;
  var onClose = props.onClose;
  var { t } = useLocale();
  if (!page) return null;
  var content = t("legal." + page);
  if (!content || !content.sections) return null;
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
          {t("legal.lastUpdated")}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var { t, locale, setLocale } = useLocale();
  var urlInit = readUrlParams();
  var charInit = urlInit.cls ? null : findInitialChar();
  var specFromUrl = null;
  if (urlInit.cls && urlInit.spec) {
    var match = (SPEC_GROUPS[urlInit.cls] || []).find(function(s) { return s.SIMC_SPEC === urlInit.spec; });
    if (match) specFromUrl = match.SPEC_KEY;
  }
  var [specKey, setSpecKey] = useState(specFromUrl || (charInit ? charInit.specKey : null));
  var [charName, setCharName] = useState(specFromUrl ? null : (charInit ? charInit.charName : null));
  var [selectedClass, setSelectedClass] = useState(urlInit.cls || null);
  var [pendingSimcText, setPendingSimcText] = useState("");
  var [landingText, setLandingText] = useState("");
  var [landingFeedback, setLandingFeedback] = useState(null);
  var [charsRev, setCharsRev] = useState(0);
  var [tutorialStep, setTutorialStep] = useState(null);
  var [legalPage, setLegalPage] = useState(null);
  var [specBrowseOpen, setSpecBrowseOpen] = useState(false);
  var isBrowseMode = specKey && !charName;
  var [sampleMode, setSampleMode] = useState(function() {
    // Detect sample mode by checking if any sample character exists
    var index = loadCharsIndex();
    return SAMPLE_CHARS.some(function(c) {
      return index[c.specKey] && index[c.specKey].indexOf(c.name) !== -1;
    });
  });
  // Popstate listener for browser back/forward
  useEffect(function() {
    function onPopState() {
      var url = readUrlParams();
      if (url.cls && url.spec) {
        var m = (SPEC_GROUPS[url.cls] || []).find(function(s) { return s.SIMC_SPEC === url.spec; });
        if (m) { setSpecKey(m.SPEC_KEY); setCharName(null); setSelectedClass(url.cls); return; }
      }
      if (url.cls) {
        setSpecKey(null); setCharName(null); setSelectedClass(url.cls);
      } else {
        // No URL params — try to restore last character, or show landing
        var last = findInitialChar();
        setSpecKey(last ? last.specKey : null);
        setCharName(last ? last.charName : null);
        setSelectedClass(null);
      }
    }
    window.addEventListener("popstate", onPopState);
    return function() { window.removeEventListener("popstate", onPopState); };
  }, []);

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
    setSelectedClass(null);
    setPendingSimcText("");
    persist(LAST_CHAR_KEY, { specKey: sk, charName: cn });
    history.pushState({}, "", buildUrl(null, null));
  }

  var catalogTutorialShown = useRef(false);
  function browseSpec(sk) {
    var s = getSpec(sk);
    setSpecKey(sk);
    setCharName(null);
    setSelectedClass(s.SIMC_CLASS);
    setPendingSimcText("");
    setSpecBrowseOpen(false);
    history.pushState({}, "", buildUrl(s.SIMC_CLASS, s.SIMC_SPEC));
    if (!catalogTutorialShown.current && !sampleMode) {
      catalogTutorialShown.current = true;
      setTimeout(function() { setTutorialStep(0); }, 500);
    }
  }

  function selectClass(cls) {
    var next = cls === selectedClass ? null : cls;
    setSelectedClass(next);
    history.pushState({}, "", buildUrl(next, null));
  }

  function goHome() {
    setSpecKey(null);
    setCharName(null);
    setSelectedClass(null);
    setPendingSimcText("");
    setLandingText("");
    setLandingFeedback(null);
    history.pushState({}, "", buildUrl(null, null));
  }

  var handlePaste = useCallback(function(e) {
    var text = e.clipboardData.getData('text');
    if (!text || !text.trim()) return;
    e.preventDefault();
    setLandingText(text);
    var result = parseSimC(text);
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
      setSelectedClass(null);
      setPendingSimcText(text);
      setLandingFeedback(null);
      persist(LAST_CHAR_KEY, { specKey: found.SPEC_KEY, charName: name });
      history.pushState({}, "", buildUrl(null, null));
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
    setSelectedClass(null);
    setPendingSimcText(first.simcText);
    setLandingFeedback(null);
    setCharsRev(function(r) { return r + 1; });
    persist(LAST_CHAR_KEY, { specKey: first.spec.SPEC_KEY, charName: first.name });
    history.pushState({}, "", buildUrl(null, null));
    // Trigger import for remaining characters via their BisTracker storage
    samples.slice(1).forEach(function(s) {
      var key = s.spec.STORAGE_KEY + ":" + s.name;
      if (!load(key)) {
        // Parse and store directly
        var parsed = parseSimC(s.simcText);
        var gear = parsed.gear, ci = parsed.ci;
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
        remove(s.STORAGE_KEY + ":" + c.name);
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
      setSelectedClass(null);
      setPendingSimcText("");
    } else {
      setSpecKey(null);
      setCharName(null);
      setSelectedClass(null);
      setPendingSimcText("");
      setLandingText("");
      setLandingFeedback(null);
    }
    persist(LAST_CHAR_KEY, next);
    history.pushState({}, "", buildUrl(null, null));
  }, []);

  var handleSpecSwitch = useCallback(function(newSpecKey, simcText) {
    var result = parseSimC(simcText);
    var name = (result.ci && result.ci.name) || "Unknown";
    setSpecKey(newSpecKey);
    setCharName(name);
    setSelectedClass(null);
    setPendingSimcText(simcText);
    persist(LAST_CHAR_KEY, { specKey: newSpecKey, charName: name });
    history.pushState({}, "", buildUrl(null, null));
  }, []);

  var handleCharDetected = useCallback(function(name) {
    if (name && specKey) {
      addCharToIndex(specKey, name);
      setCharsRev(function(r) { return r + 1; });
      persist(LAST_CHAR_KEY, { specKey: specKey, charName: name });
      setCharName(name);
      setSpecBrowseOpen(false);
    }
  }, [specKey]);

  var handleResetAll = useCallback(function() {
    // Remove all character data
    var index = loadCharsIndex();
    Object.keys(index).forEach(function(sk) {
      var s = SPECS.find(function(sp) { return sp.SPEC_KEY === sk; });
      if (!s) return;
      (index[sk] || []).forEach(function(name) {
        remove(s.STORAGE_KEY + ":" + name);
      });
    });
    // Remove stat caches and base storage keys (catalog mode data)
    SPECS.forEach(function(s) {
      remove(s.STAT_CACHE_KEY);
      remove(s.STAT_CACHE_KEY + "-armor");
      remove(s.STORAGE_KEY);
    });
    // Remove index and last char
    remove(CHARS_KEY);
    remove(LAST_CHAR_KEY);
    // Reset state
    setSpecKey(null);
    setCharName(null);
    setSelectedClass(null);
    setPendingSimcText("");
    setLandingText("");
    setLandingFeedback(null);
    setCharsRev(function(r) { return r + 1; });
    setLegalPage(null);
    history.pushState({}, "", buildUrl(null, null));
  }, []);

  var handleClear = useCallback(function() {
    if (specKey && charName) {
      removeCharFromIndex(specKey, charName);
      var s = getSpec(specKey);
      remove(s.STORAGE_KEY + ":" + charName);
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
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 8 }}>
          <h1 className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 32, fontWeight: 700, background: "linear-gradient(135deg,#c9a227,#e8c84c,#c9a227)", letterSpacing: 2 }}>Midnight BiS Tracker</h1>
          <VersionBadge accent="#c9a227" size={11} />
        </div>
        <p style={{ fontSize: 15, color: "#99887a", marginBottom: 4, fontWeight: 600 }}>{t("ui.seasonLabel")}</p>
        <p style={{ fontSize: 12, color: "#556666", marginBottom: 24 }}>{t("ui.seasonSub")}</p>
        {/* Class grid — always visible */}
        <div style={{ width: "100%", maxWidth: 720, marginBottom: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {SPEC_GROUPS._order.map(function(cls) {
              var clsColor = CLASS_COLOR[cls] || "#aaa";
              var isSelected = selectedClass === cls;
              return (
                <button key={cls} onClick={function() { selectClass(cls); }}
                  className="class-tile"
                  title={t("classes." + cls)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, padding: 0, borderRadius: 10, background: isSelected ? clsColor + "20" : "#0c0c16", border: "2px solid " + (isSelected ? clsColor + "88" : "#1e1e30"), cursor: "pointer", transition: "all 0.2s", boxShadow: isSelected ? "0 0 12px " + clsColor + "33" : "none" }}>
                  <img src={ICON_BASE + CLASS_ICON[cls] + ".jpg"} alt={t("classes." + cls)} style={{ width: 32, height: 32, borderRadius: 6, opacity: isSelected ? 1 : 0.7 }} />
                </button>
              );
            })}
          </div>
          {selectedClass && (
            <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
              {SPEC_GROUPS[selectedClass].map(function(s) {
                var clsColor = CLASS_COLOR[selectedClass] || "#aaa";
                return (
                  <button key={s.SPEC_KEY} onClick={function() { browseSpec(s.SPEC_KEY); }}
                    className="class-tile"
                    title={t("specs." + s.SIMC_SPEC)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, padding: 0, borderRadius: 10, background: "#0c0c16", border: "2px solid " + clsColor + "44", cursor: "pointer", transition: "all 0.2s" }}>
                    <img src={ICON_BASE + s.SPEC_ICON + ".jpg"} alt={t("specs." + s.SIMC_SPEC)} style={{ width: 28, height: 28, borderRadius: 6 }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {/* SimC import */}
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
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
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
          <a href="https://discord.gg/GU2Rs6y3Fh" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#5865F2", textDecoration: "none", fontWeight: 600 }}>{t("ui.feedbackAndInquiry")}</a>
          <span style={{ color: "#223333" }}>·</span>
          <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ fontSize: 16, lineHeight: 1, background: "none", border: "1px solid #2a2a3a", borderRadius: 4, padding: "2px 6px", cursor: "pointer", color: "#8899aa" }}>{locale === "ko" ? "🇰🇷" : "🇺🇸"}</button>
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: "#334444", display: "flex", justifyContent: "center", gap: 4 }}>
          <button onClick={function() { setLegalPage("terms"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.terms")}</button>
          <span>·</span>
          <button onClick={function() { setLegalPage("privacy"); }} style={{ background: "none", border: "none", color: "#445555", fontSize: 11, cursor: "pointer", textDecoration: "underline", fontFamily: "'Noto Sans KR',sans-serif" }}>{t("ui.privacy")}</button>
        </div>
        </div>
      </div>
      <LegalModal page={legalPage} onClose={function() { setLegalPage(null); }} />
      </>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(175deg,#08080f 0%,#0a0d1a 40%,#0f1020 100%)", color: "#d4c9a8", fontFamily: "'Noto Sans KR','Segoe UI',sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ padding: "24px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 onClick={goHome} className="grad-text" style={{ fontFamily: "'Cinzel',serif", fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg," + spec.THEME.accent + "," + spec.THEME.accentLight + "," + spec.THEME.accent + ")", letterSpacing: 1, cursor: "pointer" }}>Midnight BiS Tracker</h1>
              <VersionBadge accent={spec.THEME.accent} bg={spec.THEME.accentBg} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {sampleMode && (
                <button onClick={handleExitSample} style={{ padding: "5px 12px", borderRadius: 6, background: "#1a101822", border: "1px solid #3a203044", color: "#ff8d8d", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>{t("ui.exitSample")}</button>
              )}
              <button onClick={function() { setLocale(locale === "ko" ? "en" : "ko"); }} style={{ padding: "3px 6px", borderRadius: 6, background: "#1a1a2822", border: "1px solid #2a2a3a44", fontSize: 16, lineHeight: 1, cursor: "pointer", color: "#8899aa" }}>{locale === "ko" ? "🇰🇷" : "🇺🇸"}</button>
              <a href="https://discord.gg/GU2Rs6y3Fh" target="_blank" rel="noopener noreferrer" aria-label="Discord" style={{ display: "inline-flex", alignItems: "center", padding: "5px 8px", borderRadius: 6, background: "#5865F222", border: "1px solid #5865F244", textDecoration: "none", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
              </a>
              <a href="https://github.com/world-of-winning/bis-tracker" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: "inline-flex", alignItems: "center", padding: "5px 8px", borderRadius: 6, background: "#22222822", border: "1px solid #33333844", textDecoration: "none", transition: "all 0.2s" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#778888"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
            </div>
          </div>
          <div data-tutorial="char-bar" style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8, alignItems: "center" }}>
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
            <div style={{ position: "relative" }}>
              <button onClick={function() { setSpecBrowseOpen(!specBrowseOpen); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: "pointer", background: isBrowseMode ? spec.THEME.accentBg : "#0a0a14", border: "1px solid " + (isBrowseMode ? spec.THEME.accent + "66" : "#1e1e30"), color: isBrowseMode ? spec.THEME.accent : "#556666", transition: "all 0.2s" }}>
                {isBrowseMode && <img src={ICON_BASE + spec.SPEC_ICON + ".jpg"} alt="" style={{ width: 14, height: 14, borderRadius: 3 }} />}
                {isBrowseMode ? t("ui.browsing") + " · " + (t("specs." + spec.SIMC_SPEC) || spec.SIMC_SPEC) : t("ui.browseSpecs")}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: specBrowseOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {specBrowseOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 1000, background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 8, padding: 12, minWidth: 320, maxHeight: 400, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}>
                  {SPEC_GROUPS._order.map(function(cls) {
                    var clsColor = CLASS_COLOR[cls] || "#aaa";
                    return (
                      <div key={cls} style={{ marginBottom: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 4px", borderBottom: "1px solid #1a1a28", marginBottom: 4 }}>
                          <img src={ICON_BASE + CLASS_ICON[cls] + ".jpg"} alt="" style={{ width: 14, height: 14, borderRadius: 2 }} />
                          <span style={{ fontSize: 10, fontWeight: 700, color: clsColor, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("classes." + cls)}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, paddingLeft: 4 }}>
                          {SPEC_GROUPS[cls].map(function(s) {
                            var browsing = isBrowseMode && specKey === s.SPEC_KEY;
                            return (
                              <button key={s.SPEC_KEY} onClick={function() { browseSpec(s.SPEC_KEY); }}
                                style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: browsing ? s.THEME.accentBg : "transparent", border: "1px solid " + (browsing ? s.THEME.accent + "66" : "transparent"), cursor: "pointer", fontSize: 11, fontWeight: 600, color: browsing ? s.THEME.accent : clsColor + "cc", transition: "all 0.15s" }}>
                                <img src={ICON_BASE + s.SPEC_ICON + ".jpg"} alt="" style={{ width: 14, height: 14, borderRadius: 2, opacity: browsing ? 1 : 0.7 }} />
                                {t("specs." + s.SIMC_SPEC)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      <BisTracker key={specKey + ":" + charName} spec={spec} charName={charName} initialSimcText={pendingSimcText} onSpecSwitch={handleSpecSwitch} onClear={handleClear} onCharDetected={handleCharDetected} crossSpecSources={findCrossSpecSources(specKey)} tutorialStep={tutorialStep} />

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
      <TutorialOverlay step={tutorialStep} steps={isBrowseMode ? CATALOG_TUTORIAL_STEPS : undefined} onNext={function() { var steps = isBrowseMode ? CATALOG_TUTORIAL_STEPS : TUTORIAL_STEPS; setTutorialStep(function(s) { return s >= steps.length - 1 ? null : s + 1; }); }} onPrev={function() { setTutorialStep(function(s) { return s <= 0 ? 0 : s - 1; }); }} onSkip={function() { setTutorialStep(null); }} />
      <LegalModal page={legalPage} onClose={function() { setLegalPage(null); }} />
    </main>
  );
}
