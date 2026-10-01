# Project 01 — TaskFlow, your first working app

A tiny, single-file task list for Chapter 1 of *Vibe Coding Foundations*.

## Run it

1. Download or clone this project folder.
2. Open `index.html` in a current browser (double-clicking the file is enough).
3. Add a short task, check it off, remove it, and refresh the page.

No package installation, account, network request, or API key is needed. The tasks live only in the page's JavaScript memory and disappear on refresh. This is intentional: the project makes its data boundary visible instead of pretending a demo is a secure cloud service.

**Maintainer-only check:** with Node.js installed, run `node tests/smoke.mjs` from this directory. It checks task logic with a small fake DOM; it is not a browser, visual, or accessibility test.

## Acceptance check

- The starter task appears on load.
- A non-empty task can be added.
- A task can be checked and unchecked.
- The remaining-task status changes.
- A task can be removed.
- Blank input is rejected with a useful browser message.
- Refresh resets the list; the disclosure explains this.
- The page is usable with keyboard focus and at a narrow viewport.

The companion is a learning artifact, not a production task manager. Do not use it for confidential or important records.
