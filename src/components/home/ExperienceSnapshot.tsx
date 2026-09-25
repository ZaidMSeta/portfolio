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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredExperience.map((role) => (
          <article
            key={role.id}
            className="rounded-xl border border-fg/10 bg-fg/5 p-5 transition hover:border-fg/20"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CompanyLogo src={role.logo} company={role.company} className="h-10 w-10" />

                <div>
                  <h3 className="text-base font-semibold text-fg">
                    {role.title}
                  </h3>
                  <p className="text-sm text-fg/60">{role.company}</p>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-fg/50">
                <p>{formatYM(role.start)}</p>
                <p>
                  — {role.end === "Present" ? "Present" : formatYM(role.end)}
                </p>
              </div>
            </div>

            <p className="mb-3 text-sm text-fg/50">{role.location}</p>

            <p className="text-sm leading-6 text-fg/60">
              {role.description[0]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
