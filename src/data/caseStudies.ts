// Long-form case studies for project detail pages, keyed by project slug.
// Projects without an entry fall back to the standard detail layout.

export type CaseStudy = {
  role: string;
  timeline: string;
  stats: { value: string; label: string }[];
  problem: string[];
  flow: { title: string; detail: string; tech: string }[];
  contributions: { title: string; body: string }[];
  decisions: { title: string; body: string }[];
  reflection: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  mactrack: {
    role: "Full-stack developer, team of 4",
    timeline: "Feb 2026 – present",
    stats: [
      { value: "200+", label: "students using it" },
      { value: "~1s", label: "between seat checks" },
      { value: "112", label: "commits from me" },
      { value: "46", label: "PRs I merged" },
    ],
    problem: [
      "Popular McMaster courses fill up in minutes, and seats that open later go to whoever happens to refresh at the right moment. Planning a degree meant cross-referencing the academic calendar, prerequisite chains, and a spreadsheet.",
      "MacTrack puts course search, degree planning, and seat alerts in one place, with alerts fast enough to matter.",
    ],
    flow: [
      {
        title: "Sync the catalog",
        detail: "A Python Lambda pulls the full course catalog into Postgres every Sunday.",
        tech: "Python · EventBridge",
      },
      {
        title: "Watch a section",
        detail: "Students pick sections in the React app; the Go API on Lambda stores the watch.",
        tech: "React · Go · Postgres",
      },
      {
        title: "Poll about once a second",
        detail: "The scraper Lambda runs every 15 minutes and loops for about 14, batching watched sections by term.",
        tech: "Python · Lambda",
      },
      {
        title: "Keep only real changes",
        detail: "One UPDATE … WHERE status IS DISTINCT FROM … RETURNING hands back just the sections that changed.",
        tech: "PostgreSQL",
      },
      {
        title: "Notify on closed → open",
        detail: "The scraper calls Go's internal notify endpoint, which sends email and Web Push.",
        tech: "Go · Web Push",
      },
    ],
    contributions: [
      {
        title: "Merged the dashboard into the degree planner",
        body: "Moved grades, requirements, year advancement, and stats into the planner one PR at a time while both views stayed live, then cut over and redirected /dashboard. A strangler-fig migration rather than a big-bang rewrite.",
      },
      {
        title: "Built the shared plan model it ran on",
        body: "Split the planner into components and added shared plan types and a usePlan hook with optimistic updates, so the dashboard features had one place to land.",
      },
      {
        title: "Made alerts fire only when it matters",
        body: "Changed notifications to trigger only on a closed-to-open transition, so students stopped getting pinged for waitlist and status churn.",
      },
      {
        title: "Hardened the API",
        body: "Rejected CR/LF in email headers to close a header-injection path, made the internal notify secret check constant-time, revoked sessions on password reset and Google account claims, and moved transcript uploads to temp files.",
      },
      {
        title: "Kept dependencies patched",
        body: "Worked through Dependabot updates across npm, Go modules, and pip, and patched advisories by hand where the bot couldn't.",
      },
    ],
    decisions: [
      {
        title: "A Lambda that behaves like a server",
        body: "Scheduling the scraper every 15 minutes and letting each run loop for about 14 gives near real-time checks without paying for an always-on machine.",
      },
      {
        title: "Let the database do the diffing",
        body: "A single conditional UPDATE returns only the rows whose status actually changed, instead of reading, comparing, and writing each one.",
      },
      {
        title: "Three layers against duplicate alerts",
        body: "The database diff, the scraper's transition check, and the Go endpoint's already-open check each stop repeats on their own, so one bug doesn't spam students.",
      },
      {
        title: "Write less, pay less",
        body: "Unchanged rows aren't rewritten on every poll. Those writes were a large share of the team's Supabase egress.",
      },
    ],
    reflection: [
      "MacTrack is where I learned to change a live product without breaking it for the people using it. Moving the planner over one feature at a time was slower than a rewrite, but students always had a working version while it happened.",
      "It also taught me to work in a codebase I didn't write most of. The scraper and API were mostly my teammates' work, and my best contributions came from understanding them well enough to change them safely.",
    ],
  },
};
