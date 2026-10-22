const email = "zaidmseta@gmail.com";

export const site = {
  name: "Zaid Seta",
  // Canonical origin for link previews, the sitemap, and robots.txt
  url: "https://zaidseta.com",
  location: "Hamilton, ON",
  email,

  // Hero status line and "now" panel; update these as things change
  status: "Open to Winter 2027 SWE co-op",
  availability: "Looking for a Winter 2027 software co-op, any term length.",
  timeZone: "America/Toronto",
  building: "MacTrack's unified degree planner",
  studying: "Computer Science (Co-op), McMaster '28",

  nav: [
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Experience", to: "/experience" },
    { label: "Resume", to: "/resume" },
  ],

  links: {
    github: "https://github.com/ZaidMSeta",
    linkedin: "https://www.linkedin.com/in/zaidseta",
    email: `mailto:${email}`,
  },

  repo: "https://github.com/ZaidMSeta/portfolio",
  resume: "/resume.pdf",
};
