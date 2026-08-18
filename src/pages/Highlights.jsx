import { useState, useEffect, useRef } from "react";
import "../styles/highlights.css";

const HERO_IMAGE    = "/PN Sir.webp";
const HERO_FALLBACK = "Highlights_Hero.webp";

const STATS = [
  { number: "50th",  label: "Golden Jubilee Year" },
  { number: "8th",   label: "Tertiary Eye Care Centre" },
  { number: "3",     label: "New / Expanded Hospitals" },
  { number: "2030",  label: "SPECS Global Target Year" },
];

/* ══════════════════════════════════════
  DATA — HOSPITAL EXPANSION
══════════════════════════════════════ */
const EXPANSION_CARDS = [
  {
    id: 1, image: "2025_4_Thanjavur_Inauguration_RK (4).webp", fallbackBg: "#0d1f35",
    title: "Aravind Eye Hospital — Thanjavur",
    caption: "Shri. P.R. Venketrama Raja, Chairman, Ramco Group, and Shri. Babaji Rajah Bhonsle, Hereditary Trustee, Thanjavur Palace Devasthanam, inaugurating  Aravind's new facility at Thanjavur",
    short: "Aravind’s eighth Tertiary Eye Care Centre was inaugurated in Thanjavur on 20th April 2025.",
    full: "Aravind commenced its services to the people of Thanjavur and the neighbouring districts in the delta region of Tamil Nadu by establishing its eighth Tertiary Eye Care Centre, equipped with modern facilities, thereby fulfilling a long-standing need for affordable and accessible eye care."
  },
  {
    id: 2, image: "2025_8_Chengalpattu_BEENT Hospital with AEH_Inau (17).webp", fallbackBg: "#1a2d0d",
    title: "BEENT Eye Hospital, Chengalpattu",
    caption: "Dr. R.D. Ravindran, Chairman, AECS, lighting the ceremonial lamp in the presence of Dr. G. Natchir, Director Emeritus, AECS, and the Aravind-Chengalpattu team",
    short: "BEENT Eye Hospital, Chengalpattu, was transformed into Aravind’s eighth Secondary Eye Hospital on 29th August 2025.",
    full:"The existing facility was integrated into the Aravind Eye Care System and now functions as Aravind’s eighth Secondary Eye Hospital under Aravind-Chennai. This integration further expanded the reach of quality eye care and strengthened Aravind’s presence in the surrounding regions of Chengalpattu ",
  },
  {
    id: 3, image: "2025_12_Salem_New Building_Inauguration (114).webp", fallbackBg: "#2d1a0d",
    title: "ARAVIND EYE HOSPTIAL - SALEM ",
    caption: "The Honourable Supreme Court Justice Thiru. R. Mahadevan, inaugurating the new facility of Aravind - Salem",
    short: "A new facility for Aravind-Salem was inaugurated at Uthamacholapuram on 14th December 2025.",
    full: "Aravind-Salem has been serving the eye-care needs of western Tamil Nadu since 2011 from its facility at Nethimedu, Salem. In response to the growing demand for eye care, the centre has expanded to a new facility at Uthamacholapuram, conveniently located along the Salem–Coimbatore Highway.",
  },
];


/* ══════════════════════════════════════
  DATA — GOLDEN JUBILEE (Photo Gallery)
══════════════════════════════════════ */
const JUBILEE_GALLERY = [
  { id: 1, image: "Edit Aravind - Madurai - Golden Jubilee Logo unveiling and tree plantation (9) copy.webp", fallbackBg: "#0d1f35", caption: "Dr. Usha Kim launching the Golden Jublee celebration logo at Aravind-Madurai" },
  { id: 2, image: "50 th_Final_Logo_2025.PNG.webp", fallbackBg: "#1a2d0d", contain: true, caption: "Jubilee celebration logo designed by Dr. Gokul Vasanth, Aravind-Pondicherry"},
  { id: 3, image: "MDU_7697.webp", fallbackBg: "#2d1a0d", caption: "Staff participation in a Jubilee celebration at LAICO" },
  { id: 4, image: "AMRF.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at AMRF" },
  { id: 5, image: "Aurolab 01.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aurolab" },
  { id: 6, image: "Chennai 003 (2).webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Chennai" },
  { id: 7, image: "LAICO 01.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at LAICO" },
  { id: 8, image: "PDY 01.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Pondicherry" },
  { id: 9, image: "PDY 05.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Pondicherry" },
  { id: 10, image: "CBE 01.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Coimbatore" },
  { id: 11, image: "Salem 03.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at  Aravind-Salem" },
  { id: 12, image: "Tirupati 01.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Tirupati" },
  { id: 13, image: "Tirupati.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Tirupati" },
  { id: 14, image: "Tirupur.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Tirupur" },
  { id: 15, image: "TPT.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Tirupati" },
  { id: 16, image: "TVL.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Tirunelveli" },
  { id: 17, image: "UDU.webp", fallbackBg: "#0d2d3a", caption: "Golden Jubilee activity at Aravind-Udumalaipettai" },


];

/* ══════════════════════════════════════
  DATA — NOTABLE ACHIEVEMENTS (Carousel)
══════════════════════════════════════ */
const ACHIEVEMENTS_CARDS = [
  {
    id: 1, image: "2025_11_MDU_WHO Meeting (5).webp", fallbackBg: "#0d1f35",
    title: "LAICO: WHO REGIONAL MEETING ON EYE HEALTH: TOWARDS BETTER VISION",
    short: "Aravind hosted WHO SEARO's Regional Meeting at GRT Grand Hotel, Madurai, on 10–12 November 2025.",
    full: "The regional meeting of the World Health Organization South-East Asia Regional Office (WHO SEARO), held at GRT Grand Hotel, Madurai, focused on reviewing progress in effective cataract surgical coverage, refractive error coverage, diabetic retinopathy screening, and SPECS 2030, a global initiative addressing refractive errors. The meeting also outlined the way forward towards achieving the global eye health targets for 2030.",
  },
  {
    id: 2, image: "2025_10_Aurolab_Eye Drop Facility_Inauguration (1).webp", fallbackBg: "#1a2d0d",
    title: "AUROLAB: A NEW EYE DROPS MANUFACTURING FACILITY",
    short: "Aurolab opened its Advanced US FDA-Compliant Eye Drops Manufacturing Facility on 5th October 2025.",
    full: "The opening of the new Eye Drops Manufacturing Facility, is one of the major milestones in the company's efforts to promote India's Atmanirbhar Bharat vision and improve eye care globally, while also upholding Aurolab's commitment to “Make in India,” sustainability, and international quality standards. ",
  },
  {
    id: 3, image: "Microbiology.webp", fallbackBg: "#2d1a0d",
    title: "AMRF: LAB TO CLINIC — MYOCILIN GLAUCOMA",
    short: "Genetic research on the MYOC gene has been translated into clinical practice for early detection of JOAG.",
    full: "Genetic research on the MYOC (myocilin) gene has been translated into clinical practice for the early detection and management of juvenile-onset open-angle glaucoma (JOAG). The recent study identified several MYOC gene mutations N480K, in eight families across South India with young individuals who are yet to develop the clinical symptoms and are being closely monitored.",
  },
];

/* ══════════════════════════════════════
  DATA — ORATION & BEYOND ARAVIND
  ══════════════════════════════════════ */
  const ORATION_EVENT_1 = {
    id: "oration-2025",
    title: "Dr. G. Venkataswamy Oration and Award Ceremony 2025",
    description: "This year, the Oration Award was conferred on Dr. Leon B. Ellwein, a public health professional recognising his contributions to epidemiology and operations research in vision health. His collaboration with Aravind began in the early 1980s with community-based research aimed at improving cataract care delivery. He later played a pivotal role in the landmark Madurai Intraocular Lens Study (MIOLS). These initiatives helped build Aravind's capacity for population-based studies and facilitated international collaborations that continue to guide Aravind's research. During the oration ceremony held at Aravind-Madurai on 30th September 2025, Dr. Ellwein delivered the Dr. G. Venkataswamy Memorial Oration on the title: “Research to Give Sight for All.”",
    photos: [
      { id: 1, image: "2025_10_Oration Award_Dr.Leon Ellwein (38).webp", fallbackBg: "#2d1a0d", caption: "Dr. Ellwein delivering the Dr. G. Venkataswamy Memorial Oration on the title: “Research to Give Sight for All”" },
      { id: 2, image: "2025_10_Oration Award_Dr.Leon Ellwein (30).webp", fallbackBg: "#2d1a0d", caption: "Dr. G. Natchiar presenting the oration award and citation to Dr. Ellwein" },
      { id: 3, image: "2025_10_Oration Award_Dr.Leon Ellwein (11).webp", fallbackBg: "#2d1a0d", caption: "Thulasiraj Ravilla welcoming Dr. Ellwein with a garland" },
      { id: 4, image: "2025_10_Oration Award_Dr.Leon Ellwein (23).webp", fallbackBg: "#2d1a0d", caption: "Dr. R.D. Ravindran, Chairman, AECS, highlighting Aravind’s contributions in his address" },
      { id: 5, image: "2025_10_Oration Award_Dr.Leon Ellwein (27).webp", fallbackBg: "#2d1a0d", caption: "Dhivya Ramasamy, Executive Director, LAICO, reading the citation" },
      { id: 6, image: "2025_10_Oration Award_Dr.Leon Ellwein (46).webp", fallbackBg: "#2d1a0d", caption: "Performance" },
    ]
  };

const ORATION_EVENT_2 = {
  id: "art-exhibition",
  title: "Beyond Aravind — Joint Art Exhibition",
  description: "In remembrance of artists Perumal Da and Manohar Devadoss, whose birthdays fall on 7th August and 10th September respectively, Aravind has been celebrating their legacies through exhibitions under the theme “Art that Inspires.” The exhibition organised at Aravind-Madurai on 12-16 August 2025 engaged schoolchildren, college students, and the public, encouraging them to appreciate artworks that honour Madurai's notable monuments and capture the beauty of nature.",
  photos: [
    { id: 1, image: "Edit_2025_8_Art Exhibition_Perumalda&Manohar (8) copy.webp", fallbackBg: "#0d2d3a", caption: "Ariaravelan inaugurating the art exhibition of Perumal Da and Manohar Devadoss" },
    { id: 2, image: "2025_8_Art Exhibition_Perumalda&Manohar (11).webp", fallbackBg: "#0d2d3a", caption: "Ceremonial lamp lighting by Dr. R. Prabhakar Vedamanickam" },
    { id: 3, image: "2025_8_Art Exhibition_Perumalda&Manohar (23).webp", fallbackBg: "#0d2d3a", caption: "Artist Ramanan interacting with school children about the world of comics" },
    { id: 4, image: "2025_8_Art Exhibition_Perumalda&Manohar (28).webp", fallbackBg: "#0d2d3a", caption: "Aravind AOPs viewing the artworks on display" },
    { id: 5, image: "2025_8_Art Exhibition_Perumalda&Manohar (49).webp", fallbackBg: "#0d2d3a", caption: "School children viewing artworks at the art exhibition" },
  ]
};

/* Expandable card — same visual language as other pages, with click-to-preview lightbox */
function InitiativeCard({ card, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  useEffect(() => { if (contentRef.current) setContentHeight(contentRef.current.scrollHeight); }, []);

  useEffect(() => {
    if (!showLightbox) return;
    const handler = (e) => { if (e.key === "Escape") setShowLightbox(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showLightbox]);

  return (
    <>
      <div className={`pc-card${isOpen ? " pc-card-open" : ""}`} style={{ alignSelf: "start" }}>
        <div className="pc-card-img-wrap" style={{ background: card.fallbackBg, cursor: "pointer" }} onClick={() => setShowLightbox(true)}>
          <img
            src={card.image}
            alt={card.title}
            className="pc-card-img"
            loading="lazy"
            decoding="async"
            style={card.contain ? { objectFit: "contain", background: "#fff", padding: 10, opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" } : { opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }}
            onLoad={(e) => { e.target.style.opacity = "1"; }}
            onError={(e) => { e.target.style.opacity = "0"; }}
          />
          <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
        </div>
        <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="pc-card-title">{card.title}</h3>
          <p className="pc-card-short">{card.short}</p>
          <div ref={contentRef} style={{ maxHeight: isOpen ? `${contentHeight || 800}px` : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.42s ease, opacity 0.3s ease" }}>
            <p className="pc-card-full-text">{card.full}</p>
          </div>
          <button className="pc-card-readmore" onClick={onToggle}>
            {isOpen ? <>Read less <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: 10 }}>&#9660;</span></> : <>Read more <span style={{ fontSize: 10 }}>&#9660;</span></>}
          </button>
        </div>
      </div>

      {showLightbox && (
        <div className="photo-lightbox-overlay" onClick={() => setShowLightbox(false)}>
          <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setShowLightbox(false)}>&#10005;</button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={card.image}
                alt={card.caption || card.title}
                className="photo-lightbox-img"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{card.caption || card.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* Carousel gallery — left/right arrows + dot pagination (reuses site-wide
  .carousel-wrap / .carousel-arrow / .carousel-track / .photo-card / .carousel-dots) */
function PhotoCarousel({ items }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const total = items.length;

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (track && card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(total - 1, index));
    setActiveIndex(clamped);
    scrollToIndex(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0, closestDist = Infinity;
    Array.from(track.children).forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setActiveIndex(closest);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="carousel-wrap">
        <div className="carousel-track-wrap">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous"
          >
            &#8592;
          </button>

          <div
            className="carousel-track photo-carousel-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`photo-card${activeIndex === i ? " photo-card-active" : ""}`}
                onClick={() => setLightbox(i)}
              >
                <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="photo-card-img"
                    loading="lazy"
                    decoding="async"
                    style={item.contain ? { objectFit: "contain", background: "#fff", padding: 10, opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" } : { opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }}
                    onLoad={(e) => { e.target.style.opacity = "1"; }}
                    onError={(e) => { e.target.style.opacity = "0"; }}
                  />
                  <div className="photo-card-overlay">
                    <span className="photo-card-zoom">&#9654; View</span>
                  </div>
                </div>
                <p className="photo-card-caption">{item.caption}</p>
              </div>
            ))}
          </div>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>

        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${activeIndex === i ? " carousel-dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>&#10005;</button>
            <button
              className="photo-lightbox-arrow photo-lightbox-prev"
              onClick={() => setLightbox(((lightbox - 1) + total) % total)}
            >
              &#8592;
            </button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={items[lightbox].image}
                alt={items[lightbox].caption}
                className="photo-lightbox-img"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            <button
              className="photo-lightbox-arrow photo-lightbox-next"
              onClick={() => setLightbox((lightbox + 1) % total)}
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
  MAIN COMPONENT
══════════════════════════════════════ */
export default function Highlights() {
  const heroRef = useRef(null);

  const [expandedExpansion, setExpandedExpansion] = useState(null);
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [expandedOration, setExpandedOration] = useState(null);

  return (
    <div className="pc-page">

      {/* ══ HERO ══ */}
      <section className="pc-hero" ref={heroRef}>
        <div className="pc-hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-overlay" />
        <div className="pc-hero-content">
          <div className="pc-hero-tag">
            
          </div>
          <h1 className="pc-hero-title">
            The year <span className="pc-hero-gold">in Focus</span>
          </h1>
          <p className="pc-hero-desc">
          Several significant milestones marked Aravind's journey over the past year, particularly in expanding its services and enhancing patient care, while also celebrating its Golden Jubilee through a series of commemorative events. These occasions served as a meaningful reminder for every member of the Aravind family to renew their commitment to the noble vision of Dr. V.
          </p>
          
      
        </div>
      </section>

      {/* ══ SECTION 2: HOSPITAL EXPANSION ══ */}
      <section className="pc-section pc-infra-section" id="expansion">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Hospital <span className="pc-gold">Expansion</span></h2>
          <p className="pc-section-body">
        Inauguration of new centres across various locations expanded access to quality eye care for more communities this year.
          </p>
          <div className="pc-cards-grid" style={{ marginTop: 32 }}>
            {EXPANSION_CARDS.map((card) => (
              <InitiativeCard key={card.id} card={card} isOpen={expandedExpansion === card.id} onToggle={() => setExpandedExpansion((prev) => (prev === card.id ? null : card.id))} />
            ))}
          </div>

          
        </div>
      </section>

      {/* ══ SECTION 3: GOLDEN JUBILEE ══ */}
      <section className="pc-section" id="jubilee">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Reaching a <span className="pc-gold">Half-Century Milestone</span></h2>
          <p className="pc-section-body">
            Inspired by the timeless words of Dr. V, "Intelligence and capability are not enough. There must also be the joy of doing something beautiful," Aravind, as it reaches its 50th year, looks back with deep satisfaction on its journey of creating a brighter society through compassionate eye care. At the same time, this milestone is an opportunity to look ahead, with renewed spirit, stronger commitment, and a clear determination to accomplish all that still remains to be done in its mission of eliminating needless blindness.
          </p>
          <PhotoCarousel items={JUBILEE_GALLERY} />
        </div>
      </section>

      {/* ══ SECTION 4: NOTABLE ACHIEVEMENTS ══ */}
      <section className="pc-section pc-infra-section" id="who">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Highlights from <span className="pc-gold">Across Aravind</span></h2>
          <div className="pc-cards-grid" style={{ marginTop: 32 }}>
            {ACHIEVEMENTS_CARDS.map((card) => (
              <InitiativeCard
                key={card.id}
                card={card}
                isOpen={expandedAchievement === card.id}
                onToggle={() => setExpandedAchievement((prev) => (prev === card.id ? null : card.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: ORATION & BEYOND ARAVIND ══ */}
      <section className="pc-section pc-section-tight" id="oration">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Celebrating People<span className="pc-gold"> & Contributions</span></h2>

          {/* EVENT 1: Dr. G. Venkataswamy Oration */}
          <div style={{ marginTop: 12, marginBottom: 32 }}>
            <h3 className="oration-event-title">{ORATION_EVENT_1.title}</h3>
            <p className="oration-event-description">{ORATION_EVENT_1.description}</p>
            <PhotoCarousel items={ORATION_EVENT_1.photos} />
          </div>

          {/* EVENT 2: Joint Art Exhibition */}
          <div style={{ marginTop: 12 }}>
            <h3 className="oration-event-title">{ORATION_EVENT_2.title}</h3>
            <p className="oration-event-description">{ORATION_EVENT_2.description}</p>
            <PhotoCarousel items={ORATION_EVENT_2.photos} />
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="AR_Lr_Content_new_2025-26.pdf">click here</a> for more details — download the Highlights (PDF).
      </p>

    {/* PAGE NAVIGATION */}
<nav className="pc-page-nav" aria-label="Page navigation">
  <a className="pc-page-nav-link pc-page-nav-link-prev" href="#/">
    <span className="pc-page-nav-label">&larr; Previous</span>
    <span className="pc-page-nav-title">Home</span>
  </a>
  <div className="pc-page-nav-divider" />
  <a className="pc-page-nav-link pc-page-nav-link-next" href="#/patientcare">
    <span className="pc-page-nav-label">Next &rarr;</span>
    <span className="pc-page-nav-title">Patient Care</span>
  </a>
</nav>
    </div>
  );
}