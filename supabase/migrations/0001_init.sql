-- Btech Store — initial schema
-- Apply with:  supabase db push   (or paste into the SQL editor of your project)

-- ─── PROFILES (one row per auth user) ────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text unique not null,
  name        text not null,
  phone       text not null default '',
  email       text not null default '',
  position    text not null default '',
  joined      date,
  active      boolean not null default true,
  role        text not null default 'Employee' check (role in ('Director', 'Manager', 'Employee')),
  created_at  timestamptz not null default now()
);

-- Create the profile automatically when an auth user is created (metadata comes from the admin function).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, name, phone, email, position, joined, active, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'contact_email', ''),
    coalesce(new.raw_user_meta_data ->> 'position', ''),
    nullif(new.raw_user_meta_data ->> 'joined', '')::date,
    coalesce((new.raw_user_meta_data ->> 'active')::boolean, true),
    coalesce(new.raw_user_meta_data ->> 'role', 'Employee')
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Role helpers (security definer so RLS on profiles does not recurse).
create or replace function public.current_role_name()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid() and active
$$;
create or replace function public.is_manager()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() in ('Director', 'Manager'), false)
$$;
create or replace function public.is_director()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_role_name() = 'Director', false)
$$;

-- Only a Director may change role / active / username; everyone else may only edit profile fields.
create or replace function public.protect_profile_fields()
returns trigger language plpgsql as $$
begin
  if (new.role is distinct from old.role or new.active is distinct from old.active or new.username is distinct from old.username)
     and not public.is_director() then
    raise exception 'Only a Director can change role, active state or username';
  end if;
  if new.id = auth.uid() and new.role is distinct from old.role then
    raise exception 'You cannot change your own role';
  end if;
  return new;
end $$;
create trigger profiles_protect before update on public.profiles
  for each row execute function public.protect_profile_fields();

-- Non-sensitive colleague directory for employees (no phone / e-mail).
create view public.colleagues with (security_invoker = false) as
  select id, username, name, position, joined, active, role from public.profiles;
grant select on public.colleagues to authenticated;

-- ─── ATTENDANCE ──────────────────────────────────────────────────────────────
create table public.attendance (
  id          bigint generated always as identity primary key,
  emp_id      uuid not null references public.profiles (id) on delete cascade,
  date        date not null,
  check_in    time not null,
  check_out   time,
  status      text not null check (status in ('Цагтаа', 'Хоцорсон')),
  unique (emp_id, date)
);

-- ─── TASKS ───────────────────────────────────────────────────────────────────
create table public.tasks (
  id          bigint generated always as identity primary key,
  title       text not null,
  assignee    uuid references public.profiles (id) on delete set null,
  deadline    date,
  status      text not null default 'Хүлээгдэж байна' check (status in ('Хүлээгдэж байна', 'Хийгдэж байна', 'Дууссан')),
  priority    text not null default 'Дунд' check (priority in ('Өндөр', 'Дунд', 'Бага')),
  notes       text not null default '',
  created_by  uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

-- Employees may only change the status of their own task.
create or replace function public.protect_task_fields()
returns trigger language plpgsql as $$
begin
  if not public.is_manager() then
    if old.assignee is distinct from auth.uid() then raise exception 'Not your task'; end if;
    if row(new.title, new.assignee, new.deadline, new.priority, new.notes) is distinct from row(old.title, old.assignee, old.deadline, old.priority, old.notes) then
      raise exception 'Employees can only update task status';
    end if;
  end if;
  return new;
end $$;
create trigger tasks_protect before update on public.tasks
  for each row execute function public.protect_task_fields();

-- ─── SHIFTS ──────────────────────────────────────────────────────────────────
create table public.shifts (
  id          bigint generated always as identity primary key,
  emp_id      uuid not null references public.profiles (id) on delete cascade,
  date        date not null,
  shift       text not null,
  start_time  time not null,
  end_time    time not null,
  note        text not null default ''
);
create index shifts_date_idx on public.shifts (date);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table public.notifications (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  type        text not null default 'task' check (type in ('shift', 'task', 'schedule')),
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);
create index notifications_user_idx on public.notifications (user_id, created_at desc);

-- Notify the assignee when a task is created for them or re-assigned.
create or replace function public.notify_task_assignee()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.assignee is not null and (tg_op = 'INSERT' or new.assignee is distinct from old.assignee) then
    insert into public.notifications (user_id, type, message)
    values (new.assignee, 'task', 'Шинэ даалгавар хуваарилагдлаа: ' || new.title);
  end if;
  return new;
end $$;
create trigger tasks_notify after insert or update on public.tasks
  for each row execute function public.notify_task_assignee();

-- Notify the employee when a shift is created for them.
create or replace function public.notify_shift()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.notifications (user_id, type, message)
  values (new.emp_id, 'schedule', new.date::text || '-ний ' || new.shift || ' ээлж (' || to_char(new.start_time, 'HH24:MI') || '–' || to_char(new.end_time, 'HH24:MI') || ') хуваарилагдлаа');
  return new;
end $$;
create trigger shifts_notify after insert on public.shifts
  for each row execute function public.notify_shift();

-- ─── SETTINGS (single row) ───────────────────────────────────────────────────
create table public.settings (
  id          int primary key default 1 check (id = 1),
  work_start  time not null default '08:00',
  work_end    time not null default '17:00',
  overtime    int  not null default 8,
  store_name  text not null default 'Btech Store — Үндсэн салбар'
);
insert into public.settings default values;

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.attendance    enable row level security;
alter table public.tasks         enable row level security;
alter table public.shifts        enable row level security;
alter table public.notifications enable row level security;
alter table public.settings      enable row level security;

-- profiles: full rows for yourself and for managers; others use the `colleagues` view
create policy "profiles select own or manager" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_manager());
create policy "profiles update own or manager" on public.profiles for update to authenticated
  using (id = auth.uid() or public.is_manager()) with check (id = auth.uid() or public.is_manager());
-- inserts/deletes happen through auth.users (admin function) only

-- attendance
create policy "attendance select own or manager" on public.attendance for select to authenticated
  using (emp_id = auth.uid() or public.is_manager());
create policy "attendance insert own" on public.attendance for insert to authenticated
  with check (emp_id = auth.uid());
create policy "attendance update own or manager" on public.attendance for update to authenticated
  using (emp_id = auth.uid() or public.is_manager());
create policy "attendance delete manager" on public.attendance for delete to authenticated
  using (public.is_manager());

-- tasks
create policy "tasks select own or manager" on public.tasks for select to authenticated
  using (assignee = auth.uid() or public.is_manager());
create policy "tasks insert manager" on public.tasks for insert to authenticated
  with check (public.is_manager());
create policy "tasks update own or manager" on public.tasks for update to authenticated
  using (assignee = auth.uid() or public.is_manager());
create policy "tasks delete manager" on public.tasks for delete to authenticated
  using (public.is_manager());

-- shifts: everyone sees the rota, managers edit it
create policy "shifts select all" on public.shifts for select to authenticated using (true);
create policy "shifts write manager" on public.shifts for all to authenticated
  using (public.is_manager()) with check (public.is_manager());

-- notifications: only your own
create policy "notifications own" on public.notifications for select to authenticated using (user_id = auth.uid());
create policy "notifications mark read" on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- settings: everyone reads, Director writes
create policy "settings select all" on public.settings for select to authenticated using (true);
create policy "settings update director" on public.settings for update to authenticated
  using (public.is_director()) with check (public.is_director());

-- Realtime: let the client subscribe to changes
alter publication supabase_realtime add table public.profiles, public.attendance, public.tasks, public.shifts, public.notifications, public.settings;
