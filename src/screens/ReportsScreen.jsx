import { useState } from "react";
import { Badge, Btn, Card, PBar, StatCard } from "../components/ui";
import { T } from "../i18n";
import { S, statusColor } from "../theme";
import { toLocalDate } from "../utils/date";
import { summarizeAttendance, workedHours } from "../utils/attendance";
import { toCsv, downloadFile, printReport } from "../utils/report";

// ─── REPORTS ──────────────────────────────────────────────────────────────────
const ReportsScreen = ({ employees, tasks, attendance, settings }) => {
  const [tab, setTab] = useState("attendance");
  const [month, setMonth] = useState(toLocalDate(new Date()).slice(0, 7)); // YYYY-MM
  const [msg, setMsg] = useState("");

  const monthLabel = new Date(month + "-01T00:00:00").toLocaleDateString("mn-MN", { year: "numeric", month: "long" });
  const empName = (id) => employees.find((e) => e.id === id)?.name || T.unassigned;

  // Attendance for the selected month
  const monthAtt = attendance.filter((a) => a.date.startsWith(month)).sort((a, b) => (a.date + a.checkIn).localeCompare(b.date + b.checkIn));
  const lateC = monthAtt.filter((a) => a.status === "Хоцорсон").length;
  const onTimeC = monthAtt.filter((a) => a.status === "Цагтаа").length;
  const tot = (onTimeC + lateC) || 1;
  const summary = summarizeAttendance(monthAtt, employees);

  // Tasks (all time; status breakdown)
  const completed = tasks.filter((t) => t.status === T.completed).length;
  const pending = tasks.filter((t) => t.status === T.pending).length;
  const inProg = tasks.filter((t) => t.status === T.inProgress).length;
  const taskTot = tasks.length || 1;

  // ── exports ──
  const attendanceSections = () => [
    { title: T.employeeSummary, headers: [T.fullName, T.position, T.daysPresent, T.onTime, T.late, T.hoursWorked], rows: summary.map((r) => [r.name, r.position, r.days, r.onTime, r.late, r.hours]) },
    { title: T.allRecords, headers: [T.date, T.fullName, T.checkIn, T.checkOut, T.status, T.hoursWorked, T.locationCol], rows: monthAtt.map((a) => [a.date, empName(a.empId), a.checkIn, a.checkOut || "", a.status, workedHours(a) || "", a.locationOk == null ? "" : a.locationOk ? T.locationOkShort : T.locationBadShort + (a.distanceM != null ? ` (${a.distanceM}м)` : "")]) },
  ];
  const taskSections = () => [
    { title: T.taskList, headers: [T.taskTitle, T.assignTo, T.deadline, T.priority, T.status, T.notes], rows: tasks.map((t) => [t.title, empName(t.assignee), t.deadline, t.priority, t.status, t.notes]) },
  ];
  const exportCsv = () => {
    const secs = tab === "attendance" ? attendanceSections() : taskSections();
    const body = secs.map((s) => toCsv([s.title], []).slice(1) + "\r\n" + toCsv(s.headers, s.rows).slice(1)).join("\r\n\r\n");
    downloadFile(`${tab === "attendance" ? "irts" : "daalgavar"}-${tab === "attendance" ? month : toLocalDate(new Date())}.csv`, "﻿" + body);
    setMsg(T.exportDone); setTimeout(() => setMsg(""), 2500);
  };
  const exportPdf = () => {
    const r = printReport({
      title: tab === "attendance" ? `${T.attendance} — ${monthLabel}` : T.taskList,
      subtitle: `${settings?.storeName || T.appName} · ${T.printedAt} ${new Date().toLocaleString("mn-MN")}`,
      sections: tab === "attendance" ? attendanceSections() : taskSections(),
    });
    if (r.error) { setMsg(r.error); setTimeout(() => setMsg(""), 4000); }
  };

  const Pct = ({ rows }) => (
    <Card style={{ marginBottom: 14 }}>
      {rows.map((r) => (
        <div key={r.l} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: S.textDim, fontSize: 12 }}>{r.l}</span><span style={{ color: r.c, fontSize: 12, fontWeight: 700 }}>{r.v}%</span></div>
          <PBar value={r.v} color={r.c} />
        </div>
      ))}
    </Card>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ color: S.text, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{T.reportsTitle}</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[{ k: "attendance", l: T.attendance }, { k: "tasks", l: T.tasks }].map((t) => <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, padding: 9, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", background: tab === t.k ? S.accent : S.bgCard, color: tab === t.k ? "#fff" : S.textMuted }}>{t.l}</button>)}
      </div>

      {tab === "attendance" && (
        <div>
          {/* Month picker */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600 }}>{T.month}</div>
            <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)}
              style={{ flex: 1, background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 10, padding: "8px 12px", color: S.text, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <StatCard label={T.onTime} value={onTimeC} color={S.success} icon="check" />
            <StatCard label={T.late} value={lateC} color={S.warning} icon="alert" />
          </div>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{T.punctualityRate}</div>
          <Pct rows={[{ l: T.onTime, v: Math.round(onTimeC / tot * 100), c: S.success }, { l: T.lateArrivals, v: Math.round(lateC / tot * 100), c: S.warning }]} />

          {/* Per-employee summary */}
          <Card style={{ marginBottom: 14, padding: "14px 12px" }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{T.employeeSummary}</div>
            {summary.length === 0 ? <div style={{ color: S.textMuted, fontSize: 12, textAlign: "center", padding: "12px 0" }}>{T.noAttendance}</div> : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ color: S.textMuted, fontSize: 10, textAlign: "left" }}>
                  <th style={{ padding: "4px 2px", fontWeight: 600 }}>{T.fullName}</th><th style={{ padding: "4px 2px", textAlign: "right", fontWeight: 600 }}>{T.daysShort}</th><th style={{ padding: "4px 2px", textAlign: "right", fontWeight: 600 }}>{T.lateShort}</th><th style={{ padding: "4px 2px", textAlign: "right", fontWeight: 600 }}>{T.hoursShort}</th>
                </tr></thead>
                <tbody>{summary.map((r) => (
                  <tr key={r.empId} style={{ borderTop: `1px solid ${S.border}` }}>
                    <td style={{ padding: "7px 2px", color: S.text, fontWeight: 600 }}>{r.name}<div style={{ color: S.textMuted, fontSize: 10, fontWeight: 400 }}>{r.position}</div></td>
                    <td style={{ padding: "7px 2px", textAlign: "right", color: S.text }}>{r.days}</td>
                    <td style={{ padding: "7px 2px", textAlign: "right", color: r.late ? S.warning : S.textMuted, fontWeight: r.late ? 700 : 400 }}>{r.late}</td>
                    <td style={{ padding: "7px 2px", textAlign: "right", color: S.text }}>{r.hours}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </Card>

          <Card>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.recentRecords}</div>
            {monthAtt.slice(-6).reverse().map((rec) => (
              <div key={rec.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${S.border}` }}>
                <div><div style={{ color: S.text, fontSize: 12, fontWeight: 600 }}>{empName(rec.empId)}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{rec.date} · {T.in} {rec.checkIn}{rec.locationOk === false && <span style={{ color: S.danger }}> · 📍 {T.locationBadShort}</span>}</div></div>
                <Badge label={rec.status} color={rec.status === "Цагтаа" ? S.success : S.warning} />
              </div>
            ))}
            {monthAtt.length === 0 && <div style={{ color: S.textMuted, fontSize: 12, textAlign: "center" }}>{T.noAttendance}</div>}
          </Card>
        </div>
      )}

      {tab === "tasks" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[{ v: completed, c: S.success, l: T.completed }, { v: inProg, c: S.accent, l: T.inProgress }, { v: pending, c: S.warning, l: T.pending }].map((item) => (
              <div key={item.l} style={{ background: S.bgCard, borderRadius: 14, padding: 12, border: `1px solid ${S.border}`, textAlign: "center" }}>
                <div style={{ color: item.c, fontSize: 22, fontWeight: 700 }}>{item.v}</div>
                <div style={{ color: S.textMuted, fontSize: 10, marginTop: 2 }}>{item.l}</div>
              </div>
            ))}
          </div>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{T.completionRate}</div>
          <Pct rows={[{ l: T.completed, v: Math.round(completed / taskTot * 100), c: S.success }, { l: T.pendingInProgress, v: Math.round((pending + inProg) / taskTot * 100), c: S.warning }]} />
          <Card>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.taskList}</div>
            {tasks.map((task) => (
              <div key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${S.border}` }}>
                <div style={{ flex: 1, marginRight: 8 }}><div style={{ color: S.text, fontSize: 12, fontWeight: 600 }}>{task.title}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{empName(task.assignee)}</div></div>
                <Badge label={task.status} color={statusColor(task.status)} />
              </div>
            ))}
            {tasks.length === 0 && <div style={{ color: S.textMuted, fontSize: 12, textAlign: "center" }}>{T.noTasks}</div>}
          </Card>
        </div>
      )}

      {/* Export */}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <Btn full variant="secondary" icon="download" onClick={exportCsv}>{T.exportExcel}</Btn>
        <Btn full variant="secondary" icon="download" onClick={exportPdf}>{T.exportPdf}</Btn>
      </div>
      {msg && <div style={{ color: msg.startsWith("✓") ? S.success : S.danger, fontSize: 12, textAlign: "center", marginTop: 8 }}>{msg}</div>}
    </div>
  );
};

export default ReportsScreen;
