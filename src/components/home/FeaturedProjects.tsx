import { Link } from "react-router";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured Projects</h2>

        <Link
          to="/projects"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-xl border border-border bg-card transition hover:border-white/20"
          >
            <div className="aspect-[16/10] bg-secondary">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex h-full flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold">{project.title}</h3>
                <span className="text-xs text-muted-foreground">
                  {project.status}
                </span>
              </div>

              <p className="mb-4 text-sm text-muted-foreground">
                {project.hook}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-sm">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground"
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
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition hover:text-foreground"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                ) : null}

                <Link
                  to={`/projects/${project.slug}`}
                  className="ml-auto text-muted-foreground transition hover:text-foreground"
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