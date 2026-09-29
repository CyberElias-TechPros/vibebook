export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export type TitleValidation =
  | { ok: true; value: string }
  | { ok: false; error: string };

export function validateTaskTitle(rawTitle: string, maxLength = 80): TitleValidation {
  const title = rawTitle.trim();

  if (title.length === 0) {
    return { ok: false, error: "Enter a short action before adding it." };
  }

  if (title.length > maxLength) {
    return { ok: false, error: `Use ${maxLength} characters or fewer.` };
  }

  return { ok: true, value: title };
}

export function countRemaining(tasks: Task[]): number {
  return tasks.filter((task) => !task.done).length;
}

export function toggleTask(tasks: Task[], taskId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task,
  );
}

export function removeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}
