import { Download } from 'lucide-react';

function Resume() {
    const resumeUrl = "/resume.pdf"; 
  
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-zinc-200 p-5 md:p-6">
      <div className="grid grid-cols-3 items-center gap-3">
        {/* left spacer */}
        <div aria-hidden />

        {/* centered title */}
        <h1 className="justify-self-center text-2xl font-semibold">
          Resume
        </h1>

        {/* right icon button */}
        <a
          href={resumeUrl}
          download
          aria-label="Download resume PDF"
          className="justify-self-end rounded-lg border border-zinc-300 p-2 hover:bg-zinc-50"
        >
          <Download size={18} />
        </a>
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
  