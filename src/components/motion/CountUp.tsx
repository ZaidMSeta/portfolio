import { useEffect, useState } from "react";
import { useInView } from "./Reveal";

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

  useEffect(() => {
    const target = parse(value)?.target;
    if (!inView || target === undefined) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

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
  }, [inView, value]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  const number = parsed.grouped ? current.toLocaleString("en-US") : String(current);

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
