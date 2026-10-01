# TaskFlow React — Book 1 milestone

This is the second TaskFlow milestone: a TypeScript + React + Vite interface styled with Tailwind CSS. It is the companion artifact for Chapters 11–14 (code literacy, components, state, and forms).

## What it does

- Adds a trimmed task title with a maximum length of 80 characters.
- Rejects empty/whitespace-only input with an announced, associated error.
- Marks a task complete and updates the remaining count.
- Removes a task and shows an empty state.
- Uses in-memory React state only. **Refreshing resets the list.** No account, database, analytics, network request, or personal-data storage is configured.

This is a learning milestone, not a production task manager. Do not add real personal or confidential data.

## Run locally

Requires a current Node.js/npm version compatible with the installed Vite/Vitest versions. The exact resolved versions are recorded in `package-lock.json`; recheck official documentation before upgrading them.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Stop the dev server with Ctrl+C.

## Verify

```bash
npm test
npm run build
npm run lint
```

The tests cover title validation and pure task helpers. They do not test the browser UI, accessibility with assistive technology, database permissions, or deployment.

### Manual acceptance path

1. At a wide viewport and a narrow viewport, open the page and confirm the “refresh resets” disclosure is visible.
2. Use Tab from the start. Confirm the skip link appears and moves to the list section; continue until every control is reachable with visible focus.
3. Submit an empty title and a whitespace-only title. Both should be rejected; the whitespace case should show the associated error message.
4. Add a short task and an 80-character task. Confirm each appears once; attempt 81 characters and confirm the input limit prevents further typing.
5. Complete one task. Confirm the checkbox and remaining count agree.
6. Remove tasks until the list is empty. Confirm the empty state appears and the add form still works.
7. Refresh the page. Confirm the starter task returns and the added tasks are gone.

These are acceptance instructions, not recorded browser results. This environment has only the automated logic/build/lint checks documented in `../../companion/validation/taskflow-react-build.md`; real-browser, keyboard, and assistive-technology testing remains open.

Follow the broader [independent verification checklist](../../companion/checklists/INDEPENDENT_VERIFICATION.md) as well.

## Implementation map

- `src/App.tsx` — React screen, input state, event handlers, and accessible feedback.
- `src/taskLogic.ts` — pure validation and task-list operations.
- `src/taskLogic.test.ts` — Vitest tests for those pure functions.
- `src/index.css` — Tailwind import and small global defaults.
- `vite.config.ts` — React and Tailwind Vite plugins.

The project is intentionally still in-memory. Chapter 15 introduces database decisions and RLS before any browser-to-database connection is allowed.
