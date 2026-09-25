import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { caseStudies, type CaseStudy } from "../data/caseStudies";
import { ProjectImage } from "../components/ProjectImage";
import { TechTags } from "../components/TechTag";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-xl border border-fg/10 card">
        <div className="aspect-[16/9] bg-fg/5">
          <ProjectImage src={images[0]} alt={title} />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-fg/10 card">
      <div className="relative aspect-[16/9] bg-fg/5">
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
                i === index ? "w-4 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl tracking-tight text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((text) => (
        <p key={text} className="text-base leading-8 text-fg/70">
          {text}
        </p>
      ))}
    </div>
  );
}

// Numbered pipeline: vertical on mobile, a row of steps on wide screens
function FlowDiagram({ steps }: { steps: CaseStudy["flow"] }) {
  return (
    <ol className="grid gap-3 lg:grid-cols-5 lg:gap-0">
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex lg:flex-col">
          <div
            className={`flex flex-1 flex-col rounded-xl border border-fg/10 card p-4 ${
              index < steps.length - 1 ? "lg:mr-6" : ""
            }`}
          >
            <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-display text-lg leading-tight text-fg">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-fg/60">{step.detail}</p>
            <p className="mt-auto pt-3 font-mono text-[11px] text-fg/40">{step.tech}</p>
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute -bottom-3 left-6 h-3 w-px bg-fg/20 lg:bottom-auto lg:left-auto lg:right-1.5 lg:top-1/2 lg:h-px lg:w-3"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function CardList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-fg/10 card p-5">
          <h3 className="font-display text-lg leading-snug text-fg">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-fg/60">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ project, study }: { project: Project; study?: CaseStudy }) {
  const rows = [
    study && { label: "Role", value: study.role },
    { label: "Timeline", value: study?.timeline ?? project.date },
    { label: "Status", value: project.status },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="font-mono text-xs text-fg/40">{row.label}</dt>
            <dd className="mt-1 text-sm text-fg/80">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <p className="mb-2 font-mono text-xs text-fg/40">Stack</p>
        <TechTags stack={project.stack} />
      </div>

      {(project.repoUrl || project.liveUrl) && (
        <div className="flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-bg transition hover:bg-accent/85"
            >
              <ExternalLink size={14} />
              Visit site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-fg/15 px-3.5 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      )}
    </aside>
  );
}

function CaseStudyBody({ study }: { study: CaseStudy }) {
  return (
    <>
      <Section title="What I built">
        <ul className="space-y-6">
          {study.contributions.map((item) => (
            <li key={item.title} className="border-l-2 border-accent/40 pl-5">
              {item.when && <p className="font-mono text-xs text-accent/80">{item.when}</p>}
              <h3 className="font-display text-lg text-fg">{item.title}</h3>
              <p className="mt-1.5 text-base leading-7 text-fg/65">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Decisions worth noting">
        <CardList items={study.decisions} />
      </Section>
      {study.story && (
        <Section title={study.story.title}>
          <Prose paragraphs={study.story.paragraphs} />
        </Section>
      )}
      <Section title="Reflection">
        <Prose paragraphs={study.reflection} />
      </Section>
    </>
  );
}

function StandardBody({ project }: { project: Project }) {
  return (
    <>
      <Section title="What it is">
        <Prose paragraphs={[project.whatItIs]} />
      </Section>
      <Section title="Why I built it">
        <Prose paragraphs={[project.whyBuilt]} />
      </Section>
      <Section title="Key features">
        <ul className="space-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-base leading-7 text-fg/70">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Reflection">
        <Prose paragraphs={[project.reflection]} />
      </Section>
    </>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  useDocumentTitle(project?.title ?? "Project not found");

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl tracking-tight text-fg">Project not found</h1>
          <p className="text-sm leading-7 text-fg/65 sm:text-base">
            The project you're looking for doesn't exist.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-fg/60 transition hover:text-fg"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>
      </div>
    );
  }

  const study = caseStudies[project.slug];
  const stats = study?.stats ?? project.metrics;
  const images = project.images?.length ? project.images : [project.image];

  const body = study ? (
    <Section title="The problem">
      <Prose paragraphs={study.problem} />
    </Section>
  ) : (
    <StandardBody project={project} />
  );

  return (
    <div className="space-y-12">
      <header className="space-y-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-fg/50 transition hover:text-fg"
        >
          <ArrowLeft size={14} />
          all projects
        </Link>

        <div className="max-w-3xl">
          <p className="font-mono text-xs text-fg/45">
            {project.date} · <span className="text-accent/80">{project.status}</span>
          </p>
          <h1 className="mt-3 text-4xl tracking-tight text-fg sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-8 text-fg/65">{project.summary}</p>
        </div>

        {stats && stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-6 border-y border-fg/10 py-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-fg sm:text-4xl">{stat.value}</dd>
                <dd className="mt-1 font-mono text-[11px] text-fg/45">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <ImageCarousel images={images} title={project.title} />

      <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="lg:order-2">
          <Sidebar project={project} study={study} />
        </div>
        <div className="min-w-0 space-y-14 lg:order-1">{body}</div>
      </div>

      {study && (
        <>
          {/* The pipeline needs the full width; the rest reads best at a prose measure */}
          <Section title="How it works">
            <FlowDiagram steps={study.flow} />
          </Section>
          <div className="max-w-3xl space-y-14">
            <CaseStudyBody study={study} />
          </div>
        </>
      )}
    </div>
  );
}
