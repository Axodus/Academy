import { Link, Navigate, useParams } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { academyData, getLearningPath, getTutor, listCatalogCourses, listLearningPaths } from "../services/academyData";

export function LearningPathViewer() {
  const { id } = useParams();
  const path = getLearningPath(id);

  if (!path) return <Navigate to="/" replace />;

  const courses = path.courseIds
    .map((courseId) => listCatalogCourses().find((course) => course.id === courseId))
    .filter((course) => !!course);

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={path.standing} />
          <span className="academy-pill">Learning Path Viewer</span>
        </div>
        <div>
          <p className="academy-label">Formation path</p>
          <h2 className="mt-1 text-3xl font-semibold text-slate-950">{path.title}</h2>
          <p className="mt-2 max-w-3xl text-slate-600">{path.description}</p>
        </div>
        <ProgressBar value={path.progress} label="Path progress" />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        {courses.map((course) => course && <CourseCard key={course.id} course={course} tutor={getTutor(course.tutorId)} />)}
      </section>
      <section className="academy-card p-5">
        <h3 className="text-xl font-semibold text-slate-950">Available paths</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {listLearningPaths().map((item) => (
            <Link key={item.id} className="academy-pill hover:border-academy-blue" to={`/paths/${item.id}`}>{item.title}</Link>
          ))}
        </div>
      </section>
    </>
  );
}
