import { useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Badge, Btn, Card, Inp, Sel } from "../components/ui";
import { T } from "../i18n";
import { S } from "../theme";

// ─── EMPLOYEES ────────────────────────────────────────────────────────────────
const EmployeesScreen = ({ employees, setEmployees, user, onDelete }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee", username: "", password: "" });
  const [formErr, setFormErr] = useState("");
  const [resetTarget, setResetTarget] = useState(null);
  const [resetPw, setResetPw] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const isAdmin = user.role === "Director";
  const canEdit = user.role === "Director" || user.role === "Manager";

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "all" || (filter === "active" ? e.active : !e.active))
  );

  const openAdd = () => { setEditEmp(null); setForm({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee", username: "", password: "" }); setFormErr(""); setShowForm(true); };
  const openEdit = (emp) => { setEditEmp(emp); setForm({ name: emp.name, phone: emp.phone, email: emp.email, position: emp.position, joined: emp.joined, role: emp.role || "Employee", username: emp.username || "", password: "" }); setFormErr(""); setShowForm(true); };

  const saveEmployee = () => {
    if (!form.name) return;
    const username = form.username.trim();
    if (username && employees.some(e => e.username === username && e.id !== editEmp?.id)) { setFormErr(T.usernameTaken); return; }
    const { password, ...rest } = form;
    const base = { ...rest, username };
    // Managers cannot grant roles or logins; only Director edits account fields.
    if (!isAdmin) { delete base.role; delete base.username; }
    if (editEmp) {
      setEmployees(prev => prev.map(e => e.id === editEmp.id ? { ...e, ...base, ...(isAdmin && password ? { password } : {}) } : e));
    } else {
      setEmployees(prev => [...prev, { ...base, role: base.role || "Employee", password: isAdmin ? password : "", id: Date.now(), active: true }]);
    }
    setForm({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee", username: "", password: "" });
    setShowForm(false); setEditEmp(null); setFormErr("");
  };

  const deleteEmployee = (id) => { onDelete(id); setConfirmDel(null); };
  const toggleActive = id => setEmployees(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  const changeRole = (id, role) => { if (id === user.id) return; setEmployees(prev => prev.map(e => e.id === id ? { ...e, role } : e)); };
  const openReset = (emp) => { setResetTarget(emp); setResetPw(""); setResetMsg(""); };
  const doReset = () => {
    if (resetPw.length < 4) { setResetMsg("Хамгийн багадаа 4 тэмдэгт оруулна уу"); return; }
    setEmployees(prev => prev.map(e => e.id === resetTarget.id ? { ...e, password: resetPw } : e));
    setResetMsg("✓ Нууц үг шинэчлэгдлээ!");
    setTimeout(() => { setResetTarget(null); setResetMsg(""); }, 1500);
  };

  const empRoleColor = (r) => r === "Director" ? S.director : r === "Manager" ? S.manager : S.employee;
  const empRoleLabel = (r) => r === "Director" ? "Дээд Админ" : r === "Manager" ? "Менежер" : "Ажилтан";

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{T.employeesTitle}</div>
          {isAdmin && <div style={{ color: S.director, fontSize: 11, fontWeight: 600, marginTop: 2 }}>★ Дээд Админ — бүрэн эрх</div>}
        </div>
        {canEdit && <Btn size="sm" icon="plus" onClick={openAdd}>{T.add}</Btn>}
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <Card style={{ marginBottom: 16, border: `1px solid ${editEmp ? S.warning + "40" : S.accent + "40"}` }}>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
            {editEmp ? T.editTitle : T.newEmployee}
          </div>
          <Inp label={T.fullName} value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
          <Inp label={T.phone} value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
          <Inp label={T.email} value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
          <Inp label={T.position} value={form.position} onChange={v => setForm(f => ({ ...f, position: v }))} />
          <Inp label={T.dateOfJoining} type="date" value={form.joined} onChange={v => setForm(f => ({ ...f, joined: v }))} />
          {isAdmin && (
            <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 12, marginBottom: 4 }}>
              <div style={{ color: S.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 10 }}>{T.accountSection}</div>
              <Inp label={T.usernameLabel} value={form.username} onChange={v => setForm(f => ({ ...f, username: v }))} placeholder="жишээ: user1" />
              <Inp label={editEmp ? T.newPasswordEdit : T.newPassword} value={form.password} onChange={v => setForm(f => ({ ...f, password: v }))} placeholder={editEmp ? "" : "Анхны нууц үг"} />
              <Sel label="Эрх / Үүрэг" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))}
                options={[{ value: "Employee", label: "👤 Ажилтан" }, { value: "Manager", label: "👔 Менежер" }, { value: "Director", label: "★ Дээд Админ" }]} />
            </div>
          )}
          {formErr && <div style={{ color: S.danger, fontSize: 12, marginBottom: 10, padding: "8px 12px", background: S.dangerBg, borderRadius: 8 }}>{formErr}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn full onClick={saveEmployee}>{editEmp ? T.save : T.saveEmployee}</Btn>
            <Btn variant="secondary" onClick={() => { setShowForm(false); setEditEmp(null); }}>{T.cancel}</Btn>
          </div>
        </Card>
      )}

      {/* Delete confirm modal */}
      {confirmDel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Card style={{ maxWidth: 320, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🗑️</div>
            <div style={{ color: S.text, fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{T.confirmDelete}</div>
            <div style={{ color: S.danger, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>{confirmDel.name}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn full variant="danger" onClick={() => deleteEmployee(confirmDel.id)}>{T.deleteEmployee}</Btn>
              <Btn full variant="secondary" onClick={() => setConfirmDel(null)}>{T.cancel}</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Reset password modal (admin) */}
      {resetTarget && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <Card style={{ maxWidth: 320, width: "100%" }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🔑 {T.resetPassword}</div>
            <div style={{ color: S.textMuted, fontSize: 12, marginBottom: 14 }}>{resetTarget.name} (@{resetTarget.username})</div>
            <Inp label="Шинэ нууц үг" value={resetPw} onChange={v => { setResetPw(v); setResetMsg(""); }} placeholder="Хамгийн багадаа 4 тэмдэгт" />
            {resetMsg && <div style={{ color: resetMsg.startsWith("✓") ? S.success : S.danger, fontSize: 12, marginBottom: 10, padding: "8px 12px", background: resetMsg.startsWith("✓") ? S.successBg : S.dangerBg, borderRadius: 8 }}>{resetMsg}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <Btn full onClick={doReset}>Шинэчлэх</Btn>
              <Btn full variant="secondary" onClick={() => setResetTarget(null)}>{T.cancel}</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}><Icon name="search" size={16} /></div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={T.searchEmployees}
          style={{ width: "100%", background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 10, padding: "10px 14px 10px 38px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{ k: "all", l: T.all }, { k: "active", l: T.activeFilter }, { k: "inactive", l: T.inactive }].map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: filter === f.k ? S.accent : S.bgCard, color: filter === f.k ? "#fff" : S.textMuted }}>{f.l}</button>
        ))}
      </div>

      {/* Employee list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(emp => (
          <Card key={emp.id} style={{ padding: 14 }}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <Avatar name={emp.name} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <div style={{ color: S.text, fontSize: 14, fontWeight: 700 }}>{emp.name}</div>
                  <Badge label={empRoleLabel(emp.role || "Employee")} color={empRoleColor(emp.role || "Employee")} />
                  {emp.id === user.id && <Badge label="Та" color={S.accent} />}
                </div>
                <div style={{ color: S.textMuted, fontSize: 12 }}>{emp.position}</div>
                {(canEdit || emp.id === user.id) && <div style={{ color: S.textMuted, fontSize: 11, marginTop: 2 }}>{emp.email}</div>}
                {isAdmin && <div style={{ color: emp.username ? S.textMuted : S.warning, fontSize: 11, marginTop: 2 }}>{emp.username ? "@" + emp.username : "⚠️ " + T.noAccount}</div>}
              </div>
              <Badge label={emp.active ? T.activeLabel : T.inactiveLabel} color={emp.active ? S.success : S.textMuted} />
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
              {(canEdit || emp.id === user.id) && <div style={{ color: S.textMuted, fontSize: 11 }}>📞 {emp.phone}</div>}
              <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {T.joined} {emp.joined}</div>
            </div>

            {/* Admin action buttons */}
            {isAdmin && (
              <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 10 }}>
                <div style={{ color: S.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 8 }}>ЭРХИЙН ТОХИРГОО</div>
                {/* Role changer */}
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {[{ r: "Employee", l: "👤 Ажилтан", c: S.employee }, { r: "Manager", l: "👔 Менежер", c: S.manager }, { r: "Director", l: "★ Дээд Админ", c: S.director }].map(opt => (
                    <button key={opt.r} disabled={emp.id === user.id} onClick={() => changeRole(emp.id, opt.r)} style={{
                      padding: "4px 10px", borderRadius: 8, border: `1px solid ${(emp.role || "Employee") === opt.r ? opt.c : S.border}`,
                      cursor: emp.id === user.id ? "not-allowed" : "pointer", opacity: emp.id === user.id ? 0.6 : 1, fontSize: 11, fontWeight: 600, fontFamily: "inherit",
                      background: (emp.role || "Employee") === opt.r ? opt.c + "22" : "transparent",
                      color: (emp.role || "Employee") === opt.r ? opt.c : S.textMuted
                    }}>{opt.l}</button>
                  ))}
                </div>
                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => toggleActive(emp.id)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: emp.active ? S.dangerBg : S.successBg, color: emp.active ? S.danger : S.success }}>
                    {emp.active ? T.deactivate : T.activate}
                  </button>
                  <button onClick={() => openEdit(emp)} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: `1px solid ${S.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: S.accent }}>
                    ✏️ {T.editEmployee}
                  </button>
                  {emp.username && (
                    <button onClick={() => openReset(emp)} title={T.resetPassword} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${S.warning}30`, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: S.warningBg, color: S.warning }}>
                      🔑
                    </button>
                  )}
                  {emp.id !== user.id && (
                    <button onClick={() => setConfirmDel(emp)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${S.danger}30`, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: S.dangerBg, color: S.danger }}>
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Manager (non-admin) actions */}
            {canEdit && !isAdmin && (
              <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 10, display: "flex", gap: 8 }}>
                <button onClick={() => toggleActive(emp.id)} style={{ flex: 1, padding: "7px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: emp.active ? S.dangerBg : S.successBg, color: emp.active ? S.danger : S.success }}>
                  {emp.active ? T.deactivate : T.activate}
                </button>
                <button onClick={() => openEdit(emp)} style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1px solid ${S.border}`, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: S.accent }}>
                  ✏️ {T.editEmployee}
                </button>
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && <div style={{ color: S.textMuted, textAlign: "center", padding: "32px 0", fontSize: 13 }}>{T.noEmployees}</div>}
      </div>
    </div>
  );
};

export default EmployeesScreen;
