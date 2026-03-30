# Portfolio

Personal portfolio site built with React, TypeScript, and Tailwind CSS.

## Stack

- **React 19** + **TypeScript**
- **React Router 7** for client-side routing
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Vite** as build tool

## Pages

- **Home** — hero, featured projects, experience snapshot, and a bento grid with live GitHub activity
- **About** — bio and interest cards (chess stats, current read, etc.)
- **Projects** — full project grid with individual detail pages
- **Experience** — work history
- **Resume** — embedded PDF viewer with download

## Live Integrations

- **Chess.com API** — real-time Elo rating and game history
- **GitHub API** — recent commits and contribution stats
- **Hardcover** — current and last finished book (fetched via script, see below)

## Getting Started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

3. Fetch Hardcover reading data (requires `HARDCOVER_API_TOKEN` in `.env`):

   ```bash
   npm run fetch:hardcover
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
