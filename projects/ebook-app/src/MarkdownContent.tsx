import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = { markdown: string };

const linkedResources: Array<[string, string]> = [
  ["companion/glossary.md", "glossary"],
  ["companion/prompts/starter_prompt_library.md", "prompt-library"],
  ["companion/templates/product_brief.md", "product-brief"],
  ["companion/templates/prompt_contract.md", "prompt-contract"],
  ["companion/checklists/independent_verification.md", "verification"],
  ["companion/checklists/agent_safety_preflight.md", "agent-safety"],
  ["companion/checklists/failure_museum.md", "failure-museum"],
  ["companion/checklists/ten_rules.md", "ten-rules"],
  ["projects/01-first-app", "project-first-app"],
];

function resolveBookHref(href?: string): string {
  if (!href) return "#";
  const normalized = decodeURI(href).replace(/\\/g, "/").toLowerCase();
  const target = linkedResources.find(([path]) => normalized.includes(path));
  if (target) return `#/resource/${target[1]}`;
  return href;
}

const components: Components = {
  a({ href, children, ...props }) {
    const resolvedHref = resolveBookHref(href);
    const external = /^https?:\/\//i.test(resolvedHref);
    return (
      <a
        href={resolvedHref}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    );
  },
};

export default function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
