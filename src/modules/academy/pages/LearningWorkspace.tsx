import { useMemo, useState } from "react";
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

  if (!workspace?.lesson) return <Navigate to="/my-courses" replace />;
  return <Navigate to={`/learn/${workspace.course.id}/lessons/${workspace.lesson.id}`} replace />;
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

  if (!workspace?.lesson) return <Navigate to="/my-courses" replace />;

  const { course, lessons, lesson, resources, rewardGates, quiz, nextLesson, previousLesson, moduleProgress, rewardTypeLabel } = workspace;
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
            <p className="mt-2 max-w-3xl text-slate-600">Lesson consumption can release only a small reward. The primary reward gates remain dependent on quiz and PoK validation.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="academy-pill">{rewardTypeLabel}</span>
            <StatusBadge label={quizState} />
            <StatusBadge label={validationResult?.status ?? workspace.progress?.pokStatus ?? "pending"} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <ProgressBar value={contentProgress} label="Content progress" />
          <ProgressBar value={validationResult?.approved ? 100 : workspace.progress?.validationProgress ?? 0} label="Validation progress" />
          <ProgressBar value={certificationEligible ? 100 : workspace.progress?.rewardUnlockProgress ?? 0} label="Reward unlock progress" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[280px_1fr_340px]">
        <aside className="academy-card grid gap-3 p-4">
          <p className="academy-label">Module sidebar</p>
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
                        to={`/learn/${course.id}/lessons/${item.id}`}
                        className={`rounded-md border px-3 py-2 text-sm font-semibold ${active ? "border-academy-blue bg-blue-50 text-academy-blue" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
                      >
                        {item.order}. {item.title}
                        {locallyCompleted ? <span className="ml-2 text-emerald-700">completed</span> : null}
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </aside>

        <article className="academy-card overflow-hidden">
          <div className="grid min-h-[280px] place-items-center bg-slate-900 px-6 py-16 text-center text-white">
            <div>
              <p className="academy-label text-slate-300">Mock lesson player</p>
              <h3 className="mt-2 text-2xl font-semibold">{lesson.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{lesson.type} / {lesson.duration} / {lesson.media}</p>
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
              <p className="academy-label">Lesson reward preview</p>
              <p className="text-sm text-slate-700">
                This lesson can contribute up to {lessonGate ? formatNeurons(lessonGate.rewardAmount) : "a small consumption reward"} across the lesson gate. Major rewards remain locked behind quiz and certification gates.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-md bg-academy-blue px-4 py-2 text-sm font-semibold text-white disabled:bg-slate-300" disabled={isCompleted} onClick={markLessonComplete}>
                {isCompleted ? "Lesson complete" : "Mark lesson complete"}
              </button>
              {previousLesson ? <Link className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" to={`/learn/${course.id}/lessons/${previousLesson.id}`}>Previous lesson</Link> : null}
              {nextLesson ? <Link className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" to={`/learn/${course.id}/lessons/${nextLesson.id}`}>Next lesson</Link> : null}
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
            <p className="academy-label">Quiz / PoK dependency</p>
            <h3 className="mt-1 font-semibold text-slate-950">{quiz?.title ?? "No evaluation configured"}</h3>
            <p className="mt-2 text-sm text-slate-600">
              Quiz unlocks only after all required lessons are consumed. Passing threshold: {quiz?.passingThreshold ?? 0}%.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge label={requiredCompleted ? "quiz available" : "quiz locked"} />
              {quizMode !== "idle" ? <StatusBadge label={quizMode} /> : null}
            </div>
            <div className="mt-4 grid gap-2">
              <button className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" disabled={!requiredCompleted} onClick={() => runQuiz("pass")}>
                Run passing mock attempt
              </button>
              <button className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-800 disabled:border-slate-200 disabled:text-slate-400" disabled={!requiredCompleted} onClick={() => runQuiz("fail")}>
                Run failing mock attempt
              </button>
            </div>
            {validationResult ? (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-slate-900">Score {validationResult.score}% / threshold {validationResult.threshold}%</p>
                <p className="mt-1 text-slate-600">{validationResult.notes}</p>
              </div>
            ) : null}
          </section>
        </aside>
      </section>

      <section className="academy-card grid gap-4 p-5">
        <p className="academy-label">Reward gates after current mock state</p>
        <RewardGateList gates={visibleGates} />
      </section>
    </>
  );
}
