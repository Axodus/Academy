import { Link } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { academyLearnerExperienceService } from "../services/academyLearnerExperienceService";
import { formatNeurons } from "../utils/format";

export function LearningDashboard() {
  const preview = academyLearnerExperienceService.getDashboardPreview();

  return (
    <>
      <section>
        <p className="academy-label">Learning Dashboard</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Local learning progress, assessment previews, and recognition preview status</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge label={preview.runtime.authority} />
          <StatusBadge label={preview.runtime.outputAuthority} />
          <StatusBadge label="non-authoritative" />
          <StatusBadge label={preview.runtime.certificateAuthority} />
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Completed previews" value={preview.summary.completedPreviewCourses} detail={`${preview.summary.activePreviewCourses} active preview courses`} />
        <MetricCard label="Recognition previews" value={preview.summary.eligibleRecognitionPreviews} detail="Mock learner recognition only" />
        <MetricCard label="Unlocked preview points" value={formatNeurons(preview.summary.totalUnlockedPreviewPoints)} detail="Non-monetary preview summary" />
        <MetricCard label="Certificate previews" value={preview.summary.eligibleCertificatePreviews} detail="Presentation-only preview" />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Learner preview summary</h3>
          {preview.courses.map((course) => (
            <article key={course.courseId} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Link to={course.routePath} className="font-semibold text-slate-950 hover:text-academy-blue">{course.displayTitle}</Link>
                <StatusBadge label={course.progressState} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <ProgressBar value={course.contentProgress} label={`Local learning progress / ${course.previewPointTier}`} />
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="academy-label">Assessment preview</p>
                  <p className="mt-1 font-semibold text-slate-900">{course.assessmentState}</p>
                  <p className="mt-1">Score: {course.assessmentScore ?? "pending"} / threshold {course.assessmentThreshold}%</p>
                  <p className="mt-1">Recognition: {course.recognitionLabel}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Preview authority labels</h3>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="academy-label">Reward authority</p>
            <p className="mt-1 font-semibold text-slate-950">{preview.runtime.rewardAuthority}</p>
            <p className="mt-2 text-sm text-slate-600">Preview points remain local, non-monetary, and non-authoritative.</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="academy-label">Certificate authority</p>
            <p className="mt-1 font-semibold text-slate-950">{preview.runtime.certificateAuthority}</p>
            <p className="mt-2 text-sm text-slate-600">Certificate preview status remains presentation-only and non-authoritative.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="academy-label">Preview-only boundary</p>
            <p className="mt-1 text-sm text-slate-700">This dashboard renders local preview summaries only. No execution path opens from this surface.</p>
          </div>
        </div>
      </section>
    </>
  );
}
