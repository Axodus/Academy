import { Check, LockKeyhole } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPathStages } from "../services/academyUi";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function LearningPathTimeline({ pathId = "path-governance-operator", detailed = false }: { pathId?: string; detailed?: boolean }) {
  const stages = getPathStages(pathId);
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  return <ol className="grid gap-0">{stages.map((stage, index) => {
    const completed = stage.state === "completed-preview";
    const locked = ["locked", "review-required"].includes(stage.state);
    return <li key={stage.course.id} className="relative grid grid-cols-[42px_1fr] gap-3 pb-5 last:pb-0"><div className="relative flex justify-center after:absolute after:bottom-0 after:top-9 after:w-px after:bg-academy-line last:after:hidden"><span className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border academy-value text-xs ${completed ? "border-teal-400 bg-teal-400/15 text-teal-300" : locked ? "border-slate-500 bg-slate-500/10 text-slate-400" : "border-blue-400 bg-blue-500/15 text-blue-300"}`}>{completed ? <Check size={15} /> : locked ? <LockKeyhole size={14} /> : index + 1}</span></div><div className={detailed ? "academy-surface p-4" : "min-w-0 pt-1"}><div className="flex flex-wrap items-start justify-between gap-2"><div className="min-w-0"><Link to={`${base}/courses/${stage.course.slug}`} className="font-semibold text-white hover:text-blue-300">{stage.course.title}</Link><p className="mt-1 text-xs capitalize text-slate-500">{stage.state.replaceAll("-", " ")}</p></div>{detailed ? <StatusBadge label={stage.state} /> : null}</div>{detailed ? <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]"><div><p className="academy-label">Prerequisite</p><p className="mt-1 text-sm text-slate-300">{stage.prerequisite}</p></div><div><p className="academy-label">Expected outcome</p><p className="mt-1 text-sm text-slate-300">{stage.outcome}</p></div><div className="lg:col-span-2"><ProgressBar value={stage.progress} label="Stage progress" tone={stage.course.previewPointTier === "Applied Preview" ? "violet" : "blue"} detail={stage.recognition} /></div></div> : null}</div></li>;
  })}</ol>;
}
