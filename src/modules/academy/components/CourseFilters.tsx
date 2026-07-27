import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import type { Course } from "../types/academy";

export type CourseFilterState = { query: string; category: string; level: string; previewPointTier: string; accessType: string; language: string; recognition: string; sort: string };
type Props = { courses: Course[]; filters: CourseFilterState; resultCount: number; onChange: (key: keyof CourseFilterState, value: string) => void; onReset: () => void };
const unique = (values: string[]) => Array.from(new Set(values)).sort();

export function CourseFilters({ courses, filters, resultCount, onChange, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const categories = unique(courses.map((course) => course.category));
  const activeCount = Object.entries(filters).filter(([key, value]) => !["query", "sort"].includes(key) && value !== "all").length;
  return (
    <section className="grid gap-4" aria-label="Course filters">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative block"><span className="sr-only">Search courses</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={19} /><input value={filters.query} onChange={(event) => onChange("query", event.target.value)} className="h-12 w-full rounded-lg border border-academy-line bg-academy-panel pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-400" placeholder="Search courses, categories, or protocol topics" /></label>
        <button className="academy-secondary-action" onClick={() => setOpen((value) => !value)} aria-expanded={open}><Filter size={17} />All filters{activeCount ? <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-xs text-blue-300">{activeCount}</span> : null}</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 academy-scrollbar" aria-label="Quick category filters">
        {["all", ...categories].map((category) => <button key={category} onClick={() => onChange("category", category)} className={`min-h-10 shrink-0 rounded-md border px-4 text-sm font-medium transition ${filters.category === category ? "border-blue-500 bg-blue-500 text-white" : "border-academy-line bg-academy-panel text-slate-400 hover:border-blue-400/50 hover:text-white"}`}>{category === "all" ? "All" : category}</button>)}
      </div>
      {open ? <div className="academy-card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5"><Select label="Level" value={filters.level} options={unique(courses.map((course) => course.level))} onChange={(value) => onChange("level", value)} /><Select label="Preview tier" value={filters.previewPointTier} options={unique(courses.map((course) => course.previewPointTier))} onChange={(value) => onChange("previewPointTier", value)} /><Select label="Access" value={filters.accessType} options={["free", "paid"]} onChange={(value) => onChange("accessType", value)} /><Select label="Language" value={filters.language} options={unique(courses.map((course) => course.language))} onChange={(value) => onChange("language", value)} /><Select label="Recognition" value={filters.recognition} options={["enabled", "not-enabled"]} onChange={(value) => onChange("recognition", value)} /></div> : null}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-academy-line py-3 text-sm"><p className="academy-value text-slate-400">{resultCount} {resultCount === 1 ? "protocol record" : "protocol records"}</p><div className="flex items-center gap-3">{(activeCount || filters.query) ? <button onClick={onReset} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-300 hover:text-blue-200"><X size={14} />Clear filters</button> : null}<label className="flex items-center gap-2 text-xs text-slate-500">Sort by<select value={filters.sort} onChange={(event) => onChange("sort", event.target.value)} className="rounded-md border border-academy-line bg-academy-panel px-2 py-2 text-slate-200"><option value="relevance">Relevance</option><option value="progress">Progress</option><option value="title">Title</option><option value="points">Points</option></select></label></div></div>
    </section>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="grid gap-1.5 text-xs text-slate-400"><span>{label}</span><select className="min-h-11 rounded-md border border-academy-line bg-[#071321] px-3 text-sm text-slate-200" value={value} onChange={(event) => onChange(event.target.value)}><option value="all">All</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}
