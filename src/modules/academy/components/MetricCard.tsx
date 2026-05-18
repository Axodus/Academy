import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: ReactNode;
  detail?: string;
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <article className="academy-card p-4">
      <p className="academy-label">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
      {detail && <p className="mt-2 text-sm text-slate-600">{detail}</p>}
    </article>
  );
}
