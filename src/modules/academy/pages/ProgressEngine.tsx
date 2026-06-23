import { MetricCard } from "../components/MetricCard";
import { ProgressBar } from "../components/ProgressBar";
import { StatusBadge } from "../components/StatusBadge";
import { academyData } from "../services/academyData";
import { studentAcademyService } from "../services/studentAcademyService";
import { formatNeurons } from "../utils/format";

export function ProgressEngine() {
  const { student, progressEngine } = academyData;
  const studentCourses = studentAcademyService.getStudentCourses();

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="academy-label">Progress Engine</p>
            <h2 className="mt-1 text-3xl font-semibold text-slate-950">Capability, trust, unlocks, and ecosystem eligibility</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Central mock surface for Academy progression before any production reward, credential, or provider authority is enabled.
            </p>
          </div>
          <StatusBadge label={student.constitutionalStanding} />
        </div>
        <ProgressBar value={student.pokReadiness} label="PoK readiness" />
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="User level" value={student.level} detail={`Level index ${student.levelIndex}`} />
        <MetricCard label="Trust score" value={student.trustScore} detail="Mock anti-abuse and participation signal" />
        <MetricCard label="Foundation points" value={formatNeurons(student.foundationPoints)} detail="Local preview utility" />
        <MetricCard label="Applied points" value={formatNeurons(student.appliedPoints)} detail="Local preview model" />
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Completed courses" value={student.completedCourses} />
        <MetricCard label="Recognition previews" value={student.recognitionPreviews} />
        <MetricCard label="ACS eligibility" value={student.acsEligibility} />
        <MetricCard label="Marketplace eligibility" value={student.marketplaceEligibility} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Next unlocks</h3>
          {progressEngine.nextUnlocks.map((unlock) => (
            <article key={unlock.id} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-950">{unlock.label}</p>
              <p className="mt-1 text-sm font-semibold text-academy-blue">{unlock.reward}</p>
              <p className="mt-2 text-sm text-slate-600">{unlock.requirement}</p>
            </article>
          ))}
        </div>
        <div className="academy-card grid gap-4 p-5">
          <h3 className="text-xl font-semibold text-slate-950">Progression analytics</h3>
          {progressEngine.analytics.map((item) => <ProgressBar key={item.label} label={item.label} value={item.value} />)}
        </div>
      </section>

      <section className="academy-card grid gap-4 p-5">
        <div>
          <p className="academy-label">Student course progression</p>
          <h3 className="text-xl font-semibold text-slate-950">Content, PoK validation, and reward unlock are tracked separately</h3>
        </div>
        <div className="grid gap-4">
          {studentCourses.map((item) => {
            if (!item) return null;
            const { course, progress, validationWeight, previewPointLabel } = item;
            return (
              <article key={course.id} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-950">{course.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{previewPointLabel} / {validationWeight}% validation-weighted preview</p>
                  </div>
                  <StatusBadge label={progress?.pokStatus ?? "pending"} />
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <ProgressBar value={progress?.contentProgress ?? 0} label="Content progress" />
                  <ProgressBar value={progress?.lessonCompletion ?? 0} label="Lesson completion" />
                  <ProgressBar value={progress?.validationProgress ?? 0} label="Validation progress" />
                  <ProgressBar value={progress?.rewardUnlockProgress ?? 0} label="Preview unlock" />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
