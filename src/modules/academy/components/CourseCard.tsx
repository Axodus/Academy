import { Link } from "react-router-dom";
import type { Course, Tutor } from "../types/academy";
import { formatNeurons } from "../utils/format";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

type CourseCardProps = {
  course: Course;
  tutor?: Tutor;
};

export function CourseCard({ course, tutor }: CourseCardProps) {
  return (
    <article className="academy-card overflow-hidden">
      <img className="h-36 w-full object-cover" src={course.thumbnail} alt="" />
      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={course.constitutionalStanding} />
          <span className="academy-pill">{course.accessType === "free" ? "Free Course" : "Paid Course"}</span>
        </div>
        <div>
          <Link to={`/courses/${course.slug}`} className="text-lg font-semibold text-slate-950 hover:text-academy-blue">
            {course.title}
          </Link>
          <p className="mt-2 text-sm text-slate-600">{course.shortDescription}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <span>{course.category} / {course.level}</span>
          <span>{tutor?.name ?? "Academy tutor"}</span>
          <span className="font-semibold text-slate-900">{formatNeurons(course.rewardAmount)} as {course.rewardType}</span>
        </div>
        <ProgressBar value={course.progress} label="Learning progress" />
      </div>
    </article>
  );
}
