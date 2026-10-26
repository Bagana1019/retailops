import { useState } from "react";
import { Avatar, Btn, Card, Inp, Sel } from "../components/ui";
import { T } from "../i18n";
import { S } from "../theme";
import { toLocalDate } from "../utils/date";

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const ScheduleScreen = ({ employees, shifts, user, api }) => {
  const todayObj = new Date();
  const today = toLocalDate(todayObj);

  const [selDate, setSelDate] = useState(today);
  const [viewMode, setViewMode] = useState("month"); // "month" | "day"
  const [calYear, setCalYear] = useState(todayObj.getFullYear());
  const [calMonth, setCalMonth] = useState(todayObj.getMonth()); // 0-11
  const [showForm, setShowForm] = useState(false);
  const [editShift, setEditShift] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [form, setForm] = useState({ empId: "", date: today, shift: "Өглөө", start: "08:00", end: "16:00", note: "" });

  const isAdmin = user.role === "Director";
  const canEdit = user.role === "Director" || user.role === "Manager";
  const colors = { "Өглөө": S.warning, "Орой": S.accent, "Шөнө": S.director };
  const emojis = { "Өглөө": "🌅", "Орой": "🌆", "Шөнө": "🌙" };
  const MN_MONTHS = ["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"];
  const MN_DAYS = ["Да","Мя","Лх","Пү","Ба","Бя","Ня"];

  const dayShifts = shifts.filter(s => s.date === selDate);

  // Calendar grid helpers
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => {
    let d = new Date(y, m, 1).getDay(); // 0=Sun
    return d === 0 ? 6 : d - 1; // Mon=0
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const pickDate = (dateStr) => {
    setSelDate(dateStr);
    setViewMode("day");
    setShowForm(false);
  };

  const openAdd = () => {
    setEditShift(null);
    setForm({ empId: "", date: selDate, shift: "Өглөө", start: "08:00", end: "16:00", note: "" });
    setShowForm(true);
  };

  const openEdit = (shift) => {
    setEditShift(shift);
    setForm({ empId: String(shift.empId), date: shift.date, shift: shift.shift, start: shift.start, end: shift.end, note: shift.note || "" });
    setShowForm(true);
  };

  const saveShift = async () => {
    // <select> values are strings; ids may be numbers (demo) or uuids (Supabase), so resolve against the list.
    const emp = employees.find(e => String(e.id) === String(form.empId));
    if (!emp) return;
    const data = { ...form, empId: emp.id };
    const r = editShift ? await api.update(editShift.id, data) : await api.create(data);
    if (r.error) return;
    setShowForm(false); setEditShift(null);
  };

  const deleteShift = async (id) => { await api.remove(id); setConfirmDel(null); };

  const calcDuration = (start, end) => {
    if (!start || !end) return "";
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) mins += 24 * 60;
    const h = Math.floor(mins / 60); const m = mins % 60;
    return m > 0 ? `${h}ц ${m}м` : `${h} цаг`;
  };

  // Build calendar grid
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const calCells = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  const pad = n => String(n).padStart(2, "0");
  const dateStr = (d) => `${calYear}-${pad(calMonth + 1)}-${pad(d)}`;

  // Month summary stats
  const monthShifts = shifts.filter(s => s.date.startsWith(`${calYear}-${pad(calMonth + 1)}`));
  const monthDaysWithShifts = new Set(monthShifts.map(s => s.date)).size;

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{T.scheduleTitle}</div>
          {isAdmin && <div style={{ color: S.director, fontSize: 11, fontWeight: 600, marginTop: 2 }}>★ Бүх ээлжийг удирдах эрхтэй</div>}
        </div>
        {canEdit && viewMode === "day" && <Btn size="sm" icon="plus" onClick={openAdd}>{T.addShift}</Btn>}
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ k: "month", l: "📅 Сараар" }, { k: "day", l: "📋 Өдрөөр" }].map(v => (
          <button key={v.k} onClick={() => setViewMode(v.k)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", background: viewMode === v.k ? S.accent : S.bgCard, color: viewMode === v.k ? "#fff" : S.textMuted }}>
            {v.l}
          </button>
        ))}
      </div>

      {/* ── MONTH CALENDAR VIEW ── */}
      {viewMode === "month" && (
        <div>
          {/* Month navigator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <button onClick={prevMonth} style={{ background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: S.text, fontFamily: "inherit", fontSize: 16, fontWeight: 700 }}>‹</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: S.text, fontSize: 16, fontWeight: 700 }}>{MN_MONTHS[calMonth]}</div>
              <div style={{ color: S.textMuted, fontSize: 12 }}>{calYear} он</div>
            </div>
            <button onClick={nextMonth} style={{ background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: S.text, fontFamily: "inherit", fontSize: 16, fontWeight: 700 }}>›</button>
          </div>

          {/* Month stats */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[
              { l: "Нийт ээлж", v: monthShifts.length, c: S.accent },
              { l: "Ажлын өдөр", v: monthDaysWithShifts, c: S.success },
              { l: "Ажилтан", v: new Set(monthShifts.map(s => s.empId)).size, c: S.warning },
            ].map(item => (
              <div key={item.l} style={{ flex: 1, background: S.bgCard, borderRadius: 10, padding: "10px 8px", textAlign: "center", border: `1px solid ${S.border}` }}>
                <div style={{ color: item.c, fontSize: 20, fontWeight: 700 }}>{item.v}</div>
                <div style={{ color: S.textMuted, fontSize: 10, marginTop: 2 }}>{item.l}</div>
              </div>
            ))}
          </div>

          {/* Weekday headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 4 }}>
            {MN_DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", color: S.textMuted, fontSize: 10, fontWeight: 700, padding: "4px 0" }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
            {calCells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const ds = dateStr(day);
              const dayS = shifts.filter(s => s.date === ds);
              const isToday = ds === today;
              const isSel = ds === selDate;
              const shiftTypes = [...new Set(dayS.map(s => s.shift))];
              return (
                <button key={ds} onClick={() => pickDate(ds)} style={{
                  background: isSel ? S.accent : isToday ? "rgba(79,142,247,0.15)" : S.bgCard,
                  border: isToday ? `1px solid ${S.accent}` : `1px solid ${S.border}`,
                  borderRadius: 8, padding: "6px 2px", cursor: "pointer", fontFamily: "inherit",
                  minHeight: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 2
                }}>
                  <div style={{ color: isSel ? "#fff" : isToday ? S.accent : S.text, fontSize: 13, fontWeight: isSel || isToday ? 700 : 400 }}>{day}</div>
                  {/* Shift dots */}
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                    {shiftTypes.slice(0, 3).map(st => (
                      <div key={st} style={{ width: 5, height: 5, borderRadius: "50%", background: isSel ? "#fff" : (colors[st] || S.success), flexShrink: 0 }} />
                    ))}
                  </div>
                  {dayS.length > 0 && (
                    <div style={{ color: isSel ? "rgba(255,255,255,0.8)" : S.textMuted, fontSize: 9 }}>{dayS.length}ш</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
            {Object.entries(colors).map(([name, col]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: col }} />
                <span style={{ color: S.textMuted, fontSize: 11 }}>{emojis[name]} {name}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: S.success }} />
              <span style={{ color: S.textMuted, fontSize: 11 }}>⚙️ Тусгай</span>
            </div>
          </div>
        </div>
      )}

      {/* ── DAY VIEW ── */}
      {viewMode === "day" && (
        <div>
          {/* Back to month + selected date */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <button onClick={() => setViewMode("month")} style={{ background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: S.accent, fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
              ‹ Сар
            </button>
            <div>
              <div style={{ color: S.text, fontSize: 15, fontWeight: 700 }}>
                {new Date(selDate + "T00:00:00").toLocaleDateString("mn-MN", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>
                {new Date(selDate + "T00:00:00").toLocaleDateString("mn-MN", { weekday: "long" })}
                {selDate === today && <span style={{ color: S.accent, marginLeft: 6 }}>· Өнөөдөр</span>}
              </div>
            </div>
          </div>

          {/* Horizontal date strip (±5 days) */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
            {Array.from({ length: 11 }, (_, i) => {
              const d = new Date(selDate + "T00:00:00"); d.setDate(d.getDate() + i - 5);
              const ds = toLocalDate(d);
              const isSel = ds === selDate; const isT = ds === today;
              const hasSh = shifts.some(s => s.date === ds);
              return (
                <button key={ds} onClick={() => setSelDate(ds)} style={{ flexShrink: 0, padding: "7px 10px", borderRadius: 10, border: isT ? `2px solid ${S.accent}` : "none", cursor: "pointer", background: isSel ? S.accent : S.bgCard, color: isSel ? "#fff" : S.textMuted, fontFamily: "inherit", textAlign: "center", minWidth: 42, position: "relative" }}>
                  <div style={{ fontSize: 9, fontWeight: 600 }}>{d.toLocaleDateString("mn-MN", { weekday: "short" }).toUpperCase()}</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{d.getDate()}</div>
                  {hasSh && <div style={{ width: 5, height: 5, borderRadius: "50%", background: isSel ? "#fff" : S.accent, margin: "2px auto 0" }} />}
                </button>
              );
            })}
          </div>

          {/* Add / Edit form */}
          {showForm && (
            <Card style={{ marginBottom: 16, border: `1px solid ${editShift ? S.warning + "50" : S.accent + "50"}` }}>
              <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
                {editShift ? "✏️ Ээлж засах" : "➕ " + T.newShift}
              </div>
              <Sel label="Ажилтан" value={form.empId} onChange={v => setForm(f => ({ ...f, empId: v }))}
                options={[{ value: "", label: T.selectEmployee }, ...employees.filter(e => e.active).map(e => ({ value: e.id, label: e.name + " — " + e.position }))]} />
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Огноо — аль ч өдрийг сонгоно</div>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer" }}
                  onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
              </div>
              <Sel label="Ээлжийн нэр" value={form.shift} onChange={v => setForm(f => ({ ...f, shift: v }))}
                options={[{ value: "Өглөө", label: "🌅 Өглөө" }, { value: "Орой", label: "🌆 Орой" }, { value: "Шөнө", label: "🌙 Шөнө" }, { value: "Тусгай", label: "⚙️ Тусгай" }]} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Inp label="Эхлэх цаг" type="time" value={form.start} onChange={v => setForm(f => ({ ...f, start: v }))} />
                <Inp label="Дуусах цаг" type="time" value={form.end} onChange={v => setForm(f => ({ ...f, end: v }))} />
              </div>
              {form.start && form.end && (
                <div style={{ background: "rgba(79,142,247,0.1)", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: S.textMuted, fontSize: 12 }}>Нийт ажлын цаг:</span>
                  <span style={{ color: S.accent, fontSize: 13, fontWeight: 700 }}>{calcDuration(form.start, form.end)}</span>
                </div>
              )}
              <Inp label="Тэмдэглэл (заавал биш)" value={form.note} onChange={v => setForm(f => ({ ...f, note: v }))} placeholder="Жишээ: хагас цагаар ирнэ..." />
              <div style={{ display: "flex", gap: 8 }}>
                <Btn full onClick={saveShift}>{editShift ? T.save : "Ээлж нэмэх"}</Btn>
                <Btn variant="secondary" onClick={() => { setShowForm(false); setEditShift(null); }}>{T.cancel}</Btn>
              </div>
            </Card>
          )}

          {/* Delete confirm */}
          {confirmDel && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <Card style={{ maxWidth: 300, width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>🗑️</div>
                <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Ээлж устгах уу?</div>
                <div style={{ color: S.textMuted, fontSize: 12, marginBottom: 18 }}>
                  {employees.find(e => e.id === confirmDel.empId)?.name} — {confirmDel.shift} ({confirmDel.start}–{confirmDel.end})
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn full variant="danger" onClick={() => deleteShift(confirmDel.id)}>Устгах</Btn>
                  <Btn full variant="secondary" onClick={() => setConfirmDel(null)}>{T.cancel}</Btn>
                </div>
              </Card>
            </div>
          )}

          {/* Day summary */}
          {dayShifts.length > 0 && (
            <div style={{ background: S.bgCard, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", border: `1px solid ${S.border}` }}>
              <div style={{ color: S.textMuted, fontSize: 12 }}>Нийт ээлж: <span style={{ color: S.text, fontWeight: 700 }}>{dayShifts.length}</span></div>
              <div style={{ color: S.textMuted, fontSize: 12 }}>Ажилтан: <span style={{ color: S.success, fontWeight: 700 }}>{new Set(dayShifts.map(s => s.empId)).size}</span></div>
            </div>
          )}

          {/* Shift list */}
          {["Өглөө", "Орой", "Шөнө", "Тусгай"].map(st => {
            const ts = dayShifts.filter(s => s.shift === st);
            if (!ts.length) return null;
            const col = colors[st] || S.success;
            const emo = emojis[st] || "⚙️";
            return (
              <div key={st} style={{ marginBottom: 16 }}>
                <div style={{ color: col, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{emo} {st} ээлж</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ts.map(shift => {
                    const e = employees.find(x => x.id === shift.empId);
                    const dur = calcDuration(shift.start, shift.end);
                    return (
                      <Card key={shift.id} style={{ padding: "12px 14px", borderLeft: `3px solid ${col}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar name={e?.name || "?"} size={32} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{e?.name}</div>
                            <div style={{ color: S.textMuted, fontSize: 11 }}>{e?.position}</div>
                            {shift.note && <div style={{ color: S.textDim, fontSize: 10, marginTop: 2, fontStyle: "italic" }}>📝 {shift.note}</div>}
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ color: col, fontSize: 12, fontWeight: 700 }}>{shift.start} – {shift.end}</div>
                            <div style={{ color: S.textMuted, fontSize: 10, marginTop: 2 }}>{dur}</div>
                          </div>
                        </div>
                        {isAdmin && (
                          <div style={{ display: "flex", gap: 8, marginTop: 10, borderTop: `1px solid ${S.border}`, paddingTop: 10 }}>
                            <button onClick={() => openEdit(shift)} style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: `1px solid ${S.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: S.accent }}>✏️ Засах</button>
                            <button onClick={() => setConfirmDel(shift)} style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: `1px solid ${S.danger}30`, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: S.dangerBg, color: S.danger }}>🗑️ Устгах</button>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {dayShifts.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
              <div style={{ color: S.textMuted, fontSize: 13 }}>{T.noShifts}</div>
              {canEdit && <div style={{ color: S.accent, fontSize: 12, marginTop: 8, cursor: "pointer" }} onClick={openAdd}>+ Ээлж нэмэх</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleScreen;
