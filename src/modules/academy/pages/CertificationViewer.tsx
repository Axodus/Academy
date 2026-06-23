import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { academyData, getCourseTitle } from "../services/academyData";

export function CertificationViewer() {
  return (
    <>
      <section>
        <p className="academy-label">Recognition Viewer</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Recognition previews with PoK and governance review visibility</h2>
        <p className="mt-2 max-w-3xl text-slate-600">Recognition previews remain review-only, local, and non-authoritative in this MVP.</p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {academyData.certificates.map((certificate) => (
          <article key={certificate.id} className="academy-card grid gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="academy-label">{certificate.recognitionLevel}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-950">{getCourseTitle(certificate.courseId)}</h3>
              </div>
              <StatusBadge label={certificate.previewStatus} />
            </div>
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              <Info label="Reviewed on" value={certificate.reviewedOn} />
              <Info label="Preview expires" value={certificate.expiresOn} />
              <Info label="Governance reviewed" value={certificate.governanceReviewed ? "yes" : "no"} />
              <Info label="Preview note" value={certificate.previewNote} />
            </dl>
            <Link className="text-sm font-semibold text-academy-blue" to={`/courses/${academyData.courses.find((course) => course.id === certificate.courseId)?.slug}`}>Open source course</Link>
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
