import { useState } from "react";
import logo from "../assets/logo.jpg";
import Icon from "../components/Icon";
import { Btn, Card, Inp } from "../components/ui";
import { T } from "../i18n";
import { S } from "../theme";

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin, mode, error }) => {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(error || ""); const [show, setShow] = useState(false); const [busy, setBusy] = useState(false);
  const login = async () => {
    if (!u.trim() || !p || busy) return;
    setBusy(true); setErr("");
    const r = await onLogin(u, p);
    setBusy(false);
    if (r?.error) setErr(r.error);
  };
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF 0%, #F4F6FA 50%, #E8F4FD 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={logo} alt="Btech Store" style={{ width: 130, height: 130, borderRadius: 22, objectFit: "contain", marginBottom: 20, background: "#F4F6FA", display: "block", margin: "0 auto 20px auto" }} />
        <div style={{ color: S.text, fontSize: 22, fontWeight: 800 }}>{T.appName}</div>
        <div style={{ color: S.textMuted, fontSize: 13, marginTop: 4 }}>{T.appSubtitle}</div>
      </div>
      <Card style={{ width: "100%", maxWidth: 400, background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
        <div style={{ color: S.text, fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{T.signIn}</div>
        <Inp label={T.username} value={u} onChange={setU} placeholder={T.enterUsername} icon="user" />
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{T.password}</div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}><Icon name="shield" size={16} /></div>
            <input type={show ? "text" : "password"} value={p} onChange={e => setP(e.target.value)} placeholder={T.enterPassword} onKeyDown={e => e.key === "Enter" && login()}
              style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 40px 11px 38px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
            <div onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", opacity: 0.4 }}><Icon name="eye" size={16} /></div>
          </div>
        </div>
        {err && <div style={{ color: S.danger, fontSize: 13, marginBottom: 12, padding: "8px 12px", background: S.dangerBg, borderRadius: 8 }}>{err}</div>}
        <Btn full size="lg" onClick={login} disabled={busy}>{busy ? T.loading : T.signIn}</Btn>
        <div style={{ color: S.textMuted, fontSize: 12, textAlign: "center", marginTop: 14 }}>{mode === "local" ? T.demo : T.liveMode}</div>
        {mode === "local" && <div style={{ color: S.warning, fontSize: 11, textAlign: "center", marginTop: 6 }}>{T.demoMode}</div>}
      </Card>
    </div>
  );
};

export default LoginScreen;
