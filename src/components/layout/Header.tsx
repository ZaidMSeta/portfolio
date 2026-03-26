import { NavLink, useLocation } from "react-router";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Resume", to: "/resume" },
];

function getPageLabel(pathname: string) {
  if (pathname === "/") return "";
  if (pathname.startsWith("/about")) return "/ about";
  if (pathname.startsWith("/projects")) return "/ projects";
  if (pathname.startsWith("/experience")) return "/ experience";
  if (pathname.startsWith("/resume")) return "/ resume";
  return "";
}

export default function Header() {
  const location = useLocation();
  const pageLabel = getPageLabel(location.pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0f1115]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-sm font-medium tracking-tight text-white"
        >
          <span className="text-white">Zaid Seta</span>
          {pageLabel ? <span className="ml-1 text-white/45">{pageLabel}</span> : null}
        </NavLink>

        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white"
                  : "text-white/60 transition hover:text-white"
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