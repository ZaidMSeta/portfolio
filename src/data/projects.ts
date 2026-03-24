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
  };
  
  export const projects: Project[] = [
    {
      id: "mactrack",
      slug: "mactrack",
      title: "MacTrack",
      hook: "A course planning platform for McMaster students.",
      description:
        "MacTrack is a full-stack web app for browsing courses, planning degree progress, and tracking useful academic information in one place. It includes course data, reviews, professor information, and planning tools designed around the student experience.",
      stack: ["React", "TypeScript", "Go", "SQLite"],
      image: "/projects/mactrack.png",
      repoUrl: "https://github.com/hasan-ston/mactrack",
      liveUrl: "mac-track.com",
      status: "Ongoing",
      date: "2026",
      type: "Practical",
      featured: true,
    },
    {
      id: "morphace",
      slug: "morphace",
      title: "Morphace",
      hook: "A skincare-focused app with reading history, insights, and user-facing health tracking.",
      description:
        "Morphace is a team-based project involving product UI work and backend/API contributions. The platform focuses on helping users understand and track skincare-related information through readings, insights, and visualized progress.",
      stack: ["SwiftUI", "FastAPI", "Python", "PostgreSQL"],
      image: "/projects/morphace.png",
      repoUrl: "",
      liveUrl: "",
      status: "Ongoing",
      date: "2026",
      type: "Team",
      featured: true,
    },
    {
      id: "empty-room-viewer",
      slug: "empty-room-viewer",
      title: "Empty Room Viewer",
      hook: "A tool for finding free classrooms on campus based on time and building filters.",
      description:
        "The Empty Room Viewer helps students quickly find available rooms by scraping timetable data and transforming it into a searchable interface. The project combines data extraction, processing, and frontend filtering into a simple practical tool.",
      stack: ["React", "TypeScript", "Playwright", "Node.js"],
      image: "/projects/empty-room-viewer.png",
      repoUrl: "https://github.com/ZaidMSeta/mcmaster-room-schedule-scraper",
      liveUrl: "https://mcmaster-room-schedule-scraper.vercel.app/",
      status: "Ongoing",
      date: "2026",
      type: "Practical",
      featured: true,
    },
  ];