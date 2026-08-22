// ============================================================
  //  HeroSection.jsx  —  Home Page Hero (Dark Theme)
  //  Matches Highlights format: Left text + Right image
  //  No overlay/shade — background image shows exactly as-is
  // ============================================================

  import "../styles/hero.css";

  const HERO_IMAGE = "Covr_Page - 5.webp";
  const HERO_FALLBACK = "hero-fallback.webp";

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
        {/* Background Image — plain, no gradient/color overlay on top */}
        <div 
          className="hero-bg" 
          style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} 
        />

        {/* Dark gradient overlay — kept light so it doesn't change the
            photo's overall tone/colour */}
        <div className="hero-overlay" />

        {/* Blurs out the "ARAVIND EYE CARE SYSTEM / Vision:..." text
            that is printed directly on the photo — adjust the % values
            in hero.css (.hero-photo-text-mask) if it drifts off-target
            on a different image crop */}
    

        {/* Content */}
        <div className="hero-content">
          
          {/* Year Tag */}
        

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