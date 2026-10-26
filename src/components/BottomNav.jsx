import Icon from "./Icon";
import { T } from "../i18n";
import { S } from "../theme";

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNavigate, unreadCount, user }) => {
  const canSeeReports = user.role === "Director" || user.role === "Manager";
  const tabs = [{ id: "home", icon: "home", label: T.home }, { id: "employees", icon: "users", label: T.team }, { id: "attendance", icon: "clock", label: T.clock }, { id: "tasks", icon: "tasks", label: T.tasks }, { id: "schedule", icon: "calendar", label: T.schedule }, ...(canSeeReports ? [{ id: "reports", icon: "chart", label: T.reports }] : [])];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: `1px solid ${S.border}`, boxShadow: "0 -4px 16px rgba(0,0,0,0.07)", padding: "8px 4px 12px", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNavigate(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 8px", borderRadius: 12, fontFamily: "inherit" }}>
          <div style={{ color: active === tab.id ? S.accent : S.textMuted, position: "relative" }}>
            <Icon name={tab.icon} size={22} color={active === tab.id ? S.accent : S.textMuted} />
            {tab.id === "home" && unreadCount > 0 && <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: S.danger }} />}
          </div>
          <div style={{ color: active === tab.id ? S.accent : S.textMuted, fontSize: 9, fontWeight: active === tab.id ? 700 : 400 }}>{tab.label}</div>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
