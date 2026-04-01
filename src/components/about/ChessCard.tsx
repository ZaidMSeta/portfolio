import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchChessCardData, type ChessCardData } from "../../lib/utils/chessActivity";
import { ChessKnight } from "lucide-react";

function formatChartDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload || !payload.length || !label) return null;

  return (
    <div className="rounded-lg border border-fg/10 bg-bg/95 px-3 py-2 shadow-lg backdrop-blur">
      <p className="text-xs text-fg/45">{formatChartDate(label)}</p>
      <p className="mt-1 text-sm text-fg">
        Elo: <span className="text-accent">{payload[0].value}</span>
      </p>
    </div>
  );
}

export function ChessCard() {
  const [data, setData] = useState<ChessCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(false);
        const result = await fetchChessCardData();
        if (!ignore) setData(result);
      } catch (err) {
        console.error(err);
        if (!ignore) setError(true);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const chartData = useMemo(() => {
    return data?.ratingHistory ?? [];
  }, [data]);

  return (
    <article className="rounded-xl border border-fg/10 bg-fg/5 p-5 transition hover:border-fg/20">
      <div className="mb-5 flex items-center gap-2">
        <ChessKnight size={14} className="text-accent" />
        <h3 className="text-sm font-medium text-fg">Chess</h3>
      </div>

      <div className="mb-5 rounded-lg border border-fg/10 bg-fg/[0.03] p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-fg/70">Rating over time</p>
          <div className="text-right">
            <p className="text-xs text-fg/45">
              Peak: {loading ? "..." : data?.peakRating ?? "N/A"}
            </p>
            <p className="text-xs text-fg/45">
              Current: {loading ? "..." : data?.rapidRating ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="h-32 min-w-0 overflow-hidden rounded-md bg-fg/[0.02]">
          {loading ? (
            <div className="h-full w-full animate-pulse bg-fg/5" />
          ) : (
            <ResponsiveContainer width="100%" height={128}>
              <AreaChart data={chartData} margin={{ top: 10, right: 6, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="chessEloFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-fill-from)" />
                    <stop offset="100%" stopColor="var(--chart-fill-to)" />
                  </linearGradient>
                </defs>

                <XAxis dataKey="date" hide />
                <YAxis hide domain={["dataMin - 25", "dataMax + 25"]} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "var(--chart-cursor)", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke="var(--chart-stroke)"
                  strokeWidth={2}
                  fill="url(#chessEloFill)"
                  dot={{ r: 2, strokeWidth: 0, fill: "var(--chart-stroke)" }}
                  activeDot={{ r: 4, strokeWidth: 0, fill: "var(--color-accent)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-3">
          <p className="mb-1 text-xs text-fg/45">Openings as White</p>
          <p className="text-sm text-fg">Vienna Gambit</p>
          <p className="text-sm text-fg">Vienna Game</p>
        </div>

        <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-3">
          <p className="mb-1 text-xs text-fg/45">Openings as Black</p>
          <p className="text-sm text-fg">Caro-Kann</p>
          <p className="text-sm text-fg">King&apos;s Indian</p>
        </div>
      </div>

      <div className="rounded-lg border border-fg/10 bg-fg/[0.03] p-3">
        <p className="mb-1 text-xs text-fg/45">Last Game</p>

        {loading && <p className="text-sm text-fg/60">Loading...</p>}

        {!loading && error && (
          <p className="text-sm text-fg/60">Couldn't load chess data.</p>
        )}

        {!loading && !error && data?.lastGame && (
          <>
            <p className="text-sm text-fg">
              {data.lastGame.resultText} vs. {data.lastGame.opponent}
            </p>
            <p className="text-xs text-fg/50">
              {data.lastGame.timeClass} · {data.lastGame.endTimeLabel}
              {data.lastGame.ratingDelta !== null
                ? ` · ${data.lastGame.ratingDelta > 0 ? "+" : ""}${data.lastGame.ratingDelta}`
                : ""}
            </p>
          </>
        )}

        {!loading && !error && !data?.lastGame && (
          <p className="text-sm text-fg/60">No recent rapid game found.</p>
        )}
      </div>
    </article>
  );
}
