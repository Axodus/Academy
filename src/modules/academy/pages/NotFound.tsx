import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="academy-card grid gap-3 p-6">
      <p className="academy-label">Route not found</p>
      <h2 className="text-2xl font-semibold text-slate-950">Academy page unavailable</h2>
      <p className="text-slate-600">Return to the Academy nucleus or use the navigation bar.</p>
      <Link className="w-fit rounded-md bg-academy-blue px-4 py-2 text-sm font-semibold text-white" to="/">Back to Academy Home</Link>
    </section>
  );
}
