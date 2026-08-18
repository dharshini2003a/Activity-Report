// ============================================================
//  HeroSection.jsx  —  Home Page Hero (Dark Theme)
//  Matches Highlights format: Left text + Right image
// ============================================================

import "../styles/hero.css";

const HERO_IMAGE = "Covr_Page - 3 (1).webp";
const HERO_FALLBACK = "hero-fallback.webp";

const SYSTEM_ITEMS = [
  { label: "Patient Care", sub: "Aravind Eye Hospitals" },
  { label: "Education and Training", sub: null },
  { label: "Consultancy and Capacity Building", sub: "LAICO" },
  { label: "Research", sub: "AMRF" },
  { label: "Ophthalmic Supplies and Equipment", sub: "Aurolab" },
  { label: "Information Technology", sub: "Auroitech" },
  { label: "Employee Empowerment", sub: null },
  { label: "Innovations", sub: null },
  { label: "Recognitions & Awards", sub: null },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} 
      />
      
      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        
        {/* Year Tag */}
        <div className="hero-tag">
          <span className="hero-line"></span>
          <span>2025 - 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Annual Activity<br />
          <span className="hero-gold">Report</span>
        </h1>

        {/* System Name + List */}
        <div className="hero-list-block">
          <h2 className="hero-system-name">ARAVIND EYE CARE SYSTEM</h2>
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