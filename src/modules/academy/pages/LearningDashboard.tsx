import { Link } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { academyData, getTutor } from "../services/academyData";
import { formatNeurons } from "../utils/format";

export function LearningDashboard() {
  const { student } = academyData;

  return (
    <>
      <section>
        <p className="academy-label">Learning Dashboard</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Student progress, governance standing, and ecosystem activation</h2>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Completed courses" value={student.completedCourses} detail={`${student.activeCourses} active courses`} />
        <MetricCard label="Certifications" value={student.certifications} detail="Mock verified credentials" />
        <MetricCard label="Locked $NEURONS" value={formatNeurons(student.lockedNeurons)} detail="Internal balance only" />
        <MetricCard label="Unlocked $NEURONS" value={formatNeurons(student.unlockedNeurons)} detail="Future wallet-compatible" />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Active learning telemetry</h3>
          {academyData.courses.map((course) => (
            <article key={course.id} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Link to={`/courses/${course.slug}`} className="font-semibold text-slate-950 hover:text-academy-blue">{course.title}</Link>
                <StatusBadge label={course.constitutionalStanding} />
              </div>
              <ProgressBar value={course.progress} label={`${course.rewardType} / ${course.rewardSource}`} />
            </article>
          ))}
        </div>
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Tutor metrics</h3>
          {academyData.tutors.map((tutor) => (
            <Link key={tutor.id} to={`/tutors/${tutor.id}`} className="rounded-lg border border-slate-200 p-4 hover:border-academy-blue">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{tutor.name}</p>
                <StatusBadge label={tutor.governanceStanding} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{tutor.coursesPublished} courses / {tutor.certificatesIssued} certificates / reputation {tutor.reputation}</p>
            </Link>
          ))}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="academy-label">Current tutor relationship</p>
            <p className="mt-1 text-sm text-slate-700">{getTutor("tutor-axodus-governance")?.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
