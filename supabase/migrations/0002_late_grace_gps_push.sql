-- Btech Store — late-arrival grace, GPS check-in, web push
-- Apply with:  supabase db push   (or paste into the SQL editor of your project)

-- ─── SETTINGS: late grace + store location ───────────────────────────────────
alter table public.settings
  add column late_grace_min int  not null default 10 check (late_grace_min between 0 and 180),
  add column store_lat      double precision,
  add column store_lng      double precision,
  add column geo_radius_m   int  not null default 150 check (geo_radius_m between 20 and 5000);

-- ─── ATTENDANCE: where the check-in happened ─────────────────────────────────
alter table public.attendance
  add column lat         double precision,
  add column lng         double precision,
  add column accuracy_m  int,
  add column distance_m  int,          -- distance from the store at check-in (null = store location not set)
  add column location_ok boolean;      -- null = not checked

-- ─── WEB PUSH SUBSCRIPTIONS ──────────────────────────────────────────────────
create table public.push_subscriptions (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  endpoint    text not null unique,
  p256dh      text not null,
  auth        text not null,
  user_agent  text not null default '',
  created_at  timestamptz not null default now()
);
create index push_subscriptions_user_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;
create policy "push own" on public.push_subscriptions for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- The send-push edge function is invoked by a Database Webhook on INSERT into
-- public.notifications (Dashboard → Database → Webhooks). See README.
