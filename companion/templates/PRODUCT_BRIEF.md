# Product Brief Template

> Keep this short enough to reread before every feature. Mark unknowns as unknown; do not ask AI to fill them with invented facts.

## Problem and evidence
- **Specific user:**
- **Situation / moment of need:**
- **Observed problem:**
- **Current workaround:**
- **Evidence and date:**
- **What is still an assumption:**

## Outcome
- **Desired user outcome:**
- **How we will recognize improvement:**
- **User journey to support first:**

## Scope
- **In this release:**
- **Explicitly out of scope:**
- **Open questions:**

## Data and risk
- **Data collected:**
- **Why each field is needed:**
- **Where it is stored:**
- **Who can read/change/delete it:**
- **Retention/deletion plan:**
- **Sensitive or regulated data?** If yes/unsure, stop and seek qualified review.

## Acceptance criteria
Write observable examples. Include happy path, boundary, error/recovery, permissions, and accessibility where relevant.

```text
Given [starting state]
When [user action]
Then [observable result]
```

## Technical decisions
- **Golden-path stack / reason for any deviation:**
- **Data model and ownership:**
- **External services and failure behavior:**
- **Security/recovery review needed:**

## Milestones
1. [Smallest vertical slice] — verification:
2. [Next slice] — verification:
3. [Release slice] — verification:

## Non-goals and stop conditions
- What should the assistant not build?
- What action requires human approval?
- What evidence would make us stop or narrow scope?
