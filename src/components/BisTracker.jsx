import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { load, save as persist } from '../storage.js';
import { DUNGEONS, TIERS, DEFAULT_TIER, GEAR_SLOTS, fetchItemStats, resolveSlots, parseSimC, CLASS_ARMOR, ARMOR_SLOTS, SPEC_PRIMARY_STAT } from '../data/shared.js';
import { findSpecBySimC } from '../data/specs.js';
import { useLocale, LOCALE_META } from '../i18n/index.jsx';
import { matchBiS } from '../logic/matching.js';
import { getSource, calcPriority, calcAltPriority, autoSelectTier, sortByPriority, calcSourceFarmCount } from '../logic/priority.js';
import { dungeonExpectation, gainContext, slotGain } from '../logic/expectation.js';
import { buildRaidbotsExport, RAIDBOTS_URL } from '../logic/raidbots.js';
import { vaultVerdict, isVaultStale } from '../logic/vault.js';
import { pasteAction } from '../logic/simc-paste.js';
import ItemCard from './ItemCard.jsx';
import FilterButton from './FilterButton.jsx';

// WoW spec IDs for Wowhead tooltip spec-specific rendering (e.g. "Strength or Intellect")
var WH_SPEC_IDS = {
  "blood-dk": 250, "frost-dk": 251, "unholy-dk": 252,
  "havoc-dh": 577, "devourer-dh": 102, "veng-dh": 581,
  "balance-druid": 102, "feral-druid": 103, "guardian-druid": 104, "resto-druid": 105,
  "dev-evoker": 1467, "pres-evoker": 1468, "aug-evoker": 1473,
  "bm-hunter": 253, "mm-hunter": 254, "surv-hunter": 255,
  "arcane-mage": 62, "fire-mage": 63, "frost-mage": 64,
  "brew-monk": 268, "ww-monk": 269, "mw-monk": 270,
  "holy-paladin": 65, "prot-paladin": 66, "ret-paladin": 70,
  "disc-priest": 256, "holy-priest": 257, "shadow-priest": 258,
  "assa-rogue": 259, "outlaw-rogue": 260, "sub-rogue": 261,
  "ele-shaman": 262, "enh-shaman": 263, "resto-shaman": 264,
  "aff-lock": 265, "demo-lock": 266, "destro-lock": 267,
  "arms-warrior": 71, "fury-warrior": 72, "prot-warrior": 73,
};

function collectUnknownIds(gear, bag, currentStats, armorTypes) {
  var seen = new Set();
  Object.values(gear).forEach(function(g) { seen.add(g.id); });
  bag.forEach(function(b) { seen.add(b.id); });
  var unknownIds = [];
  seen.forEach(function(id) { if (currentStats[id] === undefined) unknownIds.push(id); });
  var unknownSet = new Set(unknownIds);
  GEAR_SLOTS.forEach(function(s) {
    if (!ARMOR_SLOTS.has(s) || !gear[s]) return;
    var id = gear[s].id;
    if (!armorTypes[id] && !unknownSet.has(id)) { unknownIds.push(id); unknownSet.add(id); }
  });
  return unknownIds;
}

var NON_DUNGEON_COLORS = { activeBg: "#1a1028", bg: "#1a102844", activeBorder: "#8866aa", border: "#8866aa33", activeText: "#c4aadd", text: "#8866aa", dot: "#8866aa", countHi: "#c4aadd", countLo: "#8866aa44", countNoSr: "#8866aa88" };
var PREP_COLORS = Object.assign({}, NON_DUNGEON_COLORS, { dot: "#aa88cc" });

// Stored state only survives a season swap if it still names something this
// build knows about. Season 2 retires every Season 1 dungeon, so restoring an
// old filter unchecked leaves the user on an empty grid with no active button.
function validFilter(f, sources) { return f && (f === "all" || sources.has(f)) ? f : "all"; }
function validTier(k) { return TIERS.some(function(t) { return t.key === k && !t.hidden; }) ? k : DEFAULT_TIER; }

var dungeonFilterColorCache = {};
function getDungeonFilterColors(c) {
  var key = c.g + c.b + c.t;
  if (dungeonFilterColorCache[key]) return dungeonFilterColorCache[key];
  var colors = { activeBg: c.g, bg: c.g + "44", activeBorder: c.b, border: c.b + "33", activeText: c.t, text: c.t, dot: c.b, countHi: c.t, countLo: c.b + "88", countNoSr: c.t + "88" };
  dungeonFilterColorCache[key] = colors;
  return colors;
}

export default function BisTracker({ spec, charName, initialSimcText, onSpecSwitch, onClear, onCharDetected, crossSpecSources }) {
  var { t, locale, knownItemName } = useLocale();
  var { BIS, MYTHIC, ALTS, KNOWN_STATS, STORAGE_KEY: BASE_STORAGE_KEY, THEME: theme, PRIORITY_STATS, STAT_CACHE_KEY, GUIDE_URL, SPEC_KEY } = spec;
  var whSpecId = WH_SPEC_IDS[SPEC_KEY];
  var STORAGE_KEY = charName ? BASE_STORAGE_KEY + ":" + charName : BASE_STORAGE_KEY;
  // Merge MYTHIC items into ALTS as farmable alternatives
  var mergedAlts = useMemo(function() {
    if (!MYTHIC || !MYTHIC.length) return ALTS;
    var bisIds = new Set(BIS.map(function(b) { return b.id; }));
    var farmableAlts = MYTHIC.filter(function(m) { return !bisIds.has(m.id); }).map(function(m) {
      var forSlot = m.slot;
      if (forSlot.indexOf("finger") === 0) forSlot = "ring";
      else if (forSlot.indexOf("trinket") === 0) forSlot = "trinket";
      else if (forSlot === "main_hand") forSlot = "weapon";
      return { forSlot: forSlot, id: m.id, source: m.source, stats: m.stats, farmable: true };
    });
    return farmableAlts.concat(ALTS);
  }, [BIS, MYTHIC, ALTS]);
  // Only include dungeons that actually have items for this spec
  var specDungeons = useMemo(function() {
    var sources = new Set();
    BIS.forEach(function(b) { if (DUNGEONS[b.source]) sources.add(b.source); });
    mergedAlts.forEach(function(a) { if (DUNGEONS[a.source]) sources.add(a.source); });
    return Object.keys(DUNGEONS).filter(function(d) { return sources.has(d); });
  }, [BIS, mergedAlts]);
  // Every source string this spec can show — the whitelist a stored filter must pass
  var itemSources = useMemo(function() {
    var s = new Set();
    BIS.forEach(function(b) { s.add(getSource(b)); });
    mergedAlts.forEach(function(a) { s.add(getSource(a)); });
    return s;
  }, [BIS, mergedAlts]);
  // All known good item IDs (BiS + MYTHIC) for alt recognition
  var knownBisIds = useMemo(function() {
    var ids = new Set(BIS.map(function(b) { return b.id; }));
    if (MYTHIC) MYTHIC.forEach(function(m) { ids.add(m.id); });
    return ids;
  }, [BIS, MYTHIC]);
  var activeItems = BIS;
  var [acq, setAcq] = useState({});
  var [filter, setFilter] = useState("all");
  var [simcOpen, setSimcOpen] = useState(false);
  var [simcText, setSimcText] = useState("");
  var [sr, setSr] = useState(null);
  var [feedback, setFeedback] = useState(null);
  var [raidbotsOpen, setRaidbotsOpen] = useState(false);
  var [raidbotsAttn, setRaidbotsAttn] = useState(false);
  var [targetTier, setTargetTier] = useState(DEFAULT_TIER);
  var [loaded, setLoaded] = useState(false);
  var [runtimeStats, setRuntimeStats] = useState({});
  var [runtimeArmorTypes, setRuntimeArmorTypes] = useState({});
  var [runtimePrimaryStats, setRuntimePrimaryStats] = useState({});
  var [importing, setImporting] = useState(false);
  var targetInfo = TIERS.find(function(t) { return t.key === targetTier; }) || TIERS.find(function(t) { return t.key === DEFAULT_TIER; });
  var expectedArmor = sr && sr.ci && sr.ci.className ? CLASS_ARMOR[sr.ci.className] : null;
  var expectedPrimary = SPEC_PRIMARY_STAT[SPEC_KEY] || null;
  var allStats = useMemo(function() { return Object.assign({}, KNOWN_STATS, runtimeStats); }, [KNOWN_STATS, runtimeStats]);
  // Attach primary stat info to sr for calcPriority to use in weapon mismatch checks
  if (sr) { sr._expectedPrimary = expectedPrimary; sr._primaryStats = runtimePrimaryStats; }
  // Everything the expected-gain model needs, resolved once. Both the dungeon
  // ordering and the per-alt comparison read it, so the two can never disagree
  // about which equipped item a drop would replace.
  var gainCtx = useMemo(function() {
    return gainContext({
      sr: sr, targetIlvl: targetInfo.max, stats: allStats, priorityStats: PRIORITY_STATS,
      knownBisIds: knownBisIds, armorTypes: runtimeArmorTypes, expectedArmor: expectedArmor,
      primaryStats: runtimePrimaryStats, expectedPrimary: expectedPrimary, acq: acq,
    });
  }, [sr, targetInfo.max, allStats, PRIORITY_STATS, knownBisIds, runtimeArmorTypes, expectedArmor, runtimePrimaryStats, expectedPrimary, acq]);
  // What a source can drop, both lists at once — a BiS item is a drop like any
  // other, and the mean is over the whole chest.
  var dropPool = useMemo(function() { return activeItems.concat(mergedAlts); }, [activeItems, mergedAlts]);
  var simcNames = useMemo(function() {
    var names = {};
    if (!sr) return names;
    if (sr.gear) Object.keys(sr.gear).forEach(function(slot) { var g = sr.gear[slot]; if (g && g.name) names[g.id] = g.name; });
    if (sr.bag) sr.bag.forEach(function(b) { if (b && b.name) names[b.id] = b.name; });
    return names;
  }, [sr]);
  var farmCounts = useMemo(function() {
    var c = {};
    var seen = {};
    activeItems.forEach(function(i) { seen[getSource(i)] = true; });
    mergedAlts.forEach(function(a) { seen[getSource(a)] = true; });
    Object.keys(seen).forEach(function(s) {
      c[s] = calcSourceFarmCount(s, activeItems, sr, targetInfo.max, allStats, PRIORITY_STATS, acq);
    });
    return c;
  }, [activeItems, mergedAlts, sr, targetInfo.max, allStats, PRIORITY_STATS, acq]);

  // The week's vault verdict. Deliberately outside every priority
  // computation — three choices are offered and at most one is taken, so
  // counting them as owned would call a slot finished on an item the player
  // is about to decline. A vault read before the region's last weekly reset,
  // or one the player never opened before running /simc, gives nothing to
  // show and asks for a fresh export.
  // A farming tracker gets left open for days, and the reset happens while it
  // is. Without a tick the block would still be showing last week's choices,
  // "Take this" badge and all, on a page that has not been reloaded since.
  var [vaultTick, setVaultTick] = useState(0);
  useEffect(function() {
    var id = setInterval(function() { setVaultTick(function(n) { return n + 1; }); }, 10 * 60 * 1000);
    return function() { clearInterval(id); };
  }, []);
  var vault = useMemo(function() {
    if (!sr || !sr.vault || !sr.vault.length) return null;
    if (isVaultStale(sr.importedAt, Date.now(), sr.ci && sr.ci.region)) return null;
    return vaultVerdict(sr.vault, BIS, sr.gear, sr.bag || [], acq);
  }, [sr, BIS, acq, vaultTick]);

  useEffect(function() {
    var d = load(STORAGE_KEY);
    if (d) {
      setAcq(d.acq || {});
      var cached = load(STAT_CACHE_KEY);
      if (cached) setRuntimeStats(cached);
      if (d.sr) {
        // Saves written before the SimC sections were split have the vault,
        // the merchant's stock and items other people linked all sitting in
        // `bag`, where the priority tiers read them as owned. The original
        // text is kept, so re-reading it repairs the save in place. A save
        // from before rawSimc was stored has to wait for the next import.
        var restored = d.sr;
        if (d.sr.rawSimc) {
          var reparsed = parseSimC(d.sr.rawSimc);
          if (reparsed.cnt) {
            restored = buildImportSr(reparsed.gear, reparsed.bag, reparsed.ci, Object.assign({}, KNOWN_STATS, cached || {}), {
              rawSimc: d.sr.rawSimc, vault: reparsed.vault, importedAt: d.sr.importedAt, crossSpecSource: d.sr.crossSpecSource,
            }).sr;
          }
        }
        if (restored !== d.sr) persist(STORAGE_KEY, { acq: d.acq || {}, sr: restored, targetTier: d.targetTier, filter: d.filter });
        setSr(restored); setSimcOpen(false);
        if (onCharDetected && restored.ci) onCharDetected(restored.ci.name);
      } else { setSimcOpen(true); }
      var cachedAT = load(STAT_CACHE_KEY + "-armor");
      if (cachedAT) setRuntimeArmorTypes(cachedAT);
      var cachedPS = load(STAT_CACHE_KEY + "-primary-v4");
      if (cachedPS) setRuntimePrimaryStats(cachedPS);
      setTargetTier(validTier(d.targetTier));
      setFilter(validFilter(d.filter, itemSources));
    } else {
      var cached2 = load(STAT_CACHE_KEY);
      if (cached2) setRuntimeStats(cached2);
      var cachedAT2 = load(STAT_CACHE_KEY + "-armor");
      if (cachedAT2) setRuntimeArmorTypes(cachedAT2);
      var cachedPS2 = load(STAT_CACHE_KEY + "-primary-v4");
      if (cachedPS2) setRuntimePrimaryStats(cachedPS2);
    }
    setLoaded(true);
  }, [STORAGE_KEY, STAT_CACHE_KEY, itemSources]);
  // Auto-fetch armor types and primary stats for equipped items missing from cache
  useEffect(function() {
    if (!sr || !sr.gear || !sr.ci) return;
    var missing = [];
    GEAR_SLOTS.forEach(function(s) {
      var g = sr.gear[s]; if (!g) return;
      if ((ARMOR_SLOTS.has(s) && !runtimeArmorTypes[g.id]) || !runtimePrimaryStats[g.id]) missing.push(g.id);
    });
    // Also fetch primary stats for bag items (for weapon recommendations)
    if (sr.bag) sr.bag.forEach(function(b) { if (!runtimePrimaryStats[b.id]) missing.push(b.id); });
    // deduplicate
    missing = missing.filter(function(id, i) { return missing.indexOf(id) === i; });
    if (missing.length === 0) return;
    fetchItemStats(missing).then(function(fetched) {
      var newAT = Object.assign({}, runtimeArmorTypes, fetched.armorTypes);
      setRuntimeArmorTypes(newAT);
      persist(STAT_CACHE_KEY + "-armor", newAT);
      // Also update stats if any were missing
      var newRuntime = Object.assign({}, runtimeStats);
      var changed = false;
      Object.keys(fetched.stats).forEach(function(id) {
        if (newRuntime[id] === undefined && fetched.stats[id] !== null) { newRuntime[id] = fetched.stats[id]; changed = true; }
      });
      if (changed) { setRuntimeStats(newRuntime); persist(STAT_CACHE_KEY, newRuntime); }
      if (fetched.primaryStats) {
        var newPS = Object.assign({}, runtimePrimaryStats, fetched.primaryStats);
        setRuntimePrimaryStats(newPS);
        persist(STAT_CACHE_KEY + "-primary-v4", newPS);
      }
    });
  }, [sr, runtimeArmorTypes, runtimePrimaryStats, STAT_CACHE_KEY]);
  useEffect(function() {
    var t = setTimeout(function() { if (window.$WowheadPower && window.$WowheadPower.refreshLinks) { try { window.$WowheadPower.refreshLinks(); } catch(e) {} } }, 500);
    return function() { clearTimeout(t); };
  }, [filter, sr, targetTier, STORAGE_KEY]);
  var stateRef = useRef({});
  stateRef.current = { acq: acq, sr: sr, targetTier: targetTier, filter: filter };
  var sv = useCallback(function(overrides) { var d = Object.assign({}, stateRef.current, overrides); persist(STORAGE_KEY, { acq: d.acq, sr: d.sr, targetTier: d.targetTier, filter: d.filter }); }, [STORAGE_KEY]);
  function changeFilter(f) { setFilter(f); sv({ filter: f }); }
  var toggle = useCallback(function(id) { setAcq(function(prev) { var next = Object.assign({}, prev); next[id] = !next[id]; sv({ acq: next }); return next; }); }, [sv]);
  var changeTarget = useCallback(function(key) { setTargetTier(key); sv({ targetTier: key }); }, [sv]);

  // Shared import helpers
  function buildImportSr(gear, bag, ci, mergedStats, extraFields) {
    var result = matchBiS(BIS, gear, bag, mergedStats, knownBisIds, PRIORITY_STATS);
    var newSr = { ci: ci, gear: gear, bag: bag, eqSlot: result.eqSlot, bisInBag: result.bisInBag, altItems: result.altItems, matched: result.matched, weaponMismatch: result.weaponMismatch };
    if (extraFields) Object.assign(newSr, extraFields);
    return { sr: newSr, autoTier: autoSelectTier(ci.avgIlvl) };
  }

  function fetchAndCacheStats(unknownIds, callback) {
    setImporting(true);
    setFeedback({ ok: true, msg: t("ui.fetchingStats", { count: unknownIds.length }) });
    fetchItemStats(unknownIds).then(function(fetched) {
      var newRuntime = Object.assign({}, runtimeStats);
      Object.keys(fetched.stats).forEach(function(id) { newRuntime[id] = fetched.stats[id] !== null ? fetched.stats[id] : []; });
      setRuntimeStats(newRuntime);
      persist(STAT_CACHE_KEY, newRuntime);
      var newAT = Object.assign({}, runtimeArmorTypes, fetched.armorTypes);
      setRuntimeArmorTypes(newAT);
      persist(STAT_CACHE_KEY + "-armor", newAT);
      var newPS = Object.assign({}, runtimePrimaryStats, fetched.primaryStats);
      setRuntimePrimaryStats(newPS);
      persist(STAT_CACHE_KEY + "-primary-v4", newPS);
      callback(newRuntime);
    });
  }

  var doImport = useCallback(function(overrideText) {
    var text = overrideText || simcText;
    if (!text.trim() || importing) return;
    var parsed = parseSimC(text);
    if (!parsed.cnt) { setFeedback({ ok: false, msg: t("ui.noGearData") }); return; }
    var currentStats = Object.assign({}, KNOWN_STATS, runtimeStats);
    var unknownIds = collectUnknownIds(parsed.gear, parsed.bag, currentStats, runtimeArmorTypes);
    function finishImport(mergedStats) {
      var imp = buildImportSr(parsed.gear, parsed.bag, parsed.ci, mergedStats, { rawSimc: text, vault: parsed.vault, importedAt: Date.now() });
      var importName = parsed.ci.name || charName;
      var saveKey = importName !== charName ? BASE_STORAGE_KEY + ":" + importName : STORAGE_KEY;
      if (importName === charName) setSr(imp.sr);
      if (importName === charName) { setTargetTier(imp.autoTier); }
      persist(saveKey, { acq: importName !== charName ? {} : acq, sr: imp.sr, targetTier: imp.autoTier, filter: "all" });
      var bisSlots = {};
      BIS.forEach(function(b) { bisSlots[b.slot] = true; });
      var empty = Object.keys(bisSlots).filter(function(s) { return !parsed.gear[s]; });
      var msg = t("ui.gearUpdated");
      if (empty.length > 0) msg += "\n" + t("ui.emptySlots", { slots: empty.map(function(s) { return t("slots." + s); }).join(", ") });
      setFeedback({ ok: empty.length === 0, msg: msg }); setSimcText(""); setImporting(false); setSimcOpen(false);
      // Nudge the freshly unlocked next step: sim the import against the BiS list.
      if (importName === charName) setRaidbotsAttn(true);
      if (onCharDetected) onCharDetected(importName);
    }
    if (unknownIds.length > 0) {
      fetchAndCacheStats(unknownIds, function(newRuntime) {
        finishImport(Object.assign({}, KNOWN_STATS, newRuntime));
      });
    } else { finishImport(currentStats); }
  }, [simcText, acq, targetTier, sv, BIS, KNOWN_STATS, runtimeStats, importing, STAT_CACHE_KEY, BASE_STORAGE_KEY, STORAGE_KEY, charName]);
  var clearSimc = useCallback(function() { setSr(null); setFeedback(null); setSimcOpen(true); persist(STORAGE_KEY, null); if (onClear) onClear(); }, [STORAGE_KEY, onClear]);
  var openRaidbots = useCallback(function() {
    var s = stateRef.current.sr;
    if (!s) return;
    // Imports from before rawSimc was stored (and cross-spec imports) have no
    // original text — steer the user back to the paste box instead of no-oping.
    if (!s.rawSimc) { setSimcOpen(true); setFeedback({ ok: false, msg: t("ui.raidbotsReimport") }); return; }
    setRaidbotsAttn(false);
    setRaidbotsOpen(true);
  }, [t]);
  var exportRaidbots = useCallback(function() {
    var s = stateRef.current.sr;
    if (!s || !s.rawSimc) { setRaidbotsOpen(false); return; }
    var text = buildRaidbotsExport(s.rawSimc, BIS, s.gear, s.bag || [], TIERS[TIERS.length - 1], knownItemName);
    if (!text) { setRaidbotsOpen(false); return; }
    // Copy first, open second: writeText must be issued while this document
    // still has focus, and window.open in the same tick keeps the user gesture.
    navigator.clipboard.writeText(text).then(function() {
      setFeedback({ ok: true, msg: t("ui.raidbotsCopied") });
    }, function() {
      setSimcOpen(true); setFeedback({ ok: false, msg: t("ui.raidbotsCopyFailed") });
    });
    window.open(RAIDBOTS_URL, "_blank", "noopener");
    setRaidbotsOpen(false);
  }, [BIS, knownItemName, t]);
  var doCrossSpecImport = useCallback(function(source) {
    if (importing) return;
    var d = load(source.storageKey);
    if (!d || !d.sr || !d.sr.gear) return;
    // The source save may predate the section split, with the vault, a
    // vendor's stock and other people's linked items all in its bag. Its own
    // spec repairs it when that spec is next opened; this path may get there
    // first, so it re-reads the text too.
    var sourceParsed = d.sr.rawSimc ? parseSimC(d.sr.rawSimc) : null;
    if (sourceParsed && !sourceParsed.cnt) sourceParsed = null;
    var sourceGear = sourceParsed ? sourceParsed.gear : d.sr.gear;
    var sourceBag = sourceParsed ? sourceParsed.bag : (d.sr.bag || []);
    var sourceVault = sourceParsed ? sourceParsed.vault : (d.sr.vault || []);
    var sourceCi = sourceParsed ? sourceParsed.ci : d.sr.ci;
    var sourceCachedStats = load(source.statCacheKey) || {};
    var currentStats = Object.assign({}, KNOWN_STATS, sourceCachedStats, runtimeStats);
    var unknownIds = collectUnknownIds(sourceGear, sourceBag, currentStats, runtimeArmorTypes);
    function finish(mergedStats) {
      var imp = buildImportSr(sourceGear, sourceBag, sourceCi, mergedStats, { vault: sourceVault, importedAt: d.sr.importedAt, crossSpecSource: { specKey: source.specKey, charName: source.charName, simcSpec: source.simcSpec } });
      var importName = sourceCi.name || charName;
      var saveKey = importName !== charName ? BASE_STORAGE_KEY + ":" + importName : STORAGE_KEY;
      if (importName === charName || !charName) { setSr(imp.sr); }
      if (importName === charName || !charName) { setTargetTier(imp.autoTier); }
      persist(saveKey, { acq: {}, sr: imp.sr, targetTier: imp.autoTier, filter: "all" });
      setFeedback({ ok: true, msg: t("ui.crossSpecImported") });
      setImporting(false); setSimcOpen(false);
      if (onCharDetected) onCharDetected(importName);
    }
    if (unknownIds.length > 0) {
      fetchAndCacheStats(unknownIds, function(newRuntime) {
        finish(Object.assign({}, KNOWN_STATS, sourceCachedStats, newRuntime));
      });
    } else { finish(currentStats); }
  }, [importing, BIS, KNOWN_STATS, PRIORITY_STATS, runtimeStats, runtimeArmorTypes, runtimePrimaryStats, knownBisIds, STAT_CACHE_KEY, BASE_STORAGE_KEY, STORAGE_KEY, charName, t, onCharDetected]);
  var handlePaste = useCallback(function(e) {
    var el = e.target;
    var act = pasteAction(el.value, el.selectionStart, el.selectionEnd, e.clipboardData.getData('text'));
    // Only a paste that replaces the whole box is an import. Everything else
    // is an edit and belongs to the browser, which is what a textarea is for.
    if (act.action === "edit") return;
    if (act.action === "warn") { setFeedback({ ok: false, msg: t("ui.noGearData") }); return; }
    var text = act.next, parsed = act.parsed;
    e.preventDefault();
    if (parsed.ci.className && parsed.ci.spec) {
      var detected = findSpecBySimC(parsed.ci.className, parsed.ci.spec);
      if (!detected) {
        var clsName = t("classes." + parsed.ci.className) || parsed.ci.className;
        var specName = t("specs." + parsed.ci.spec) || parsed.ci.spec;
        setSimcText(text);
        setFeedback({ ok: false, msg: t("ui.unsupportedSpec", { cls: clsName, spec: specName }) });
        return;
      }
      if (detected.SPEC_KEY !== spec.SPEC_KEY && onSpecSwitch) {
        onSpecSwitch(detected.SPEC_KEY, text);
        return;
      }
    }
    setSimcText(text);
    doImport(text);
  }, [doImport, spec.SPEC_KEY, onSpecSwitch, t]);
  useEffect(function() {
    setSimcText(""); setFeedback(null); setImporting(false);
    var d = load(STORAGE_KEY);
    var cached = load(STAT_CACHE_KEY); setRuntimeStats(cached || {});
    var cachedAT3 = load(STAT_CACHE_KEY + "-armor"); setRuntimeArmorTypes(cachedAT3 || {});
    var cachedPS3 = load(STAT_CACHE_KEY + "-primary-v4"); setRuntimePrimaryStats(cachedPS3 || {});
    if (d) {
      setAcq(d.acq || {}); setSr(d.sr || null); setSimcOpen(!d.sr);
      setTargetTier(validTier(d.targetTier));
      setFilter(validFilter(d.filter, itemSources));
    } else { setAcq({}); setSr(null); setTargetTier(DEFAULT_TIER); setSimcOpen(false); setFilter("all"); }
  }, [STORAGE_KEY, STAT_CACHE_KEY, itemSources]);
  var initialImportDone = useRef(false);
  useEffect(function() {
    if (initialSimcText && initialSimcText.trim() && !initialImportDone.current) {
      initialImportDone.current = true;
      doImport(initialSimcText);
    }
  }, [initialSimcText, doImport]);
  var progressCounts = useMemo(function() {
    var done = 0, green = 0;
    activeItems.forEach(function(b) {
      if (acq[b.id]) { done++; green++; return; }
      if (!sr) return;
      var p = calcPriority(b, sr, targetInfo.max, allStats, PRIORITY_STATS);
      if (p.tier === 4) done++;
      if (p.color === "#4dca6b") green++;
    });
    return { done: done, green: green };
  }, [acq, sr, targetInfo.max, allStats, activeItems, PRIORITY_STATS]);
  var doneCount = progressCounts.done, greenCount = progressCounts.green;
  var displayBis = useMemo(function() { var items = filter === "all" ? activeItems : activeItems.filter(function(i) { return getSource(i) === filter; }); return sr ? sortByPriority(items, sr, targetInfo.max, allStats, PRIORITY_STATS) : items; }, [filter, sr, targetInfo.max, allStats, activeItems, PRIORITY_STATS]);
  var displayAlts = useMemo(function() {
    if (filter === "all") return [];
    var items = mergedAlts.filter(function(a) { return getSource(a) === filter; });
    if (!sr) return items;
    // Ordered by what the player stands to gain, because that is the question
    // they opened the dungeon to ask. The file's own order — how well an item
    // suits the spec — breaks the ties, and a slot's candidates all carry the
    // same gain, so within a slot it is the only thing sorting them.
    // Items already owned sink: nothing to expect from a drop that happened.
    var ranked = items.map(function(a, i) {
      return {
        item: a, order: i,
        owned: calcAltPriority(a, sr, targetInfo.max, acq).tier === 4,
        gain: slotGain(a, gainCtx),
      };
    });
    ranked.sort(function(a, b) {
      if (a.owned !== b.owned) return a.owned ? 1 : -1;
      if (a.gain !== b.gain) return b.gain - a.gain;
      return a.order - b.order;
    });
    return ranked.map(function(r) { return r.item; });
  }, [filter, mergedAlts, sr, acq, gainCtx, targetInfo.max]);
  // Dungeons only. The raid runs on a weekly lockout and a per-boss table, and
  // tier/crafted/vault are not drops, so their per-run value is not on this
  // scale — they keep their place in the row.
  var orderedDungeons = useMemo(function() {
    var scored = specDungeons.filter(function(d) { return !!farmCounts[d]; }).map(function(d) {
      return { source: d, score: sr ? dungeonExpectation(d, dropPool, gainCtx) : 0 };
    });
    return scored.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return specDungeons.indexOf(a.source) - specDungeons.indexOf(b.source);
    });
  }, [specDungeons, farmCounts, sr, dropPool, gainCtx]);
  var nonDungeonSources = useMemo(function() {
    var sources = {};
    activeItems.forEach(function(item) { var s = getSource(item); if (!DUNGEONS[s]) sources[s] = (sources[s] || 0) + 1; });
    var all = Object.keys(sources).map(function(s) { return { source: s, count: sources[s] }; });
    var prep = all.filter(function(s) { return /^Tier/i.test(s.source) || s.source === "Crafted"; });
    prep.sort(function(a, b) { return (/^Tier/i.test(a.source) ? 0 : 1) - (/^Tier/i.test(b.source) ? 0 : 1); });
    var raid = all.filter(function(s) { return !/^Tier/i.test(s.source) && s.source !== "Crafted"; });
    return { prep: prep, raid: raid };
  }, [activeItems]);

  // The button lights up after an import, and stays lit for as long as the
  // vault is holding a strong candidate. Opening the dialog clears the
  // import's nudge; it cannot clear the vault's, because that one is not a
  // notification about something new — it is a standing reason to sim.
  var raidbotsLit = raidbotsAttn || !!(vault && vault.take);

  if (!loaded) return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0a0a12", color: theme.accent }}><span style={{ fontFamily: "'Cinzel', serif", fontSize: 18 }}>{t("ui.loading")}</span></div>);

  return (
    <div style={{ paddingTop: 16, paddingBottom: 24 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
        <div data-tutorial="simc-import" className="tog" onClick={function() {
          // Opening the panel shows the stored import, the way Raidbots does —
          // the user sees what the tracker is working from and can edit in place.
          if (!simcOpen && !simcText && sr && sr.rawSimc) setSimcText(sr.rawSimc);
          setSimcOpen(!simcOpen);
        }} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, background: sr ? "#0c0c16" : theme.accentBg, border: "1px solid " + (sr ? "#1e1e30" : theme.accentBorder) }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: sr ? theme.accent + "cc" : theme.accent }}>{t("ui.simcImport")}</span>
          {!sr && <span style={{ fontSize: 11, color: theme.accent + "88" }}>{t("ui.simcPasteHint")}</span>}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#445566" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto", transition: "transform .2s", transform: simcOpen ? "rotate(180deg)" : "rotate(0)" }}><polyline points="6 9 12 15 18 9" /></svg>
        </div>
        {GUIDE_URL && <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 12px", borderRadius: 8, background: "#0c0c16", border: "1px solid #1e1e30", textDecoration: "none", fontSize: 11, fontWeight: 600, color: "#778888", whiteSpace: "nowrap" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#778888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>{t("ui.guideLink")}</a>}
        {sr && <button className={"sb" + (raidbotsLit ? " rb-attn" : "")} onClick={openRaidbots} title={!sr.rawSimc ? t("ui.raidbotsReimport") : undefined} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 12px", borderRadius: 8, background: raidbotsLit ? theme.accentBg : "#0c0c16", border: "1px solid " + (raidbotsLit ? theme.accentBorder : "#1e1e30"), fontSize: 11, fontWeight: 600, color: raidbotsLit ? theme.accent : (sr.rawSimc ? "#778888" : "#445555"), whiteSpace: "nowrap", cursor: "pointer", "--rb-glow-lo": theme.accent + "66", "--rb-glow-hi": theme.accent }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>{t("ui.raidbotsCompare")}</button>}
        </div>
        {simcOpen && (
          <div style={{ marginTop: 8, padding: 16, background: "#0c0c16", border: "1px solid #1e1e30", borderRadius: 8, overflow: "hidden" }}>
            <textarea className="sta" value={simcText} onChange={function(e) { setSimcText(e.target.value); }} onPaste={handlePaste} onFocus={function(e) { e.target.select(); }} placeholder={t("ui.simcPlaceholder")} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {feedback && <span style={{ fontSize: 12, fontWeight: 600, color: feedback.ok ? "#8dffaa" : "#ff8d8d", whiteSpace: "pre-line" }}>{feedback.msg}</span>}
              {sr && <button className="sb" onClick={clearSimc} style={{ marginLeft: "auto", padding: "3px 10px", background: "#1a1520", border: "1px solid #2a2030", color: "#886678", fontSize: 11 }}>{t("ui.reset")}</button>}
            </div>
          </div>
        )}
        {!sr && crossSpecSources && crossSpecSources.length > 0 && (
          <div style={{ marginTop: 8, padding: "10px 14px", background: "#0a0a14", border: "1px solid " + theme.accentBorder, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: "#556666", marginBottom: 8 }}>{t("ui.crossSpecAvailable")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {crossSpecSources.map(function(src) {
                return (
                  <button key={src.specKey + ":" + src.charName} onClick={function() { doCrossSpecImport(src); }} disabled={importing}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, background: theme.accentBg, border: "1px solid " + theme.accentBorder, color: theme.accent, fontSize: 12, fontWeight: 600, cursor: importing ? "wait" : "pointer", opacity: importing ? 0.5 : 1 }}>
                    <span>{t("ui.crossSpecUse", { spec: t("specs." + src.simcSpec), name: src.charName })}</span>
                    {!src.hasBag && <span style={{ fontSize: 10, color: "#886644" }}>{t("ui.crossSpecNoBag")}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div data-tutorial="tier-buttons" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {TIERS.filter(function(ti) { return !ti.hidden; }).map(function(ti) { var sel = targetTier === ti.key; return (<button key={ti.key} className="tier-btn" onClick={function() { changeTarget(ti.key); }} style={{ borderColor: sel ? ti.color : ti.color + "44", color: ti.color, opacity: sel ? 1 : 0.5, background: sel ? ti.color + "22" : "transparent" }}>{t("tiers." + ti.key) + " (" + ti.max + ")"}</button>); })}
      </div>
      <div data-tutorial="progress-bar" style={{ marginTop: 8, position: "relative" }}>
        <div style={{ height: 20, background: "#1a1a28", borderRadius: 6, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", height: "100%", width: (greenCount / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: "#4dca6b", opacity: 0.15 }} />
          <div className="pfill" style={{ position: "absolute", height: "100%", width: (doneCount / activeItems.length * 100) + "%", borderRadius: 6, transition: "width .4s", background: theme.shimmer, backgroundSize: "200% 100%", opacity: 0.35 }} />
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: doneCount === activeItems.length ? "#8dffaa" : theme.accent, letterSpacing: 1, textShadow: "0 1px 3px #0008" }}>{doneCount + " / " + activeItems.length}</span>
          </div>
        </div>
        {sr && sr.ci && sr.ci.avgIlvl > 0 && <span style={{ position: "absolute", right: 6, top: 0, height: "100%", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, color: "#556666", pointerEvents: "none", textShadow: "0 1px 3px #000" }}>
          {sr.crossSpecSource && <span style={{ color: "#886644" }}>{"(" + t("ui.crossSpecFrom", { spec: t("specs." + sr.crossSpecSource.simcSpec) }) + ")"}</span>}
          {"ilvl " + sr.ci.avgIlvl}
        </span>}
      </div>
      {sr && (
        <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 8, background: "#0f0f18", border: "1px solid #1e1e30" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 700, color: theme.accent }}>{t("ui.vaultTitle")}</span>
            {vault && !vault.take && <span style={{ fontSize: 11, fontWeight: 600, color: "#ffd479" }}>{t("ui.vaultVerdictVoidcore")}</span>}
          </div>
          {vault ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {vault.candidates.map(function(c, idx) {
                var lit = c.take;
                return (
                  <a key={idx + "-" + c.slot + "-" + c.id} href={"https://www.wowhead.com" + ((LOCALE_META[locale] || LOCALE_META.en).whPath) + "/item=" + c.id + (c.bonus ? "&bonus=" + c.bonus : "") + (c.ilvl ? "&ilvl=" + c.ilvl : "")} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 6, textDecoration: "none", background: lit ? "#2a2210" : "#14141f", border: "1px solid " + (lit ? "#ffd47966" : "#26263a") }}>
                    {lit && <span style={{ fontSize: 11, color: "#ffd479" }}>{"\u2605"}</span>}
                    <span style={{ fontSize: 12, fontWeight: 700, color: lit ? "#ffd479" : "#8899aa" }}>{knownItemName(c.id) || c.name}</span>
                    {c.ilvl && <span style={{ fontSize: 10, color: "#556666" }}>{c.ilvl}</span>}
                    {!lit && c.isBis && c.ownedIlvl > 0 && <span style={{ fontSize: 10, color: "#556644" }}>{t("ui.vaultOwned", { ilvl: c.ownedIlvl })}</span>}
                  </a>
                );
              })}
            </div>
          ) : (
            <div style={{ marginTop: 6, fontSize: 11, color: "#556666" }}>{t("ui.vaultReminder")}</div>
          )}
        </div>
      )}
      <div data-tutorial="dungeon-filters" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        <button className={"fbtn" + (filter === "all" ? " active" : "")} onClick={function() { changeFilter("all"); }} style={{ padding: "4px 12px", borderRadius: 6, background: filter === "all" ? theme.accentBg : "#0f0f18", color: filter === "all" ? theme.accent : "#556666", fontSize: 12, fontWeight: 600 }}>{t("ui.all")}</button>
        {nonDungeonSources.prep.map(function(ns) {
          var fc = farmCounts[ns.source] || { bis: 0, alt: 0 };
          var rem = fc.bis + fc.alt;
          return <FilterButton key={ns.source} source={ns.source} label={t("sources." + ns.source) || ns.source} active={filter === ns.source} done={!!sr && rem === 0} farmCount={fc} hasSr={!!sr} colors={PREP_COLORS} onToggle={changeFilter} />;
        })}
        {(nonDungeonSources.prep.length > 0) && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {orderedDungeons.map(function(item, di) {
          var d = item.source;
          var c = DUNGEONS[d] || { g: "#333", b: "#555", t: "#aaa" };
          var fc = farmCounts[d] || { bis: 0, alt: 0 };
          var rem = fc.bis + fc.alt;
          return <FilterButton key={d} source={d} label={t("dungeons." + d)} active={filter === d} done={!!sr && rem === 0} farmCount={fc} hasSr={!!sr} colors={getDungeonFilterColors(c)} pulse={!!sr} onToggle={changeFilter} best={di === 0 && item.score > 0 ? t("ui.bestExpected") : null} />;
        })}
        {nonDungeonSources.raid.length > 0 && <span style={{ width: 1, height: 20, background: "#2a2a3a", alignSelf: "center" }} />}
        {nonDungeonSources.raid.map(function(ns) {
          var fc = farmCounts[ns.source] || { bis: 0, alt: 0 };
          var rem = fc.bis + fc.alt;
          return <FilterButton key={ns.source} source={ns.source} label={t("sources." + ns.source) || ns.source} active={filter === ns.source} done={!!sr && rem === 0} farmCount={fc} hasSr={!!sr} colors={NON_DUNGEON_COLORS} onToggle={changeFilter} />;
        })}
      </div>
      {sr ? (
        <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 10, color: "#556666", flexWrap: "wrap" }}>
          <span><span style={{ color: "#ff6b6b" }}>{"\u25B2"}</span>{" " + t("ui.tierStatMismatch")}</span>
          <span><span style={{ color: "#e8a84c" }}>{"\u25C6"}</span>{" " + t("ui.tierAltEquipped")}</span>
          <span><span style={{ color: "#e8a84c" }}>{"\u2191"}</span>{" " + t("ui.tierBisUpgrade")}</span>
          <span><span style={{ color: "#4dca6b" }}>{"\u2713"}</span>{" " + t("ui.tierDone")}</span>
          <span><span style={{ color: "#ffd479" }}>{"\u2605"}</span>{" " + t("ui.bestExpected")}</span>
          <span><span style={{ color: "#a06a6a" }}>{"\u2193"}</span>{" " + t("ui.statsDowngrade")}</span>
          <span style={{ color: "#445555" }}>{t("ui.deficitInfo", { max: targetInfo.max })}</span>
        </div>
      ) : (
        <div style={{ marginTop: 8, padding: "8px 14px", borderRadius: 6, background: theme.accentBg, border: "1px solid " + theme.accentBorder, fontSize: 11, color: theme.accent + "aa" }}>
          {t("ui.catalogMode")}
        </div>
      )}
      {filter !== "all" && (
        <div style={{ padding: "8px 0" }}>
          {DUNGEONS[filter] ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: DUNGEONS[filter].g + "cc", border: "1px solid " + DUNGEONS[filter].b + "44" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: DUNGEONS[filter].t, fontFamily: "'Cinzel',serif" }}>{t("dungeonsFull." + filter)}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#778888" }}>{"BiS " + displayBis.length}{displayAlts.length > 0 ? " + Alt " + displayAlts.length : ""}{sr && " \u00B7 " + t("ui.priority")}</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "#1a1028cc", border: "1px solid #8866aa44" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#c4aadd", fontFamily: "'Cinzel',serif" }}>{filter}</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#778888" }}>{"BiS " + displayBis.length}{sr && " \u00B7 " + t("ui.priority")}</span>
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        {filter !== "all" && displayBis.length > 0 && <div style={{ fontSize: 11, fontWeight: 700, color: theme.accent, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{t("ui.bisItems")}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {displayBis.map(function(item, idx) {
            var p = sr ? calcPriority(item, sr, targetInfo.max, allStats, PRIORITY_STATS) : null;
            if (acq[item.id]) { if (!p || p.tier !== 4) p = { tier: 4, deficit: 0, ilvl: p ? p.ilvl : 0, labelKey: "done", color: "#4dca6b", worst: false }; }
            return <ItemCard key={item.slot + "-" + item.id} item={item} isAlt={false} priority={p} sr={sr} onToggle={toggle} idx={idx} theme={theme} allStats={allStats}  targetBonus={targetInfo.tooltipBonus} targetIlvl={targetInfo.max} whSpecId={whSpecId} armorTypes={runtimeArmorTypes} expectedArmor={expectedArmor} simcSpec={spec.SIMC_SPEC} primaryStats={runtimePrimaryStats} expectedPrimary={expectedPrimary} gainCtx={gainCtx} simcNames={simcNames} />;
          })}
        </div>
        {displayAlts.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e8a84c", marginTop: 20, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{t("ui.altOptions")}</span><span style={{ height: 1, flex: 1, background: "#3a3020" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {displayAlts.map(function(item, idx) {
                var altP = sr ? calcAltPriority(item, sr, targetInfo.max, acq) : null;
                if (acq[item.id] && (!altP || altP.tier !== 4)) altP = { tier: 4, deficit: 0, ilvl: 0, labelKey: "done", color: "#4dca6b" };
                return <ItemCard key={item.forSlot + "-" + item.id} item={item} isAlt={true} priority={altP} sr={sr} onToggle={toggle} idx={idx} theme={theme} allStats={allStats} targetBonus={targetInfo.tooltipBonus} targetIlvl={targetInfo.max} whSpecId={whSpecId} armorTypes={runtimeArmorTypes} expectedArmor={expectedArmor} simcSpec={spec.SIMC_SPEC} primaryStats={runtimePrimaryStats} expectedPrimary={expectedPrimary} gainCtx={gainCtx} simcNames={simcNames} />;
              })}
            </div>
          </div>
        )}
      </div>
      {raidbotsOpen && (
        <div onClick={function() { setRaidbotsOpen(false); }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.75)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={function(e) { e.stopPropagation(); }} style={{ background: "#0c0c16", border: "1px solid #2a2a3a", borderRadius: 12, maxWidth: 480, width: "100%", maxHeight: "80vh", overflow: "auto", padding: "28px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: theme.accent, fontFamily: "'Cinzel',serif" }}>{t("ui.raidbotsCompare")}</h2>
              <button onClick={function() { setRaidbotsOpen(false); }} style={{ background: "none", border: "1px solid #2a2a3a", borderRadius: 6, color: "#556666", fontSize: 18, cursor: "pointer", padding: "2px 10px", lineHeight: 1.2 }}>&times;</button>
            </div>
            <p style={{ fontSize: 13, color: "#99aaaa", lineHeight: 1.7, marginBottom: 14 }}>{t("ui.raidbotsGuideIntro")}</p>
            <ol style={{ margin: 0, marginBottom: 20, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {[1, 2, 3, 4].map(function(n) {
                return <li key={n} style={{ fontSize: 13, color: "#778888", lineHeight: 1.6 }}>{t("ui.raidbotsGuideStep" + n)}</li>;
              })}
            </ol>
            <button className="sb" onClick={exportRaidbots} style={{ width: "100%", padding: "10px 16px", borderRadius: 8, background: theme.btnBg, border: "none", color: "#0c0c16", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t("ui.raidbotsGuideGo")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
