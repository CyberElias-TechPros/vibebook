# Series Editorial Specification

**Working series title:** *The Ultimate Vibe Coding Ebook*  
**Positioning:** Responsible AI-assisted software engineering for people who want to build useful software without surrendering judgment to a model.  
**Editorial promise:** Help readers plan, direct, understand, verify, release, and improve software with AI—without claiming that a beginner becomes a professional engineer overnight.  
**Version:** 1.1 · **Date:** 2026-09-29

---

## 1. The editorial north star

Every chapter must improve at least one of the reader's abilities to:

1. Understand the user's problem and define the desired outcome.
2. Plan a bounded, testable change.
3. Give an AI assistant the right context and safe permissions.
4. Read enough of the code and architecture to make a decision.
5. Verify behavior independently of the model's claim.
6. Protect data and users; know when to stop or seek a specialist.
7. Ship, observe, maintain, and recover the product.

The unit of success is demonstrated competence, not prompt count, lines of generated code, or screenshot polish.

## 2. Series architecture

| Product | Scope | Purpose |
|---|---|---|
| **Book 1 — Foundations** | First working app, product thinking, context, code literacy, web app, data/auth, verification, safety, deployment, maintenance, capstone | Deliver a coherent beginner path and the golden-path project |
| **Book 2 — Production** | Deeper testing, security, brownfield, operations, collaboration, commercial delivery, reliability | Move beyond a small application into sustained professional practice |
| **Book 3 — Agents & AI Products** | Multi-agent workflows, evaluations, RAG, model lifecycle, cost/latency, guardrails | Advanced agent development and AI-enabled products |
| **Specialist playbooks** | Mobile, games, SaaS, e-commerce/payments, automations, extensions, freelancing | Focused context and risk controls for distinct product types |

Do not compress the entire multi-book blueprint into Book 1. Book 1 must be a shippable, teachable product.

## 3. Book 1 audience and positioning

Primary reader: a motivated beginner who has never coded and may have a modest computer, budget, or internet connection. Secondary readers include entrepreneurs, designers, students, and traditional programmers using AI tools.

Promise: the reader can build and explain a modest, tested, deployed web application with AI assistance and professional habits. Do not promise instant mastery, employment, guaranteed revenue, or unsupervised readiness for safety-critical software.

## 4. Golden-path stack

Book 1 defaults to **TypeScript + React + Vite + Tailwind CSS + Supabase (PostgreSQL/Auth) + Git/GitHub + Vercel**. The coding assistant is vendor-agnostic. Alternatives are explained as decisions, not presented as a maze before the learner has built anything.

Tool interfaces, package commands, model names, pricing, quotas, and service policies are perishable. Date walkthroughs, link official documentation, keep a companion update log, and recheck before publication.

## 5. Signature development and teaching methods

**IDEA → PLAN → BUILD → VERIFY → SHIP → IMPROVE** is used for projects and features.  
**EXPLAIN → DEMONSTRATE → INVOLVE → VERIFY** is the lesson rhythm.  
Every major skill progresses through **FOLLOW → MODIFY → DEBUG → DESIGN → TEACH**.

Independent verification is woven into product requirements, code changes, data access, deployment, and capstone assessment. An AI-generated claim is never accepted as evidence by itself.

## 6. Structure and retention

- Put a real first win in the first 30–60 minutes. Begin with a browser-only app; introduce stack and theory after the reader has seen behavior.
- Use one evolving TaskFlow project plus short side exercises rather than many disconnected projects.
- Teach project context early (project map, decisions, instructions, safe context, hostile input).
- Include retrieval practice, teach-back, independent exercises, self-assessment, and explicit fast paths.
- Teach failure diagnosis, psychology, scope management, and when to stop—not only successful demonstrations.
- Separate evergreen mental models from dated tool walkthroughs (target approximately 70/30).

## 7. Chapter standard

Every substantial chapter should state outcomes, prerequisites, why it matters, simple model, technical foundation, professional practice, worked example, AI workflow, trade-offs, common failures, risk controls, independent exercise, verification, teach-back, knowledge check, recap, and next step. Avoid padding by forcing sections that do not add value; retain the intent and say when a section is not applicable.

## 8. Style and communication

- Clear, calm, concrete, respectful of beginners; never patronizing or hype-driven.
- Introduce technical terms with a plain-language explanation, then use the precise term consistently.
- Prefer short steps, examples, tables, annotated code, diagrams, and observable outcomes.
- Distinguish fact, assumption, opinion, and dated provider behavior.
- Explain why a prompt is written as it is; never sell magic phrases.
- When a tool behaves differently, teach the concept and an adaptation path instead of blaming the reader.
- Include low-resource and cloud alternatives where useful; do not assume every reader has a recent laptop or stable broadband.

## 9. Core differentiators

- A first app in 30–60 minutes, not a theory-only opening.
- Context engineering as an early discipline.
- Independent verification across the whole book.
- A dedicated **When Not to Vibe Code** decision framework.
- A memorable **Failure Museum** (symptoms → root cause → diagnosis → recovery → prevention).
- Teach-back and 0–4 skill progression (copied → modified → debugged → designed → taught).
- Real beginner beta testing; simulated usability testing is not a substitute.
- Evergreen/perishable split and a dated companion reference site.
- Honest product and capability claims.

## 10. Safety, scope, and boundaries

Teach secrets hygiene, least privilege, separate environments, backups, safe migration review, API spend limits, data minimization, untrusted repository content/prompt injection, authorization, RLS, webhook verification, idempotency, rollback, and human approval for consequential actions.

Clearly identify specialist-review triggers for regulated/high-impact domains, medical/financial decisions, safety-critical systems, cryptography, kernel/firmware, and other areas outside beginner scope. This is educational guidance, not legal/security certification.

## 11. Research and technical integrity

Maintain a source register with official references, access/verification dates, and the chapters supported. Verify API names, packages, and configuration against primary documentation; do not invent examples or claim cross-platform testing without evidence. Every code tutorial gets a clean setup and reproducible validation record. Security/deployment material receives qualified human review before commercial release.

## 12. Assessment and release gates

Skill levels: 0 Copied, 1 Modified, 2 Debugged, 3 Designed, 4 Taught. A capstone must include a repository, product brief, test evidence, access/data explanation, limitations, recovery plan, and reflection.

Release gates include technical reproduction, safe defaults, genuine non-programmer testing, source tracing, accessibility checks, human security review, copy edit, and current platform/AI disclosure compliance. Do not label a draft validated until the evidence is recorded.

## 13. Product ecosystem

The ebook may be sold with reusable templates, prompts, checklists, starter repositories, dated references, and optional video. Any premium human review or certificate must be a service the publisher can actually deliver. Pricing and platform terms are business decisions to validate, not guarantees in the manuscript.

## 14. Versioning and upkeep

Version the manuscript semantically. Mark each chapter **evergreen** or **dated**, include last-verified metadata when technical behavior is checked, and maintain an errata/update process. A stale walkthrough is either corrected in the companion resources or explicitly flagged; do not allow a screenshot to silently become instruction.

## 15. Current manuscript status

Book 1 drafting is underway in `chapters/book1/`. See `curriculum/BOOK1_CHAPTER_MATRIX.md` for the scope and `chapters/book1/00-front-matter.md` for the reader-facing manuscript. No beginner beta test, cross-platform technical QA, or human security review is claimed complete.
