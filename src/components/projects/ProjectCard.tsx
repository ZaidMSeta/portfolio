import { Link } from "react-router";
import type { Project } from "../../data/projects";
import { ProjectImage } from "../ProjectImage";
import { TechTag } from "../TechTag";

type ProjectCardProps = {
  project: Project;
  // Wide cards span two grid columns and sit image-beside-text on large screens
  wide?: boolean;
};

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-fg/10 card transition hover:border-fg/20 ${
        wide ? "md:grid md:grid-cols-[1.6fr_1fr]" : ""
      }`}
    >
      <div className={`aspect-16/10 overflow-hidden bg-fg/5 ${wide ? "md:aspect-auto md:border-r md:border-fg/10" : ""}`}>
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="object-top opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      </div>

      <div className={`flex flex-1 flex-col p-5 ${wide ? "md:p-7" : ""}`}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className={`font-display text-xl text-fg ${wide ? "xl:text-2xl" : ""}`}>{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-subtle">{project.date}</span>
        </div>

        <p className="mb-4 text-sm leading-6 text-fg/60">{wide ? project.hook : project.description}</p>

        {wide && project.metrics && (
          <dl className="mb-5 hidden gap-8 md:flex">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-2xl text-fg">{metric.value}</dd>
                <dd className="font-mono text-[11px] text-subtle">{metric.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechTag key={tech} tech={tech} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-fg/10 pt-3">
          <span className="font-mono text-xs text-subtle transition group-hover:text-fg">
            read case study <span className="inline-block transition group-hover:translate-x-0.5">→</span>
          </span>
          <span className="font-mono text-xs text-accent">{project.status}</span>
        </div>
      </div>
    </Link>
  );
}
