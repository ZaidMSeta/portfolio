import { Link } from "react-router";
import { experiences } from "../../data/experience";

function formatYM(ym: string) {
  if (!ym) return "";
  if (ym === "Present") return "Present";

  const [year, month] = ym.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const index = Number(month) - 1;
  const monthLabel = monthNames[index] ?? month;

  return `${monthLabel} ${year}`;
}

export function ExperienceSnapshot() {
  const featuredExperience = experiences.filter((role) => role.showOnHome);

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Experience</h2>

        <Link
          to="/experience"
          className="text-sm text-muted-foreground transition hover:text-foreground"
        >
          See all experience →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredExperience.map((role) => (
          <article
            key={role.id}
            className="rounded-xl border border-border bg-card p-5 transition hover:border-white/20"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src={role.logo}
                  alt={`${role.company} logo`}
                  className="h-10 w-10 rounded-lg border border-border object-contain bg-white p-1"
                />

                <div>
                  <h3 className="text-base font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.company}</p>
                </div>
              </div>

              <div className="text-right text-xs text-muted-foreground">
                <p>{formatYM(role.start)}</p>
                <p>— {role.end === "Present" ? "Present" : formatYM(role.end)}</p>
              </div>
            </div>

            <p className="mb-3 text-sm text-muted-foreground">{role.location}</p>

            <p className="text-sm text-muted-foreground">
              {role.description[0]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}