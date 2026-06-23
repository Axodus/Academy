import { Link } from "react-router-dom";
import { academyData, listCatalogCourses } from "../services/academyData";
import { formatNeurons } from "../utils/format";
import { CourseCard } from "../components/CourseCard";
import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";

export function AcademyHome() {
  const featured = listCatalogCourses().slice(0, 3);

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="academy-card overflow-hidden">
          <div className="grid gap-5 p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              <StatusBadge label="mock-only" />
              <StatusBadge label="governance-controlled" />
              <StatusBadge label="PoK-ready" />
            </div>
            <div>
              <p className="academy-label">Academy nucleus</p>
              <h2 className="mt-2 max-w-4xl text-4xl font-semibold leading-tight text-slate-950">
                Constitutional education, progression, and preview qualification before any production authority.
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-600">
                Academy tracks learning, trust, Proof of Knowledge readiness, and preview point classes through deterministic mock read models inside the local preview boundary.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="rounded-md bg-academy-blue px-4 py-2 text-sm font-semibold text-white" to="/courses">Explore courses</Link>
              <Link className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800" to="/progress">Open Progress Engine</Link>
            </div>
          </div>
        </div>
        <div className="academy-card grid gap-4 p-5">
          <div>
            <p className="academy-label">Preview doctrine</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-950">Free Course to Foundation Preview</h3>
            <p className="mt-2 text-sm text-slate-600">Local preview points only. Progress remains deterministic, local, and non-authoritative.</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-xl font-semibold text-slate-950">Paid Course to Applied Preview</h3>
            <p className="mt-2 text-sm text-slate-600">Higher preview visibility with progress, milestone completion, and recognition-preview eligibility. Execution authority remains closed.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Foundation points" value={formatNeurons(academyData.student.foundationPoints)} detail="Local preview utility" />
        <MetricCard label="Applied points" value={formatNeurons(academyData.student.appliedPoints)} detail="Advanced local preview" />
        <MetricCard label="Trust score" value={academyData.student.trustScore} detail={academyData.student.constitutionalStanding} />
        <MetricCard label="PoK readiness" value={`${academyData.student.pokReadiness}%`} detail="Mock validation score" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="academy-card grid gap-4 p-5">
          <h2 className="text-xl font-semibold text-slate-950">Constitutional Progression</h2>
          {academyData.progressEngine.analytics.map((item) => (
            <ProgressBar key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
        <div className="academy-card grid gap-3 p-5">
          <h2 className="text-xl font-semibold text-slate-950">Future Compatibility Read Models</h2>
          {academyData.futureContracts.map((contract) => (
            <div key={contract.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{contract.name}</p>
                <StatusBadge label={contract.status} />
              </div>
              <p className="mt-1 text-sm text-slate-600">{contract.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-950">Featured formation tracks</h2>
          <Link className="text-sm font-semibold text-academy-blue" to="/courses">View all</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {featured.map((course) => <CourseCard key={course.id} course={course} tutor={academyData.tutors.find((tutor) => tutor.id === course.tutorId)} />)}
        </div>
      </section>
    </>
  );
}
