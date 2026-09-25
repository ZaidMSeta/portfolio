import { Link } from "react-router";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/projects";
import { ProjectImage } from "../ProjectImage";
import { TechTags } from "../TechTag";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl tracking-tight text-fg">Featured projects</h2>

        <Link to="/projects" className="font-mono text-xs text-fg/50 transition hover:text-fg">
          all projects →
        </Link>
      </div>

      <div className="space-y-6">
        {featuredProjects.map((project, index) => (
          <article
            key={project.id}
            className="group relative grid overflow-hidden rounded-2xl border border-fg/10 card transition hover:border-fg/20 md:grid-cols-2"
          >
            <div
              className={`aspect-16/10 overflow-hidden border-fg/10 bg-fg/5 max-md:border-b md:aspect-auto md:min-h-[320px] ${
                index % 2 === 1 ? "md:order-2 md:border-l" : "md:border-r"
              }`}
            >
              <ProjectImage
                src={project.image}
                alt={project.title}
                className="object-top opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <p className="font-mono text-xs text-fg/40">
                {String(index + 1).padStart(2, "0")} · {project.date} ·{" "}
                <span className="text-accent/80">{project.status}</span>
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-display text-3xl tracking-tight text-fg">
                <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
                  {project.title}
                </Link>
                <ArrowUpRight
                  size={20}
                  className="text-fg/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </h3>

              <p className="mt-3 text-sm leading-6 text-fg/60 sm:text-base sm:leading-7">
                {project.hook}
              </p>

              {project.metrics && (
                <dl className="mt-6 flex gap-8">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd className="font-display text-3xl text-fg">
                        {metric.value}
                      </dd>
                      <dd className="font-mono text-[11px] text-fg/45">{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-auto pt-6">
                <TechTags stack={project.stack} />

                {(project.repoUrl || project.liveUrl) && (
                  <div className="mt-4 flex items-center gap-4 font-mono text-xs">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 inline-flex items-center gap-1.5 text-fg/55 transition hover:text-fg"
                      >
                        <Github size={13} />
                        code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 inline-flex items-center gap-1.5 text-fg/55 transition hover:text-fg"
                      >
                        <ExternalLink size={13} />
                        live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
