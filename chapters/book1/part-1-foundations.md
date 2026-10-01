# Part I — Start building

## Chapter 1 — Your first working app: TaskFlow in one file

### What you will be able to do
By the end of this chapter, you can open a tiny app, add a task, complete it, remove it, make one controlled change with AI, and explain what happens when you refresh.

**You need:** a current browser, a text editor, and the companion folder `projects/01-first-app/`. You do not need an account, terminal, paid tool, or internet connection after you have the files.

### Start with the result
Open `projects/01-first-app/index.html` in your browser. You should see a calm, one-page task list with a sample action. Add “Write the first paragraph,” check it, uncheck it, remove it, and try submitting an empty form. Then refresh the page.

Notice what happened: the visible list was reset. That is not a hidden bug. This version intentionally keeps its tasks in the running page's memory; it does not save them to a file or send them to a server. The app tells you that. A professional interface should not imply persistence or privacy it has not earned.

### The simple model
An application is a set of instructions that turns input into a result. Here, you type a short action; the browser checks it, adds it to an in-memory list, redraws the list, and updates a status message. A checkbox changes one value. A remove button removes one item. The page is small enough that you can inspect the whole system.

The project is intentionally one file. It contains **HTML** (the page's structure), **CSS** (its appearance), and **JavaScript** (its behavior). A real product separates these concerns as it grows. We are not using one file because it is the best architecture for every app; we are using it because the first feedback loop should be short.

### The first AI-assisted change
Before changing anything, save a copy of the starter in a folder you control. If your AI tool can edit files, open that folder as the project. If it only chats, ask for a small replacement or patch, inspect it, then paste only the part you understand. Do not paste secrets or personal records; this project needs none.

Use this prompt:

> **Task:** In this one-file TaskFlow learning app, change the sample task to “Sketch the next small step” and change the document title to “TaskFlow — my next step.”  
> **Context:** It is a browser-only educational demo in `index.html`. Tasks are in memory and reset on refresh.  
> **Boundaries:** Make only these two content changes. Do not add packages, network calls, analytics, storage, or new files. Do not rewrite the design or behavior.  
> **Acceptance:** The browser tab title and initial task show the new wording. Add, complete, remove, and blank-input behavior still work.  
> **Process:** First tell me where you will make the changes. Then make them. Report the exact changes and give me a manual test. Do not say you tested anything unless you actually ran the test.

Read the assistant's plan. If it proposes changing task behavior or adding a library, stop and ask why. After the change, inspect the diff or compare the two text lines. Reload the page and complete the acceptance checks yourself. A confident explanation from the assistant is not verification.

If your tool cannot edit files, make the two changes yourself: edit the `<title>` text and the sample task string in the `tasks` array. Save, refresh, and check both places. This is not “cheating”; knowing where a change belongs is part of the work.

### Verification checkpoint
You pass this first checkpoint when you can demonstrate all of the following without relying on an AI claim:

- The starter task is visible when the page opens.
- A short task can be added; a blank or whitespace-only entry is rejected.
- A task can be checked and unchecked; the status count changes.
- A task can be removed.
- The page explains that refresh resets the list.
- After refresh, the sample task returns and your newly added item is gone.
- You can point to the title and sample task text you changed.

The source uses `textContent` and creates HTML elements through browser APIs instead of treating a person's task as executable markup. That small choice will matter when we discuss untrusted input later.

### What can go wrong?

| Symptom | Likely cause | First diagnostic |
|---|---|---|
| Browser shows code as text | The file may have been saved with `.txt` at the end | Check the exact filename and extension |
| Page does not change after saving | You are viewing an older tab or unsaved copy | Save, refresh, confirm the tab points to your edited file |
| Add button appears to do nothing | The browser may have rejected blank input or the script has an error | Try a short nonblank task; check the browser console only if needed |
| A task disappears after refresh | That is expected in this version | Persistent storage is a later feature, not a promise of this demo |
| AI rewrites the whole file | The task was too broad or boundaries were ignored | Restore your saved copy; ask for a two-line patch |

Never solve a broken page by repeatedly asking “fix it” without checking what changed. Keep the working starter; compare one small change at a time.

### Your turn
**Modify:** Change the starter task to an action from your own day.  
**Debug:** Ask a partner or an assistant to point to the input validation and to explain what would happen if it were removed. Do not accept a guess—test blank and whitespace-only input.  
**Design:** Add a second sample task. Write down what should happen to the status count before editing.  
**Teach back:** In your own words, explain why a refresh clears this version's tasks, and name one change needed to make tasks persist.

### Knowledge check
1. Which part of the app is structure, appearance, and behavior? **Answer:** HTML, CSS, and JavaScript respectively.
2. Does the app send a task to a server? **Answer:** No. It runs in one browser page and makes no network request.
3. If the AI reports “all tests pass,” but you have not seen a test run, what do you know? **Answer:** Only that the AI made a claim. You still need observable evidence.

**Recap:** Make the smallest useful thing run first. Tell the truth about its limits. Change one thing at a time and test the behavior yourself.

---

## Chapter 2 — What you just built: pages, browsers, servers, and data

### What you will be able to do
You can explain the difference between a file opened on your computer and an app hosted for other people, and trace a simple request from a browser toward a server and database.

**Prerequisites:** Chapter 1. No new tools are required.

### A map, not a pile of jargon
When you opened `index.html`, your browser read a local file and ran its instructions. The address bar likely began with `file://`. No public website, login service, or database was involved.

A hosted web app has more pieces. A simplified picture is:

```text
Person → browser (frontend) → network request → server/API (backend) → database
                 ← rendered response / data ←
```

- **Frontend:** what runs in a browser or app on the person's device. It displays information and responds to interaction.
- **Backend:** code running somewhere the product owner controls. It enforces rules, performs trusted work, and may call other services.
- **API:** a defined way for one program to request information or an action from another. An API is a contract, not magic.
- **Database:** an organized place to store and retrieve records, with rules about relationships and access.
- **Server:** a computer or managed service that waits for requests and responds. “Server” names a role, not necessarily a machine in your office.
- **URL:** an address that identifies a web resource. `https://example.com/tasks` and a local `file://` address do not mean the same thing.

A browser may draw a polished screen even when no real data is behind it. That is why a screenshot is weak evidence for a complete app. Ask: where did this value come from, where is it stored, which code enforces permission, and what happens when the network fails?

### Trace one TaskFlow action
In Chapter 1, the task text starts in an input field. The JavaScript reads it, checks that it is not blank, adds it to an array in memory, and updates the displayed list. Because the array exists only while the page is running, refresh starts the script again and recreates the sample list.

Later, when TaskFlow uses a hosted database, the path changes:

1. A person submits a task in the browser.
2. Frontend code sends a request to a service using a documented API.
3. The service checks the request and the user's identity.
4. Database rules decide whether that user may insert or read that row.
5. The service returns a success or error response.
6. The interface shows the result—and gives a useful recovery path if it failed.

The browser is not a trusted place to hide a powerful secret. Anything shipped to a browser can be inspected by its user. Permission must be enforced by the trusted service/database, not just by hiding a button in the interface.

### Three useful distinctions

**Website vs. web application.** The words overlap. A “website” may mainly publish information; a “web app” usually supports ongoing interaction or user-specific state. Both can contain frontend code and both can have security needs.

**Authentication vs. authorization.** Authentication asks, “Who are you?” Authorization asks, “What are you allowed to do?” A sign-in screen can authenticate a person while a broken data rule still lets them read another person's records.

**Demo vs. production.** A demo proves that a narrow path can be shown. Production software must also consider real users, failures, access control, privacy, cost, support, recovery, and change over time. “It loaded once” is not a production standard.

### AI workflow: ask for a trace, not a rewrite
Give the assistant this request with the Chapter 1 file open:

> Do not edit any files. Trace what happens when a person adds a task, using the actual code in `index.html`. Name the element, event handler, data structure, rendering step, and where the data lives. Quote the relevant identifiers. If you cannot locate something, say so. End with one test I can perform to distinguish in-memory data from saved data.

Check every quoted name in the file. If the assistant describes a server or database, ask it to point to the request code. There is none in this first version. This is a small exercise in independent verification: claims should connect to evidence.

### Practice and teach-back
Draw two boxes: **local demo** and **hosted app**. Put browser, frontend code, backend/API, database, and network where they belong for each version. Mark which version can work offline. Then explain what changes if the same task must be available on a second device.

**Answer key:** The local demo runs in one browser and keeps tasks in page memory, so it needs no network and loses changes on refresh. A cross-device version needs a persistent service or synchronized storage, network requests, identity/access rules if data is private, and a way to handle failures. Do not jump straight to “add a database” without defining privacy and access behavior.

**Recap:** Learn the path the data takes. Screens are not proof of storage or permission. Keep the client, server, and database responsibilities distinct.

---

## Chapter 3 — Set up your safe workshop

### What you will be able to do
You can create and run the book's TypeScript/React starter, find the important project files, and record a local checkpoint before an AI assistant edits the code.

**Prerequisites:** Chapters 1–2, a laptop/desktop or an approved browser-based development workspace, and a current Node.js/npm installation if working locally.

### Why the book chooses one path
A beginner can lose more time comparing frameworks than learning to build. The book's default is **TypeScript + React + Vite + Tailwind CSS + Supabase + Git/GitHub + Vercel**. We will introduce each piece when it solves a need. You can use a different editor or AI assistant; the mental model remains the same.

A browser-only workspace can be a useful alternative when installation is blocked or the computer is underpowered. It still needs a trustworthy provider, a recoverable export, and care about where code and project data are stored. Do not upload confidential code to an unapproved service.

### Set up the first React project
The Vite command and minimum supported Node versions are dated details. At the time this draft was checked against Vite's documentation (29 September 2026), the getting-started guide lists Node.js 20.19+ or 22.12+ and includes a `react-ts` starter. Check the official guide if it has changed before following these exact commands.

Open a terminal (PowerShell on Windows; Terminal on macOS/Linux), then run:

```bash
npm create vite@latest taskflow -- --template react-ts
cd taskflow
npm install
npm run dev
```

The terminal prints a local address, commonly `http://localhost:5173`. Open the exact address it prints. Keep the terminal running while you work; stop the dev server with **Ctrl+C** when finished. The starter screen should appear.

What just happened? `npm create` ran a project generator; `npm install` fetched the dependencies described by the project; `npm run dev` ran the development script from `package.json`. `src/` is where the app code lives, `index.html` is the browser entry point, and `package.json` describes scripts and dependencies. Do not delete files just because you do not recognize them; ask what owns them first.

If the command fails, capture the exact error and your operating system. Do not guess by installing several runtimes on top of each other. Check the companion troubleshooting sheet and the official Vite guide. If a school or employer manages the computer, ask before changing system settings.

### Make a safe checkpoint
Version control is a history of deliberate changes. Git helps you compare work and return to a known code state; it is not a substitute for backing up a production database.

From the project folder, inspect the files before staging:

```bash
git init
git status --short
```

Review the file list. Confirm that secrets and personal data are not present and that generated files are ignored. Then stage, inspect the staged change, and commit:

```bash
git add .
git diff --cached --stat
git diff --cached
git commit -m "chore: create TaskFlow starter"
```

If Git says it does not know your name or email, configure an author identity locally or follow Git's official setup. Do not put passwords or tokens in Git configuration. A local commit stays on your computer. GitHub is a separate hosted service you can connect later; you do not need a public repository to begin.

Never commit `.env` files, access tokens, private keys, database exports with personal data, or client secrets. A `.gitignore` file helps keep common generated files out of history, but it cannot undo a secret already committed.

### Give your assistant a safe workspace
Open only the practice project in the coding assistant. Start with read access or ask for an explanation before enabling file edits. Review proposed file changes before accepting them. For the first few chapters, do not grant access to production accounts, payment systems, personal folders, or databases.

Reject or inspect high-impact actions: deleting files, changing Git history, installing unknown packages, running a shell command you cannot explain, changing database permissions, or deploying. A coding assistant may be useful, but its access should be no larger than the task requires.

### Verification checkpoint
- You can start and stop the Vite development server.
- You can find `src/`, `index.html`, and `package.json`.
- The command and local page work in your environment, or you documented the exact blocker and used an approved alternative.
- `git status` shows the project state; your initial commit exists locally.
- You know where secrets must not go and why a Git commit is not a database backup.

**Stretch:** Open `package.json` and explain what script `npm run dev` runs. Ask AI to explain it without editing; verify its answer against the file.

**Recap:** A good environment is reproducible, inspectable, and recoverable. Keep the first workspace harmless and the tool permissions small.

---

## Chapter 4 — Direct the assistant: prompts that produce inspectable changes

### What you will be able to do
You can turn a fuzzy request into a bounded work contract, ask for a plan before a change, and evaluate the result using evidence rather than confidence.

### A prompt is a work contract
A coding prompt should answer six questions:

1. **Task:** What small outcome do you want?
2. **Context:** Which files, users, behavior, and constraints matter?
3. **Boundaries:** What must not change? What access or data is off limits?
4. **Acceptance:** What observable behavior means “done”?
5. **Process:** Should the assistant inspect, plan, ask, edit, or stop for approval?
6. **Evidence:** Which tests or checks should be reported—and which have actually run?

“Make the app better” hides all six. “Add a clear empty state to the task list; do not change storage or authentication; show the message only when there are zero tasks; test both zero and nonzero tasks; summarize the changed files” is work someone can review.

### The smallest safe loop

```text
INSPECT → PLAN → APPROVE → CHANGE ONE SLICE → VERIFY → RECORD
```

For a small task, a written plan can be one sentence. For a database migration or deployment, the plan should be explicit and human-approved. If the assistant finds unexpected architecture or a security-sensitive dependency, stop and revise the plan instead of letting it improvise.

### A reusable task prompt

> **Outcome:** [one observable change]  
> **Context:** [relevant user flow, files, existing decisions]  
> **Do not:** [explicit non-goals and sensitive actions]  
> **Acceptance checks:** [steps and expected results]  
> **Workflow:** Inspect first. Summarize the current behavior and plan. Wait for approval before [risky action]. Change only the smallest necessary slice.  
> **Evidence:** Run [named checks] if available. Report exact commands and results. Separate checks you ran from checks I still need to perform. List changed files, assumptions, and remaining risks.

The brackets are fields to fill in, not words to send unchanged. Avoid asking the model to “act as a senior engineer” as a substitute for specifying the job. A role label cannot replace context, constraints, or a test.

### Worked example: add a task edit action
A weak prompt says, “Add editing and make it polished.” A better prompt says:

> In TaskFlow, let a person edit the text of one existing task. First inspect the current task flow and explain the smallest plan; do not change files yet. Keep the current in-memory storage. Do not add packages, network requests, authentication, or database changes. Preserve keyboard operation and existing add/complete/remove behavior. Acceptance: a person can start editing one task, save a nonblank value up to the existing limit, cancel without changing it, and see a useful validation message for blank text. After approval, implement this feature only. Run existing checks and report exact commands/results; also give me a manual test for keyboard use. Do not claim an unrun check passed.

The prompt does not prescribe implementation details prematurely. It defines behavior and safety boundaries. If the current UI cannot support a coherent cancel action, the assistant should explain the conflict before writing code.

### Review the answer, not just the prompt
After the assistant responds:

- Compare its plan with your boundaries.
- Inspect the file diff, not only the prose summary.
- Check whether a new dependency is necessary and maintained.
- Run the acceptance flow yourself.
- Ask what was not tested.
- Record a decision if the feature changes architecture.

If it produces a large rewrite for a small task, restore the checkpoint and request a smaller patch. If it gives a plausible package or API name, verify it in official documentation before installing or relying on it.

### Practice
Choose a harmless change to TaskFlow: change the empty-state message, shorten the task limit, or improve a label. Write the six prompt fields first. Ask for an inspect-only plan. Then authorize the change, inspect the diff, and test both the normal case and the boundary case.

**Teach back:** What is the difference between a requirement and an implementation suggestion? Why does “I tested it” need a command or observable result?

**Recap:** Useful prompts reduce ambiguity and blast radius. Define success, limit the change, require evidence, and keep yourself responsible for acceptance.

---

## Chapter 5 — Context engineering: give a project a reliable memory

### What you will be able to do
You can create a small project “brain,” choose what context to provide for a task, and treat untrusted repository content as data rather than as authority.

### Why context matters more than clever wording
An assistant works from the information available in its current session and tool permissions. A new chat may not know last week's decision. A huge prompt may bury the one constraint that matters. **Context engineering** is the practice of selecting, organizing, updating, and protecting the information an assistant needs for this task.

A project brain is not a second codebase. It is a few short documents that answer questions repeatedly and reduce contradictory instructions.

### Start with three small files
Create these in the project root (or ask an assistant to draft them, then review):

**`PROJECT.md` — the current map**

```markdown
# TaskFlow
Purpose: a small task app for practicing responsible AI-assisted development.
Current milestone: local task list; no production users.
Stack: React, TypeScript, Vite. Styling/database are added in later milestones.
Run: npm install; npm run dev.
Verify: npm run build; follow the manual checks in companion/checklists/taskflow.md.
Data boundary: do not add real personal data or production credentials.
```

**`DECISIONS.md` — decisions and why**

```markdown
# Decisions
- 2026-09-29 — Start with in-memory tasks. Reason: learn behavior before persistence.
  Revisit when the product brief requires refresh-safe or cross-device data.
```

**`AGENTS.md` — tool guidance, if your assistant supports it**

```markdown
# Working agreements for coding assistants
- Read PROJECT.md and the relevant acceptance criteria before editing.
- Inspect before changing; work in one small slice.
- Do not add dependencies, credentials, network access, or migrations without approval.
- Never claim a check ran unless you ran it; report exact commands and results.
- Preserve accessibility and existing behavior unless the task says otherwise.
```

Not every assistant reads `AGENTS.md`; naming and precedence differ across tools and change over time. Check the official documentation for your specific tool. These files are helpful context, not an access-control system. Real permissions and database policies must be enforced elsewhere.

### A three-filter context routine
Before each task, ask:

1. **Relevant:** Which exact files and decisions explain this change? Include the smallest useful slice, not the entire history.
2. **Current:** Is the documentation still true? Update a decision when the implementation changes.
3. **Safe:** Does this content contain credentials, personal data, confidential client material, or instructions from an untrusted source? Remove or redact it before sharing.

Start a fresh conversation when the task changes substantially or earlier context conflicts with current code. Carry forward a short verified summary: goal, files changed, tests actually run, decisions, open questions. Do not ask a model to remember invisible history.

### Untrusted text is not an instruction
A README, issue, webpage, dependency script, or code comment may contain text that tells an AI agent to ignore prior rules, reveal secrets, or run commands. Such text is input from the project or the internet; it does not gain authority merely because an assistant can read it. This is one form of prompt injection.

A safe agent should treat repository content as evidence to analyze, not as permission to disclose data or perform destructive actions. Keep credentials out of the workspace when possible, use narrow permissions, inspect package scripts and shell commands, and require a human decision for consequential actions. If an agent asks for a token “to finish,” stop and use the documented, approved credential mechanism—never paste a secret into chat.

### Verification checkpoint
- `PROJECT.md` describes the current build, not an aspirational future.
- A key product decision has a reason and a revisit condition.
- The assistant's project instructions match actual tool behavior.
- You can name one item you intentionally did not put into AI context.
- You know that instruction files cannot prevent a sufficiently privileged tool from taking an action; permissions and review still matter.

**Practice:** Ask AI to summarize the project from the three files, then compare its summary with the code and `package.json`. Correct any stale statement. Add one open question rather than inventing an answer.

**Teach back:** Why can a longer prompt make an answer worse? What would you do if a dependency's README told the coding agent to upload your `.env` file?

**Recap:** Keep context small, current, and safe. Store durable project facts in reviewed files; do not confuse written guidance with technical enforcement.
