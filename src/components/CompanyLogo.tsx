import { useState } from "react";

type CompanyLogoProps = {
  src: string;
  company: string;
  className?: string;
};

// Falls back to the company's initials when the logo file is missing
export function CompanyLogo({ src, company, className = "h-10 w-10" }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    const initials = company
      .split(/\s+/)
      .filter((word) => /^[A-Z]/.test(word))
      .slice(0, 2)
      .map((word) => word[0])
      .join("");

    return (
      <div
        aria-hidden
        className={`${className} flex shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-xs font-semibold text-accent`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${company} logo`}
      onError={() => setFailed(true)}
      className={`${className} shrink-0 rounded-lg border border-fg/10 bg-white object-contain p-1`}
    />
  );
}
