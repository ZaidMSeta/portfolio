import { experiences } from "../data/experience";

function formatYM(ym: string) {
  if (!ym) return "";
  if (ym === "Present") return "Present";

  const [year, month] = ym.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const index = Number(month) - 1;
  const monthLabel = monthNames[index] ?? month;

  return `${monthLabel} ${year}`;
}

export default function Experience() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Experience
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-fg/65 sm:text-base">
          A mix of technical, collaborative, and customer-facing experience that
          has shaped how I work, communicate, and build software.
        </p>
      </section>

      <section className="space-y-5">
        {experiences.map((role) => (
          <article
            key={role.id}
            className="rounded-xl border border-fg/10 bg-fg/5 p-6 transition hover:border-fg/20"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={role.logo}
                  alt={`${role.company} logo`}
                  className="h-12 w-12 rounded-lg border border-fg/10 bg-white p-1 object-contain"
                />

                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-fg">
                    {role.title}
                  </h2>
                  <p className="text-sm text-fg/60">{role.company}</p>
                  <p className="text-sm text-fg/50">{role.location}</p>
                </div>
              </div>

              <div className="text-sm text-fg/50 lg:text-right">
                <p>{formatYM(role.start)}</p>
                <p>— {role.end === "Present" ? "Present" : formatYM(role.end)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {role.description.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <p className="text-sm leading-7 text-fg/65 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-fg/10 bg-fg/5 p-6">
        <div className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-semibold text-fg">
            Technical Experience
          </h2>

          <div className="space-y-4 text-sm leading-7 text-fg/65 sm:text-base">
            <p>
              Alongside formal work experience, I've also spent a lot of time
              building technical projects that reflect my interest in full-stack
              development, product-focused tools, and practical software.
            </p>

            <p>
              These projects have involved frontend UI work, backend logic, API
              integration, scraping, data handling, and building interfaces
              around real user workflows. Together, they've helped me grow both
              technically and in how I approach software design more broadly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
