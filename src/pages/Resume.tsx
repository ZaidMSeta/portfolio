import { Download } from "lucide-react";

export default function Resume() {
  const resumeUrl = "/resume.pdf";

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Resume
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
          View or download my resume below.
        </p>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="grid grid-cols-3 items-center gap-3 border-b border-white/10 pb-4">
          <div aria-hidden />

          <h2 className="justify-self-center text-xl font-semibold text-white">
            Resume
          </h2>

          <a
            href={resumeUrl}
            download
            aria-label="Download resume PDF"
            className="justify-self-end rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-white/20 hover:text-white"
          >
            <Download size={18} />
          </a>
        </div>

        <div className="mt-5 h-[75vh] overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <object data={resumeUrl} type="application/pdf" className="h-full w-full">
            <p className="p-4 text-sm text-white/65">
              Your browser can’t preview PDFs.
              <a
                href={resumeUrl}
                download
                className="ml-1 text-white underline"
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