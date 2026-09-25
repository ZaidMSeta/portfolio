import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ChessKnight,
  Github,
  Hammer,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router";
import { site } from "../../data/site";
import { experiences } from "../../data/experience";
import { getHardcoverData } from "../../lib/utils/hardCover";
import ratingHistory from "../../data/chessRatingHistory.json";

function shortTitle(title: string) {
  return title.split(":")[0].trim();
}

function NowPanel() {
  const currentRole = experiences.find((role) => role.end === "Present");
  const currentRead = getHardcoverData().currentRead;
  const latestRating = ratingHistory[ratingHistory.length - 1]?.rating;

  const rows = [
    currentRole && {
      icon: Briefcase,
      label: "Working",
      value: `${currentRole.title} at ${currentRole.company}`,
    },
    { icon: Hammer, label: "Building", value: site.building },
    currentRead && { icon: BookOpen, label: "Reading", value: shortTitle(currentRead.book.title) },
    latestRating && { icon: ChessKnight, label: "Playing", value: `Chess, ${latestRating} rapid` },
  ].filter(Boolean) as { icon: LucideIcon; label: string; value: string }[];

  return (
    <div className="rounded-2xl border border-fg/10 card p-5">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-fg/40">Currently</p>

      <ul className="mt-4 space-y-4">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <row.icon size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-fg/45">{row.label}</p>
              <p className="text-sm text-fg/85">{row.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section className="grid gap-12 pt-4 sm:pt-10 lg:grid-cols-[1fr_340px] lg:items-end">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {site.status}
        </p>

        <h1 className="mt-6 text-5xl font-semibold tracking-tighter text-fg sm:text-6xl lg:text-7xl">
          Zaid Seta
        </h1>

        <p className="mt-4 max-w-2xl text-xl font-medium tracking-tight text-fg/85 sm:text-2xl">
          Software developer building tools people actually use.
        </p>

        <p className="mt-4 max-w-xl text-base leading-7 text-fg/60">
          Computer Science at McMaster. I work across backend services, automation,
          and full-stack apps: a course planner used by 200+ students, a Playwright
          driver that entered 400+ league events, and production work for real clients.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent/85"
          >
            View resume
            <ArrowRight size={16} />
          </Link>

          <a
            href={site.links.email}
            className="inline-flex items-center gap-2 rounded-lg border border-fg/15 px-4 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
          >
            <Mail size={16} />
            Get in touch
          </a>

          <div className="ml-1 flex items-center gap-1">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg p-2 text-fg/50 transition hover:text-fg"
            >
              <Github size={18} />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg p-2 text-fg/50 transition hover:text-fg"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <NowPanel />
    </section>
  );
}
