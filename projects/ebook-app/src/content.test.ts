import { describe, expect, it } from "vitest";
import { chapters, resources, startReading } from "./content";

describe("ebook content catalog", () => {
  it("loads the complete 25-chapter Book 1 draft in order", () => {
    expect(chapters).toHaveLength(25);
    expect(chapters[0].id).toBe("chapter-01");
    expect(chapters[0].title).toContain("first working app");
    expect(chapters.at(-1)?.id).toBe("chapter-25");
    expect(chapters.at(-1)?.title).toContain("Capstone");
  });

  it("has unique chapter IDs and useful reading metadata", () => {
    expect(new Set(chapters.map((chapter) => chapter.id)).size).toBe(chapters.length);
    for (const chapter of chapters) {
      expect(chapter.wordCount).toBeGreaterThan(50);
      expect(chapter.minutes).toBeGreaterThan(0);
      expect(chapter.markdown).toContain("###");
    }
  });

  it("includes the start guide and companion tools", () => {
    expect(startReading.markdown).toContain("IDEA → PLAN → BUILD → VERIFY");
    expect(resources.map((resource) => resource.id)).toEqual(expect.arrayContaining([
      "glossary",
      "prompt-library",
      "verification",
      "failure-museum",
      "project-first-app",
      "project-taskflow-react",
    ]));
    for (const resource of resources) expect(resource.markdown.length).toBeGreaterThan(100);
  });
});
