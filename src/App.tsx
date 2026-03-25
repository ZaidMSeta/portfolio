import { Routes, Route } from "react-router";
import PageShell from "./components/layout/PageShell";
import Home from "./pages/Home";
//import About from "./pages/About";
import Projects from "./pages/Projects";
//import Experience from "./pages/Experience";
import Resume from "./pages/Resume";
//import Contact from "./pages/Contact";

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        { /* <Route path="/about" element={<About />} /> */}
        <Route path="/projects" element={<Projects />} />
        { /* <Route path="/experience" element={<Experience />} /> */}
        <Route path="/resume" element={<Resume />} />
        { /* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </PageShell>
  );
}