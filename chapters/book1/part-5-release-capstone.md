# Part V — Release, learn, and choose wisely

## Chapter 21 — Deploy a real release and verify the live app

### What you will be able to do
You can prepare a production build, connect a repository to a hosting provider, separate preview and production configuration, and prove that the deployed core journey works.

### Deployment is a change, not a button
A development server runs on your computer. A deployment publishes a specific build to a hosted environment, where other people can reach it. A successful deployment is not the same as a correct or safe product. Before release, confirm scope, tests, access rules, environment values, privacy text, costs, and a recovery path.

### Release checklist

1. **Freeze the intended scope.** Review the product brief and acceptance criteria. Remove experimental screens and test data that should not ship.
2. **Check source changes.** Read `git status` and the full diff. Search for secrets, debug output, test accounts, and placeholder claims.
3. **Build locally.** Run the documented production build command (for the Vite starter, typically `npm run build`) and inspect the result. A successful build is one signal, not acceptance.
4. **Review configuration.** Set only needed environment variables in the hosting provider. Frontend variables are public. Keep secret server values out of a Vite client bundle. Use separate development and production service projects/credentials.
5. **Deploy a preview first.** Connect the repository to your chosen host using its current official Vite guide. Review the preview URL as a tester, not just as the author.
6. **Test the real user journey.** Use a fresh browser session and appropriate test accounts. Check add, complete, delete, sign-in, owner isolation, error states, keyboard operation, and narrow layout.
7. **Check observability and cost.** Know where deployment errors, service health, and usage alerts appear. Confirm someone will notice a failure.
8. **Promote deliberately.** Record the commit, date, changes, known limitations, and rollback or recovery process before production.

Provider dashboard labels and free-tier terms change. Use the current deployment documentation; do not trust old screenshots as instructions.

### Verify the public app independently
Open the deployed URL in a private/fresh browser session. Do not rely on a tab that still has local state or a cached development build. Check the URL uses HTTPS where expected, browser console/network errors, API responses, data access, and the exact acceptance criteria. Ask another person to complete the main task without coaching.

If the release exposes another user's data, leaks a secret, or causes an unexpected charge, remove public access or disable the affected feature, preserve diagnostic evidence, and involve a qualified person. Do not make rushed database edits in production without a recovery plan.

### AI workflow
Ask an assistant to review a **redacted** deployment checklist and config diff. It may identify a missing variable or mismatch; it cannot prove a secure deployment. Never paste secret values. Do not authorize a coding agent to publish or change production settings without a human reviewing the exact action and consequences.

### Checkpoint
- The local production build completes.
- Preview and production use the intended, separate configuration.
- No server secret is present in client assets.
- The deployed app passes the acceptance checks in a fresh session.
- You have a release note and a documented recovery path.

**Recap:** Ship a known commit, not a hopeful conversation. A live URL is the start of verification, not the end.

---

## Chapter 22 — Operate what you ship: monitoring, backups, costs, and maintenance

### What you will be able to do
You can create a small runbook, choose a useful health signal, describe a backup and restore test, and schedule routine maintenance.

### Launch starts a new responsibility
After release, people may depend on the app. Someone must know whether it is available, how to identify a failure, how to respond, what recovery means, and when the service should be retired. “It worked on launch day” does not answer those questions.

For a small learning product, begin with a one-page runbook:

- **Owner and contact:** who responds?
- **Critical journey:** what must a user be able to do?
- **Health signals:** errors, uptime, failed requests, service usage, and where to view them.
- **Incident response:** how to disable a risky feature or roll back a frontend release.
- **Data recovery:** what is backed up, how often, who can restore it, and what data loss is acceptable?
- **Cost guardrail:** current provider limits, alerts, budget, and shutdown trigger.
- **Maintenance:** dependency updates, access reviews, backup tests, and privacy requests.

### Backups only count if you can restore
A backup is a copy intended to support recovery. A snapshot that cannot be restored is not a recovery plan. Decide the maximum acceptable data loss (**recovery point objective**) and maximum acceptable time to restore (**recovery time objective**) in plain language. For a practice app, “I can recreate the demo in an hour” may be enough; for a business, qualified planning is needed.

Test restoring to a separate development environment. Never experiment with restore steps against the only production copy. Database backups do not necessarily include uploaded files, provider settings, or DNS configuration; inventory each service.

### Observe without over-collecting
A useful metric answers a question. “Can a signed-in user add a task successfully?” may be measured with a privacy-conscious event or error signal. Do not collect keystrokes, task titles, session secrets, or more personal data than you need. Tell users what is collected and follow applicable privacy rules with qualified advice.

Set usage alerts for AI, hosting, storage, email, and external APIs. Free plans, quotas, and prices change; never promise a product is free forever. Rate limits, abuse controls, and spending caps are part of the design.

### Maintenance rhythm

- **Weekly at first:** review errors, support messages, usage and unexpected access.
- **Monthly:** check costs, active dependencies, account access, and backup status.
- **After a major change:** run the critical user journey and permission tests.
- **Periodically:** rehearse restore and incident steps; remove unused accounts/secrets.

These are a starting cadence, not a universal service-level agreement. Increase rigor as user impact grows.

### Checkpoint
A friend should be able to answer from the runbook: “What do I check first if TaskFlow stops saving?” If the instructions are hidden in the original builder's memory, documentation is incomplete.

**Teach back:** Why is a database backup different from a Git commit? What would you do if your API usage suddenly tripled?

**Recap:** Operate for failure. Measure only what you need, set cost boundaries, and prove recovery before you need it.

---

## Chapter 23 — Rescue a codebase you did not create

### What you will be able to do
You can take a safe first look at an unfamiliar repository, establish a baseline, map key flows, and make a small characterized change without starting with a rewrite.

### First, protect the evidence
A half-working project is not an invitation to replace everything. It may contain behavior users rely on, unpublished work, secrets, or undocumented business rules. Before editing:

- Confirm you are authorized to access and change the repository.
- Ask whether it contains customer data, credentials, or regulated information.
- Preserve an original copy or known commit; confirm the restore route.
- Do not upload private code to an unapproved AI service.
- Check `git status` and do not overwrite another person's uncommitted work.

If ownership or permission is unclear, stop and ask.

### Build a map before a fix
Use a read-only pass:

1. Read the README, package manifest, environment examples, and existing instructions.
2. List the top-level folders and identify entry points.
3. Find build, test, and run scripts; do not run unknown scripts blindly.
4. Inspect Git status and recent history.
5. Run safe, documented tests in an isolated environment.
6. Trace one user-critical flow from screen to data store.
7. Record errors, missing tests, and unknowns separately from facts.

Ask an assistant to prepare a repository map with file paths and evidence. Have it label “observed,” “inferred,” and “unknown.” Verify a sample of its claims by opening the files. A plausible folder summary is not proof that it understood the domain.

### Characterize before changing
When behavior is poorly documented, add a test or written reproduction that captures what the app currently does. This is a **characterization check**: it protects existing behavior while you learn. Then choose one low-risk defect or user pain, write an acceptance criterion, change one slice, and run both the baseline and new check.

Do not start with a “complete refactor,” dependency upgrade, or AI-driven rewrite. A rewrite can discard invisible behavior and multiply risk. Stabilize first: restore a reproducible build, add a few tests around critical flows, remove exposed secrets through proper rotation, and create a change plan.

### Rescue report

```text
What runs:
Critical user flows:
Data sources and access boundaries:
Build/test status (commands and results):
Known defects:
Unknowns / questions for owner:
Secrets or personal data observed (do not copy values):
Smallest safe next change:
Recovery plan:
```

Never include a secret's value in this report. Escalate exposed credentials to their owner for rotation.

### Practice and checkpoint
Use a disposable sample repository. Write a map and baseline before changing one label or validation rule. Your change passes only if the existing critical flows still work and the new acceptance check passes.

**Teach back:** Why can a rewrite be riskier than a small patch? What is the difference between an observed fact and an inference in a codebase audit?

**Recap:** Stabilize before improving. Map, characterize, and preserve existing behavior before changing unfamiliar software.

---

## Chapter 24 — When not to vibe code: boundaries and the Failure Museum

### What you will be able to do
You can classify a proposed project by risk, name conditions that require specialists, and diagnose common AI-building failures before they reach users.

### A decision matrix, not a dare
AI assistance can help with prototypes, learning, low-risk internal tools, and well-reviewed product work. It does not transfer responsibility to the model. The more harm a defect could cause, the more independent expertise, testing, and governance are required.

| Project / use | Reasonable next step |
|---|---|
| Personal portfolio, disposable prototype, non-sensitive utility | Build in a sandbox; state limitations; verify behavior |
| Public app with accounts or personal data | Get an experienced engineer/security reviewer before launch; test privacy, auth, recovery, and operations |
| Payments, sensitive financial data, health, children, legal/regulated decisions, critical infrastructure | Do not deploy an AI-built implementation without qualified domain, security, legal/compliance, and engineering review |
| Safety-critical control, cryptographic primitive, kernel/firmware with physical consequences, high-assurance systems | Out of scope for this book; use specialist engineering processes and independent formal review |

This is a learning guide, not a legal classification. Laws, duties, and risk differ by country and use case. “Prototype only” does not mean it is safe to collect real data or expose a real user to a dangerous decision.

### Psychology of vibe coding: know when the loop is hurting

AI makes it cheap to request “one more change.” It does not make every next change wise. Notice these patterns:

- **Prompt-and-pray loop:** each answer triggers a larger prompt, but nobody can state what changed. Stop, restore a known checkpoint, write the observed failure, and run one diagnostic check.
- **Sunk-cost spiral:** you keep patching because the app has already consumed a weekend. Past effort is not evidence that this is the right product. Compare the cheapest recovery, rewrite, or stop options against the actual user need.
- **Scope hypnosis:** every new idea feels essential. Return to the brief; put attractive extras in a parking lot and finish one vertical slice.
- **Imposter story:** “I do not understand this instantly, so I cannot build software.” Confusion is a signal to reduce the slice, ask a better question, and practice—not a verdict on your intelligence.
- **Frustration spike:** you are tired, the assistant is repeating itself, and changes are getting riskier. Pause. Save evidence, stop the agent, and return with a fresh verified summary.

A **reset protocol**: stop edits → preserve the current state → write expected vs. actual behavior → identify the last known good checkpoint → ask a read-only question or a qualified person → choose a smaller next step. Sometimes the right reset is to abandon the feature or project.

### The Failure Museum
Keep this checklist near every release. For each hazard, use the full cycle: **symptoms → root cause → diagnostic → recovery → prevention**. The table is an alert list, not proof that a system is safe.

- **Public database with no row rules.** *Symptoms:* anonymous or other-user reads succeed. *Root cause:* missing RLS, broad grants, or permissive policy. *Diagnose:* test signed-out, User A, and User B directly against the data API. *Recover/prevent:* disable exposure; preserve evidence; review grants/policies; test deny cases before release.
- **Secret shipped in frontend.** *Symptoms:* a key appears in source, built assets, logs, or a public repo. *Root cause:* a server credential was treated as browser configuration. *Diagnose:* search source and built assets; inspect commit history/network traffic. *Recover/prevent:* revoke/rotate immediately; move it to server-side secret storage; scan before redeploy.
- **Sign-in mistaken for authorization.** *Symptoms:* users can access guessed IDs or another user's rows. *Root cause:* UI hiding was treated as data security. *Diagnose:* try direct read/update/delete as a second identity. *Recover/prevent:* restrict at the trusted data layer; test ownership for every operation.
- **Unbounded API/AI bill.** *Symptoms:* usage spikes without an alert or cutoff. *Root cause:* no quotas, abuse controls, or budget owner. *Diagnose:* review provider usage and request volume. *Recover/prevent:* pause/limit the integration; investigate; set caps, alerts, rate limits, and a shutdown path.
- **Hallucinated package or API.** *Symptoms:* installation fails or behavior differs from instructions. *Root cause:* plausible model output was accepted without a source check. *Diagnose:* check the exact name/version in official docs and the package registry. *Recover/prevent:* remove an unneeded dependency; add only reviewed, reproducible dependencies.
- **Polished screen, hollow core.** *Symptoms:* buttons do nothing or data never saves. *Root cause:* screenshot-led development with no acceptance criteria. *Diagnose:* follow each visible control through UI, request, and storage. *Recover/prevent:* narrow scope; implement one vertical slice; verify it end-to-end.
- **Unverified payment webhook.** *Symptoms:* a forged or duplicate event marks an order paid. *Root cause:* a browser redirect was trusted; signature/idempotency was omitted. *Diagnose:* send invalid and duplicate sandbox events. *Recover/prevent:* disable settlement; use the provider's server verification; require specialist review.
- **Prompt spaghetti.** *Symptoms:* contradictory chats and repeated regressions. *Root cause:* no bounded tasks or current project context. *Diagnose:* compare code, brief, and decision notes. *Recover/prevent:* stop edits; restore a checkpoint; summarize verified state; resume one slice.
- **Patch without root cause.** *Symptoms:* the same symptom returns in a new form. *Root cause:* a fix was chosen before reproduction/evidence. *Diagnose:* reproduce; inspect logs/state; test a hypothesis. *Recover/prevent:* restore if needed; isolate the cause; add a regression test.
- **Vibe debt.** *Symptoms:* nobody can explain or safely change the code. *Root cause:* generated code was accepted without ownership or maintenance. *Diagnose:* ask another person to trace a feature and make a small change. *Recover/prevent:* stabilize, document, test, refactor incrementally, and budget upkeep.

### Stop signals
Pause and seek an accountable human expert when the system handles sensitive or regulated data, can cause physical/financial harm, makes consequential decisions, processes payments, has an unexplained access-control failure, or depends on security claims you cannot test. Also stop when the owner cannot explain data use, retention, deletion, or recovery.

The responsible answer may be “not with this tool,” “not without a review,” or “do not build this.” That is professional judgment, not a lack of ambition.

### Practice
Choose a product idea and write: worst credible harm, data handled, affected people, who can access it, legal/operational constraints, independent reviewers needed, and what evidence would lower risk. Classify it in the matrix and defend the decision.

**Teach back:** Which Failure Museum hazard is a UI test unable to prove absent? When is “ask the AI one more time” the wrong next step?

**Recap:** Know your boundary before launch. A responsible builder can refuse, narrow scope, or ask a qualified person to take over.

---

## Chapter 25 — Capstone: plan, build, defend, and improve your own product

### What you will be able to do
You can choose a bounded, low-risk problem, plan a complete user journey, build and verify one release, explain its limitations, and identify the next evidence you need.

### Choose a capstone that fits your current skill
Choose one problem you can explore without collecting sensitive information or making high-impact decisions. Examples: a personal reading log with fictional data, an event checklist, a volunteer shift board with no public personal data, or a small portfolio/contact page using a safe contact workflow.

Do not choose “a full marketplace with payments and identity checks” as your first independent release. Scope is part of engineering.

### The capstone contract
Create a repository with:

- `README.md` — purpose, setup, current limits, and how to verify.
- `docs/PRD.md` — problem, user, scope, non-goals, data, acceptance criteria.
- `docs/PROJECT.md` — stack, run/test commands, data boundaries, project map.
- `docs/DECISIONS.md` — meaningful decisions, reasons, revisit conditions.
- A working deployed or locally demonstrable product, depending on risk and resources.
- Tests and a manual verification checklist proportionate to the risk.
- A short runbook: monitoring, cost, backup, and recovery.
- A reflection: what was AI-generated, what you reviewed, what you could not verify, and what needs expert input.

Build in milestones. After each, inspect the diff, run checks, test a user path, update the project notes, and commit. A smaller complete release is better evidence of competence than a giant mockup with unfinished behavior.

### Capstone defense
Present the app to someone who did not build it. Let them try the main flow without coaching. Then answer:

1. What user problem does this solve, and what evidence supports that?
2. Which data does it collect, where does it live, and who can access it?
3. What is the most important acceptance test? Show it running.
4. What happens when a dependency or network call fails?
5. What have you not tested or reviewed?
6. What is the recovery path if the next release breaks?
7. What would make you stop or seek specialist help?

If you cannot answer, treat the gap as work—not as a reason to conceal the limitation.

### Competence rubric
Score each area honestly from 0 to 4. A high overall score does not cancel a critical safety failure.

| Score | Evidence |
|---:|---|
| 0 — Copied | Reproduces a guided example with substantial assistance. |
| 1 — Modified | Makes a bounded change to a known solution and checks the visible result. |
| 2 — Debugged | Reproduces a defect, uses evidence, and adds a regression check. |
| 3 — Designed | Independently plans a small feature, implements it, and verifies acceptance criteria. |
| 4 — Taught | Explains decisions, limitations, failure modes, and guides another person through a safe change. |

Use the rubric for product discovery, prompting/context, interface, code/data, verification, security, release, and maintenance separately. Mark a skill **not yet demonstrated** if you have only watched a tutorial or read an AI explanation.

### Your 30 / 60 / 90-day path

- **First 30 days:** repeat the IDEA → PLAN → BUILD → VERIFY loop on two small projects; get comfortable reading diffs, using Git, and writing acceptance criteria.
- **By 60 days:** build one app that persists non-sensitive data; test its access rules and failure states with another person; document a deployment and recovery path.
- **By 90 days:** choose a project aligned with your goals, get an independent review, improve it from actual feedback, and publish a truthful portfolio case study showing decisions and limitations.

These are adaptable practice windows, not a guarantee of employment or mastery. Slow down for accessibility, security, or product work that affects real people.

### Final review
Return to the five diagnostic questions in the front matter. Answer them from your own project. Then ask one person to explain what they think your app does and what it stores. If their understanding differs from the product, improve the design or disclosure.

**The finish line is not “AI wrote the app.”** It is: “I can explain the goal, inspect the implementation, demonstrate the important behavior, name what remains uncertain, and make a responsible decision about release.”

**Recap:** Capability means more than generation. Plan, direct, understand, verify, ship responsibly, and keep learning from real use.
