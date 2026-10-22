// "Free right now" for RoomRadar's rooms, using the compact file scripts/fetchRoomRadar.mjs writes

// [day (1=Sun..7=Sat), startMin, endMin, startDate?, endDate?]; missing dates mean all term
type Meeting = [number, number, number, (string | null)?, (string | null)?];

export type RoomRadarData = {
  termName: string;
  termStart: string;
  termEnd: string;
  noClasses: [string, string][];
  buildings: Record<string, string>;
  rooms: [buildingCode: string, meetings: Meeting[]][];
};

export type FreeNow = {
  total: number;
  free: number;
  // Why every room is free, when it isn't simply a quiet moment
  reason: "classes" | "after-hours" | "no-classes" | "out-of-term";
  topBuilding: { name: string; free: number } | null;
};

const campusParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  weekday: "short",
  hourCycle: "h23",
});

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Class times are Toronto wall-clock times, whatever timezone the visitor is in
function campusNow(date = new Date()) {
  const p = Object.fromEntries(campusParts.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    isoDate: `${p.year}-${p.month}-${p.day}`,
    minutes: Number(p.hour) * 60 + Number(p.minute),
    exportDay: WEEKDAYS.indexOf(p.weekday) + 1,
  };
}

export function freeRightNow(data: RoomRadarData, date = new Date()): FreeNow {
  const { isoDate, minutes, exportDay } = campusNow(date);
  const total = data.rooms.length;

  const outOfTerm = isoDate < data.termStart || isoDate > data.termEnd;
  const noClasses = data.noClasses.some(([from, to]) => isoDate >= from && isoDate <= to);
  if (outOfTerm || noClasses) {
    return { total, free: total, reason: outOfTerm ? "out-of-term" : "no-classes", topBuilding: null };
  }

  const freeByBuilding = new Map<string, number>();
  let free = 0;
  let anyClassToday = false;

  for (const [building, meetings] of data.rooms) {
    const today = meetings.filter(
      ([day, , , startDate, endDate]) =>
        day === exportDay && isoDate >= (startDate ?? data.termStart) && isoDate <= (endDate ?? data.termEnd),
    );
    if (today.length > 0) anyClassToday = true;

    const busy = today.some(([, start, end]) => minutes >= start && minutes < end);
    if (!busy) {
      free += 1;
      freeByBuilding.set(building, (freeByBuilding.get(building) ?? 0) + 1);
    }
  }

  // Every room free on a class day means the day's classes haven't started or are over
  const reason = free === total ? (anyClassToday ? "after-hours" : "no-classes") : "classes";

  let topBuilding: FreeNow["topBuilding"] = null;
  if (reason === "classes") {
    for (const [code, count] of freeByBuilding) {
      if (!topBuilding || count > topBuilding.free) topBuilding = { name: data.buildings[code] ?? code, free: count };
    }
  }

  return { total, free, reason, topBuilding };
}
