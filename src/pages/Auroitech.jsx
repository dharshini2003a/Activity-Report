import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/auroitech.css";

const HERO_IMAGE    = "AUroitech 1080x1920.webp";
const HERO_FALLBACK = "/Highlights_Hero.jpg";

/* ══════════════════════════════════════
   AI / KEYWORD SEARCH KNOWLEDGE BASE
══════════════════════════════════════ */
const KNOWLEDGE_BASE = [
  { tag: "Overview", title: "Information Technology Division", keywords: ["it division", "dr v", "information technology", "digital ecosystem", "software"], text: "Guided by Dr. V\u2019s vision that Information Technology, if deployed rightly, would play a major role in the betterment of society, the Information Technology Division enables Aravind to deliver seamless, patient-centred service delivery, making eye care more accessible and hassle-free." },
  { tag: "Overview", title: "Beyond Aravind \u2014 Auroitech's Impact", keywords: ["auroitech", "customised software", "digital applications", "hospitals", "healthier society"], text: "Extending its impact beyond Aravind, the division supports eye care providers by developing and implementing customised software solutions and digital applications tailored to the unique needs of each hospital, helping build a robust digital ecosystem that enhances the quality, efficiency, and accessibility of eye care." },
  { tag: "New Initiatives", title: "Dhrishti Mobile Pre-Registration", keywords: ["dhrishti", "mobile app", "pre-registration", "wait times", "paperwork"], text: "Dhrishti, Aravind\u2019s patient care mobile app, now features a new mobile pre-registration option, enabling patients to pre-register via their phones, reducing wait times, eliminating paperwork, and streamlining the registration process." },
  { tag: "New Initiatives", title: "Promotion Desks & Client Growth", keywords: ["promotion desks", "mrd", "tertiary centres", "theni", "10 clients", "21 clients", "eyenotes"], text: "Promotion desks were set up at all tertiary centres and Aravind-Theni to increase app uptake, managed by MRD teams and IT staff. During the last year, Auroitech onboarded 10 unique clients across 14 locations, bringing the total to 21, with eyeNotes contributing significantly to patient safety and efficiency." },
  { tag: "Projects", title: "Aravind-Orbis Novel Outreach Project (CARE)", keywords: ["care project", "orbis", "pondicherry", "onsight", "outreach", "february 2026"], text: "Aravind-Pondicherry launched the CARE Project on 14th February 2026 with support from Orbis International, a three-year pilot using tablets with the OnSight application developed by Auroitech, functioning offline and integrated with portable diagnostic devices to strengthen community-based screening." },
  { tag: "Projects", title: "CARE Project \u2014 Coverage & Progress", keywords: ["care project coverage", "25%", "100%", "1560 patients", "10 pilot camps"], text: "The CARE Project targets expansion from 25% outreach camp coverage in the first year to 100% coverage across all Pondicherry service areas by the third year. As of March 2026, 10 pilot camps had been conducted, screening a total of 1,560 patients." },
  { tag: "Conferences", title: "VC EyeNotes Re-Orientation Training", keywords: ["vc eyenotes", "tnsbcs", "vision centres", "chandrakumar", "web vcms"], text: "A one-day re-orientation training on the transition from Web VCMS to VC EyeNotes was organised at Aravind Madurai, Salem, and Chennai on 26th, 29th, and 30th July 2025, for the 35 Vision Centres run by the Government of Tamil Nadu State Blindness Control Society." },
  { tag: "Conferences", title: "Faculty Development Workshop", keywords: ["faculty development workshop", "emerging technologies", "ai", "cybersecurity", "august 2025"], text: "Auroitech organised a Faculty Development Workshop on 9-10 August 2025 for faculty and Heads of Departments from various institutions, covering AI & Machine Learning in Healthcare, Cybersecurity, Data-driven Decision Making, and Emerging Technologies in Public Health & Medical Imaging." },
];

/* ══════════════════════════════════════
   DATA — CONFERENCES / WORKSHOPS CONDUCTED
══════════════════════════════════════ */
const CONFERENCE_CARDS = [
  {
    id: 1, image: "2025_7_MDU_Teleophth.Network  Software_Training  (1).webp", fallbackBg: "#0d1f35",
    title: "Re-Orientation Training on VC EyeNotes for Government of Tamil Nadu Vision Centres",
    short: "A one-day re-orientation programme on the transition from Web VCMS to VC EyeNotes, held across three Aravind centres in July 2025.",
    full: "The Government of Tamil Nadu State Blindness Control Society (TNSBCS), in collaboration with Aravind, has been running 35 Vision Centres since 2019. Aravind provides ongoing technical support in the form of orientation, training, and software implementation. As part of continuous follow-up, a one-day re-orientation training programme was organised at three Aravind Eye Hospitals in Madurai, Salem, and Chennai, on 26th, 29th, and 30th July 2025 respectively, under the direction of Dr. S. V. Chandrakumar, Associate Professor of Ophthalmology and Project Director, TNSBCS, Chennai. The main objective of the training was to familiarise participants with the new platform transition from Web VCMS to VC EyeNotes and to provide hands-on training.",
  },
  {
    id: 2, image: "2025_8_Auroitech_AI Cybersecurity & Emerging Technologies (4).webp", fallbackBg: "#1a2d0d",
    title: "Faculty Development Workshop on Emerging Technologies",
    short: "A two-day workshop for faculty and HoDs from various institutions on AI, Cybersecurity, and other emerging technologies in healthcare.",
    full: "Aravind, through its Auroitech, organised a Faculty Development Workshop on 9-10 August 2025 for faculty members and Heads of Departments from various esteemed educational institutions. The workshop aimed to bridge the gap between academia and industry by introducing real-world applications of Artificial Intelligence, Cybersecurity, and other emerging technologies. It equipped participants with insights to mentor students more effectively and align academic learning with evolving industry needs. Highlights included sessions on AI & Machine Learning in Healthcare, Cybersecurity, Data-driven Decision Making, and Emerging Technologies in Public Health & Medical Imaging. Faculty also explored real-time healthcare applications and discussed opportunities for curriculum integration and collaborative research.",
  },
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
          placeholder="Ask about Auroitech — e.g. Dhrishti, CARE Project, VC EyeNotes, Faculty Workshop"
        />
        {searched && (
          <button className="ai-close-btn" style={{ borderRadius: 0, borderTop: "none", borderBottom: "none", minHeight: 50 }} onClick={handleClear}>&#10005;</button>
        )}
        <button className="ai-search-btn" onClick={handleSearch} disabled={!query.trim()}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <div className="ai-answer-box" style={{ borderLeft: "4px solid #c8921a", background: "#fffbf2" }}>
          <p className="ai-answer-text" style={{ color: "#555" }}>
            No direct match in this report. Try asking about Dhrishti, the CARE Project, VC EyeNotes, or the Faculty Development Workshop.
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

/* Expandable card — same visual language as Highlights, with click-to-preview lightbox */
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

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Auroitech() {
  const heroRef = useRef(null);
  const [expandedConference, setExpandedConference] = useState(null);

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
             Information <span className="pc-hero-gold">Technology</span><br />
            
          </h1>
          <p className="pc-hero-desc">
            Dr. V once said, &ldquo;Information Technology is very powerful and, if deployed rightly, would play a major role in the betterment of our society.&rdquo; Guided by this vision, the Information Technology Division enables Aravind to deliver seamless, patient-centred service delivery, making eye care more accessible and hassle-free.
            Extending its impact beyond Aravind, the division also supports eye care providers by developing and implementing customised software solutions and digital applications tailored to the unique needs of each hospital. Through these innovations, the division is helping build a robust digital ecosystem that enhances the quality, efficiency, and accessibility of eye care, contributing to a healthier society.
          </p>
        </div>
      </section>
      {/* ══ SECTION: NEW INITIATIVES ══ */}
      <section className="pc-section" id="new-initiatives">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Simplifying Care with <span className="pc-gold">Digital Access</span></h2>
          <p className="pc-section-body">
            Dhrishti, Aravind&rsquo;s patient care mobile app, now features a new mobile pre-registration option, enabling patients to pre-register via their phones, reducing wait times, eliminating paperwork, and streamlining the registration process. To further promote patient use, promotion desks have been set up at all tertiary centres, as well as at Aravind-Theni, to increase the uptake of the application. Managed by the MRD teams and IT staff, these desks assist patients in downloading and using the app. During the last year, Auroitech onboarded a total of 10 unique clients across 14 locations, bringing the total number of clients to 21. Through eyeNotes, Auroitech contributes significantly to increased patient safety and improved efficiency across these hospitals.
          </p>
        </div>
      </section>

      {/* ══ SECTION: PROJECTS ══ */}
      <section className="pc-section pc-infra-section" id="projects">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Aravind-Orbis <span className="pc-gold">Novel Outreach Project</span></h2>
          <p className="pc-section-body">
            Aravind-Pondicherry launched the CARE Project on 14th February 2026 with support from Orbis International as a three-year pilot initiative to develop a novel outreach model. The project uses tablets equipped with the OnSight application developed by Auroitech, functioning offline and integrated with portable diagnostic devices to strengthen community-based screening. Using digital data management systems along with anterior and posterior segment imaging, the project aims to improve early detection, strengthen referral pathways, and ensure effective post-operative follow-up. The implementation plan targets expansion from 25% outreach camp coverage in the first year to 100% coverage across all Pondicherry service areas by the third year. As of March 2026, 10 pilot camps had been conducted, screening a total of 1,560 patients.
          </p>
        </div>
      </section>

      {/* ══ SECTION: CONFERENCES / WORKSHOPS CONDUCTED ══ */}
      <section className="pc-section" id="conferences">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Conferences &amp; <span className="pc-gold">Workshops Conducted</span></h2>
          <div
            className="pc-cards-grid"
            style={{
              marginTop: 32,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {CONFERENCE_CARDS.map((card) => (
              <div key={card.id} style={{ width: 420, maxWidth: "100%" }}>
                <InitiativeCard
                  card={card}
                  isOpen={expandedConference === card.id}
                  onToggle={() => setExpandedConference((prev) => (prev === card.id ? null : card.id))}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="8_New AR_Lr_Auro Itech_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/aurolab">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">Aurolab</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/employee-empowerment">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Employee Empowerment</span>
        </Link>
      </nav>

    </div>
  );
}