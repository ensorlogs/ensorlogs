-- Ensor.Logs — project image galleries
alter table public.projects
  add column if not exists images jsonb not null default '[]';
