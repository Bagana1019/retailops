import { useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Badge, Btn, Card, Inp } from "../components/ui";
import { T } from "../i18n";
import { S, roleColor, roleLabel } from "../theme";

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
const SettingsScreen = ({ user, employees, setEmployees, settings, setSettings, onLogout, onResetDemo }) => {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("settings"); // "settings" | "mypass"
  const [myPw, setMyPw] = useState({ old: "", new1: "", new2: "", show: false, msg: "", err: "" });

  const isAdmin = user.role === "Director";
  const save = () => { setSettings(draft); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // Change own password
  const changeMyPw = () => {
    const me = employees.find(e => e.id === user.id);
    if (!me || myPw.old !== me.password) { setMyPw(p => ({ ...p, err: "Хуучин нууц үг буруу байна", msg: "" })); return; }
    if (myPw.new1.length < 4) { setMyPw(p => ({ ...p, err: "Нууц үг хамгийн багадаа 4 тэмдэгт байна", msg: "" })); return; }
    if (myPw.new1 !== myPw.new2) { setMyPw(p => ({ ...p, err: "Шинэ нууц үг таарахгүй байна", msg: "" })); return; }
    setEmployees(prev => prev.map(e => e.id === user.id ? { ...e, password: myPw.new1 } : e));
    setMyPw({ old: "", new1: "", new2: "", show: false, msg: "✓ Нууц үг амжилттай солигдлоо!", err: "" });
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ color: S.text, fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{T.settingsTitle}</div>

      {/* Profile card */}
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Avatar name={user.name} size={48} />
          <div>
            <div style={{ color: S.text, fontSize: 15, fontWeight: 700 }}>{user.name}</div>
            <div style={{ color: S.textMuted, fontSize: 12 }}>@{user.username}</div>
            <Badge label={roleLabel(user.role)} color={roleColor(user.role)} />
          </div>
        </div>
      </Card>

      {/* Tab selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ k: "settings", l: "⚙️ Ерөнхий" }, { k: "mypass", l: "🔑 Нууц үг" }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: tab === t.k ? S.accent : S.bgCard, color: tab === t.k ? "#fff" : S.textMuted }}>{t.l}</button>
        ))}
      </div>

      {/* ── GENERAL SETTINGS ── */}
      {tab === "settings" && (
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.workHours}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Inp label={T.startTime} type="time" value={draft.workStart} onChange={v => setDraft(d => ({ ...d, workStart: v }))} />
              <Inp label={T.endTime} type="time" value={draft.workEnd} onChange={v => setDraft(d => ({ ...d, workEnd: v }))} />
            </div>
            <Inp label={T.overtimeThreshold} value={draft.overtime} onChange={v => setDraft(d => ({ ...d, overtime: v }))} />
          </Card>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.storeInfo}</div>
            <Inp label={T.storeName} value={draft.storeName} onChange={v => setDraft(d => ({ ...d, storeName: v }))} />
          </Card>
          {saved && <div style={{ color: S.success, textAlign: "center", fontSize: 13, fontWeight: 600, padding: 8, background: S.successBg, borderRadius: 10, marginBottom: 10 }}>{T.settingsSaved}</div>}
          <Btn full onClick={save}>{T.saveSettings}</Btn>
          <div style={{ height: 10 }} />
          <Btn full variant="danger" icon="logout" onClick={onLogout}>{T.signOut}</Btn>
          {isAdmin && (
            <Card style={{ marginTop: 14 }}>
              <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{T.securityData}</div>
              <div style={{ color: S.textMuted, fontSize: 12, marginBottom: 12 }}>{T.dataStoredLocally}</div>
              <Btn full variant="secondary" onClick={() => { if (window.confirm(T.resetDemoConfirm)) onResetDemo(); }}>↺ {T.resetDemo}</Btn>
            </Card>
          )}
        </div>
      )}

      {/* ── MY PASSWORD ── */}
      {tab === "mypass" && (
        <Card>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>🔑 Нууц үг солих</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Хуучин нууц үг</div>
            <div style={{ position: "relative" }}>
              <input type={myPw.show ? "text" : "password"} value={myPw.old} onChange={e => setMyPw(p => ({ ...p, old: e.target.value, err: "" }))}
                placeholder="Хуучин нууц үгээ оруулна уу"
                style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 40px 11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
              <div onClick={() => setMyPw(p => ({ ...p, show: !p.show }))} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", opacity: 0.5 }}><Icon name="eye" size={16} /></div>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Шинэ нууц үг</div>
            <input type={myPw.show ? "text" : "password"} value={myPw.new1} onChange={e => setMyPw(p => ({ ...p, new1: e.target.value, err: "" }))}
              placeholder="Шинэ нууц үг (хамгийн багадаа 4)"
              style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Шинэ нууц үг давтах</div>
            <input type={myPw.show ? "text" : "password"} value={myPw.new2} onChange={e => setMyPw(p => ({ ...p, new2: e.target.value, err: "" }))}
              placeholder="Шинэ нууц үгээ давтана уу"
              style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
          </div>
          {myPw.err && <div style={{ color: S.danger, fontSize: 12, marginBottom: 10, padding: "8px 12px", background: S.dangerBg, borderRadius: 8 }}>{myPw.err}</div>}
          {myPw.msg && <div style={{ color: S.success, fontSize: 12, marginBottom: 10, padding: "8px 12px", background: S.successBg, borderRadius: 8 }}>{myPw.msg}</div>}
          <Btn full onClick={changeMyPw}>Нууц үг солих</Btn>
        </Card>
      )}

    </div>
  );
};

export default SettingsScreen;
