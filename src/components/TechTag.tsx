import { getTechColour } from "../lib/utils/techColour";

export function TechTag({ tech }: { tech: string }) {
  const colour = getTechColour(tech);

  return (
    <span
      className="rounded-md px-2 py-0.5 font-mono text-[11px]"
      style={{ backgroundColor: colour.bg, color: colour.text }}
    >
      {tech}
    </span>
  );
}

export function TechTags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <TechTag key={tech} tech={tech} />
      ))}
    </div>
  );
}
