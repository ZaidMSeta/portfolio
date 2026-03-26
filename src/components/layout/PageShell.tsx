import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}