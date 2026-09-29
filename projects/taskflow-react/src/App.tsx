import { useRef, useState, type FormEvent } from "react";
import {
  countRemaining,
  removeTask,
  toggleTask,
  validateTaskTitle,
  type Task,
} from "./taskLogic";

const starterTasks: Task[] = [
  { id: "task-1", title: "Choose one useful next action", done: false },
];

type TaskFormProps = {
  draft: string;
  error: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function TaskForm({ draft, error, onDraftChange, onSubmit }: TaskFormProps) {
  const inputId = "new-task-title";

  return (
    <form className="mt-6" onSubmit={onSubmit} noValidate>
      <label className="mb-2 block text-sm font-semibold text-slate-900" htmlFor={inputId}>
        One thing I want to finish
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="title"
          type="text"
          value={draft}
          maxLength={80}
          autoComplete="off"
          required
          aria-required="true"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "task-help task-error" : "task-help"}
          onChange={(event) => onDraftChange(event.currentTarget.value)}
          placeholder="For example: outline the first page"
          className="min-w-0 flex-1 rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-500 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        />
        <button
          className="min-h-12 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-950 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          type="submit"
        >
          Add to my list
        </button>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600" id="task-help">
        Use a short action, up to 80 characters.
      </p>
      {error && (
        <p className="mt-2 text-sm font-semibold text-red-800" id="task-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

type TaskRowProps = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

function TaskRow({ task, onToggle, onRemove }: TaskRowProps) {
  const checkboxId = `task-${task.id}`;

  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 sm:px-4">
      <input
        className="size-5 shrink-0 accent-emerald-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        id={checkboxId}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <label
        className={`min-w-0 flex-1 cursor-pointer break-words text-slate-900 ${task.done ? "text-slate-600 line-through" : ""}`}
        htmlFor={checkboxId}
      >
        {task.title}
      </label>
      <button
        className="min-h-10 shrink-0 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-950 hover:bg-rose-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        type="button"
        aria-label={`Remove ${task.title}`}
        onClick={() => onRemove(task.id)}
      >
        Remove
      </button>
    </li>
  );
}

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

function TaskList({ tasks, onToggle, onRemove }: TaskListProps) {
  return (
    <>
      <ul className="mt-2 grid gap-3" aria-labelledby="tasks-heading">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-slate-700">
          No tasks yet. Add one small action above.
        </p>
      )}
    </>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const nextId = useRef(2);
  const remaining = countRemaining(tasks);
  const taskWord = tasks.length === 1 ? "task" : "tasks";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateTaskTitle(draft);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setTasks((current) => [
      ...current,
      { id: `task-${nextId.current}`, title: result.value, done: false },
    ]);
    nextId.current += 1;
    setDraft("");
    setError("");
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    if (error) setError("");
  }

  function handleToggle(id: string) {
    setTasks((current) => toggleTask(current, id));
  }

  function handleRemove(id: string) {
    setTasks((current) => removeTask(current, id));
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-8">
      <a
        className="sr-only rounded-md bg-white px-3 py-2 text-emerald-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:outline-2 focus:outline-offset-2 focus:outline-amber-500"
        href="#main-content"
      >
        Skip to the task list
      </a>

      <header className="flex items-center gap-3 text-sm font-bold tracking-[0.12em] text-slate-600">
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-xl bg-emerald-800 text-base text-white"
        >
          T
        </span>
        <span>TASKFLOW · A FIRST BUILD</span>
      </header>

      <section className="py-14 sm:py-20" aria-labelledby="page-title">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-800">
          Your day, in focus
        </p>
        <h1
          id="page-title"
          className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-7xl"
        >
          Make room for one useful thing.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Keep a short list, finish one action, and notice what changed. This
          milestone is still a local demo: refresh the page and your tasks reset.
        </p>
      </section>

      <section
        id="main-content"
        className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8"
        aria-labelledby="tasks-heading"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="tasks-heading" className="text-xl font-semibold tracking-tight text-slate-950">
            Today’s list
          </h2>
          <p className="text-sm text-slate-600">Start small. You can change the plan.</p>
        </div>

        <TaskForm
          draft={draft}
          error={error}
          onDraftChange={handleDraftChange}
          onSubmit={handleSubmit}
        />

        <p className="mt-5 min-h-6 text-sm font-semibold text-emerald-900" role="status" aria-live="polite">
          {remaining} of {tasks.length} {taskWord} left.
        </p>

        <TaskList tasks={tasks} onToggle={handleToggle} onRemove={handleRemove} />

        <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-700">
          <strong>Learning note:</strong> this version keeps tasks in the running
          page only. Nothing is sent to a server or saved after refresh.
        </p>
      </section>

      <footer className="mt-6 text-sm leading-6 text-slate-700">
        <strong>Professional habit:</strong> describe what the app actually stores,
        not what a polished screen makes a person assume.
      </footer>
    </main>
  );
}

export default App;
