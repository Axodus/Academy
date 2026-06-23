import { useMemo, useState } from "react";
import { BookOpenCheck, ClipboardCheck, Lock, PlayCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";
import { RewardGateList } from "../components/RewardGateList";
import { StatusBadge } from "../components/StatusBadge";
import { courseProgressService } from "../services/courseProgressService";
import { learningWorkspaceService } from "../services/learningWorkspaceService";
import { pokValidationService } from "../services/pokValidationService";
import { quizService } from "../services/quizService";
import { rewardGateService } from "../services/rewardGateService";
import { formatNeurons } from "../utils/format";

export function LearningCourseStart() {
  const { courseId } = useParams();
  const workspace = courseId ? learningWorkspaceService.getWorkspace(courseId) : undefined;

  if (!workspace?.lesson) return <Navigate to="/academy/my-courses" replace />;
  return <Navigate to={`/academy/learn/${workspace.course.id}/lessons/${workspace.lesson.id}`} replace />;
}

export function LearningWorkspace() {
  const { courseId, lessonId } = useParams();
  const initialWorkspace = courseId ? learningWorkspaceService.getWorkspace(courseId, lessonId) : undefined;
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(
    courseId
      ? courseProgressService
          .getLessonProgress(courseId)
          .filter((progress) => ["completed", "validated"].includes(progress.status))
          .map((progress) => progress.lessonId)
      : []
  );
  const [quizScore, setQuizScore] = useState<number | null>(initialWorkspace?.progress?.quizScore ?? null);
  const [quizMode, setQuizMode] = useState<"idle" | "passed" | "failed">("idle");

  const workspace = useMemo(() => {
    if (!courseId) return undefined;
    return learningWorkspaceService.getWorkspace(courseId, lessonId, completedLessonIds);
  }, [completedLessonIds, courseId, lessonId]);

  if (!workspace?.lesson) return <Navigate to="/academy/my-courses" replace />;

  const { course, lessons, lesson, resources, rewardGates, quiz, nextLesson, previousLesson, moduleProgress, previewPointLabel } = workspace;
  const currentProgress = workspace.lessonProgress;
  const isCompleted = completedLessonIds.includes(lesson.id) || ["completed", "validated"].includes(currentProgress?.status ?? "");
  const contentProgress = courseProgressService.getContentProgress(course.id, completedLessonIds);
  const requiredCompleted = courseProgressService.areRequiredLessonsCompleted(course.id, completedLessonIds);
  const quizState = quizService.getQuizState(course.id, completedLessonIds);
  const validationResult = quizScore === null ? undefined : pokValidationService.validateQuizScore(course.id, quizScore);
  const certificationEligible = courseProgressService.isCertificationEligible(course.id, validationResult?.status, contentProgress, quizScore);
  const visibleGates = rewardGates.map((gate) => ({
    ...gate,
    status: rewardGateService.getGateStatusAfterPok(gate.status, gate.source, validationResult?.approved ?? false)
  }));
  const lessonGate = rewardGates.find((gate) => gate.source === "lesson");
  const validationWeight = rewardGateService.getValidationWeight(course.id);
  const certificationRequirement = courseProgressService.getCertificationRequirement(course.id);
  const quizExplanation = requiredCompleted
    ? "All required lessons are consumed. The quiz is available for mock PoK validation."
    : "Quiz is locked until every required lesson in this module is consumed.";
  const pokStatus = validationResult?.status ?? workspace.progress?.pokStatus ?? "pending";
  const nextAction = validationResult?.approved
    ? "Review recognition eligibility and unlocked validation-weighted preview gates."
    : requiredCompleted
      ? "Run a passing mock attempt to approve PoK and release validation gates."
      : "Complete the remaining required lessons to unlock the quiz.";

  function markLessonComplete() {
    setCompletedLessonIds((current) => (current.includes(lesson.id) ? current : [...current, lesson.id]));
  }

  function runQuiz(mode: "pass" | "fail") {
    const score = quizService.getPreviewScore(course.id, mode);
    setQuizScore(score);
    setQuizMode(mode === "pass" ? "passed" : "failed");
  }

  return (
    <>
      <section className="academy-card grid gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="academy-label">Learning Workspace</p>
            <h2 className="mt-1 text-3xl font-semibold text-slate-950">{course.title}</h2>
            <p className="mt-2 max-w-3xl text-slate-600">Lesson consumption can advance only a small preview. The primary preview gates remain dependent on quiz and PoK validation.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={course.accessType === "free" ? "academy-pill-locked" : "academy-pill-unlocked"}>{previewPointLabel}</span>
            <StatusBadge label={quizState} />
            <StatusBadge label={pokStatus} />
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_280px]">
          <div className="academy-surface p-4"><ProgressBar value={contentProgress} label="Content progress" /></div>
          <div className="academy-surface p-4"><ProgressBar value={validationResult?.approved ? 100 : workspace.progress?.validationProgress ?? 0} label="Validation progress" /></div>
          <div className="academy-surface p-4"><ProgressBar value={certificationEligible ? 100 : workspace.progress?.rewardUnlockProgress ?? 0} label="Preview unlock progress" /></div>
          <div className="academy-surface p-4">
            <p className="academy-label">Next action</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{nextAction}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[300px_1fr_360px]">
        <aside className="academy-card grid content-start gap-3 p-4">
          <div>
            <p className="academy-label">Progress rail</p>
            <h3 className="mt-1 font-semibold text-slate-950">Module navigation</h3>
          </div>
          {moduleProgress.map((module) => (
            <div key={module.id} className="rounded-lg border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{module.title}</p>
                <StatusBadge label={module.status} />
              </div>
              <div className="mt-3">
                <ProgressBar value={module.progress} />
              </div>
              <div className="mt-3 grid gap-2">
                {lessons
                  .filter((item) => module.lessonIds.includes(item.id))
                  .map((item) => {
                    const active = item.id === lesson.id;
                    const locallyCompleted = completedLessonIds.includes(item.id);
                    return (
                      <Link
                        key={item.id}
                        to={`/academy/learn/${course.id}/lessons/${item.id}`}
                        className={`rounded-md border px-3 py-2 text-sm font-semibold ${active ? "border-academy-blue bg-blue-50 text-academy-blue" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
                      >
                        <span className="flex items-start gap-2">
                          {locallyCompleted ? <BookOpenCheck className="mt-0.5 shrink-0 text-emerald-700" size={15} /> : <Lock className="mt-0.5 shrink-0 text-slate-400" size={15} />}
                          <span>{item.order}. {item.title}</span>
                        </span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </aside>

        <article className="academy-card overflow-hidden">
          <div className="grid min-h-[340px] place-items-center bg-slate-950 px-6 py-16 text-center text-white">
            <div className="max-w-xl">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/10">
                <PlayCircle size={34} />
              </div>
              <p className="academy-label mt-6 text-slate-300">Mock lesson player</p>
              <h3 className="mt-2 text-3xl font-semibold">{lesson.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{lesson.type} / {lesson.duration} / {lesson.media}</p>
              <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-200 sm:grid-cols-3">
                <span>Consumption: {isCompleted ? "complete" : "pending"}</span>
                <span>Quiz: {requiredCompleted ? "available" : "locked"}</span>
                <span>PoK: {pokStatus}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="academy-label">Lesson {lesson.order}</p>
                <h3 className="text-xl font-semibold text-slate-950">{lesson.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Completion marks content consumption only. Quiz/evaluation remains the main Proof-of-Knowledge checkpoint.
                </p>
              </div>
              <StatusBadge label={isCompleted ? "completed" : currentProgress?.status ?? lesson.status} />
            </div>

            <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} className="text-academy-blue" />
            <p className="academy-label">Lesson preview points</p>
              </div>
              <p className="text-sm text-slate-700">
                This lesson can contribute up to {lessonGate ? formatNeurons(lessonGate.previewPoints) : "a small local preview"} across the lesson gate. Major preview points remain locked behind quiz and recognition gates.
              </p>
              <p className="text-sm font-semibold text-slate-900">{validationWeight}% of this course preview is validation-weighted.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="academy-action" disabled={isCompleted} onClick={markLessonComplete}>
                {isCompleted ? "Lesson complete" : "Mark lesson complete"}
              </button>
              {previousLesson ? <Link className="academy-secondary-action" to={`/academy/learn/${course.id}/lessons/${previousLesson.id}`}>Previous lesson</Link> : null}
              {nextLesson ? <Link className="academy-secondary-action" to={`/academy/learn/${course.id}/lessons/${nextLesson.id}`}>Next lesson</Link> : null}
            </div>
          </div>
        </article>

        <aside className="grid gap-4">
          <section className="academy-card p-4">
            <p className="academy-label">Resources</p>
            <div className="mt-3 grid gap-2">
              {resources.length ? resources.map((resource) => (
                <div key={resource.title} className="rounded-md border border-slate-200 p-3 text-sm">
                  <p className="font-semibold text-slate-900">{resource.title}</p>
                  <p className="text-slate-600">{resource.type} / {resource.availability}</p>
                </div>
              )) : <p className="text-sm text-slate-600">No mock resources for this lesson.</p>}
            </div>
          </section>

          <section className="academy-card p-4">
            <div className="flex items-start gap-3">
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${requiredCompleted ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                {requiredCompleted ? <ShieldCheck size={21} /> : <Lock size={21} />}
              </div>
              <div>
                <p className="academy-label">Quiz / PoK dependency</p>
                <h3 className="mt-1 font-semibold text-slate-950">{quiz?.title ?? "No evaluation configured"}</h3>
                <p className="mt-2 text-sm text-slate-600">{quizExplanation} Passing threshold: {quiz?.passingThreshold ?? 0}%.</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge label={requiredCompleted ? "quiz available" : "quiz locked"} />
              {quizMode !== "idle" ? <StatusBadge label={quizMode} /> : null}
            </div>
            <div className="mt-4 grid gap-2">
              <button className="academy-action bg-emerald-700 hover:bg-emerald-800" disabled={!requiredCompleted} onClick={() => runQuiz("pass")}>
                Run passing mock attempt
              </button>
              <button className="academy-secondary-action border-red-200 text-red-800 disabled:border-slate-200 disabled:text-slate-400" disabled={!requiredCompleted} onClick={() => runQuiz("fail")}>
                Run failing mock attempt
              </button>
            </div>
            {validationResult ? (
              <div className={`mt-4 rounded-lg border p-3 text-sm ${validationResult.approved ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
                <div className="flex items-center gap-2">
                  {validationResult.approved ? <ShieldCheck size={18} className="text-emerald-800" /> : <RotateCcw size={18} className="text-red-800" />}
                  <p className="font-semibold text-slate-900">Score {validationResult.score}% / threshold {validationResult.threshold}%</p>
                </div>
                <p className="mt-1 text-slate-600">{validationResult.notes}</p>
              </div>
            ) : null}
          </section>

          <section className="academy-card p-4">
            <p className="academy-label">Recognition progress</p>
            <h3 className="mt-1 font-semibold text-slate-950">{certificationEligible ? "Recognition preview eligible after PoK" : "Recognition preview not eligible yet"}</h3>
            <dl className="mt-3 grid gap-2 text-sm">
              <div className="academy-surface p-3">
                <dt className="academy-label">Required content</dt>
                <dd className="mt-1 text-slate-800">{certificationRequirement?.requiredContentProgress ?? 100}%</dd>
              </div>
              <div className="academy-surface p-3">
                <dt className="academy-label">Required PoK</dt>
                <dd className="mt-1 text-slate-800">{certificationRequirement?.requiredPokStatus ?? "approved"}</dd>
              </div>
              <div className="academy-surface p-3">
                <dt className="academy-label">Required score</dt>
                <dd className="mt-1 text-slate-800">{certificationRequirement?.requiredQuizScore ?? quiz?.passingThreshold ?? 0}%</dd>
              </div>
            </dl>
          </section>
        </aside>
      </section>

      <section className="academy-card grid gap-4 p-5">
        <p className="academy-label">Preview gates after current mock state</p>
        <RewardGateList gates={visibleGates} />
      </section>
    </>
  );
}
