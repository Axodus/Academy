export function formatNeurons(amount: number) {
  return `${amount.toLocaleString("en-US")} $NEURONS`;
}

export function statusTone(status: string) {
  if (["approved", "compliant", "verified", "mock-verified", "passed", "eligible", "validated", "unlocked"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (["under-review", "probation", "queued-mock", "active-mock", "pending", "available", "in-progress", "retry-required"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (["restricted", "deprecated", "sanctioned", "suspended", "rejected", "failed", "blocked"].includes(status)) {
    return "border-red-200 bg-red-50 text-red-800";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}
