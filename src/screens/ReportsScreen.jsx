import { useState } from "react";
import { Badge, Btn, Card, PBar, StatCard } from "../components/ui";
import { T } from "../i18n";
import { S, statusColor } from "../theme";

// ─── REPORTS ──────────────────────────────────────────────────────────────────
const ReportsScreen = ({ employees, tasks, attendance }) => {
  const [tab, setTab] = useState("attendance");
  const completed = tasks.filter(t => t.status === T.completed).length;
  const pending = tasks.filter(t => t.status === T.pending).length;
  const inProg = tasks.filter(t => t.status === T.inProgress).length;
  const lateC = attendance.filter(a => a.status === "Хоцорсон").length;
  const onTimeC = attendance.filter(a => a.status === "Цагтаа").length;
  const tot = (onTimeC + lateC) || 1;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ color: S.text, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{T.reportsTitle}</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {[{ k: "attendance", l: T.attendance }, { k: "tasks", l: T.tasks }].map(t => <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, padding: 9, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", background: tab === t.k ? S.accent : S.bgCard, color: tab === t.k ? "#fff" : S.textMuted }}>{t.l}</button>)}
      </div>
      {tab === "attendance" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <StatCard label={T.onTime} value={onTimeC} color={S.success} icon="check" />
            <StatCard label={T.late} value={lateC} color={S.warning} icon="alert" />
          </div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.punctualityRate}</div>
            {[{ l: T.onTime, v: Math.round(onTimeC / tot * 100), c: S.success }, { l: T.lateArrivals, v: Math.round(lateC / tot * 100), c: S.warning }].map(r => (
              <div key={r.l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: S.textDim, fontSize: 12 }}>{r.l}</span><span style={{ color: r.c, fontSize: 12, fontWeight: 700 }}>{r.v}%</span></div>
                <PBar value={r.v} color={r.c} />
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.recentRecords}</div>
            {attendance.slice(0, 6).map(rec => { const e = employees.find(x => x.id === rec.empId); return (
              <div key={rec.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${S.border}` }}>
                <div><div style={{ color: S.text, fontSize: 12, fontWeight: 600 }}>{e?.name}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{rec.date} · {T.in} {rec.checkIn}</div></div>
                <Badge label={rec.status} color={rec.status === "Цагтаа" ? S.success : S.warning} />
              </div>
            ); })}
          </Card>
        </div>
      )}
      {tab === "tasks" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[{ v: completed, c: S.success, l: T.completed }, { v: inProg, c: S.accent, l: T.inProgress }, { v: pending, c: S.warning, l: T.pending }].map(item => (
              <div key={item.l} style={{ background: S.bgCard, borderRadius: 14, padding: 12, border: `1px solid ${S.border}`, textAlign: "center" }}>
                <div style={{ color: item.c, fontSize: 22, fontWeight: 700 }}>{item.v}</div>
                <div style={{ color: S.textMuted, fontSize: 10, marginTop: 2 }}>{item.l}</div>
              </div>
            ))}
          </div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.completionRate}</div>
            {[{ l: T.completed, v: Math.round(completed / tasks.length * 100), c: S.success }, { l: T.pendingInProgress, v: Math.round((pending + inProg) / tasks.length * 100), c: S.warning }].map(r => (
              <div key={r.l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: S.textDim, fontSize: 12 }}>{r.l}</span><span style={{ color: r.c, fontSize: 12, fontWeight: 700 }}>{r.v}%</span></div>
                <PBar value={r.v} color={r.c} />
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.taskList}</div>
            {tasks.map(task => { const assignee = employees.find(e => e.id === task.assignee); return (
              <div key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${S.border}` }}>
                <div style={{ flex: 1, marginRight: 8 }}><div style={{ color: S.text, fontSize: 12, fontWeight: 600 }}>{task.title}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{assignee?.name || T.unassigned}</div></div>
                <Badge label={task.status} color={statusColor(task.status)} />
              </div>
            ); })}
          </Card>
          <div style={{ marginTop: 14 }}><Btn full variant="secondary" icon="download">{T.exportReport}</Btn></div>
        </div>
      )}
    </div>
  );
};

export default ReportsScreen;
