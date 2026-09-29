# Validation evidence log

This directory is reserved for actual reproduction records, beginner test notes, technical/security reviews, and errata. Do not write “tested” here unless a person ran the stated check and recorded the environment and result.

## Tutorial reproduction record

Copy one template per tutorial/environment and fill it only after executing the steps:

```text
Chapter / artifact:
Commit or source revision:
Date:
Reviewer:
Operating system and version:
Browser/runtime/editor versions:
Accounts/services used (no credentials):
Exact commands and steps:
Observed output:
Acceptance checks and results:
Errors/blockers and resolution:
Known untested paths:
```

## Beginner beta record

Recruit genuine non-programmers. Get consent; do not simulate a beginner session or coach the participant through the chapter. Record steps, time, misunderstandings, and completion against criteria. Store only necessary notes, anonymize them, and avoid collecting personal/sensitive information. A real beginner beta has not yet been recorded for this draft.

## Review gates still open

- Windows/macOS/Linux (or explicitly supported cloud-workspace) clean setup and tutorial reproduction.
- Genuine beginner beta and revision cycle.
- Qualified security review of authentication/RLS, agent safety, and deployment chapters.
- Accessibility review and user testing appropriate to the claim.
- Source/command verification before commercial release.
