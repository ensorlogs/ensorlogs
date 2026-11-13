-- Ensor.Logs — admin features: leads, projects CRUD, web push
-- Run after 0001_init.sql.

-- ── Contacts / leads ─────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  name       text,
  service    text,
  message    text,
  source     text not null default 'contact' check (source in ('contact','newsletter')),
  status     text not null default 'new' check (status in ('new','contacted','quoted','closed')),
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_idx on public.contacts (created_at desc);

alter table public.contacts enable row level security;

-- Public can only insert (form submissions); honeypot already filters spam.
create policy "public insert contacts"
  on public.contacts for insert
  to anon, authenticated
  with check (true);

create policy "admin read contacts"
  on public.contacts for select
  to authenticated
  using (true);

create policy "admin update contacts"
  on public.contacts for update
  to authenticated
  using (true) with check (true);

create policy "admin delete contacts"
  on public.contacts for delete
  to authenticated
  using (true);

-- ── Projects ─────────────────────────────────────────────────────────────────
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  tag_es       text,
  tag_en       text,
  summary_es   text,
  summary_en   text,
  context_es   text,
  context_en   text,
  solution_es  text,
  solution_en  text,
  results_es   text,
  results_en   text,
  stack        jsonb not null default '[]',
  metric_value text,
  metric_es    text,
  metric_en    text,
  image        text,
  external_url text,
  position     int not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists projects_published_idx
  on public.projects (published, position);

alter table public.projects enable row level security;

create policy "public read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

create policy "admin read all projects"
  on public.projects for select
  to authenticated
  using (true);

create policy "admin insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "admin update projects"
  on public.projects for update
  to authenticated
  using (true) with check (true);

create policy "admin delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- ── Push subscriptions ───────────────────────────────────────────────────────
create table if not exists public.push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  endpoint   text not null unique,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

-- Visitors subscribe themselves; deletion allowed by endpoint.
create policy "public insert push sub"
  on public.push_subscriptions for insert
  to anon, authenticated
  with check (true);

create policy "public delete own push sub"
  on public.push_subscriptions for delete
  to anon, authenticated
  using (true);

-- Sending is done server-side with the service role (bypasses RLS).
create policy "admin read push subs"
  on public.push_subscriptions for select
  to authenticated
  using (true);
