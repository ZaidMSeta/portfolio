import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Reveal } from "../components/motion/Reveal";

export default function Projects() {
  useDocumentTitle("Projects");

  const ongoing = projects.filter((project) => project.status === "Ongoing").length;

  return (
    <div className="space-y-14">
      <section className="space-y-4">
        <p className="font-mono text-xs text-subtle">
          {projects.length} projects · {ongoing} ongoing
        </p>
        <h1 className="text-4xl tracking-tight text-fg sm:text-5xl">Projects</h1>

        <p className="max-w-3xl text-sm leading-7 text-fg/65 sm:text-base">
          From a course planner 200+ McMaster students use to scheduling tools for a youth
          soccer club. Each one has a write-up covering the problem, how it works, and what I
          learned building it.
        </p>
      </section>

      <section>
        {/* The first project spans two columns, so five cards fill the three-column grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              className={index === 0 ? "md:col-span-2" : ""}
              delay={(index % 3) * 80}
            >
              <ProjectCard project={project} wide={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
