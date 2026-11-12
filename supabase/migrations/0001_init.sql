-- Ensor.Logs — initial schema
-- Run in Supabase SQL Editor or via `supabase db push`.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.logs_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title_es     text not null,
  title_en     text not null,
  excerpt_es   text,
  excerpt_en   text,
  content_es   text not null,
  content_en   text not null,
  category     text not null default 'general',
  cover_url    text,
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.logs_stories (
  id            uuid primary key default gen_random_uuid(),
  title_es      text not null,
  title_en      text not null,
  video_url     text not null,
  thumbnail_url text,
  platform      text not null default 'web',
  external_link text,
  published     boolean not null default false,
  position      int  not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists logs_posts_published_idx
  on public.logs_posts (published, published_at desc);
create index if not exists logs_stories_published_idx
  on public.logs_stories (published, position);

-- ── Row Level Security ──────────────────────────────────────────────────────

alter table public.logs_posts   enable row level security;
alter table public.logs_stories enable row level security;

-- Public reads: only published rows
create policy "public read published posts"
  on public.logs_posts for select
  to anon, authenticated
  using (published = true);

create policy "public read published stories"
  on public.logs_stories for select
  to anon, authenticated
  using (published = true);

-- Admin reads: the signed-in owner sees drafts too
create policy "admin read all posts"
  on public.logs_posts for select
  to authenticated
  using (true);

create policy "admin read all stories"
  on public.logs_stories for select
  to authenticated
  using (true);

-- Admin writes (single-owner site: any authenticated user = owner)
create policy "admin insert posts"
  on public.logs_posts for insert
  to authenticated
  with check (true);

create policy "admin update posts"
  on public.logs_posts for update
  to authenticated
  using (true) with check (true);

create policy "admin delete posts"
  on public.logs_posts for delete
  to authenticated
  using (true);

create policy "admin insert stories"
  on public.logs_stories for insert
  to authenticated
  with check (true);

create policy "admin update stories"
  on public.logs_stories for update
  to authenticated
  using (true) with check (true);

create policy "admin delete stories"
  on public.logs_stories for delete
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
