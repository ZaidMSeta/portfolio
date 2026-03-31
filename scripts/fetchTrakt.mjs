import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const OUTPUT_PATH = path.resolve("src/data/trakt.json");
const TRAKT_CLIENT_ID = process.env.TRAKT_CLIENT_ID;
const TRAKT_USERNAME = process.env.TRAKT_USERNAME;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TRAKT_CLIENT_ID || !TRAKT_USERNAME || !TMDB_API_KEY) {
  console.error("Missing TRAKT_CLIENT_ID, TRAKT_USERNAME, or TMDB_API_KEY");
  process.exit(1);
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

async function fetchTraktHistory() {
  const res = await fetch(
    `https://api.trakt.tv/users/${TRAKT_USERNAME}/history?limit=30&extended=full`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_CLIENT_ID,
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-fetch/1.0)",
      },
    }
  );

  if (!res.ok) throw new Error(`Trakt fetch failed: ${res.status}`);
  return res.json();
}

async function fetchTmdbPoster(tmdbId, type) {
  const endpoint = type === "movie" ? "movie" : "tv";
  const res = await fetch(
    `https://api.themoviedb.org/3/${endpoint}/${tmdbId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        accept: "application/json",
      },
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  return data.poster_path ? `${TMDB_IMAGE_BASE}${data.poster_path}` : null;
}

async function main() {
  const history = await fetchTraktHistory();

  // Deduplicate by title+type, keep most recent watch per item
  const seen = new Set();
  const unique = [];

  for (const entry of history) {
    const type = entry.type === "movie" ? "movie" : "show";
    const item = type === "movie" ? entry.movie : entry.show;
    const key = `${type}:${item.ids.tmdb}`;

    if (!seen.has(key) && item.ids.tmdb) {
      seen.add(key);
      unique.push({ type, item, watchedAt: entry.watched_at });
    }

    if (unique.length >= 5) break;
  }

  const items = await Promise.all(
    unique.map(async ({ type, item, watchedAt }) => {
      const posterUrl = await fetchTmdbPoster(item.ids.tmdb, type);
      return {
        title: item.title,
        year: item.year,
        type,
        posterUrl,
        watchedAt,
      };
    })
  );

  const output = { items, fetchedAt: new Date().toISOString() };
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf8");
  console.log(`Wrote ${items.length} items to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
