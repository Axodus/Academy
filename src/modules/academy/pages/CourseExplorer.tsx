import { useMemo, useState } from "react";
import { CourseCard } from "../components/CourseCard";
import { CourseFilters, type CourseFilterState } from "../components/CourseFilters";
import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { getTutor, listCatalogCourses } from "../services/academyData";

const defaultFilters: CourseFilterState = { query: "", category: "all", level: "all", previewPointTier: "all", accessType: "all", language: "all", recognition: "all", sort: "relevance" };

export function CourseExplorer() {
  const [filters, setFilters] = useState(defaultFilters);
  const courses = listCatalogCourses();
  const filteredCourses = useMemo(() => courses.filter((course) => {
    const query = filters.query.trim().toLowerCase();
    if (query && !`${course.title} ${course.shortDescription} ${course.category} ${course.tags.join(" ")}`.toLowerCase().includes(query)) return false;
    if (filters.category !== "all" && course.category !== filters.category) return false;
    if (filters.level !== "all" && course.level !== filters.level) return false;
    if (filters.previewPointTier !== "all" && course.previewPointTier !== filters.previewPointTier) return false;
    if (filters.accessType !== "all" && course.accessType !== filters.accessType) return false;
    if (filters.language !== "all" && course.language !== filters.language) return false;
    if (filters.recognition === "enabled" && !course.recognitionPreviewEnabled) return false;
    if (filters.recognition === "not-enabled" && course.recognitionPreviewEnabled) return false;
    return true;
  }).sort((left, right) => filters.sort === "title" ? left.title.localeCompare(right.title) : filters.sort === "progress" ? right.progress - left.progress : filters.sort === "points" ? right.previewPoints - left.previewPoints : 0), [courses, filters]);

  return <><PageHeader eyebrow="Explore" title="Course Explorer" description="Browse formation protocols by domain, access model, validation tier, and Proof of Knowledge eligibility." /><CourseFilters courses={courses} filters={filters} resultCount={filteredCourses.length} onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onReset={() => setFilters(defaultFilters)} />{filteredCourses.length ? <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} tutor={getTutor(course.tutorId)} />)}</section> : <EmptyState title="No matching protocols" description="Adjust or clear the active filters to return to the complete Academy catalog." />}</>;
}
