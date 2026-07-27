import { CircleDashed } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="academy-surface grid min-h-44 place-items-center p-6 text-center"><div><CircleDashed className="mx-auto text-slate-500" size={28} /><h3 className="mt-3 font-semibold text-white">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{description}</p>{action ? <div className="mt-4">{action}</div> : null}</div></div>;
}
