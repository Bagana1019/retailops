import { useState } from "react";
import BottomNav from "./components/BottomNav";
import TopBar from "./components/TopBar";
import AttendanceScreen from "./screens/AttendanceScreen";
import Dashboard from "./screens/Dashboard";
import EmployeesScreen from "./screens/EmployeesScreen";
import LoginScreen from "./screens/LoginScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ReportsScreen from "./screens/ReportsScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TasksScreen from "./screens/TasksScreen";
import { store, useStore } from "./store";
import { T } from "./i18n";
import { S } from "./theme";

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const { ready, mode, error, user, employees, tasks, attendance, shifts, notifications, settings } = useStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: S.bg, display: "flex", alignItems: "center", justifyContent: "center", color: S.textMuted, fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontSize: 14 }}>
        {T.loading}
      </div>
    );
  }

  if (!user) return <LoginScreen onLogin={store.login} mode={mode} error={error} />;

  // Employees have no Reports tab; never render it for them even if `screen` still says so (e.g. after a role change).
  const canSeeReports = user.role === "Director" || user.role === "Manager";
  const activeScreen = screen === "reports" && !canSeeReports ? "home" : screen;

  const screens = {
    home: <Dashboard user={user} employees={employees} tasks={tasks} attendance={attendance} notifications={notifications} onNavigate={setScreen} />,
    employees: <EmployeesScreen employees={employees} user={user} api={store.employees} mode={mode} />,
    attendance: <AttendanceScreen user={user} employees={employees} attendance={attendance} api={store.attendance} />,
    tasks: <TasksScreen tasks={tasks} employees={employees} user={user} api={store.tasks} />,
    schedule: <ScheduleScreen employees={employees} shifts={shifts} user={user} api={store.shifts} />,
    reports: <ReportsScreen employees={employees} tasks={tasks} attendance={attendance} />,
    notifications: <NotificationsScreen notifications={notifications} api={store.notifications} />,
    settings: <SettingsScreen user={user} settings={settings} mode={mode} onSaveSettings={store.settings.save} onChangePassword={store.changePassword} onLogout={async () => { await store.logout(); setScreen("home"); }} onResetDemo={store.resetDemo} />,
  };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <TopBar screen={activeScreen} notifications={notifications} onNavigate={setScreen} />
      {error && (
        <div onClick={store.clearError} style={{ margin: "10px 16px 0", padding: "10px 14px", borderRadius: 10, background: S.dangerBg, color: S.danger, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          ⚠️ {T.errorPrefix} {error} <span style={{ opacity: 0.6, fontWeight: 400 }}>· {T.tapToDismiss}</span>
        </div>
      )}
      <div style={{ paddingBottom: 80 }}>{screens[activeScreen]}</div>
      <BottomNav active={activeScreen} onNavigate={setScreen} unreadCount={unreadCount} user={user} />
    </div>
  );
}
