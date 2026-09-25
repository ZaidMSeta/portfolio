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
    id: "ressam-gardens",
    title: "Web Developer",
    company: "Ressam Gardens",
    logo: "/logos/ressam-gardens.png",
    location: "Hamilton, ON",
    start: "2026-06",
    end: "Present",
    description: [
      "Designed and built a 10-page site for a memory care community, shipped through 15 rounds of client review.",
      "Run weekly client meetings, translating non-technical feedback into scoped build plans and verifying each release across mobile, tablet, and desktop.",
      "Wrote verification scripts that enforce byte-identical navigation and footers across every page, catching regressions before they reach the client.",
    ],
    showOnHome: true,
  },
  {
    id: "mount-hamilton-united",
    title: "Administration Assistant",
    company: "Mount Hamilton United SC",
    logo: "/logos/mhusc.png",
    location: "Hamilton, ON",
    start: "2026-05",
    end: "2026-08",
    description: [
      "Automated league schedule entry with a Playwright and TypeScript driver against the club's registration platform, entering and auditing 400+ events previously booked by hand.",
      "Built an inventory tracking system with a transaction log and formula-based views that keep per-colour and per-size stock current as gear goes out and comes back.",
      "Built a Power Automate flow that files volunteer document scans into SharePoint and updates a compliance tracker without manual entry.",
      "Ran recurring compliance campaigns for 50+ coaches and 75+ volunteers using scripted mail merges with per-recipient conditional attachments.",
    ],
    showOnHome: true,
  },
  {
    id: "cmta",
    title: "Software Developer",
    company: "Canadian Motorcycle Tourism Association",
    logo: "/logos/cmta.png",
    location: "Remote",
    start: "2026-03",
    end: "2026-04",
    description: [
      "Built an event promotion automation tool in React, Vite, and TypeScript, deployed on Vercel, replacing a manual cross-platform social posting workflow.",
      "Integrated the Google Gemini API for structured event extraction from posters and platform-specific caption generation.",
      "Wrote a serverless proxy to work around CORS on the OnlySocial publishing API.",
    ],
    showOnHome: true,
  },
  {
    id: "morphace",
    title: "Software Developer",
    company: "Morphace Skincare",
    logo: "/logos/morphace.png",
    location: "Remote",
    start: "2026-02",
    end: "2026-04",
    description: [
      "Built FastAPI and PostgreSQL endpoints for sensor data storage, calibration logic, and user-specific data retrieval.",
      "Shipped the reminders feature end to end: authored the technical proposal, chose the notification architecture, and built the working Swift implementation using iOS local notifications and on-device persistence.",
      "Wrote pytest suites against the API endpoints to validate data flows ahead of feature releases.",
    ],
    showOnHome: true,
  },
  {
    id: "bell-canada",
    title: "Store Associate",
    company: "Bell Canada",
    logo: "/logos/bell.png",
    location: "Hamilton, ON",
    start: "2025-05",
    end: "2025-12",
    description: [
      "Ranked top 5% in Ontario for percent-to-target sales across activations, bundles, and accessories.",
      "Completed activations and renewals with zero non-compliant transactions.",
    ],
    showOnHome: false,
  },
  {
    id: "focus-on-youth",
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
    id: "krazy-binz",
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
