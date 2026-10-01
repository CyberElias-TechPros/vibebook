-- Development milestone 2: grant only the signed-in operations the app needs.
-- RLS policies then narrow those operations to the authenticated user's own rows.
-- Apply only after reviewing the schema and confirming this is the intended database.

grant select, insert, update, delete on table public.tasks to authenticated;

create policy "Users read their own tasks"
on public.tasks for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Users create their own tasks"
on public.tasks for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users update their own tasks"
on public.tasks for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users delete their own tasks"
on public.tasks for delete to authenticated
using ((select auth.uid()) = user_id);
