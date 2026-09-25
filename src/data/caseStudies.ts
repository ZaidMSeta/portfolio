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
  roomradar: {
    role: "Solo project",
    timeline: "Jan 2026 – present",
    stats: [
      { value: "354", label: "rooms tracked" },
      { value: "26", label: "buildings" },
      { value: "7,325", label: "weekly class meetings" },
      { value: "1,660", label: "courses scraped a term" },
    ],
    problem: [
      "Finding somewhere to study on campus usually means walking the halls and checking doors. McMaster publishes when and where every class meets, but only one course at a time. Nothing answers \"what's free in this building right now?\"",
      "RoomRadar flips the timetable around: instead of course → rooms, it builds room → classes for the whole term, so you can ask what's free now, at a given time, or for at least an hour.",
    ],
    flow: [
      {
        title: "Log in and pick the term",
        detail: "A one-time login saves a session, since the timetable hides room locations from guests. The term is chosen by today's date.",
        tech: "Playwright",
      },
      {
        title: "Fetch every course",
        detail: "Pages through all 1,660 courses and downloads each one's timetable XML, replaying the site's own requests. Resumable and read-only.",
        tech: "Playwright · TypeScript",
      },
      {
        title: "Add room details",
        detail: "Scrapes the library's classroom directory for capacity, access, outlets, and AV.",
        tech: "TypeScript",
      },
      {
        title: "Build the room index",
        detail: "Turns 1,612 course files into 7,325 room bookings with date ranges and access tags.",
        tech: "TypeScript · fast-xml-parser",
      },
      {
        title: "Answer in the browser",
        detail: "One content-hashed JSON file on Vercel. Free-now, free-at, and free-for checks run client-side, with filters kept in the URL.",
        tech: "React · Vite",
      },
    ],
    contributions: [
      {
        when: "Sep – Nov 2025",
        title: "A first attempt that stalled",
        body: "Built Python/Selenium and Node/MySQL prototypes, then hit a wall: guest timetable responses don't include room locations at all.",
      },
      {
        when: "Jan 2026",
        title: "A scraper that behaves like the real site",
        body: "Rewrote it in TypeScript with Playwright, capturing one real request as a template and replaying it per course, refreshing expired tokens and retrying once. Progress is logged so a failed run resumes where it stopped.",
      },
      {
        when: "Mar – Apr",
        title: "From XML to a room index",
        body: "Wrote the build step that parses each course's XML into a room-by-room schedule, and the React frontend on top of it. Merged the separate views into one page with availability at any chosen day and time.",
      },
      {
        when: "Sep",
        title: "The Fall 2026 update",
        body: "Picked the term by date (the old logic would have scraped Winter 2027 in September), switched to the live course list (the static one was missing 419 of 1,660 courses), and added class date ranges, since about a third of meetings run for a single week and those rooms had shown as busy all term.",
      },
      {
        when: "Sep",
        title: "Correctness, size, and room details",
        body: "Fixed a parser bug that dropped a quarter of all bookings, cut the data file from 2.7 MB to 458 KB with byte-for-byte identical output, added room details from the library directory, and moved every filter into the URL so views can be shared.",
      },
    ],
    decisions: [
      {
        title: "Replay the site's own requests",
        body: "Rather than scraping rendered pages, the scraper captures one real timetable request and reuses it for every course, which is faster and far less brittle than parsing HTML.",
      },
      {
        title: "Read-only by construction",
        body: "A safety layer blocks every non-GET call except the course lookup and drops the site's telemetry, so the scraper can't change anything even by accident.",
      },
      {
        title: "No backend at all",
        body: "A whole term fits in one static file, so every query runs in the browser. There's nothing to host but static assets, and the content hash means new data is never served stale.",
      },
      {
        title: "Check with a second implementation",
        body: "Data changes are verified against an independent Python re-parse, and refactors are checked in a headless browser on a fixed clock so old and new output can be compared exactly.",
      },
    ],
    story: {
      title: "The bug that hid a quarter of the timetable",
      paragraphs: [
        "In September I found that 1,686 of 6,860 weekly room bookings, about 25%, were missing, across 133 courses and 158 rooms. Those rooms showed as free while classes were in them.",
        "The cause was the XML parser returning a single section as an object but several as an array. The builder only handled the first shape, so any course with sections sharing a time pattern was silently dropped. The same pass fixed course codes like 1E03 being read as scientific notation.",
        "To confirm the fix I re-parsed every file with a separate Python script and compared the results: 7,325 meetings on both sides, none missing, none extra.",
      ],
    },
    reflection: [
      "RoomRadar taught me to treat data correctness as the product. The interface looked fine the whole time a quarter of the bookings were missing. Nothing crashed, so nothing told me.",
      "Now I don't trust a data pipeline until something independent agrees with it.",
    ],
  },
  "cmta-event-tool": {
    role: "Solo developer for a nonprofit client",
    timeline: "Apr – May 2026",
    stats: [
      { value: "8", label: "fields read from each poster" },
      { value: "4", label: "outputs per poster" },
      { value: "3", label: "platforms published to" },
      { value: "46", label: "PRs merged" },
    ],
    problem: [
      "The association's founder was finding event posters online, reading them by hand, rewriting the details for each platform, and then entering them again on the website. The same event got typed out three or four times, then posted to dozens of national, provincial, and topic accounts one by one.",
      "The tool takes a poster and does the retyping: it reads the event details, writes platform-specific copy, suggests which accounts should get it, and publishes or schedules it, with the owner checking everything before it goes out.",
    ],
    flow: [
      {
        title: "Upload a poster",
        detail: "Drag in an image; it's encoded in the browser and sent to a serverless function.",
        tech: "React · Vercel",
      },
      {
        title: "Extract the details",
        detail: "Gemini returns eight fixed JSON fields. The owner checks them and fills any gaps.",
        tech: "Gemini API",
      },
      {
        title: "Write the captions",
        detail: "One call produces Instagram and Facebook captions, a website description, and a facts block, each regenerable by tone.",
        tech: "Gemini API",
      },
      {
        title: "Choose accounts",
        detail: "Recommends national, provincial, and topic accounts using rules written with the client's social lead.",
        tech: "TypeScript",
      },
      {
        title: "Publish or schedule",
        detail: "Uploads the media once, then creates one post version per account through a server-side proxy.",
        tech: "OnlySocial API",
      },
    ],
    contributions: [
      {
        when: "Early Apr",
        title: "Poster to post, end to end",
        body: "Built the frontend, the Gemini extraction and caption calls, and the OnlySocial integration, plus a serverless proxy once browser calls to the publishing API were blocked by CORS.",
      },
      {
        when: "Mid Apr",
        title: "Scheduling, auth, and integrations",
        body: "Added one-off and recurring scheduled posts, moved sign-in and API calls server-side, and connected Google Drive export and Monday.com board items.",
      },
      {
        when: "Late Apr",
        title: "Built for a non-technical owner",
        body: "Added per-caption regeneration by tone, onboarding, draft autosave, an activity log with CSV export, and a plain-language pass over every label and message in the UI.",
      },
      {
        when: "May",
        title: "The client's rules and a security pass",
        body: "Encoded the social lead's account rules with province detection, added a scheduled-posts view and a sales outreach feature, then hardened the app: per-session tokens, correct client IPs for rate limiting, CSV formula-injection protection, and request size limits.",
      },
      {
        when: "May",
        title: "Handoff",
        body: "Ran QA with the owner and handed the tool over.",
      },
    ],
    decisions: [
      {
        title: "Strict JSON in, defensive parsing out",
        body: "The model is limited to eight named fields, with empty strings for anything it can't find. Responses are stripped of stray formatting and checked against that list before the UI trusts them.",
      },
      {
        title: "Fall back instead of failing",
        body: "When Gemini is overloaded, the request waits briefly and falls through three models, so a busy API means a slightly slower answer rather than an error.",
      },
      {
        title: "A proxy that forwards as little as possible",
        body: "The publishing token never reaches the browser. The proxy forwards two headers, rejects path tricks, caps uploads at 20 MB, and turns redirects into errors instead of following them.",
      },
      {
        title: "Review instead of a separate approval step",
        body: "An early version had a separate \"approved\" status. I replaced it with review in place: the owner edits the extracted fields and captions directly and has to accept any empty required field before publishing.",
      },
    ],
    reflection: [
      "The hard part wasn't the AI extraction. It was designing for one non-technical person who needed to stay in control of what went out under the association's name.",
      "Almost everything after the first week was about trust: seeing exactly what the model read, fixing it in place, and knowing nothing publishes without a click.",
    ],
  },
};
