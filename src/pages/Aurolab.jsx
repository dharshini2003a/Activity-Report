import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/aurolab.css";

const HERO_IMAGE    = "auro lab 1080x1920.webp";
const HERO_FALLBACK = "/Aurolab_Hero.jpg";

const STATS = [
  { number: "120",      label: "Countries Served Worldwide" },
  { number: "120,000",  label: "Eye-Drop Bottles / Day" },
  { number: "36M",      label: "Bottles Annual Capacity" },
  { number: "Platinum", label: "CII Maintenance Award 2026" },
];

/* ══════════════════════════════════════
   AI / KEYWORD SEARCH KNOWLEDGE BASE
══════════════════════════════════════ */
const KNOWLEDGE_BASE = [
  { tag: "Overview", title: "Aurolab's Mission", keywords: ["aurolab", "dr v", "consciousness", "iol", "mission", "120 nations"], text: "Aurolab was established with Dr. V's spirit of service — \u201cIt is not about buildings, equipment, money, or material things, but a matter of consciousness.\u201d What began with indigenous manufacture of affordable intraocular lenses (IOLs) has grown into a global mission, with products now distributed across 120 nations." },
  { tag: "Infrastructure", title: "New Spectacle Frame Division", keywords: ["spectacle", "frame", "division", "children", "ramachandran"], text: "Aurolab inaugurated its New Spectacle Frame Division on 7th April 2025, dedicated to producing affordable, high-quality, flexible frames for children. It was inaugurated by P. Ramachandran, Business Advisor (Eyewear) and Fellow of the Institute of Directors." },
  { tag: "Infrastructure", title: "Eye Drops Manufacturing Facility", keywords: ["eye drops", "fda", "atmanirbhar", "anantha nageswaran", "75000 sq ft", "36 million bottles"], text: "The Advanced US FDA-compliant Eye Drops Manufacturing Facility was inaugurated on 5th October 2025 by Dr. V. Anantha Nageswaran, Chief Economic Advisor to the Government of India. Spanning 75,000 sq. ft., it raised production capacity to 36 million bottles annually and now produces 120,000 bottles a day, supporting India's Atmanirbhar Bharat and Make in India vision." },
  { tag: "Infrastructure", title: "New Crèche Building", keywords: ["crèche", "staff hostel", "8 december", "staff welfare"], text: "The crèche, which had been functioning in the staff hostel since 2007, was shifted to a newly dedicated building on 8th December 2025, as part of Aurolab's expanded staff welfare facilities." },
  { tag: "Infrastructure", title: "New Canteen & Staff Dining Hall", keywords: ["canteen", "dining hall", "staff dining", "8 december"], text: "A new canteen dining hall and staff dining hall were set up on 8th December 2025 to improve dining and social facilities for Aurolab staff." },
  { tag: "Infrastructure", title: "New Optics Division & Domestic Business Office", keywords: ["optics division", "domestic business office", "8 december"], text: "The new Optics Division and Domestic Business Office were inaugurated on 8th December 2025, laying a strong foundation for future growth and continued excellence." },
  { tag: "New Products", title: "Ace Vision Phakic IOLs", keywords: ["ace vision", "phakic", "toric", "hydrophilic", "january 2026"], text: "The Ace Vision Phakic IOLs, launched in January 2026, offer advanced optic designs for correction of high refractive errors. The Hydrophilic Phakic IOL supports spectacle-free vision, while its Toric variant offers dual correction for refractive errors and astigmatism." },
  { tag: "New Products", title: "Magnus IOL & Hummingbird Elite", keywords: ["magnus", "cope", "hummingbird elite", "phacoemulsification", "aios", "jaipur"], text: "The Magnus IOL, powered by COPE technology, delivers clear vision across far, intermediate and near distances. Hummingbird Elite is a premium phacoemulsification system with advanced phaco modes, ultra-fast vitrectomy and USB connectivity. Both were unveiled at the AIOS conference in Jaipur on 12th March 2026." },
  { tag: "Training", title: "KOTA CME & Glaucoma Training", keywords: ["kota", "eye connect", "glaucoma implantation", "aadi 250", "ahmedabad"], text: "KOTA CME \u2013 Eye Connect 2025 (31 August 2025) strengthened clinical knowledge exchange with around 65 doctors. A Glaucoma Implantation Special Session at C.H. Nagri Eye Hospital, Ahmedabad (1 September 2025) covered the AADI 250 implant technique with live surgery and wet-lab training." },
  { tag: "Training", title: "Counsellor Training Programmes", keywords: ["counsellor connect", "ztm", "zonal training managers", "patient communication"], text: "Aurolab's Zonal Training Managers trained eye hospital counsellors across North, South, East and West India on patient communication and product understanding. \u201cCounsellor Connect\u201d further trained groups of about 30 counsellors at a time to confidently explain treatment options to patients." },
  { tag: "Conferences", title: "National & International Ophthalmic Conferences", keywords: ["sadguru", "seva sangh", "aioc", "delhi ophthalmological society", "dos"], text: "Aurolab showcased its latest products and innovations at major national and international ophthalmic conferences, including the Sadguru Seva Sangh Conference, the All India Ophthalmological Conference (AIOC), and the Delhi Ophthalmological Society (DOS)." },
];


const INFRA_CARDS = [
  {
    id: 1, image: "Flexikid Launch (1).webp", fallbackBg: "#0d1f35",
    title: "INAUGURATION OF A NEW SPECTACLE FRAME DIVISION",
    short: "7th April 2025 – A spectacle frame division to produce affordable, high-quality, flexible frames for children",
    full: "Aurolab inaugurated its new Spectacle Frame Division, marking its expansion into children’s eyewear alongside its established range of ophthalmic products. The division was inaugurated by P. Ramachandran, Business Advisor (Eyewear) and Fellow of the Institute of Directors.",
  },
  {
    id: 2, image: "2025_10_Aurolab_Eye Drop Facility_Inaugur_Building.webp", fallbackBg: "#1a2d0d",
    title: "OPENING OF ADVANCED EYE DROPS MANUFACTURING FACILITY",
    short: "The Advanced US FDA-compliant Eye Drops Manufacturing Facility was inaugurated on 5th October 2025",
    full: "Formally inaugurated by Dr. V. Anantha Nageswaran, Chief Economic Advisor to the Government of India, this state-of-the-art unit spans 75,000 sq. ft., enhancing production capacity to 36 million bottles annually — reinforcing Aurolab's commitment to international quality standards, sustainability, and the “Make in India” initiative. The daily production has now reached 120,000 eye-drop bottles. The inauguration marked a significant step in strengthening global eye care and supporting India's Atmanirbhar Bharat vision.",
  },
  {
    id: 3, image: "2025_12_Aurolab_Optical_Inau (5).webp", fallbackBg: "#3b2511",
    title: "New Optics Division & Domestic Business Office",
    short: "The new Optics Division and Domestic Business Office were also inaugurated, laying a strong foundation for future growth and continued excellence",
    full: "All these developments reflect the organisation’s mission to “See New Possibilities."
  },
  {
    id: 4, image: "Crecheandcanteen.webp", fallbackBg: "#0d2d3a",
    title: "INAUGURATION OF SEVERAL EXPANDED FACILITIES",
    short: "To enhance operational capacity and improve staff welfare, several expanded facilities and key infrastructure projects were inaugurated on 8th December 2025.",
    full: "The crèche which was functioning in the staff hostel since 2007, has been shifted to a newly dedicated building. In addition, a new canteen dining hall and staff dining hall were set up to improve dining and social facilities.",
  },
];

const PRODUCT_CARDS = [
  {
    id: 1, image: "Ace Vision.webp",
    title: "Ace Vision Hydrophilic Phakic IOL",
    short: "Ace Vision Hydrophilic Phakic IOLs were launched in January 2026.",
    full: "The Ace Vision Phakic IOLs offer advanced optic designs for the correction of high refractive errors, along with support for natural aqueous circulation and smooth implantation.",
  },
  {
    id: 2, image: "AceVision Toric with Toric.webp",
    title: "Ace Vision Toric",
    short: "Launched in January 2026, Ace Vision Toric is a toric variant of the Ace Vision Hydrophilic Phakic IOL.",
    full: "It provides excellent visual clarity and long-term stability for spectacle-free vision, offering dual correction for refractive errors and astigmatism, combining refractive precision with effective astigmatism management for sharper and more stable outcomes",
  },
  {
    id: 3, image: "Magnus - png.webp",
    title: "Magnus IOL",
    short: "Powered by COPE technology, Magnus IOL was introduced on 12th March 2026 at the AIOS Conference held in Jaipur.",
    full: "The Magnus IOL delivers clear vision across far, intermediate, and near distances with stable optical performance, giving patients dependable visual quality across their full range of activities",
  },
  {
      id: 4, image: "8Y2A7909-.webp",
      title: "Hummingbird Elite",
    short:"The Hummingbird Elite, a premium phacoemulsification system, was unveiled on 12th March 2026 at the AIOS Conference in Jaipur.",
    full:"Hummingbird Elite featured advanced phaco modes, automated safety functions, ultra-fast vitrectomy, ergonomic design, and USB connectivity, supporting superior outcomes in cataract surgery. ",
  },
];

/* ══════════════════════════════════════
   CME / CONFERENCE CARDS — title/date/short/full for the
   InitiativeCard Read More layout (Highlights.jsx style)
══════════════════════════════════════ */
const CME_CAROUSEL = [
  {
    id: 1, image: "kota (4).webp", fallbackBg: "#0d1f35",
    title: "KOTA CME — Eye Connect 2025",
    short: "Themed “Eye Connect: Clinical Insights & Advancements in IOL Technology,” this programme aimed to strengthen clinical knowledge exchange and reinforced partnerships with the ophthalmic community.",

    full: "Participants experienced hands-on learning using advanced equipment. Around 65 doctors participated.",
  },
  {
    id: 2, image: "Glaucoma Implantation (2).webp", fallbackBg: "#1a2d0d",
    title: "Glaucoma Implantation — Special Session",
    short: "This training session aimed to strengthen surgical skills and enhance the delivery of advanced glaucoma care.",
    full: "It included a detailed explanation of the AADI 250 implant technique, a live surgical demonstration, a wet lab for hands-on training, and interactive Q&A discussions.",
  },
  {
    id: 3, image: "Picture3 west.webp", fallbackBg: "#2d1a0d",
    title: "Special Training for Eye Hospital Counsellors",
    date: "",
    short: "Aurolab's Zonal Training Managers (ZTMs) conducted specialised training for eye hospital counsellors across North, South, East, and West India, focused on effective patient communication, product and treatment understanding, and practical application in hospital settings.",
    full: "Key states covered included Bihar, Maharashtra, Tamil Nadu, Kerala, Andhra Pradesh, Rajasthan, Delhi, Haryana, Punjab, and Uttar Pradesh — strengthening professional capability, trust, and collaboration between Aurolab and healthcare partners.",
  },
  {
    id: 4, image: "2025_8_Chennai_Aurolab Counsellor Connect 360 (6).webp", fallbackBg: "#0d2d3a",
    title: "Counsellor Connect 360",
    short: "Aurolab hosted its 5th Counsellor Connect 360 training programme for counsellors from Aravind–Chennai.",
    full: "Aimed at strengthening both soft skills and technical knowledge in patient counselling, the structured training programme supported better patient guidance and enhanced care experiences by focusing on both technical knowledge and patient communication skills.",
  },
];

/* ══════════════════════════════════════
   CONFERENCE GALLERY
══════════════════════════════════════ */
const CONFERENCE_GALLERY = [
  { id: 1, image: "sadguru seva.webp", fallbackBg: "#0d1f35", caption: "Sadguru Seva Sangh Conference" },
  { id: 2, image: "AIOC (7).webp", fallbackBg: "#1a2d0d", caption: "All India Ophthalmological Conference (AIOC)" },
  { id: 3, image: "DOS 5.webp", fallbackBg: "#2d1a0d", caption: "Delhi Ophthalmological Society (DOS)" },
  { id: 4, image: "APAO 1 (1).webp", fallbackBg: "#2d1a0d", caption: "Asia Pacific Association of Ophthalmologists (APAO)" },

];

/* ══════════════════════════════════════
   AI SEARCH
══════════════════════════════════════ */
function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    setSearched(true);
    if (!q) { setResults([]); return; }
    const filtered = KNOWLEDGE_BASE.filter((item) => {
      const haystack = `${item.title} ${item.tag} ${item.text} ${item.keywords.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
    setResults(filtered.slice(0, 5));
  };

  const handleClear = () => { setQuery(""); setResults([]); setSearched(false); };

  return (
    <div className="ai-search-wrap">
      <div className="ai-search-bar">
        <span className="ai-search-icon">&#10022;</span>
        <input
          className="ai-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Ask about Aurolab  e.g. new products, eye drops facility, awards, training"
        />
        {searched && (
          <button className="ai-close-btn" style={{ borderRadius: 0, borderTop: "none", borderBottom: "none", minHeight: 50 }} onClick={handleClear}>&#10005;</button>
        )}
        <button className="ai-search-btn" onClick={handleSearch} disabled={!query.trim()}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <div className="ai-answer-box" style={{ borderLeft: "4px solid #c8921a", background: "#fffbf2" }}>
          <p className="ai-answer-text" style={{ color: "#555" }}>
            No direct match in this report. Try asking about new products, infrastructure, regulatory affairs, training, or awards.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <ul className="ai-results-list">
          {results.map((item, index) => (
            <li key={`${item.title}-${index}`} className="ai-result-card">
              <span className="ai-answer-label">{item.tag} &bull; {item.title}</span>
              <p className="ai-answer-text">{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


/* Expandable carousel — Highlights-style card (image + date + title + short +
   animated full text + Read more) inside a 3-up arrow/dot carousel
   (reuses .carousel-wrap / .carousel-arrow / .carousel-track / .pc-card / .carousel-dots). */
function CardCarousel({ items, expandedId, onToggle }) {
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
          <button className="carousel-arrow carousel-arrow-left" onClick={() => goTo(activeIndex - 1)} aria-label="Previous">&#8592;</button>

          <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
            {items.map((item, i) => {
              const isOpen = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`pc-card${isOpen ? " pc-card-open" : ""}${activeIndex === i ? " photo-card-active" : ""}`}
                  style={{ flex: "0 0 calc(33.333% - 16px)", minWidth: 260, scrollSnapAlign: "start" }}
                >
                  <div className="pc-card-img-wrap" style={{ background: item.fallbackBg, cursor: "pointer" }} onClick={() => setLightbox(i)}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="pc-card-img"
                      loading="lazy"
                      decoding="async"
                      style={{ opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }}
                      onLoad={(e) => { e.target.style.opacity = "1"; }}
                      onError={(e) => { e.target.style.opacity = "0"; }}
                    />
                    <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
                  </div>
                  <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
                    {item.date && (
                      <p style={{ color: "#c8921a", fontWeight: 700, fontSize: 12.5, margin: "0 0 6px", fontFamily: "'PT Sans', sans-serif" }}>
                        {item.date}
                      </p>
                    )}
                    <h3 className="pc-card-title">{item.title}</h3>
                    <p className="pc-card-short">{item.short}</p>
                    {isOpen && <p className="pc-card-full-text">{item.full}</p>}
                    <button className="pc-card-readmore" onClick={() => onToggle(item.id)}>
                      {isOpen ? <>Read less <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: 10 }}>&#9660;</span></> : <>Read more <span style={{ fontSize: 10 }}>&#9660;</span></>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="carousel-arrow carousel-arrow-right" onClick={() => goTo(activeIndex + 1)} aria-label="Next">&#8594;</button>
        </div>

        <div className="carousel-dots">
          {items.map((_, i) => (
            <button key={i} className={`carousel-dot${activeIndex === i ? " carousel-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>&#10005;</button>
            <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={items[lightbox].image}
                alt={items[lightbox].title}
                className="photo-lightbox-img"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].title}</p>
            <button className="photo-lightbox-arrow photo-lightbox-next" onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
          </div>
        </div>
      )}
    </>
  );
}
/* Product card with image — reuses PhD-style image treatment.
   Image click opens a lightbox (same pattern as PhotoCarousel/CardCarousel). */
function ProductCard({ card, isOpen, onToggle, onImageClick }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => { if (contentRef.current) setContentHeight(contentRef.current.scrollHeight); }, []);

  return (
    <div className={`pc-card${isOpen ? " pc-card-open" : ""}`} style={{ alignSelf: "start" }}>
      <div className="aurolab-product-img-wrap" style={{ background: card.fallbackBg, cursor: "pointer" }} onClick={onImageClick}>
        <img src={card.image} alt={card.title} className="aurolab-product-img" onError={(e) => { e.target.style.opacity = "0"; }} />
        <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
      </div>
      <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'PT Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#0d1f35", margin: "0 0 8px" }}>{card.title}</h3>
        <p className="pc-card-short">{card.short}</p>
        <div ref={contentRef} style={{ maxHeight: isOpen ? `${contentHeight || 800}px` : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.42s ease, opacity 0.3s ease" }}>
          <p className="pc-card-full-text">{card.full}</p>
        </div>
        <button className="pc-card-readmore" style={{ marginTop: 12, alignSelf: "flex-start" }} onClick={onToggle}>
          {isOpen ? <>Read less <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: 10 }}>&#9660;</span></> : <>Read more <span style={{ fontSize: 10 }}>&#9660;</span></>}
        </button>
      </div>
    </div>
  );
}

/* Expandable card — same visual language as Highlights.jsx InitiativeCard
   (image + optional date + title + short + animated full text + Read more,
   click-to-preview lightbox). Used for the CME / Conferences section so it
   matches Highlights instead of the carousel-caption style. */
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
            style={{ opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }}
            onLoad={(e) => { e.target.style.opacity = "1"; }}
            onError={(e) => { e.target.style.opacity = "0"; }}
          />
          <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
        </div>
        <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
          {card.date && (
            <p style={{ color: "#c8921a", fontWeight: 700, fontSize: 12.5, margin: "0 0 6px", fontFamily: "'PT Sans', sans-serif" }}>
              {card.date}
            </p>
          )}
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
                alt={card.title}
                className="photo-lightbox-img"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{card.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* Carousel gallery — left/right arrows + dot pagination (reuses .carousel-wrap /
   .carousel-arrow / .carousel-track / .photo-card / .carousel-dots, same as Highlights.jsx).
   Used for simple caption-only image galleries (e.g. CONFERENCE_GALLERY). */
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
          <button className="carousel-arrow carousel-arrow-left" onClick={() => goTo(activeIndex - 1)} aria-label="Previous">&#8592;</button>

          <div className="carousel-track photo-carousel-track" ref={trackRef} onScroll={handleScroll}>
            {items.map((item, i) => (
              <div key={item.id} className={`photo-card${activeIndex === i ? " photo-card-active" : ""}`} onClick={() => setLightbox(i)}>
                <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
                  <img src={item.image} alt={item.caption} className="photo-card-img" loading="lazy" decoding="async" style={{ opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }} onLoad={(e) => { e.target.style.opacity = "1"; }} onError={(e) => { e.target.style.opacity = "0"; }} />
                  <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
                </div>
                <p className="photo-card-caption">{item.caption}</p>
              </div>
            ))}
          </div>

          <button className="carousel-arrow carousel-arrow-right" onClick={() => goTo(activeIndex + 1)} aria-label="Next">&#8594;</button>
        </div>

        <div className="carousel-dots">
          {items.map((_, i) => (
            <button key={i} className={`carousel-dot${activeIndex === i ? " carousel-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>&#10005;</button>
            <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            <div className="photo-lightbox-img-wrap">
              <img src={items[lightbox].image} alt={items[lightbox].caption} className="photo-lightbox-img" loading="lazy" decoding="async" onError={(e) => { e.target.style.opacity = "0"; }} />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            <button className="photo-lightbox-arrow photo-lightbox-next" onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Aurolab() {
  const heroRef = useRef(null);

  const [expandedInfra, setExpandedInfra] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [productLightbox, setProductLightbox] = useState(null);
  const [expandedCme, setExpandedCme] = useState(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setProductLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
        Ophthalmic<span className="pc-hero-gold"> Supplies and </span><br />Equipment
          </h1>
          <p className="pc-hero-desc">
           Dr. V once said, “Modern technology combined with spiritual consciousness is the need of the day.” Aurolab was established with the spirit of service and consciousness. What began with the indigenous manufacture of intraocular lenses (IOLs) at affordable prices, helped countless patients regain their sight either, has grown into a global mission. Today, Aurolab manufactures a wide range of ophthalmic products, supplies, and equipment that are distributed across the world to 120 nations. “Over the past year, Aurolab has launched several new products and expanded its infrastructure to include a new spectacle frame division and an eye-drop manufacturing facility. The daily production capacity has now reached 120,000 eye-drop bottles.
          </p>

        </div>
      </section>

      {/* ══ SECTION 2: INFRASTRUCTURE DEVELOPMENT ══ */}
      <section className="pc-section pc-infra-section" id="infrastructure">
        <div className="pc-section-inner">
          <h2 className="pc-section-title"><span className="pc-gold">Infrastructure Development</span></h2>
          
          <CardCarousel items={INFRA_CARDS} expandedId={expandedInfra} onToggle={(id) => setExpandedInfra((prev) => (prev === id ? null : id))} />
        </div>
      </section>

      {/* ══ SECTION 3: NEW PRODUCTS ══ */}
      <section className="pc-section" id="products">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">New<span className="pc-gold"> Products</span></h2>
          <div className="pc-cards-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", alignItems: "start", marginTop: 32 }}>
            {PRODUCT_CARDS.map((card, i) => (
              <ProductCard
                key={card.id}
                card={card}
                isOpen={expandedProduct === card.id}
                onToggle={() => setExpandedProduct((prev) => (prev === card.id ? null : card.id))}
                onImageClick={() => setProductLightbox(i)}
              />
            ))}
          </div>
        </div>

        {productLightbox !== null && (
          <div className="photo-lightbox-overlay" onClick={() => setProductLightbox(null)}>
            <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
              <button className="photo-lightbox-close" onClick={() => setProductLightbox(null)}>&#10005;</button>
              <button
                className="photo-lightbox-arrow photo-lightbox-prev"
                onClick={() => setProductLightbox(((productLightbox - 1) + PRODUCT_CARDS.length) % PRODUCT_CARDS.length)}
              >&#8592;</button>
              <div className="photo-lightbox-img-wrap">
                <img
                  src={PRODUCT_CARDS[productLightbox].image}
                  alt={PRODUCT_CARDS[productLightbox].title}
                  className="photo-lightbox-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.target.style.opacity = "0"; }}
                />
              </div>
              <p className="photo-lightbox-caption">{PRODUCT_CARDS[productLightbox].full}</p>
              <button
                className="photo-lightbox-arrow photo-lightbox-next"
                onClick={() => setProductLightbox((productLightbox + 1) % PRODUCT_CARDS.length)}
              >&#8594;</button>
            </div>
          </div>
        )}
      </section>

      {/* ══ SECTION 4: CMEs, TRAINING PROGRAMMES & CONFERENCES ══ */}
<section className="pc-section pc-infra-section" id="training">
  <div className="pc-section-inner">
    <h2 className="pc-section-title">Conferences <span className="pc-gold">& Scientific Engagements</span></h2>
    <p className="pc-section-body">
      The Aurolab team conducted and participated in 74 scientific and business events across India, including hospital-based CMEs, national, regional, specialty and state conferences. The team also organised 24 Wet and Dry Lab stations, supporting hands-on surgical training with consumables and equipment. In addition, 42 scientific sessions featured renowned ophthalmologists and leading national experts sharing surgical experiences, clinical outcomes, product applications and innovations from Aurolab's portfolio.
    </p>
    <CardCarousel items={CME_CAROUSEL} expandedId={expandedCme} onToggle={(id) => setExpandedCme((prev) => (prev === id ? null : id))} />
  </div>
</section>


      {/* ══ SECTION 5: NATIONAL & INTERNATIONAL CONFERENCES ══ */}
      <section className="pc-section" id="conferences">
        <div className="pc-section-inner">
          <div className="pc-section-tag">Conferences</div>
          <h2 className="pc-section-title">Aurolab at Various <span className="pc-gold">National & International Ophthalmic Conferences</span></h2>
          <PhotoCarousel items={CONFERENCE_GALLERY} />
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="7_AR_Lr_ Aurolab_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/research">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">Research</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/auroitech">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Information & Technology</span>
        </Link>
      </nav>

    </div>
  );
}