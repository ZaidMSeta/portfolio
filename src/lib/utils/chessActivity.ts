const CHESS_USERNAME = "zaidseta";

export type ChessRatingPoint = {
  date: string;
  rating: number;
};

export type ChessLastGame = {
  resultText: string;
  opponent: string;
  timeClass: string;
  endTimeLabel: string;
  ratingDelta: number | null;
};

export type ChessCardData = {
  rapidRating: number | null;
  lastGame: ChessLastGame | null;
  ratingHistory: ChessRatingPoint[];
};

type ChessStatsResponse = {
  chess_rapid?: {
    last?: {
      rating?: number;
    };
  };
};

type ArchiveListResponse = {
  archives?: string[];
};

type MonthlyGamesResponse = {
  games?: ChessGame[];
};

type ChessGamePlayer = {
  username?: string;
  rating?: number;
  result?: string;
};

type ChessGame = {
  url?: string;
  end_time?: number;
  time_class?: string;
  white?: ChessGamePlayer;
  black?: ChessGamePlayer;
};

function formatRelativeTimeFromUnix(unixSeconds?: number): string {
  if (!unixSeconds) return "Recently";

  const now = Date.now();
  const then = unixSeconds * 1000;
  const diffMs = Math.max(0, now - then);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) {
    const mins = Math.max(1, Math.floor(diffMs / minute));
    return `${mins} min ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(diffMs / day);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getResultText(myResult?: string, oppResult?: string): string {
  if (myResult === "win") return "Won";
  if (oppResult === "win") return "Lost";

  if (
    myResult === "agreed" ||
    myResult === "repetition" ||
    myResult === "stalemate" ||
    myResult === "timevsinsufficient" ||
    myResult === "insufficient" ||
    myResult === "50move"
  ) {
    return "Drew";
  }

  return "Finished";
}

function extractLastRapidGame(games: ChessGame[]): ChessLastGame | null {
  const username = CHESS_USERNAME.toLowerCase();

  const rapidGames = games
    .filter((game) => game.time_class === "rapid")
    .sort((a, b) => (b.end_time ?? 0) - (a.end_time ?? 0));

  const latest = rapidGames[0];
  if (!latest) return null;

  const isWhite = latest.white?.username?.toLowerCase() === username;
  const me = isWhite ? latest.white : latest.black;
  const opp = isWhite ? latest.black : latest.white;

  const resultText = getResultText(me?.result, opp?.result);

  return {
    resultText,
    opponent: opp?.username || "Unknown opponent",
    timeClass: latest.time_class || "rapid",
    endTimeLabel: formatRelativeTimeFromUnix(latest.end_time),
    ratingDelta: null,
  };
}

async function fetchStats(): Promise<number | null> {
  const res = await fetch(
    `https://api.chess.com/pub/player/${encodeURIComponent(CHESS_USERNAME)}/stats`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch chess stats: ${res.status}`);
  }

  const data: ChessStatsResponse = await res.json();
  return data.chess_rapid?.last?.rating ?? null;
}

async function fetchLatestArchiveGames(): Promise<ChessGame[]> {
  const archivesRes = await fetch(
    `https://api.chess.com/pub/player/${encodeURIComponent(CHESS_USERNAME)}/games/archives`
  );

  if (!archivesRes.ok) {
    throw new Error(`Failed to fetch chess archives: ${archivesRes.status}`);
  }

  const archivesData: ArchiveListResponse = await archivesRes.json();
  const latestArchiveUrl = archivesData.archives?.[archivesData.archives.length - 1];

  if (!latestArchiveUrl) return [];

  const gamesRes = await fetch(latestArchiveUrl);

  if (!gamesRes.ok) {
    throw new Error(`Failed to fetch latest archive games: ${gamesRes.status}`);
  }

  const gamesData: MonthlyGamesResponse = await gamesRes.json();
  return gamesData.games ?? [];
}

const MANUAL_RATING_HISTORY: ChessRatingPoint[] = [
    { date: "2025-04-01", rating: 1212 },
    { date: "2025-05-01", rating: 1254 },
    { date: "2025-06-01", rating: 1308 },
    { date: "2025-07-01", rating: 1324 },
    { date: "2025-08-01", rating: 1324 },
    { date: "2025-09-01", rating: 1310 },
    { date: "2025-10-01", rating: 1299 },
    { date: "2025-11-01", rating: 1299 },
    { date: "2025-12-01", rating: 1342 },
    { date: "2026-01-01", rating: 1310 },
    { date: "2026-02-01", rating: 1385 },
    { date: "2026-03-01", rating: 1450 },
];

export async function fetchChessCardData(): Promise<ChessCardData> {
  const [rapidRating, games] = await Promise.all([
    fetchStats(),
    fetchLatestArchiveGames(),
  ]);

  const lastGame = extractLastRapidGame(games);

  const ratingHistory = [...MANUAL_RATING_HISTORY];

  if (
    rapidRating !== null &&
    (ratingHistory.length === 0 ||
      ratingHistory[ratingHistory.length - 1].rating !== rapidRating)
  ) {
    const today = new Date().toISOString().slice(0, 10);
    ratingHistory.push({ date: today, rating: rapidRating });
  }

  return {
    rapidRating,
    lastGame,
    ratingHistory,
  };
}