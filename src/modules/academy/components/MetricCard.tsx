import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type MetricCardProps = { label: string; value: ReactNode; detail?: string; icon?: LucideIcon; tone?: "blue" | "teal" | "violet" | "amber" };
const tones = { blue: "text-blue-300 bg-blue-500/10 border-blue-500/25", teal: "text-teal-300 bg-teal-500/10 border-teal-500/25", violet: "text-violet-300 bg-violet-500/10 border-violet-500/25", amber: "text-amber-300 bg-amber-500/10 border-amber-500/25" };

export function MetricCard({ label, value, detail, icon: Icon, tone = "blue" }: MetricCardProps) {
  return (
    <article className="academy-card min-w-0 p-4">
      <div className="flex items-start gap-3">
        {Icon ? <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${tones[tone]}`}><Icon size={19} /></div> : null}
        <div className="min-w-0">
          <p className="academy-label">{label}</p>
          <div className="academy-value mt-1 truncate text-2xl font-medium text-white">{value}</div>
          {detail ? <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p> : null}
        </div>
      </div>
    </article>
  );
}
