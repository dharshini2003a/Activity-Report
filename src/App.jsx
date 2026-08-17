import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react"
import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";
import HeroSection from "./components/HeroSection";
import PatientCare from "./pages/PatientCare";
import Highlights  from "./pages/Highlights";
import Education   from "./pages/Education";
import Laico       from "./pages/Laico";
import Research    from "./pages/Research";
import Aurolab     from "./pages/Aurolab";
import Auroitech     from "./pages/Auroitech";
import EmployeeEmpowerment from "./pages/EmployeeEmpowerment";
import Innovation from "./pages/Innovation";
import AwardRecognition from "./pages/AwardRecognition";

/* ── Home page ── */
function Home() {
  return <main><HeroSection /></main>;
}
/* ── Scrolls to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Navbar that knows which page is active ── */
function NavbarWithRoute() {
  const { pathname } = useLocation();
  const getActivePage = () => {
    if (pathname === "/")             return "home";
    if (pathname === "/highlights")   return "highlights";
    if (pathname === "/patientcare")  return "patientcare";
    if (pathname === "/education")    return "education";
    if (pathname === "/laico")        return "laico";
    if (pathname === "/research" || pathname === "/amrf") return "amrf";
    if (pathname === "/aurolab")      return "aurolab";
    if (pathname === "/employee-empowerment") return "employee-empowerment";
    if (pathname === "/auroitech")    return "auroitech";
    if (pathname === "/innovation") return "innovation";
    if (pathname === "/recognitions") return "recognitions";
    return "home";
  };
  return <Navbar activePage={getActivePage()} />;
}
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />              {/* ← intha line add pannunga */}
      <NavbarWithRoute />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/highlights" element={<Highlights />} />
        <Route path="/patientcare" element={<PatientCare />} />
        <Route path="/education" element={<Education />} />
        <Route path="/laico" element={<Laico />} />
        <Route path="/research" element={<Research />} />
        <Route path="/aurolab" element={<Aurolab />} />
        <Route path="/auroitech" element={<Auroitech />} />
        <Route path="/employee-empowerment" element={<EmployeeEmpowerment />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/recognitions" element={<AwardRecognition />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}