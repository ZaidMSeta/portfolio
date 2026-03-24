import { NavLink } from "react-router";
import { site } from "../../data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-semibold">{site.name}</div>

        <nav className="flex items-center gap-4">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive ? "font-semibold text-zinc-900" : "text-zinc-600 hover:text-zinc-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            className="rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-600"
            aria-label="Open command palette"
          >
            ⌘K
          </button>
        </nav>
      </div>
    </header>
  );
}
