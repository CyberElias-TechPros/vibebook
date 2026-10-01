# Dated Official Reference Register

**Last checked for this draft:** 2026-09-29. These links support current walkthroughs, not permanent guarantees. Recheck versions, UI, key names, eligibility, pricing, and policies before publication and before readers follow a dated procedure.

## Golden-path setup and deployment

- **Vite — Getting Started:** <https://vite.dev/guide/> — current project scaffolding, templates, and Node compatibility notes. Used in Chapters 3 and 9.
- **React — Learn React:** <https://react.dev/learn> — component, state, and event concepts used in Chapters 11–14.
- **TypeScript — Handbook:** <https://www.typescriptlang.org/docs/handbook/intro.html> — types and narrowing used in Chapters 11–14.
- **MDN — HTML input element:** <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input> — form fields and native constraints used in Chapters 1 and 14.
- **Tailwind CSS — Installation:** <https://tailwindcss.com/docs/installation/using-vite> — Tailwind/Vite plugin setup. Used in Chapter 9. Do not mix major-version setup instructions.
- **Supabase — Use Supabase with React:** <https://supabase.com/docs/guides/getting-started/quickstarts/reactjs> — React/Vite client setup and starter database example. Used in Chapters 15–16. The quickstart is not a production security review.
- **Supabase — API keys:** <https://supabase.com/docs/guides/getting-started/api-keys> — publishable vs. secret key use and RLS implications. Used in Chapters 15 and 19.
- **Supabase — Row Level Security:** <https://supabase.com/docs/guides/database/postgres/row-level-security> — policies and database access control. Recheck exact syntax and grants before publication.
- **Vercel — Vite:** <https://vercel.com/docs/frameworks/frontend/vite> — current deployment guidance. Used in Chapter 21.
- **Git — Recording changes:** <https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository> — status, staging, diff, and commits. Used in Chapters 3 and 17.
- **Vitest — Getting Started:** <https://vitest.dev/guide/> — install/run workflow and current compatibility note for the dated test setup in Chapter 17. Recheck the supported Node/Vite versions and command syntax before publication.

## Standards and security practice

- **W3C Web Accessibility Initiative — WCAG overview:** <https://www.w3.org/WAI/standards-guidelines/wcag/> — accessibility standards and resources. Check current WCAG version and jurisdictional requirements; this book does not claim legal compliance.
- **OWASP Top 10 for LLM Applications — Excessive Agency:** <https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html> — excessive functionality, permissions, autonomy, and mitigation concepts. Used in Chapters 5 and 19.
- **OWASP Cheat Sheet Series:** <https://cheatsheetseries.owasp.org/> — security reference starting point. Relevant chapters require qualified review; a checklist is not a security audit.

## Reference maintenance rules

1. Prefer primary vendor/standards sources for commands, APIs, configuration, and requirements.
2. Record source title, URL, access date, supported claim, and chapter in a validation record.
3. Do not cite a source for a claim it does not substantiate.
4. If a link changes, update the companion resource and add an erratum; do not silently leave a broken walkthrough.
5. Do not imply a tool's pricing, free tier, or publication disclosure policy is fixed. Recheck at publication.
