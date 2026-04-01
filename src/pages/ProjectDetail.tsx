import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { projects } from "../data/projects";
import { getTechColour } from "../lib/utils/techColour";

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="aspect-[16/9] bg-white/5">
          <img src={images[0]} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="relative aspect-[16/9] bg-white/5">
        <img
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-black/50 p-1.5 text-white/70 backdrop-blur-sm transition hover:border-white/30 hover:text-white"
          aria-label="Previous image"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-white/15 bg-black/50 p-1.5 text-white/70 backdrop-blur-sm transition hover:border-white/30 hover:text-white"
          aria-label="Next image"
        >
          <ChevronRight size={16} />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-teal-300" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
            The project you're looking for doesn't exist.
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

  const images = project.images?.length ? project.images : [project.image];

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            {project.summary}
          </p>
        </div>
      </section>

      <ImageCarousel images={images} title={project.title} />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <span className="text-white/45">{project.date}</span>
        <span className="text-teal-300">{project.status}</span>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => {
            const color = getTechColour(tech);
            return (
              <span
                key={tech}
                className="rounded-md px-2 py-0.5 text-[11px]"
                style={{ backgroundColor: color.bg, color: color.text }}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>

      {(project.repoUrl || project.liveUrl) && (
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
      )}

      <section className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="space-y-8">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">What It Is</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">{project.whatItIs}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">Why I Built It</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">{project.whyBuilt}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-white">Key Features</h2>
            <ul className="space-y-2">
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
            <h2 className="mb-3 text-xl font-semibold text-white">Reflection</h2>
            <p className="text-sm leading-7 text-white/65 sm:text-base">{project.reflection}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
