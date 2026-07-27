import { BookOpen, CheckCircle2, Clock3, LockKeyhole, Play, ShieldCheck, UserRound } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { ProgressionFlow } from "../components/ProgressionFlow";
import { ProtocolCourseVisual } from "../components/ProtocolCourseVisual";
import { StatusBadge } from "../components/StatusBadge";
import { getCourseBySlug, getCourseLessons, getCourseRewards, getCourseTitle, getTutor } from "../services/academyData";
import { getCourseAction } from "../services/academyUi";
import { studentAcademyService } from "../services/studentAcademyService";
import { formatNeurons } from "../utils/format";

export function CourseDetails() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  const course = getCourseBySlug(slug);
  if (!course) return <Navigate to={`${base}/courses`} replace />;
  const tutor = getTutor(course.tutorId);
  const lessons = getCourseLessons(course.id);
  const rewards = getCourseRewards(course.id);
  const learner = studentAcademyService.getStudentCourse(course.id);
  const action = getCourseAction(course.id);
  const progress = learner?.progress?.contentProgress ?? course.progress;
  return <>
    <PageHeader eyebrow={`${course.category} · ${course.subcategory}`} title={course.title} description={course.shortDescription} meta={<><StatusBadge label={course.constitutionalStanding} /><StatusBadge label={course.governanceStatus} /><span className={course.previewPointTier === "Applied Preview" ? "academy-pill-unlocked" : "academy-pill-locked"}>{course.previewPointTier}</span></>} />
    <section className="academy-card overflow-hidden"><div className="grid lg:grid-cols-[minmax(0,1fr)_360px]"><div className="p-5 sm:p-7"><p className="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{course.description}</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><Info icon={UserRound} label="Institution / tutor" value={tutor?.name ?? "Axodus Academy"} /><Info icon={Clock3} label="Duration / level" value={`${course.duration} · ${course.level}`} /><Info icon={ShieldCheck} label="Assessment" value={course.proofOfKnowledgeRequired ? "PoK required" : "PoK optional"} /></div><div className="mt-7"><ProgressBar value={progress} label="Current progress" tone={course.previewPointTier === "Applied Preview" ? "violet" : "blue"} /></div><div className="mt-6 flex flex-wrap gap-2"><Link className="academy-action" to={action.state === "continue" ? `${base}/learn/${course.id}` : `${base}/my-courses/${course.id}`}><Play size={16} />{action.label}</Link>{tutor ? <Link className="academy-secondary-action" to={`${base}/tutors/${tutor.id}`}>View faculty profile</Link> : null}</div></div><aside className="border-t border-academy-line lg:border-l lg:border-t-0"><ProtocolCourseVisual category={course.category} tier={course.previewPointTier} className="h-44" /><div className="p-5"><p className="academy-label">Knowledge points</p><p className={`academy-value mt-2 text-3xl ${course.previewPointTier === "Applied Preview" ? "text-violet-300" : "text-blue-300"}`}>{formatNeurons(course.previewPoints)}</p><p className="mt-1 text-sm text-slate-400">{course.previewSource} · {course.previewPointTier}</p><p className="mt-4 border-t border-academy-line pt-4 text-xs leading-5 text-slate-500">{course.previewPolicy}</p></div></aside></div></section>
    <article className="academy-card p-5 sm:p-6"><p className="academy-label">Protocol progression</p><h2 className="mt-1 text-lg font-semibold text-white">Learning to ecosystem unlock</h2><div className="mt-6"><ProgressionFlow activeStage={progress >= 100 ? 1 : 0} /></div></article>
    <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><article className="academy-card p-5"><div className="flex items-center justify-between gap-3"><div><p className="academy-label">Curriculum</p><h2 className="mt-1 text-lg font-semibold text-white">Modules and learning units</h2></div><span className="academy-value text-sm text-slate-400">{lessons.length} lessons</span></div><ol className="mt-5 grid gap-2">{lessons.map((lesson) => <li key={lesson.id} className="academy-surface flex items-start gap-3 p-4"><span className="academy-value grid h-8 w-8 shrink-0 place-items-center rounded-full border border-academy-line text-xs text-blue-300">{lesson.order}</span><div className="min-w-0 flex-1"><p className="font-medium text-white">{lesson.title}</p><p className="mt-1 text-xs text-slate-500">{lesson.type} · {lesson.duration} · {lesson.quizRequired ? "Assessment required" : "Learning unit"}</p></div><StatusBadge label={learner?.lessonProgress.find((item) => item.lessonId === lesson.id)?.status ?? lesson.status} /></li>)}</ol></article><div className="grid gap-4"><article className="academy-card p-5"><p className="academy-label">Expected outcomes</p><div className="mt-4 grid gap-3">{course.previewBenefits.map((benefit) => <div key={benefit} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-300" /><span>{benefit}</span></div>)}</div></article><article className="academy-card p-5"><p className="academy-label">Access & requirements</p><dl className="mt-4 grid gap-4 text-sm"><Data label="Access" value={`${course.accessType === "free" ? "Free" : "Paid"} · ${course.accessDescriptor}`} /><Data label="Prerequisites" value={course.prerequisites.length ? course.prerequisites.map(getCourseTitle).join(", ") : "None"} /><Data label="Recognition" value={course.recognitionPreviewEnabled ? "Recognition preview eligible after requirements" : "Not configured"} /><Data label="Points gates" value={rewards.length ? rewards.flatMap((reward) => reward.previewMilestones).join(" · ") : "No preview record yet"} /></dl></article></div></section>
    {action.state === "review-required" || action.state === "locked" ? <section className="academy-card flex items-start gap-3 border-amber-400/25 p-5"><LockKeyhole className="mt-0.5 shrink-0 text-amber-300" size={20} /><div><p className="font-semibold text-white">Access gate active</p><p className="mt-1 text-sm text-slate-400">Review the governance status and prerequisites before this learning workspace can open.</p></div></section> : null}
  </>;
}

function Info({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: string }) { return <div><Icon size={17} className="text-blue-300" /><p className="academy-label mt-2">{label}</p><p className="mt-1 text-sm text-slate-200">{value}</p></div>; }
function Data({ label, value }: { label: string; value: string }) { return <div><dt className="academy-label">{label}</dt><dd className="mt-1 leading-6 text-slate-300">{value}</dd></div>; }
