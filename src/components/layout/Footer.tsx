import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "../../data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-fg/8">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <p className="font-medium tracking-tight text-fg">{site.name}</p>
              <span className="hidden text-fg/20 md:inline">•</span>
              <a
                href={site.links.email}
                className="inline-flex items-center gap-2 text-fg/50 transition hover:text-fg"
              >
                <Mail size={14} className="text-accent" />
                <span>{site.email.replace("@", " [at] ").replace(".", " [dot] ")}</span>
              </a>
            </div>

            <p className="mt-3 max-w-md text-xs leading-6 text-fg/45">
              Building tools that people actually end up using, mostly for students,
              small clubs, and local businesses around Hamilton.
            </p>

            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg/30">
              <span>© {new Date().getFullYear()} {site.name}</span>
              <span className="text-fg/20">•</span>
              <span>Built with React + Tailwind</span>
              <span className="text-fg/20">•</span>
              <a
                href={`${site.repo}/commit/${__COMMIT_SHA__}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono transition hover:text-fg/60"
              >
                {__COMMIT_SHA__}
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Github size={16} />
            </a>

            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={site.links.email}
              aria-label="Email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 transition hover:border-fg/20 hover:bg-fg/[0.06] hover:text-fg"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
