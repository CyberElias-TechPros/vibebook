import frontMatter from "../../../chapters/book1/00-front-matter.md?raw";
import part1 from "../../../chapters/book1/part-1-foundations.md?raw";
import part2 from "../../../chapters/book1/part-2-product-design.md?raw";
import part3 from "../../../chapters/book1/part-3-build-taskflow.md?raw";
import part4 from "../../../chapters/book1/part-4-reliability.md?raw";
import part5 from "../../../chapters/book1/part-5-release-capstone.md?raw";
import glossary from "../../../companion/GLOSSARY.md?raw";
import prompts from "../../../companion/prompts/STARTER_PROMPT_LIBRARY.md?raw";
import productBrief from "../../../companion/templates/PRODUCT_BRIEF.md?raw";
import promptContract from "../../../companion/templates/PROMPT_CONTRACT.md?raw";
import verification from "../../../companion/checklists/INDEPENDENT_VERIFICATION.md?raw";
import safety from "../../../companion/checklists/AGENT_SAFETY_PREFLIGHT.md?raw";
import failureMuseum from "../../../companion/checklists/FAILURE_MUSEUM.md?raw";
import tenRules from "../../../companion/checklists/TEN_RULES.md?raw";
import firstAppReadme from "../../../projects/01-first-app/README.md?raw";
import firstAppCode from "../../../projects/01-first-app/index.html?raw";
import taskflowReactCode from "../../../projects/taskflow-react/src/App.tsx?raw";
import taskflowLogicCode from "../../../projects/taskflow-react/src/taskLogic.ts?raw";
import taskflowTests from "../../../projects/taskflow-react/src/taskLogic.test.ts?raw";
import taskflowSchema from "../../../projects/taskflow-react/supabase/migrations/20260929000000_create_tasks.sql?raw";
import taskflowPolicies from "../../../projects/taskflow-react/supabase/migrations/20260929000500_task_owner_policies.sql?raw";

const partMarkdown = [part1, part2, part3, part4, part5];

export type Chapter = {
  id: string;
  number: number;
  title: string;
  part: string;
  markdown: string;
  wordCount: number;
  minutes: number;
};

export type Resource = {
  id: string;
  title: string;
  category: string;
  description: string;
  markdown: string;
};

const fence = "```";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function codeBlock(language: string, source: string): string {
  return `${fence}${language}\n${source.trimEnd()}\n${fence}`;
}

function parsePart(markdown: string): Chapter[] {
  const part = markdown.match(/^# (Part [^\n]+)/m)?.[1] ?? "Book 1";
  const matches = [...markdown.matchAll(/^## Chapter (\d+) — (.+)$/gm)];

  return matches.flatMap((match, index) => {
    const number = Number(match[1]);
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const body = markdown.slice(start, end).trim();
    if (!number || !body) return [];

    const wordCount = countWords(body);
    return [{
      id: `chapter-${String(number).padStart(2, "0")}`,
      number,
      title: match[2],
      part,
      markdown: body,
      wordCount,
      minutes: Math.max(4, Math.ceil(wordCount / 220)),
    }];
  });
}

export const chapters: Chapter[] = partMarkdown.flatMap(parsePart);

export const startReading: Resource = {
  id: "start-here",
  title: "Start here",
  category: "Book guide",
  description: "The promise, learning loop, safety rules, and chapter map.",
  markdown: frontMatter,
};

export const resources: Resource[] = [
  {
    id: "glossary",
    title: "Beginner glossary",
    category: "Reference",
    description: "Plain-language definitions for the terms used in Book 1.",
    markdown: glossary,
  },
  {
    id: "prompt-library",
    title: "Starter prompt library",
    category: "Prompts",
    description: "Reusable prompts for planning, building, debugging, and learning.",
    markdown: prompts,
  },
  {
    id: "product-brief",
    title: "Product brief template",
    category: "Template",
    description: "Capture the user, problem, scope, data, and acceptance criteria.",
    markdown: productBrief,
  },
  {
    id: "prompt-contract",
    title: "AI task contract",
    category: "Template",
    description: "Bound an assistant's task and require inspectable evidence.",
    markdown: promptContract,
  },
  {
    id: "verification",
    title: "Independent verification checklist",
    category: "Checklist",
    description: "Checks for a feature, data access, and release.",
    markdown: verification,
  },
  {
    id: "agent-safety",
    title: "Agent safety preflight",
    category: "Checklist",
    description: "Reduce permissions and blast radius before an agent acts.",
    markdown: safety,
  },
  {
    id: "failure-museum",
    title: "Failure Museum",
    category: "Safety",
    description: "Hazards, diagnostics, recovery, and prevention habits.",
    markdown: failureMuseum,
  },
  {
    id: "ten-rules",
    title: "Ten rules for responsible vibe coding",
    category: "Quick reference",
    description: "A compact reminder of the IDEA → IMPROVE discipline.",
    markdown: tenRules,
  },
  {
    id: "project-first-app",
    title: "Chapter 1 starter project",
    category: "Code lab",
    description: "Run the one-file browser demo and inspect its source.",
    markdown: `${firstAppReadme}\n\n## Complete starter source\n\n${codeBlock("html", firstAppCode)}`,
  },
  {
    id: "project-taskflow-react",
    title: "TaskFlow React code lab",
    category: "Code lab",
    description: "Explore the React, TypeScript, Tailwind, tests, and draft SQL examples.",
    markdown: `# TaskFlow React code lab\n\nThis source is an educational milestone, not production software. The database migrations are draft examples and have not been executed or security-reviewed.\n\n## React screen — src/App.tsx\n\n${codeBlock("tsx", taskflowReactCode)}\n\n## Pure task rules — src/taskLogic.ts\n\n${codeBlock("ts", taskflowLogicCode)}\n\n## Unit tests — src/taskLogic.test.ts\n\n${codeBlock("ts", taskflowTests)}\n\n## Initial schema (closed to browser roles)\n\n${codeBlock("sql", taskflowSchema)}\n\n## Owner policies (draft; test before use)\n\n${codeBlock("sql", taskflowPolicies)}`,
  },
];

export const allReadingItems: Resource[] = [
  startReading,
  ...chapters.map((chapter) => ({
    id: chapter.id,
    title: `Chapter ${chapter.number}: ${chapter.title}`,
    category: chapter.part,
    description: chapter.markdown.slice(0, 180).replace(/[#>*`]/g, "").trim(),
    markdown: chapter.markdown,
  })),
  ...resources,
];
