import { projects } from "../data/projects";
import { ProjectCard } from "../components/projects/ProjectCard";

export default function Projects() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Projects
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
          A collection of projects, tools, and experiments I’ve worked on across
          full-stack development, product-focused software, and practical student
          tools.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}