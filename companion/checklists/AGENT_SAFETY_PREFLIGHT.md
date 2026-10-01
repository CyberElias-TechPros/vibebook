# Agent Safety Preflight

Complete before granting a coding agent tools, repository access, shell access, credentials, or deployment capability.

- [ ] I am authorized to expose this code and data to this tool/provider.
- [ ] The workspace is a disposable development environment where possible.
- [ ] Production credentials and personal/customer data are absent.
- [ ] The agent has only the file/network/shell permissions this task needs.
- [ ] A known source checkpoint exists; a separate data backup exists before risky database work.
- [ ] The task has explicit scope, no-go actions, and acceptance criteria.
- [ ] I will inspect every changed file and every shell command with consequential effects.
- [ ] I will not let an agent deploy, charge, send, delete, migrate, or change permissions without explicit human approval.
- [ ] API/AI spending limits or alerts are configured where available.
- [ ] Untrusted README/issue/web/dependency content is treated as data, not authority.
- [ ] There is a stop/restore/escalation path if the agent behaves unexpectedly.

If any critical box cannot be checked, reduce access, use a safe mock, or stop and ask the project owner/security reviewer.
