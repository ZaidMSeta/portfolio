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
    start: "2026-02",
    end: "Present",
    description: [
      "Worked on a skin-health app across backend, API, and frontend features, with a focus on data handling and user-facing functionality.",
      "Built and improved features related to sensor readings, insights, and personalized health tracking.",
      "Collaborated with teammates across product and engineering to improve both usability and implementation quality.",
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
      "Consistently met sales and service targets in a fast-paced retail environment.",
      "Handled high customer volume while maintaining strong communication and professionalism.",
      "Resolved customer issues efficiently and helped create a smooth customer experience.",
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
      "Organized and supervised STEM-themed activities that encouraged curiosity and interest in technology.",
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
      "Managed inventory restocking and helped maintain organized store layouts for efficient customer flow.",
      "Assisted customers with product questions and helped resolve issues during busy store hours.",
    ],
    showOnHome: false,
  },
];