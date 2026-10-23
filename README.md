# Portfolio

Personal portfolio site built with React, TypeScript, and Tailwind CSS.

## Stack

- **React 19** + **TypeScript**
- **React Router 7** for client-side routing
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Vite** as build tool
- Light/dark theme toggle via CSS variables (`useTheme`)

## Pages

- **Home** — hero, featured projects, experience snapshot, a bento grid (live GitHub activity, contribution graph, local time, an "off the clock" tile), and a contact block
- **About** — bio and interest cards (chess stats, current read, etc.)
- **Projects** — full project grid with individual detail pages
- **Experience** — work history
- **Resume** — download or open the PDF

## Live Integrations

- **GitHub API** — recent commits with diff stats (fetched live, client-side)
- **Chess.com API** — current Elo and latest game (fetched live, client-side)
- **Chess rating history** — committed JSON, regenerated via script (see below)
- **Hardcover** — current and last finished book (committed JSON, via script)
- **Trakt + TMDB** — watchlist and recently watched (committed JSON, via script)
- **GitHub contributions** — last year's contribution calendar (committed JSON, via script)
- **RoomRadar** — free rooms on campus right now, computed in the browser from `public/roomradar.json` (pulled from the RoomRadar repo once a term via script)

The script-generated files under `src/data/` are committed, so the site builds
and deploys without any secrets. Re-run the fetch scripts to refresh them.

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

3. Refresh the script-generated data (each needs its token in `.env`):

   ```bash
   npm run fetch:hardcover
   npm run fetch:trakt
   npm run fetch:chess
   npm run fetch:github
   npm run fetch:rooms
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run fetch:hardcover` | Fetch reading data from Hardcover API |
| `npm run fetch:trakt` | Fetch watchlist and history from Trakt + TMDB |
| `npm run fetch:chess` | Regenerate the Chess.com Elo rating history |
| `npm run fetch:github` | Fetch the GitHub contribution calendar (no token needed) |
| `npm run fetch:rooms` | Pull RoomRadar's term schedule for the live free-rooms tile (no token needed) |
| `npm run lint` | Run ESLint |

## Link previews and SEO

At build time `scripts/seoPages.mjs` writes a copy of `index.html` for every route
(`about.html`, `projects/mactrack.html`, ...) with its own title, description, and
preview image, plus `sitemap.xml` and `robots.txt`. Crawlers that don't run
JavaScript (LinkedIn, iMessage, Slack) read those tags. The site origin lives in
`site.url`. Preview cards are in `public/og/`; `scripts/ogCards.mjs` regenerates
their HTML templates for screenshotting.

## Deployment

Deployed on Vercel. Every route has its own prerendered HTML file, and
`vercel.json` turns on `cleanUrls` so `/projects/mactrack` serves
`projects/mactrack.html`. There is no catch-all rewrite: unknown paths fall
through to `404.html`, which boots the app and shows the not-found page with a
real 404 status. New routes need an entry in `scripts/seoPages.mjs`.

`vite.config.js` injects `__COMMIT_SHA__` and `__BUILD_DATE__` at build time.
On Vercel the SHA comes from `VERCEL_GIT_COMMIT_SHA`; locally it falls back to
`git rev-parse`.
