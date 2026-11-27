# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: co-op recruiters and hiring engineers** evaluating Zaid Seta for a Winter or Summer 2027 software co-op (any term length). They usually arrive from a resume, LinkedIn, or an application link and decide quickly whether to look deeper.
- **Secondary: peers.** Classmates and other developers who find the site through GitHub or the McMaster webring.

## Product Purpose

Personal portfolio for Zaid Seta, a Computer Science (Co-op) student at McMaster University ('28) in Hamilton, ON. It presents projects, work experience, and a resume, and gives a sense of who Zaid is outside of work. Success means a recruiter or engineer understands what Zaid has built and reaches out or keeps reading.

## Positioning

Undecided. The user hasn't chosen what the site should claim that another CS student's portfolio couldn't. Don't invent a positioning line; ask when a surface needs one.

## Operating Context

- Visitors usually scan the home page first, then open a project case study or the resume.
- Framing leans software engineering over "web developer".
- Several tiles show live or regularly refreshed data: GitHub activity and contribution calendar, Chess.com rating, Hardcover books, Trakt watch history, RoomRadar free rooms, and Hamilton local time. A daily GitHub Action refreshes the committed data files.

## Capabilities and Constraints

- Stack: React 19, TypeScript, React Router 7, Tailwind CSS 4, Recharts, Vite. Deployed on Vercel at zaidseta.com (www and the old zaid-seta-portfolio.vercel.app address 308-redirect to it).
- Pages: Home, About, Projects, project case studies (MacTrack, RoomRadar, MHUSC Field Scheduler, Ressam Gardens, CMTA Event Automation Tool), Experience, Resume, 404.
- Light and dark themes, plus following the system theme.
- Build-time data lives in `src/data/`; the site must build without secrets.

## Brand Commitments

- Name: Zaid Seta. Wordmark: "zaid.seta".
- Voice: plain and direct, first person. Avoid copy that sounds AI-written: no tricolons, aphorisms, or status pills.
- Present the work as Zaid's own; don't highlight AI-assisted workflows.
- Keep the personality: the interest tiles (chess, books, watching, gym, map) and the small easter eggs.
- Projects and Experience pages have no subheading. Don't add one.
- The hero line reads "Computer Science student at McMaster University."

## Evidence on Hand

- Projects with case studies: MacTrack (private repo, no code link), RoomRadar, MHUSC Field Scheduler, Ressam Gardens (in progress; no live link until the new site launches), CMTA Event Automation Tool. Data in `src/data/projects.ts` and `src/data/caseStudies.ts`.
- Experience: Ressam Gardens, Mount Hamilton United SC, Canadian Motorcycle Tourism Association, Morphace Skincare, plus earlier roles. Data in `src/data/experience.ts`.
- Resume: `public/Zaid_Seta_Resume.pdf` (built from the career-ops repo; `/resume.pdf` redirects to it).
- Missing for now: logos for Ressam Gardens, MHUSC, and CMTA (initials fallback); screenshots for Ressam, CMTA, MHUSC, and a fresh RoomRadar screenshot.
- Don't add: client testimonials, awards, volunteer or MSA roles, a photo of Zaid, or invented metrics.

## Product Principles

1. Get a recruiter to the work quickly: projects and experience come before decoration.
2. Prefer real, current data over claims. Live tiles and shipped projects carry the case.
3. Write the way Zaid talks. Plain wording beats polish.
4. Leave room for personality, but don't let it crowd out the engineering.

## Accessibility & Inclusion

WCAG 2.2 AA: sufficient contrast in both themes, full keyboard navigation, and motion that honors `prefers-reduced-motion`.
