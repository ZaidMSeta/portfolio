import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// RoomRadar's repo is public, so read its committed term data straight from GitHub
const REPO_RAW = "https://raw.githubusercontent.com/ZaidMSeta/mcmaster-room-schedule-scraper/main";
const OUTPUT_PATH = path.resolve("public/roomradar.json");

async function get(file) {
  const res = await fetch(`${REPO_RAW}/${file}`);
  if (!res.ok) throw new Error(`Fetching ${file} failed: ${res.status}`);
  return res.text();
}

// Days the timetable lists classes that don't run (recess, holidays), from RoomRadar's calendar
function parseNoClassDays(source) {
  const ranges = [];
  for (const match of source.matchAll(/from:\s*"([\d-]+)",\s*to:\s*"([\d-]+)",\s*kind:\s*"no-classes"/g)) {
    ranges.push([match[1], match[2]]);
  }
  return ranges;
}

async function main() {
  const [roomsText, calendarSource] = await Promise.all([
    get("src/data/rooms.json"),
    get("src/app/lib/rooms/calendar.ts"),
  ]);
  const data = JSON.parse(roomsText);

  // Only what "free right now" needs: no course labels or room details.
  // Each meeting is [day (1=Sun..7=Sat), startMin, endMin, startDate?, endDate?]
  const compact = {
    termName: data.termName,
    termStart: data.termStart,
    termEnd: data.termEnd,
    scrapedAt: data.scrapedAt,
    noClasses: parseNoClassDays(calendarSource),
    buildings: Object.fromEntries(data.buildings.map((building) => [building.code, building.name])),
    rooms: data.rooms.map((room) => [
      room.buildingCode,
      room.meetings.map((meeting) => {
        const row = [meeting.day, meeting.start, meeting.end];
        if (meeting.startDate || meeting.endDate) row.push(meeting.startDate ?? null, meeting.endDate ?? null);
        return row;
      }),
    ]),
  };

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(compact) + "\n");

  const meetings = compact.rooms.reduce((sum, [, list]) => sum + list.length, 0);
  console.log(
    `Wrote ${compact.rooms.length} rooms, ${meetings} meetings (${compact.termName}) to ${OUTPUT_PATH}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
