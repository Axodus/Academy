import { Award, BookOpen, LockKeyhole, ShieldCheck, SquareCheckBig } from "lucide-react";

const stages = [
  { label: "Learning", icon: BookOpen },
  { label: "Assessment", icon: SquareCheckBig },
  { label: "PoK", icon: ShieldCheck },
  { label: "Recognition", icon: Award },
  { label: "Unlock", icon: LockKeyhole }
];

export function ProgressionFlow({ activeStage = 0, compact = false }: { activeStage?: number; compact?: boolean }) {
  return (
    <ol className={`grid grid-cols-5 ${compact ? "gap-1" : "gap-2"}`} aria-label="Knowledge progression">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const complete = index < activeStage;
        const active = index === activeStage;
        return <li key={stage.label} className="relative min-w-0 text-center before:absolute before:left-0 before:right-1/2 before:top-4 before:h-px before:bg-academy-line first:before:hidden after:absolute after:left-1/2 after:right-0 after:top-4 after:h-px after:bg-academy-line last:after:hidden"><div className={`relative z-10 mx-auto grid h-8 w-8 place-items-center rounded-full border ${complete ? "border-teal-400 bg-teal-400/15 text-teal-300" : active ? "border-blue-400 bg-blue-500/20 text-blue-300" : "border-academy-line bg-[#0b1726] text-slate-500"}`}><Icon size={15} /></div><span className={`mt-2 block truncate text-[10px] sm:text-xs ${active ? "text-blue-300" : complete ? "text-teal-300" : "text-slate-500"}`}>{stage.label}</span></li>;
      })}
    </ol>
  );
}
