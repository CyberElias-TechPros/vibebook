import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Home,
  Layers,
  Menu,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  allReadingItems,
  chapters,
  resources,
  startReading,
  type Chapter,
  type Resource,
} from "./content";

type Route =
  | { kind: "home" }
  | { kind: "chapter"; id: string }
  | { kind: "resource"; id: string };

type ProgressState = {
  completed: string[];
  bookmarks: string[];
  lastOpenedChapter: string | null;
};

const STORAGE_KEY = "vibebook-reader-progress-v1";
const emptyProgress: ProgressState = {
  completed: [],
  bookmarks: [],
  lastOpenedChapter: null,
};

function readSavedProgress(): ProgressState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyProgress;
    const parsed: unknown = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return emptyProgress;
    const value = parsed as Partial<ProgressState>;
    return {
      completed: Array.isArray(value.completed)
        ? value.completed.filter((item): item is string => typeof item === "string")
        : [],
      bookmarks: Array.isArray(value.bookmarks)
        ? value.bookmarks.filter((item): item is string => typeof item === "string")
        : [],
      lastOpenedChapter:
        typeof value.lastOpenedChapter === "string" ? value.lastOpenedChapter : null,
    };
  } catch {
    return emptyProgress;
  }
}

function routeFromHash(): Route {
  const route = window.location.hash.slice(1);
  const match = route.match(/^\/(chapter|resource)\/([a-z0-9-]+)$/i);
  if (!match) return { kind: "home" };
  return match[1].toLowerCase() === "chapter"
    ? { kind: "chapter", id: match[2] }
    : { kind: "resource", id: match[2] };
}

function hashForRoute(route: Route): string {
  if (route.kind === "chapter") return `#/chapter/${route.id}`;
  if (route.kind === "resource") return `#/resource/${route.id}`;
  return "#/home";
}

const MarkdownContent = lazy(() => import("./MarkdownContent"));

function chapterLabel(chapter: Chapter): string {
  return `Chapter ${chapter.number}`;
}

function toggleFromList(items: string[], id: string): string[] {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

type SidebarProps = {
  route: Route;
  progress: ProgressState;
  query: string;
  mobileOpen: boolean;
  onQueryChange: (value: string) => void;
  onNavigate: (route: Route) => void;
  onReset: () => void;
};

function Sidebar({
  route,
  progress,
  query,
  mobileOpen,
  onQueryChange,
  onNavigate,
  onReset,
}: SidebarProps) {
  const searchTerm = query.trim().toLowerCase();
  const matchingItems = useMemo(() => {
    if (!searchTerm) return [];
    return allReadingItems.filter((item) =>
      `${item.title} ${item.category} ${item.markdown}`.toLowerCase().includes(searchTerm),
    );
  }, [searchTerm]);

  const progressPercent = chapters.length
    ? Math.round((progress.completed.length / chapters.length) * 100)
    : 0;
  const bookmarkedChapters = chapters.filter((chapter) => progress.bookmarks.includes(chapter.id));

  function isActive(kind: Route["kind"], id?: string): boolean {
    return route.kind === kind && (!id || ("id" in route && route.id === id));
  }

  function openItem(item: Resource | Chapter) {
    if ("number" in item) onNavigate({ kind: "chapter", id: item.id });
    else onNavigate({ kind: "resource", id: item.id });
  }

  return (
    <aside
      id="book-sidebar"
      className={`sidebar ${mobileOpen ? "sidebar-mobile-open" : "sidebar-desktop"}`}
      aria-label="Book navigation"
    >
      <div className="sidebar-brand">
        <span className="brand-mark" aria-hidden="true"><BookOpen size={20} /></span>
        <span>
          <strong>VibeBook</strong>
          <small>Foundations · Book 1</small>
        </span>
      </div>

      <div className="sidebar-progress" aria-label={`${progressPercent}% of chapters marked complete`}>
        <div className="sidebar-progress-head">
          <span>Your progress</span>
          <strong>{progress.completed.length}/{chapters.length}</strong>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <p>Saved only in this browser</p>
      </div>

      <div className="sidebar-search">
        <Search size={16} aria-hidden="true" />
        <input
          type="search"
          value={query}
          aria-label="Search the book and companion resources"
          placeholder="Search chapters & tools"
          onChange={(event) => onQueryChange(event.currentTarget.value)}
        />
        {query && (
          <button type="button" className="search-clear" onClick={() => onQueryChange("")} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav" aria-label="Reader sections">
        {searchTerm ? (
          <div className="search-results">
            <p className="nav-label">Search results · {matchingItems.length}</p>
            {matchingItems.length === 0 ? (
              <p className="empty-search">No matches. Try a shorter term.</p>
            ) : matchingItems.slice(0, 18).map((item) => (
              <button
                className="nav-link search-result-link"
                key={item.id}
                type="button"
                onClick={() => openItem(item)}
              >
                <span className="nav-link-icon"><FileText size={15} /></span>
                <span className="nav-link-copy">
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </span>
              </button>
            ))}
            {matchingItems.length > 18 && <p className="search-more">Showing the first 18 matches.</p>}
          </div>
        ) : (
          <>
            <p className="nav-label">Read</p>
            <button
              className={`nav-link ${isActive("home") ? "is-active" : ""}`}
              type="button"
              onClick={() => onNavigate({ kind: "home" })}
            >
              <span className="nav-link-icon"><Home size={16} /></span>
              <span className="nav-link-copy"><strong>Overview</strong></span>
            </button>
            <button
              className={`nav-link ${isActive("resource", startReading.id) ? "is-active" : ""}`}
              type="button"
              onClick={() => onNavigate({ kind: "resource", id: startReading.id })}
            >
              <span className="nav-link-icon"><Sparkles size={16} /></span>
              <span className="nav-link-copy"><strong>Start here</strong></span>
            </button>

            {Array.from(new Set(chapters.map((chapter) => chapter.part))).map((part) => (
              <details className="part-nav" key={part} open>
                <summary>
                  <span>{part}</span>
                  <ChevronDown size={14} aria-hidden="true" />
                </summary>
                <div className="part-chapters">
                  {chapters.filter((chapter) => chapter.part === part).map((chapter) => {
                    const complete = progress.completed.includes(chapter.id);
                    const active = isActive("chapter", chapter.id);
                    return (
                      <button
                        key={chapter.id}
                        className={`chapter-nav-link ${active ? "is-active" : ""}`}
                        type="button"
                        aria-current={active ? "page" : undefined}
                        onClick={() => onNavigate({ kind: "chapter", id: chapter.id })}
                      >
                        <span className={`chapter-state ${complete ? "is-complete" : ""}`} aria-hidden="true">
                          {complete ? <Check size={12} /> : chapter.number}
                        </span>
                        <span>{chapter.title}</span>
                      </button>
                    );
                  })}
                </div>
              </details>
            ))}

            {bookmarkedChapters.length > 0 && (
              <>
                <p className="nav-label nav-label-spaced">Saved for later · {bookmarkedChapters.length}</p>
                {bookmarkedChapters.map((chapter) => (
                  <button
                    key={`saved-${chapter.id}`}
                    className={`chapter-nav-link ${isActive("chapter", chapter.id) ? "is-active" : ""}`}
                    type="button"
                    aria-current={isActive("chapter", chapter.id) ? "page" : undefined}
                    onClick={() => onNavigate({ kind: "chapter", id: chapter.id })}
                  >
                    <span className="chapter-state" aria-hidden="true"><Bookmark size={11} /></span>
                    <span>{chapter.title}</span>
                  </button>
                ))}
              </>
            )}

            <p className="nav-label nav-label-spaced">Companion</p>
            {resources.map((resource) => (
              <button
                key={resource.id}
                className={`nav-link ${isActive("resource", resource.id) ? "is-active" : ""}`}
                type="button"
                onClick={() => onNavigate({ kind: "resource", id: resource.id })}
              >
                <span className="nav-link-icon"><Layers size={16} /></span>
                <span className="nav-link-copy"><strong>{resource.title}</strong></span>
              </button>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-foot">
        <div className="privacy-note">
          <ShieldCheck size={15} aria-hidden="true" />
          <span>No account, sync, or analytics. Don’t save sensitive notes here.</span>
        </div>
        <button className="reset-progress" type="button" onClick={onReset}>
          <RotateCcw size={14} /> Reset reading progress
        </button>
      </div>
    </aside>
  );
}

type DashboardProps = {
  progress: ProgressState;
  onNavigate: (route: Route) => void;
};

function Dashboard({ progress, onNavigate }: DashboardProps) {
  const completed = new Set(progress.completed);
  const firstIncomplete = chapters.find((chapter) => !completed.has(chapter.id)) ?? chapters[0];
  const recentChapter = chapters.find((chapter) => chapter.id === progress.lastOpenedChapter);
  const continueChapter = recentChapter && !completed.has(recentChapter.id) ? recentChapter : firstIncomplete;
  const percent = chapters.length ? Math.round((completed.size / chapters.length) * 100) : 0;
  const partGroups = Array.from(new Set(chapters.map((chapter) => chapter.part)));

  return (
    <div className="page-shell dashboard-page">
      <div className="draft-banner" role="note">
        <span className="draft-dot" aria-hidden="true" />
        <span><strong>Working draft · v0.1</strong> — some technical walkthroughs still need beginner, browser, and security review.</span>
      </div>

      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="eyebrow">The Ultimate Vibe Coding Ebook · Book 1</p>
          <h1>Build with AI.<br /><em>Keep your judgment.</em></h1>
          <p className="hero-description">
            A practical path from your first working page to planning, checking, and responsibly releasing a small web app.
            No overnight-expert promises. Just a better way to learn and build.
          </p>
          <div className="hero-actions">
            <button className="button button-lime" type="button" onClick={() => onNavigate({ kind: "chapter", id: continueChapter.id })}>
              {progress.completed.length ? "Continue learning" : "Start Chapter 1"}
              <ArrowRight size={17} />
            </button>
            <button className="button button-quiet-light" type="button" onClick={() => onNavigate({ kind: "resource", id: "start-here" })}>
              How this book works
            </button>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <div className="hero-mark-ring"><BookOpen size={38} strokeWidth={1.3} /></div>
          <div className="hero-loop"><span>IDEA</span><i>→</i><span>PLAN</span><i>→</i><span>BUILD</span><i>→</i><span>VERIFY</span></div>
          <p>IDEA → PLAN → BUILD → VERIFY → SHIP → IMPROVE</p>
        </div>
      </section>

      <section className="overview-metrics" aria-label="Book overview">
        <div className="metric-card metric-progress">
          <div className="metric-topline"><span>Your reading progress</span><span>{percent}%</span></div>
          <div className="metric-track" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div>
          <div className="metric-bottomline"><strong>{completed.size} of {chapters.length} chapters completed</strong><span>Saved on this device</span></div>
        </div>
        <div className="metric-card">
          <span className="metric-icon"><BookOpen size={18} /></span>
          <strong>25</strong>
          <span>practical chapters</span>
        </div>
        <div className="metric-card">
          <span className="metric-icon"><Layers size={18} /></span>
          <strong>5</strong>
          <span>learning parts</span>
        </div>
        <div className="metric-card">
          <span className="metric-icon"><ShieldCheck size={18} /></span>
          <strong>Verify</strong>
          <span>before you trust a claim</span>
        </div>
      </section>

      <section className="section-heading-row">
        <div>
          <p className="eyebrow eyebrow-dark">Your learning path</p>
          <h2>One build, growing skills.</h2>
        </div>
        <button className="text-button" type="button" onClick={() => onNavigate({ kind: "resource", id: "start-here" })}>
          View the guide <ArrowRight size={15} />
        </button>
      </section>

      <div className="part-grid">
        {partGroups.map((part, index) => {
          const partChapters = chapters.filter((chapter) => chapter.part === part);
          const partDone = partChapters.filter((chapter) => completed.has(chapter.id)).length;
          const first = partChapters[0];
          const partDescriptions = [
            "Get your first win, learn the web, and set up a safe workshop.",
            "Choose a real problem and design a focused experience.",
            "Grow TaskFlow from a page into a structured, interactive app.",
            "Test, debug, protect data, and keep an agent's reach limited.",
            "Deploy carefully, maintain the product, and present a capstone.",
          ];
          return (
            <button
              className="part-card"
              key={part}
              type="button"
              onClick={() => onNavigate({ kind: "chapter", id: first.id })}
            >
              <div className="part-card-top"><span className="part-number">0{index + 1}</span><span className="part-count">{partDone}/{partChapters.length} done</span></div>
              <h3>{part.replace(/^Part [IVX]+ — /, "")}</h3>
              <p>{partDescriptions[index] ?? "Continue the learning path."}</p>
              <div className="part-card-bottom"><span>Chapters {partChapters[0].number}–{partChapters.at(-1)?.number}</span><ChevronRight size={17} /></div>
            </button>
          );
        })}
      </div>

      <section className="callout-row">
        <div className="callout-card callout-safety">
          <div className="callout-icon"><ShieldCheck size={20} /></div>
          <div>
            <p className="eyebrow eyebrow-dark">A professional habit</p>
            <h3>“The AI says it works” is not a test.</h3>
            <p>Every milestone asks you to check observable behavior, access rules, and failure states for yourself.</p>
          </div>
        </div>
        <div className="callout-card callout-first-win">
          <div className="callout-icon"><Sparkles size={20} /></div>
          <div>
            <p className="eyebrow eyebrow-dark">Start small</p>
            <h3>A working app in your first session.</h3>
            <p>Chapter 1 runs in a browser—no account, installation, or paid tool required.</p>
          </div>
        </div>
      </section>

      <section className="resource-preview">
        <div className="section-heading-row compact-heading">
          <div><p className="eyebrow eyebrow-dark">Practice shelf</p><h2>Tools for the work.</h2></div>
          <button className="text-button" type="button" onClick={() => onNavigate({ kind: "resource", id: "prompt-library" })}>Open resources <ArrowRight size={15} /></button>
        </div>
        <div className="resource-chip-row">
          {resources.slice(0, 5).map((resource) => (
            <button className="resource-chip" key={resource.id} type="button" onClick={() => onNavigate({ kind: "resource", id: resource.id })}>
              <FileText size={15} /><span>{resource.title}</span><ChevronRight size={14} />
            </button>
          ))}
        </div>
      </section>
      <footer className="dashboard-footer">A learning companion for the Book 1 manuscript · No account required · Your progress stays on this device.</footer>
    </div>
  );
}

type ReaderProps = {
  chapter: Chapter;
  completed: boolean;
  bookmarked: boolean;
  previous?: Chapter;
  next?: Chapter;
  onComplete: () => void;
  onBookmark: () => void;
  onNavigate: (route: Route) => void;
};

function ChapterReader({
  chapter,
  completed,
  bookmarked,
  previous,
  next,
  onComplete,
  onBookmark,
  onNavigate,
}: ReaderProps) {
  return (
    <article className="page-shell reader-page">
      <div className="reader-topline">
        <button className="back-link" type="button" onClick={() => onNavigate({ kind: "home" })}>
          <ArrowLeft size={15} /> Overview
        </button>
        <span className="reader-part-label">{chapter.part}</span>
      </div>

      <header className="reader-header">
        <div className="reader-kicker"><span className="chapter-pill">{chapterLabel(chapter)}</span><span className="reader-dot">·</span><span><Clock3 size={14} /> {chapter.minutes} min read</span></div>
        <h1>{chapter.title}</h1>
        <p className="reader-meta">{formatNumber(chapter.wordCount)} words · Draft manuscript · Read, try the exercise, then verify the outcome.</p>
        <div className="reader-actions">
          <button className={`button ${completed ? "button-complete" : "button-primary"}`} type="button" onClick={onComplete} aria-pressed={completed}>
            {completed ? <CheckCircle2 size={17} /> : <Check size={17} />}
            {completed ? "Marked complete" : "Mark complete"}
          </button>
          <button className={`button button-outline ${bookmarked ? "is-bookmarked" : ""}`} type="button" onClick={onBookmark} aria-pressed={bookmarked}>
            <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            {bookmarked ? "Saved" : "Save for later"}
          </button>
        </div>
        <p className="self-check-note">Mark complete only when you have tried the practice and can explain the chapter’s main idea in your own words. This is a personal checkpoint, not a certificate.</p>
      </header>

      <div className="reader-layout">
        <div className="reader-content-card">
          <Suspense fallback={<div className="markdown-loading" role="status">Opening chapter…</div>}>
            <MarkdownContent markdown={chapter.markdown} />
          </Suspense>
          <div className="chapter-finish-card">
            <span className={`finish-check ${completed ? "finish-check-done" : ""}`}><Check size={18} /></span>
            <div><strong>{completed ? "Checkpoint saved" : "Pause for a teach-back"}</strong><p>Can you explain what you built, how you verified it, and one limitation?</p></div>
            <button className="text-button" type="button" onClick={onComplete}>{completed ? "Undo" : "I can explain it"}</button>
          </div>
          <div className="chapter-pagination">
            {previous ? (
              <button className="pagination-button pagination-previous" type="button" onClick={() => onNavigate({ kind: "chapter", id: previous.id })}>
                <ArrowLeft size={17} /><span><small>Previous</small><strong>{chapterLabel(previous)}</strong></span>
              </button>
            ) : <span />}
            {next ? (
              <button className="pagination-button pagination-next" type="button" onClick={() => onNavigate({ kind: "chapter", id: next.id })}>
                <span><small>Next chapter</small><strong>{chapterLabel(next)}</strong></span><ArrowRight size={17} />
              </button>
            ) : (
              <button className="pagination-button pagination-next" type="button" onClick={() => onNavigate({ kind: "home" })}>
                <span><small>Finish the book</small><strong>Back to overview</strong></span><ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
        <aside className="reader-aside" aria-label="Chapter details">
          <div className="aside-card">
            <p className="eyebrow eyebrow-dark">The loop</p>
            <ol className="loop-list">
              <li><span>1</span> IDEA</li><li><span>2</span> PLAN</li><li><span>3</span> BUILD</li><li><span>4</span> VERIFY</li><li><span>5</span> SHIP</li><li><span>6</span> IMPROVE</li>
            </ol>
          </div>
          <div className="aside-card aside-tip">
            <ShieldCheck size={17} />
            <p><strong>Check independently.</strong> An AI’s confidence is not evidence. Use the observable checkpoint in this chapter.</p>
          </div>
          <div className="aside-card aside-progress">
            <p className="eyebrow eyebrow-dark">Your checkpoint</p>
            <p>{completed ? "You marked this chapter complete." : "This chapter is not marked complete yet."}</p>
            <button className="text-button" type="button" onClick={onComplete}>{completed ? "Reopen checkpoint" : "Mark after practice"}<ChevronRight size={15} /></button>
          </div>
        </aside>
      </div>
    </article>
  );
}

type ResourceReaderProps = {
  resource: Resource;
  onNavigate: (route: Route) => void;
};

function ResourceReader({ resource, onNavigate }: ResourceReaderProps) {
  return (
    <article className="page-shell resource-page">
      <button className="back-link" type="button" onClick={() => onNavigate({ kind: "home" })}>
        <ArrowLeft size={15} /> Overview
      </button>
      <header className="resource-header">
        <p className="eyebrow eyebrow-dark">{resource.category}</p>
        <h1>{resource.title}</h1>
        <p>{resource.description}</p>
      </header>
      <div className="reader-content-card resource-content">
        <Suspense fallback={<div className="markdown-loading" role="status">Opening resource…</div>}>
          <MarkdownContent markdown={resource.markdown} />
        </Suspense>
      </div>
    </article>
  );
}

function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());
  const [progress, setProgress] = useState<ProgressState>(readSavedProgress);
  const progressRef = useRef(progress);
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(() => {
    try {
      window.localStorage.getItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  });

  const commitProgress = useCallback((update: (current: ProgressState) => ProgressState) => {
    const next = update(progressRef.current);
    progressRef.current = next;
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = routeFromHash();
      setRoute(nextRoute);
      if (nextRoute.kind === "chapter" && chapters.some((chapter) => chapter.id === nextRoute.id)) {
        commitProgress((current) => current.lastOpenedChapter === nextRoute.id
          ? current
          : { ...current, lastOpenedChapter: nextRoute.id });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [commitProgress]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileNavOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  function navigate(nextRoute: Route) {
    setMobileNavOpen(false);
    setQuery("");
    setRoute(nextRoute);
    if (nextRoute.kind === "chapter") {
      commitProgress((current) => current.lastOpenedChapter === nextRoute.id
        ? current
        : { ...current, lastOpenedChapter: nextRoute.id });
    }
    const nextHash = hashForRoute(nextRoute);
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  }

  function toggleComplete(id: string) {
    commitProgress((current) => ({ ...current, completed: toggleFromList(current.completed, id) }));
  }

  function toggleBookmark(id: string) {
    commitProgress((current) => ({ ...current, bookmarks: toggleFromList(current.bookmarks, id) }));
  }

  function resetProgress() {
    const confirmed = window.confirm("Reset your local reading progress and bookmarks? This cannot be undone.");
    if (!confirmed) return;
    commitProgress(() => emptyProgress);
  }

  const selectedChapter = route.kind === "chapter"
    ? chapters.find((chapter) => chapter.id === route.id)
    : undefined;
  const selectedResource = route.kind === "resource"
    ? [startReading, ...resources].find((resource) => resource.id === route.id)
    : undefined;

  const chapterIndex = selectedChapter ? chapters.findIndex((chapter) => chapter.id === selectedChapter.id) : -1;
  const previousChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : undefined;
  const nextChapter = chapterIndex >= 0 ? chapters[chapterIndex + 1] : undefined;

  return (
    <div className="app-frame">
      {mobileNavOpen && (
        <button className="mobile-scrim" type="button" aria-label="Close navigation menu" onClick={() => setMobileNavOpen(false)} />
      )}
      <Sidebar
        route={route}
        progress={progress}
        query={query}
        mobileOpen={mobileNavOpen}
        onQueryChange={setQuery}
        onNavigate={navigate}
        onReset={resetProgress}
      />
      <main className="main-column">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            type="button"
            aria-controls="book-sidebar"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
            <span className="sr-only">{mobileNavOpen ? "Close" : "Open"} navigation</span>
          </button>
          <div className="topbar-path"><span>VibeBook</span><ChevronRight size={14} /><strong>{selectedChapter ? chapterLabel(selectedChapter) : selectedResource?.title ?? "Overview"}</strong></div>
          <div className="topbar-right">
            <span className="local-badge"><span /> Local reader</span>
            <button className="topbar-bookmark" type="button" onClick={() => navigate({ kind: "resource", id: "ten-rules" })} aria-label="Open Ten Rules quick reference">
              <Bookmark size={17} />
            </button>
          </div>
        </header>

        {!storageAvailable && (
          <div className="storage-warning" role="status">Local storage is unavailable in this browser. Reading progress will not be saved.</div>
        )}

        {route.kind === "home" && <Dashboard progress={progress} onNavigate={navigate} />}
        {selectedChapter && (
          <ChapterReader
            chapter={selectedChapter}
            completed={progress.completed.includes(selectedChapter.id)}
            bookmarked={progress.bookmarks.includes(selectedChapter.id)}
            previous={previousChapter}
            next={nextChapter}
            onComplete={() => toggleComplete(selectedChapter.id)}
            onBookmark={() => toggleBookmark(selectedChapter.id)}
            onNavigate={navigate}
          />
        )}
        {selectedResource && <ResourceReader resource={selectedResource} onNavigate={navigate} />}
        {route.kind !== "home" && !selectedChapter && !selectedResource && (
          <div className="page-shell not-found">
            <h1>That page is not in this edition.</h1>
            <p>The link may be stale. Return to the overview and choose a chapter or companion resource.</p>
            <button className="button button-primary" type="button" onClick={() => navigate({ kind: "home" })}>Go to overview <ArrowRight size={16} /></button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
