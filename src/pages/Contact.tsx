import { useState } from "react";
import { Mail, Github, Linkedin, Check, Copy } from "lucide-react";

const tile =
  "rounded-xl border border-white/8 bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/[0.07]";

const EMAIL = "zaidmseta@gmail.com";

function EmailCard() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`${tile} md:col-span-2 flex flex-col justify-between gap-6`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <Mail size={18} className="text-teal-300" />
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy email address"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/55 transition hover:border-white/20 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={12} className="text-teal-300" />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">Email</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-2 block text-xl font-semibold text-white transition hover:text-teal-300 sm:text-2xl"
        >
          {EMAIL}
        </a>
        <p className="mt-2 text-sm text-white/50">
          Best way to reach me. I try to reply within a day or two.
        </p>
      </div>
    </div>
  );
}

function GitHubCard() {
  return (
    <a
      href="https://github.com/ZaidMSeta"
      target="_blank"
      rel="noreferrer"
      className={`${tile} flex flex-col justify-between gap-6`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
        <Github size={18} className="text-teal-300" />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">GitHub</p>
        <p className="mt-2 text-lg font-semibold text-white">@ZaidMSeta</p>
        <p className="mt-2 text-sm text-white/50">Source code and side projects.</p>
      </div>
    </a>
  );
}

function LinkedInCard() {
  return (
    <a
      href="https://www.linkedin.com/in/zaidseta"
      target="_blank"
      rel="noreferrer"
      className={`${tile} flex flex-col justify-between gap-6`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
        <Linkedin size={18} className="text-teal-300" />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">LinkedIn</p>
        <p className="mt-2 text-lg font-semibold text-white">Zaid Seta</p>
        <p className="mt-2 text-sm text-white/50">Work history and professional updates.</p>
      </div>
    </a>
  );
}

function AvailabilityCard() {
  return (
    <div className={`${tile} md:col-span-2 flex flex-col justify-between gap-4`}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
        </span>
        <p className="text-sm font-medium text-white">Available</p>
      </div>

      <div>
        <p className="text-sm leading-6 text-white/55">
          Currently looking for summer 2026 internships and open to collaborating on interesting
          projects. Whether it's a role, a side project, or just a conversation — feel free to
          reach out.
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contact</h1>
        <p className="max-w-xl text-base leading-7 text-white/55 sm:text-lg">
          Get in touch — I'm always open to new opportunities and conversations.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <EmailCard />
        <GitHubCard />
        <LinkedInCard />
        <AvailabilityCard />
      </div>
    </div>
  );
}
