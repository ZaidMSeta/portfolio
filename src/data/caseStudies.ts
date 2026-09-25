// Long-form case studies for project detail pages, keyed by project slug.
// Projects without an entry fall back to the standard detail layout.

export type CaseStudy = {
  role: string;
  timeline: string;
  stats: { value: string; label: string }[];
  problem: string[];
  flow: { title: string; detail: string; tech: string }[];
  contributions: { when?: string; title: string; body: string }[];
  decisions: { title: string; body: string }[];
  // Optional narrative section, e.g. an incident or a hard call
  story?: { title: string; paragraphs: string[] };
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
      { value: "35+", label: "PRs I authored" },
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
        when: "Feb – Mar",
        title: "Planner filters and early schema work",
        body: "Extended the original schema and built the course filters on the degree planner's add-course dialog, so students could narrow the catalog down to what fits their plan.",
      },
      {
        when: "Mar",
        title: "Seat alerts that only fire when a seat opens",
        body: "Changed the scraper to notify only on a transition into open, not on every status change, which stopped duplicate alerts for waitlist and status churn.",
      },
      {
        when: "Mar – Apr",
        title: "Accounts, profiles, and data fixes",
        body: "Fixed the signup and login flows, improved program search at signup, made Google sign-in work in dark mode and on resize, and added profile editing. Wrote a safe data migration for a split engineering course and fixed parsing for zero-unit courses.",
      },
      {
        when: "Apr",
        title: "Keeping Mosaic sessions alive",
        body: "Built the pulse endpoint that decrypts a stored session and checks it against Mosaic, plus a 10-minute heartbeat that runs from anywhere in the app and re-checks when the tab comes back into focus.",
      },
      {
        when: "Apr – Sep",
        title: "Security hardening",
        body: "Rejected CR/LF in email headers to close a header-injection path, moved transcript uploads to temp files, revoked sessions on password reset and Google account claims, made the internal notify secret check constant-time, and patched dependency advisories across npm, Go, and pip.",
      },
      {
        when: "Jul – Sep",
        title: "Rebuilt the planner and retired the dashboard",
        body: "Added shared plan types and a usePlan hook with optimistic updates, split the planner into about 15 components, then moved grades and GPA, degree requirements, year advancement, and stats over from the dashboard one PR at a time before redirecting /dashboard. A strangler-fig migration rather than a big-bang rewrite.",
      },
      {
        when: "Sep",
        title: "A focused bug sweep",
        body: "Shipped seven small PRs in a day covering planner conflicts and imports, summer terms, drag and drop, ICS export, course and professor pages, and auth edge cases.",
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
    story: {
      title: "When auto-enroll had to come down",
      paragraphs: [
        "In April the team shipped auto-enroll: students connected their Mosaic account, and when a watched seat opened, the scraper went through the enrollment flow for them. Passwords were used once to create a session and then discarded, and session cookies were encrypted at rest with AES-256-GCM. My part was keeping those sessions alive.",
        "The feature got attention on r/McMaster, and with it fair questions about a student tool holding university credentials. We contacted McMaster's Digital Trust and Governance team ourselves, took auto-enroll down, purged the stored session data, and made seat alerts free and unlimited for everyone.",
        "I shipped the public post-mortem and a site-wide banner linking to it, so anyone who had connected their account could see exactly what we'd stored and what happened to it.",
        "The lesson I took from it: secure isn't the same as appropriate. Encryption answered how we stored credentials. It didn't answer whether we should have been holding them at all.",
      ],
    },
    reflection: [
      "MacTrack is where I learned to change a live product without breaking it for the people using it. Moving the planner over one feature at a time was slower than a rewrite, but students always had a working version while it happened.",
      "It also taught me how to work inside a shared codebase with a small team: reading what's there before changing it, splitting work into PRs that are easy to review, and keeping main deployable.",
    ],
  },
};
