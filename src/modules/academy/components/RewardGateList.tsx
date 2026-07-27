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
        <article key={gate.id} className={`rounded-lg border bg-academy-elevated/45 p-4 ${gate.status === "unlocked" ? "border-teal-400/35" : gate.status === "rejected" ? "border-red-400/35" : "border-academy-line"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold capitalize text-slate-950">{gate.source} gate</p>
              <p className="mt-1 text-sm text-slate-600">{gate.unlockCondition}</p>
            </div>
            <StatusBadge label={gate.status} />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Reward weight</span>
              <span>{gate.rewardPercentage}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
              <div className={`h-full rounded-full ${gate.source === "quiz" || gate.source === "certification" ? "bg-academy-blue" : "bg-slate-500"}`} style={{ width: `${gate.rewardPercentage}%` }} />
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="academy-label">Validation role</p>
              <p className="mt-1 font-semibold text-slate-900">{gate.source === "quiz" || gate.source === "certification" ? "PoK weighted" : "Low-weight progress"}</p>
            </div>
            <div>
              <p className="academy-label">Preview points</p>
              <p className="mt-1 font-semibold text-slate-900">{formatNeurons(gate.previewPoints)}</p>
            </div>
            <div>
              <p className="academy-label">Tier</p>
              <p className={`mt-1 font-semibold ${gate.rewardClass === "foundation" ? "text-blue-300" : "text-violet-300"}`}>{gate.rewardClass === "foundation" ? "Foundation Preview" : "Applied Preview"}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
