# TaskFlow database migrations

This directory contains two **draft development migrations** for the Book 1 tutorial. They have not been executed against a Supabase project or reviewed by a database/security specialist.

1. `20260929000000_create_tasks.sql` creates the table with RLS enabled and revokes browser-role access.
2. `20260929000500_task_owner_policies.sql` grants selected operations to authenticated users and adds per-user row policies.

Before applying:

- Create a disposable development project, not production.
- Read both migration files and verify the current Supabase/PostgreSQL docs.
- Confirm no pre-existing table or policy conflicts with these migrations.
- Make a restorable backup if any data exists.
- Apply the schema migration first; test its closed state; only then apply the policy migration.
- Test signed-out, User A, and User B reads/inserts/updates/deletes at the data/API boundary.
- Never use a service-role/secret key in the browser.

No credential, project URL, or live database is included. The React UI is not yet connected to these migrations.
