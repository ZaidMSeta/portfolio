import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import { getTechColour } from "../lib/utils/techColour";


export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Project Not Found
          </h1>
          <p className="text-sm leading-7 text-white/65 sm:text-base">
            The project you’re looking for doesn’t exist.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="text-white/45">{project.date}</span>
          <span className="text-teal-300">{project.status}</span>

          <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
            >
              <Github size={14} />
              View Code
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:text-white"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="aspect-[16/8] bg-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">What It Is</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.whatItIs}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Why I Built It</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.whyBuilt}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-7 text-white/65 sm:text-base"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Reflection</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.reflection}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}