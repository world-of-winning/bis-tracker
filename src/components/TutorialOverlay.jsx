import { useState, useEffect, useCallback } from 'react';
import { TUTORIAL_STEPS } from '../data/tutorial.js';
import { useLocale } from '../i18n/index.jsx';

export default function TutorialOverlay({ step, onNext, onPrev, onSkip }) {
  var { t } = useLocale();
  var [rect, setRect] = useState(null);
  var total = TUTORIAL_STEPS.length;
  var stepConfig = step !== null ? TUTORIAL_STEPS[step] : null;

  var measure = useCallback(function() {
    if (!stepConfig) return;
    var el = document.querySelector(stepConfig.selector);
    if (!el) { setRect(null); return; }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // Delay measurement to allow scroll to settle
    setTimeout(function() {
      var r = el.getBoundingClientRect();
      setRect({ x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12 });
    }, 350);
  }, [stepConfig]);

  var remeasure = useCallback(function() {
    if (!stepConfig) return;
    var el = document.querySelector(stepConfig.selector);
    if (!el) { setRect(null); return; }
    var r = el.getBoundingClientRect();
    setRect({ x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12 });
  }, [stepConfig]);

  useEffect(function() {
    measure();
    window.addEventListener("resize", remeasure);
    window.addEventListener("scroll", remeasure, true);
    return function() {
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("scroll", remeasure, true);
    };
  }, [measure, remeasure]);

  if (step === null || !stepConfig) return null;

  // Tooltip position calculation
  var tooltipStyle = { position: "fixed", zIndex: 100001, maxWidth: 340, padding: "16px 20px", borderRadius: 10, background: "#0c0c16", border: "1px solid #c9a22744", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" };
  if (rect) {
    var vw = window.innerWidth, vh = window.innerHeight;
    // Default: below the element
    tooltipStyle.left = Math.max(12, Math.min(rect.x, vw - 360));
    tooltipStyle.top = rect.y + rect.h + 12;
    // If not enough space below, show above
    if (rect.y + rect.h + 200 > vh) {
      tooltipStyle.top = Math.max(12, rect.y - 200);
    }
  } else {
    tooltipStyle.left = "50%";
    tooltipStyle.top = "50%";
    tooltipStyle.transform = "translate(-50%, -50%)";
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100000 }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <mask id="tutorial-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx="8" fill="black" />}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.7)" mask="url(#tutorial-mask)" />
      </svg>
      {rect && (
        <div style={{ position: "fixed", left: rect.x, top: rect.y, width: rect.w, height: rect.h, border: "2px solid #c9a227", borderRadius: 8, pointerEvents: "none", zIndex: 100001, boxShadow: "0 0 0 2px #c9a22744" }} />
      )}
      <div style={tooltipStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#c9a227", marginBottom: 6 }}>{t(stepConfig.titleKey)}</div>
        <div style={{ fontSize: 12, color: "#aaa89a", lineHeight: 1.6, whiteSpace: "pre-line" }}>{t(stepConfig.descKey)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          <button onClick={onSkip} style={{ padding: "5px 12px", borderRadius: 6, background: "transparent", border: "1px solid #2a2a3a", color: "#556666", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{t("tutorial.skip")}</button>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#445555" }}>{(step + 1) + " / " + total}</span>
          {step > 0 && <button onClick={onPrev} style={{ padding: "5px 12px", borderRadius: 6, background: "#1a1a28", border: "1px solid #2a2a3a", color: "#889999", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{t("tutorial.prev")}</button>}
          <button onClick={onNext} style={{ padding: "5px 14px", borderRadius: 6, background: "#c9a22722", border: "1px solid #c9a22766", color: "#c9a227", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{step >= total - 1 ? t("tutorial.done") : t("tutorial.next")}</button>
        </div>
      </div>
    </div>
  );
}
