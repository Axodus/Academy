type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="grid gap-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">{label}</span>
          <span className="font-semibold text-slate-900">{safeValue}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-teal-700" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
