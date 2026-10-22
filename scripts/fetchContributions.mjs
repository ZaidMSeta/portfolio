import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const GITHUB_USERNAME = "ZaidMSeta";
const OUTPUT_PATH = path.resolve("src/data/contributions.json");

// The public calendar fragment GitHub renders on profile pages; no token needed
async function fetchCalendarHtml() {
  const res = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  });

  if (!res.ok) throw new Error(`GitHub contributions fetch failed: ${res.status}`);
  return res.text();
}

function parseCalendar(html) {
  // Each day cell carries its date and a 0-4 intensity level
  const days = new Map();
  for (const match of html.matchAll(/<td[^>]*data-date="([\d-]+)"[^>]*id="([^"]+)"[^>]*data-level="(\d)"/g)) {
    const [, date, id, level] = match;
    days.set(id, { date, level: Number(level), count: 0 });
  }

  // Counts only appear in the screen-reader tooltip text, e.g. "3 contributions on May 2nd."
  for (const match of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>(\d+) contributions?/g)) {
    const [, id, count] = match;
    const day = days.get(id);
    if (day) day.count = Number(count);
  }

  return [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
}

async function main() {
  const days = parseCalendar(await fetchCalendarHtml());

  if (days.length === 0) {
    throw new Error("No contribution days found; GitHub's markup may have changed");
  }

  const total = days.reduce((sum, day) => sum + day.count, 0);

  await fs.writeFile(
    OUTPUT_PATH,
    JSON.stringify({ total, days, fetchedAt: new Date().toISOString() }, null, 2) + "\n",
  );

  console.log(`Wrote ${days.length} days (${total} contributions) to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
