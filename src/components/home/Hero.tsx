import { Link } from "react-router";

export function Hero() {
  return (
    <section className="pt-6">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Zaid Seta
        </h1>

        <p className="max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          Computer Science student and aspiring software engineer. I build
          thoughtful tools and clean interfaces that solve real problems.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            to="/projects"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            View Projects
          </Link>

          <Link
            to="/resume"
            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
          >
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}