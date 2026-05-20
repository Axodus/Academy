import type { RewardGate } from "../types/academy";
import { formatNeurons } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

type RewardGateListProps = {
  gates: RewardGate[];
};

export function RewardGateList({ gates }: RewardGateListProps) {
  return (
    <div className="grid gap-3">
      {gates.map((gate) => (
        <article key={gate.id} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-950">{gate.source} gate</p>
              <p className="mt-1 text-sm text-slate-600">{gate.unlockCondition}</p>
            </div>
            <StatusBadge label={gate.status} />
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="academy-label">Weight</p>
              <p className="mt-1 font-semibold text-slate-900">{gate.rewardPercentage}%</p>
            </div>
            <div>
              <p className="academy-label">Amount</p>
              <p className="mt-1 font-semibold text-slate-900">{formatNeurons(gate.rewardAmount)}</p>
            </div>
            <div>
              <p className="academy-label">Class</p>
              <p className="mt-1 font-semibold text-slate-900">{gate.rewardClass === "locked" ? "Locked $NEURONS" : "Unlocked $NEURONS"}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
