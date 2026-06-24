import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { academyLearnerExperienceService } from "../services/academyLearnerExperienceService";

export function CertificationViewer() {
  const preview = academyLearnerExperienceService.getDashboardPreview();

  return (
    <>
      <section>
        <p className="academy-label">Certificate Preview</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Recognition previews and certificate preview presentation</h2>
        <p className="mt-2 max-w-3xl text-slate-600">Certificate preview surfaces remain local, preview-only, and non-authoritative.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge label={preview.runtime.authority} />
          <StatusBadge label={preview.runtime.outputAuthority} />
          <StatusBadge label={preview.runtime.certificateAuthority} />
        </div>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {preview.certificates.map((certificate) => (
          <article key={certificate.courseId} className="academy-card grid gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="academy-label">{certificate.recognitionLevel}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-950">{certificate.displayTitle}</h3>
              </div>
              <StatusBadge label={certificate.state} />
            </div>
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              <Info label="Reviewed on" value={certificate.reviewedOn} />
              <Info label="Preview expires" value={certificate.expiresOn} />
              <Info label="Governance reviewed" value={certificate.governanceReviewed ? "yes" : "no"} />
              <Info label={certificate.previewLabel} value={certificate.previewNote} />
            </dl>
            <Link className="text-sm font-semibold text-academy-blue" to="/academy/dashboard">Return to learner dashboard</Link>
          </article>
        ))}
      </section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="academy-label">{label}</dt>
      <dd className="mt-1 text-slate-800">{value}</dd>
    </div>
  );
}
