import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

// About pulls in recharts, so keep it out of the main bundle
const About = lazy(() => import("./pages/About"));

export default function App() {
  return (
    <PageShell>
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