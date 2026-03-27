import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const CHESS_USERNAME = "zaidseta";
const OUTPUT_PATH = path.resolve("src/data/chessRatingHistory.json");
const LOOKBACK_YEARS = 2;
const STEP_DAYS = 14;

function toDateOnlyString(date) {
  return date.toISOString().slice(0, 10);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function subtractYears(date, years) {
  const copy = new Date(date);
  copy.setFullYear(copy.getFullYear() - years);
  return copy;
}

function getMyPlayer(game) {
  const username = CHESS_USERNAME.toLowerCase();
  const whiteUser = game.white?.username?.toLowerCase();
  const blackUser = game.black?.username?.toLowerCase();

  if (whiteUser === username) return game.white;
  if (blackUser === username) return game.black;
  return null;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "portfolio-chess-history/1.0 (username: zaidseta)",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed ${url}: ${res.status}`);
  }

  return res.json();
}

async function getArchiveUrls() {
  const url = `https://api.chess.com/pub/player/${encodeURIComponent(CHESS_USERNAME)}/games/archives`;
  const data = await fetchJson(url);
  return Array.isArray(data.archives) ? data.archives : [];
}

async function getGamesFromArchive(url) {
  const data = await fetchJson(url);
  return Array.isArray(data.games) ? data.games : [];
}

function buildBiweeklySeries(games) {
  const cutoff = startOfDay(subtractYears(new Date(), LOOKBACK_YEARS));

  const rapidGames = games
    .filter((game) => game.time_class === "rapid" && typeof game.end_time === "number")
    .map((game) => {
      const me = getMyPlayer(game);
      if (!me || typeof me.rating !== "number") return null;

      return {
        endTimeMs: game.end_time * 1000,
        date: new Date(game.end_time * 1000),
        rating: me.rating,
      };
    })
    .filter(Boolean)
    .filter((game) => startOfDay(game.date) >= cutoff)
    .sort((a, b) => a.endTimeMs - b.endTimeMs);

  if (rapidGames.length === 0) {
    return [];
  }

  const series = [];
  let cursor = startOfDay(cutoff);
  const endDate = startOfDay(new Date());

  while (cursor <= endDate) {
    let latestAtOrBefore = null;

    for (const game of rapidGames) {
      if (startOfDay(game.date) <= cursor) {
        latestAtOrBefore = game;
      } else {
        break;
      }
    }

    if (latestAtOrBefore) {
      const lastPoint = series[series.length - 1];
      if (!lastPoint || lastPoint.rating !== latestAtOrBefore.rating) {
        series.push({
          date: toDateOnlyString(cursor),
          rating: latestAtOrBefore.rating,
        });
      }
    }

    cursor = addDays(cursor, STEP_DAYS);
  }

  const newestGame = rapidGames[rapidGames.length - 1];
  if (newestGame) {
    const lastSeriesPoint = series[series.length - 1];
    const newestDate = toDateOnlyString(startOfDay(newestGame.date));

    if (
      !lastSeriesPoint ||
      lastSeriesPoint.date !== newestDate ||
      lastSeriesPoint.rating !== newestGame.rating
    ) {
      series.push({
        date: newestDate,
        rating: newestGame.rating,
      });
    }
  }

  return series;
}

async function main() {
  console.log(`Fetching archive list for ${CHESS_USERNAME}...`);
  const archiveUrls = await getArchiveUrls();

  const cutoff = subtractYears(new Date(), LOOKBACK_YEARS);

  const recentArchiveUrls = archiveUrls.filter((url) => {
    const match = url.match(/\/(\d{4})\/(\d{2})$/);
    if (!match) return false;

    const year = Number(match[1]);
    const month = Number(match[2]);
    const archiveDate = new Date(year, month - 1, 1);

    return archiveDate >= new Date(cutoff.getFullYear(), cutoff.getMonth(), 1);
  });

  console.log(`Found ${recentArchiveUrls.length} monthly archives to scan.`);

  const allGames = [];
  for (const url of recentArchiveUrls) {
    console.log(`Fetching ${url}`);
    const games = await getGamesFromArchive(url);
    allGames.push(...games);
  }

  const series = buildBiweeklySeries(allGames);

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(series, null, 2), "utf8");

  console.log(`Wrote ${series.length} rating points to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});