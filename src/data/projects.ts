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
    hook: "A full-stack course planning platform for McMaster students, with degree planning, seat tracking, and professor reviews.",
    description:
      "A student-focused web app for browsing courses, planning degree progress, and tracking useful academic information in one place.",
    stack: ["React", "TypeScript", "Go", "PostgreSQL"],
    image: "/projects/mactrack.png",
    repoUrl: "https://github.com/hasan-ston/mactrack",
    liveUrl: "",
    status: "Ongoing",
    date: "2026",
    featured: true,
    summary:
      "A practical platform that helps McMaster students browse courses, organize degree plans, and track academic information more easily.",
    whatItIs:
      "MacTrack is a full-stack academic planning platform designed for McMaster students. It brings together course discovery, degree planning, seat tracking, professor information, and reviews into one interface.",
    whyBuilt:
      "I wanted to work on a product that solved a real student problem. Planning courses and understanding degree requirements is often fragmented, so MacTrack was built to make that experience more centralized and easier to use.",
    features: [
      "Course browsing with descriptions and prerequisite information",
      "Degree planning and term organization tools",
      "Seat tracking and academic status updates",
      "Professor information and review-related features",
    ],
    reflection:
      "MacTrack has been one of my strongest experiences in building practical full-stack software. It pushed me to think more carefully about structure, usability, and how to design around real student workflows instead of just isolated features.",
  },
  {
    id: "empty-room-viewer",
    slug: "empty-room-viewer",
    title: "Empty Room Viewer",
    hook: "A tool for finding available classrooms on campus in real time.",
    description:
      "A student tool that scrapes timetable data and turns it into a searchable interface for finding free rooms on campus.",
    stack: ["React", "TypeScript", "Playwright", "Node.js"],
    image: "/projects/empty-room-viewer.png",
    repoUrl: "",
    liveUrl: "",
    status: "Ongoing",
    date: "2026",
    featured: true,
    summary:
      "A campus utility for finding empty classrooms using building, day, and time-based filters.",
    whatItIs:
      "Empty Room Viewer is a practical campus tool that processes timetable and room data into a searchable interface, helping users quickly find available classrooms.",
    whyBuilt:
      "This project came from a simple student need: finding a place to study or work on campus without guessing which rooms might be empty. I wanted to turn timetable data into something genuinely useful day to day.",
    features: [
      "Scraping and processing timetable-related room data",
      "Room availability filtering by building, day, and time",
      "A simple interface focused on speed and usability",
      "Built around a real campus workflow",
    ],
    reflection:
      "This project reinforced how valuable simple tools can be when they solve an obvious everyday problem. It also gave me experience with scraping, data transformation, and designing a frontend around fast, practical queries.",
  },
];