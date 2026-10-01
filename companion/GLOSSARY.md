# Beginner Glossary

Definitions are practical starting points, not exhaustive standards definitions. A term can have a more precise meaning in a specific language, framework, or provider.

| Term | Plain-language meaning |
|---|---|
| Acceptance criteria | Observable conditions that show whether a feature meets its requirement. |
| Accessibility | Designing and building so people with different abilities and ways of interacting can use the product. |
| Agent / coding agent | An AI system that can use tools—such as reading/editing files or running commands—not only generate chat text. Its permissions affect risk. |
| API | A documented contract one program uses to request data or actions from another. |
| Authentication | Establishing who is signed in or making a request. |
| Authorization | Deciding what an identified person or service is allowed to do. |
| Backend | Code and services that run outside the user's browser/app and enforce trusted work and rules. |
| Browser | Software that opens and runs web pages, such as a desktop or mobile browser. |
| Build | A process that prepares source code and assets to run or deploy. A successful build does not prove correct behavior. |
| Component | A reusable unit of interface with a defined responsibility and inputs. |
| Context | The project files, instructions, decisions, examples, and constraints an AI tool can use for a task. |
| Database | An organized system for storing, relating, and retrieving records. |
| Dependency | External code or a tool a project relies on. It can introduce update, license, and security risks. |
| Deployment | Publishing a particular version of an app to a hosted environment. |
| Environment variable | A configuration value supplied to a running/building program. A value exposed to frontend code is public. |
| Frontend | The part of an application a user sees and interacts with, often code running in a browser. |
| Git | A version-control system that records source-code changes as snapshots and diffs. It does not back up every external service or database. |
| GitHub | A hosted collaboration service that stores Git repositories and adds review and automation tools. Git and GitHub are related but not the same thing. |
| Hosting | A service that makes an application or its backend available over a network. |
| HTTP | A common protocol browsers and services use to exchange web requests and responses. |
| Idempotency | A property where repeating the same logical request does not repeat its effect (important for retries and payments). |
| Input validation | Checking that provided data satisfies a rule; validate in the interface for feedback and again at trusted boundaries. |
| JavaScript | A programming language widely used to add behavior to web pages and servers. |
| Migration | A recorded database change that can be reviewed and applied across environments. |
| Node.js | A runtime that lets JavaScript tools run outside a web browser. Vite's setup requires a compatible version. |
| npm | A package manager commonly used to install project dependencies and run scripts. |
| PRD / product brief | A short document that states the problem, user, scope, non-goals, data, and acceptance criteria. |
| Prompt injection | Malicious or misleading instructions embedded in user/repository/external content that try to influence an AI system. Treat untrusted content as data. |
| React | A JavaScript library for describing user interfaces as components that update from data. |
| RLS (Row Level Security) | Database rules that limit which rows a database role can read or change. It must be combined with suitable database grants and tested policies. |
| Runtime | The environment that executes a program, such as a browser or Node.js. |
| Server | A computer/service that receives requests and responds; it may be managed in the cloud. |
| Source code | Human-readable instructions and configuration used to build or run software. |
| State | Current data that an interface or program uses to decide what to display or do. |
| TypeScript | JavaScript with a type system that can catch some mistakes during development. It does not prove security or product correctness. |
| URL | An address that identifies a web resource or endpoint. |
| Vercel | A hosting/deployment provider used for the Book 1 frontend path; provider details may change. |
| Vite | A frontend build and development tool used in the Book 1 React path. |
| Webhook | A server-to-server notification sent when an event occurs; verify signatures and handle duplicate delivery safely. |
| Wireframe | A low-fidelity sketch of page structure and user flow, before visual polish. |
| `VITE_` variable | A Vite-prefixed environment variable made available in client-side code; do not put server secrets in it. |
| Publishable key | A key intended to appear in a client app; it still requires correct server/database authorization rules. |
| Secret key | A credential with elevated authority that must remain in trusted server-side storage. |
