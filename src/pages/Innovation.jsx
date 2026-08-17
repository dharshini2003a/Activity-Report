import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/innovation.css";

/* Replace with the real hero photo path once available */
const HERO_IMAGE = "Inovations 1080x1920.webp";

/* ══════════════════════════════════════
   DATA — INFRASTRUCTURE (Eyedeas Lab gallery)
══════════════════════════════════════ */
const INFRA_GALLERY = [
  {
    id: 1, image: "2005_6_MDU_Eyedeas Lab_Inauguration (6).webp", fallbackBg: "#0d1f35",
    caption: "R.D. Sriram Inaugurating the Eyedeas Lab at LAICO, Madurai, on 28th June 2025.",
  },
  {
    id: 2, image: "2005_6_MDU_Eyedeas Lab_Inauguration (12).webp", fallbackBg: "#1a2d0d",
    caption: "Ceremonial lamp lighting at the Eyedeas Lab inauguration.",
  },
  {
    id: 3, image: "2005_6_MDU_Eyedeas Lab_Inauguration (48).webp", fallbackBg: "#2d1a0d",
    caption: "Senior leadership along with doctors and eyedeas lab technicians during the inaugural occasion.",
  },
];

/* ══════════════════════════════════════
   DATA — FROM IDEA TO REALITY (Product Development)
   Photo-gallery format — same style as the Infrastructure gallery
══════════════════════════════════════ */
const PRODUCT_GALLERY = [
  {
    id: 1, image: "Eyemount 360 (2).webp", fallbackBg: "#0d1f35",
    title: "Eye Mount 360",
    caption: "Officially launched in collaboration with the LVPEI BioNEST Incubator at AIOS 2026, Jaipur; a patent application was filed.",
    full: "Eye Mount 360 was officially launched in collaboration with LVPEI BioNEST Incubator, during the 84th Annual Conference of the All India Ophthalmological Society (AIOS 2026) held in Jaipur on 12–15 March 2026, and a patent application was filed.",
  },
  {
    id: 2, image: "Kerascan (3).webp", fallbackBg: "#1a2d0d",
    title: "KeraScan",
    caption: "A portable, low-cost, webcam-based keratoconus screening device enabling early detection in high-risk populations.",
    full: "KeraScan, a portable keratoconus screening device, emerged as one of the flagship developments. Originally conceived through a clinical collaboration led by Dr. Anitha Karthikeyan, Johns Hopkins University, the concept was transformed by Eyedeas Lab into a portable, low-cost, webcam-based Placido disc corneal topographer. Through engineering redesign, 3D printing, and rapid prototyping, the device became suitable for community-based and paediatric screening, enabling early detection of keratoconus in high-risk populations.",
  },
  {
    id: 3, image: "Product_GonioGlobe.webp", fallbackBg: "#2d1a0d",
    title: "GonioGlobe",
    caption: "A structured gonioscopy training and simulation model with interchangeable iris-angle plates for repeated, risk-free practice.",
    full: "Another significant innovation was GonioGlobe, a structured gonioscopy training and simulation model. Recognising the challenges associated with learning this highly subjective clinical skill, ACEi developed an affordable silicone eye model with interchangeable iris-angle plates that simulate normal and pathological angle configurations. The model enables repeated, risk-free practice for residents, fellows, and glaucoma surgeons while standardising training for angle-based procedures.",
  },
  {
    id: 4, image: "Product_AScanProbeHolder.webp", fallbackBg: "#0d2d3a",
    title: "A-Scan Probe Holder",
    caption: "A 3D-printed holder that securely holds the probe after use, preventing cable interference and accidental damage.",
    full: "ACEi also developed practical solutions to improve clinical workflow and patient care. The A-Scan Probe Holder, designed using 3D printing technology, addressed operational issues by securely holding the probe after use while preventing cable interference and accidental damage.",
  },
  {
    id: 5, image: "Product_LIDORA.webp", fallbackBg: "#3a2d0d",
    title: "LIDORA Eye Ointment Applicator",
    caption: "Helps elderly patients, children, and individuals with limited dexterity apply ophthalmic ointments safely and hygienically.",
    full: "The LIDORA Eye Ointment Applicator was designed to help elderly patients, children, and individuals with limited dexterity apply ophthalmic ointments safely, accurately, and hygienically.",
  },
  {
    id: 6, image: "Product_ProstheticEye.webp", fallbackBg: "#1a1a35",
    title: "3D-Printed Prosthetic Eye",
    caption: "Prototype refinements continued with improved iris printing, enhanced colouring, and transparent resin coatings.",
    full: "Prototype refinements also continued for the 3D-Printed Prosthetic Eye, incorporating improved iris printing techniques, enhanced colouring, and transparent resin coatings to achieve a more realistic appearance.",
  },
  {
    id: 7, image: "Product_WaterManagement.webp", fallbackBg: "#0d3a2d",
    title: "Water Management System",
    caption: "An ultrasonic flow-meter-based monitoring system with dashboard integration for accurate, traceable water measurement.",
    full: "Operational innovation remained another important focus area. Improvements to the Water Management System included the development of an ultrasonic flow-meter-based monitoring system with dashboard integration, enabling accurate water measurement, enhanced traceability, and improved system reliability.",
  },
  {
    id: 8, image: "Slitlamp Sensor.webp", fallbackBg: "#2d0d35",
    title: "Slit Lamp Sensor",
    caption: "A LiDAR-based plug-and-play device that automatically controls slit lamp illumination based on clinician presence.",
    full: "Development also progressed on the Slit Lamp Sensor, a LiDAR-based plug-and-play device that automatically controls slit lamp illumination based on clinician presence, improving energy efficiency and workflow without requiring modifications to existing equipment.",
  },
];

/* ══════════════════════════════════════
   DATA — EVENTS
══════════════════════════════════════ */
const EVENT_CARDS = [
  {
    id: 1, image: "3d class.webp", fallbackBg: "#0d1f35",
    title: "3D DESIGN & PRINTING TRAINING PROGRAMME",
    short: "A two-week programme for six Instrumentation interns, held 2–13 September 2025, covering 3D design, printing, and CAD.",
    full: "A two-week training programme on 3D Design and Printing was conducted for six Instrumentation (Biomedical Engineering) interns, providing hands-on experience in 3D design, printing, and printer operation. The training covered the fundamentals of 3D printer operation, printer usage and maintenance, the PrusaSlicer application, CAD design using Autodesk Fusion 360, and the use of Vernier calipers. The programme supports the vision of establishing Eyedeas Labs across all Aravind Eye Hospitals by strengthening in-house capabilities in 3D design, rapid prototyping, and innovation.",
  },
  {
    id: 2, image: "Hackathon.webp", fallbackBg: "#1a2d0d",
    title: "HACKATHON 2026",
    short: "Held at Aravind-Pondicherry, 2–4 January 2026 — 27 challenges shortlisted from 169 problem statements and 260 applications.",
    full: "The Hackathon 2026, conducted at Aravind-Pondicherry brought together doctors, engineers, and students to solve clinical, surgical, patient care, and training challenges. From 169 problem statements, 27 challenges were shortlisted, attracting 260 applications from nine institutions. Winning teams received prizes of up to Rs. 50,000, while several promising ideas progressed toward prototype development through mentorship from ACEi.",
  },
];

/* ══════════════════════════════════════
   DATA — AIIA AWARDS
══════════════════════════════════════ */
const AWARD_CARDS = [
  {
    id: 1, image:"Award_TLT.webp", fallbackBg: "#0d1f35", rank: "Top Award",
    title: "Time Lapse Tomography (TLT)",
    short: "Received the top award at the AIIA 2026 ceremony held at Aravind-Pondicherry.",
    full: "The Time Lapse Tomography (TLT) project received the top award at the Aravind Inspiring Innovator Award (AIIA) 2026 ceremony, held at Aravind-Pondicherry, recognising it as the year's most outstanding innovation from across the organisation.",
  },
  {
    id: 2, image: "Award_IOFA.webp", fallbackBg: "#1a2d0d", rank: "First Runner-Up",
    title: "Intraoperative Fluorescein Angiography (IOFA)",
    short: "Secured the first runner-up position at the AIIA 2026 awards ceremony.",
    full: "Intraoperative Fluorescein Angiography (IOFA) secured the first runner-up position at the Aravind Inspiring Innovator Award (AIIA) 2026 ceremony, held at Aravind-Pondicherry.",
  },
  {
    id: 3, image: "Award_LIDORA_Lazeyetrack.webp", fallbackBg: "#2d1a0d", rank: "Second Runner-Up",
    title: "LIDORA & Lazeyetrack",
    short: "Jointly recognised as second runner-up innovations at the AIIA 2026 ceremony.",
    full: "LIDORA and Lazeyetrack were jointly recognised as second runner-up innovations at the Aravind Inspiring Innovator Award (AIIA) 2026 ceremony, held at Aravind-Pondicherry, highlighting the diversity and quality of innovations emerging from clinicians and trainees across Aravind.",
  },
];

/* Expandable card with click-to-preview lightbox — same pattern used across the site */
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
          {card.rank && <span className="pc-card-rank">{card.rank}</span>}
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

/* Carousel gallery — left/right arrows + dot pagination */
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
                    style={{ opacity: 0, transition: "opacity 0.35s ease, transform 0.4s ease" }}
                    onLoad={(e) => { e.target.style.opacity = "1"; }}
                    onError={(e) => { e.target.style.opacity = "0"; }}
                  />
                  <div className="photo-card-overlay">
                    <span className="photo-card-zoom">&#9654; View</span>
                  </div>
                </div>
                <div className="photo-card-caption">
                  {item.title && <span className="photo-card-caption-title">{item.title}</span>}
                  {item.caption}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow carousel-arrow-right" onClick={() => goTo(activeIndex + 1)} aria-label="Next">&#8594;</button>
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
            <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
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
            <p className="photo-lightbox-caption">
              {items[lightbox].title && <strong>{items[lightbox].title}<br /></strong>}
              {items[lightbox].full || items[lightbox].caption}
            </p>
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
export default function Innovation() {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [expandedAward, setExpandedAward] = useState(null);

  return (
    <div className="pc-page">

      {/* ══ HERO — full-bleed background image ══ */}
      <section className="inno-hero">
        <div className="inno-hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="inno-hero-overlay" />
        <div className="inno-hero-content">
          <div className="inno-hero-tag">
           
          </div>
          <h1 className="inno-hero-title">
            Innovation
          </h1>
          <p className="inno-hero-desc">
            As per the words of Dr. V, <strong>&ldquo;Much has been done, but much remains to be done&hellip;.&rdquo;</strong> Innovation has always been an integral part of Aravind, driving more and more improvements in patient care, service delivery, and operational excellence. Building on this legacy, the Aravind Centre for Eye Care Innovation (ACEi) has continued to strengthen its role as Aravind's dedicated platform since 2018. It functions as a catalyst in nurturing ideas, translating clinical challenges into practical solutions, and fostering a culture of innovation across the organisation.
          </p>
        </div>
      </section>

      {/* ══ SECTION 1: INFRASTRUCTURE DEVELOPMENT ══ */}
      <section className="pc-section pc-infra-section" id="infrastructure">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Infrastructure Development</h2>
          <p className="pc-section-body">
            Eyedeas Lab, a dedicated environment for ideation, rapid prototyping, product development, and collaborative innovation, was set up at LAICO building and inaugurated on 28th June 2025. Established under the Empowering ACEi Project, the lab significantly enhanced ACEi's capacity to transform innovative concepts into affordable, scalable, and clinically relevant solutions. Preparations began for establishing the EYERIS Lab, the innovations lab, at Aravind-Chennai — technical staff underwent intensive one-month training at the Eyedeas Lab and Aurolab to strengthen in-house expertise in product design, engineering, and prototyping.
          </p>
          <PhotoCarousel items={INFRA_GALLERY} />
        </div>
      </section>

      {/* ══ SECTION 2: FROM IDEA TO REALITY (PRODUCT DEVELOPMENT) ══ */}
      <section className="pc-section" id="product-development">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">From Idea to <span className="pc-gold">Reality</span></h2>
          <p className="pc-section-body">
            Several innovative products advanced substantially during the year, moving from concept to prototype and, in some cases, to formal launch.
          </p>
          <PhotoCarousel items={PRODUCT_GALLERY} />
        </div>
      </section>

      {/* ══ SECTION 3: EVENTS ══ */}
      <section className="pc-section pc-infra-section" id="events">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Events </h2>
          <div className="pc-cards-grid pc-cards-grid-2">
            {EVENT_CARDS.map((card) => (
              <InitiativeCard
                key={card.id}
                card={card}
                isOpen={expandedEvent === card.id}
                onToggle={() => setExpandedEvent((prev) => (prev === card.id ? null : card.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: ARAVIND INSPIRING INNOVATOR AWARD (AIIA) ══ */}
      <section className="pc-section" id="aiia">
        <div className="pc-section-inner">
          <div className="pc-section-tag">Recognition</div>
          <h2 className="pc-section-title">Aravind Inspiring Innovator Award <span className="pc-gold">(AIIA)</span></h2>
          <p className="pc-section-body">
            The culture of innovation was further strengthened through the Aravind Inspiring Innovator Award (AIIA) 2026, which recognised outstanding innovations from across the organisation. At the awards ceremony held at Aravind-Pondicherry, the Time Lapse Tomography (TLT) project received the top award, while Intraoperative Fluorescein Angiography (IOFA) secured the first runner-up position. LIDORA and Lazeyetrack were jointly recognised as second runner-up innovations, highlighting the diversity and quality of innovations emerging from clinicians and trainees across Aravind.
          </p>
          <div className="pc-cards-grid">
            {AWARD_CARDS.map((card) => (
              <InitiativeCard
                key={card.id}
                card={card}
                isOpen={expandedAward === card.id}
                onToggle={() => setExpandedAward((prev) => (prev === card.id ? null : card.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="10_Aravind Centre for Eye Care Innovation (ACEi)-1.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/employee-empowerment">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">Employee Empowerment</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/recognitions">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Awards & Recognition</span>
        </Link>
      </nav>

    </div>
  );
}