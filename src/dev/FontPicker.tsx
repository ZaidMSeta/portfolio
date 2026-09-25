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

const BODY = {
  sans: '"Hanken Grotesk", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

// Headings vary; body and labels stay on the current Hanken Grotesk + Plex Mono
const PAIRINGS: Pairing[] = [
  {
    id: "gambetta",
    label: "Gambetta",
    note: "Elegant serif, slightly calligraphic",
    display: '"Gambetta", serif',
    ...BODY,
    displayWeight: 600,
    stylesheets: [fontshare("f[]=gambetta@600")],
  },
  {
    id: "erode",
    label: "Erode",
    note: "Sturdy modern serif with chunky wedges",
    display: '"Erode", serif',
    ...BODY,
    displayWeight: 600,
    stylesheets: [fontshare("f[]=erode@600")],
  },
  {
    id: "boska",
    label: "Boska",
    note: "High-contrast serif, sharp and refined",
    display: '"Boska", serif',
    ...BODY,
    displayWeight: 500,
    stylesheets: [fontshare("f[]=boska@500")],
  },
  {
    id: "cabinet",
    label: "Cabinet Grotesk",
    note: "Bold, punchy grotesk with tight curves",
    display: '"Cabinet Grotesk", sans-serif',
    ...BODY,
    displayWeight: 700,
    stylesheets: [fontshare("f[]=cabinet-grotesk@700")],
  },
  {
    id: "chillax",
    label: "Chillax",
    note: "Rounded and friendly, a bit playful",
    display: '"Chillax", sans-serif',
    ...BODY,
    displayWeight: 600,
    stylesheets: [fontshare("f[]=chillax@600")],
  },
  {
    id: "unbounded",
    label: "Unbounded",
    note: "Wide and techy, strong presence",
    display: '"Unbounded", sans-serif',
    ...BODY,
    displayWeight: 600,
    stylesheets: [google("family=Unbounded:wght@500;600")],
  },
  {
    id: "epilogue",
    label: "Epilogue",
    note: "Grotesk with subtle quirks, confident",
    display: '"Epilogue", sans-serif',
    ...BODY,
    displayWeight: 700,
    stylesheets: [google("family=Epilogue:wght@600;700")],
  },
  {
    id: "martian",
    label: "Martian Mono",
    note: "Wide mono headings, technical but not terminal",
    display: '"Martian Mono", monospace',
    ...BODY,
    displayWeight: 500,
    stylesheets: [google("family=Martian+Mono:wght@400;500")],
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
      return sessionStorage.getItem("font-trial-id") ?? "gambetta";
    } catch {
      return "gambetta";
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
        Heading font trial
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
