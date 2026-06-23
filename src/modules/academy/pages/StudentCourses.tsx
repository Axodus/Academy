import { Link } from "react-router-dom";
import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { studentAcademyService } from "../services/studentAcademyService";
import { formatNeurons } from "../utils/format";

export function StudentCourses() {
  const studentCourses = studentAcademyService.getStudentCourses();
  const freeCourses = studentCourses.filter((item) => item?.course.accessType === "free");
  const paidCourses = studentCourses.filter((item) => item?.course.accessType === "paid");

  return (
    <>
      <section className="academy-card grid gap-3 p-6">
        <p className="academy-label">My Courses</p>
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">Student-side learning, PoK, and preview gates</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Enrolled and purchased courses are tracked by content progress, validation progress, PoK status, recognition-preview eligibility, and preview unlock gates.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="academy-label">Core product rule</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">Main preview progress requires Proof-of-Knowledge. Watching content only advances low-weight lesson gates.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Enrolled free courses" value={freeCourses.length} detail="Free -> Foundation Preview" />
        <MetricCard label="Purchased paid courses" value={paidCourses.length} detail="Paid -> Applied Preview" />
        <MetricCard label="Foundation earned" value={formatNeurons(sumEarned(studentCourses, "foundation"))} detail="Local preview only" />
        <MetricCard label="Applied earned" value={formatNeurons(sumEarned(studentCourses, "applied"))} detail="Local preview only" />
      </section>

      <section className="grid gap-4">
        {studentCourses.map((item) => {
          if (!item) return null;
          const { course, progress, quiz, enrollment, validationWeight, previewPointLabel } = item;
          return (
            <article key={course.id} className="academy-card grid gap-5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge label={enrollment.accessState} />
                    <span className="academy-pill">{course.accessType === "free" ? "Free Course" : "Paid Course"}</span>
                    <span className={course.accessType === "free" ? "academy-pill-locked" : "academy-pill-unlocked"}>{previewPointLabel}</span>
                  </div>
                  <Link to={`/academy/my-courses/${course.id}`} className="mt-3 block text-xl font-semibold text-slate-950 hover:text-academy-blue">
                    {course.title}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">{course.shortDescription}</p>
                </div>
                <Link className="academy-action" to={`/academy/learn/${course.id}`}>
                  Continue learning
                </Link>
              </div>

              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_220px]">
                <div className="academy-surface p-3"><ProgressBar value={progress?.contentProgress ?? 0} label="Content progress" /></div>
                <div className="academy-surface p-3"><ProgressBar value={progress?.validationProgress ?? 0} label="Validation progress" /></div>
                <div className="academy-surface p-3"><ProgressBar value={progress?.rewardUnlockProgress ?? 0} label="Preview unlock progress" /></div>
                <div className="academy-surface p-3">
                  <p className="academy-label">PoK / quiz</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge label={progress?.pokStatus ?? "pending"} />
                    <StatusBadge label={progress?.quizState ?? quiz?.state ?? "locked"} />
                  </div>
                </div>
              </div>

              <dl className="grid gap-3 text-sm md:grid-cols-4">
                <div className="academy-surface p-3">
                  <dt className="academy-label">Lessons</dt>
                  <dd className="mt-1 text-slate-800">{progress?.completedLessons ?? 0} completed / {progress?.pendingLessons ?? 0} pending</dd>
                </div>
                <div className="academy-surface p-3">
                  <dt className="academy-label">Certification</dt>
                  <dd className="mt-1 text-slate-800">{progress?.certificationEligibility ?? "not-eligible"}</dd>
                </div>
                <div className="academy-surface p-3">
                  <dt className="academy-label">Validation weight</dt>
                  <dd className="mt-1 text-slate-800">{validationWeight}% tied to quiz/recognition</dd>
                </div>
                <div className="academy-surface p-3">
                  <dt className="academy-label">Next action</dt>
                  <dd className="mt-1 text-slate-800">{progress?.nextRecommendedAction ?? enrollment.nextAction}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </section>
    </>
  );
}

function sumEarned(items: ReturnType<typeof studentAcademyService.getStudentCourses>, type: "foundation" | "applied") {
  return items.reduce((sum, item) => {
    if (!item?.progress) return sum;
    return sum + (type === "foundation" ? item.progress.foundationPointsEarned : item.progress.appliedPointsEarned);
  }, 0);
}
