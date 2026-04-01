import { Link, NavLink, useLocation } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Resume", to: "/resume" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

function Breadcrumb({ pathname }: { pathname: string }) {
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <>
      {segments.map((segment, i) => {
        const to = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <Link
            key={to}
            to={to}
            onClick={scrollToTop}
            className={`shrink-0 transition ${isLast ? "text-accent hover:text-accent/80" : "text-fg/45 hover:text-fg/70"}`}
          >
            /{segment}
          </Link>
        );
      })}
    </>
  );
}

export default function Header() {
  const location = useLocation();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-fg/8 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center text-sm font-medium tracking-tight">
          <Link
            to="/"
            onClick={scrollToTop}
            className="shrink-0 text-fg transition hover:text-fg/80"
          >
            Zaid Seta
          </Link>
          <Breadcrumb pathname={location.pathname} />
        </div>

        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-fg/60 transition hover:text-fg"
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-1 text-fg/50 transition hover:text-fg"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
