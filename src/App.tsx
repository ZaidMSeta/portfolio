import { Routes, Route } from "react-router";
import PageShell from "./app/components/layout/PageShell";
//import Home from "./pages/Home";
import Resume from "./app/pages/Resume";
// other pages tba

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/resume" element={<Resume />} />
        {/* other routes tba */}
      </Routes>
    </PageShell>
  );
}
