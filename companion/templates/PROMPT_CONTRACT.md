# AI Task Contract Template

Use one contract per bounded task. Fill in the brackets; delete anything irrelevant. Never include passwords, private keys, session cookies, customer data, or confidential material without an approved process.

```text
OUTCOME
[One observable user outcome.]

CONTEXT
[Relevant project files, current behavior, product brief, decisions, environment.]

BOUNDARIES
[What must not change; files/data/tools the assistant must not access; no-go actions.]

ACCEPTANCE
[Happy path + boundary/error/permission checks and expected result.]

WORKFLOW
Inspect first and summarize the current behavior. Propose the smallest plan. Wait for approval before [risky action]. Make only the approved change. Ask a question rather than inventing a missing requirement.

EVIDENCE
Run [exact checks] if available. Report exact commands and outputs. Separate checks actually run from checks I still need to perform. List changed files, assumptions, limitations, and remaining risks. Do not claim an unrun test passed.
```

## Review after the response

- Does the plan fit the stated outcome and boundaries?
- Did the tool touch only expected files?
- Is the diff understandable and proportionate?
- Were dependencies/APIs verified in official docs?
- Did the checks test the acceptance criteria, not just compile?
- Are secrets, personal data, unsafe permissions, or destructive actions involved?
- Can I restore the prior state and explain the change?
