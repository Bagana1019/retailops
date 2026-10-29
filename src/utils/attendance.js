// Attendance rules derived from settings (work start + late grace), shared by the
// clock-in screen and the reports.
const toMin = (hhmm) => { const [h, m] = String(hhmm || "00:00").split(":").map(Number); return h * 60 + (m || 0); };

// "Цагтаа" when check-in is at or before workStart + lateGraceMin, otherwise "Хоцорсон".
export const lateStatus = (checkIn, settings) =>
  toMin(checkIn) <= toMin(settings?.workStart || "08:00") + (Number(settings?.lateGraceMin ?? 10) || 0) ? "Цагтаа" : "Хоцорсон";

// Worked hours for a record (0 when not checked out). Handles an overnight shift.
export const workedHours = (rec) => {
  if (!rec?.checkIn || !rec?.checkOut) return 0;
  let mins = toMin(rec.checkOut) - toMin(rec.checkIn);
  if (mins < 0) mins += 24 * 60;
  return Math.round((mins / 60) * 100) / 100;
};

// Per-employee monthly summary used by the attendance report and its exports.
export const summarizeAttendance = (records, employees) =>
  employees.map((e) => {
    const mine = records.filter((r) => r.empId === e.id);
    const late = mine.filter((r) => r.status === "Хоцорсон").length;
    const hours = mine.reduce((s, r) => s + workedHours(r), 0);
    return { empId: e.id, name: e.name, position: e.position, days: mine.length, onTime: mine.length - late, late, hours: Math.round(hours * 10) / 10 };
  }).filter((row) => row.days > 0).sort((a, b) => b.days - a.days || a.name.localeCompare(b.name));
