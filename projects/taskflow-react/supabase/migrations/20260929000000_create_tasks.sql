-- Development milestone 1: create the task table but leave browser roles without access.
-- Review the current Supabase/PostgreSQL documentation before applying this migration.

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 80),
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;
revoke all on table public.tasks from anon, authenticated;
