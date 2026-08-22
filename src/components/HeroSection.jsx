// ============================================================
//  HeroSection.jsx  —  Home Page Hero (Dark Theme)
//  Matches Highlights format: Left text + Right image
//  Background image (desktop/mobile) is swapped entirely via
//  CSS media query in hero.css — see .hero-bg
// ============================================================

import "../styles/hero.css";

const SYSTEM_ITEMS = [
  { label: "Patient Care" },
  { label: "Education and Training" },
  { label: "Consultancy and Capacity Building" },
  { label: "Research" },
  { label: "Ophthalmic Supplies and Equipment" },
  { label: "Information Technology" },
  { label: "Employee Empowerment" },
  { label: "Innovations" },
  { label: "Recognitions & Awards" },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Image — desktop/mobile versions swapped via CSS
          media query (see .hero-bg in hero.css) */}
      <div className="hero-bg" />

      {/* Dark overlay — gradient on desktop, warm top-to-bottom
          gradient on mobile (see hero.css) */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {/* Main Title */}
        <h1 className="hero-title">
          A Glimpse Activity Report <br />
        </h1>

        {/* System Name + List */}
        <div className="hero-list-block">
          <h2 className="hero-system-name">April 2025 – March 2026</h2>
          <ul className="hero-list">
            {SYSTEM_ITEMS.map((item, i) => (
              <li key={i}>
                <span className="hero-bullet">•</span>
                {item.label}
                {item.sub && (
                  <span className="hero-sub">({item.sub})</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <a href="#/highlights" className="hero-btn-primary">
          Explore Pages
        </a>
      </div>
    </section>
  );
}