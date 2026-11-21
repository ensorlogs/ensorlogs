-- Ensor.Logs — admin access restricted to the owner.
-- Before: any `authenticated` user was treated as the owner. Now admin
-- policies require the JWT email to be listed in public.admin_emails.
-- After running, add the owner (same email as ADMIN_EMAIL):
--   insert into public.admin_emails (email) values ('tu@email.com');

create table if not exists public.admin_emails (
  email text primary key check (email = lower(email))
);

-- No policies: only the service role / SQL editor can read or edit it.
alter table public.admin_emails enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_emails a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ── Logs ─────────────────────────────────────────────────────────────────────
drop policy if exists "admin read all logs" on public.logs;
drop policy if exists "admin insert logs" on public.logs;
drop policy if exists "admin update logs" on public.logs;
drop policy if exists "admin delete logs" on public.logs;

create policy "admin read all logs"
  on public.logs for select
  to authenticated
  using (public.is_admin());

create policy "admin insert logs"
  on public.logs for insert
  to authenticated
  with check (public.is_admin());

create policy "admin update logs"
  on public.logs for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin delete logs"
  on public.logs for delete
  to authenticated
  using (public.is_admin());

-- ── Projects ─────────────────────────────────────────────────────────────────
drop policy if exists "admin read all projects" on public.projects;
drop policy if exists "admin insert projects" on public.projects;
drop policy if exists "admin update projects" on public.projects;
drop policy if exists "admin delete projects" on public.projects;

create policy "admin read all projects"
  on public.projects for select
  to authenticated
  using (public.is_admin());

create policy "admin insert projects"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

create policy "admin update projects"
  on public.projects for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- ── Contacts / leads ─────────────────────────────────────────────────────────
drop policy if exists "admin read contacts" on public.contacts;
drop policy if exists "admin update contacts" on public.contacts;
drop policy if exists "admin delete contacts" on public.contacts;

create policy "admin read contacts"
  on public.contacts for select
  to authenticated
  using (public.is_admin());

create policy "admin update contacts"
  on public.contacts for update
  to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin delete contacts"
  on public.contacts for delete
  to authenticated
  using (public.is_admin());

-- ── Storage ──────────────────────────────────────────────────────────────────
drop policy if exists "admin write stories media" on storage.objects;
drop policy if exists "admin update stories media" on storage.objects;
drop policy if exists "admin delete stories media" on storage.objects;

create policy "admin write stories media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'stories-media' and public.is_admin());

create policy "admin update stories media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'stories-media' and public.is_admin())
  with check (bucket_id = 'stories-media' and public.is_admin());

create policy "admin delete stories media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'stories-media' and public.is_admin());

-- ── Push subscriptions ───────────────────────────────────────────────────────
-- /api/push validates endpoints and writes with the service role, so direct
-- anon/authenticated writes (which would skip that validation) are removed.
drop policy if exists "public insert push sub" on public.push_subscriptions;
drop policy if exists "public delete own push sub" on public.push_subscriptions;
drop policy if exists "admin read push subs" on public.push_subscriptions;

create policy "admin read push subs"
  on public.push_subscriptions for select
  to authenticated
  using (public.is_admin());
