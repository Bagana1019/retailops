// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Employees and login accounts are ONE list: an employee with a username can sign in with the given role.
export const MOCK_EMPLOYEES = [
  { id: 6, name: "Сараа Болд", phone: "+976-9900-1122", email: "saraa@store.mn", position: "Захирал", joined: "2020-01-15", active: true, username: "director", password: "123456", role: "Director" },
  { id: 7, name: "Өмөр Халид", phone: "+976-9900-2233", email: "omar@store.mn", position: "Дэлгүүрийн менежер", joined: "2021-02-01", active: true, username: "manager", password: "123456", role: "Manager" },
  { id: 1, name: "Лина Хасан", phone: "+976-9911-2233", email: "lina@store.mn", position: "Кассчин", joined: "2023-03-15", active: true, username: "emp1", password: "123456", role: "Employee" },
  { id: 2, name: "Ахмед Насер", phone: "+976-9922-3344", email: "ahmed@store.mn", position: "Агуулахын ажилтан", joined: "2022-11-01", active: true, username: "emp2", password: "123456", role: "Employee" },
  { id: 3, name: "Нур Ибрагим", phone: "+976-9933-4455", email: "nour@store.mn", position: "Борлуулагч", joined: "2024-01-20", active: true, username: "emp3", password: "123456", role: "Employee" },
  { id: 4, name: "Халид Сауд", phone: "+976-9944-5566", email: "khalid@store.mn", position: "Ахлагч", joined: "2021-06-10", active: false, username: "", password: "", role: "Employee" },
  { id: 5, name: "Реем Отайби", phone: "+976-9955-6677", email: "reem@store.mn", position: "Кассчин", joined: "2023-08-05", active: true, username: "", password: "", role: "Employee" },
];

export const DEFAULT_SETTINGS = { workStart: "08:00", workEnd: "17:00", overtime: 8, storeName: "Btech Store — Үндсэн салбар", lateGraceMin: 10, storeLat: null, storeLng: null, geoRadiusM: 150 };

export const MOCK_ATTENDANCE = [
  { id: 1, empId: 1, date: "2026-04-21", checkIn: "08:02", checkOut: "17:05", status: "Цагтаа" },
  { id: 2, empId: 2, date: "2026-04-21", checkIn: "08:18", checkOut: "17:00", status: "Хоцорсон" },
  { id: 3, empId: 3, date: "2026-04-21", checkIn: "07:58", checkOut: null, status: "Цагтаа" },
  { id: 4, empId: 5, date: "2026-04-21", checkIn: "08:35", checkOut: "17:10", status: "Хоцорсон" },
  { id: 5, empId: 1, date: "2026-04-20", checkIn: "08:00", checkOut: "17:00", status: "Цагтаа" },
  { id: 6, empId: 2, date: "2026-04-20", checkIn: "08:05", checkOut: "17:00", status: "Цагтаа" },
];

export const MOCK_TASKS = [
  { id: 1, title: "3-р гарцын тавиурыг дүүргэх", assignee: 2, deadline: "2026-04-22", status: "Хийгдэж байна", priority: "Өндөр", notes: "Ундааны хэсэгт анхаарлаа хандуулна уу" },
  { id: 2, title: "Сарын тооллого хийх", assignee: 1, deadline: "2026-04-25", status: "Хүлээгдэж байна", priority: "Өндөр", notes: "" },
  { id: 3, title: "Шинэ кассчинг сургах", assignee: 3, deadline: "2026-04-23", status: "Дууссан", priority: "Дунд", notes: "POS системийн сургалт" },
  { id: 4, title: "Агуулахыг цэвэрлэх", assignee: 5, deadline: "2026-04-21", status: "Хүлээгдэж байна", priority: "Бага", notes: "" },
  { id: 5, title: "Үнийн шошго шинэчлэх", assignee: 3, deadline: "2026-04-24", status: "Хийгдэж байна", priority: "Дунд", notes: "Шинэ урамшууллын бараанууд" },
];

export const MOCK_SHIFTS = [
  { id: 1, empId: 1, date: "2026-04-21", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 2, empId: 2, date: "2026-04-21", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 3, empId: 3, date: "2026-04-21", shift: "Орой", start: "14:00", end: "22:00" },
  { id: 4, empId: 5, date: "2026-04-21", shift: "Орой", start: "14:00", end: "22:00" },
  { id: 5, empId: 1, date: "2026-04-22", shift: "Өглөө", start: "08:00", end: "16:00" },
  { id: 6, empId: 2, date: "2026-04-22", shift: "Орой", start: "14:00", end: "22:00" },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: "shift", message: "Таны өглөөний ээлж 30 минутын дараа эхлэх гэж байна", time: "07:30", read: false },
  { id: 2, type: "task", message: "Шинэ даалгавар хуваарилагдлаа: Үнийн шошго шинэчлэх", time: "09:15", read: false },
  { id: 3, type: "schedule", message: "4-р сарын 23-ны цагийн хуваарь шинэчлэгдлээ", time: "Өчигдөр", read: true },
  { id: 4, type: "task", message: "'Шинэ кассчинг сургах' даалгавар дууссан гэж тэмдэглэгдлээ", time: "Өчигдөр", read: true },
];
