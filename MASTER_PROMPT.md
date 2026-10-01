# Master Prompt — The Ultimate Vibe Coding Ebook

Use this prompt as the editorial constitution for drafting, revising, and validating Book 1 and later products. It guides the work; it does not substitute for subject-matter review, beginner testing, code execution, or security validation.

---

## 1. Mission
Create a commercially valuable, unusually practical learning system that takes a true beginner toward responsible AI-assisted software development. Teach them to plan, direct, understand, verify, ship, and improve software—not merely to collect prompts or accept generated code.

## 2. Editorial north star
Every chapter must demonstrably increase at least one reader capability: product judgment, context selection, safe AI direction, code literacy, independent verification, risk management, release, or maintenance. Cut anything that is impressive but does not help that transformation.

## 3. Honest promise
Use the positioning: **“Ship real, safe software with professional habits.”** Do not promise overnight expertise, guaranteed jobs/revenue, or equivalence to an experienced engineer. State limitations and specialist triggers plainly.

## 4. Primary reader
Assume the primary reader has never coded, may not know basic developer terms, has limited time, money, bandwidth, or hardware, and is nervous about breaking things. Define technical words before relying on them. Never treat confusion as low intelligence.

## 5. Secondary readers
Make the book navigable for founders, designers, students, traditional programmers adopting AI, and freelancers. Use labeled optional depth instead of branching the main path into several competing curricula.

## 6. Product strategy
Treat the original broad blueprint as a series, not one oversized volume:
- **Book 1 — Foundations:** first app, product thinking, context, code literacy, golden-path web app, verification, safety, deployment, capstone.
- **Book 2 — Production:** deeper testing/security/operations, brownfield, team practice, commercial delivery.
- **Book 3 — Agents & AI Products:** advanced agent orchestration, AI features, evaluations, model operations.
- **Specialist playbooks:** mobile, games, SaaS, payments/e-commerce, automation, extensions, and other focused domains.

Ship a complete, tested Book 1 before expanding scope.

## 7. Golden path
For Book 1, default to TypeScript + React + Vite + Tailwind CSS + Supabase/PostgreSQL/Auth + Git/GitHub + Vercel. Keep AI tooling vendor-agnostic. Introduce each tool when the learner has a reason to use it. Put alternatives in comparison or companion references after the main path is clear.

## 8. First-win requirement
The reader must achieve a working app in the first 30–60 minutes. Start with a browser-only, single-file TaskFlow warm-up; no account, installation, payment, or network is required. Introduce technical concepts after the reader has seen the app work. Be explicit that this warm-up is not a secure or persistent production service.

## 9. Signature development loop
Use this loop at project and feature scale:

```text
IDEA → PLAN → BUILD → VERIFY → SHIP → IMPROVE
```

Define each stage as a set of decisions and evidence. Do not portray “ship” as a button or “verify” as asking the model whether it is correct.

## 10. Teaching loop
Use **EXPLAIN → DEMONSTRATE → INVOLVE → VERIFY**. Give the learner a simple mental model, a concrete example, a meaningful task that cannot be solved by copying verbatim, and an observable check.

## 11. Scaffolding
Progress each important skill through **FOLLOW → MODIFY → DEBUG → DESIGN → TEACH**. Early chapters emphasize guided tasks; later chapters require independent decisions, evidence, and teach-back. Include solutions, hints, or rubrics without removing productive thinking.

## 12. Chapter architecture
Each substantial chapter should include, where relevant: title/purpose; measurable outcomes; prerequisites; why it matters; simple explanation; technical foundation; professional practice; worked example; guided activity; exact AI workflow; important choices/trade-offs; common mistakes and recovery; safety/boundaries; independent exercise; verification checklist; teach-back; knowledge check; recap; retrieval practice; next step.

Avoid formulaic repetition. If a section is not relevant, omit it rather than fill space. Never omit the underlying teaching or verification function.

## 13. Voice and clarity
Write with calm confidence, warmth, precision, and respect. Use direct language, concrete nouns, short steps, useful tables, annotated code, and original diagrams. Define jargon once and use it consistently. Distinguish fact from assumption, recommendation, and example. Avoid hype, shame, fearmongering, and false certainty.

## 14. Depth and navigation
Separate **Core lesson**, **Professional practice**, **Stretch**, and **Dated walkthrough**. Teach the indispensable idea in the main line; put advanced trade-offs and specialist depth in optional modules or later books. Include fast paths without making beginners feel that the core is disposable.

## 15. Learning psychology and retention
Give early wins; normalize confusion; teach prompt-and-pray loops, scope creep, sunk-cost spirals, frustration, recovery, and when to reset or walk away. Use retrieval practice, chapter checkpoints, portfolio artifacts, and 30/60/90-day plans. Difficulty is not evidence of a lack of intelligence.

## 16. Spec-first and context engineering
Teach problem discovery, PRD, non-goals, user journeys, acceptance criteria, milestones, and verification early. Teach a small project brain (`PROJECT.md`, decision log, tool-specific agent instructions), context selection, context hygiene, safe summaries, and prompt-injection/untrusted-input handling. Keep context minimal, current, and free of secrets or unapproved personal data.

## 17. Professional roles
Use a coherent lifecycle to introduce product manager, researcher, designer, accessibility reviewer, frontend/backend engineer, database designer, tester, security/privacy reviewer, DevOps/operations, technical writer, support, and business owner perspectives. Role prompts may help focus review, but do not imply that an AI role label confers qualification or accountability.

## 18. Project-based learning
Use TaskFlow as the evolving flagship: browser-only first win → product definition → structured UI → state/forms → database → authentication/authorization → tests/security → deployment → operations. Add short side quests only when they teach more clearly. Do not use live sensitive records or real payments in beginner exercises.

## 19. Technical coverage
Book 1 should cover: web mental models, HTML/CSS/TypeScript/React, prompting, context, product discovery, UX, accessibility, Git, state/forms, SQL/data, authentication/authorization/RLS, testing, debugging, secrets, agent permissions, external APIs, deployment, observability, cost, backup/recovery, brownfield rescue, product boundaries, portfolio/capstone. Advanced mobile/games/AI products/payments belong to later playbooks.

## 20. Failure curriculum
Teach anti-patterns with **symptoms → root cause → diagnostic → recovery → prevention**: prompt spaghetti, unbounded scope, patching symptoms, blind dependencies, hallucinated APIs, polished-but-hollow demos, weak permissions, exposed secrets, unbounded costs, unsafe autonomy, missing backups, and vibe debt. Maintain a recurring Failure Museum and require honest limitations.

## 21. Safety and professional boundaries
Teach least privilege, environment separation, backups, migration review, spend limits, secret/data hygiene, human approval for destructive/consequential actions, authorization at trusted boundaries, RLS, webhook verification, idempotency, rollback, and recovery. Clearly flag medical, financial, regulated, safety-critical, cryptographic, kernel/firmware, and other specialist domains. This book is education, not legal advice or security certification.

## 22. Independent verification
For every important claim of “done,” specify evidence. Separate model claims from commands actually run, tests from manual acceptance, and UI appearance from backend/data security. Require boundary cases, negative cases, independent user tests, permission tests, and deployed verification appropriate to risk. Never invent test results or claim a tutorial was reproduced without a record.

## 23. Commercial and regional quality
Prioritize low-cost options, mobile-first design, modest bandwidth/hardware, accessible examples, and locally relevant constraints without making unsupported legal or pricing claims. Add regional payment/data protection details only after current authoritative research and qualified review. Package as a genuine ladder: **Essentials** (ebook + references), **Builder** (plus prompt library, templates, starter repos), **Professional** (plus videos and an optional human-reviewed capstone/community only if those services can actually be delivered). Keep core safety content in every tier. Price tiers and services are proposals until validated.

## 24. Research integrity and evergreen design
Aim for roughly 70% evergreen principles and 30% dated tool procedures. Cite authoritative primary documentation for commands, APIs, packages, policies, and version-specific behavior. Keep access dates and a source register. Do not use hotlinked or unlicensed third-party images. Mark perishable content and maintain errata/update procedures.

## 25. Technical/editorial quality gates
Before release, reproduce code in a clean environment; record OS/runtime/tool versions and exact results; verify package/API names; check no insecure defaults or leaked secrets; test accessibility; have a qualified engineer review security/deployment; run genuine beginner beta tests and revise based on observed friction; copy-edit and source-check. Keep every gate marked pending until evidence exists.

## 26. Assessment and final acceptance
Use the rubric **0 Copied, 1 Modified, 2 Debugged, 3 Designed, 4 Taught** per skill area. The capstone must include a bounded problem, PRD, architecture/decision notes, working artifact, independent test evidence, data/access explanation, limitations, release/recovery plan, and reflection.

A manuscript is ready only when a beginner can follow it without hidden assumptions; a reviewer can verify technical claims; the app's important behavior is demonstrable; safety limitations are explicit; and the reader can explain what they built, what remains uncertain, and when to ask for help.

---

## Prompt for drafting an individual chapter

> Draft **Chapter [number]: [title]** for Book 1 using this master prompt, the current chapter matrix, and the project's current technical state. Do not invent testing, interviews, tool behavior, facts, screenshots, or sources. First list the chapter's reader outcome, prerequisites, artifact, dependencies, perishable details, and risk level. Then write the chapter in the established voice, using the chapter architecture where it adds value. Use the golden path and current project decisions; do not introduce an alternative stack without a reason. Include an AI prompt that teaches bounded, inspectable work—not magic. Include at least one independent verification task and one failure/recovery example. Flag claims needing official-source verification and any steps needing hands-on testing or qualified review. Do not mark the chapter validated. End with a short checklist of facts and behavior still to verify.

## Prompt for technical review

> Review this chapter as a skeptical technical editor. Check every command, package name, API/configuration claim, code sample, permission rule, and safety statement against the cited official sources or runnable artifact. Identify incorrect, ambiguous, outdated, unsafe, unsupported, or untested claims. Do not silently rewrite uncertain facts as certainty. For each finding, give severity, exact passage, evidence/source, recommended correction, and test needed. Separate verified defects from questions requiring a human specialist. Never claim execution unless you actually ran the tutorial in the documented environment.

## Prompt for beginner beta review

> Observe a genuine beginner who has not coded before attempting this chapter. Do not teach, rescue, or complete steps for them. Record time, exact point of confusion, assumptions they could not infer, errors and recovery attempts, and whether they independently pass the stated verification. Obtain consent and avoid recording secrets or sensitive data. After the session, report what the reader actually did—not what the author hopes they did—and recommend the smallest editorial changes that remove the observed blockers.
