# Book 1 Specification — Vibe Coding Foundations

**Series:** *The Ultimate Vibe Coding Ebook*  
**Working title:** *Vibe Coding Foundations: Ship real, safe software with professional habits*  
**Reader promise:** From no coding experience to planning, building, independently checking, and responsibly releasing a modest web application with AI assistance.  
**Status:** Manuscript draft in progress · **Version:** 1.1 · **Date:** 2026-09-29

## 1. Reader and boundaries

Assume the primary reader has never written code, may not know what a terminal/API/database is, may have limited time/budget/internet, and needs friendly, reproducible explanations. Do not assume that they are unintelligent or that their hardware supports every workflow. Offer an approved cloud/editor path when local installation is blocked, while discussing privacy and export risk.

This is a foundation, not a claim that one book makes a novice an unsupervised professional. High-impact, regulated, safety-critical, cryptographic, and specialist work needs qualified review or a different engineering process.

## 2. Book 1 measurable outcomes

By the end, readers should be able to:

- Run a first working browser app within an estimated 30–60 minutes without an account or installation.
- Explain what the first app does, what it does not store, and what happens on refresh.
- Use a TypeScript/React/Vite project, Git checkpoints, and an AI assistant with bounded permissions.
- Write a short product brief, user journey, and observable acceptance criteria.
- Read enough HTML/CSS/TypeScript/React to trace a feature and review a change.
- Build a small app with forms, persistent data, authentication, and reviewed ownership policies.
- Independently verify core behavior, error states, and access boundaries.
- Keep secrets and personal data out of public/client surfaces; recognize unsafe defaults.
- Deploy a small app, verify the live version, document limitations, and define recovery/maintenance basics.
- Identify when to narrow scope, stop, or seek specialist help.

## 3. Golden-path stack

- **TypeScript + React + Vite** for the application
- **Tailwind CSS** for styling after the first plain HTML/CSS exercises
- **Supabase/PostgreSQL/Auth** for later persistence and identity
- **Git + GitHub** for version history and collaboration
- **Vercel** for frontend deployment
- **Tool-agnostic AI assistant**; provider-specific UI instructions live in dated companion resources

Alternatives are not a first-chapter decision. The reader may use an approved cloud workspace when local access is unavailable. Provider pricing, minimum versions, dashboard labels, and free tiers must be rechecked before publication.

## 4. Core methods

```text
IDEA → PLAN → BUILD → VERIFY → SHIP → IMPROVE
EXPLAIN → DEMONSTRATE → INVOLVE → VERIFY
FOLLOW → MODIFY → DEBUG → DESIGN → TEACH
```

Apply each repeatedly at both feature and project scale. A model's claim is never a substitute for observable evidence.

## 5. Running project

**TaskFlow** begins as a single-file, local-only task list. It later gains a structured React interface, product brief, responsive/accessibility work, database, reviewed authentication/authorization, tests, deployment, and operating notes. It never collects real sensitive data. A portfolio can be a side exercise; TaskFlow is the primary thread.

## 6. Chapter sequence

The canonical 25-chapter matrix is [`../curriculum/BOOK1_CHAPTER_MATRIX.md`](../curriculum/BOOK1_CHAPTER_MATRIX.md). The order intentionally front-loads a working app, then builds the product/technical model. Five parts: Start building; Solve the right problem; Build TaskFlow; Make it dependable; Release, learn, and choose wisely.

## 7. Chapter pattern

Each chapter states observable outcomes and prerequisites; explains a real situation; gives a simple model and technical detail; includes professional trade-offs, an example or prompt, verification, common failure/recovery, independent practice, teach-back and recap. Use the full 20-section chapter pattern when it adds clarity, not as repetitive filler.

## 8. Safety minimum

Never put server secrets in frontend code, `VITE_` variables, public repositories, or prompts. Use development/prod separation, least privilege, reviewed migrations, RLS ownership checks, backup/recovery, spending guardrails, data minimization, safe handling of untrusted agent input, and human approval for consequential actions. Test permissions at the data/service boundary with separate identities.

## 9. Commercial and production quality

The book's companion ecosystem may include starter files, templates, checklists, and dated links. Commercial release still requires: real beginner beta tests, clean-environment technical reproduction, qualified security review, source checking, accessibility/editing review, and confirmation of the then-current publishing platform disclosure requirements. These are **not yet complete** and must not be marketed as completed.

The ebook should stay approximately 70% evergreen principles and 30% dated walkthroughs, with an errata/update process. Test outcomes are never simulated or attributed to real users without evidence.
