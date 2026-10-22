import { Link, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import bugsSleeping from "../data/bugssleeping.jpg";

const zs = [
  { left: "42%", top: "24%", size: "text-sm", delay: 0 },
  { left: "46%", top: "16%", size: "text-base", delay: 1.1 },
  { left: "51%", top: "8%", size: "text-lg", delay: 2.2 },
];

// Bugs asleep on a bench, with z's drifting up from his head
function SleepingBugs() {
  return (
    <div className="relative w-full max-w-[380px]">
      <img
        src={bugsSleeping}
        alt="Bugs Bunny asleep on a park bench"
        width={540}
        height={400}
        className="w-full rounded-2xl border border-fg/10 card"
      />
      {zs.map((z) => (
        <span
          key={z.delay}
          aria-hidden
          className={`absolute animate-[drift-up_3.3s_ease-out_infinite] font-mono font-semibold text-white drop-shadow ${z.size}`}
          style={{ left: z.left, top: z.top, animationDelay: `${z.delay}s` }}
        >
          z
        </span>
      ))}
    </div>
  );
}

const suggestions = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Resume", to: "/resume" },
];

export default function NotFound() {
  useDocumentTitle("Not found");
  const { pathname } = useLocation();

  return (
    <div className="grid items-center gap-10 py-6 md:grid-cols-[1fr_auto] md:py-16">
      <section className="space-y-5">
        <p className="font-mono text-xs text-accent">404 · page not found</p>
        <h1 className="text-4xl tracking-tight text-fg sm:text-5xl">Nothing here but a nap.</h1>
        <p className="max-w-xl text-sm leading-7 text-fg/65 sm:text-base">
          <span className="rounded bg-fg/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-fg/80">{pathname}</span>{" "}
          doesn't exist, or it moved. Try one of these instead:
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          {suggestions.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                index === 0
                  ? "bg-accent text-bg hover:bg-accent/85"
                  : "border border-fg/15 text-fg/80 hover:border-fg/30 hover:text-fg"
              }`}
            >
              {item.label}
              {index === 0 && <ArrowRight size={16} />}
            </Link>
          ))}
        </div>
      </section>

      <div className="flex justify-center md:justify-end">
        <SleepingBugs />
      </div>
    </div>
  );
}
