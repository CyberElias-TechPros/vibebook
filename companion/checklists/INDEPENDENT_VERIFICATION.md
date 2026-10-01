# Independent Verification Checklist

Use for a feature or release. Evidence must come from an observed result, test output, source inspection, or qualified review—not a model's unsupported statement.

## Before building
- [ ] User outcome and non-goals are explicit.
- [ ] Acceptance criteria can fail when the feature is wrong.
- [ ] Happy path, boundary, invalid, empty, and error/recovery states are identified.
- [ ] Data handled and actor permissions are named.
- [ ] Risky actions and approval points are named.

## After an AI change
- [ ] Inspect `git status` and the full diff.
- [ ] Confirm changed files match the task; explain any dependency/configuration changes.
- [ ] Verify package/API claims against current official documentation.
- [ ] Check secrets, personal data, debug output, and unsafe defaults.
- [ ] Run the relevant static/build/tests; record exact commands and results.
- [ ] Manually perform the acceptance journey in the intended environment.
- [ ] Test failure and boundary cases—not only the happy path.
- [ ] Check keyboard/focus/layout for user-facing flows.
- [ ] For data access, test signed-out and separate-user cases at the service/database boundary.
- [ ] State what remains untested or uncertain.

## Before release
- [ ] Production configuration is distinct from development.
- [ ] No server secret is present in client assets, Git, logs, or prompts.
- [ ] Backup/recovery and rollback are understood and rehearsed as appropriate.
- [ ] Cost/usage limits and failure visibility are known.
- [ ] Live URL passes the critical journey in a fresh session.
- [ ] A release note records commit, known limitations, and owner.
