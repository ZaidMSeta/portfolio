import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { site } from "../../data/site";
import { toast } from "../../lib/toast";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Recent click times within a window; true once there have been `count` of them
function useRapidClicks(count: number, windowMs: number) {
  const clicks = useRef<number[]>([]);
  return () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((time) => now - time < windowMs), now];
    if (clicks.current.length >= count) {
      clicks.current = [];
      return true;
    }
    return false;
  };
}

const DOT_COLOURS = ["#f472b6", "#facc15", "#a78bfa", "#fb923c", "#60a5fa", "#4ade80", "#f87171"];

// Click the dot in zaid.seta five times and it spins into a new colour
function LogoDot() {
  const fiveClicks = useRapidClicks(5, 2000);
  const [spin, setSpin] = useState(0);
  const [colour, setColour] = useState<string | null>(null);

  const onClick = (event: MouseEvent) => {
    // The dot sits inside the home link; only swallow the click when the trick fires
    if (!fiveClicks()) return;
    event.preventDefault();
    setSpin((n) => n + 1);
    setColour((current) => {
      const options = DOT_COLOURS.filter((option) => option !== current);
      return options[Math.floor(Math.random() * options.length)];
    });
  };

  return (
    <span
      key={spin}
      onClick={onClick}
      className={`inline-block origin-[50%_72%] ${spin > 0 ? "animate-[dot-spin_0.6s_cubic-bezier(0.2,0.7,0.2,1)]" : ""} ${colour ? "" : "text-accent"}`}
      style={colour ? { color: colour } : undefined}
    >
      .
    </span>
  );
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
            className={`truncate transition ${isLast ? "text-accent hover:text-accent/80" : "shrink-0 text-subtle hover:text-fg/70"}`}
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
  const toggleSpam = useRapidClicks(8, 4000);

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const themeButton = (
    <button
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        if (toggleSpam()) toast("you good?");
      }}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-md p-1 text-subtle transition hover:text-fg"
    >
      <span key={theme} className="animate-spin-in block">
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-fg/8 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center font-mono text-sm font-medium tracking-tight">
          <Link
            to="/"
            onClick={scrollToTop}
            className="shrink-0 text-fg transition hover:text-fg/80"
          >
            zaid<LogoDot />seta
          </Link>
          <Breadcrumb pathname={location.pathname} />
        </div>

        <nav className="hidden items-center gap-6 text-sm sm:flex">
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
