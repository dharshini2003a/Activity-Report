import { useState, useEffect } from "react";
import "../styles/navbar.css";

// Nav items — add more pages here later
const NAV_ITEMS = [
  { label: "Home",                  href: "/",                  key: "home" },
  { label: "Highlights",            href: "#/highlights",       key: "highlights" },
  { label: "Patient Care",          href: "#/patientcare",       key: "patientcare" },
  { label: "Education and Training",href: "#/education",         key: "education" },
  { label: "LAICO",                 href: "#/laico",             key: "laico" },
  { label: "AMRF",                  href: "#/research",         key: "amrf" },
  { label: "Aurolab",               href: "#/aurolab",           key: "aurolab" },
  { label: "Auroitech",             href: "#/auroitech",         key: "auroitech" },
  { label: "Employee Empowerment",  href: "#/employee-empowerment", key: "employee-empowerment" },
  { label: "Innovation",            href: "#/innovation",        key: "innovation" },
  { label: "Recognitions & Awards", href: "#/recognitions",      key: "recognitions" },
];

export default function Navbar({ activePage = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  // Add shadow when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const close = (e) => {
      if (menuOpen && !e.target.closest(".navbar-custom")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav className={`navbar-custom${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-container">

        {/* ── Mobile hamburger button (shows only on small screens) ── */}
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {/* Animated hamburger → X */}
          <span className={`hamburger-icon${menuOpen ? " open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>

        {/* ── Nav links ── */}
        <div className={`navbar-collapse${menuOpen ? " show" : ""}`}>
          <ul className="navbar-nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.key} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-link-custom${
                    activePage === item.key ? " nav-link-active-pc" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}