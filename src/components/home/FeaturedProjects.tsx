import { Link } from "react-router";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projects";

const techColors: Record<string, { bg: string; text: string }> = {
  React: { bg: "rgba(97, 218, 251, 0.10)", text: "#61dafb" },
  TypeScript: { bg: "rgba(49, 120, 198, 0.14)", text: "#5b9bd5" },
  "Node.js": { bg: "rgba(104, 159, 56, 0.12)", text: "#7cb342" },
  Python: { bg: "rgba(55, 118, 171, 0.14)", text: "#5b9bd5" },
  SQLite: { bg: "rgba(0, 150, 214, 0.10)", text: "#4eaed6" },
  Tailwind: { bg: "rgba(56, 189, 248, 0.10)", text: "#38bdf8" },
  SwiftUI: { bg: "rgba(240, 120, 120, 0.12)", text: "#ff8f8f" },
  FastAPI: { bg: "rgba(92, 175, 144, 0.12)", text: "#5caf90" },
  PostgreSQL: { bg: "rgba(70, 130, 180, 0.12)", text: "#6ea8d6" },
  Playwright: { bg: "rgba(168, 85, 247, 0.10)", text: "#a78bfa" },
  Go: { bg: "rgba(0, 173, 216, 0.12)", text: "#66c7e8" },
};

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Featured Projects</h2>

        <Link
          to="/projects"
          className="text-sm text-white/60 transition hover:text-white"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20"
          >
            <div className="aspect-16/10 overflow-hidden bg-white/5">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-white">
                  {project.title}
                </h3>

                <span className="shrink-0 text-xs text-white/50">
                  {project.type}
                </span>
              </div>

              <p className="mb-4 text-sm leading-6 text-white/60">
                {project.hook}
              </p>

              <div className="mt-auto mb-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => {
                  const color = techColors[tech] || {
                    bg: "rgba(255,255,255,0.06)",
                    text: "#9ca3af",
                  };

                  return (
                    <span
                      key={tech}
                      className="rounded-md px-2 py-0.5 text-[11px]"
                      style={{
                        backgroundColor: color.bg,
                        color: color.text,
                      }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-4 text-sm">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-white"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-white/60 transition hover:text-white"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  ) : null}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  Details →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}