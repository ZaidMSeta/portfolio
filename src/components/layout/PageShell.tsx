import type { ReactNode } from "react";
import { useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "../Toaster";
import { useAwayTitle } from "../../hooks/useAwayTitle";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  const { pathname } = useLocation();
  useAwayTitle();

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header />
      {/* Keyed on the path so each page fades in on navigation */}
      <main
        key={pathname}
        className="animate-page-in mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:py-12"
      >
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
