import { ArrowRight, Clock3, GraduationCap, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { Course, Tutor } from "../types/academy";
import { formatNeurons } from "../utils/format";
import { getCourseAction } from "../services/academyUi";
import { studentAcademyService } from "../services/studentAcademyService";
import { ProgressBar } from "./ProgressBar";
import { ProtocolCourseVisual } from "./ProtocolCourseVisual";
import { StatusBadge } from "./StatusBadge";

type CourseCardProps = { course: Course; tutor?: Tutor };

export function CourseCard({ course, tutor }: CourseCardProps) {
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  const learner = studentAcademyService.getStudentCourse(course.id);
  const action = getCourseAction(course.id);
  const progress = learner?.progress?.contentProgress ?? course.progress;
  return (
    <article className="academy-card group flex min-w-0 flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-blue-400/45">
      <ProtocolCourseVisual category={course.category} tier={course.previewPointTier} className="h-36" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className={course.previewPointTier === "Applied Preview" ? "academy-pill-unlocked" : "academy-pill-locked"}>{course.previewPointTier}</span>
          <span className="academy-pill">{course.accessType === "free" ? "Free" : "Paid"}</span>
          {action.state === "review-required" ? <StatusBadge label="review required" /> : null}
        </div>
        <div className="min-w-0">
          <Link to={`${base}/courses/${course.slug}`} className="text-lg font-semibold leading-snug text-white transition group-hover:text-blue-300">{course.title}</Link>
          <p className="mt-1 text-xs text-slate-500">{tutor?.name ?? "Axodus Academy"}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} />{course.category}</span>
          <span className="inline-flex items-center gap-1.5"><GraduationCap size={14} />{course.level}</span>
          {course.duration ? <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{course.duration}</span> : null}
        </div>
        <div className="mt-auto border-t border-academy-line pt-4">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs"><span className="academy-value text-blue-300">{formatNeurons(course.previewPoints)}</span><span className="text-slate-500">{course.proofOfKnowledgeRequired ? "PoK eligible" : "PoK optional"}</span></div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-4">
            <ProgressBar value={progress} tone={course.previewPointTier === "Applied Preview" ? "violet" : "blue"} />
            <Link to={action.state === "continue" ? `${base}/learn/${course.id}` : `${base}/courses/${course.slug}`} className="academy-action min-h-9 px-3 py-1.5 text-xs">{action.label}<ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
