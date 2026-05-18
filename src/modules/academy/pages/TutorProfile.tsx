import { Navigate, useParams } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { academyData, getTutor } from "../services/academyData";

export function TutorProfile() {
  const { id } = useParams();
  const tutor = id ? getTutor(id) : undefined;

  if (!tutor) return <Navigate to="/" replace />;

  const courses = academyData.courses.filter((course) => course.tutorId === tutor.id);

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={tutor.verificationStatus} />
          <StatusBadge label={tutor.governanceStanding} />
          <span className="academy-pill">{tutor.type}</span>
        </div>
        <div>
          <p className="academy-label">Tutor Profile</p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">{tutor.name}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{tutor.description}</p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Reputation" value={tutor.reputation} />
        <MetricCard label="Courses published" value={tutor.coursesPublished} />
        <MetricCard label="Certificates issued" value={tutor.certificatesIssued} />
        <MetricCard label="Educational tier" value={tutor.educationalTier} />
      </section>
      <section>
        <h3 className="mb-3 text-xl font-semibold text-slate-950">Published courses</h3>
        <div className="grid gap-4 lg:grid-cols-3">
          {courses.map((course) => <CourseCard key={course.id} course={course} tutor={tutor} />)}
        </div>
      </section>
    </>
  );
}
