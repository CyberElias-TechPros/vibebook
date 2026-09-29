# Vibe Coding Foundations
## Ship real, safe software with professional habits

**Book 1 of The Ultimate Vibe Coding Ebook series**  
**Manuscript status:** Working draft, v0.1  
**Editorial date:** 29 September 2026  
**Author:** [Author name]

---

## A promise we can keep

This book will not make you a professional software engineer overnight, and it will not ask you to trust code because an AI produced it. It will help you go from no coding experience to planning, building, checking, and publishing a modest web application with AI as a tool—and to recognize where your knowledge ends and qualified review must begin.

The measure of progress is not how many lines an assistant writes. It is whether you can explain what the app is meant to do, direct a small change, inspect the result, test it independently, and make a responsible decision about what to do next.

## How to use this book

Read Chapters 1–5 in order. Chapter 1 is the first win: a tiny task app you can open in a browser, with no account, installation, or AI subscription required. Most readers can complete the first version in 30–60 minutes, but slow down whenever you need to. The estimate is a target, not a test of intelligence.

The rest of the book grows that small app into **TaskFlow**, a more complete project. Each time the project gains a capability, you will also gain a mental model for it and a way to check it. You may work with any coding assistant that can explain its changes; the prompts teach transferable behavior rather than a vendor-specific button sequence.

### The learning loop

Every project and feature follows the same six steps:

```text
IDEA → PLAN → BUILD → VERIFY → SHIP → IMPROVE
```

- **IDEA:** Identify a real person, problem, desired outcome, and constraint.
- **PLAN:** Turn that into a small slice with observable acceptance criteria.
- **BUILD:** Give the assistant bounded work, useful context, and a safe checkpoint.
- **VERIFY:** Check the behavior yourself. An AI's statement that it passed is not evidence.
- **SHIP:** Release only what you have checked, with suitable protections and a way to recover.
- **IMPROVE:** Learn from use, fix defects, and change the plan deliberately.

The lesson rhythm is **EXPLAIN → DEMONSTRATE → INVOLVE → VERIFY**. First get a plain-language model, then study a worked example, do a variation yourself, and prove the result using evidence.

### Five levels of independence

| Level | You can… |
|---|---|
| 0 — Copied | Reproduce an example with substantial help. |
| 1 — Modified | Change a known example without losing its purpose. |
| 2 — Debugged | Investigate a failure and use evidence to fix it. |
| 3 — Designed | Plan and build a suitable solution to a new, bounded problem. |
| 4 — Taught | Explain decisions and limits well enough to guide another person. |

Move forward when you can do the chapter's verification task—not when every paragraph feels memorized.

### Labels you will see

- **Core lesson** — needed for the Book 1 outcome.
- **Professional practice** — the habit that makes a demo safer to maintain.
- **Stretch** — optional depth; skip it on a first pass.
- **Dated walkthrough** — a screen, command, or provider detail likely to change. Check the companion source list before following it.

The principles are designed to last; screenshots, free-tier limits, model names, dashboard labels, and install commands are not. Tool setup in this draft is dated **29 September 2026** and still requires reproduction on supported operating systems before commercial publication.

## The Book 1 golden path

To avoid asking beginners to compare dozens of tools, this book uses one default path:

- **TypeScript** for the programming language
- **React + Vite** for the browser application
- **Tailwind CSS** for styling after the first plain-CSS exercises
- **Supabase** for PostgreSQL data and authentication
- **Git + GitHub** for checkpoints and collaboration
- **Vercel** for the frontend deployment, with Supabase hosting its services
- **Any suitable AI assistant** that can work from explicit instructions and show its changes

This is a teaching choice, not a claim that these are the only good tools. We introduce the tools in sequence so each one solves a problem the reader has already encountered. The browser-only Chapter 1 is a warm-up, not a competing stack.

## Before you begin: safety rules

1. Never paste a password, private key, access token, customer record, or confidential client material into a prompt.
2. Treat AI-generated code, shell commands, migrations, package names, and security claims as proposals—not facts.
3. Start in a practice project. Do not grant an agent access to a production account or irreplaceable files.
4. Keep a recoverable checkpoint before a risky change. A Git commit is useful, but it is not a database backup.
5. Do not publish an app that stores sensitive information until its authorization and security model has been reviewed.

The examples are educational. This book is not legal, tax, financial, medical, or security-audit advice. High-impact or regulated products need qualified domain and engineering review.

## A quick starting diagnostic

Answer these without looking anything up. “Not yet” is a valid answer.

1. What is the difference between a website running on your computer and one another person can visit?
2. If an AI says “the bug is fixed,” what would count as evidence?
3. Should a password used by a server be placed in frontend code? Why?
4. If a task app lets a person sign in, does that automatically mean each person can only see their own tasks?
5. Can you name one reason to stop and get specialist help instead of asking an AI for another prompt?

Keep your answers. Revisit them at the end of Part V.

## Contents

### Part I — Start building
1. Your first working app: TaskFlow in one file
2. What you just built: pages, browsers, servers, and data
3. Set up your safe workshop: editor, runtime, Git, and the golden path
4. Direct the assistant: prompts that produce inspectable changes
5. Context engineering: give a project a reliable memory

### Part II — Solve the right problem
6. Find a real problem before adding features
7. Write a small product brief and acceptance criteria
8. Design the journey before the screen
9. Build a coherent interface with components and a design system
10. Make the experience accessible and responsive

### Part III — Build TaskFlow
11. Read the code: HTML, JavaScript, TypeScript, and errors
12. Think in React components
13. State, events, and the path data takes
14. Forms, validation, and useful feedback
15. Store data: tables, SQL, and a first Supabase connection

### Part IV — Make it dependable
16. Sign-in is not permission: authentication, authorization, and RLS
17. Version control, tests, and independent verification
18. Debug with evidence instead of prompt roulette
19. Protect the project: secrets, agent permissions, and blast radius
20. Connect APIs and external services without guessing

### Part V — Release, learn, and choose wisely
21. Deploy a real release and verify the live app
22. Operate what you ship: monitoring, backups, costs, and maintenance
23. Rescue a codebase you did not create
24. When not to vibe code: boundaries and the Failure Museum
25. Capstone: plan, build, defend, and improve your own product

## Companion materials

The repository includes the first draft of a [beginner glossary](../../companion/GLOSSARY.md), [starter prompt library](../../companion/prompts/STARTER_PROMPT_LIBRARY.md), [product brief](../../companion/templates/PRODUCT_BRIEF.md), [AI task contract](../../companion/templates/PROMPT_CONTRACT.md), [verification card](../../companion/checklists/INDEPENDENT_VERIFICATION.md), [agent safety preflight](../../companion/checklists/AGENT_SAFETY_PREFLIGHT.md), [Failure Museum](../../companion/checklists/FAILURE_MUSEUM.md), and [Ten Rules poster](../../companion/checklists/TEN_RULES.md). These companion files are working drafts too; do not assume the project has passed commercial QA.

## What is not in this book

Book 1 is a practical foundation, not an exhaustive professional reference. Advanced mobile development, games, complex payments, production AI systems, regulated software, and specialist infrastructure belong in future playbooks or require professionals. The goal here is to help you recognize those boundaries rather than bluff past them.
