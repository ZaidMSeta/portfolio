import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { site } from "../../data/site";

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
            className={`truncate transition ${isLast ? "text-accent hover:text-accent/80" : "shrink-0 text-fg/45 hover:text-fg/70"}`}
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const themeButton = (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-md p-1 text-fg/50 transition hover:text-fg"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-fg/8 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center text-sm font-medium tracking-tight">
          <Link
            to="/"
            onClick={scrollToTop}
            className="shrink-0 text-fg transition hover:text-fg/80"
          >
            zaid<span className="text-accent">.</span>seta
          </Link>
          <Breadcrumb pathname={location.pathname} />
        </div>

        <nav className="hidden items-center gap-5 text-sm sm:flex">
          {site.nav.map((item) => (
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
          {themeButton}
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          {themeButton}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-md p-1 text-fg/70 transition hover:text-fg"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-fg/8 px-4 pb-4 sm:hidden">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-fg/5 py-3 text-sm ${isActive ? "text-accent" : "text-fg/70"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
