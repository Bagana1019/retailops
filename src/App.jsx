import { useState } from "react";
import BottomNav from "./components/BottomNav";
import TopBar from "./components/TopBar";
import { DEFAULT_SETTINGS, MOCK_ATTENDANCE, MOCK_EMPLOYEES, MOCK_NOTIFICATIONS, MOCK_SHIFTS, MOCK_TASKS } from "./data/mock";
import { clearStoredData, usePersistedState } from "./hooks/usePersistedState";
import AttendanceScreen from "./screens/AttendanceScreen";
import Dashboard from "./screens/Dashboard";
import EmployeesScreen from "./screens/EmployeesScreen";
import LoginScreen from "./screens/LoginScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ReportsScreen from "./screens/ReportsScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TasksScreen from "./screens/TasksScreen";
import { S } from "./theme";

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [employees, setEmployees] = usePersistedState("employees", MOCK_EMPLOYEES);
  const [tasks, setTasks] = usePersistedState("tasks", MOCK_TASKS);
  const [attendance, setAttendance] = usePersistedState("attendance", MOCK_ATTENDANCE);
  const [shifts, setShifts] = usePersistedState("shifts", MOCK_SHIFTS);
  const [notifications, setNotifications] = usePersistedState("notifications", MOCK_NOTIFICATIONS);
  const [settings, setSettings] = usePersistedState("settings", DEFAULT_SETTINGS);
  const [currentUserId, setCurrentUserId] = usePersistedState("session", null);
  // The signed-in user is always read from the employee list, so role/name edits apply immediately
  // and a deleted or deactivated employee is signed out automatically.
  const user = employees.find(e => e.id === currentUserId && e.active) || null;
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => { setCurrentUserId(null); setScreen("home"); };
  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setShifts(prev => prev.filter(s => s.empId !== id));
    setAttendance(prev => prev.filter(a => a.empId !== id));
    setTasks(prev => prev.map(t => t.assignee === id ? { ...t, assignee: null } : t));
  };
  const resetDemo = () => { clearStoredData(); window.location.reload(); };

  if (!user) return <LoginScreen onLogin={e => setCurrentUserId(e.id)} employees={employees} />;

  // Employees have no Reports tab; never render it for them even if `screen` still says so (e.g. after a role change).
  const canSeeReports = user.role === "Director" || user.role === "Manager";
  const activeScreen = screen === "reports" && !canSeeReports ? "home" : screen;

  const screens = {
    home: <Dashboard user={user} employees={employees} tasks={tasks} attendance={attendance} notifications={notifications} onNavigate={setScreen} />,
    employees: <EmployeesScreen employees={employees} setEmployees={setEmployees} user={user} onDelete={deleteEmployee} />,
    attendance: <AttendanceScreen user={user} employees={employees} attendance={attendance} setAttendance={setAttendance} />,
    tasks: <TasksScreen tasks={tasks} setTasks={setTasks} employees={employees} user={user} />,
    schedule: <ScheduleScreen employees={employees} shifts={shifts} setShifts={setShifts} user={user} />,
    reports: <ReportsScreen employees={employees} tasks={tasks} attendance={attendance} />,
    notifications: <NotificationsScreen notifications={notifications} setNotifications={setNotifications} />,
    settings: <SettingsScreen user={user} employees={employees} setEmployees={setEmployees} settings={settings} setSettings={setSettings} onLogout={handleLogout} onResetDemo={resetDemo} />,
  };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <TopBar screen={activeScreen} notifications={notifications} onNavigate={setScreen} />
      <div style={{ paddingBottom: 80 }}>{screens[activeScreen]}</div>
      <BottomNav active={activeScreen} onNavigate={setScreen} unreadCount={unreadCount} user={user} />
    </div>
  );
}
