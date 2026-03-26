import { Link, useParams } from "react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";

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

        <div className="flex flex-wrap items-center gap-3">
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">What It Is</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.whatItIs}
            </p>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Why I Built It</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.whyBuilt}
            </p>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Key Features</h2>
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
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Reflection</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">
              {project.reflection}
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Project Info</h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-white/40">Status</p>
                <p className="text-white/80">{project.status}</p>
              </div>

              <div>
                <p className="mb-1 text-white/40">Date</p>
                <p className="text-white/80">{project.date}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Tech Stack</h2>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}