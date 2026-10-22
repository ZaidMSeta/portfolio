import { Download, ExternalLink } from "lucide-react";
import { site } from "../data/site";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Resume() {
  const resumeUrl = site.resume;
  useDocumentTitle("Resume");

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-4xl tracking-tight text-fg sm:text-5xl">Resume</h1>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            download="Zaid-Seta-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent/85"
          >
            <Download size={16} />
            Download
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-fg/15 px-4 py-2 text-sm font-medium text-fg/80 transition hover:border-fg/30 hover:text-fg"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>
      </section>

      {/* Mobile browsers (iOS especially) don't render embedded PDFs reliably, so phones get the buttons only */}
      <div className="hidden h-[80vh] overflow-hidden rounded-xl border border-fg/10 card sm:block">
        <object data={resumeUrl} type="application/pdf" className="h-full w-full">
          <p className="p-4 text-sm text-fg/65">
            Your browser can't preview PDFs.
            <a href={resumeUrl} download className="ml-1 text-fg underline">
              Download the resume instead.
            </a>
          </p>
        </object>
      </div>
    </div>
  );
}
