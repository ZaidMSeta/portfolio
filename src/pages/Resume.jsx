import { Download } from 'lucide-react';

function Resume() {
    const resumeUrl = "/resume.pdf"; 
  
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-zinc-200 p-5 md:p-6">
          {/* top bar */}
          <div className="grid grid-cols-3 items-center gap-3">
            <a
              href={resumeUrl}
              download
              className="justify-self-start rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50"
            >
              Download PDF
            </a>
  
            <h1 className="justify-self-left text-2xl font-semibold">Resume</h1>
  
            <div aria-hidden className="justify-self-center" />
          </div>
  
          {/* viewer */}
          <div className="mt-5 h-[70vh] overflow-hidden rounded-xl border border-zinc-200">
            <object data={resumeUrl} type="application/pdf" className="h-full w-full">
              <p className="p-4 text-sm">
                PDF preview unavailable.{" "}
                <a href={resumeUrl} download className="underline, justify-self-end">
                    <Download />
                </a>
                .
              </p>
            </object>
          </div>
        </div>
      </section>
    );
  }
  
  export default Resume;
  