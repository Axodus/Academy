import { RewardClassPanel } from "../components/RewardClassPanel";
import { RewardGateList } from "../components/RewardGateList";
import { academyLearnerExperienceService } from "../services/academyLearnerExperienceService";
import { rewardGateService } from "../services/rewardGateService";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { formatNeurons } from "../utils/format";
import { PageHeader } from "../components/PageHeader";

export function RewardsDashboard() {
  const preview = academyLearnerExperienceService.getDashboardPreview();
  const foundationRewards = preview.rewardPanels.foundation;
  const appliedRewards = preview.rewardPanels.applied;

  return (
    <>
      <PageHeader eyebrow="Knowledge accounting" title="Rewards" description="Foundation and Applied Points show local progression across learning and validation gates within this development preview." />
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Unlocked preview points" value={formatNeurons(preview.summary.totalUnlockedPreviewPoints)} detail="Available in this development preview" />
        <MetricCard label="Pending preview points" value={formatNeurons(preview.summary.totalPendingPreviewPoints)} detail="Locked behind preview progress and assessment state" />
        <MetricCard label="Recognition previews" value={preview.summary.eligibleRecognitionPreviews} detail="Badge preview only" />
      </section>
      <RewardClassPanel
        title="Foundation Preview"
        description="Free Course → Foundation Preview. Progression visibility for foundational formation gates."
        rewards={foundationRewards}
      />
      <RewardClassPanel
        title="Applied Preview"
        description="Paid Course → Applied Preview. Advanced progression after assessment and recognition review."
        rewards={appliedRewards}
      />
      <section className="academy-card grid gap-4 p-5">
        <div>
          <p className="academy-label">Preview Gate System</p>
          <h3 className="text-xl font-semibold text-slate-950">Main preview weight is tied to Proof-of-Knowledge validation</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Lesson consumption gates are intentionally small. Quiz and recognition gates carry the highest percentages to prevent passive preview farming.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {preview.courses.slice(0, 2).map((course) => (
            <article key={course.courseId} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{course.displayTitle}</p>
                <span className="academy-pill">{rewardGateService.getValidationWeight(course.courseId)}% validation weight</span>
              </div>
              <RewardGateList gates={rewardGateService.getRewardGates(course.courseId)} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
