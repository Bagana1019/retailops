import logo from "../assets/logo.jpg";
import Icon from "./Icon";
import { T } from "../i18n";
import { S } from "../theme";

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar = ({ screen, notifications, onNavigate }) => {
  const unread = notifications.filter(n => !n.read).length;
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${S.border}`, boxShadow: "0 1px 8px rgba(0,0,0,0.07)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logo} alt="Btech Store" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "contain", background: "#0D0F1A" }} />
        <div style={{ color: S.text, fontSize: 16, fontWeight: 700 }}>{T.screenTitles[screen] || T.appName}</div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <button onClick={() => onNavigate("notifications")} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, position: "relative" }}>
          <Icon name="bell" size={20} color={screen === "notifications" ? S.accent : S.textMuted} />
          {unread > 0 && <div style={{ position: "absolute", top: 3, right: 3, width: 8, height: 8, borderRadius: "50%", background: S.danger }} />}
        </button>
        <button onClick={() => onNavigate("settings")} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          <Icon name="settings" size={20} color={screen === "settings" ? S.accent : S.textMuted} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
