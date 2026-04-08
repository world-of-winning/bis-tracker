import { useEffect, useRef } from 'react';
import { sanitizeHTML } from '../sanitize.js';
import { DIFF_ORDER, parseTooltipStats, computeStatDiff, renderDiffHTML } from '../logic/tooltip.js';

var eqTooltipCache = {};

export default function EqTooltipObserver({ locale, whSpecId, t }) {
  var LOCALE_WH = { en: 0, ko: 1, fr: 2, de: 3, zhCN: 4, es: 6, ru: 7, pt: 8, it: 9, zhTW: 10 };
  var loc = LOCALE_WH[locale] || 0;
  var elRef = useRef(null);
  useEffect(function() {
    var el = document.getElementById("eq-tooltip-singleton");
    if (!el) {
      el = document.createElement("div");
      el.id = "eq-tooltip-singleton";
      el.className = "eq-tooltip-wrap";
      el.style.cssText = "position:fixed;z-index:99998;pointer-events:none;padding:20px 6px 6px;display:none;";
      el.innerHTML = '<div class="eq-tooltip-label" style="position:absolute;top:3px;left:10px;font-size:10px;font-weight:700;color:#ffd100;letter-spacing:.5px;pointer-events:none;background:#1a1a2e;padding:2px 8px;border-radius:3px;border:1px solid #ffd10066;text-shadow:0 1px 2px rgba(0,0,0,.8)"></div><div class="wowhead-tooltip" data-eq-tooltip="true"><table><tbody><tr><td class="eq-td"></td><th style="background-position:right top"></th></tr><tr><th style="background-position:left bottom"></th><th style="background-position:right bottom"></th></tr></tbody></table></div>';
      document.body.appendChild(el);
    }
    elRef.current = el;
  }, []);
  useEffect(function() {
    // Clear cached tooltips when spec changes (primary stats differ by spec)
    for (var k in eqTooltipCache) delete eqTooltipCache[k];
    var lastEqKey = null;
    var rafId = null;
    var activeLink = null;
    var diffComputed = false;
    var hoverTime = 0;
    var eqLabelText = t("ui.equipped");
    var diffHeader = t("diffLabels.header");
    var diffLabels = {};
    DIFF_ORDER.forEach(function(k) { diffLabels[k] = t("diffLabels." + k); });

    function trackPosition() {
      var el = elRef.current; if (!el || !activeLink) return;
      var whTip = document.querySelector(".wowhead-tooltip:not([data-eq-tooltip])");
      if (!whTip || whTip.getBoundingClientRect().width === 0) {
        rafId = requestAnimationFrame(trackPosition);
        return;
      }
      var r = whTip.getBoundingClientRect();
      var left = r.right;
      if (left + 340 > window.innerWidth) left = r.left - 340;
      var top = Math.min(r.top, window.innerHeight - 400);
      el.style.top = (Math.max(4, top) - 20) + "px";
      el.style.left = (Math.max(4, left) - 6) + "px";
      el.style.display = "block";
      if (!diffComputed && Date.now() - hoverTime > 300) {
        var eqHtml = eqTooltipCache[lastEqKey];
        if (eqHtml) {
          var bisHtml = whTip.innerHTML;
          var bisStats = parseTooltipStats(bisHtml);
          if (Object.keys(bisStats).length > 0) {
            diffComputed = true;
            var td = el.querySelector(".eq-td");
            if (td) {
              var diffDiv = td.querySelector(".eq-stat-diff");
              if (!diffDiv) {
                diffDiv = document.createElement("div");
                diffDiv.className = "eq-stat-diff";
                td.appendChild(diffDiv);
              }
              var eqStats = parseTooltipStats(eqHtml);
              var diff = computeStatDiff(bisStats, eqStats, whSpecId);
              diffDiv.innerHTML = diff.length > 0 ? renderDiffHTML(diff, diffLabels, diffHeader) : "";
            }
          }
        }
      }
      rafId = requestAnimationFrame(trackPosition);
    }

    function onOver(e) {
      var link = e.target.closest("a[data-eq-id]");
      if (!link || link === activeLink) return;
      activeLink = link;
      diffComputed = false;
      hoverTime = Date.now();
      var el = elRef.current; if (!el) return;
      var eqId = link.getAttribute("data-eq-id");
      var eqBonus = link.getAttribute("data-eq-bonus");
      var eqIlvl = link.getAttribute("data-eq-ilvl");
      var eqKey = eqId + "-" + eqBonus + "-" + eqIlvl;
      var lbl = el.querySelector(".eq-tooltip-label");
      if (lbl) lbl.textContent = eqLabelText;
      if (eqKey !== lastEqKey) {
        lastEqKey = eqKey;
        var td = el.querySelector(".eq-td");
        if (eqTooltipCache[eqKey]) { td.innerHTML = sanitizeHTML(eqTooltipCache[eqKey]); }
        else {
          td.innerHTML = '<span style="color:#556666;padding:12px">Loading...</span>';
          fetch("https://nether.wowhead.com/tooltip/item/" + eqId + "?dataEnv=1&locale=" + loc + (whSpecId ? "&spec=" + whSpecId : "") + (eqBonus ? "&bonus=" + eqBonus : "") + (eqIlvl ? "&ilvl=" + eqIlvl : ""))
            .then(function(res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
            .then(function(data) {
              eqTooltipCache[eqKey] = sanitizeHTML(data.tooltip);
              if (lastEqKey === eqKey) td.innerHTML = eqTooltipCache[eqKey];
            })
            .catch(function() {
              if (lastEqKey === eqKey) td.innerHTML = '<span style="color:#aa5555;padding:12px">Failed to load</span>';
            });
        }
      }
      if (!rafId) rafId = requestAnimationFrame(trackPosition);
    }

    function onOut(e) {
      var link = e.target.closest("a[data-eq-id]");
      if (!link && !e.target.closest(".eq-tooltip-wrap")) return;
      // Check if we moved to another eq-link
      var related = e.relatedTarget;
      if (related && related.closest && related.closest("a[data-eq-id]")) return;
      activeLink = null;
      lastEqKey = null;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      var el = elRef.current; if (el) el.style.display = "none";
    }

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    return function() {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loc, whSpecId, t]);
  return null;
}
