import { Link, Navigate, useParams } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { getCourseBySlug, getCourseLessons, getCourseRewards, getCourseTitle, getTutor } from "../services/academyData";
import { formatNeurons } from "../utils/format";

export function CourseDetails() {
  const { slug } = useParams();
  const course = getCourseBySlug(slug);

  if (!course) return <Navigate to="/courses" replace />;

  const tutor = getTutor(course.tutorId);
  const lessons = getCourseLessons(course.id);
  const rewards = getCourseRewards(course.id);

  return (
    <>
      <section className="academy-card overflow-hidden">
        <img className="h-64 w-full object-cover" src={course.banner} alt="" />
        <div className="grid gap-5 p-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={course.constitutionalStanding} />
            <StatusBadge label={course.governanceStatus} />
            <span className="academy-pill">{course.previewPointTier}</span>
            <span className="academy-pill">{course.proofOfKnowledgeRequired ? "PoK required" : "PoK optional"}</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="academy-label">{course.category} / {course.subcategory}</p>
              <h2 className="mt-1 text-3xl font-semibold text-slate-950">{course.title}</h2>
              <p className="mt-3 text-slate-600">{course.description}</p>
            </div>
            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="academy-label">Preview model</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">{formatNeurons(course.previewPoints)}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{course.previewSource} - {course.previewPointTier}</p>
              <p className="mt-2 text-sm text-slate-600">{course.previewPolicy}</p>
            </aside>
          </div>
          <ProgressBar value={course.progress} label="Course progress" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Info title="Tutor" value={tutor?.name ?? "Academy tutor"} detail={tutor?.description ?? ""} link={tutor ? `/tutors/${tutor.id}` : undefined} />
        <Info title="Access" value={course.accessType === "free" ? "Free Course" : "Paid Course"} detail={course.enrollmentVisibility} />
        <Info title="Recognition" value={course.recognitionPreviewEnabled ? "Recognition preview enabled" : "No recognition preview"} detail={`PoK requirement: ${course.proofOfKnowledgeRequired ? "required" : "not required"}`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="academy-card p-5">
          <h3 className="text-xl font-semibold text-slate-950">Lessons</h3>
          <div className="mt-4 grid gap-3">
            {lessons.map((lesson) => (
              <article key={lesson.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-950">{lesson.order}. {lesson.title}</p>
                  <StatusBadge label={lesson.status} />
                </div>
                <p className="mt-1 text-sm text-slate-600">{lesson.type} / {lesson.duration} / {lesson.quizRequired ? "quiz required" : "no quiz"}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="academy-card p-5">
          <h3 className="text-xl font-semibold text-slate-950">Reward and prerequisites</h3>
          <dl className="mt-4 grid gap-4 text-sm">
            <div>
              <dt className="academy-label">Preview benefits</dt>
              <dd className="mt-1 text-slate-800">{course.previewBenefits.join(", ")}</dd>
            </div>
            <div>
              <dt className="academy-label">Access descriptor</dt>
              <dd className="mt-1 text-slate-800">{course.accessDescriptor}</dd>
            </div>
            <div>
              <dt className="academy-label">Prerequisites</dt>
              <dd className="mt-1 text-slate-800">{course.prerequisites.length ? course.prerequisites.map(getCourseTitle).join(", ") : "None"}</dd>
            </div>
            <div>
              <dt className="academy-label">Preview records</dt>
              <dd className="mt-1 text-slate-800">{rewards.length ? rewards.map((reward) => reward.previewMilestones.join(", ")).join(" / ") : "No preview record yet"}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}

function Info({ title, value, detail, link }: { title: string; value: string; detail: string; link?: string }) {
  const content = (
    <article className="academy-card h-full p-4">
      <p className="academy-label">{title}</p>
      <p className="mt-2 font-semibold text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{detail}</p>
    </article>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}
