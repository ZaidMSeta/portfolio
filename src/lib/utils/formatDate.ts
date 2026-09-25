const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-06" -> "Jun 2026"; passes "Present" through
export function formatYM(ym: string) {
  if (!ym) return "";
  if (ym === "Present") return "Present";

  const [year, month] = ym.split("-");
  return `${MONTHS[Number(month) - 1] ?? month} ${year}`;
}
