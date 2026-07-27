import { Check, Clock3, LockKeyhole, RotateCcw, ShieldAlert } from "lucide-react";

type Tone = "success" | "review" | "applied" | "info" | "danger" | "neutral";

function getTone(label: string): Tone {
  const value = label.toLowerCase();
  if (["approved", "completed", "validated", "passed", "eligible", "unlocked", "active", "compliant"].some((token) => value.includes(token)) && !value.includes("not-")) return "success";
  if (["review", "pending", "queued", "retry", "in-progress", "available"].some((token) => value.includes(token))) return "review";
  if (["applied", "advanced", "paid"].some((token) => value.includes(token))) return "applied";
  if (["rejected", "failed", "restricted", "deprecated"].some((token) => value.includes(token))) return "danger";
  if (["locked", "disabled", "not-", "blocked"].some((token) => value.includes(token))) return "neutral";
  return "info";
}

const styles: Record<Tone, string> = {
  success: "border-teal-400/35 bg-teal-400/10 text-teal-300",
  review: "border-amber-400/35 bg-amber-400/10 text-amber-300",
  applied: "border-violet-400/35 bg-violet-400/10 text-violet-300",
  info: "border-blue-400/35 bg-blue-400/10 text-blue-300",
  danger: "border-red-400/35 bg-red-400/10 text-red-300",
  neutral: "border-slate-500/35 bg-slate-500/10 text-slate-300"
};

export function StatusBadge({ label }: { label: string }) {
  const tone = getTone(label);
  const Icon = tone === "success" ? Check : tone === "review" ? Clock3 : tone === "danger" ? ShieldAlert : tone === "neutral" ? LockKeyhole : RotateCcw;
  return <span className={`inline-flex min-h-7 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${styles[tone]}`}><Icon size={12} aria-hidden="true" />{label.replaceAll("-", " ")}</span>;
}
