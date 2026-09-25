import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { site } from "../../data/site";

export function Hero() {
  return (
    <section className="pt-6">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
          Zaid Seta
        </h1>

        <p className="max-w-2xl text-base leading-8 text-fg/65 sm:text-lg">
          Computer Science student @ McMaster University. I build tools people actually
          end up using — a course planner for 200+ students, automation for a local soccer
          club, and a site for a Hamilton memory care community.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-fg/60">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-fg"
          >
            <Github size={18} />
            GitHub
          </a>

          <span className="text-fg/20">|</span>

          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-fg"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

          <span className="text-fg/20">|</span>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 transition hover:text-fg"
          >
            More about me
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
