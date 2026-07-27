import { FlaskConical } from "lucide-react";
import { getAcademyPreviewRuntime } from "../services/academyPreviewRuntime";

export function EnvironmentIndicator() {
  const runtime = getAcademyPreviewRuntime();
  return (
    <details className="relative">
      <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-violet-400/35 bg-violet-500/10 px-2.5 text-xs font-semibold text-violet-300 hover:border-violet-300/60" aria-label="Development Preview environment details">
        <FlaskConical size={15} /><span className="hidden sm:inline">Development Preview</span>
      </summary>
      <div className="absolute right-0 mt-2 w-[min(320px,calc(100vw-2rem))] rounded-xl border border-academy-line bg-[#0a1726] p-4 shadow-2xl">
        <p className="font-semibold text-white">Local preview boundary</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">This interface uses deterministic local fixtures. It does not issue credentials, move funds, publish governance decisions, or provide production authority.</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="academy-surface p-2"><dt className="text-slate-500">Data</dt><dd className="mt-1 text-slate-200">{runtime.authority}</dd></div>
          <div className="academy-surface p-2"><dt className="text-slate-500">Execution</dt><dd className="mt-1 text-slate-200">{runtime.execution}</dd></div>
          <div className="academy-surface p-2"><dt className="text-slate-500">Rewards</dt><dd className="mt-1 text-slate-200">{runtime.rewardAuthority}</dd></div>
          <div className="academy-surface p-2"><dt className="text-slate-500">Credentials</dt><dd className="mt-1 text-slate-200">{runtime.certificateAuthority}</dd></div>
        </dl>
      </div>
    </details>
  );
}
