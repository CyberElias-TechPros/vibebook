# Book 1 Chapter Matrix

**Book:** *Vibe Coding Foundations: Ship real, safe software with professional habits*  
**Version:** 0.1 working draft · **Date:** 2026-09-29  
**Scope:** 25 chapters, one evolving project (TaskFlow), short side exercises.  
**Manuscript location:** [`../chapters/book1/`](../chapters/book1/)

This matrix is the source of truth for chapter order and learning outcomes. Chapter 1 is a build-first win; setup and theory are introduced after the reader sees a working result. No chapter is commercially validated until a beginner beta test and technical reproduction are recorded.

| Ch. | Chapter | Observable outcome | Project artifact / evidence | Prerequisite | Evergreen / dated content |
|---:|---|---|---|---|---|
| 1 | Your first working app | Add, complete, and remove an item in a browser-only TaskFlow; describe what refresh does. | `projects/01-first-app/`; acceptance checks | Browser + text editor; no account | Mostly evergreen; starter source included |
| 2 | What you just built | Distinguish file, browser, server, URL, frontend, backend, and database using TaskFlow. | System map + local/network distinction | Ch. 1 | Evergreen |
| 3 | Set up your safe workshop | Run a React + TypeScript app locally; locate files; save a reversible Git checkpoint. | Vite starter, first commit | Ch. 1–2; supported computer or cloud workspace | Mixed; Node/Vite command compatibility checked 2026-09-29, recheck before publication |
| 4 | Direct the assistant | Turn a vague request into a bounded task with context, constraints, and acceptance criteria; reject an unverified claim. | Prompt contract + reviewed diff | Ch. 3 | Evergreen; assistant UI varies by provider |
| 5 | Context engineering | Maintain project instructions and decision notes; identify sensitive data and hostile repository instructions. | `AGENTS.md`, `PROJECT.md`, `DECISIONS.md` | Ch. 3–4 | Mostly evergreen; agent instruction-file support is tool-specific and must be rechecked |
| 6 | Find a real problem | Describe user, pain, workaround, evidence, and testable outcome without pitching features first. | One-page discovery note | Ch. 1–5 | Evergreen |
| 7 | Write a product brief | Separate goals, non-goals, requirements, assumptions, and acceptance criteria. | TaskFlow PRD v1 | Ch. 6 | Evergreen |
| 8 | Design the journey | Map happy path, empty state, error state, and recovery before asking AI for UI. | Flow map + wireframe | Ch. 7 | Evergreen |
| 9 | Build a coherent interface | Use components, spacing, color, and responsive layout consistently; distinguish content from styling. | TaskFlow visual shell | Ch. 3, 8, 11–12 | Mixed; Tailwind/Vite setup checked 2026-09-29, recheck major-version instructions |
| 10 | Accessible and responsive UI | Navigate and operate the core flow with keyboard; check labels, contrast, focus, and narrow screens. | Accessibility checklist + fixes | Ch. 8–9 | Principles evergreen; standards/regulations need current source and jurisdiction review |
| 11 | Read the code | Trace an interaction through markup, styles, TypeScript values, functions, and visible output. | Annotated code map | Ch. 3 | Evergreen core; runtime details can change |
| 12 | Think in React components | Split a screen into components with clear inputs and responsibilities. | Task list component tree | Ch. 11 | Mostly evergreen; framework APIs should be rechecked |
| 13 | State and events | Explain where a task's current value lives and what updates when an event occurs. | In-memory task CRUD | Ch. 12 | Evergreen core |
| 14 | Forms and validation | Validate at the right boundary and show recoverable, understandable errors. | Add-task validation + boundary tests; edit flow as independent exercise | Ch. 13 | Evergreen core |
| 15 | Store data | Model users/tasks as related records; perform basic SQL; use a publishable key only with reviewed policies. | Development schema + migration | Ch. 7, 11, 13–14 | Mixed; Supabase key names and setup checked 2026-09-29, recheck before publication |
| 16 | Authentication vs. authorization | Demonstrate sign-in is not row ownership; write and test access rules. | RLS policy review + adversarial checks | Ch. 15 | Mixed; policy/grant example checked against Supabase docs 2026-09-29; qualified review still required |
| 17 | Version control, tests, verification | Restore a known checkpoint; test behavior independently; record a regression. | Git history + test plan | Ch. 3, 13–16 | Mostly evergreen; Vitest install/compatibility checked 2026-09-29, recheck current Node/Vite requirements |
| 18 | Debug with evidence | Reproduce a defect, collect evidence, test a hypothesis, and verify the fix. | Debug log / minimal reproduction | Ch. 11–17 | Evergreen |
| 19 | Secrets, agent permissions, blast radius | Keep secrets out of source/prompts; restrict an agent; refuse a destructive action without backup and approval. | Safety checklist + threat sketch | Ch. 3–5, 15–18 | Principles evergreen; provider permission and budget settings must be rechecked |
| 20 | External APIs and services | Inspect an official API contract, keep server secrets server-side, handle timeouts/failures. | Mocked or safe read-only integration | Ch. 7, 11, 18–19 | Evergreen method; each selected provider's API is dated and must be verified |
| 21 | Deploy and verify | Promote a tested build to a separate hosted environment and verify the live app. | Deployment checklist + release note | Ch. 15–20 | Mixed; Vercel/Vite reference checked 2026-09-29; UI and plans are perishable |
| 22 | Operate what you ship | Define a health signal, backup/restore approach, cost guardrail, and maintenance routine. | Runbook + review checklist | Ch. 16, 19, 21 | Evergreen method; quotas, pricing, and provider settings require current checks |
| 23 | Rescue an unfamiliar codebase | Map structure, establish a baseline, characterize behavior, then make a small safe change. | Repo map + stabilization plan | Ch. 3–5, 17–19 | Evergreen |
| 24 | When not to vibe code | Classify a proposed product as prototype, specialist-reviewed, or out of scope; explain why. | Boundary decision + Failure Museum review | Prior chapters | Principles evergreen; laws/regulatory classifications require current jurisdictional review |
| 25 | Capstone | Independently plan, build, verify, and present a bounded product, including limits and recovery. | Capstone repo, demo, reflection, rubric | All prior chapters | Evergreen framework; publication platform rules must be rechecked |

## Five-part writing plan

| Part | Chapters | Thread milestone | Required gate |
|---|---|---|---|
| I — Start building | 1–5 | TaskFlow runs locally; reader has a prompt and safe project memory | Genuine beginner completes Chapter 1 without an account or instructor |
| II — Solve the right problem | 6–10 | TaskFlow has a justified scope, flow, and accessible interface plan | PRD criteria can be tested by someone other than the author |
| III — Build TaskFlow | 11–15 | App becomes structured, interactive, and persistent | CRUD works in development; invalid inputs fail safely |
| IV — Make it dependable | 16–20 | Access rules, tests, diagnosis, and integrations are reviewed | Cross-user access tests pass; no secret in client bundle |
| V — Release and improve | 21–25 | App is deployed, operated, audited, and presented | Live acceptance test, rollback plan, explicit scope boundaries |

## Editorial status convention

Each chapter is **Draft**, **Technical review**, **Beginner-tested**, or **Release-ready**. Current chapters are **Draft**. A “last verified” date records only the source/tool claim checked; it does not imply full tutorial reproduction. A chapter earns a full validation claim only when the environment, commands, observed result, and reviewer are recorded in `companion/validation/`.
