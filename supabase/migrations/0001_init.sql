-- Ensor.Logs — initial schema
-- Run in Supabase SQL Editor or via `supabase db push`.
-- One unified `logs` table: type 'log' = text entry, type 'story' = video log.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.logs (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  type          text not null default 'log' check (type in ('log', 'story')),
  title_es      text not null,
  title_en      text not null,
  excerpt_es    text,
  excerpt_en    text,
  content_es    text not null default '',
  content_en    text not null default '',
  category      text not null default 'general',
  video_url     text,
  thumbnail_url text,
  platform      text not null default 'web',
  external_link text,
  published     boolean not null default false,
  published_at  timestamptz,
  position      int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists logs_published_idx
  on public.logs (published, published_at desc);
create index if not exists logs_feed_idx
  on public.logs (published, type, position);

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table public.logs enable row level security;

-- Public reads: only published rows
create policy "public read published logs"
  on public.logs for select
  to anon, authenticated
  using (published = true);

-- Admin reads: the signed-in owner sees drafts too
create policy "admin read all logs"
  on public.logs for select
  to authenticated
  using (true);

-- Admin writes (single-owner site: any authenticated user = owner)
create policy "admin insert logs"
  on public.logs for insert
  to authenticated
  with check (true);

create policy "admin update logs"
  on public.logs for update
  to authenticated
  using (true) with check (true);

create policy "admin delete logs"
  on public.logs for delete
  to authenticated
  using (true);

-- ── Storage ─────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('stories-media', 'stories-media', true)
on conflict (id) do nothing;

-- Public can read media
create policy "public read stories media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'stories-media');

-- Only the signed-in owner uploads/deletes media
create policy "admin write stories media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'stories-media');

create policy "admin update stories media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'stories-media');

create policy "admin delete stories media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'stories-media');
