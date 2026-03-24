import { Link } from "react-router";

export function Hero() {
  return (
    <section className="space-y-6">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Zaid Seta
        </h1>

        <p className="text-muted-foreground text-lg">
          Computer Science student building full-stack apps and tools.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="px-4 py-2 rounded-lg border border-border hover:border-white/20 transition"
          >
            View Projects
          </Link>

          <Link
            to="/resume"
            className="px-4 py-2 rounded-lg border border-border hover:border-white/20 transition"
          >
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}