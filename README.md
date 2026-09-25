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

- **Home** — hero, featured projects, experience snapshot, and a bento grid with live GitHub activity
- **About** — bio and interest cards (chess stats, current read, etc.)
- **Projects** — full project grid with individual detail pages
- **Experience** — work history
- **Resume** — embedded PDF viewer with download

## Live Integrations

- **GitHub API** — recent commits with diff stats (fetched live, client-side)
- **Chess.com API** — current Elo and latest game (fetched live, client-side)
- **Chess rating history** — committed JSON, regenerated via script (see below)
- **Hardcover** — current and last finished book (committed JSON, via script)
- **Trakt + TMDB** — watchlist and recently watched (committed JSON, via script)

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
| `npm run lint` | Run ESLint |

## Deployment

Deployed on Vercel. `vercel.json` adds an SPA rewrite so client-side routes
(`/projects/mactrack`, etc.) resolve on direct load and refresh instead of 404ing.

`vite.config.js` injects `__COMMIT_SHA__` and `__BUILD_DATE__` at build time.
On Vercel the SHA comes from `VERCEL_GIT_COMMIT_SHA`; locally it falls back to
`git rev-parse`.
