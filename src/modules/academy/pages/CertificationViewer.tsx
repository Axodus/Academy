import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import { academyData, getCourseTitle } from "../services/academyData";

export function CertificationViewer() {
  return (
    <>
      <section>
        <p className="academy-label">Certification Viewer</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Mock credentials with PoK and governance review visibility</h2>
        <p className="mt-2 max-w-3xl text-slate-600">No NFT certificate or contract issuance occurs in this MVP.</p>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {academyData.certificates.map((certificate) => (
          <article key={certificate.id} className="academy-card grid gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="academy-label">{certificate.certificationLevel}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-950">{getCourseTitle(certificate.courseId)}</h3>
              </div>
              <StatusBadge label={certificate.verificationStatus} />
            </div>
            <dl className="grid gap-3 text-sm md:grid-cols-2">
              <Info label="Issue date" value={certificate.issueDate} />
              <Info label="Expiration" value={certificate.expiration} />
              <Info label="Governance validated" value={certificate.governanceValidated ? "yes" : "no"} />
              <Info label="NFT compatible" value={certificate.nftCompatible ? "future-compatible" : "no"} />
              <Info label="Proof hash" value={certificate.proofHash} />
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
