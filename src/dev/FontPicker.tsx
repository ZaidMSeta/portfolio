import { useEffect, useState } from "react";

// TEMPORARY: font trial switcher, shown when the URL has ?fonts. Remove once a pairing is chosen.

type Pairing = {
  id: string;
  label: string;
  note: string;
  display: string;
  sans: string;
  mono: string;
  displayWeight: number;
  stylesheets: string[];
};

const google = (families: string) =>
  `https://fonts.googleapis.com/css2?${families}&display=swap`;
const fontshare = (families: string) =>
  `https://api.fontshare.com/v2/css?${families}&display=swap`;

const PAIRINGS: Pairing[] = [
  {
    id: "instrument",
    label: "Instrument Serif + Sans",
    note: "B from the first sheet",
    display: '"Instrument Serif", serif',
    sans: '"Instrument Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 400,
    stylesheets: [google("family=Instrument+Serif&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500")],
  },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    note: "A from the first sheet",
    display: '"Bricolage Grotesque", sans-serif',
    sans: '"Bricolage Grotesque", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 600,
    stylesheets: [google("family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=IBM+Plex+Mono:wght@400;500")],
  },
  {
    id: "space",
    label: "Space Grotesk + Space Mono",
    note: "D, with its matching mono",
    display: '"Space Grotesk", sans-serif',
    sans: '"Space Grotesk", sans-serif',
    mono: '"Space Mono", monospace',
    displayWeight: 600,
    stylesheets: [google("family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono")],
  },
  {
    id: "bricolage-instrument",
    label: "Bricolage + Instrument Sans",
    note: "A's headings, calmer body text",
    display: '"Bricolage Grotesque", sans-serif',
    sans: '"Instrument Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 600,
    stylesheets: [google("family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500")],
  },
  {
    id: "familjen",
    label: "Familjen Grotesk",
    note: "Quirky grotesk, rarely used",
    display: '"Familjen Grotesk", sans-serif',
    sans: '"Familjen Grotesk", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 600,
    stylesheets: [google("family=Familjen+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500")],
  },
  {
    id: "zodiak",
    label: "Zodiak + Switzer",
    note: "Sharp serif headings, neutral body",
    display: '"Zodiak", serif',
    sans: '"Switzer", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 700,
    stylesheets: [fontshare("f[]=zodiak@700"), fontshare("f[]=switzer@400,500,600"), google("family=IBM+Plex+Mono:wght@400;500")],
  },
  {
    id: "redhat",
    label: "Red Hat Display + Text + Mono",
    note: "One matched family, clean and cohesive",
    display: '"Red Hat Display", sans-serif',
    sans: '"Red Hat Text", sans-serif',
    mono: '"Red Hat Mono", monospace',
    displayWeight: 600,
    stylesheets: [google("family=Red+Hat+Display:wght@500;600;700&family=Red+Hat+Text:wght@400;500;600&family=Red+Hat+Mono:wght@400;500")],
  },
  {
    id: "current",
    label: "Hedvig + Hanken (current)",
    note: "For comparison",
    display: '"Hedvig Letters Serif", serif',
    sans: '"Hanken Grotesk", sans-serif',
    mono: '"IBM Plex Mono", monospace',
    displayWeight: 400,
    stylesheets: [],
  },
];

function apply(pairing: Pairing) {
  for (const href of pairing.stylesheets) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }

  const root = document.documentElement.style;
  root.setProperty("--font-display", pairing.display);
  root.setProperty("--font-sans", pairing.sans);
  root.setProperty("--font-mono", pairing.mono);
  root.setProperty("--display-weight", String(pairing.displayWeight));
}

function isEnabled() {
  try {
    if (new URLSearchParams(window.location.search).has("fonts")) {
      sessionStorage.setItem("font-trial", "1");
      return true;
    }
    return sessionStorage.getItem("font-trial") === "1";
  } catch {
    return false;
  }
}

export function FontPicker() {
  const [enabled] = useState(isEnabled);
  const [activeId, setActiveId] = useState(() => {
    try {
      return sessionStorage.getItem("font-trial-id") ?? "instrument";
    } catch {
      return "instrument";
    }
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const pairing = PAIRINGS.find((p) => p.id === activeId) ?? PAIRINGS[0];
    apply(pairing);
    try {
      sessionStorage.setItem("font-trial-id", pairing.id);
    } catch {
      // ignore
    }
  }, [enabled, activeId]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-72 rounded-xl border border-fg/15 bg-bg/95 text-fg shadow-2xl backdrop-blur" style={{ fontFamily: "system-ui, sans-serif" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
      >
        Font trial
        <span className="text-xs font-normal text-fg/50">{open ? "hide" : "show"}</span>
      </button>
      {open && (
        <ul className="max-h-[60vh] overflow-y-auto border-t border-fg/10 p-2">
          {PAIRINGS.map((pairing, index) => (
            <li key={pairing.id}>
              <button
                onClick={() => setActiveId(pairing.id)}
                className={`w-full rounded-lg px-3 py-2 text-left transition ${
                  pairing.id === activeId ? "bg-accent/15 text-accent" : "hover:bg-fg/5"
                }`}
              >
                <span className="block text-sm">
                  {index + 1}. {pairing.label}
                </span>
                <span className="block text-xs text-fg/50">{pairing.note}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
