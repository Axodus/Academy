import { Award, BookOpen, ChartNoAxesCombined, ClipboardCheck, Coins, Gauge, GraduationCap, Home, LibraryBig, Route } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LoginButton from "../../../components/LoginButton";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/my-courses", label: "My Courses", icon: LibraryBig },
  { to: "/dashboard", label: "Dashboard", icon: ChartNoAxesCombined },
  { to: "/progress", label: "Progress", icon: Gauge },
  { to: "/certifications", label: "Recognition", icon: Award },
  { to: "/rewards", label: "Rewards", icon: Coins },
  { to: "/governance-review", label: "Academy Governance Review", icon: ClipboardCheck },
  { to: "/paths/path-governance-operator", label: "Learning Path", icon: Route }
];

export function AcademyShell() {
  const { pathname } = useLocation();
  const basePath = pathname.startsWith("/academy") ? "/academy" : "";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[1fr_auto] lg:px-6">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-academy-blue text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="academy-label">Axodus Academy</p>
              <h1 className="text-2xl font-semibold text-slate-950">PoK-based $NEURONS qualification nucleus</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600">
                Mock-only constitutional learning infrastructure for progression, trust, treasury-aware rewards, and ecosystem unlocks.
              </p>
            </div>
          </div>
          <details className="academy-card p-3 lg:w-[360px]">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">Identity / multichain login</summary>
            <div className="mt-3">
              <LoginButton />
            </div>
          </details>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-4 lg:px-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to === "/" ? basePath || "/" : `${basePath}${item.to}`}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${
                    isActive ? "border-academy-blue bg-academy-blue text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <Outlet />
      </main>
    </div>
  );
}
