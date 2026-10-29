#!/usr/bin/env node
// Seeds a fresh Supabase project with the demo accounts and sample data.
//
//   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=eyJ... node scripts/seed-demo.mjs
//
// Optional: AUTH_EMAIL_DOMAIN (default btech.local) — must match VITE_AUTH_EMAIL_DOMAIN in the app.
// Uses the service-role key, so run it from your own machine only, never ship it to the browser.
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const domain = process.env.AUTH_EMAIL_DOMAIN || "btech.local";
if (!url || !key) { console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"); process.exit(1); }
const sb = createClient(url, key, { auth: { persistSession: false } });

const PEOPLE = [
  { username: "director", password: "123456", role: "Director", name: "Сараа Болд", phone: "+976-9900-1122", contact_email: "saraa@store.mn", position: "Захирал", joined: "2020-01-15" },
  { username: "manager", password: "123456", role: "Manager", name: "Өмөр Халид", phone: "+976-9900-2233", contact_email: "omar@store.mn", position: "Дэлгүүрийн менежер", joined: "2021-02-01" },
  { username: "emp1", password: "123456", role: "Employee", name: "Лина Хасан", phone: "+976-9911-2233", contact_email: "lina@store.mn", position: "Кассчин", joined: "2023-03-15" },
  { username: "emp2", password: "123456", role: "Employee", name: "Ахмед Насер", phone: "+976-9922-3344", contact_email: "ahmed@store.mn", position: "Агуулахын ажилтан", joined: "2022-11-01" },
  { username: "emp3", password: "123456", role: "Employee", name: "Нур Ибрагим", phone: "+976-9933-4455", contact_email: "nour@store.mn", position: "Борлуулагч", joined: "2024-01-20" },
];

const today = new Date();
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const plus = (n) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

const ids = {};
for (const p of PEOPLE) {
  const email = `${p.username}@${domain}`;
  const { password, ...meta } = p;
  const { data, error } = await sb.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { ...meta, active: true } });
  if (error) {
    // Already seeded? Look the user up by username so the rest can still run.
    const { data: prof } = await sb.from("profiles").select("id").eq("username", p.username).maybeSingle();
    if (!prof) { console.error(`createUser ${p.username}:`, error.message); process.exit(1); }
    ids[p.username] = prof.id; console.log(`= ${p.username} exists`);
  } else { ids[p.username] = data.user.id; console.log(`+ ${p.username} created`); }
}

const must = async (label, q) => { const { error } = await q; if (error) { console.error(label, error.message); process.exit(1); } console.log(`+ ${label}`); };

await must("tasks", sb.from("tasks").insert([
  { title: "3-р гарцын тавиурыг дүүргэх", assignee: ids.emp2, deadline: plus(1), status: "Хийгдэж байна", priority: "Өндөр", notes: "Ундааны хэсэгт анхаарлаа хандуулна уу", created_by: ids.manager },
  { title: "Сарын тооллого хийх", assignee: ids.emp1, deadline: plus(4), status: "Хүлээгдэж байна", priority: "Өндөр", created_by: ids.manager },
  { title: "Шинэ кассчинг сургах", assignee: ids.emp3, deadline: plus(2), status: "Дууссан", priority: "Дунд", notes: "POS системийн сургалт", created_by: ids.director },
  { title: "Үнийн шошго шинэчлэх", assignee: ids.emp3, deadline: plus(3), status: "Хийгдэж байна", priority: "Дунд", notes: "Шинэ урамшууллын бараанууд", created_by: ids.manager },
]));
await must("shifts", sb.from("shifts").insert([
  { emp_id: ids.emp1, date: plus(0), shift: "Өглөө", start_time: "08:00", end_time: "16:00" },
  { emp_id: ids.emp2, date: plus(0), shift: "Өглөө", start_time: "08:00", end_time: "16:00" },
  { emp_id: ids.emp3, date: plus(0), shift: "Орой", start_time: "14:00", end_time: "22:00" },
  { emp_id: ids.emp1, date: plus(1), shift: "Өглөө", start_time: "08:00", end_time: "16:00" },
  { emp_id: ids.emp2, date: plus(1), shift: "Орой", start_time: "14:00", end_time: "22:00" },
]));
await must("attendance", sb.from("attendance").insert([
  { emp_id: ids.emp1, date: plus(-1), check_in: "08:00", check_out: "17:00", status: "Цагтаа" },
  { emp_id: ids.emp2, date: plus(-1), check_in: "08:05", check_out: "17:00", status: "Цагтаа" },
  { emp_id: ids.emp3, date: plus(-1), check_in: "08:20", check_out: "17:10", status: "Хоцорсон" },
]));
console.log("\nDone. Sign in with director/123456, manager/123456 or emp1/123456.");
