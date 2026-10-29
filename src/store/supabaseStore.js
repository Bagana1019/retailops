// Real backend: Supabase Auth + Postgres with row-level security (see supabase/migrations).
// Reads load whole tables (the data set is small) and realtime keeps every device in sync.
import { makeEmitter } from "./emitter";
import { DEFAULT_SETTINGS } from "../data/mock";
import { T } from "../i18n";
import { usernameToEmail } from "../lib/supabase";

// ── row <-> app shape mapping ────────────────────────────────────────────────
const hm = (t) => (t ? String(t).slice(0, 5) : null); // "08:00:00" -> "08:00"
const fromProfile = (r) => ({ id: r.id, username: r.username, name: r.name, phone: r.phone ?? "", email: r.email ?? "", position: r.position ?? "", joined: r.joined ?? "", active: r.active, role: r.role });
const toProfile = (p) => {
  const row = {};
  if ("name" in p) row.name = p.name;
  if ("phone" in p) row.phone = p.phone;
  if ("email" in p) row.email = p.email;
  if ("position" in p) row.position = p.position;
  if ("joined" in p) row.joined = p.joined || null;
  if ("active" in p) row.active = p.active;
  if ("role" in p) row.role = p.role;
  if ("username" in p && p.username) row.username = p.username;
  return row;
};
const fromAttendance = (r) => ({ id: r.id, empId: r.emp_id, date: r.date, checkIn: hm(r.check_in), checkOut: hm(r.check_out), status: r.status, distanceM: r.distance_m ?? null, locationOk: r.location_ok ?? null });
const fromTask = (r) => ({ id: r.id, title: r.title, assignee: r.assignee, deadline: r.deadline ?? "", status: r.status, priority: r.priority, notes: r.notes ?? "" });
const fromShift = (r) => ({ id: r.id, empId: r.emp_id, date: r.date, shift: r.shift, start: hm(r.start_time), end: hm(r.end_time), note: r.note ?? "" });
const fromNotification = (r) => {
  const d = new Date(r.created_at);
  const sameDay = d.toDateString() === new Date().toDateString();
  return { id: r.id, type: r.type, message: r.message, read: r.read, time: sameDay ? d.toTimeString().slice(0, 5) : d.toLocaleDateString("mn-MN") };
};
const fromSettings = (r) => ({ workStart: hm(r.work_start), workEnd: hm(r.work_end), overtime: r.overtime, storeName: r.store_name, lateGraceMin: r.late_grace_min ?? 10, storeLat: r.store_lat ?? null, storeLng: r.store_lng ?? null, geoRadiusM: r.geo_radius_m ?? 150 });

const TABLES = {
  profiles: { key: "employees", map: fromProfile, order: "name" },
  colleagues: { key: "employees", map: fromProfile, order: "name" },
  attendance: { key: "attendance", map: fromAttendance, order: "date", desc: true },
  tasks: { key: "tasks", map: fromTask, order: "created_at" },
  shifts: { key: "shifts", map: fromShift, order: "date" },
  notifications: { key: "notifications", map: fromNotification, order: "created_at", desc: true },
};

export function createSupabaseStore(client) {
  const em = makeEmitter({
    mode: "supabase", ready: false, error: null, user: null,
    employees: [], tasks: [], attendance: [], shifts: [], notifications: [], settings: DEFAULT_SETTINGS,
  });
  const fail = (error) => { const msg = error?.message || String(error); em.set({ error: msg }); return { error: msg }; };
  const isManager = () => ["Director", "Manager"].includes(em.get().user?.role);
  let channel = null;

  async function loadTable(name) {
    // Employees see the colleague directory (no phone/e-mail); managers see full profiles.
    if (name === "profiles" || name === "colleagues") name = isManager() ? "profiles" : "colleagues";
    const t = TABLES[name];
    const { data, error } = await client.from(name).select("*").order(t.order, { ascending: !t.desc });
    if (error) return fail(error);
    em.set({ [t.key]: data.map(t.map) });
    return {};
  }
  async function loadSettings() {
    const { data, error } = await client.from("settings").select("*").eq("id", 1).maybeSingle();
    if (error) return fail(error);
    if (data) em.set({ settings: fromSettings(data) });
    return {};
  }
  async function loadAll() {
    await Promise.all([loadTable("profiles"), loadTable("attendance"), loadTable("tasks"), loadTable("shifts"), loadTable("notifications"), loadSettings()]);
  }
  async function loadProfile(userId) {
    const { data, error } = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (error) { fail(error); return null; }
    return data ? fromProfile(data) : null;
  }

  function listen() {
    if (channel) return;
    channel = client.channel("app-changes")
      .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
        if (payload.table === "settings") loadSettings();
        else if (TABLES[payload.table]) loadTable(payload.table);
        // Our own profile may have changed (role / active): refresh the signed-in user too.
        if (payload.table === "profiles" && payload.new?.id === em.get().user?.id) refreshUser();
      })
      .subscribe();
  }
  function unlisten() { if (channel) { client.removeChannel(channel); channel = null; } }

  async function refreshUser() {
    const u = em.get().user; if (!u) return;
    const p = await loadProfile(u.id);
    if (!p || !p.active) return signOutLocally();
    em.set({ user: p });
  }
  let booting = false; // login() and the SIGNED_IN auth event can both arrive for one sign-in
  async function signedIn(session) {
    if (booting) return;
    booting = true;
    try {
      const p = await loadProfile(session.user.id);
      if (!p || !p.active) { await client.auth.signOut(); em.set({ user: null, ready: true, error: p ? T.inactiveLogin : null }); return; }
      em.set({ user: p, error: null });
      await loadAll();
      listen();
      em.set({ ready: true });
    } finally { booting = false; }
  }
  function signOutLocally() {
    unlisten();
    em.set({ user: null, employees: [], tasks: [], attendance: [], shifts: [], notifications: [], ready: true });
  }

  // Bootstrap: restore an existing session, then follow auth changes.
  client.auth.getSession().then(({ data: { session } }) => (session ? signedIn(session) : em.set({ ready: true })));
  client.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") signOutLocally();
    else if (event === "SIGNED_IN" && session && !em.get().user) signedIn(session);
  });

  const call = async (fn) => { const { error } = await fn(); return error ? fail(error) : {}; };
  const adminFn = async (body) => {
    const { data, error } = await client.functions.invoke("admin", { body });
    if (error) return fail(error);
    if (data?.error) return fail(new Error(data.error));
    return data || {};
  };

  return {
    getState: em.get, subscribe: em.subscribe,
    clearError: () => em.set({ error: null }),

    async login(identifier, password) {
      const { data, error } = await client.auth.signInWithPassword({ email: usernameToEmail(identifier), password });
      if (error) return { error: T.invalidLogin };
      await signedIn(data.session);
      return em.get().user ? {} : { error: T.inactiveLogin };
    },
    async logout() { await client.auth.signOut(); signOutLocally(); },
    async changePassword(oldPw, newPw) {
      const u = em.get().user;
      const check = await client.auth.signInWithPassword({ email: usernameToEmail(u.username), password: oldPw });
      if (check.error) return { error: "Хуучин нууц үг буруу байна" };
      const { error } = await client.auth.updateUser({ password: newPw });
      return error ? fail(error) : {};
    },

    employees: {
      async create(data) {
        if (!data.username || !data.password) return { error: T.loginRequiredForNew };
        const r = await adminFn({ action: "create_user", email: usernameToEmail(data.username), password: data.password, profile: data });
        if (r.error) return r;
        await loadTable("profiles");
        return {};
      },
      async update(id, patch) {
        const r = await call(() => client.from("profiles").update(toProfile(patch)).eq("id", id));
        if (r.error) return r;
        if (patch.password) { const rp = await adminFn({ action: "reset_password", userId: id, password: patch.password }); if (rp.error) return rp; }
        await loadTable("profiles");
        if (id === em.get().user?.id) await refreshUser();
        return {};
      },
      async remove(id) {
        const r = await adminFn({ action: "delete_user", userId: id });
        if (r.error) return r;
        await loadAll();
        return {};
      },
      async resetPassword(id, password) { return adminFn({ action: "reset_password", userId: id, password }); },
    },

    attendance: {
      async checkIn(rec) {
        const row = { emp_id: rec.empId, date: rec.date, check_in: rec.checkIn, status: rec.status, lat: rec.lat ?? null, lng: rec.lng ?? null, accuracy_m: rec.accuracyM ?? null, distance_m: rec.distanceM ?? null, location_ok: rec.locationOk ?? null };
        const r = await call(() => client.from("attendance").insert(row)); if (!r.error) await loadTable("attendance"); return r;
      },
      async checkOut(id, time) { const r = await call(() => client.from("attendance").update({ check_out: time }).eq("id", id)); if (!r.error) await loadTable("attendance"); return r; },
    },

    tasks: {
      async create(data) {
        const row = { title: data.title, assignee: data.assignee, deadline: data.deadline || null, priority: data.priority, notes: data.notes || "", created_by: em.get().user?.id };
        const r = await call(() => client.from("tasks").insert(row)); if (!r.error) await loadTable("tasks"); return r;
      },
      async updateStatus(id, status) { const r = await call(() => client.from("tasks").update({ status }).eq("id", id)); if (!r.error) await loadTable("tasks"); return r; },
    },

    shifts: {
      async create(d) { const r = await call(() => client.from("shifts").insert({ emp_id: d.empId, date: d.date, shift: d.shift, start_time: d.start, end_time: d.end, note: d.note || "" })); if (!r.error) await loadTable("shifts"); return r; },
      async update(id, d) { const r = await call(() => client.from("shifts").update({ emp_id: d.empId, date: d.date, shift: d.shift, start_time: d.start, end_time: d.end, note: d.note || "" }).eq("id", id)); if (!r.error) await loadTable("shifts"); return r; },
      async remove(id) { const r = await call(() => client.from("shifts").delete().eq("id", id)); if (!r.error) await loadTable("shifts"); return r; },
    },

    notifications: {
      async markRead(id) { const r = await call(() => client.from("notifications").update({ read: true }).eq("id", id)); if (!r.error) await loadTable("notifications"); return r; },
      async markAllRead() { const r = await call(() => client.from("notifications").update({ read: true }).eq("read", false)); if (!r.error) await loadTable("notifications"); return r; },
    },

    settings: {
      async save(s) {
        const num = (v) => (v === "" || v === null || v === undefined || Number.isNaN(Number(v)) ? null : Number(v));
        const row = { work_start: s.workStart, work_end: s.workEnd, overtime: Number(s.overtime) || 0, store_name: s.storeName, late_grace_min: Math.max(0, Math.min(180, Number(s.lateGraceMin) || 0)), store_lat: num(s.storeLat), store_lng: num(s.storeLng), geo_radius_m: Math.max(20, Math.min(5000, Number(s.geoRadiusM) || 150)) };
        const r = await call(() => client.from("settings").update(row).eq("id", 1));
        if (!r.error) await loadSettings(); return r;
      },
    },

    // Web push subscriptions (one row per browser/device)
    push: {
      async save(sub) {
        const u = em.get().user; if (!u || !sub?.endpoint) return { error: "no subscription" };
        return call(() => client.from("push_subscriptions").upsert({ user_id: u.id, endpoint: sub.endpoint, p256dh: sub.keys?.p256dh, auth: sub.keys?.auth, user_agent: navigator.userAgent.slice(0, 200) }, { onConflict: "endpoint" }));
      },
      async remove(endpoint) { if (!endpoint) return {}; return call(() => client.from("push_subscriptions").delete().eq("endpoint", endpoint)); },
      async isSaved(endpoint) {
        if (!endpoint) return false;
        const { data } = await client.from("push_subscriptions").select("id").eq("endpoint", endpoint).maybeSingle();
        return Boolean(data);
      },
    },

    resetDemo: null, // not available with a real backend
  };
}
