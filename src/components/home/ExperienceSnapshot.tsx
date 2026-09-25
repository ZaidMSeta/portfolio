import { Link } from "react-router";
import { CompanyLogo } from "../CompanyLogo";
import { formatYM } from "../../lib/utils/formatDate";
import { experiences } from "../../data/experience";

export function ExperienceSnapshot() {
  const featuredExperience = experiences.filter((role) => role.showOnHome);

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-fg">Experience</h2>

        <Link
          to="/experience"
          className="font-mono text-xs text-fg/50 transition hover:text-fg"
        >
          all experience →
        </Link>
      </div>

      <ol className="divide-y divide-fg/10 rounded-2xl border border-fg/10 card">
        {featuredExperience.map((role) => (
          <li
            key={role.id}
            className="grid gap-x-6 gap-y-2 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:p-6"
          >
            <CompanyLogo src={role.logo} company={role.company} className="h-10 w-10" />

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-fg">
                {role.title} <span className="font-normal text-fg/50">· {role.company}</span>
              </h3>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-fg/60">{role.description[0]}</p>
            </div>

            <p className="font-mono text-xs text-fg/45 sm:pt-1 sm:text-right">
              {formatYM(role.start)} — {formatYM(role.end)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
