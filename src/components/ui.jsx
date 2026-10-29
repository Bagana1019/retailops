import Icon from "./Icon";
import { S } from "../theme";

// ─── SHARED UI ────────────────────────────────────────────────────────────────
export const Badge = ({ label, color }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color, background: color + "20", whiteSpace: "nowrap" }}>{label}</span>
);

export const Card = ({ children, style = {} }) => (
  <div style={{ background: S.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${S.border}`, ...style }}>{children}</div>
);

export const Inp = ({ label, type = "text", value, onChange, placeholder, icon }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</div>}
    <div style={{ position: "relative" }}>
      {icon && <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}><Icon name={icon} size={16} /></div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: icon ? "11px 14px 11px 38px" : "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border}
      />
    </div>
  </div>
);

export const Sel = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</div>}
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", appearance: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

export const Btn = ({ children, onClick, variant = "primary", size = "md", icon, full, disabled }) => {
  const vs = { primary: { background: S.accent, color: "#fff", border: "none" }, secondary: { background: "rgba(255,255,255,0.06)", color: S.textDim, border: `1px solid ${S.border}` }, danger: { background: S.dangerBg, color: S.danger, border: `1px solid ${S.danger}30` }, ghost: { background: "transparent", color: S.textDim, border: "none" } };
  const ps = { sm: "7px 14px", md: "10px 20px", lg: "14px 28px" };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...vs[variant], padding: ps[size], borderRadius: 10, fontSize: size === "sm" ? 12 : 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6, width: full ? "100%" : "auto", justifyContent: "center", opacity: disabled ? 0.5 : 1, whiteSpace: "nowrap" }}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
    >{icon && <Icon name={icon} size={14} />}{children}</button>
  );
};

export const StatCard = ({ label, value, color, icon, sub }) => (
  <div style={{ background: S.bgCard, borderRadius: 14, padding: "14px 16px", border: `1px solid ${S.border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: S.textMuted, fontSize: 11, fontWeight: 600, marginBottom: 6 }}>{label}</div>
        <div style={{ color, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ color: S.textMuted, fontSize: 11, marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ background: color + "18", borderRadius: 10, padding: 8 }}><Icon name={icon} size={18} color={color} /></div>
    </div>
  </div>
);

export const SecHead = ({ title, action, onAction, actionIcon }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
    <div style={{ color: S.text, fontSize: 16, fontWeight: 700 }}>{title}</div>
    {action && <Btn size="sm" variant="secondary" icon={actionIcon} onClick={onAction}>{action}</Btn>}
  </div>
);

export const Avatar = ({ name, size = 36 }) => {
  const initials = name.split(" ").slice(0, 2).map(n => n[0]).join("");
  const hue = name.charCodeAt(0) * 5 % 360;
  return <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `hsl(${hue},60%,35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, color: "#fff" }}>{initials}</div>;
};

export const PBar = ({ value, color = S.accent }) => (
  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 5, overflow: "hidden" }}>
    <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4 }} />
  </div>
);
