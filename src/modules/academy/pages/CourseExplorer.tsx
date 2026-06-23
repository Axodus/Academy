import { useMemo, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { CourseFilters } from "../components/CourseFilters";
import { getTutor, listCatalogCourses } from "../services/academyData";

const defaultFilters = {
  category: "all",
  level: "all",
  previewPointTier: "all",
  accessType: "all",
  language: "all",
  recognition: "all"
};

export function CourseExplorer() {
  const [filters, setFilters] = useState(defaultFilters);
  const courses = listCatalogCourses();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (filters.category !== "all" && course.category !== filters.category) return false;
      if (filters.level !== "all" && course.level !== filters.level) return false;
      if (filters.previewPointTier !== "all" && course.previewPointTier !== filters.previewPointTier) return false;
      if (filters.accessType !== "all" && course.accessType !== filters.accessType) return false;
      if (filters.language !== "all" && course.language !== filters.language) return false;
      if (filters.recognition === "enabled" && !course.recognitionPreviewEnabled) return false;
      if (filters.recognition === "not-enabled" && course.recognitionPreviewEnabled) return false;
      return true;
    });
  }, [courses, filters]);

  return (
    <>
      <section>
        <p className="academy-label">Course Explorer</p>
        <h2 className="mt-1 text-3xl font-semibold text-slate-950">Discover education by governance, preview, and PoK criteria</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Courses are mock-driven and classified by preview tier, constitutional standing, tutor reputation, access type, language, and recognition-preview readiness.
        </p>
      </section>
      <CourseFilters courses={courses} filters={filters} onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} />
      <section className="grid gap-4 lg:grid-cols-3">
        {filteredCourses.map((course) => <CourseCard key={course.id} course={course} tutor={getTutor(course.tutorId)} />)}
      </section>
    </>
  );
}
