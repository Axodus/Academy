import { ArrowRight, Award, BookOpen, Coins, Gauge, LockKeyhole, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { academyData } from "../services/academyData";
import { getCurrentLearningRecord, getRecentActivity, getUpcomingUnlocks } from "../services/academyUi";
import { formatNeurons } from "../utils/format";
import { LearningPathTimeline } from "../components/LearningPathTimeline";
import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { ProgressionFlow } from "../components/ProgressionFlow";
import { ProtocolCourseVisual } from "../components/ProtocolCourseVisual";
import { StatusBadge } from "../components/StatusBadge";

export function AcademyHome() {
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  const current = getCurrentLearningRecord();
  const course = current?.course;
  const progress = current?.progress;
  const activity = getRecentActivity(4);
  const unlocks = getUpcomingUnlocks(3);

  return (
    <>
      <PageHeader eyebrow="Knowledge Protocol Interface" title={`Welcome back, ${academyData.student.name}`} description="Continue your current formation, validate knowledge, and see what your next milestone unlocks." meta={<><StatusBadge label={academyData.student.constitutionalStanding} /><span className="academy-pill">{academyData.student.level}</span></>} />

      {course ? <section aria-labelledby="continue-title" className="academy-card overflow-hidden">
        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)_280px]">
          <ProtocolCourseVisual category={course.category} tier={course.previewPointTier} className="min-h-44 lg:min-h-full" />
          <div className="min-w-0 p-5 sm:p-6">
            <p className="academy-label text-blue-300">Continue Learning</p>
            <h2 id="continue-title" className="mt-2 text-xl font-semibold text-white sm:text-2xl">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{progress?.completedLessons ?? 0} lessons completed · {course.level} · {course.duration}</p>
            <div className="mt-5"><ProgressBar value={progress?.contentProgress ?? 0} label="Course progress" tone={course.previewPointTier === "Applied Preview" ? "violet" : "blue"} /></div>
            <div className="mt-5 flex flex-wrap gap-2"><Link to={`${base}/learn/${course.id}`} className="academy-action"><Play size={16} />Resume learning</Link><Link to={`${base}/my-courses/${course.id}`} className="academy-secondary-action">View learning record</Link></div>
          </div>
          <aside className="border-t border-academy-line bg-academy-elevated/35 p-5 lg:border-l lg:border-t-0">
            <p className="academy-label">Next action</p><p className="mt-3 text-sm font-semibold leading-6 text-white">{progress?.nextRecommendedAction ?? current?.enrollment.nextAction}</p>
            <div className="mt-5 border-t border-academy-line pt-4"><p className="academy-label">Assessment state</p><div className="mt-2"><StatusBadge label={progress?.quizState ?? current?.quiz?.state ?? "locked"} /></div></div>
          </aside>
        </div>
      </section> : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Gauge} tone="teal" label="PoK readiness" value={`${academyData.student.pokReadiness}%`} detail="Assessment and validation readiness" />
        <MetricCard icon={ShieldCheck} label="Trust score" value={academyData.student.trustScore} detail={academyData.student.constitutionalStanding} />
        <MetricCard icon={Coins} label="Foundation Points" value={formatNeurons(academyData.student.foundationPoints)} detail="Foundation Preview progression" />
        <MetricCard icon={Sparkles} tone="violet" label="Applied Points" value={formatNeurons(academyData.student.appliedPoints)} detail="Applied Preview progression" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="academy-card p-5">
          <div className="mb-5 flex items-center justify-between gap-3"><div><p className="academy-label">Current path</p><h2 className="mt-1 text-lg font-semibold text-white">Governance Operator Path</h2></div><Link className="text-sm font-semibold text-blue-300" to={`${base}/paths/path-governance-operator`}>View full path</Link></div>
          <LearningPathTimeline />
        </article>
        <div className="grid gap-4">
          <article className="academy-card p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="academy-label">Knowledge progression</p><h2 className="mt-1 text-lg font-semibold text-white">Next milestone</h2></div><StatusBadge label={progress?.quizState ?? "in review"} /></div><div className="mt-6"><ProgressionFlow activeStage={(progress?.contentProgress ?? 0) >= 100 ? 1 : 0} /></div><div className="academy-surface mt-5 flex items-start gap-3 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-amber-400/35 bg-amber-400/10 text-amber-300"><Award size={19} /></div><div><p className="font-semibold text-white">Assessment Preview</p><p className="mt-1 text-sm leading-6 text-slate-400">Complete the remaining learning requirements to open the next PoK checkpoint.</p></div></div></article>
          <article className="academy-card grid gap-4 p-5 sm:grid-cols-[auto_1fr]"><div className="relative grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(var(--academy-cyan) ${academyData.student.pokReadiness}%, #1d3145 0)` }}><div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-academy-panel text-center"><div><p className="academy-value text-2xl text-white">{academyData.student.pokReadiness}%</p><p className="text-xs text-slate-400">Ready</p></div></div></div><div className="self-center"><p className="academy-label">Proof of Knowledge</p><h2 className="mt-1 text-lg font-semibold text-white">Readiness protocol</h2><p className="mt-2 text-sm text-slate-400">Learning evidence and assessment gates are connected before recognition becomes eligible.</p><Link className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-300" to={`${base}/proof-of-knowledge`}>View readiness details <ArrowRight size={14} /></Link></div></article>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="academy-card p-5"><div className="mb-4 flex items-center justify-between"><div><p className="academy-label">Protocol log</p><h2 className="mt-1 text-lg font-semibold text-white">Recent activity</h2></div><BookOpen className="text-blue-400" size={20} /></div><div className="grid gap-2">{activity.map((item) => <div key={item.id} className="academy-surface flex items-center gap-3 p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-academy-line text-blue-300"><BookOpen size={14} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-white">{item.title}</p><p className="truncate text-xs text-slate-500">{item.detail}</p></div><StatusBadge label={item.status} /></div>)}</div></article>
        <article className="academy-card p-5"><div className="mb-4 flex items-center justify-between"><div><p className="academy-label">Gated capabilities</p><h2 className="mt-1 text-lg font-semibold text-white">Upcoming unlocks</h2></div><LockKeyhole className="text-violet-400" size={20} /></div><div className="grid gap-2">{unlocks.map((item) => <div key={item.id} className="academy-surface flex items-start gap-3 p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-violet-400/30 text-violet-300"><LockKeyhole size={14} /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium text-white">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p></div><span className="academy-value text-xs text-violet-300">{item.points}</span></div>)}</div></article>
      </section>
    </>
  );
}
