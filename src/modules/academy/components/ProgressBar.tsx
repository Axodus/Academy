type ProgressBarProps = { value: number; label?: string; tone?: "blue" | "teal" | "violet" | "amber"; detail?: string };

const tones = { blue: "bg-academy-blue", teal: "bg-academy-cyan", violet: "bg-academy-violet", amber: "bg-academy-amber" };

export function ProgressBar({ value, label, tone = "blue", detail }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return (
    <div className="min-w-0">
      {label ? <div className="mb-2 flex items-start justify-between gap-3 text-sm"><span className="text-slate-300">{label}</span><span className="academy-value shrink-0 text-slate-200">{safeValue}%</span></div> : null}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/80" role="progressbar" aria-label={label ?? "Progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <div className={`h-full rounded-full transition-[width] duration-500 ${tones[tone]}`} style={{ width: `${safeValue}%` }} />
      </div>
      {detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}
