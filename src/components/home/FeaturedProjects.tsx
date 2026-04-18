import { Link, useNavigate } from "react-router";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projects";
import { getTechColour } from "../../lib/utils/techColour";


export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-fg">Featured Projects</h2>

        <Link to="/projects" className="text-sm text-fg/60 transition hover:text-fg">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <article
            key={project.id}
            onClick={() => navigate(`/projects/${project.slug}`)}
            className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-fg/10 bg-fg/5 transition hover:border-fg/20 ${index >= 2 ? "hidden lg:flex" : ""}`}
          >
            <div className="aspect-16/10 overflow-hidden bg-fg/5">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-fg">{project.title}</h3>
                <span className="shrink-0 text-[11px] text-fg/50">{project.date}</span>
              </div>

              <p className="mb-3 text-sm leading-6 text-fg/60">{project.hook}</p>

              <div className="mt-auto mb-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => {
                  const color = getTechColour(tech);
                  return (
                    <span
                      key={tech}
                      className="rounded-md px-2 py-0.5 text-[10px]"
                      style={{ backgroundColor: color.bg, color: color.text }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-fg/10 pt-3">
                <div className="flex items-center gap-3 text-xs">
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-fg/60 transition hover:text-fg"
                    >
                      <Github size={12} />
                      Code
                    </a>
                  ) : null}

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-fg/60 transition hover:text-fg"
                    >
                      <ExternalLink size={12} />
                      Live
                    </a>
                  ) : null}
                </div>

                <span className="text-xs text-fg/40">Details →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
