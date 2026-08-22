import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/research.css";

const HERO_IMAGE    = "research  1080x1920.webp ";
const HERO_FALLBACK = "/VANNIARAJAN SIR LAB (34).webp";

/* ══════════════════════════════════════
   AI / KEYWORD SEARCH KNOWLEDGE BASE
══════════════════════════════════════ */
const KNOWLEDGE_BASE = [
  { tag: "Infrastructure", title: "STELLARIS STED Confocal Microscope", keywords: ["stellaris", "sted", "confocal", "exosomes", "resolution"], text: "The high spatial resolution of the Leica STELLARIS STED allows researchers to track exosomes at the single-vesicle level, providing a clearer understanding of their localisation in tissue, uptake, and stability. It also has an extended detection range of up to 850 nm, enabling separation of a wider range of spectrally overlapping fluorophores." },
  { tag: "Infrastructure", title: "Beckman  CytoFLEX Flow Cytometer", keywords: ["cytoflex", "flow cytometer", "vssc", "extracellular vesicles"], text: "The Beckman CytoFLEX flow cytometer, equipped with the Violet Side Scatter (VSSC) option, can be used for the measurement of extracellular vesicles, allowing characterisation of sub-micron particles." },
  { tag: "Infrastructure", title: "Dr. P. Namperumalsamy Regional Research Centre", keywords: ["regional research centre", "coimbatore", "namperumalsamy", "tirunelveli", "pondicherry"], text: "AMRF opened its third Regional Research Centre at Aravind-Coimbatore on 27th August 2025, named the 'Dr. P. Namperumalsamy Regional Research Centre' in honour of the concept's founder." },
  { tag: "Conference", title: "Workshop on Extracellular Vesicles", keywords: ["workshop", "extracellular vesicles", "october 2025", "ntda", "western blotting"], text: "A three-day workshop on 'Extracellular Vesicles: Biology and Applications' (6-8 October 2025) brought together faculty, PhD scholars and M.Sc. students from 11 institutes across Tamil Nadu, Karnataka and Telangana." },
  { tag: "Conference", title: "Mini Symposium on Eye Health and Diabetes", keywords: ["symposium", "diabetes", "march 2026"], text: "A mini symposium on Eye Health and Diabetes (30th March 2026) offered Master's students an in-depth understanding of the links between diabetes and eye disorders." },
  { tag: "PhD", title: "PhDs Awarded 2025-26", keywords: ["phd", "saranya", "chowdhury", "waseema", "chadalawada"], text: "Four PhDs were awarded this year: P. Saranya and A. Waseema (Immunology & Stem Cell Biology, Alagappa University), Susmita Chowdhury (Genetics, Alagappa University) and Swathi Chadalawada (Microbiology, Madurai Kamaraj University)." },
];

/* ══════════════════════════════════════
   DATA — INFRASTRUCTURE DEVELOPMENT (3 cards)
══════════════════════════════════════ */
const INFRA_CARDS = [
  {
    id: 1, image: "DSC_4734.webp", fallbackBg: "#0d1f35",
    title: "INSTALLATION OF LEICA STELLARIS STED",
    short: "AMRF installed a Leica STELLARIS Stimulated Emission Depletion (STED) confocal microscope at a cost of about Rs.5 crores.",
    full: "The high spatial resolution allows researchers to track exosomes at the single-vesicle level, providing a much clearer understanding of their localisation in tissue, uptake, and stability. In addition, the STELLARIS STED has an extended detection range of up to 850 nm, enabling the separation of a wider range of spectrally overlapping fluorophores and thereby facilitating the analysis of marker expression at the cellular and tissue levels.",
  },
  {
    id: 2, image: "DSC_7042.webp", fallbackBg: "#1a2d0d",
    title: "ADDITON OF A FLOW CYTOFLEX",
    short: "A new flow cytometer was added to the lab for the measurement and characterisation of extracellular vesicles.",
    full: "The Beckman CytoFLEX flow cytometer, equipped with the Violet Side Scatter (VSSC) option, can be used for the measurement of extracellular vesicles. This instrument allows the characterisation of sub-micron particles and is extremely useful for the functional characterisation of extracellular vesicles.",
  },
  {
    id: 3, image: "2025_8_CBE_Dr.PN Regional Reseach Centre_Inau (21).webp", fallbackBg: "#2d1a0d",
    title: "INAUGURATION OF DR. P. NAMPERUMALSAMY REGIONAL RESEARCH CENTRE",
    short: "AMRF opened its third Regional Research Centre (RRC) at Aravind-Coimbatore on 27th August 2025.",
    full: "The concept of RRC was initiated under the visionary leadership of Dr. P. Namperumalsamy, Chairman Emeritus, AECS, to encourage greater involvement of clinician-scientists in research. Although he passed away a month before the inauguration, the event was held on the very date he had chosen, making it a fitting tribute to his legacy. In honour of his lifelong commitment to advancing eye care through research, the new centre has been named the 'Dr. P. Namperumalsamy Regional Research Centre'. Last year, new projects were initiated across all RRC's, supported by Indian and international funding agencies",
  },
];

/* ══════════════════════════════════════
   DATA — CONFERENCES / WORKSHOPS (2 cards)
══════════════════════════════════════ */
const CONFERENCE_CARDS = [
  {
    id: 1, image: "2025_10_AMRF_Extracellular Vesicles Biology and Applications Worksop (3).webp", fallbackBg: "#0d2d3a",
    title: "WORKSHOP ON “EXTRACELLULAR VESICLES: BIOLOGY AND APPLICATIONS”",
    short: "6-8 October 2025 — A three-day workshop for faculty, PhD scholars and M.Sc. students.",
    full: "The three-day workshop brought together faculty members, Ph.D. scholars, and M.Sc. students, representing 11 institutes from Tamil Nadu, Karnataka, and Telangana. The workshop provided extensive hands-on training on the isolation of EVs from plasma and commercial milk using ultracentrifugation. Participants also learned EV characterisation using Nanoparticle Tracking Analysis (NTA), protein isolation and profiling by SDS-PAGE, and marker evaluation through Western blotting. In addition, a demonstration session was held on mass spectrometry for EV proteomic analysis. Participants also witnessed live demonstrations of how these technologies can be applied to EV research.",
  },
  {
    id: 2, image: "2026_3_AMRF_MiniSymposium on Eye Health and Diabetes (9).webp", fallbackBg: "#3b2511",
    title: "MINI SYMPOSIUM ON EYE HEALTH AND DIABETES",
    short: "30th March 2026 — Designed for Master's students in Life Sciences, Biotechnology, and Pharmaceutical Sciences.",
    full: "The symposium offered an in-depth understanding of the critical links between diabetes and eye disorders, along with current and emerging clinical perspectives, while emphasising the importance of preventing eye complications associated with diabetes. The symposium was attended by PG students from various institutions in and around Madurai, Karaikudi, and Krishnankoil.",
  },
];

/* ══════════════════════════════════════
   DATA — PhD AWARDED (4 people, single card style)
══════════════════════════════════════ */
const PHD_CARDS = [
  { id: 1, image: "Saranya.P    54214 (2).webp", name: "P. Saranya", dept: "Immunology and Stem Cell Biology", thesis: "Characterisation of adult human lens epithelial stem cells in the maintenance of tissue homeostasis and their functional status in cataractous lens", guide: "Dr. Gowri Priya Chidambaranathan", university: "PhD awarded by Alagappa University" },
  { id: 2, image: "Susmita Chowdhury (2).webp", name: "Susmita Chowdhury", dept: "Genetics", thesis: "Molecular genetics of juvenile X-linked retinoschisis in South Indian population", guide: "Dr. P. Sundaresan", university: "PhD awarded by Alagappa University" },
  { id: 3, image: "Waseema.webp", name: "A. Waseema", dept: "Immunology and Stem Cell Biology", thesis: "Identification, characterisation and maintenance of stem cells in adult human retinal pigment epithelium", guide: "Dr. Gowri Priya Chidambaranathan", university: "PhD awarded by Alagappa University" },
  { id: 4, image: "Untitled design.webp", name: "Swathi Chadalawada", dept: "Microbiology", thesis: "Identification of dysregulated microRNAs in ocular fluids as diagnostic markers for intraocular tuberculosis", guide: "Dr. D. Bharanidharan", university: "PhD awarded by Madurai Kamaraj University" },
];

/* ══════════════════════════════════════
   COMPONENTS
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
          placeholder="Ask about AMRF research — e.g. STED, CytoFLEX, PhDs, workshops"
        />
        {searched && (
          <button className="ai-close-btn" style={{ borderRadius: 0, borderTop: "none", borderBottom: "none", minHeight: 50 }} onClick={handleClear}>&#10005;</button>
        )}
        <button className="ai-search-btn" onClick={handleSearch} disabled={!query.trim()}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <div className="ai-answer-box" style={{ borderLeft: "4px solid #c8921a", background: "#fffbf2" }}>
          <p className="ai-answer-text" style={{ color: "#555" }}>
            No direct match in this report. Try asking about infrastructure, workshops, or PhDs.
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

/* Expandable card — image + title + short + read more (same visual language as Highlights.jsx) */
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
              <img src={card.image} alt={card.title} className="photo-lightbox-img" onError={(e) => { e.target.style.opacity = "0"; }} />
            </div>
            <p className="photo-lightbox-caption">{card.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

function PhdCard({ person }) {
  return (
    <div className="phd-card">
      <div className="phd-card-img-wrap">
        <img src={person.image} alt={person.name} className="phd-card-img" onError={(e) => { e.target.style.opacity = "0"; }} />
      </div>
      <div className="phd-card-body">
        <h4 className="phd-card-name">{person.name}</h4>
        <span className="phd-card-dept">{person.dept}</span>
        <p className="phd-card-thesis">&ldquo;{person.thesis}&rdquo;</p>
        <p className="phd-card-meta">Guide: {person.guide}</p>
        <p className="phd-card-meta phd-card-university">{person.university}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Research() {
  const heroRef = useRef(null);

  const [expandedInfra, setExpandedInfra] = useState(null);
  const [expandedConf, setExpandedConf] = useState(null);

  return (
    <div className="pc-page">

      {/* ══ HERO ══ */}
      <section className="pc-hero" ref={heroRef}>
        <div className="pc-hero-bg pc-hero-bg-desktop" style={{ backgroundImage: `url('${"research  1080x1920.webp"}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-bg pc-hero-bg-mobile" style={{ backgroundImage: `url('${"research-mobile.webp"}'), url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-overlay" />
        <div className="pc-hero-content">
          <div className="pc-hero-tag">
          </div>
          <h1 className="pc-hero-title">
            Research
          </h1>
          <p className="pc-hero-desc">
           As Dr. V said, “To see all as one; to give sight for all,” AMRF’s core activities reflect a journey toward providing vision for all, with the aim of exploring the possibilities of curing eye diseases through research. Last year, AMRF undertook major research initiatives, including the use of extracellular vesicles as precision medicine and the development of AI-based panel for the prediction of onset and progression of Glaucoma. These projects, initiated with funding from Indian Council of Medical Research, have taken of well. The institute will be in a position to employ these findings in the clinical settings soon. In addition, several new facilities for the molecular-level analysis of ocular diseases have been established with support from both government and private funding agencies.</p>
        </div>
      </section>
      {/* ══ SECTION: INFRASTRUCTURE DEVELOPMENT ══ */}
      <section className="pc-section pc-infra-section" id="infrastructure">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Infrastructure <span className="pc-gold">Development</span></h2>
          <div className="pc-cards-grid" style={{ marginTop: 32 }}>
            {INFRA_CARDS.map((card) => (
              <InitiativeCard
                key={card.id}
                card={card}
                isOpen={expandedInfra === card.id}
                onToggle={() => setExpandedInfra((prev) => (prev === card.id ? null : card.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION: CONFERENCES / WORKSHOPS ══ */}
      <section className="pc-section" id="conferences">
        <div className="pc-section-inner">
        <h2 className="pc-section-title"> Conferences/<span className="pc-gold">Workshops</span></h2>
          <div className="pc-cards-grid" style={{ marginTop: 32, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {CONFERENCE_CARDS.map((card) => (
              <InitiativeCard
                key={card.id}
                card={card}
                isOpen={expandedConf === card.id}
                onToggle={() => setExpandedConf((prev) => (prev === card.id ? null : card.id))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION: PhD AWARDED ══ */}
      <section className="pc-section pc-infra-section" id="phd">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">PhD <span className="pc-gold">Awarded</span></h2>
          <div className="phd-grid" style={{ marginTop: 32 }}>
            {PHD_CARDS.map((person) => <PhdCard key={person.id} person={person} />)}
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="06_AR_Lr_AMRF_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/laico">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">LAICO</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/aurolab">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Ophthalmic Supplies and Equipment</span>
        </Link>
      </nav>

    </div>
  );
}