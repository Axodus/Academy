import { ArrowRight, BookOpen, LockKeyhole } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { ProtocolCourseVisual } from "../components/ProtocolCourseVisual";
import { StatusBadge } from "../components/StatusBadge";
import { getLearningState, type LearningState } from "../services/academyUi";
import { studentAcademyService } from "../services/studentAcademyService";

const groups: Array<{ state: LearningState; title: string; description: string }> = [
  { state: "continue", title: "Continue", description: "Active formation protocols with a clear next action." },
  { state: "not-started", title: "Not started", description: "Available learning records that have not begun." },
  { state: "completed-preview", title: "Completed preview", description: "Learning and PoK requirements completed in the local preview." },
  { state: "review-required", title: "Review required", description: "Access depends on an Academy governance review." },
  { state: "locked", title: "Locked", description: "Prerequisites or protocol gates have not been met." }
];

export function StudentCourses() {
  const records = studentAcademyService.getStudentCourses().filter((item) => Boolean(item));
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  return <><PageHeader eyebrow="Personal formation" title="My Learning" description="Continue active courses and understand exactly what is complete, gated, or waiting for review." />
    <div className="grid gap-7">{groups.map((group) => {
      const items = records.filter((item) => item && getLearningState(item.course.id) === group.state);
      return <section key={group.state} aria-labelledby={`group-${group.state}`}><div className="mb-3 flex items-end justify-between gap-4"><div><h2 id={`group-${group.state}`} className="text-lg font-semibold text-white">{group.title}</h2><p className="mt-1 text-sm text-slate-500">{group.description}</p></div><span className="academy-value text-sm text-slate-500">{items.length}</span></div>{items.length ? <div className="grid gap-4">{items.map((item) => item ? <article key={item.course.id} className="academy-card overflow-hidden"><div className="grid md:grid-cols-[180px_1fr_auto]"><ProtocolCourseVisual category={item.course.category} tier={item.course.previewPointTier} className="min-h-36" /><div className="min-w-0 p-5"><div className="flex flex-wrap gap-2"><StatusBadge label={group.state} /><span className={item.course.previewPointTier === "Applied Preview" ? "academy-pill-unlocked" : "academy-pill-locked"}>{item.course.previewPointTier}</span></div><Link to={`${base}/my-courses/${item.course.id}`} className="mt-3 block text-lg font-semibold text-white hover:text-blue-300">{item.course.title}</Link><p className="mt-2 text-sm text-slate-400">{item.progress?.nextRecommendedAction ?? item.enrollment.nextAction}</p><div className="mt-4"><ProgressBar value={item.progress?.contentProgress ?? 0} label="Learning progress" tone={item.course.previewPointTier === "Applied Preview" ? "violet" : "blue"} /></div></div><div className="flex min-w-44 items-center border-t border-academy-line p-5 md:border-l md:border-t-0">{group.state === "review-required" || group.state === "locked" ? <Link className="academy-secondary-action w-full" to={`${base}/my-courses/${item.course.id}`}><LockKeyhole size={16} />Review status</Link> : <Link className="academy-action w-full" to={group.state === "completed-preview" ? `${base}/my-courses/${item.course.id}` : `${base}/learn/${item.course.id}`}><BookOpen size={16} />{group.state === "completed-preview" ? "Review" : "Continue"}<ArrowRight size={15} /></Link>}</div></div></article> : null)}</div> : <EmptyState title={`No ${group.title.toLowerCase()} courses`} description="No current fixture records belong to this state." />}</section>;
    })}</div></>;
}
