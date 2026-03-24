import { Link } from "react-router";

export function Hero() {
  return (
    <section className="space-y-6">
      <div className="space-y-4 max-w-3xl">
        <p className="text-sm text-muted-foreground">Zaid Seta / portfolio</p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Zaid Seta
        </h1>

        <p className="text-lg text-foreground/90 sm:text-xl">
          Computer Science student building practical full-stack apps and useful tools.
        </p>

        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          I’m a Computer Science student at McMaster University with an interest in
          full-stack development, product-focused software, and building tools that
          solve real problems.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/projects"
            className="rounded-lg border border-border px-4 py-2 text-sm transition hover:border-white/20 hover:text-foreground"
          >
            View Projects
          </Link>

          <Link
            to="/resume"
            className="rounded-lg border border-border px-4 py-2 text-sm transition hover:border-white/20 hover:text-foreground"
          >
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}