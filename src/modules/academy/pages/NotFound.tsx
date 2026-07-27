import { Link, useLocation } from "react-router-dom";

export function NotFound() {
  const { pathname } = useLocation();
  const home = pathname.startsWith("/academy") ? "/academy" : "/";
  return (
    <section className="academy-card grid gap-3 p-6">
      <p className="academy-label">Route not found</p>
      <h2 className="text-2xl font-semibold text-slate-950">Academy page unavailable</h2>
      <p className="text-slate-600">This protocol route is not available. Return to Overview or use the application navigation.</p>
      <Link className="academy-action w-fit" to={home}>Back to Overview</Link>
    </section>
  );
}
