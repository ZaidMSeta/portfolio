import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Check, Copy, Linkedin, Mail } from "lucide-react";
import { site } from "../../data/site";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the mailto button beside this still works
    }
  }

  return (
    <button
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex items-center gap-2 rounded-lg border border-fg/15 px-3 py-2 font-mono text-xs text-fg/70 transition hover:border-fg/30 hover:text-fg"
    >
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      {copied ? "copied" : site.email}
    </button>
  );
}

export function ContactCTA() {
  return (
    <section className="rounded-2xl border border-fg/10 card p-6 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.status}
          </p>
          <h2 className="mt-4 text-3xl tracking-tight text-fg sm:text-4xl">Let's talk.</h2>
          <p className="mt-3 text-base leading-7 text-fg/60">
            {site.availability} Email is the fastest way to reach me.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-start lg:items-end">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.links.email}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent/85"
            >
              <Mail size={16} />
              Email me
            </a>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-lg border border-fg/15 px-4 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
            >
              Resume
              <ArrowRight size={16} />
            </Link>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg p-2 text-fg/50 transition hover:text-fg"
            >
              <Linkedin size={18} />
            </a>
          </div>
          <CopyEmailButton />
        </div>
      </div>
    </section>
  );
}
