import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";

const DURATION_MS = 1100;

// Splits "~1s", "4,804" or "200+" into the number and whatever surrounds it
function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, target: Number(digits.replace(/,/g, "")), grouped: digits.includes(","), suffix };
}

// Counts a stat up from zero the first time it scrolls into view
export function CountUp({ value }: { value: string }) {
  const parsed = parse(value);
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [current, setCurrent] = useState(0);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const target = parse(value)?.target;
    if (!inView || target === undefined || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  const shown = reduced && inView ? parsed.target : current;
  const number = parsed.grouped ? shown.toLocaleString("en-US") : String(shown);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final value, not every frame */}
      <span aria-hidden>
        {parsed.prefix}
        {number}
        {parsed.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
