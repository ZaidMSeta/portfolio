export type Project = {
  id: string;
  slug: string;
  title: string;
  hook: string;
  description: string;
  stack: string[];
  image: string;
  images?: string[];
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
    id: "ressam-gardens",
    slug: "ressam-gardens",
    title: "Ressam Gardens",
    hook: "A 10-page site for a Hamilton memory care community, shipped through 15 rounds of client review.",
    description:
      "A full rebuild of the web presence for a memory care and dementia community, built around helping families book a tour.",
    stack: ["React", "TypeScript", "Tailwind", "Vercel"],
    image: "/projects/ressam-gardens.png",
    repoUrl: "",
    liveUrl: "https://ressamgardens.ca",
    status: "Ongoing",
    date: "2026",
    featured: true,
    summary:
      "A client site for a memory care community, designed around the adult children researching care for a parent.",
    whatItIs:
      "Ressam Gardens is a memory care and dementia community in Hamilton. I rebuilt their site from the ground up: ten pages covering the community, care model, and admissions, with tour booking as the main conversion path.",
    whyBuilt:
      "Their previous site was slow and visually dated, and the people it needed to reach were families making a hard decision under stress. The rebuild was about making the place feel trustworthy and making it easy to take the next step.",
    features: [
      "Ten-page site covering the community, care approach, and admissions",
      "Tour booking as the primary conversion path",
      "Verification scripts enforcing byte-identical navigation and footers across every page",
      "Verified each release across mobile, tablet, and desktop",
    ],
    reflection:
      "This was my first sustained client relationship rather than a one-off build. Fifteen rounds of review taught me more about scoping and translating vague feedback into concrete work than any amount of solo building would have.",
  },
  {
    id: "cmta-event-tool",
    slug: "cmta-event-tool",
    title: "CMTA Event Automation Tool",
    hook: "Turns event posters into platform-ready social posts, replacing a manual cross-platform workflow.",
    description:
      "An internal tool that extracts structured event data from posters and generates platform-specific captions for publishing.",
    stack: ["React", "TypeScript", "Vite", "Gemini API", "Vercel"],
    image: "/projects/cmta.png",
    repoUrl: "",
    liveUrl: "",
    status: "Complete",
    date: "2026",
    featured: false,
    summary:
      "An event promotion pipeline for a nonprofit, built to replace hours of manual copying between platforms.",
    whatItIs:
      "A tool built for the Canadian Motorcycle Tourism Association that takes an event poster, pulls the structured event details out of it, and generates captions tailored to each social platform, ready for review and publishing.",
    whyBuilt:
      "Their founder was finding posters online, reading them by hand, rewriting the details into posts for each platform, and then entering the same information again into the website. The same work was being done three or four times.",
    features: [
      "Poster upload with structured event extraction via the Google Gemini API",
      "Platform-specific caption generation",
      "Human approval step before anything publishes",
      "Serverless proxy to work around CORS on the OnlySocial publishing API",
    ],
    reflection:
      "The interesting problem here was not the AI extraction, it was designing around a person who needed to stay in control of what went out. The approval step mattered more to adoption than any of the automation behind it.",
  },
  {
    id: "mactrack",
    slug: "mactrack",
    title: "MacTrack",
    hook: "A full-stack course planning and seat-tracking platform used by 200+ McMaster students.",
    description:
      "A student-focused web app for browsing courses, planning degree progress, and tracking useful academic information in one place.",
    stack: ["React", "TypeScript", "Go", "PostgreSQL", "Python"],
    image: "/projects/mactrack.png",
    repoUrl: "https://github.com/hasan-ston/mactrack",
    liveUrl: "https://mac-track.com",
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
      "Go backend services for course monitoring and notification logic that suppresses redundant alerts",
      "Python scraper feeding live course and seat data",
      "Professor information and review-related features",
    ],
    reflection:
      "MacTrack has been one of my strongest experiences in building practical full-stack software. Built with a team of four, it pushed me to think more carefully about structure, usability, and how to design around real student workflows instead of just isolated features. I'm currently migrating the dashboard and degree planner into a single view using a strangler-fig pattern, and running Dependabot security sweeps across the Go, Python, and frontend dependencies.",
  },
  {
    id: "empty-classroom-viewer",
    slug: "empty-classroom-viewer",
    title: "Empty Classroom Viewer",
    hook: "A tool for finding available classrooms on campus in real time.",
    description:
      "A student tool that scrapes timetable data and turns it into a searchable interface for finding free rooms on campus.",
    stack: ["React", "TypeScript", "Playwright", "Node.js", "GitHub Actions"],
    image: "/projects/empty-room-viewer.png",
    repoUrl: "",
    liveUrl: "https://mcemptyroom.vercel.app",
    status: "Complete",
    date: "2026",
    featured: true,
    summary:
      "A campus utility for finding empty classrooms using building, day, and time-based filters.",
    whatItIs:
      "Empty Room Viewer is a practical campus tool that processes timetable and room data into a searchable interface, helping users quickly find available classrooms.",
    whyBuilt:
      "This project came from a simple student need: finding a place to study or work on campus without guessing which rooms might be empty. I wanted to turn timetable data into something genuinely useful day to day.",
    features: [
      "Automated Playwright script that scrapes university timetable data and transforms raw XML into room-centric availability JSON",
      "Normalized large timetable datasets into a queryable format supporting real-time filtering by building, day, and time",
      "Scheduled as a GitHub Actions cron job so room data refreshes without manual runs",
      "A simple interface focused on speed and usability",
    ],
    reflection:
      "This project reinforced how valuable simple tools can be when they solve an obvious everyday problem. It also gave me experience with scraping, data transformation, and designing a frontend around fast, practical queries.",
  },
];