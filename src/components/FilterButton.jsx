export default function FilterButton({ source, label, active, done, farmCount, hasSr, colors, pulse, onToggle }) {
  var fc = farmCount || { bis: 0, alt: 0 };
  return (
    <button className={"fbtn" + (active ? " active" : "")}
      onClick={function() { onToggle(active ? "all" : source); }}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, background: active ? colors.activeBg : (done ? "#0d1a0d" : colors.bg), border: "1px solid " + (active ? colors.activeBorder : (done ? "#1a3a1a" : colors.border)), fontSize: 12, fontWeight: 600, color: active ? colors.activeText : (done ? "#4dca6b" : colors.text) }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: done ? "#4dca6b" : colors.dot, display: "inline-block", animation: done ? "none" : (pulse ? "pulse 2s infinite" : "none") }} />
      <span>{label}</span>
      {done
        ? <span style={{ color: "#2a5a2a", fontSize: 11 }}>{"\u2713"}</span>
        : hasSr
          ? <span style={{ fontSize: 11 }}>
              <span style={{ color: fc.bis > 0 ? colors.countHi : colors.countLo, fontWeight: 700 }}>{fc.bis}</span>
              {fc.alt > 0 && <span style={{ color: "#3a3a3a" }}>{" + "}</span>}
              {fc.alt > 0 && <span style={{ color: "#776655", fontWeight: 400 }}>{fc.alt}</span>}
            </span>
          : <span style={{ fontSize: 11, color: colors.countNoSr }}>{fc.bis}{fc.alt > 0 ? "+" + fc.alt : ""}</span>
      }
    </button>
  );
}
