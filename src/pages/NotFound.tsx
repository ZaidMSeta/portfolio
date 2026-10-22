import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRight } from "lucide-react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Solid tints of the page background, so overlapping parts hide what's behind them
const fill = (percent: number) => ({ fill: `color-mix(in srgb, var(--color-fg) ${percent}%, var(--color-bg))` });

const zs = [
  { x: 52, y: 78, size: 14, delay: 0 },
  { x: 66, y: 60, size: 18, delay: 1.1 },
  { x: 84, y: 38, size: 22, delay: 2.2 },
];

// An original sleeping bunny; the body breathes and the z's drift up
function SleepingBunny() {
  return (
    <svg viewBox="0 0 240 180" className="h-auto w-full max-w-[320px]" role="img" aria-label="A bunny asleep">
      <ellipse cx="124" cy="162" rx="86" ry="7" className="fill-fg/[0.06]" />

      <g
        className="animate-[breathe_3.6s_ease-in-out_infinite]"
        style={{ transformOrigin: "124px 160px", transformBox: "view-box" } as CSSProperties}
      >
        {/* Body, tail, and back foot */}
        <ellipse cx="136" cy="126" rx="62" ry="35" style={fill(8)} className="stroke-fg/40" strokeWidth="2" />
        <circle cx="196" cy="116" r="10" style={fill(12)} className="stroke-fg/40" strokeWidth="2" />
        <ellipse cx="170" cy="156" rx="19" ry="6" style={fill(10)} className="stroke-fg/40" strokeWidth="2" />

        {/* Ears, flopped back over the body */}
        <g transform="rotate(-10 118 96)">
          <ellipse cx="118" cy="96" rx="32" ry="9" style={fill(10)} className="stroke-fg/40" strokeWidth="2" />
          <ellipse cx="122" cy="96" rx="22" ry="4" className="fill-accent/30" />
        </g>
        <g transform="rotate(-2 112 105)">
          <ellipse cx="112" cy="105" rx="29" ry="8" style={fill(10)} className="stroke-fg/40" strokeWidth="2" />
          <ellipse cx="116" cy="105" rx="19" ry="3.5" className="fill-accent/30" />
        </g>

        {/* Head */}
        <circle cx="80" cy="124" r="29" style={fill(10)} className="stroke-fg/40" strokeWidth="2" />
        <path d="M64 121 q7 6 14 0" fill="none" className="stroke-fg/60" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="54" cy="130" r="3" className="fill-accent" />
        <path d="M54 134 q-3 5 -8 4 M54 134 q2 5 7 5" fill="none" className="stroke-fg/40" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="70" cy="136" rx="6" ry="3.5" className="fill-accent/20" />

        {/* Front paw tucked under the chin */}
        <ellipse cx="78" cy="153" rx="13" ry="6" style={fill(12)} className="stroke-fg/40" strokeWidth="2" />
      </g>

      {zs.map((z) => (
        <text
          key={z.delay}
          x={z.x}
          y={z.y}
          fontSize={z.size}
          className="animate-[drift-up_3.3s_ease-out_infinite] fill-accent font-mono"
          style={{ animationDelay: `${z.delay}s`, transformBox: "fill-box" } as CSSProperties}
        >
          z
        </text>
      ))}
    </svg>
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
        <SleepingBunny />
      </div>
    </div>
  );
}
