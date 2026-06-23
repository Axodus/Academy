import { RewardClassPanel } from "../components/RewardClassPanel";
import { RewardGateList } from "../components/RewardGateList";
import { academyData, listCatalogCourses } from "../services/academyData";
import { rewardGateService } from "../services/rewardGateService";

export function RewardsDashboard() {
  const foundationRewards = academyData.rewards.filter((reward) => reward.previewPointTier === "Foundation Preview");
  const appliedRewards = academyData.rewards.filter((reward) => reward.previewPointTier === "Applied Preview");

  return (
    <>
      <section>
        <p className="academy-label">Rewards Dashboard</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Preview tiers and treasury-isolated mock accounting</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          The MVP separates free-course foundation previews from paid-course applied previews. All values are local, deterministic, and non-authoritative.
        </p>
      </section>
      <RewardClassPanel
        title="Foundation Preview"
        description="Free Course -> Foundation Preview. Local preview points only with no balance, claim, transfer, payout, or settlement semantics."
        rewards={foundationRewards}
      />
      <RewardClassPanel
        title="Applied Preview"
        description="Paid Course -> Applied Preview. Higher preview visibility after progress, recognition review, and governance-controlled mock checks."
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
          {listCatalogCourses().slice(0, 2).map((course) => (
            <article key={course.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{course.title}</p>
                <span className="academy-pill">{rewardGateService.getValidationWeight(course.id)}% validation weight</span>
              </div>
              <RewardGateList gates={rewardGateService.getRewardGates(course.id)} />
            </article>
          ))}
        </div>
      </section>
      <section className="academy-card grid gap-3 p-5">
        <h3 className="text-xl font-semibold text-slate-950">Future contract read models</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {academyData.futureContracts.map((contract) => (
            <article key={contract.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-950">{contract.name}</p>
              <p className="mt-1 text-sm text-slate-600">{contract.role}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-normal text-slate-500">Writes enabled: {contract.writesEnabled ? "yes" : "no"}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
