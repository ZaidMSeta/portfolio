const email = "zaidmseta@gmail.com";

export const site = {
  name: "Zaid Seta",
  location: "Hamilton, ON",
  email,

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
