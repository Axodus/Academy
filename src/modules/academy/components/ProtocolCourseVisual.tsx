import { BookOpenCheck, Landmark, Network, ShieldCheck } from "lucide-react";

export function ProtocolCourseVisual({ category, tier, className = "" }: { category: string; tier: string; className?: string }) {
  const normalized = category.toLowerCase();
  const Icon = normalized.includes("governance") ? Landmark : normalized.includes("knowledge") ? ShieldCheck : normalized.includes("market") ? Network : BookOpenCheck;
  const applied = tier === "Applied Preview";
  return (
    <div className={`academy-grid-pattern relative overflow-hidden bg-[#071526] ${className}`} aria-hidden="true">
      <div className={`absolute -bottom-12 left-[8%] h-28 w-[84%] rounded-[50%] border ${applied ? "border-violet-400/40 shadow-[0_0_45px_rgba(155,108,255,0.16)]" : "border-blue-400/40 shadow-[0_0_45px_rgba(22,119,255,0.18)]"}`} />
      <div className={`absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-lg border ${applied ? "border-violet-400/45 bg-violet-500/10 text-violet-300" : "border-blue-400/45 bg-blue-500/10 text-blue-300"}`}><Icon size={24} /></div>
      <div className={`absolute inset-x-0 bottom-0 h-px ${applied ? "bg-violet-400/50" : "bg-blue-400/50"}`} />
    </div>
  );
}
