import Icon from "../components/Icon";
import { Btn } from "../components/ui";
import { T } from "../i18n";
import { S } from "../theme";

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const NotificationsScreen = ({ notifications, api }) => {
  const tc = { shift: S.accent, task: S.success, schedule: S.warning };
  const ti = { shift: "clock", task: "tasks", schedule: "calendar" };
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{T.notificationsTitle}</div>
        <Btn size="sm" variant="ghost" onClick={api.markAllRead}>{T.markAllRead}</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map(n => (
          <div key={n.id} onClick={() => { if (!n.read) api.markRead(n.id); }}
            style={{ background: n.read ? S.bgCard : "rgba(79,142,247,0.08)", borderRadius: 14, padding: 14, border: `1px solid ${n.read ? S.border : "rgba(79,142,247,0.2)"}`, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ background: tc[n.type] + "20", borderRadius: 10, padding: 8, flexShrink: 0 }}><Icon name={ti[n.type]} size={16} color={tc[n.type]} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ color: S.text, fontSize: 13, fontWeight: n.read ? 400 : 600, marginBottom: 4 }}>{n.message}</div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: S.accent, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
