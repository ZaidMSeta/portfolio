import { ChevronDown } from "lucide-react";
import { CompanyLogo } from "../components/CompanyLogo";
import { formatYM } from "../lib/utils/formatDate";
import { experiences, type Experience as Role } from "../data/experience";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function dateRange(role: Role) {
  return `${formatYM(role.start)} — ${formatYM(role.end)}`;
}

function TimelineEntry({ role, isCurrent }: { role: Role; isCurrent: boolean }) {
  return (
    <li className="relative pb-12 pl-8 last:pb-0 md:grid md:grid-cols-[160px_1fr] md:gap-10 md:pl-0">
      {/* Dot sits on the timeline rule: left edge on mobile, between the columns on desktop */}
      <span
        className={`absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-bg md:left-[180px] ${
          isCurrent ? "bg-accent" : "bg-fg/25"
        }`}
      />

      <p className="mb-3 font-mono text-xs text-fg/45 md:mb-0 md:pt-1 md:text-right">
        {dateRange(role)}
      </p>

      <div className="md:pl-4">
        <div className="flex items-start gap-4">
          <CompanyLogo src={role.logo} company={role.company} className="h-11 w-11" />
          <div>
            <h2 className="text-lg tracking-tight text-fg">{role.title}</h2>
            <p className="text-sm text-fg/60">
              {role.company} <span className="text-fg/30">·</span> {role.location}
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {role.description.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-fg/65 sm:text-base">
              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-fg/35" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  useDocumentTitle("Experience");

  const software = experiences.filter((role) => role.kind === "software");
  const earlier = experiences.filter((role) => role.kind === "earlier");

  return (
    <div className="space-y-14">
      <section className="space-y-4">
        <h1 className="text-4xl tracking-tight text-fg sm:text-5xl">
          Experience
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-fg/65 sm:text-base">
          Software work for clients, a nonprofit, a startup, and a local soccer club.
          Most of it replaced something people were doing by hand.
        </p>
      </section>

      <section className="relative">
        <span
          aria-hidden
          className="absolute bottom-2 left-0 top-2 w-px bg-fg/10 md:left-[180px]"
        />
        <ol>
          {software.map((role) => (
            <TimelineEntry key={role.id} role={role} isCurrent={role.end === "Present"} />
          ))}
        </ol>
      </section>

      {earlier.length > 0 && (
        <details className="group rounded-2xl border border-fg/10 card">
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 [&::-webkit-details-marker]:hidden">
            <div>
              <h2 className="text-base text-fg">Earlier</h2>
              <p className="text-sm text-fg/50">
                {earlier.map((role) => role.company).join(", ")}
              </p>
            </div>
            <ChevronDown size={18} className="text-fg/40 transition group-open:rotate-180" />
          </summary>

          <div className="divide-y divide-fg/10 border-t border-fg/10">
            {earlier.map((role) => (
              <div key={role.id} className="px-6 py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-fg">
                    {role.title} <span className="text-fg/50">· {role.company}</span>
                  </p>
                  <p className="font-mono text-xs text-fg/45">{dateRange(role)}</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {role.description.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-fg/60">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-fg/35" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
