import type { Course } from "../types/academy";

type CourseFiltersProps = {
  courses: Course[];
  filters: {
    category: string;
    level: string;
    rewardType: string;
    accessType: string;
    language: string;
    certification: string;
  };
  onChange: (key: keyof CourseFiltersProps["filters"], value: string) => void;
};

function unique(values: string[]) {
  return Array.from(new Set(values)).sort();
}

export function CourseFilters({ courses, filters, onChange }: CourseFiltersProps) {
  const categories = unique(courses.map((course) => course.category));
  const levels = unique(courses.map((course) => course.level));
  const rewardTypes = unique(courses.map((course) => course.rewardType));
  const languages = unique(courses.map((course) => course.language));

  return (
    <section className="academy-card grid gap-3 p-4">
      <div>
        <p className="academy-label">Discovery filters</p>
        <h2 className="mt-1 text-lg font-semibold text-slate-950">Search and qualification criteria</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Select label="Category" value={filters.category} options={categories} onChange={(value) => onChange("category", value)} />
        <Select label="Level" value={filters.level} options={levels} onChange={(value) => onChange("level", value)} />
        <Select label="Reward" value={filters.rewardType} options={rewardTypes} onChange={(value) => onChange("rewardType", value)} />
        <Select label="Access" value={filters.accessType} options={["free", "paid"]} onChange={(value) => onChange("accessType", value)} />
        <Select label="Language" value={filters.language} options={languages} onChange={(value) => onChange("language", value)} />
        <Select label="Certificate" value={filters.certification} options={["enabled", "not-enabled"]} onChange={(value) => onChange("certification", value)} />
      </div>
    </section>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      <select className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
