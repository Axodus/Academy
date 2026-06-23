import type { RewardRecord } from "../types/academy";
import { formatNeurons } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

type RewardClassPanelProps = {
  title: string;
  description: string;
  rewards: RewardRecord[];
};

export function RewardClassPanel({ title, description, rewards }: RewardClassPanelProps) {
  const total = rewards.reduce((sum, reward) => sum + reward.previewPoints, 0);

  return (
    <section className="academy-card grid gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="academy-label">Reward class</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>
        </div>
        <div className="rounded-lg bg-slate-100 px-4 py-3 text-right">
          <p className="academy-label">Mock balance</p>
          <p className="text-lg font-semibold text-slate-950">{formatNeurons(total)}</p>
        </div>
      </div>
      <div className="grid gap-3">
        {rewards.map((reward) => (
          <article key={reward.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-950">{formatNeurons(reward.previewPoints)}</p>
                <p className="text-sm text-slate-600">{reward.previewSource}</p>
              </div>
              <StatusBadge label={reward.governanceControlled ? "governance-controlled" : "local-only"} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm md:grid-cols-3">
              <div>
                <dt className="academy-label">Preview Source</dt>
                <dd className="mt-1 text-slate-800">{reward.previewSource}</dd>
              </div>
              <div>
                <dt className="academy-label">Preview Benefits</dt>
                <dd className="mt-1 text-slate-800">{reward.previewBenefits.join(", ")}</dd>
              </div>
              <div>
                <dt className="academy-label">Preview Policy</dt>
                <dd className="mt-1 text-slate-800">{reward.previewPolicy}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
