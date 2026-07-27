import { ArrowRight, Route } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { LearningPathTimeline } from "../components/LearningPathTimeline";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { getLearningPath, listLearningPaths } from "../services/academyData";

export function LearningPathsOverview() {
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  const paths = listLearningPaths();
  return <><PageHeader eyebrow="Formation architecture" title="Learning Paths" description="Structured knowledge sequences connect prerequisites, assessments, recognition, and ecosystem capabilities." /><section className="grid gap-4 lg:grid-cols-2">{paths.map((path) => <article key={path.id} className="academy-card p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-lg border border-blue-400/30 bg-blue-500/10 text-blue-300"><Route size={20} /></div><StatusBadge label={path.standing} /></div><h2 className="mt-4 text-xl font-semibold text-white">{path.title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{path.description}</p><div className="mt-5"><ProgressBar value={path.progress} label="Path progress" /></div><Link to={`${base}/paths/${path.id}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-300">Inspect milestones <ArrowRight size={14} /></Link></article>)}</section></>;
}

export function LearningPathViewer() {
  const { id } = useParams();
  const path = getLearningPath(id);
  const { pathname } = useLocation();
  const base = pathname.startsWith("/academy") ? "/academy" : "";
  if (!path) return <Navigate to={`${base}/paths`} replace />;
  return <><PageHeader eyebrow="Formation path" title={path.title} description={path.description} meta={<StatusBadge label={path.standing} />} actions={<Link className="academy-secondary-action" to={`${base}/paths`}>All learning paths</Link>} /><section className="academy-card p-5 sm:p-6"><ProgressBar value={path.progress} label="Overall path progress" /><div className="mt-8"><LearningPathTimeline pathId={path.id} detailed /></div></section></>;
}
