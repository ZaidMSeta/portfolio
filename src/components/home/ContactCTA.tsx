import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Check, Copy, Linkedin, Mail } from "lucide-react";
import { site } from "../../data/site";
import { Reveal } from "../motion/Reveal";

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
      className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg border border-fg/15 px-4 py-2 font-mono text-sm text-fg/80 transition hover:border-fg/30 hover:text-fg"
    >
      {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
      {copied ? "copied" : site.email}
    </button>
  );
}

export function ContactCTA() {
  return (
    <Reveal as="section" className="relative overflow-hidden rounded-2xl border border-fg/10 card p-6 sm:p-10">
      {/* Soft accent glow in the corner, echoing the hero status pill */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative max-w-3xl">
        <p className="inline-flex items-center gap-2 font-mono text-xs text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {site.status}
        </p>
        <h2 className="mt-4 text-3xl tracking-tight text-fg sm:text-4xl">Let's talk.</h2>
        <p className="mt-3 text-base leading-7 text-fg/65">
          {site.availability} Email is the fastest way to reach me.
        </p>
      </div>

      {/* Phones: two full-width rows, then Resume and LinkedIn side by side */}
      <div className="relative mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <a
          href={site.links.email}
          className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent/85"
        >
          <Mail size={16} />
          Email me
        </a>
        <CopyEmailButton />
        <Link
          to="/resume"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-fg/15 px-4 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
        >
          Resume
          <ArrowRight size={16} />
        </Link>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-fg/15 px-4 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      </div>
    </Reveal>
  );
}
