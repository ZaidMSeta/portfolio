export type Project = {
  id: string;
  slug: string;
  title: string;
  hook: string;
  description: string;
  stack: string[];
  image: string;
  repoUrl?: string;
  liveUrl?: string;
  status: "Complete" | "Ongoing";
  date: string;
  type: "Practical" | "Fun" | "Course" | "Experiment" | "Team";
  featured: boolean;
  summary: string;
  whatItIs: string;
  whyBuilt: string;
  features: string[];
  reflection: string;
};

export const projects: Project[] = [
  {
    id: "mactrack",
    slug: "mactrack",
    title: "MacTrack",
    hook: "A course planning platform for McMaster students.",
    description:
      "MacTrack is a full-stack web app for browsing courses, planning degree progress, and tracking useful academic information in one place.",
    stack: ["React", "TypeScript", "Go", "SQLite"],
    image: "/projects/mactrack.png",
    repoUrl: "https://github.com/hasan-ston/mactrack",
    liveUrl: "",
    status: "Ongoing",
    date: "2026",
    type: "Practical",
    featured: true,
    summary:
      "A student-focused platform for browsing courses, organizing degree plans, and exploring academic information in one place.",
    whatItIs:
      "MacTrack is a full-stack academic planning platform designed for McMaster students. It combines course discovery, degree planning, professor information, reviews, and other useful academic tools into one interface.",
    whyBuilt:
      "I wanted to work on a practical product that solved a real student problem. Planning courses and understanding degree requirements is often fragmented, so MacTrack was built to make that experience more centralized and easier to use.",
    features: [
      "Course browsing with descriptions and prerequisite information",
      "Degree planning and term organization tools",
      "Professor and review-related information",
      "A cleaner, more centralized student planning experience",
    ],
    reflection:
      "MacTrack has been a strong experience in building a practical full-stack product with real user-facing value. It pushed me to think more carefully about structure, usability, and how to design around real workflows rather than just isolated features.",
  },
  {
    id: "morphace",
    slug: "morphace",
    title: "Morphace",
    hook: "A skincare-focused app with insights, readings, and progress tracking.",
    description:
      "Morphace is a team-based project involving frontend UI work and backend/API contributions for a user-facing skincare product.",
    stack: ["SwiftUI", "FastAPI", "Python", "PostgreSQL"],
    image: "/projects/morphace.png",
    repoUrl: "",
    liveUrl: "",
    status: "Ongoing",
    date: "2026",
    type: "Team",
    featured: true,
    summary:
      "A team-based skincare product focused on user readings, insights, and progress tracking.",
    whatItIs:
      "Morphace is a collaborative product project centered on helping users engage with skincare-related insights and health-oriented data through a more polished, user-friendly experience.",
    whyBuilt:
      "This project gave me the opportunity to contribute to a more product-oriented application, where the focus was not just technical functionality but also user experience, structure, and how features fit into a larger product vision.",
    features: [
      "User-facing skincare insights and reading history",
      "Frontend UI work in SwiftUI",
      "Backend/API support for product functionality",
      "Team-based collaboration across design and implementation",
    ],
    reflection:
      "Morphace has been valuable because it feels closer to real product development than a purely solo side project. It helped me build experience contributing within an existing team and balancing technical work with product thinking.",
  },
  {
    id: "empty-room-viewer",
    slug: "empty-room-viewer",
    title: "Empty Room Viewer",
    hook: "A tool for finding free classrooms on campus.",
    description:
      "A practical student tool that scrapes timetable data and turns it into a searchable interface for finding available rooms.",
    stack: ["React", "TypeScript", "Playwright", "Node.js"],
    image: "/projects/empty-room-viewer.png",
    repoUrl: "",
    liveUrl: "",
    status: "Ongoing",
    date: "2026",
    type: "Practical",
    featured: true,
    summary:
      "A campus utility for finding empty classrooms based on building and time filters.",
    whatItIs:
      "The Empty Room Viewer is a practical student tool that processes timetable and room data into a searchable interface, helping users quickly find free classrooms on campus.",
    whyBuilt:
      "This project came from a real student need: finding study or work space on campus without guessing which rooms might be empty. I wanted to turn timetable data into something actually useful day-to-day.",
    features: [
      "Scraping and processing timetable-related room data",
      "Frontend filtering for practical room lookup",
      "Simple interface focused on speed and usability",
      "Built around a real campus workflow",
    ],
    reflection:
      "This project reinforced how useful simple tools can be when they solve an obvious everyday problem. It also gave me a good mix of scraping, data transformation, and practical frontend UX work.",
  },
];