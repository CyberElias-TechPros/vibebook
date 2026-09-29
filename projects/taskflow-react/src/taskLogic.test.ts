import { describe, expect, it } from "vitest";
import {
  countRemaining,
  removeTask,
  toggleTask,
  validateTaskTitle,
  type Task,
} from "./taskLogic";

const sampleTasks: Task[] = [
  { id: "a", title: "Draft", done: false },
  { id: "b", title: "Review", done: true },
];

describe("validateTaskTitle", () => {
  it("trims outer whitespace from a valid title", () => {
    expect(validateTaskTitle("  Draft a page  ")).toEqual({
      ok: true,
      value: "Draft a page",
    });
  });

  it("rejects empty and whitespace-only titles", () => {
    expect(validateTaskTitle("").ok).toBe(false);
    expect(validateTaskTitle("   ")).toEqual({
      ok: false,
      error: "Enter a short action before adding it.",
    });
  });

  it("accepts the maximum length and rejects one character over", () => {
    expect(validateTaskTitle("x".repeat(80)).ok).toBe(true);
    expect(validateTaskTitle("x".repeat(81))).toEqual({
      ok: false,
      error: "Use 80 characters or fewer.",
    });
  });
});

describe("task collection helpers", () => {
  it("counts only tasks that are not complete", () => {
    expect(countRemaining(sampleTasks)).toBe(1);
    expect(countRemaining([])).toBe(0);
  });

  it("toggles the selected task without mutating the original list", () => {
    const updated = toggleTask(sampleTasks, "a");
    expect(updated).toEqual([
      { id: "a", title: "Draft", done: true },
      { id: "b", title: "Review", done: true },
    ]);
    expect(sampleTasks[0].done).toBe(false);
    expect(updated).not.toBe(sampleTasks);
  });

  it("removes only the selected task", () => {
    expect(removeTask(sampleTasks, "b")).toEqual([sampleTasks[0]]);
    expect(sampleTasks).toHaveLength(2);
  });
});
