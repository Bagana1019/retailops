import Icon from "../components/Icon";
import { Badge, Card, SecHead, StatCard } from "../components/ui";
import { T } from "../i18n";
import { S, roleColor, roleLabel, statusColor } from "../theme";
import { toLocalDate } from "../utils/date";

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ user, employees, tasks, attendance, notifications, onNavigate }) => {
  const today = toLocalDate(new Date());
  const isEmployee = user.role === "Employee";
  const todayAtt = attendance.filter(a => a.date === today);
  const myRecord = todayAtt.find(a => a.empId === user.id);
  const myTasks = isEmployee ? tasks.filter(t => t.assignee === user.id) : tasks;
  const pendingTasks = myTasks.filter(t => t.status !== "Дууссан").length;
  const unread = notifications.filter(n => !n.read).length;
  const activeEmps = employees.filter(e => e.active).length;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: S.textMuted, fontSize: 12, fontWeight: 600 }}>{T.goodMorning}</div>
        <div style={{ color: S.text, fontSize: 22, fontWeight: 800, marginTop: 2 }}>{user.name.split(" ")[0]} 👋</div>
        <div style={{ display: "inline-block", marginTop: 6 }}><Badge label={roleLabel(user.role)} color={roleColor(user.role)} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        <StatCard label={T.employees} value={activeEmps} color={S.accent} icon="users" sub={T.active} />
        {isEmployee
          ? <StatCard label={T.myAttendance} value={myRecord ? myRecord.checkIn : "—"} color={myRecord ? S.success : S.textMuted} icon="clock" sub={myRecord ? myRecord.status : T.notCheckedIn} />
          : <StatCard label={T.todayCheckIns} value={todayAtt.length} color={S.success} icon="clock" sub={T.presentToday} />}
        <StatCard label={T.pendingTasks} value={pendingTasks} color={S.warning} icon="tasks" sub={isEmployee ? T.mineSub : T.needAttention} />
        <StatCard label={T.notifications} value={unread} color={S.danger} icon="bell" sub={T.unread} />
      </div>
      <SecHead title={T.quickActions} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[{ label: T.clockInOut, icon: "clock", screen: "attendance", color: S.accent }, { label: T.myTasks, icon: "tasks", screen: "tasks", color: S.success }, { label: T.schedule, icon: "calendar", screen: "schedule", color: S.warning }, { label: T.team, icon: "users", screen: "employees", color: S.director }].map(item => (
          <button key={item.label} onClick={() => onNavigate(item.screen)}
            style={{ background: S.bgCard, border: `1px solid ${S.border}`, borderRadius: 14, padding: 16, cursor: "pointer", textAlign: "left" }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ background: item.color + "18", borderRadius: 10, padding: 8, width: "fit-content", marginBottom: 10 }}><Icon name={item.icon} size={18} color={item.color} /></div>
            <div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{item.label}</div>
          </button>
        ))}
      </div>
      <SecHead title={T.recentTasks} action={T.seeAll} onAction={() => onNavigate("tasks")} actionIcon="tasks" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {myTasks.slice(0, 3).map(task => {
          const assignee = employees.find(e => e.id === task.assignee);
          return (
            <Card key={task.id} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ color: S.text, fontSize: 13, fontWeight: 600, flex: 1, marginRight: 8 }}>{task.title}</div>
                <Badge label={task.status} color={statusColor(task.status)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: S.textMuted, fontSize: 11 }}>👤 {assignee?.name || T.unassigned}</div>
                <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {task.deadline}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
