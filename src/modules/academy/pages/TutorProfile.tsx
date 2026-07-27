import { Navigate, useParams } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { MetricCard } from "../components/MetricCard";
import { StatusBadge } from "../components/StatusBadge";
import { PageHeader } from "../components/PageHeader";
import { academyData, getTutor } from "../services/academyData";

export function TutorProfile() {
  const { id } = useParams();
  const tutor = id ? getTutor(id) : undefined;

  if (!tutor) return <Navigate to="/" replace />;

  const courses = academyData.courses.filter((course) => course.tutorId === tutor.id);

  return (
    <>
      <PageHeader eyebrow="Academy faculty" title={tutor.name} description={tutor.description} meta={<><StatusBadge label={tutor.reviewStatus} /><StatusBadge label={tutor.governanceStanding} /><span className="academy-pill">{tutor.type}</span></>} />
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Reputation" value={tutor.reputation} />
        <MetricCard label="Courses published" value={tutor.coursesPublished} />
        <MetricCard label="Recognition previews" value={tutor.recognitionPreviewsAuthored} />
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
