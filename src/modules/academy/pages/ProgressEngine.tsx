import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { academyLearnerExperienceService } from "../services/academyLearnerExperienceService";
import { formatNeurons } from "../utils/format";

export function ProgressEngine() {
  const preview = academyLearnerExperienceService.getDashboardPreview();

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="academy-label">Progress Engine</p>
            <h2 className="mt-1 text-3xl font-semibold text-slate-950">Local learning progress, assessment previews, and preview unlock summaries</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Central mock/local surface for Academy progression with non-authoritative preview labels.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={preview.runtime.authority} />
            <StatusBadge label={preview.runtime.outputAuthority} />
            <StatusBadge label="non-authoritative" />
          </div>
        </div>
        <ProgressBar value={Math.round((preview.summary.completedPreviewCourses / Math.max(preview.courses.length, 1)) * 100)} label="Preview course completion" />
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Completed previews" value={preview.summary.completedPreviewCourses} detail={`${preview.summary.activePreviewCourses} active preview courses`} />
        <MetricCard label="Recognition previews" value={preview.summary.eligibleRecognitionPreviews} detail="Badge preview and recognition preview only" />
        <MetricCard label="Unlocked preview points" value={formatNeurons(preview.summary.totalUnlockedPreviewPoints)} detail="Non-monetary preview utility" />
        <MetricCard label="Pending preview points" value={formatNeurons(preview.summary.totalPendingPreviewPoints)} detail="Still gated by local preview progress" />
      </section>

      <section className="academy-card grid gap-4 p-5">
        <div>
          <p className="academy-label">Student course progression</p>
          <h3 className="text-xl font-semibold text-slate-950">Content, PoK validation, preview points, and certificate preview remain separate</h3>
        </div>
        <div className="grid gap-4">
          {preview.courses.map((course) => (
            <article key={course.courseId} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-950">{course.displayTitle}</p>
                    <p className="mt-1 text-sm text-slate-600">{course.previewPointTier} / {course.certificateLabel}</p>
                  </div>
                  <StatusBadge label={course.assessmentState} />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <ProgressBar value={course.contentProgress} label="Local learning progress" />
                  <ProgressBar value={Math.round((course.completedLessons / Math.max(course.completedLessons + course.pendingLessons, 1)) * 100)} label="Lesson completion preview" />
                  <ProgressBar value={course.assessmentScore ?? 0} label="Assessment score preview" />
                  <ProgressBar value={course.unlockedPreviewPoints === 0 ? 0 : Math.round((course.unlockedPreviewPoints / Math.max(course.unlockedPreviewPoints + course.pendingPreviewPoints, 1)) * 100)} label="Preview points" />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-slate-700">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="academy-label">Recognition preview</p>
                    <p className="mt-1 font-semibold text-slate-900">{course.recognitionLabel}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="academy-label">Certificate preview</p>
                    <p className="mt-1 font-semibold text-slate-900">{course.certificateLabel}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="academy-label">Preview authority</p>
                    <p className="mt-1 font-semibold text-slate-900">{preview.runtime.rewardAuthority}</p>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </section>
    </>
  );
}
