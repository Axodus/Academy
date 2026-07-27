import { StatusBadge } from "../components/StatusBadge";
import { academyData } from "../services/academyData";
import { PageHeader } from "../components/PageHeader";

export function AcademyGovernanceReview() {
  return (
    <>
      <PageHeader eyebrow="Institutional boundary" title="Governance Review" description="Read-only visibility into constitutional, reward, curriculum, and recognition review queues." />
      <section className="grid gap-4 lg:grid-cols-2">
        {academyData.governanceReviews.map((review) => (
          <article key={review.id} className="academy-card grid gap-3 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold text-slate-950">{review.area}</h3>
              <StatusBadge label={review.status} />
            </div>
            <p className="text-sm text-slate-600">{review.notes}</p>
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              <div>
                <dt className="academy-label">Reviewer</dt>
                <dd className="mt-1 text-slate-800">{review.reviewer}</dd>
              </div>
              <div>
                <dt className="academy-label">Risk</dt>
                <dd className="mt-1 text-slate-800">{review.risk}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
      <section className="academy-card grid gap-4 p-5">
        <h3 className="text-xl font-semibold text-slate-950">ACS workflows</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {academyData.acsWorkflows.map((workflow) => (
            <article key={workflow.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{workflow.name}</p>
                <StatusBadge label={workflow.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{workflow.escalation}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
