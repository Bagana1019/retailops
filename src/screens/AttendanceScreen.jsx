import { useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Badge, Card, SecHead } from "../components/ui";
import { T } from "../i18n";
import { S } from "../theme";
import { toLocalDate, toLocalTime } from "../utils/date";

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────
const AttendanceScreen = ({ user, employees, attendance, setAttendance }) => {
  const now = new Date(); const today = toLocalDate(now); const currentTime = toLocalTime(now);
  const [clocked, setClocked] = useState(false);
  const emp = user;
  const myRecord = attendance.find(a => emp && a.empId === emp.id && a.date === today);
  const canSeeAll = user.role === "Director" || user.role === "Manager";
  const todayAtt = attendance.filter(a => a.date === today);
  const myHistory = attendance.filter(a => a.empId === user.id).sort((a, b) => (b.date + b.checkIn).localeCompare(a.date + a.checkIn)).slice(0, 10);
  const clockInOut = () => {
    if (!emp) return;
    if (!myRecord) setAttendance(prev => [...prev, { id: Date.now(), empId: emp.id, date: today, checkIn: currentTime, checkOut: null, status: currentTime <= "08:10" ? "Цагтаа" : "Хоцорсон" }]);
    else if (!myRecord.checkOut) setAttendance(prev => prev.map(a => a.id === myRecord.id ? { ...a, checkOut: currentTime } : a));
    setClocked(true); setTimeout(() => setClocked(false), 2000);
  };
  return (
    <div style={{ padding: 16 }}>
      <div style={{ color: S.text, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{T.attendanceTitle}</div>
      <Card style={{ textAlign: "center", padding: "24px 16px", marginBottom: 16, background: "linear-gradient(135deg,#EEF2FF,#E0E7FF)" }}>
        <div style={{ color: S.textMuted, fontSize: 12, letterSpacing: "0.08em", marginBottom: 8 }}>
          {now.toLocaleDateString("mn-MN", { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <div style={{ color: S.text, fontSize: 48, fontWeight: 800, letterSpacing: "-2px", fontVariantNumeric: "tabular-nums" }}>{currentTime}</div>
        <div style={{ marginTop: 20 }}>
          {!myRecord ? (
            <button onClick={clockInOut} style={{ background: "linear-gradient(135deg,#4F8EF7,#7C3AED)", border: "none", borderRadius: 50, width: 88, height: 88, cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: "0 0 30px rgba(79,142,247,0.4)" }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.93)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
              <Icon name="clock" size={24} color="#fff" /><span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{T.clockInBtn}</span>
            </button>
          ) : !myRecord.checkOut ? (
            <button onClick={clockInOut} style={{ background: "linear-gradient(135deg,#F87171,#EF4444)", border: "none", borderRadius: 50, width: 88, height: 88, cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: "0 0 30px rgba(248,113,113,0.4)" }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.93)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>
              <Icon name="clock" size={24} color="#fff" /><span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{T.clockOutBtn}</span>
            </button>
          ) : (
            <div style={{ color: S.success, fontSize: 14, fontWeight: 600 }}>{T.clockedOutAt} {myRecord.checkOut}</div>
          )}
        </div>
        {myRecord && (
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
            <div><div style={{ color: S.textMuted, fontSize: 11 }}>{T.checkIn}</div><div style={{ color: S.success, fontSize: 14, fontWeight: 700 }}>{myRecord.checkIn}</div></div>
            <div><div style={{ color: S.textMuted, fontSize: 11 }}>{T.status}</div><div style={{ color: myRecord.status === "Хоцорсон" ? S.warning : S.success, fontSize: 14, fontWeight: 700 }}>{myRecord.status}</div></div>
            {myRecord.checkOut && <div><div style={{ color: S.textMuted, fontSize: 11 }}>{T.checkOut}</div><div style={{ color: S.danger, fontSize: 14, fontWeight: 700 }}>{myRecord.checkOut}</div></div>}
          </div>
        )}
        {clocked && <div style={{ color: S.success, fontSize: 13, fontWeight: 600, marginTop: 10 }}>{T.recordedSuccess}</div>}
      </Card>
      {canSeeAll ? (<>
      <SecHead title={T.todayAttendance} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {todayAtt.map(record => {
          const e = employees.find(x => x.id === record.empId); if (!e) return null;
          return (
            <Card key={record.id} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={e.name} size={32} />
                <div style={{ flex: 1 }}><div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{e.name}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{e.position}</div></div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12 }}><span style={{ color: S.success }}>{T.in} {record.checkIn}</span>{record.checkOut && <span style={{ color: S.danger }}> · {T.out} {record.checkOut}</span>}</div>
                  <Badge label={record.status} color={record.status === "Цагтаа" ? S.success : S.warning} />
                </div>
              </div>
            </Card>
          );
        })}
        {todayAtt.length === 0 && <div style={{ color: S.textMuted, textAlign: "center", padding: "24px 0", fontSize: 13 }}>{T.noAttendance}</div>}
      </div>
      </>) : (<>
      <SecHead title={T.myAttendanceHistory} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {myHistory.map(record => (
          <Card key={record.id} style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{record.date}</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12 }}><span style={{ color: S.success }}>{T.in} {record.checkIn}</span>{record.checkOut && <span style={{ color: S.danger }}> · {T.out} {record.checkOut}</span>}</div>
              <Badge label={record.status} color={record.status === "Цагтаа" ? S.success : S.warning} />
            </div>
          </Card>
        ))}
        {myHistory.length === 0 && <div style={{ color: S.textMuted, textAlign: "center", padding: "24px 0", fontSize: 13 }}>{T.noMyAttendance}</div>}
      </div>
      </>)}
    </div>
  );
};

export default AttendanceScreen;
