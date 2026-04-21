import { useState } from "react";

// ─── MONGOLIAN TRANSLATIONS ───────────────────────────────────────────────────
const T = {
  appName: "Btech Store",
  appSubtitle: "Дотоод Үйл Ажиллагааны Платформ",
  signIn: "Нэвтрэх",
  username: "Хэрэглэгчийн нэр",
  password: "Нууц үг",
  enterUsername: "Хэрэглэгчийн нэр оруулна уу",
  enterPassword: "Нууц үг оруулна уу",
  invalidLogin: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна",
  demo: "Туршилт: director/1234 · manager/1234 · emp1/1234",
  Director: "Дээд Админ", Manager: "Менежер", Employee: "Ажилтан",
  home: "Нүүр", team: "Баг", clock: "Цаг", tasks: "Даалгавар",
  schedule: "Хуваарь", reports: "Тайлан", notifications: "Мэдэгдэл", settings: "Тохиргоо",
  goodMorning: "Өглөөний мэнд,",
  employees: "Ажилтнууд", active: "идэвхтэй",
  todayCheckIns: "Өнөөдрийн ирц", presentToday: "өнөөдөр ирсэн",
  pendingTasks: "Хүлээгдэж буй", needAttention: "анхаарал шаардлагатай",
  unread: "уншаагүй",
  quickActions: "Хурдан үйлдлүүд",
  clockInOut: "Цаг тэмдэглэх", myTasks: "Миний даалгавар",
  recentTasks: "Сүүлийн даалгавар", seeAll: "Бүгдийг харах",
  employeesTitle: "Ажилтнууд", add: "Нэмэх",
  newEmployee: "Шинэ ажилтан", fullName: "Бүтэн нэр",
  phone: "Утас", email: "И-мэйл", position: "Албан тушаал",
  dateOfJoining: "Ажилд орсон огноо",
  saveEmployee: "Хадгалах", cancel: "Цуцлах",
  searchEmployees: "Ажилтан хайх...",
  all: "Бүгд", activeFilter: "Идэвхтэй", inactive: "Идэвхгүй",
  activeLabel: "Идэвхтэй", inactiveLabel: "Идэвхгүй",
  deactivate: "Идэвхгүй болгох", activate: "Идэвхжүүлэх",
  joined: "Орсон огноо:", noEmployees: "Ажилтан олдсонгүй",
  editEmployee: "Засах", deleteEmployee: "Устгах",
  confirmDelete: "Энэ ажилтаныг устгах уу?",
  editTitle: "Ажилтан мэдээлэл засах",
  userManagement: "Хэрэглэгч удирдлага",
  changeRole: "Эрх солих",
  roleDirLabel: "Дээд Админ",
  roleManLabel: "Менежер",
  roleEmpLabel: "Ажилтан",
  attendanceTitle: "Ирц", todayAttendance: "Өнөөдрийн ирц",
  checkIn: "Ирсэн цаг", checkOut: "Явсан цаг", status: "Төлөв",
  clockInBtn: "ЦАГ ТЭМДЭГЛЭХ", clockOutBtn: "ЯВЛАА",
  clockedOutAt: "✓ Явсан цаг:", recordedSuccess: "✓ Амжилттай бүртгэгдлээ!",
  onTime: "Цагтаа", late: "Хоцорсон",
  noAttendance: "Өнөөдрийн ирцийн мэдээлэл байхгүй",
  in: "Ирсэн:", out: "Явсан:",
  scheduleTitle: "Цагийн хуваарь", addShift: "Ээлж нэмэх",
  newShift: "Шинэ ээлж", selectEmployee: "Ажилтан сонгох...",
  date: "Огноо", shiftType: "Ээлжийн төрөл",
  morning: "Өглөө", evening: "Орой", night: "Шөнө",
  save: "Хадгалах", noShifts: "Энэ өдөр ээлж байхгүй байна",
  tasksTitle: "Даалгаврууд", newTask: "Шинэ даалгавар",
  taskTitle: "Даалгаврын гарчиг", assignTo: "Хэнд хуваарилах",
  deadline: "Дуусах хугацаа", priority: "Ач холбогдол",
  high: "Өндөр", medium: "Дунд", low: "Бага",
  notes: "Тэмдэглэл", optionalNotes: "Нэмэлт тэмдэглэл...",
  createTask: "Даалгавар үүсгэх", noTasks: "Даалгавар олдсонгүй",
  backToTasks: "Буцах", assignedTo: "ХУВААРИЛСАН", updateStatus: "Төлөв шинэчлэх",
  completed: "Дууссан", inProgress: "Хийгдэж байна", pending: "Хүлээгдэж байна",
  select: "Сонгох...",
  reportsTitle: "Тайлан & Шинжилгээ",
  attendance: "Ирц",
  punctualityRate: "Цаг баримтлалт",
  lateArrivals: "Хоцрогдол",
  recentRecords: "Сүүлийн бүртгэлүүд",
  completionRate: "Гүйцэтгэлийн хувь",
  pendingInProgress: "Хүлээгдэж буй / Хийгдэж байна",
  taskList: "Даалгаврын жагсаалт",
  exportReport: "Тайлан экспортлох (PDF)",
  notificationsTitle: "Мэдэгдлүүд", markAllRead: "Бүгдийг уншсан болгох",
  settingsTitle: "Тохиргоо",
  workHours: "Ажлын цагийн тохиргоо",
  startTime: "Эхлэх цаг", endTime: "Дуусах цаг",
  overtimeThreshold: "Илүү цагийн босго (цаг)",
  storeInfo: "Дэлгүүрийн мэдээлэл", storeName: "Дэлгүүрийн нэр",
  securityData: "Аюулгүй байдал & Мэдээлэл",
  changePassword: "Нууц үг солих", backupData: "Мэдээлэл нөөцлөх",
  activityLogs: "Үйл ажиллагааны бүртгэл харах",
  saveSettings: "Тохиргоо хадгалах", settingsSaved: "✓ Тохиргоо хадгалагдлаа!",
  signOut: "Гарах",
  screenTitles: {
    home: "Хяналтын самбар", employees: "Ажилтнууд", attendance: "Ирц",
    tasks: "Даалгаврууд", schedule: "Цагийн хуваарь", reports: "Тайлан",
    notifications: "Мэдэгдлүүд", settings: "Тохиргоо",
  },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, username: "director", password: "1234", role: "Director", name: "Сараа Болд" },
  { id: 2, username: "manager", password: "1234", role: "Manager", name: "Өмөр Халид" },
  { id: 3, username: "emp1", password: "1234", role: "Employee", name: "Лина Хасан" },
  { id: 4, username: "emp2", password: "1234", role: "Employee", name: "Ахмед Насер" },
  { id: 5, username: "emp3", password: "1234", role: "Employee", name: "Нур Ибрагим" },
];

const MOCK_EMPLOYEES = [
  { id: 1, name: "Лина Хасан", phone: "+976-9911-2233", email: "lina@store.mn", position: "Кассчин", joined: "2023-03-15", active: true },
  { id: 2, name: "Ахмед Насер", phone: "+976-9922-3344", email: "ahmed@store.mn", position: "Агуулахын ажилтан", joined: "2022-11-01", active: true },
  { id: 3, name: "Нур Ибрагим", phone: "+976-9933-4455", email: "nour@store.mn", position: "Борлуулагч", joined: "2024-01-20", active: true },
  { id: 4, name: "Халид Сауд", phone: "+976-9944-5566", email: "khalid@store.mn", position: "Ахлагч", joined: "2021-06-10", active: false },
  { id: 5, name: "Реем Отайби", phone: "+976-9955-6677", email: "reem@store.mn", position: "Кассчин", joined: "2023-08-05", active: true },
];

const MOCK_ATTENDANCE = [
  { id: 1, empId: 1, date: "2026-04-21", checkIn: "08:02", checkOut: "17:05", status: "Цагтаа" },
  { id: 2, empId: 2, date: "2026-04-21", checkIn: "08:18", checkOut: "17:00", status: "Хоцорсон" },
  { id: 3, empId: 3, date: "2026-04-21", checkIn: "07:58", checkOut: null, status: "Цагтаа" },
  { id: 4, empId: 5, date: "2026-04-21", checkIn: "08:35", checkOut: "17:10", status: "Хоцорсон" },
  { id: 5, empId: 1, date: "2026-04-20", checkIn: "08:00", checkOut: "17:00", status: "Цагтаа" },
  { id: 6, empId: 2, date: "2026-04-20", checkIn: "08:05", checkOut: "17:00", status: "Цагтаа" },
];

const MOCK_TASKS = [
  { id: 1, title: "3-р гарцын тавиурыг дүүргэх", assignee: 2, deadline: "2026-04-22", status: "Хийгдэж байна", priority: "Өндөр", notes: "Ундааны хэсэгт анхаарлаа хандуулна уу" },
  { id: 2, title: "Сарын тооллого хийх", assignee: 1, deadline: "2026-04-25", status: "Хүлээгдэж байна", priority: "Өндөр", notes: "" },
  { id: 3, title: "Шинэ кассчинг сургах", assignee: 3, deadline: "2026-04-23", status: "Дууссан", priority: "Дунд", notes: "POS системийн сургалт" },
  { id: 4, title: "Агуулахыг цэвэрлэх", assignee: 5, deadline: "2026-04-21", status: "Хүлээгдэж байна", priority: "Бага", notes: "" },
  { id: 5, title: "Үнийн шошго шинэчлэх", assignee: 3, deadline: "2026-04-24", status: "Хийгдэж байна", priority: "Дунд", notes: "Шинэ урамшууллын бараанууд" },
];

const MOCK_SHIFTS = [
  { id: 1, empId: 1, date: "2026-04-21", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 2, empId: 2, date: "2026-04-21", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 3, empId: 3, date: "2026-04-21", shift: "Орой", start: "14:00", end: "22:00" },
  { id: 4, empId: 5, date: "2026-04-21", shift: "Орой", start: "14:00", end: "22:00" },
  { id: 5, empId: 1, date: "2026-04-22", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 6, empId: 2, date: "2026-04-22", shift: "Орой", start: "14:00", end: "22:00" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "shift", message: "Таны өглөөний ээлж 30 минутын дараа эхлэх гэж байна", time: "07:30", read: false },
  { id: 2, type: "task", message: "Шинэ даалгавар хуваарилагдлаа: Үнийн шошго шинэчлэх", time: "09:15", read: false },
  { id: 3, type: "schedule", message: "4-р сарын 23-ны цагийн хуваарь шинэчлэгдлээ", time: "Өчигдөр", read: true },
  { id: 4, type: "task", message: "'Шинэ кассчинг сургах' даалгавар дууссан гэж тэмдэглэгдлээ", time: "Өчигдөр", read: true },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    tasks: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    store: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  };
  return icons[name] || null;
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  bg: "#F4F6FA", bgCard: "#FFFFFF", bgInput: "#F0F2F7",
  accent: "#2563EB", success: "#059669", successBg: "rgba(5,150,105,0.10)",
  warning: "#D97706", warningBg: "rgba(217,119,6,0.10)",
  danger: "#DC2626", dangerBg: "rgba(220,38,38,0.08)",
  text: "#111827", textMuted: "#6B7280", textDim: "#4B5563",
  border: "rgba(0,0,0,0.09)",
  director: "#7C3AED", manager: "#2563EB", employee: "#059669",
};

const roleColor = (r) => r === "Director" ? S.director : r === "Manager" ? S.manager : S.employee;
const roleLabel = (r) => T[r] || r;
const statusColor = (s) => s === "Дууссан" ? S.success : s === "Хийгдэж байна" ? S.accent : s === "Хүлээгдэж байна" ? S.warning : S.textMuted;
const priorityColor = (p) => p === "Өндөр" ? S.danger : p === "Дунд" ? S.warning : S.textMuted;

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Badge = ({ label, color }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, color, background: color + "20", whiteSpace: "nowrap" }}>{label}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: S.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${S.border}`, ...style }}>{children}</div>
);

const Inp = ({ label, type = "text", value, onChange, placeholder, icon }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</div>}
    <div style={{ position: "relative" }}>
      {icon && <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}><Icon name={icon} size={16} /></div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: icon ? "11px 14px 11px 38px" : "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border}
      />
    </div>
  </div>
);

const Sel = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</div>}
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", appearance: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Btn = ({ children, onClick, variant = "primary", size = "md", icon, full, disabled }) => {
  const vs = { primary: { background: S.accent, color: "#fff", border: "none" }, secondary: { background: "rgba(255,255,255,0.06)", color: S.textDim, border: `1px solid ${S.border}` }, danger: { background: S.dangerBg, color: S.danger, border: `1px solid ${S.danger}30` }, ghost: { background: "transparent", color: S.textDim, border: "none" } };
  const ps = { sm: "7px 14px", md: "10px 20px", lg: "14px 28px" };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...vs[variant], padding: ps[size], borderRadius: 10, fontSize: size === "sm" ? 12 : 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6, width: full ? "100%" : "auto", justifyContent: "center", opacity: disabled ? 0.5 : 1, whiteSpace: "nowrap" }}
      onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
      onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
    >{icon && <Icon name={icon} size={14} />}{children}</button>
  );
};

const StatCard = ({ label, value, color, icon, sub }) => (
  <div style={{ background: S.bgCard, borderRadius: 14, padding: "14px 16px", border: `1px solid ${S.border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: S.textMuted, fontSize: 11, fontWeight: 600, marginBottom: 6 }}>{label}</div>
        <div style={{ color, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ color: S.textMuted, fontSize: 11, marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ background: color + "18", borderRadius: 10, padding: 8 }}><Icon name={icon} size={18} color={color} /></div>
    </div>
  </div>
);

const SecHead = ({ title, action, onAction, actionIcon }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
    <div style={{ color: S.text, fontSize: 16, fontWeight: 700 }}>{title}</div>
    {action && <Btn size="sm" variant="secondary" icon={actionIcon} onClick={onAction}>{action}</Btn>}
  </div>
);

const Avatar = ({ name, size = 36 }) => {
  const initials = name.split(" ").slice(0, 2).map(n => n[0]).join("");
  const hue = name.charCodeAt(0) * 5 % 360;
  return <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `hsl(${hue},60%,35%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, color: "#fff" }}>{initials}</div>;
};

const PBar = ({ value, color = S.accent }) => (
  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 5, overflow: "hidden" }}>
    <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4 }} />
  </div>
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin, users }) => {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [show, setShow] = useState(false);
  const login = () => { const user = (users || MOCK_USERS).find(x => x.username === u && x.password === p); user ? onLogin(user) : setErr(T.invalidLogin); };
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF 0%, #F4F6FA 50%, #E8F4FD 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAUABQADASIAAhEBAxEB/8QAHQABAAEEAwEAAAAAAAAAAAAAAAcDBggJAgQFAf/EAFUQAQABAgIDCQoMBQICBgsAAAACAwQFBgcSEwgVGCIyVFZzlBY1N0JSU1VykpMBFBcjMzQ2YnR1srMJOENjoiSCETEmUWSFpMIhJURGYYORlbTD0v/EABsBAQACAwEBAAAAAAAAAAAAAAACBQMEBgEH/8QAMREBAAEDAgQEBAcAAwEAAAAAAAIDBAUBEgYTFlIRIjI0FCNRYhUhMTNCU2NBQ2Fy/9oADAMBAAIRAxEAPwDFIBbIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAABx1XIQHHVNVyB646pquQDjqmq5AOOq5Am8AAAAAAcdU1XIQHHVcgTAAAAAABx1XIBx1TVchB646pquQeDwATAAAABx1XIQHHVcgTAAAABx1XIBx1TVchB6AJvAAHHVNVyEBx1TVcgeuOqarkA46pquQD4+gm8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z" alt="Btech Store" style={{ width: 130, height: 130, borderRadius: 22, objectFit: "contain", marginBottom: 20, background: "#F4F6FA", display: "block", margin: "0 auto 20px auto" }} />
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
        <Btn full size="lg" onClick={login}>{T.signIn}</Btn>
        <div style={{ color: S.textMuted, fontSize: 12, textAlign: "center", marginTop: 14 }}>{T.demo}</div>
      </Card>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ user, employees, tasks, attendance, notifications, onNavigate }) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayAtt = attendance.filter(a => a.date === today);
  const pendingTasks = tasks.filter(t => t.status !== "Дууссан").length;
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
        <StatCard label={T.todayCheckIns} value={todayAtt.length} color={S.success} icon="clock" sub={T.presentToday} />
        <StatCard label={T.pendingTasks} value={pendingTasks} color={S.warning} icon="tasks" sub={T.needAttention} />
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
        {tasks.slice(0, 3).map(task => {
          const assignee = employees.find(e => e.id === task.assignee);
          return (
            <Card key={task.id} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ color: S.text, fontSize: 13, fontWeight: 600, flex: 1, marginRight: 8 }}>{task.title}</div>
                <Badge label={task.status} color={statusColor(task.status)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: S.textMuted, fontSize: 11 }}>👤 {assignee?.name}</div>
                <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {task.deadline}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── EMPLOYEES ────────────────────────────────────────────────────────────────
const EmployeesScreen = ({ employees, setEmployees, user }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee" });

  const isAdmin = user.role === "Director";
  const canEdit = user.role === "Director" || user.role === "Manager";

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase())) &&
    (filter === "all" || (filter === "active" ? e.active : !e.active))
  );

  const openAdd = () => { setEditEmp(null); setForm({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee" }); setShowForm(true); };
  const openEdit = (emp) => { setEditEmp(emp); setForm({ name: emp.name, phone: emp.phone, email: emp.email, position: emp.position, joined: emp.joined, role: emp.role || "Employee" }); setShowForm(true); };

  const saveEmployee = () => {
    if (!form.name) return;
    if (editEmp) {
      setEmployees(prev => prev.map(e => e.id === editEmp.id ? { ...e, ...form } : e));
    } else {
      setEmployees(prev => [...prev, { ...form, id: Date.now(), active: true }]);
    }
    setForm({ name: "", phone: "", email: "", position: "", joined: "", role: "Employee" });
    setShowForm(false); setEditEmp(null);
  };

  const deleteEmployee = (id) => { setEmployees(prev => prev.filter(e => e.id !== id)); setConfirmDel(null); };
  const toggleActive = id => setEmployees(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  const changeRole = (id, role) => setEmployees(prev => prev.map(e => e.id === id ? { ...e, role } : e));

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
            <Sel label="Эрх / Үүрэг" value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))}
              options={[{ value: "Employee", label: "👤 Ажилтан" }, { value: "Manager", label: "👔 Менежер" }, { value: "Director", label: "★ Дээд Админ" }]} />
          )}
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
                </div>
                <div style={{ color: S.textMuted, fontSize: 12 }}>{emp.position}</div>
                <div style={{ color: S.textMuted, fontSize: 11, marginTop: 2 }}>{emp.email}</div>
              </div>
              <Badge label={emp.active ? T.activeLabel : T.inactiveLabel} color={emp.active ? S.success : S.textMuted} />
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
              <div style={{ color: S.textMuted, fontSize: 11 }}>📞 {emp.phone}</div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {T.joined} {emp.joined}</div>
            </div>

            {/* Admin action buttons */}
            {isAdmin && (
              <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 10 }}>
                <div style={{ color: S.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", marginBottom: 8 }}>ЭРХИЙН ТОХИРГОО</div>
                {/* Role changer */}
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {[{ r: "Employee", l: "👤 Ажилтан", c: S.employee }, { r: "Manager", l: "👔 Менежер", c: S.manager }, { r: "Director", l: "★ Дээд Админ", c: S.director }].map(opt => (
                    <button key={opt.r} onClick={() => changeRole(emp.id, opt.r)} style={{
                      padding: "4px 10px", borderRadius: 8, border: `1px solid ${(emp.role || "Employee") === opt.r ? opt.c : S.border}`,
                      cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit",
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
                  <button onClick={() => setConfirmDel(emp)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${S.danger}30`, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: S.dangerBg, color: S.danger }}>
                    🗑️
                  </button>
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

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────
const AttendanceScreen = ({ user, employees, attendance, setAttendance }) => {
  const now = new Date(); const today = now.toISOString().slice(0, 10); const currentTime = now.toTimeString().slice(0, 5);
  const [clocked, setClocked] = useState(false);
  const emp = employees.find(e => e.name === user.name);
  const myRecord = attendance.find(a => emp && a.empId === emp.id && a.date === today);
  const todayAtt = attendance.filter(a => a.date === today);
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
    </div>
  );
};

// ─── SCHEDULE ─────────────────────────────────────────────────────────────────
const ScheduleScreen = ({ employees, shifts, setShifts, user }) => {
  const todayObj = new Date();
  const today = todayObj.toISOString().slice(0, 10);

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

  const saveShift = () => {
    if (!form.empId) return;
    const data = { ...form, empId: parseInt(form.empId) };
    if (editShift) {
      setShifts(prev => prev.map(s => s.id === editShift.id ? { ...s, ...data } : s));
    } else {
      setShifts(prev => [...prev, { ...data, id: Date.now() }]);
    }
    setShowForm(false); setEditShift(null);
  };

  const deleteShift = (id) => { setShifts(prev => prev.filter(s => s.id !== id)); setConfirmDel(null); };

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
              const ds = d.toISOString().slice(0, 10);
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

// ─── TASKS ────────────────────────────────────────────────────────────────────
const TasksScreen = ({ tasks, setTasks, employees, user }) => {
  const [filter, setFilter] = useState("Бүгд"); const [showForm, setShowForm] = useState(false); const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ title: "", assignee: "", deadline: "", priority: "Дунд", notes: "" });
  const statuses = ["Бүгд", T.pending, T.inProgress, T.completed];
  const filtered = tasks.filter(t => filter === "Бүгд" || t.status === filter);
  const canCreate = user.role === "Director" || user.role === "Manager";
  const addTask = () => { if (!form.title) return; setTasks(prev => [...prev, { ...form, id: Date.now(), status: T.pending, assignee: parseInt(form.assignee) || 1 }]); setForm({ title: "", assignee: "", deadline: "", priority: "Дунд", notes: "" }); setShowForm(false); };
  const updateStatus = (id, status) => { setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t)); if (sel?.id === id) setSel(prev => ({ ...prev, status })); };

  if (sel) {
    const assignee = employees.find(e => e.id === sel.assignee);
    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: S.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, padding: "0 0 16px 0", fontFamily: "inherit" }}><Icon name="back" size={16} /> {T.backToTasks}</button>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ color: S.text, fontSize: 16, fontWeight: 700, flex: 1, marginRight: 8 }}>{sel.title}</div>
            <Badge label={sel.priority} color={priorityColor(sel.priority)} />
          </div>
          <div style={{ marginBottom: 14 }}><Badge label={sel.status} color={statusColor(sel.status)} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.assignedTo}</div><div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{assignee?.name}</div></div>
            <div><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.deadline.toUpperCase()}</div><div style={{ color: S.text, fontSize: 13, fontWeight: 600 }}>{sel.deadline}</div></div>
          </div>
          {sel.notes && <div style={{ background: S.bgInput, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}><div style={{ color: S.textMuted, fontSize: 11, marginBottom: 4 }}>{T.notes.toUpperCase()}</div><div style={{ color: S.textDim, fontSize: 13 }}>{sel.notes}</div></div>}
          <div style={{ color: S.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{T.updateStatus}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[T.pending, T.inProgress, T.completed].map(s => <Btn key={s} size="sm" variant={sel.status === s ? "primary" : "secondary"} onClick={() => updateStatus(sel.id, s)}>{s}</Btn>)}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{T.tasksTitle}</div>
        {canCreate && <Btn size="sm" icon="plus" onClick={() => setShowForm(!showForm)}>{T.newTask}</Btn>}
      </div>
      {showForm && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.newTask}</div>
          <Inp label={T.taskTitle} value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
          <Sel label={T.assignTo} value={form.assignee} onChange={v => setForm(f => ({ ...f, assignee: v }))} options={[{ value: "", label: T.select }, ...employees.filter(e => e.active).map(e => ({ value: e.id, label: e.name }))]} />
          <Inp label={T.deadline} type="date" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: v }))} />
          <Sel label={T.priority} value={form.priority} onChange={v => setForm(f => ({ ...f, priority: v }))} options={[{ value: "Өндөр", label: "🔴 " + T.high }, { value: "Дунд", label: "🟡 " + T.medium }, { value: "Бага", label: "⚪ " + T.low }]} />
          <Inp label={T.notes} value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder={T.optionalNotes} />
          <div style={{ display: "flex", gap: 8 }}><Btn full onClick={addTask}>{T.createTask}</Btn><Btn variant="secondary" onClick={() => setShowForm(false)}>{T.cancel}</Btn></div>
        </Card>
      )}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {statuses.map(s => <button key={s} onClick={() => setFilter(s)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: filter === s ? S.accent : S.bgCard, color: filter === s ? "#fff" : S.textMuted }}>{s} {s !== "Бүгд" && `(${tasks.filter(t => t.status === s).length})`}</button>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(task => { const assignee = employees.find(e => e.id === task.assignee); return (
          <Card key={task.id} style={{ padding: 14, cursor: "pointer" }} onClick={() => setSel(task)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ color: S.text, fontSize: 13, fontWeight: 600, flex: 1, marginRight: 8 }}>{task.title}</div>
              <Badge label={task.priority} color={priorityColor(task.priority)} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ color: S.textMuted, fontSize: 11 }}>👤 {assignee?.name}</div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>📅 {task.deadline}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge label={task.status} color={statusColor(task.status)} />
              {task.status === T.completed && <Icon name="check" size={16} color={S.success} />}
            </div>
          </Card>
        ); })}
        {filtered.length === 0 && <div style={{ color: S.textMuted, textAlign: "center", padding: "32px 0", fontSize: 13 }}>{T.noTasks}</div>}
      </div>
    </div>
  );
};

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
                <div style={{ flex: 1, marginRight: 8 }}><div style={{ color: S.text, fontSize: 12, fontWeight: 600 }}>{task.title}</div><div style={{ color: S.textMuted, fontSize: 11 }}>{assignee?.name}</div></div>
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

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
const NotificationsScreen = ({ notifications, setNotifications }) => {
  const tc = { shift: S.accent, task: S.success, schedule: S.warning };
  const ti = { shift: "clock", task: "tasks", schedule: "calendar" };
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: S.text, fontSize: 20, fontWeight: 700 }}>{T.notificationsTitle}</div>
        <Btn size="sm" variant="ghost" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>{T.markAllRead}</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map(n => (
          <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
            style={{ background: n.read ? S.bgCard : "rgba(79,142,247,0.08)", borderRadius: 14, padding: 14, border: `1px solid ${n.read ? S.border : "rgba(79,142,247,0.2)"}`, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ background: tc[n.type] + "20", borderRadius: 10, padding: 8, flexShrink: 0 }}><Icon name={ti[n.type]} size={16} color={tc[n.type]} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ color: S.text, fontSize: 13, fontWeight: n.read ? 400 : 600, marginBottom: 4 }}>{n.message}</div>
              <div style={{ color: S.textMuted, fontSize: 11 }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: S.accent, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
const SettingsScreen = ({ user, users, setUsers, setUser, onLogout }) => {
  const [wh, setWh] = useState({ start: "08:00", end: "17:00", overtime: 8 });
  const [storeName, setStoreName] = useState("Btech Store — Үндсэн салбар");
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("settings"); // "settings" | "users" | "mypass"
  // My password change
  const [myPw, setMyPw] = useState({ old: "", new1: "", new2: "", show: false, msg: "", err: "" });
  // Admin user management
  const [editUser, setEditUser] = useState(null);
  const [userForm, setUserForm] = useState({ username: "", password: "", name: "", role: "Employee" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [resetTarget, setResetTarget] = useState(null);
  const [resetPw, setResetPw] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const isAdmin = user.role === "Director";
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // Change own password
  const changeMyPw = () => {
    const me = users.find(u => u.id === user.id);
    if (!me || myPw.old !== me.password) { setMyPw(p => ({ ...p, err: "Хуучин нууц үг буруу байна", msg: "" })); return; }
    if (myPw.new1.length < 4) { setMyPw(p => ({ ...p, err: "Нууц үг хамгийн багадаа 4 тэмдэгт байна", msg: "" })); return; }
    if (myPw.new1 !== myPw.new2) { setMyPw(p => ({ ...p, err: "Шинэ нууц үг таарахгүй байна", msg: "" })); return; }
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, password: myPw.new1 } : u));
    setMyPw({ old: "", new1: "", new2: "", show: false, msg: "✓ Нууц үг амжилттай солигдлоо!", err: "" });
  };

  // Admin: add user
  const openAddUser = () => { setEditUser(null); setUserForm({ username: "", password: "1234", name: "", role: "Employee" }); setShowUserForm(true); setUserMsg(""); };
  const openEditUser = (u) => { setEditUser(u); setUserForm({ username: u.username, password: u.password, name: u.name, role: u.role }); setShowUserForm(true); setUserMsg(""); };
  const saveUser = () => {
    if (!userForm.username || !userForm.name) return;
    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...userForm } : u));
      if (editUser.id === user.id) setUser(prev => ({ ...prev, ...userForm }));
    } else {
      if (users.find(u => u.username === userForm.username)) { setUserMsg("Энэ нэвтрэх нэр аль хэдийн бүртгэлтэй!"); return; }
      setUsers(prev => [...prev, { ...userForm, id: Date.now() }]);
    }
    setShowUserForm(false); setEditUser(null);
    setUserMsg(editUser ? "✓ Хэрэглэгч шинэчлэгдлээ" : "✓ Хэрэглэгч нэмэгдлээ");
    setTimeout(() => setUserMsg(""), 2500);
  };
  const deleteUser = (uid) => {
    if (uid === user.id) { setUserMsg("Өөрийгөө устгах боломжгүй!"); return; }
    setUsers(prev => prev.filter(u => u.id !== uid));
  };
  // Admin: reset password
  const openReset = (u) => { setResetTarget(u); setResetPw(""); setResetMsg(""); };
  const doReset = () => {
    if (resetPw.length < 4) { setResetMsg("Хамгийн багадаа 4 тэмдэгт оруулна уу"); return; }
    setUsers(prev => prev.map(u => u.id === resetTarget.id ? { ...u, password: resetPw } : u));
    setResetMsg("✓ Нууц үг шинэчлэгдлээ!");
    setTimeout(() => { setResetTarget(null); setResetMsg(""); }, 1500);
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
        {[{ k: "settings", l: "⚙️ Ерөнхий" }, { k: "mypass", l: "🔑 Нууц үг" }, ...(isAdmin ? [{ k: "users", l: "👥 Хэрэглэгчид" }] : [])].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: tab === t.k ? S.accent : S.bgCard, color: tab === t.k ? "#fff" : S.textMuted }}>{t.l}</button>
        ))}
      </div>

      {/* ── GENERAL SETTINGS ── */}
      {tab === "settings" && (
        <div>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.workHours}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Inp label={T.startTime} type="time" value={wh.start} onChange={v => setWh(h => ({ ...h, start: v }))} />
              <Inp label={T.endTime} type="time" value={wh.end} onChange={v => setWh(h => ({ ...h, end: v }))} />
            </div>
            <Inp label={T.overtimeThreshold} value={wh.overtime} onChange={v => setWh(h => ({ ...h, overtime: v }))} />
          </Card>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{T.storeInfo}</div>
            <Inp label={T.storeName} value={storeName} onChange={setStoreName} />
          </Card>
          {saved && <div style={{ color: S.success, textAlign: "center", fontSize: 13, fontWeight: 600, padding: 8, background: S.successBg, borderRadius: 10, marginBottom: 10 }}>{T.settingsSaved}</div>}
          <Btn full onClick={save} style={{ marginBottom: 10 }}>{T.saveSettings}</Btn>
          <Btn full variant="danger" icon="logout" onClick={onLogout}>{T.signOut}</Btn>
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

      {/* ── USER MANAGEMENT (Admin only) ── */}
      {tab === "users" && isAdmin && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ color: S.director, fontSize: 12, fontWeight: 600 }}>★ Нийт {users.length} хэрэглэгч</div>
            <Btn size="sm" icon="plus" onClick={openAddUser}>Нэмэх</Btn>
          </div>

          {userMsg && <div style={{ color: userMsg.startsWith("✓") ? S.success : S.danger, fontSize: 12, marginBottom: 12, padding: "8px 12px", background: userMsg.startsWith("✓") ? S.successBg : S.dangerBg, borderRadius: 8 }}>{userMsg}</div>}

          {/* Add/Edit user form */}
          {showUserForm && (
            <Card style={{ marginBottom: 14, border: `1px solid ${editUser ? S.warning + "50" : S.accent + "50"}` }}>
              <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 14 }}>{editUser ? "✏️ Хэрэглэгч засах" : "➕ Шинэ хэрэглэгч нэмэх"}</div>
              <Inp label="Нэвтрэх нэр (username)" value={userForm.username} onChange={v => setUserForm(f => ({ ...f, username: v }))} placeholder="жишээ: user1" />
              <Inp label="Бүтэн нэр" value={userForm.name} onChange={v => setUserForm(f => ({ ...f, name: v }))} placeholder="Овог нэр" />
              {!editUser && <Inp label="Нууц үг" value={userForm.password} onChange={v => setUserForm(f => ({ ...f, password: v }))} placeholder="Анхны нууц үг" />}
              <Sel label="Эрх / Үүрэг" value={userForm.role} onChange={v => setUserForm(f => ({ ...f, role: v }))}
                options={[{ value: "Employee", label: "👤 Ажилтан" }, { value: "Manager", label: "👔 Менежер" }, { value: "Director", label: "★ Дээд Админ" }]} />
              <div style={{ display: "flex", gap: 8 }}>
                <Btn full onClick={saveUser}>{editUser ? "Хадгалах" : "Нэмэх"}</Btn>
                <Btn variant="secondary" onClick={() => { setShowUserForm(false); setEditUser(null); }}>{T.cancel}</Btn>
              </div>
            </Card>
          )}

          {/* Reset password modal */}
          {resetTarget && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <Card style={{ maxWidth: 320, width: "100%" }}>
                <div style={{ color: S.text, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🔑 Нууц үг шинэчлэх</div>
                <div style={{ color: S.textMuted, fontSize: 12, marginBottom: 14 }}>{resetTarget.name} (@{resetTarget.username})</div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ color: S.textDim, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Шинэ нууц үг</div>
                  <input type="text" value={resetPw} onChange={e => { setResetPw(e.target.value); setResetMsg(""); }}
                    placeholder="Хамгийн багадаа 4 тэмдэгт"
                    style={{ width: "100%", background: S.bgInput, border: `1px solid ${S.border}`, borderRadius: 10, padding: "11px 14px", color: S.text, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                    onFocus={e => e.target.style.borderColor = S.accent} onBlur={e => e.target.style.borderColor = S.border} />
                </div>
                {resetMsg && <div style={{ color: resetMsg.startsWith("✓") ? S.success : S.danger, fontSize: 12, marginBottom: 10, padding: "8px 12px", background: resetMsg.startsWith("✓") ? S.successBg : S.dangerBg, borderRadius: 8 }}>{resetMsg}</div>}
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn full onClick={doReset}>Шинэчлэх</Btn>
                  <Btn full variant="secondary" onClick={() => setResetTarget(null)}>{T.cancel}</Btn>
                </div>
              </Card>
            </div>
          )}

          {/* User list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {users.map(u => (
              <Card key={u.id} style={{ padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Avatar name={u.name} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ color: S.text, fontSize: 13, fontWeight: 700 }}>{u.name}</div>
                      {u.id === user.id && <Badge label="Та" color={S.accent} />}
                    </div>
                    <div style={{ color: S.textMuted, fontSize: 11 }}>@{u.username}</div>
                    <Badge label={roleLabel(u.role)} color={roleColor(u.role)} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openEditUser(u)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${S.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: S.accent }}>✏️ Засах</button>
                  <button onClick={() => openReset(u)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${S.warning}30`, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: S.warningBg, color: S.warning }}>🔑 Нууц үг</button>
                  {u.id !== user.id && (
                    <button onClick={() => deleteUser(u.id)} style={{ padding: "7px 12px", borderRadius: 8, border: `1px solid ${S.danger}30`, cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit", background: S.dangerBg, color: S.danger }}>🗑️</button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNavigate, unreadCount }) => {
  const tabs = [{ id: "home", icon: "home", label: T.home }, { id: "employees", icon: "users", label: T.team }, { id: "attendance", icon: "clock", label: T.clock }, { id: "tasks", icon: "tasks", label: T.tasks }, { id: "schedule", icon: "calendar", label: T.schedule }];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", borderTop: `1px solid ${S.border}`, boxShadow: "0 -4px 16px rgba(0,0,0,0.07)", padding: "8px 4px 12px", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onNavigate(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 8px", borderRadius: 12, fontFamily: "inherit" }}>
          <div style={{ color: active === tab.id ? S.accent : S.textMuted, position: "relative" }}>
            <Icon name={tab.icon} size={22} color={active === tab.id ? S.accent : S.textMuted} />
            {tab.id === "home" && unreadCount > 0 && <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: S.danger }} />}
          </div>
          <div style={{ color: active === tab.id ? S.accent : S.textMuted, fontSize: 9, fontWeight: active === tab.id ? 700 : 400 }}>{tab.label}</div>
        </button>
      ))}
    </div>
  );
};

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar = ({ screen, notifications, onNavigate }) => {
  const unread = notifications.filter(n => !n.read).length;
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${S.border}`, boxShadow: "0 1px 8px rgba(0,0,0,0.07)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAUABQADASIAAhEBAxEB/8QAHQABAAEEAwEAAAAAAAAAAAAAAAcDBggJAgQFAf/EAFUQAQABAgIDCQoMBQICBgsAAAACAwQFBgcSEwgVGCIyVFZzlBY1N0JSU1VykpMBFBcjMzQ2YnR1srMJOENjoiSCETEmUWSFpMIhJURGYYORlbTD0v/EABsBAQACAwEBAAAAAAAAAAAAAAACBQMEBgEH/8QAMREBAAEDAgQEBAcAAwEAAAAAAAIDBAUBEgYTFlIRIjI0FCNRYhUhMTNCU2NBQ2Fy/9oADAMBAAIRAxEAPwDFIBbIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAABx1XIQHHVNVyB646pquQDjqmq5AOOq5Am8AAAAAAcdU1XIQHHVcgTAAAAAABx1XIBx1TVchB646pquQeDwATAAAABx1XIQHHVcgTAAAABx1XIBx1TVchB6AJvAAHHVNVyEBx1TVcgeuOqarkA46pquQD4+gm8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z" alt="Btech Store" style={{ width: 28, height: 28, borderRadius: 8, objectFit: "contain", background: "#0D0F1A" }} />
        <div style={{ color: S.text, fontSize: 16, fontWeight: 700 }}>{T.screenTitles[screen] || T.appName}</div>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <button onClick={() => onNavigate("notifications")} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, position: "relative" }}>
          <Icon name="bell" size={20} color={screen === "notifications" ? S.accent : S.textMuted} />
          {unread > 0 && <div style={{ position: "absolute", top: 3, right: 3, width: 8, height: 8, borderRadius: "50%", background: S.danger }} />}
        </button>
        <button onClick={() => onNavigate("settings")} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          <Icon name="settings" size={20} color={screen === "settings" ? S.accent : S.textMuted} />
        </button>
      </div>
    </div>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null); const [screen, setScreen] = useState("home");
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [users, setUsers] = useState(MOCK_USERS);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);
  const [shifts, setShifts] = useState(MOCK_SHIFTS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogin = (u) => { setUser(u); };

  if (!user) return <LoginScreen onLogin={handleLogin} users={users} />;

  const screens = {
    home: <Dashboard user={user} employees={employees} tasks={tasks} attendance={attendance} notifications={notifications} onNavigate={setScreen} />,
    employees: <EmployeesScreen employees={employees} setEmployees={setEmployees} user={user} />,
    attendance: <AttendanceScreen user={user} employees={employees} attendance={attendance} setAttendance={setAttendance} />,
    tasks: <TasksScreen tasks={tasks} setTasks={setTasks} employees={employees} user={user} />,
    schedule: <ScheduleScreen employees={employees} shifts={shifts} setShifts={setShifts} user={user} />,
    reports: <ReportsScreen employees={employees} tasks={tasks} attendance={attendance} />,
    notifications: <NotificationsScreen notifications={notifications} setNotifications={setNotifications} />,
    settings: <SettingsScreen user={user} users={users} setUsers={setUsers} setUser={setUser} onLogout={() => { setUser(null); setScreen("home"); }} />,
  };

  return (
    <div style={{ background: S.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <TopBar screen={screen} notifications={notifications} onNavigate={setScreen} />
      <div style={{ paddingBottom: 80 }}>{screens[screen]}</div>
      <BottomNav active={screen} onNavigate={setScreen} unreadCount={unreadCount} />
    </div>
  );
}
