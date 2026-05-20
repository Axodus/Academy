import { Link, Navigate, useParams } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { RewardGateList } from "../components/RewardGateList";
import { StatusBadge } from "../components/StatusBadge";
import { studentAcademyService } from "../services/studentAcademyService";
import { formatNeurons } from "../utils/format";

export function StudentCourseDetail() {
  const { courseId } = useParams();
  const detail = courseId ? studentAcademyService.getStudentCourse(courseId) : undefined;

  if (!detail) return <Navigate to="/my-courses" replace />;

  const { course, progress, lessons, lessonProgress, moduleProgress, quiz, quizState, pokStatus, rewardGates, certificationRequirement, rewardTypeLabel, validationWeight } = detail;

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="academy-label">Enrolled Course</p>
            <h2 className="mt-1 text-3xl font-semibold text-slate-950">{course.title}</h2>
            <p className="mt-2 max-w-3xl text-slate-600">{course.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={course.constitutionalStanding} />
            <StatusBadge label={pokStatus?.status ?? "pending"} />
            <span className="academy-pill">{rewardTypeLabel}</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <ProgressBar value={progress?.contentProgress ?? 0} label="Content completion" />
          <ProgressBar value={progress?.validationProgress ?? 0} label="PoK validation" />
          <ProgressBar value={progress?.rewardUnlockProgress ?? 0} label="Reward gates" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="academy-card grid gap-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="academy-label">Modules and Lessons</p>
              <h3 className="text-xl font-semibold text-slate-950">Required content before quiz unlock</h3>
            </div>
            <Link className="rounded-md bg-academy-blue px-3 py-2 text-sm font-semibold text-white" to={`/learn/${course.id}`}>
              Open workspace
            </Link>
          </div>

          {moduleProgress.map((module) => (
            <article key={module.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">{module.title}</p>
                <StatusBadge label={module.status} />
              </div>
              <div className="mt-3">
                <ProgressBar value={module.progress} label="Module completion" />
              </div>
              <div className="mt-4 grid gap-2">
                {lessons
                  .filter((lesson) => module.lessonIds.includes(lesson.id))
                  .map((lesson) => {
                    const state = lessonProgress.find((item) => item.lessonId === lesson.id);
                    return (
                      <Link key={lesson.id} to={`/learn/${course.id}/lessons/${lesson.id}`} className="rounded-md border border-slate-200 p-3 hover:border-academy-blue">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-slate-900">{lesson.order}. {lesson.title}</p>
                          <StatusBadge label={state?.status ?? lesson.status} />
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{lesson.type} / {lesson.duration} / {lesson.completionRequired ? "required" : "optional"}</p>
                      </Link>
                    );
                  })}
              </div>
            </article>
          ))}
        </div>

        <aside className="grid gap-4">
          <section className="academy-card p-5">
            <p className="academy-label">Quiz / Evaluation Engine</p>
            <h3 className="mt-1 text-xl font-semibold text-slate-950">{quiz?.title ?? "No quiz configured"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge label={quizState} />
              <StatusBadge label={pokStatus?.status ?? "pending"} />
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="academy-label">Passing threshold</dt>
                <dd className="mt-1 text-slate-800">{quiz?.passingThreshold ?? 0}%</dd>
              </div>
              <div>
                <dt className="academy-label">Current score</dt>
                <dd className="mt-1 text-slate-800">{progress?.quizScore ?? "Not attempted"}</dd>
              </div>
              <div>
                <dt className="academy-label">Certification requirement</dt>
                <dd className="mt-1 text-slate-800">{certificationRequirement?.status ?? "not configured"}</dd>
              </div>
            </dl>
          </section>

          <section className="academy-card p-5">
            <p className="academy-label">Reward distribution</p>
            <p className="mt-1 text-xl font-semibold text-slate-950">{formatNeurons(course.rewardAmount)} total</p>
            <p className="mt-2 text-sm text-slate-600">{validationWeight}% of reward weight is tied to quiz and certification validation.</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {course.accessType === "free" ? "Free courses generate Locked $NEURONS only." : "Paid courses generate Unlocked $NEURONS progressively after validation."}
            </p>
          </section>
        </aside>
      </section>

      <section className="academy-card grid gap-4 p-5">
        <div>
          <p className="academy-label">Reward Gates</p>
          <h3 className="text-xl font-semibold text-slate-950">Passive consumption is intentionally low-weight</h3>
        </div>
        <RewardGateList gates={rewardGates} />
      </section>
    </>
  );
}
