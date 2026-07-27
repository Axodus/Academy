import { Activity, ArrowRight, Award, Coins, Gauge, Play, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { academyData } from "../services/academyData";
import { academyLearnerExperienceService } from "../services/academyLearnerExperienceService";
import { getCurrentLearningRecord, getRecentActivity, getUpcomingUnlocks } from "../services/academyUi";
import { formatNeurons } from "../utils/format";
import { LearningPathTimeline } from "../components/LearningPathTimeline";
import { MetricCard } from "../components/MetricCard";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { ProgressionFlow } from "../components/ProgressionFlow";
import { ProtocolCourseVisual } from "../components/ProtocolCourseVisual";
import { StatusBadge } from "../components/StatusBadge";

export function LearningDashboard() {
  const preview = academyLearnerExperienceService.getDashboardPreview();
  const current = getCurrentLearningRecord();
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  const activity = getRecentActivity(4);
  const unlocks = getUpcomingUnlocks(3);
  const assessmentStage = (current?.progress?.contentProgress ?? 0) >= 100 ? 1 : 0;
  return <>
    <PageHeader eyebrow="Learner command center" title="Learning Dashboard" description="Your next action, knowledge validation state, and ecosystem progression in one operational view." />
    <section className="grid gap-4 xl:grid-cols-[1.15fr_0.95fr]">
      {current ? <article className="academy-card overflow-hidden"><div className="grid h-full sm:grid-cols-[1fr_190px]"><div className="p-5"><p className="academy-label">Current learning path</p><h2 className="mt-1 text-xl font-semibold text-white">Governance Operator</h2><div className="mt-5"><ProgressionFlow activeStage={assessmentStage} compact /></div><div className="mt-6 border-t border-academy-line pt-5"><p className="academy-label">Current course</p><h3 className="mt-1 text-lg font-semibold text-white">{current.course.title}</h3><div className="mt-4"><ProgressBar value={current.progress?.contentProgress ?? 0} label="Learning progress" /></div><Link className="academy-action mt-5" to={`${base}/learn/${current.course.id}`}><Play size={16} />Resume learning</Link></div></div><ProtocolCourseVisual category={current.course.category} tier={current.course.previewPointTier} className="hidden min-h-full sm:block" /></div></article> : null}
      <article className="academy-card p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="academy-label">Next assessment</p><h2 className="mt-1 text-xl font-semibold text-white">{current?.quiz?.title ?? "Assessment Preview"}</h2></div><StatusBadge label={current?.progress?.quizState ?? "locked"} /></div><p className="mt-3 text-sm leading-6 text-slate-400">{current?.progress?.nextRecommendedAction ?? "Continue learning to open the next assessment gate."}</p><div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="academy-label">Requirement</p><p className="mt-1 text-sm text-slate-300">Complete required lessons · threshold {current?.quiz?.passingThreshold ?? 0}%</p><Link to={`${base}/proof-of-knowledge`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-300">Readiness details <ArrowRight size={14} /></Link></div><div className="relative grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(var(--academy-cyan) ${academyData.student.pokReadiness}%, #1d3145 0)` }}><div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-academy-panel text-center"><div><p className="academy-value text-2xl">{academyData.student.pokReadiness}%</p><p className="text-xs text-slate-400">PoK ready</p></div></div></div></div></article>
    </section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><MetricCard icon={Gauge} label="Course progress" value={`${current?.progress?.contentProgress ?? 0}%`} detail="Current formation" /><MetricCard icon={ShieldCheck} tone="teal" label="PoK readiness" value={`${academyData.student.pokReadiness}%`} detail="Validation readiness" /><MetricCard icon={Coins} label="Foundation Points" value={formatNeurons(academyData.student.foundationPoints)} detail="Foundation Preview" /><MetricCard icon={Sparkles} tone="violet" label="Applied Points" value={formatNeurons(academyData.student.appliedPoints)} detail="Applied Preview" /><MetricCard icon={Award} tone="violet" label="Recognition" value={preview.summary.eligibleRecognitionPreviews} detail="Eligible previews" /></section>
    <section className="grid gap-4 xl:grid-cols-[0.75fr_1fr_1fr]">
      <article className="academy-card p-5"><p className="academy-label">Learner progress</p><h2 className="mt-1 text-lg font-semibold text-white">Governance Operator</h2><div className="mt-5"><LearningPathTimeline /></div><Link className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-300" to={`${base}/paths/path-governance-operator`}>View full path <ArrowRight size={14} /></Link></article>
      <article className="academy-card p-5"><div className="flex items-center justify-between"><div><p className="academy-label">Competency overview</p><h2 className="mt-1 text-lg font-semibold text-white">Knowledge domains</h2></div><Gauge size={20} className="text-teal-300" /></div><div className="mt-5 grid gap-5">{academyData.progressEngine.analytics.map((item, index) => <ProgressBar key={item.label} value={item.value} label={item.label} tone={index === 3 ? "amber" : index === 1 ? "violet" : "teal"} />)}</div></article>
      <article className="academy-card p-5"><div className="flex items-center justify-between"><div><p className="academy-label">Protocol log</p><h2 className="mt-1 text-lg font-semibold text-white">Recent activity</h2></div><Activity size={20} className="text-blue-300" /></div><div className="mt-4 grid gap-3">{activity.map((item) => <div key={item.id} className="border-l border-academy-line pl-4"><p className="text-sm font-medium text-white">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.detail}</p></div>)}</div></article>
    </section>
    <article className="academy-card p-5"><div className="mb-4 flex items-center justify-between"><div><p className="academy-label">Gated capabilities</p><h2 className="mt-1 text-lg font-semibold text-white">Upcoming unlocks</h2></div><Link to={`${base}/rewards`} className="text-sm font-semibold text-blue-300">View reward gates</Link></div><div className="grid gap-3 md:grid-cols-3">{unlocks.map((item) => <div key={item.id} className="academy-surface p-4"><StatusBadge label={item.status} /><p className="mt-3 text-sm font-semibold text-white">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p></div>)}</div></article>
  </>;
}
