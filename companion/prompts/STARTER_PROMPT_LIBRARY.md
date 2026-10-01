# Starter Prompt Library — Book 1

Fill brackets with project facts. Use only approved, non-sensitive context. These prompts do not replace review, testing, or professional accountability.

## 1. Explain a project without editing

> Do not edit files or run commands. Using only the files I supplied, explain [feature] from user action to visible result. Name exact files and identifiers. Separate observed facts from inferences and unknowns. Do not invent a server, API, test, or behavior that is not present.

## 2. Turn notes into product questions

> Using these anonymized notes, identify repeated behaviors, contradictions, and missing evidence. Cite note IDs for every observation. Do not invent users or recommend features yet. End with five neutral follow-up questions.

## 3. Critique a product brief

> Review this brief for ambiguous wording, hidden assumptions, missing non-goals, unclear data ownership, risky scope, and untestable acceptance criteria. Quote each statement that needs clarification. Do not expand the feature list or fill unknowns with guesses.

## 4. Review a user journey

> Compare this flow with the approved product brief. Identify missing empty, loading, success, error, invalid, cancellation, and recovery states. Include keyboard/accessibility and permission concerns. Do not write UI code. Rank issues by user impact and evidence.

## 5. Propose a component map

> Inspect [specified files] in read-only mode. Propose the smallest component boundaries for [feature]. For each component, state its responsibility, inputs, events, and what should remain outside. Quote the existing code. Do not refactor until I approve a plan.

## 6. Plan a bounded change

> **Outcome:** [one user-visible result]. **Context:** [files and current behavior]. **Boundaries:** [non-goals/access limits]. **Acceptance:** [observable checks]. First inspect and propose the smallest plan. Wait for approval before editing. Afterward report exact files changed and checks actually run.

## 7. Generate boundary tests

> For the rule [state exact rule], list normal, boundary, invalid, and failure cases with expected results. Include empty/null, lower bound, upper bound, one beyond the bound, and unauthorized actor where relevant. Do not write code until I confirm the cases.

## 8. Diagnose a bug

> Expected: [behavior]. Actual: [behavior]. Reproduction: [steps]. Evidence: [redacted logs/network/error]. Do not edit files. List at most three plausible causes ranked by evidence, and one safe test to distinguish each. Do not suggest production-data changes.

## 9. Review SQL without executing it

> Review this development-only schema/policy. Do not run SQL. Explain table grants and RLS separately; identify who can select, insert, update, and delete as anon, User A, User B, and service role. Quote exact statements and identify any assumption that requires verification against current official docs. Suggest deny-case tests.

## 10. Review data and secrets boundaries

> Inspect only the named source/build artifacts. Identify values that appear to be credentials, personal data, or internal URLs without repeating any secret values. Report file/line and safe next action. Do not transmit, copy, or use any credential. If you cannot inspect built assets, say so.

## 11. Review a release checklist

> Compare this redacted release checklist with the acceptance criteria. Identify untested behaviors, environment differences, permission cases, missing rollback/recovery, cost risks, and unsupported claims. Separate checks actually run from checks still needed. Do not deploy or modify provider settings.

## 12. Tutor mode / teach-back

> Teach me [concept] using the current TaskFlow example. Explain it in plain language, then one technical level deeper. Do not edit code or give the final solution immediately. Ask me one question, wait for my answer, correct misconceptions kindly, and finish by asking me to explain it back in my own words.

## 13. Fresh-session handoff

> Create a handoff summary using only verified project state: goal, current milestone, files changed, decisions and reasons, commands/tests actually run with results, unresolved questions, risks, and next smallest task. Do not include secrets, private data, or unverified claims.
