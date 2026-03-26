import { Link } from "react-router";
import type { Project } from "../../data/projects";
import { getTechColour } from "../../lib/utils/techColour";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
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
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          <span className="shrink-0 text-xs text-white/50">{project.date}</span>
        </div>

        <p className="mb-4 text-sm leading-6 text-white/60">
          {project.description}
        </p>

        <div className="mt-auto mb-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => {
            const color = getTechColour(tech);

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
          <span className="text-xs text-white/50">Details →</span>
          <span className="text-xs text-teal-300">{project.status}</span>
        </div>
      </div>
    </Link>
  );
}