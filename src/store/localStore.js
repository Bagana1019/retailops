// Demo backend: everything lives in this browser's localStorage. Used when no
// Supabase credentials are configured. Mirrors the interface of supabaseStore.js.
import { makeEmitter } from "./emitter";
import { MOCK_EMPLOYEES, MOCK_ATTENDANCE, MOCK_TASKS, MOCK_SHIFTS, MOCK_NOTIFICATIONS, DEFAULT_SETTINGS } from "../data/mock";
import { T } from "../i18n";

// Bump the version whenever the stored data shape changes so stale data is ignored.
const PREFIX = "btech:v4:";
const load = (key, fallback) => {
  try { const raw = localStorage.getItem(PREFIX + key); return raw === null ? fallback : JSON.parse(raw); }
  catch { return fallback; }
};
const save = (key, value) => { try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* storage unavailable: memory only */ } };
const PERSISTED = ["employees", "tasks", "attendance", "shifts", "notifications", "settings", "sessionId"];

export function createLocalStore() {
  const em = makeEmitter({
    mode: "local", ready: true, error: null, user: null,
    employees: load("employees", MOCK_EMPLOYEES),
    tasks: load("tasks", MOCK_TASKS),
    attendance: load("attendance", MOCK_ATTENDANCE),
    shifts: load("shifts", MOCK_SHIFTS),
    notifications: load("notifications", MOCK_NOTIFICATIONS),
    settings: load("settings", DEFAULT_SETTINGS),
    sessionId: load("sessionId", null),
  });

  // Every write goes through here: derive the signed-in user and persist.
  const update = (patch) => {
    em.set((s) => {
      const n = { ...s, ...(typeof patch === "function" ? patch(s) : patch) };
      n.user = n.employees.find((e) => e.id === n.sessionId && e.active) || null;
      return n;
    });
    const s = em.get();
    PERSISTED.forEach((k) => save(k, s[k]));
  };
  update({}); // derive user from the stored session on startup

  const mapWhere = (list, id, fn) => list.map((x) => (x.id === id ? fn(x) : x));
  const ok = Promise.resolve({});

  return {
    getState: em.get, subscribe: em.subscribe,
    clearError: () => em.set({ error: null }),

    async login(identifier, password) {
      const s = em.get();
      const emp = s.employees.find((x) => x.username && x.username === identifier.trim() && x.password === password);
      if (!emp) return { error: T.invalidLogin };
      if (!emp.active) return { error: T.inactiveLogin };
      update({ sessionId: emp.id });
      return {};
    },
    async logout() { update({ sessionId: null }); },
    async changePassword(oldPw, newPw) {
      const s = em.get();
      if (!s.user || s.user.password !== oldPw) return { error: "Хуучин нууц үг буруу байна" };
      update({ employees: mapWhere(s.employees, s.user.id, (e) => ({ ...e, password: newPw })) });
      return {};
    },

    employees: {
      async create(data) {
        const s = em.get();
        if (data.username && s.employees.some((e) => e.username === data.username)) return { error: T.usernameTaken };
        update({ employees: [...s.employees, { ...data, id: Date.now(), active: true }] });
        return {};
      },
      async update(id, patch) {
        const s = em.get();
        if (patch.username && s.employees.some((e) => e.username === patch.username && e.id !== id)) return { error: T.usernameTaken };
        const clean = { ...patch }; if (!clean.password) delete clean.password;
        update({ employees: mapWhere(s.employees, id, (e) => ({ ...e, ...clean })) });
        return {};
      },
      async remove(id) {
        update((s) => ({
          employees: s.employees.filter((e) => e.id !== id),
          shifts: s.shifts.filter((x) => x.empId !== id),
          attendance: s.attendance.filter((a) => a.empId !== id),
          tasks: s.tasks.map((t) => (t.assignee === id ? { ...t, assignee: null } : t)),
        }));
        return {};
      },
      async resetPassword(id, password) { update((s) => ({ employees: mapWhere(s.employees, id, (e) => ({ ...e, password })) })); return {}; },
    },

    attendance: {
      async checkIn(rec) { update((s) => ({ attendance: [...s.attendance, { ...rec, id: Date.now(), checkOut: null }] })); return {}; },
      async checkOut(id, time) { update((s) => ({ attendance: mapWhere(s.attendance, id, (a) => ({ ...a, checkOut: time })) })); return {}; },
    },

    tasks: {
      async create(data) { update((s) => ({ tasks: [...s.tasks, { ...data, id: Date.now(), status: T.pending }] })); return {}; },
      async updateStatus(id, status) { update((s) => ({ tasks: mapWhere(s.tasks, id, (t) => ({ ...t, status })) })); return {}; },
    },

    shifts: {
      async create(data) { update((s) => ({ shifts: [...s.shifts, { ...data, id: Date.now() }] })); return {}; },
      async update(id, patch) { update((s) => ({ shifts: mapWhere(s.shifts, id, (x) => ({ ...x, ...patch })) })); return {}; },
      async remove(id) { update((s) => ({ shifts: s.shifts.filter((x) => x.id !== id) })); return {}; },
    },

    notifications: {
      async markRead(id) { update((s) => ({ notifications: mapWhere(s.notifications, id, (n) => ({ ...n, read: true })) })); return {}; },
      async markAllRead() { update((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })); return {}; },
    },

    settings: { async save(settings) { update({ settings }); return {}; } },

    // Demo only: wipe this browser's data and reload with the seed data.
    resetDemo() {
      try { Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k)); } catch { /* ignore */ }
      window.location.reload();
      return ok;
    },
  };
}
