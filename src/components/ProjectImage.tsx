import { useState } from "react";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
};

// Shows a titled placeholder until a screenshot exists for the project
export function ProjectImage({ src, alt, className = "" }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_60%)] ${className}`}
      >
        <span className="font-mono text-sm text-fg/40">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
