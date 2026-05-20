import { RewardClassPanel } from "../components/RewardClassPanel";
import { RewardGateList } from "../components/RewardGateList";
import { academyData } from "../services/academyData";
import { rewardGateService } from "../services/rewardGateService";

export function RewardsDashboard() {
  const lockedRewards = academyData.rewards.filter((reward) => reward.rewardType === "Locked $NEURONS");
  const unlockedRewards = academyData.rewards.filter((reward) => reward.rewardType === "Unlocked $NEURONS");

  return (
    <>
      <section>
        <p className="academy-label">Rewards Dashboard</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Reward Classes and treasury-controlled mock accounting</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          The MVP separates free-course Locked $NEURONS from paid-course Unlocked $NEURONS. All balances are mock-only.
        </p>
      </section>
      <RewardClassPanel
        title="Locked Rewards"
        description="Free Course -> Locked $NEURONS. Internal balance only with no withdrawal, no transfer, and no swap. Utility is limited to vouchers, NFTs, marketplace purchases, internal services, licenses, benefits, and voting utilities."
        rewards={lockedRewards}
      />
      <RewardClassPanel
        title="Unlocked Rewards"
        description="Paid Course -> Unlocked $NEURONS. Higher reward potential with future direct wallet distribution after progress, certification, governance, and treasury approval."
        rewards={unlockedRewards}
      />
      <section className="academy-card grid gap-4 p-5">
        <div>
          <p className="academy-label">Reward Gate System</p>
          <h3 className="text-xl font-semibold text-slate-950">Main reward weight is tied to Proof-of-Knowledge validation</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Lesson consumption gates are intentionally small. Quiz and certification gates carry the highest percentages to prevent passive reward farming.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {academyData.courses.slice(0, 2).map((course) => (
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
