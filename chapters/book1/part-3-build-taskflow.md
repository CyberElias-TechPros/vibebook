# Part III — Build TaskFlow

## Chapter 11 — Read the code: HTML, JavaScript, TypeScript, and errors

### What you will be able to do
You can follow a value from user input through a function to a visible result, recognize common TypeScript shapes, and read a compiler error as evidence rather than as a verdict on your ability.

### Code is a set of explicit instructions
In the first app, HTML names the input and list. CSS controls their appearance. JavaScript listens for events, updates a value, and changes the page. React does not replace these ideas; it organizes them into a predictable model.

A few building blocks appear everywhere:

- A **value** is information such as a task title or a number.
- A **variable** gives a value a name. `const` means the binding will not be reassigned; it does not make an object immutable. `let` allows reassignment.
- A **function** groups instructions that can be called with inputs.
- An **array** holds an ordered collection. An **object** groups named properties.
- A **condition** chooses a path. A **loop** repeats work for a collection.
- An **event** is something that happened, such as a submit or click.
- A **type** describes what shape a value should have, helping tools detect certain mistakes before runtime.

Here is a TaskFlow type and a pure helper:

```ts
type Task = {
  id: string;
  title: string;
  done: boolean;
};

function countRemaining(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length;
}
```

`Task[]` means “an array of Task values.” The return type `number` promises a number, not a sentence. TypeScript checks many mistakes while you build, but types do not prove that a product requirement is correct, a database policy is safe, or an API response is trustworthy.

### Guided code tour: from the screen to a pure rule

Use the companion project in `projects/taskflow-react/`. It is the Ch. 11–14 milestone of TaskFlow, built from the React + TypeScript + Vite starter. If you want to create a fresh copy instead of opening the supplied project, repeat the Chapter 3 Vite command first, then use the files as reference. In the project folder, run:

```bash
npm install
npm run dev
```

Open the local address Vite prints. The app should run before you change anything. In a second terminal, the companion's checks are:

```bash
npm test
npm run build
npm run lint
```

Read `src/taskLogic.ts` first. It contains pure functions: they receive values and return results without changing the page, calling a server, or mutating the input array. Then find where `src/App.tsx` imports `countRemaining` and uses it to show the status. Finally, follow the form's submit event to `validateTaskTitle`. The source map is short on purpose.

This milestone has no database or saved state. `npm test` checks six logic cases; it does not prove that the interface renders correctly in every browser. Complete the manual tasks in the project README too.

### Learn to read the smallest useful slice
When AI changes code, do not try to memorize every file. Trace one path:

1. Where does the input enter?
2. Which function or handler receives it?
3. What value changes?
4. Which component displays that value?
5. Which test or manual action proves the behavior?

If the flow jumps between many files, ask the assistant for a map with exact identifiers. Verify the map against the source. If you do not understand a line, ask what would happen if it were removed and then test safely in a disposable branch.

### Errors are clues
A compiler error usually identifies a location and a mismatch. For example, if `done` is expected to be a boolean but receives a string, the type checker is revealing a disagreement. Read the first relevant error, inspect the named file and line, and avoid “fixing” a cascade of later errors before understanding the earliest cause.

A type checker catches only the mistakes it knows how to describe. The app can compile and still behave incorrectly. Runtime validation, permissions, tests, and human review still matter.

### Practice
Ask your assistant, in **read-only** mode, to explain `countRemaining` line by line and give two inputs with expected outputs. Manually verify one empty array and one array containing a completed and incomplete task. Then change the task type in a practice copy and notice which places the compiler flags.

**Teach back:** What does a type checker help you learn early, and what does it not guarantee?

**Recap:** Follow values and behavior, not just filenames. TypeScript is a useful safety net, not a correctness certificate.

---

## Chapter 12 — Think in React components

### What you will be able to do
You can split a screen into a few components with clear responsibilities, describe data passed as props, and review an AI-proposed component tree.

### A component is a function of inputs
React components describe interface based on data. A parent can pass a task and callbacks to a child. The child displays the task and reports an interaction; it should not secretly own the whole product's rules.

A simplified component might look like this:

```tsx
type Task = { id: string; title: string; done: boolean };

type TaskRowProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

function TaskRow({ task, onToggle, onRemove }: TaskRowProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
      <button type="button" onClick={() => onRemove(task.id)}>
        Remove
      </button>
    </li>
  );
}
```

This sketch assumes a parent provides the callbacks. The component has a visible responsibility: render one task and report two user actions. The parent can own the task collection and decide how changes are applied.

### Choose boundaries for reasons
A useful starter tree could be:

```text
App (owns tasks, draft, and error state)
├── TaskForm (receives draft + callbacks)
└── TaskList (receives tasks + callbacks)
    └── TaskRow (receives one task + callbacks; repeated)

src/taskLogic.ts (pure validation and collection functions)
```

Do not split a component simply to reduce line count. Split when a unit repeats, has a clear interface, can be understood or tested independently, or changes for a different reason. Avoid giant “do everything” components that own fetching, permissions, validation, layout, and persistence all at once.

In `projects/taskflow-react/src/App.tsx`, the first extraction keeps `TaskForm`, `TaskList`, and `TaskRow` as named functions in one file so a beginner can see the data flow without jumping between tabs. `App` owns `tasks`, `draft`, and `error`. It passes values and callbacks down; a row does not reach into the parent's state. Keeping several small components in one file is acceptable at this learning stage. Move them to separate files only when the added boundary helps navigation or reuse.

**Follow:** Trace a task from `App` through `TaskList` to `TaskRow`.  
**Modify:** Change a nonfunctional label in `TaskRow`, then build and inspect the diff.  
**Debug:** Temporarily remove the `onToggle` callback in a disposable copy; follow the TypeScript error to see which contract broke. Restore it.  
**Teach:** Explain why `TaskRow` reports an ID instead of editing the task array itself.

### AI workflow
Ask an assistant to read the current code and propose a component tree. Require a sentence for each boundary: what data enters, what event leaves, and what responsibility stays outside. Do not ask it to refactor yet. Compare the suggestion with the product brief and current tests. Then choose one component to extract as a reversible change.

After the extraction, compare behavior before and after. A refactor is intended to change structure without changing user-visible behavior. If it changes behavior, treat that as a bug or a deliberate product change—not as an invisible side effect of “cleanup.”

### Verification checkpoint
- You can point to the owner of the task collection.
- A task row receives the values it needs rather than reaching into unrelated global state.
- Callbacks make user actions explicit.
- The visible add, complete, and remove behavior still passes after a component extraction.

**Practice:** Extract one row from TaskFlow in a new branch. Ask AI to implement only the agreed boundary. Review the diff and run the same acceptance path before and after.

**Recap:** Components create understandable boundaries. Good boundaries make behavior easier to review; more files alone do not make an app better.

---

## Chapter 13 — State, events, and the path data takes

### What you will be able to do
You can explain where changing UI data lives, update a collection without mutating it, and trace an event from a control to a new screen.

### State is the current information the interface depends on
A task list changes when a person adds, completes, or removes an item. React calls this changing information **state**. When state changes, React renders the interface again from the current values. You describe what the screen should look like for the current state; you do not manually edit every visible node.

In a small component, state may begin like this:

```tsx
const [tasks, setTasks] = useState<Task[]>(initialTasks);
```

When updating an item, create a new array rather than changing the existing one in place:

```tsx
function toggleTask(id: string) {
  setTasks((current) =>
    current.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  );
}
```

`map` returns a new array. The matching item is copied with a changed `done` value; the other items are kept. This makes the change explicit and gives React a reliable signal to update the view.

### State has a scope
If only `TaskRow` needs a hover state, keep it there. If the header, list, and status count all depend on the same task collection, keep that state in a shared parent and pass the required values down. If persistent data must survive refresh or appear on another device, browser component state is not enough; that is a different storage problem.

Do not copy the same source of truth into multiple state variables without a reason. If the total count can be calculated from `tasks`, store `tasks` and calculate the count rather than separately storing a count that can get out of sync.

### Events are messages from the interface
A checkbox change can call `toggleTask(id)`. A submit event can call `addTask(title)`. Keep data updates in small named functions where practical. When the action fails—because input is invalid, the network is offline, or access is denied—state should represent the failure instead of silently pretending success.

### Debug the flow
When a button appears dead, trace the event path:

```text
control → event handler → update function → state change → render → visible result
```

At each arrow, ask for evidence. Is the handler attached? Does it receive the expected ID? Does the update return a new value? Does the component read that value? Use a breakpoint or a temporary log in a practice branch, and remove diagnostic logs that expose personal data before release.

### Guided state trace

In the companion project, start at the checkbox in `TaskRow`. Its `onChange` calls the `onToggle` prop with the row's ID. `TaskList` passed that callback from `App`. `App.handleToggle` calls `setTasks`, and `taskLogic.toggleTask` maps the current array to a new one. React renders again with the changed `done` value; the checkbox and line-through style now reflect that value.

The status count is **derived** by calling `countRemaining(tasks)`. It is not separately stored, so there is no second counter to accidentally forget to update. The project uses `useState` for tasks and keeps a task ID counter in `useRef`; the draft text and validation message are state too because they affect the screen.

**Try it:** Add two tasks, complete one, remove the other, then reload the page. Confirm the list resets. In a practice branch, temporarily change the helper so it returns the old array unchanged; use a test or UI observation to identify what stopped changing. Restore the correct helper and run `npm test`.

### Practice and checkpoint
Add a “completed” filter or a remaining count. Before editing, write what the UI should show for zero tasks, one incomplete task, and one completed task. Implement only one derived view. Verify each case and explain which values are stored and which are calculated.

**Teach back:** Why is `tasks.push(newTask)` a risky way to update React state? **Answer:** It mutates the same array reference. A new array makes the change explicit and aligns with React's state update model.

**Recap:** State is the current source of truth for a UI. Trace events, update immutably, and distinguish temporary screen state from persistent data.

---

## Chapter 14 — Forms, validation, and useful feedback

### What you will be able to do
You can build an input flow with understandable validation, preserve user intent when something fails, and distinguish browser checks from trusted server-side checks.

### Validation is about a boundary
A form should help a person provide valid information, but every input is still untrusted. Browser-side validation improves feedback; it can be bypassed by sending a request directly. A backend or database must enforce rules that protect stored data.

For a TaskFlow title, the product brief says 1–80 non-whitespace characters. That rule has three expressions:

1. The interface communicates the limit and uses `required` / `maxLength` for immediate help.
2. The application trims whitespace and checks the length before sending.
3. The server/database checks the rule again before accepting a record.

For the in-memory milestone, `src/taskLogic.ts` keeps the rule in a small function that can be tested independently:

```ts
export type TitleValidation =
  | { ok: true; value: string }
  | { ok: false; error: string };

export function validateTaskTitle(
  rawTitle: string,
  maxLength = 80,
): TitleValidation {
  const title = rawTitle.trim();
  if (title.length === 0) {
    return { ok: false, error: "Enter a short action before adding it." };
  }
  if (title.length > maxLength) {
    return { ok: false, error: `Use ${maxLength} characters or fewer.` };
  }
  return { ok: true, value: title };
}
```

`TitleValidation` is a discriminated union: when `ok` is true the result has `value`; when false it has `error`. TypeScript can check that the caller handles each case. The input's `maxLength` improves the interface, but the function still checks the limit because code can be called from more than one place.

The same rule should be tested at boundaries: empty, spaces only, one character, exactly 80 characters, and 81 characters. A limit shown in a label but not enforced is a broken contract.

### Good error messages keep the person moving
A useful message says what happened and what the person can do. “Invalid input” is vague. “Enter a task with at least one non-space character” names the problem. For a network failure, do not say “Saved” because the button was clicked. If the save result is uncertain, say that and offer a safe next action.

Connect messages to fields, use visible labels, preserve the typed draft when practical, prevent accidental double submission, and make errors perceivable without color alone. Do not clear a person's work just because a request failed.

### Ask for tests before implementation

> For the TaskFlow title rule (trimmed length 1–80), list boundary cases and expected results. Do not write code yet. Include empty, whitespace, one character, 80 characters, 81 characters, and a network failure after a valid title. Separate browser feedback from rules the server must enforce.

Check the list against the PRD. Then build the smallest form change and run every case. When a form collects personal information, stop and document purpose, retention, access, and deletion before adding fields.

### Guided verification in the companion app

Open `src/taskLogic.test.ts` and compare its cases with the product rule. Run `npm test` from `projects/taskflow-react/`. The six tests currently cover trimming, empty/whitespace-only titles, the 80/81 boundary, completion counts, immutable toggling, and removal. They test pure logic only; they do not test whether an actual browser announces the error or whether the field retains focus.

Try the interface manually: submit an empty value, three spaces, one letter, an 80-character string, and then a value after an error has appeared. Check that the message is useful, the user can correct it, and the task is not added on failure. Record any mismatch between the tests and the visible behavior.

### Verification checkpoint
- Valid input succeeds and is shown once.
- Empty and whitespace-only titles fail with an actionable message.
- The limit is clear and tested at the boundary.
- A failure does not falsely claim success or unnecessarily erase the draft.
- The product has a server-side rule for any constraint that protects stored data.

**Practice:** Add editing to a task. Write cancel, invalid, and save-failure states before coding. Include one test for an 81-character title.

**Teach back:** Why is a `maxLength` attribute not a security boundary?

**Recap:** Validate early for helpful feedback and again at trusted boundaries for correctness and safety.

---

## Chapter 15 — Store data: tables, SQL, and a first Supabase connection

### What you will be able to do
You can describe a relational table, read basic SQL, create a development-only task schema with access disabled by default, and distinguish a publishable browser key from a secret server key.

### Persistence changes the product
The first TaskFlow stores tasks only in memory. A database changes the promise: tasks may survive refresh and could be shared across devices. That creates new questions about identity, ownership, deletion, backups, and privacy. Choose the data model from those requirements; do not add a database merely because a tutorial did.

A relational database organizes data into **tables** (similar to structured sheets), **rows** (individual records), and **columns** (attributes). A primary key identifies a row. A foreign key links a row to another table. SQL is the language used to define and query relational data.

For a signed-in TaskFlow user, a task might have:

```text
id         unique task identifier
user_id    owner identity
title      short task text
is_done    completion state
created_at creation time
```

The owner link is not cosmetic. It is part of the access-control design.

### Development schema, deliberately locked down
Only run database changes in a development project you can reset. A qualified reviewer should inspect production migrations. A starting schema might be:

```sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 80),
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;
revoke all on table public.tasks from anon, authenticated;
```

The first draft migration is in `projects/taskflow-react/supabase/migrations/20260929000000_create_tasks.sql`. It creates the schema and leaves browser roles without table access. The second migration, introduced in Chapter 16, grants only the app's required operations and adds owner policies. These are draft files; they have **not** been run against a database or independently security-reviewed.

With Row Level Security enabled and no matching policy, a browser-facing role should not gain row access by accident. Do not weaken this default just to make the demo work. Chapter 16 adds narrowly scoped owner policies and tests them. Database privileges and RLS policies both matter; verify them in the current Supabase documentation before exposing a table through an API.

Use migrations or a recorded SQL file where possible so the change can be reviewed and recreated. A dashboard click that is not recorded is difficult to reproduce. Never run a destructive SQL statement against production because an AI suggested it.

### Connect only after policy review
The current Supabase React quickstart uses Vite environment variables named `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The names and dashboard interface may change; consult the official guide dated in the companion source list.

A Vite variable with the `VITE_` prefix is made available to browser code. A **publishable** key is designed to be exposed, but it does not make the data safe by itself. Row Level Security and database privileges decide what the key can access. A **secret** key has elevated privileges and must never go into frontend code, a public repository, or an AI prompt.

An illustrative client module looks like this:

```ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error("Missing Supabase browser configuration.");
}

export const supabase = createClient(url, publishableKey);
```

To set up the client in a disposable development project:

1. Create a separate development project in Supabase. Do not point a beginner exercise at a production database.
2. From `projects/taskflow-react/`, install the official JavaScript client: `npm install @supabase/supabase-js`.
3. Create `.env.local` in the project root with `VITE_SUPABASE_URL=...` and `VITE_SUPABASE_PUBLISHABLE_KEY=...`. Obtain these values from the project's current API settings; never substitute a secret/service-role key.
4. Check `.gitignore` before saving the values, then inspect `git status --short` to confirm the local file is not staged.
5. Put the client code in a file such as `src/lib/supabase.ts`. Build the project and confirm missing configuration fails clearly.

At this point you have initialized a client, not made the table safe. Do not query or write user data until Chapter 16's grants, RLS policies, and allow/deny tests exist. Never add real personal information to the practice project.

For deployment, set the public URL and publishable key in the selected host's client environment configuration. Keep any server secret in a server-only secret store. Confirm the local file is ignored before adding credentials. A `.env` file is not a safe vault if it is committed or shared.

### AI workflow and safety gate
Ask an assistant to review the schema before execution: “Identify ownership, deletion behavior, validation, and access risks. Do not run SQL or change policies. Quote each concern and cite the exact statement.” Compare the response with the official Supabase/PostgreSQL docs and have a qualified person review before real data is involved.

### Checkpoint
- You can explain `id`, `user_id`, `title`, and `is_done` without reading a prompt.
- The development table has RLS enabled before browser access.
- No secret key appears in a `VITE_` variable, frontend code, Git, or a prompt.
- You can reset the practice database and know the data is disposable.

**Recap:** A database is a product and security decision. Model ownership explicitly, keep access closed until reviewed, and treat every browser input and AI-generated SQL as untrusted.
