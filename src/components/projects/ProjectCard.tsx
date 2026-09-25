import { Link } from "react-router";
import type { Project } from "../../data/projects";
import { ProjectImage } from "../ProjectImage";
import { TechTag } from "../TechTag";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-fg/10 card transition hover:border-fg/20"
    >
      <div className="aspect-16/10 overflow-hidden bg-fg/5">
        <ProjectImage
          src={project.image}
          alt={project.title}
          className="object-top opacity-80 transition-opacity group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-fg">{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-fg/50">{project.date}</span>
        </div>

        <p className="mb-4 text-sm leading-6 text-fg/60">
          {project.description}
        </p>

        <div className="mt-auto mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechTag key={tech} tech={tech} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-fg/10 pt-3">
          <span className="font-mono text-xs text-fg/50">details →</span>
          <span className="font-mono text-xs text-accent">{project.status}</span>
        </div>
      </div>
    </Link>
  );
}
