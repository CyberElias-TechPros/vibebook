# VibeBook Reader

A small, responsive reader and learning companion for the repository's **working Book 1 manuscript**. It renders the source Markdown directly, so the app and the manuscript stay in sync without copying chapter text into a second content store.

> **Draft status:** this is a useful local preview, not a finished or validated ebook product. The manuscript and some technical examples still need genuine beginner testing, independent source review, real-browser/accessibility checks, and security review. The app does not certify that a reader has learned or that a project is safe.

## What it does

- Browse the front matter, all 25 chapters, and companion references/code labs.
- Search chapter text and resource content from the navigation panel.
- Open chapters and resources through shareable URL hash routes.
- Mark chapters complete, bookmark chapters, and continue from the last opened chapter.
- Keep progress in this browser's `localStorage`; there are no accounts, backend, analytics, or cross-device sync.
- Read the Markdown with tables, task lists, fenced code, anchored headings, and in-app links to companion resources.
- Use the sidebar on a desktop or the collapsible navigation on a small screen.

## Run locally

Use Node.js 22.12 or later (the checked build used Node.js 22.22.3) and npm:

```sh
npm install
npm run dev -- --host 0.0.0.0
```

Open the local URL printed by Vite. To make a production build and serve it locally:

```sh
npm run test
npm run lint
npm run build
npm run preview -- --host 0.0.0.0
```

## Source and filesystem notes

This Vite project intentionally reads files from its parent repository. `src/content.ts` imports Book 1 front matter and five manuscript parts, selected companion resources, and selected Chapter 1 / TaskFlow code examples. `vite.config.ts` limits development-server filesystem access to those content directories. The production build embeds the imported text and code; it does not make the repository filesystem available to a deployed browser.

When adding an imported file, update the explicit import in `src/content.ts` and review the corresponding Vite `server.fs.allow` entry. Keep secrets, `.env` files, drafts that should not ship, and unrelated repository content out of imported paths.

## Scope and known limits

- Progress is device/browser-specific. Clearing site data or changing browsers removes it.
- Search runs locally over bundled reader content. There is no server-side search or personal-data collection.
- The project is a companion to a draft manuscript, not an EPUB/PDF exporter or a publishing system.
- The app has been build-, lint-, and content-test-checked, but not yet validated with genuine beginners, assistive technology, or a full real-browser/device matrix. See [`../../companion/validation/ebook-app-build.md`](../../companion/validation/ebook-app-build.md).
- Repository TaskFlow/Supabase snippets shown in the code lab remain educational drafts; they are not connected, deployed, or security-reviewed by this app.
