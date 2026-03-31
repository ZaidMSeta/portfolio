export type Experience = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  start: string;
  end: string;
  description: string[];
  showOnHome: boolean;
};

export const experiences: Experience[] = [
  {
    id: "morphace",
    title: "Software Developer",
    company: "Morphace",
    logo: "/logos/morphace.png",
    location: "Remote",
    start: "2026-03",
    end: "Present",
    description: [
      "Contributed to a team-based product involving frontend UI work and backend/API improvements.",
      "Worked on features related to reading history, insights, and user-facing health tracking.",
      "Collaborated across product and technical work to improve both usability and implementation.",
    ],
    showOnHome: true,
  },
  {
    id: "sales-associate-1",
    title: "Sales Associate",
    company: "Bell Canada",
    logo: "/logos/bell.png",
    location: "Hamilton, ON",
    start: "2025-05",
    end: "2025-12",
    description: [
      "Consistently met weekly sales and service targets in a fast-paced environment.",
      "Handled high customer volume while maintaining strong communication and professionalism.",
      "Resolved customer issues quickly, reducing escalations and improving satisfaction.",
    ],
    showOnHome: true,
  },
  {
    id: "camp-counsellor-1",
    title: "Camp Counsellor",
    company: "Focus on Youth",
    logo: "/logos/foy.png",
    location: "Hamilton, ON",
    start: "2023-06",
    end: "2023-08",
    description: [
      "Facilitated daily educational and recreational activities for 15+ youth, promoting teamwork and creativity.",
      "Organized and supervised STEM-themed activities, sparking interest in technology among campers.",
    ],
    showOnHome: false,
  },
  {
    id: "store-associate-1",
    title: "Store Associate",
    company: "Krazy Binz",
    logo: "/logos/krazy-binz.png",
    location: "Hamilton, ON",
    start: "2022-11",
    end: "2023-06",
    description: [
      "Managed inventory restocking and maintained organized store layouts for efficient customer navigation.",
      "Assisted customers with product inquiries, resolving issues to enhance shopping experiences.",
    ],
    showOnHome: false,
  },
];