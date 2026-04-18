import { Download } from "lucide-react";

export default function Resume() {
  const resumeUrl = "/resume.pdf";

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          Resume
        </h1>
      </section>

      <section className="rounded-xl border border-fg/10 bg-fg/5 p-5 sm:p-6">
        <div className="grid grid-cols-3 items-center gap-3 border-b border-fg/10 pb-4">
          <div aria-hidden />

          <h2 className="justify-self-center text-xl font-semibold text-fg">
            Zaid Seta — Resume
          </h2>

          <a
            href={resumeUrl}
            download
            aria-label="Download resume PDF"
            className="justify-self-end rounded-lg border border-fg/10 bg-fg/5 p-2 text-fg/70 transition hover:border-fg/20 hover:text-fg"
          >
            <Download size={18} />
          </a>
        </div>

        <div className="mt-5 h-[75vh] overflow-hidden rounded-xl border border-fg/10 bg-fg/5">
          <object data={resumeUrl} type="application/pdf" className="h-full w-full">
            <p className="p-4 text-sm text-fg/65">
              Your browser can't preview PDFs.
              <a
                href={resumeUrl}
                download
                className="ml-1 text-fg underline"
              >
                Download the resume instead.
              </a>
            </p>
          </object>
        </div>
      </section>
    </div>
  );
}
