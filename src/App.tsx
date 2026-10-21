import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

// About pulls in recharts, so keep it out of the main bundle
const About = lazy(() => import("./pages/About"));

// BrowserRouter keeps the old scroll position, so new pages would open mid-way down
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <PageShell>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageShell>
  );
}