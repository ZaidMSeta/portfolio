import { Link, NavLink, useLocation } from "react-router";

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
        return (
          <Link
            key={to}
            to={to}
            onClick={scrollToTop}
            className="shrink-0 text-white/45 transition hover:text-white/70"
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0f1115]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center text-sm font-medium tracking-tight">
          <Link
            to="/"
            onClick={scrollToTop}
            className="shrink-0 text-white transition hover:text-white/80"
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
                isActive ? "text-white" : "text-white/60 transition hover:text-white"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
