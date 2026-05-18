import { useMemo, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { CourseFilters } from "../components/CourseFilters";
import { academyData, getTutor } from "../services/academyData";

const defaultFilters = {
  category: "all",
  level: "all",
  rewardType: "all",
  accessType: "all",
  language: "all",
  certification: "all"
};

export function CourseExplorer() {
  const [filters, setFilters] = useState(defaultFilters);
  const courses = academyData.courses;

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (filters.category !== "all" && course.category !== filters.category) return false;
      if (filters.level !== "all" && course.level !== filters.level) return false;
      if (filters.rewardType !== "all" && course.rewardType !== filters.rewardType) return false;
      if (filters.accessType !== "all" && course.accessType !== filters.accessType) return false;
      if (filters.language !== "all" && course.language !== filters.language) return false;
      if (filters.certification === "enabled" && !course.certificateEnabled) return false;
      if (filters.certification === "not-enabled" && course.certificateEnabled) return false;
      return true;
    });
  }, [courses, filters]);

  return (
    <>
      <section>
        <p className="academy-label">Course Explorer</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Discover education by governance, reward, and PoK criteria</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Courses are mock-driven and classified by reward class, constitutional standing, tutor reputation, access type, language, and certification readiness.
        </p>
      </section>
      <CourseFilters courses={courses} filters={filters} onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} />
      <section className="grid gap-4 lg:grid-cols-3">
        {filteredCourses.map((course) => <CourseCard key={course.id} course={course} tutor={getTutor(course.tutorId)} />)}
      </section>
    </>
  );
}
