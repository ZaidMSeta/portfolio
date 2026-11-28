import type { ReactNode } from "react";
import { useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "../Toaster";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only rounded-md bg-accent text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      {/* Keyed on the path so each page fades in on navigation */}
      <main
        id="main"
        tabIndex={-1}
        key={pathname}
        className="animate-page-in mx-auto w-full outline-none max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:py-12"
      >
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
