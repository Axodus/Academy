import {
  Award,
  BookOpen,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  Coins,
  Compass,
  Gauge,
  GraduationCap,
  Home,
  LibraryBig,
  Menu,
  Route,
  Search,
  ShieldCheck,
  X
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import LoginButton from "../../../components/LoginButton";
import { academyData, listCatalogCourses, listLearningPaths } from "../services/academyData";
import { EnvironmentIndicator } from "./EnvironmentIndicator";

const navigation = [
  {
    label: "Learn",
    items: [
      { to: "/", label: "Overview", icon: Home },
      { to: "/courses", label: "Explore", icon: Compass },
      { to: "/my-courses", label: "My Learning", icon: LibraryBig },
      { to: "/dashboard", label: "Learning Dashboard", icon: ChartNoAxesCombined },
      { to: "/paths", label: "Learning Paths", icon: Route }
    ]
  },
  {
    label: "Proof & Progress",
    items: [
      { to: "/progress", label: "Progress", icon: Gauge },
      { to: "/proof-of-knowledge", label: "Proof of Knowledge", icon: ShieldCheck },
      { to: "/certifications", label: "Recognition", icon: Award }
    ]
  },
  {
    label: "Ecosystem",
    items: [
      { to: "/rewards", label: "Rewards", icon: Coins },
      { to: "/governance-review", label: "Governance Review", icon: BookOpen }
    ]
  }
] as const;

const pageTitles: Array<[RegExp, string]> = [
  [/\/courses\//, "Course Protocol"],
  [/\/courses$/, "Course Explorer"],
  [/\/my-courses\//, "Learning Record"],
  [/\/my-courses$/, "My Learning"],
  [/\/learn\//, "Learning Workspace"],
  [/\/dashboard$/, "Learning Dashboard"],
  [/\/proof-of-knowledge$/, "Proof of Knowledge"],
  [/\/progress$/, "Progress Engine"],
  [/\/certifications$/, "Recognition"],
  [/\/rewards$/, "Rewards"],
  [/\/governance-review$/, "Governance Review"],
  [/\/academy-governance-review$/, "Governance Review"],
  [/\/paths\//, "Learning Path"],
  [/\/paths$/, "Learning Paths"],
  [/\/tutors\//, "Faculty Profile"]
];

function withBase(pathname: string, target: string) {
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  if (target === "/") return base || "/";
  return `${base}${target}`;
}

export function AcademyShell() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const title = pageTitles.find(([pattern]) => pattern.test(pathname))?.[1] ?? "Overview";

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={`min-h-screen bg-academy-canvas text-slate-100 lg:grid ${collapsed ? "lg:grid-cols-[76px_1fr]" : "lg:grid-cols-[256px_1fr]"}`}>
      <Sidebar pathname={pathname} collapsed={collapsed} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} onCollapse={() => setCollapsed((value) => !value)} />
      <div className="min-w-0">
        <Topbar title={title} pathname={pathname} onMenu={() => setMobileOpen(true)} onSearch={() => setSearchOpen(true)} />
        <main id="main-content" className="mx-auto grid w-full min-w-0 max-w-[1540px] grid-cols-[minmax(0,1fr)] gap-6 px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          <Outlet />
        </main>
      </div>
      <MobileNavigation pathname={pathname} onMore={() => setMobileOpen(true)} />
      {searchOpen ? <GlobalSearch pathname={pathname} onClose={() => setSearchOpen(false)} /> : null}
    </div>
  );
}

function Sidebar({ pathname, collapsed, mobileOpen, onClose, onCollapse }: { pathname: string; collapsed: boolean; mobileOpen: boolean; onClose: () => void; onCollapse: () => void }) {
  return (
    <>
      {mobileOpen ? <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={onClose} /> : null}
      <aside className={`academy-scrollbar fixed inset-y-0 left-0 z-50 flex w-[286px] flex-col overflow-y-auto border-r border-academy-line bg-[#06101c] transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} aria-label="Primary navigation">
        <div className="flex h-[68px] items-center justify-between border-b border-academy-line px-4">
          <Link to={withBase(pathname, "/")} className="flex min-w-0 items-center gap-3" aria-label="Axodus Academy overview">
            <img src="/assets/Axodus_logo.svg" alt="" className="h-9 w-9 shrink-0 object-contain" />
            {!collapsed ? <span className="truncate text-sm font-semibold uppercase tracking-wide text-white">Axodus Academy</span> : null}
          </Link>
          <button className="grid h-11 w-11 place-items-center rounded-md text-slate-400 hover:bg-white/5 hover:text-white lg:hidden" onClick={onClose} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <nav className="flex-1 space-y-6 px-3 py-5" aria-label="Primary navigation">
          {navigation.map((group) => (
            <div key={group.label}>
              {!collapsed ? <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{group.label}</p> : null}
              <div className="grid gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const to = withBase(pathname, item.to);
                  return (
                    <NavLink key={item.to} to={to} end={item.to === "/"} title={collapsed ? item.label : undefined} className={({ isActive }) => `relative flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition ${isActive ? "bg-blue-500/15 text-blue-300 before:absolute before:-left-3 before:h-7 before:w-0.5 before:bg-academy-blue" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                      <Icon size={18} className="shrink-0" />
                      {!collapsed ? <span>{item.label}</span> : null}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <button onClick={onCollapse} className="hidden min-h-12 items-center justify-center gap-2 border-t border-academy-line text-sm text-slate-400 hover:bg-white/5 hover:text-white lg:flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <ChevronLeft size={18} className={collapsed ? "rotate-180" : ""} />
          {!collapsed ? "Collapse" : null}
        </button>
      </aside>
    </>
  );
}

function Topbar({ title, pathname, onMenu, onSearch }: { title: string; pathname: string; onMenu: () => void; onSearch: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-academy-line bg-[#06101c]/95 backdrop-blur">
      <div className="flex min-h-[68px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button className="grid h-11 w-11 place-items-center rounded-md text-slate-300 hover:bg-white/5 lg:hidden" onClick={onMenu} aria-label="Open navigation"><Menu size={22} /></button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-white">{title}</p>
          <p className="hidden text-xs text-slate-500 sm:block">Knowledge Protocol Interface</p>
        </div>
        <button onClick={onSearch} className="hidden min-h-10 min-w-52 items-center gap-2 rounded-md border border-academy-line bg-academy-panel px-3 text-sm text-slate-400 transition hover:border-blue-400/50 hover:text-white md:flex" aria-label="Search Academy">
          <Search size={17} /><span className="flex-1 text-left">Search Academy</span><kbd className="rounded border border-academy-line px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
        <button onClick={onSearch} className="grid h-11 w-11 place-items-center rounded-md text-slate-300 hover:bg-white/5 md:hidden" aria-label="Search Academy"><Search size={20} /></button>
        <EnvironmentIndicator />
        <div className="hidden items-center gap-2 rounded-md border border-academy-line bg-academy-panel px-3 py-2 xl:flex" title="Development preview points">
          <img src="/assets/neurons-logo.svg" alt="" className="h-5 w-5" />
          <span className="academy-value text-xs text-blue-300">{academyData.student.foundationPoints.toLocaleString("en-US")} F</span>
          <span className="text-slate-600">/</span>
          <span className="academy-value text-xs text-violet-300">{academyData.student.appliedPoints.toLocaleString("en-US")} A</span>
        </div>
        <details className="relative">
          <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-md border border-academy-line bg-academy-panel px-2.5 text-sm font-semibold text-white hover:border-blue-400/50" aria-label="Open identity controls">
            <span className="grid h-7 w-7 place-items-center rounded bg-blue-500/15 text-xs text-blue-300">AA</span><ChevronDown size={14} />
          </summary>
          <div className="absolute right-0 mt-2 w-[min(360px,calc(100vw-2rem))] rounded-xl border border-academy-line bg-[#0a1726] p-4 shadow-2xl">
            <p className="academy-label">Cross-network identity preview</p>
            <p className="mt-2 text-sm text-slate-400">Connect an identity to inspect the existing EVM and Solana preview flow.</p>
            <div className="mt-4"><LoginButton /></div>
          </div>
        </details>
      </div>
    </header>
  );
}

function MobileNavigation({ pathname, onMore }: { pathname: string; onMore: () => void }) {
  const items = [
    { to: "/", label: "Overview", icon: Home },
    { to: "/courses", label: "Explore", icon: Compass },
    { to: "/my-courses", label: "Learning", icon: GraduationCap },
    { to: "/progress", label: "Progress", icon: Gauge }
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-academy-line bg-[#06101c]/98 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] lg:hidden" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return <NavLink key={item.to} to={withBase(pathname, item.to)} end={item.to === "/"} className={({ isActive }) => `flex min-h-[64px] flex-col items-center justify-center gap-1 text-[11px] ${isActive ? "text-blue-400" : "text-slate-400"}`}><Icon size={21} /><span>{item.label}</span></NavLink>;
      })}
      <button onClick={onMore} className="flex min-h-[64px] flex-col items-center justify-center gap-1 text-[11px] text-slate-400"><Menu size={21} /><span>More</span></button>
    </nav>
  );
}

function GlobalSearch({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return [
      ...listCatalogCourses().filter((course) => `${course.title} ${course.category} ${course.tags.join(" ")}`.toLowerCase().includes(term)).map((course) => ({ label: course.title, meta: `${course.category} · ${course.level}`, to: `/courses/${course.slug}` })),
      ...listLearningPaths().filter((path) => `${path.title} ${path.description}`.toLowerCase().includes(term)).map((path) => ({ label: path.title, meta: "Learning path", to: `/paths/${path.id}` }))
    ].slice(0, 8);
  }, [query]);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-start bg-black/75 px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search Academy" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-academy-line bg-[#0a1726] shadow-2xl">
        <div className="flex items-center gap-3 border-b border-academy-line px-4"><Search size={20} className="text-blue-400" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} className="h-14 min-w-0 flex-1 bg-transparent text-white placeholder:text-slate-500" placeholder="Search courses, categories, or learning paths" aria-label="Search query" /><button onClick={onClose} className="grid h-11 w-11 place-items-center text-slate-400 hover:text-white" aria-label="Close search"><X size={20} /></button></div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!query ? <p className="p-4 text-sm text-slate-400">Search the local Academy catalog and formation paths.</p> : null}
          {query && !results.length ? <p className="p-4 text-sm text-slate-400">No protocol records match “{query}”.</p> : null}
          {results.map((result) => <Link key={`${result.to}-${result.label}`} to={withBase(pathname, result.to)} onClick={onClose} className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-white/5"><span className="font-medium text-white">{result.label}</span><span className="text-xs text-slate-500">{result.meta}</span></Link>)}
        </div>
      </div>
    </div>
  );
}
