// ============================================================
//  HeroSection.jsx  —  Main Hero (Index Page Only)
//  Left side: white card with title + list + button
//  Right side: big rounded image
// ============================================================

import "../styles/hero.css";

// The list items shown in the card
const SYSTEM_ITEMS = [
  { label: "Patient Care",                     sub: "Aravind Eye Hospitals" },
  { label: "Education and Training",           sub: null },
  { label: "Consultancy and Capacity Building",sub: "LAICO" },
  { label: "Research",                         sub: "AMRF" },
  { label: "Ophthalmic Supplies and Equipment",sub: "Aurolab" },
  { label: "Information Technology",           sub: "Auroitech" },
  { label: "Employee Empowerment",           sub: null },
  { label: "Innovation",           sub: null },
  { label: "Recognitions & awards",           sub: null },


  
];

export default function HeroSection() {
  return (
    <section className="hero-section">

      {/* Watermark text in background */}
      <div className="bg-watermark" aria-hidden="true">IMPACT 25-26</div>

      <div className="hero-inner">

        {/* ── LEFT: White Info Card ── */}
        <div className="hero-card-col">
          <div className="neat-card">

            {/* Year label */}
            <h6 className="hero-year-label">2025 - 2026</h6>
            {/* Main title */}
            <h1 className="hero-title">Annual Activity<br />Report</h1>
            {/* System name + bullet list */}
            <div className="hero-list-block">
              <h5 className="hero-system-name">ARAVIND EYE CARE SYSTEM</h5>
              <ul className="hero-list">
                {SYSTEM_ITEMS.map((item, i) => (
                  <li key={i}>
                    <span className="hero-bullet">&bull;</span>
                    {item.label}
                    {item.sub && (
                      <span className="hero-sub"> ({item.sub})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <a href="#/highlights" className="btn-primary-custom">
              Explore Pages
            </a>

          </div>
        </div>

        {/* ── RIGHT: Hero Image ── */}
        <div className="hero-image-col">
          <img
            src="Covr_Page - 4.webp"
            alt="Aravind Patient Care — Two people walking in hospital corridor"
            className="hero-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

      </div>
    </section>
  );
}