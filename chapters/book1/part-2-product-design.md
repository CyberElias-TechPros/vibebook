# Part II — Solve the right problem

## Chapter 6 — Find a real problem before adding features

### What you will be able to do
You can describe a user, the moment they struggle, what they do today, and one small outcome worth testing—without treating your first idea as a requirement.

### Idea is not evidence
“I want an app for productivity” is a direction, not a product brief. “A student who works part-time forgets the next small assignment step when switching between school and work” is a problem hypothesis. It still needs evidence, but at least it names a person, a situation, and a cost.

Product discovery is a disciplined way to learn before paying for code. You do not need a large research budget. You do need honest questions and permission to listen. Do not collect sensitive personal details just because an AI assistant can organize them.

### A 20-minute discovery exercise
Pick a person who plausibly experiences the problem. Explain that you are learning, not selling. Ask about the last real occurrence:

1. “Tell me about the last time you needed to keep track of several small tasks.”
2. “What happened next?”
3. “What did you try? What was frustrating or already helpful?”
4. “How often does this come up, and what does it cost you?”
5. “What would make you keep using a new approach after the first day?”

Avoid leading questions such as “Would you use my AI-powered app?” People are polite, hypothetical enthusiasm is cheap, and a feature suggestion is not a purchase commitment. Record only what you need, with consent. Separate a participant's words from your interpretation.

For TaskFlow, an early hypothesis might be: “People with a few personal commitments want a calm place to keep the next action visible.” The smallest test could be a clickable mockup or a one-week paper list—not a cloud database, subscription system, and team dashboard.

### Rank assumptions by risk
Write assumptions in three columns:

| Assumption | If wrong… | Cheap test |
|---|---|---|
| The person has this problem weekly | Nobody needs the product | Interview about recent behavior |
| A short list is enough | People abandon it | Observe a prototype with three tasks |
| Tasks need to sync across devices | Data architecture changes | Ask what they currently do when switching devices |

Test the riskiest assumption first. A coding agent makes construction cheaper; it does not make the wrong product valuable.

### AI as a research assistant, not a witness
You can ask AI to group anonymized notes or generate follow-up questions, but it did not conduct the interview and may invent patterns. Remove names, contact details, health or financial information, and any material you lack permission to share. Keep an evidence log with the source and date. Never present an AI-generated persona as a real customer.

**Prompt:** “Using only these anonymized notes, list repeated behaviors, contradictions, and unanswered questions. Quote the note IDs that support each observation. Do not invent facts or propose features yet.” Compare each claim with the notes yourself.

### Checkpoint and practice
Write one problem statement in this form:

> When **[specific person]** is **[specific situation]**, they struggle to **[job or outcome]** because **[observed reason]**. Today they **[workaround]**. We will know this is worth exploring if **[evidence]**.

If you have no observation yet, label it a hypothesis. Ask two people about recent behavior, not future intentions. **Teach back:** Why does “users asked for a feature” not automatically mean that feature belongs in the first release?

**Recap:** Begin with a human problem and evidence. Keep assumptions visible and test expensive assumptions before building them.

---

## Chapter 7 — Write a small product brief and acceptance criteria

### What you will be able to do
You can translate a validated problem into a short product brief with a clear first release, explicit non-goals, and behavior another person can verify.

### A brief is a boundary
The product brief prevents scope from dissolving into a list of attractive ideas. Keep it short enough to reread before each AI task. A practical brief contains:

- **Problem and user:** who, when, and why this matters.
- **Outcome:** what should be easier or better.
- **First-release scope:** the smallest complete user journey.
- **Non-goals:** what this release will not do.
- **Assumptions and evidence:** what is known, guessed, or still unknown.
- **Data and risk:** what the app will collect, who can see it, and what must never be collected.
- **Acceptance criteria:** observable behavior that proves each requirement.
- **Open questions:** decisions that require research or review.

Do not state “simple, secure, intuitive” as acceptance criteria. Convert adjectives into behavior. “A person can add a task with a 1–80 character title; whitespace-only input is rejected with a clear message” can be tested. “The app is delightful” needs a user study or a more specific proxy.

### TaskFlow brief, first draft

> **User:** An individual who wants to keep a short list of next actions.  
> **Problem hypothesis:** Larger productivity tools feel like more work than the small list they need.  
> **Outcome:** Create and complete a short personal task list without confusion.  
> **In scope:** Add a task, see it in the list, mark it complete, remove it, explain whether it persists.  
> **Out of scope:** Teams, reminders, calendar sync, payments, AI task generation, sensitive records, cross-device sync, public sharing.  
> **Data:** Initially in-memory demo data; later, task title, completion state, timestamps, and an owner ID. No health, financial, or identity documents.  
> **Acceptance:** A task with a valid title appears once; a blank title is rejected; completion status updates; a removed task is no longer displayed. The first version clearly says refresh resets the list.

This brief is not a promise that the idea has a market. It is a working boundary for learning. Change it when evidence changes—not because an assistant suggests a fashionable feature.

### Write criteria as examples
For each feature, write a happy path, a boundary, and a failure path:

```text
Given the list is open,
When I enter “Call the supplier” and submit,
Then one unchecked task with that exact title appears.

Given the title contains only spaces,
When I submit,
Then no task is created and I receive a clear validation message.

Given the network/database is unavailable,
When I try to save,
Then the app does not pretend the task was stored and offers a way to retry.
```

These are examples, not a substitute for all design decisions. They turn the vague request into testable behavior.

### Use AI to critique the brief
Ask an assistant to identify ambiguous terms, hidden assumptions, missing failure states, and risky data. Require it to quote the brief section that triggered each question. Do not ask it to expand the scope. Decide which questions matter and record the answers in the brief.

### Independent checkpoint
Give your brief to someone who did not write it. Ask them to describe what is in the first release and what is explicitly excluded. If their answer surprises you, rewrite the brief. Save it as `docs/PRD.md` and keep it beside the project instructions.

**Exercise:** Add one requirement for editing a task. Write one positive and one negative acceptance example. Do not add an account or database until the product problem requires it.

**Recap:** A short brief is a steering wheel. Non-goals protect the project from scope creep; observable criteria protect it from “looks done.”

---

## Chapter 8 — Design the journey before the screen

### What you will be able to do
You can map a user's path through a feature, including normal, empty, loading, error, and recovery states, before asking AI to implement a screen.

### A screen is only a moment
A screenshot captures one state. A useful design describes what happens before and after it. For “add a task,” the journey might be:

```text
Open list → enter title → submit → see task → complete or remove
                    ↘ invalid title → explain problem → correct and retry
                    ↘ save failure → preserve draft → retry or cancel
```

Ask what the person sees when the list is empty, a request is in progress, a title is invalid, the connection fails, or an action cannot be undone. A polished happy path with no recovery path is not a complete design.

### Sketch with words first
Before drawing, write:

- **Entry point:** where does the person start?
- **Decision:** what choice do they make?
- **Result:** what visible outcome confirms the choice?
- **Recovery:** what can they do if it fails?
- **Exit:** how do they leave or undo the action?

A low-fidelity wireframe can be a paper sketch, boxes in a document, or an unstyled HTML page. It should show hierarchy and flow, not expensive visual polish. Ask a person to complete a task using the sketch while you watch. Do not explain the interface for them; confusion is useful evidence.

### Example: TaskFlow states

| State | What the person should understand | Useful action |
|---|---|---|
| Empty | No tasks exist yet | Add the first task |
| Editing | Which task is being changed | Save or cancel |
| Saving | The request is still working | Avoid accidental duplicate submission |
| Saved | The task is in the list | Continue or undo where appropriate |
| Invalid | What input needs correction | Return to the field and fix it |
| Failed | Whether the task was saved is known or uncertain | Retry safely; do not silently duplicate |

If a save request times out, the server may have completed it even if the browser did not receive the reply. Retrying blindly can create duplicates. This is one reason distributed systems need careful design; a beginner demo should state its limits rather than pretend it solved them.

### Prompt for critique, not invention

> Review this TaskFlow user journey against the product brief. Do not generate UI code. Identify missing states, ambiguous transitions, accessibility risks, and destructive actions. For each finding, quote the journey step and propose one question I should answer. Do not add features outside the brief.

Then test the critique: Is the gap real? Does it apply to this release? Is the proposed question answered by users, a technical constraint, or a safety policy? AI can help find blind spots; it cannot decide product priorities on your behalf.

### Practice and checkpoint
Map a task-editing flow. Include how the user starts editing, saves a valid title, cancels, encounters a blank title, and recovers. Ask someone unfamiliar with your plan to walk through it. Record where they hesitate.

**Teach back:** Why is an error state part of the product rather than an afterthought? What should happen to a person's typed draft if saving fails?

**Recap:** Design the journey and its recovery states before styling the happy path. Use sketches to learn cheaply.

---

## Chapter 9 — Build a coherent interface with components and a design system

### What you will be able to do
You can turn a simple wireframe into a consistent interface, reuse a component where it helps, and use Tailwind without mistaking classes for design decisions.

### Design systems are shared decisions
A design system can begin as a small set of named choices: a spacing rhythm, readable type sizes, a few colors with clear roles, consistent buttons, and predictable focus styles. It does not need a large enterprise library. The goal is not to make every page identical; it is to prevent every button and gap from becoming a fresh debate.

Before writing classes, set a direction: for TaskFlow, “quiet, focused, warm, and readable” is more useful than “make it pop.” Choose one primary action, one secondary action, and a neutral base. Check contrast and legibility; color should not be the only way to signal status.

### Components have a job
A React component is a reusable unit of interface. A `TaskRow` might display one task and expose callbacks for checking or removing it. A component is useful when it has a clear responsibility, repeated shape, or independent behavior. Splitting every `<div>` into a component creates ceremony; keeping a complex screen in one giant component creates a different problem.

Ask the assistant to propose a component tree before implementing. Review the reason for each boundary. A good tree follows meaningful responsibility, not the number of files an AI can generate.

### Tailwind: an implementation tool, not a design system
Tailwind utility classes express styling decisions close to the markup. The classes do not decide whether your design is accessible, coherent, or suitable for its users. Start with a small number of styles; refactor repeated decisions into shared components or tokens when repetition becomes real.

**Dated setup note — 2026-09-29:** The Tailwind Vite guide currently uses the `tailwindcss` and `@tailwindcss/vite` packages, a Vite plugin, and `@import "tailwindcss";` in the CSS entry file. Setup changes by major version; check the official guide linked in `companion/references/official-docs.md` rather than mixing instructions from different versions.

For a Vite React project, the shape of the configuration is:

```ts
// Keep the React plugin already in your vite.config.ts.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

The CSS entry then imports Tailwind. Follow the currently published setup exactly; do not copy an older tutorial's PostCSS configuration into a new major-version setup without checking compatibility.

### Ask AI for a design implementation you can evaluate
Give it the product brief, wireframe, existing tokens, and accessibility criteria—not just “make it beautiful.” Require it to preserve behavior and list the files it plans to change. Ask for a responsive implementation, but test at narrow widths yourself. AI-generated interfaces can look convincing while omitting labels, keyboard states, and empty/error behavior.

### Practice
Sketch the TaskFlow list at desktop and narrow mobile widths. Define a primary button, secondary action, text scale, spacing rhythm, and focus treatment. Build only the header and list shell. Compare your screens to the same acceptance criteria rather than subjective preference alone.

**Checkpoint:** You can explain why each major component exists, identify the primary action, and show consistent focus and spacing. No interaction depends on color alone.

**Recap:** A design system is a set of coherent choices. Tailwind can express them; it cannot make the choices for you.

---

## Chapter 10 — Make the experience accessible and responsive

### What you will be able to do
You can check the core workflow using a keyboard, improve labels and focus, and prevent a small screen or visual difference from blocking the task.

### Accessibility is product quality
Accessibility is not a final polish pass. It is the practice of making content and functionality usable across abilities, devices, input methods, and environments. A person may be using a keyboard, screen reader, zoom, voice control, touch, a bright outdoor screen, or a slow connection.

This chapter introduces practical checks; it does not certify legal compliance. Standards and regulations vary by product and jurisdiction. Check current authoritative guidance and seek specialist review for regulated or high-impact products.

### A practical first pass
For each critical journey:

1. **Keyboard:** Use Tab and Shift+Tab. Can you reach every control in a sensible order? Can you see focus? Can you activate controls without a mouse?
2. **Names and labels:** Does each input have a programmatic label? Does each icon-only button have an accessible name?
3. **Structure:** Use headings in a meaningful order, buttons for actions, links for navigation, and form controls for input. Do not choose an element only because its default style looks right.
4. **Focus and feedback:** After an action, does focus stay somewhere sensible? Is success or failure announced in text, not only by color?
5. **Contrast and zoom:** Can you read text and identify controls at zoom? Do not rely on tiny low-contrast helper text.
6. **Motion and media:** Respect reduced-motion preferences; provide useful text alternatives for meaningful images and captions/transcripts for media.
7. **Responsive layout:** Test a narrow viewport. Content should reflow without forcing horizontal scrolling for ordinary reading.

Automated scanners can catch some issues, not whether a real person can complete the task. Use keyboard checks and, when possible, feedback from people with relevant access needs. Do not treat one automated score as proof of accessibility.

### Build accessibility into the prompt

> Implement the approved TaskFlow list flow using semantic HTML. Every input must have a visible label; controls must work by keyboard; focus must remain visible; status and validation messages must be understandable without color alone; preserve existing behavior and responsive layout. First identify the current markup and propose a minimal change. After implementation, list manual keyboard and narrow-screen checks. Do not claim assistive-technology compatibility you did not test.

Inspect the elements, then test them. A label visually near an input is not necessarily connected to it. A button styled like a link still acts like a button; choose semantics that match behavior.

### Checkpoint
Complete the add/complete/remove flow with the mouse and then with the keyboard only. Zoom the browser and narrow the window. Record one barrier and fix it. If you cannot test with assistive technology, say so; do not claim the app is universally accessible.

**Teach back:** Why is “the page looks fine on my laptop” weak evidence? Name one thing an automated accessibility scanner cannot prove.

**Recap:** Accessibility belongs in requirements, design, implementation, and verification. Test with different inputs and be honest about the limits of your checks.
