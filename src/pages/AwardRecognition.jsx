import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/awardsrecognition.css";

const HERO_IMAGE    = "awards.webp";
const HERO_FALLBACK = "/AW_Hero.jpg";

/* ══════════════════════════════════════════════════════════
   DATA — RECOGNITIONS
   Each item: title, location, date, and description.
   All cards are equal size with fixed image height.
══════════════════════════════════════════════════════════ */
const RECOGNITION_CARDS = [
  {
    id: 1, image: "NABH.webp", fallbackBg: "#0d1f35",
    title: "NABH Digital Health Standards Award",
    meta: "New Delhi • 17th September 2025",
    full: "The Aravind Eye Care System (AECS) has been recognised as the first complete group of eye hospitals to achieve the NABH Digital Health Standards at the NABH Patient Safety Conference.",
  },
  

  {
    id: 4, image: "2026_2_PDY_Honouring Farm Fest Winners copy.webp", fallbackBg: "#0d2d3a",
    title: "Farm Fest 2026",
    meta: "Pondicherry • 31st January – 1st February 2026",
    full: "The Aravind-Pondicherry Housekeeping and Gardening team secured 3rd Place Overall among 261 participating institutions at the 36th Farm Fest 2026, organised by the Department of Agriculture and Farmers' Welfare, Government of Puducherry. The team won 11 prizes across multiple garden categories.",
  },


  {
    id: 5, image: "APAO-AIOS Honors Dr. R.D. Ravindran with Holmes Lecture .webp", fallbackBg: "#3b2511",
    title: "Holmes Lecture Award",
    meta: "New Delhi • 3–6 April 2025",
    full: "Dr. R.D. Ravindran, Chairman, AECS, was honoured with the prestigious Holmes Lecture Award in recognition of his exceptional contributions to preventive ophthalmology, especially in the prevention of blindness in the Asia-Pacific region, at the 40th Asia-Pacific Academy of Ophthalmology (APAO) Congress.",
  },

  {
    id: 6, image: "Dr. Kim Ramasamy Honored with AIOS-S.S. Badrinath Endowment Award.webp", fallbackBg: "#3b2511",
    title: "the S.S. Badrinath Endowment Lecture Award",
    meta: "New Delhi • 3–6 April 2025",
    full: "Dr. R. Kim, Chief Medical Officer (CMO), Aravind-Madurai, was honoured with the S.S. Badrinath Endowment Lecture Award at the 40th Asia-Pacific Academy of Ophthalmology (APAO) Congress.",
  },

  {
    id: 7, image: "Untitled-1.webp", fallbackBg: "#241a3b",
    title: "Membership in the International Intra-Ocular Implant Club (IIIC)",
    meta: "USA • 25–28 April 2025",
    full: "Dr. Haripriya Aravind, Chief, Intraocular Lens & Cataract Services, Aravind-Chennai, has been nominated to the IIIC at the Annual Meeting of the American Society of Cataract and Refractive Surgery (ASCRS) 2025.",
  },
  {
    id: 8, image: "narendra award.webp", fallbackBg: "#0d1f35",
    title: "Special Honour at Governor's Think to Dare Series – 19",
    meta: "Chennai • 13th July 2025",
    full: "Dr. V. Narendran, CMO, Aravind-Coimbatore, was felicitated by Thiru R.N. Ravi, Governor of Tamil Nadu, at the Governor's Think to Dare Series - 19 held at Raj Bhavan, Chennai, in recognition of his invaluable service.",
  },
  {
    id: 9, image: "2025_7_TVL_IMA meeting (3).webp", fallbackBg: "#1a2d0d",
    title: "Doctors' Day Awards",
    meta: "Tirunelveli • 20th July 2025",
    full: "Dr. R. Ramakrishnan, Advisor, Aravind-Tirunelveli, and Dr. R. Meenakshi, CMO, Aravind-Tirunelveli, were honoured with Doctors' Day Awards by the Indian Medical Association (IMA).",
  },
  {
    id: 10, image: "elected Members of tn.webp", fallbackBg: "#2d1a0d",
    title: "Elected Members of Tamil Nadu Ophthalmic Association (TNOA)",
    meta: "13th August 2025",
    full: "Dr. D. Chandrasekhar, Consultant & Lead for NABH Compliance, AECS, Aravind-Coimbatore, was elected as the Honorary General Secretary of TNOA for the 2025-2028 term. Dr. M. Divya, Chief, Cataract, Cornea & Refractive Services, Aravind-Thanjavur, was elected as a Managing Committee Member of TNOA for the 2025-2028 term.",
  },
  {
    id: 10, image: "APACRS.webp", fallbackBg: "#0d2d3a",
    title: "APACRS Certified Educator Award 2025",
    meta: "Ahmedabad • 21–23 August 2025",
    full: "Dr. Haripriya Aravind received the award at the 37th Annual Meeting of the Asia-Pacific Association of Cataract and Refractive Surgeons (APACRS).",
  },
  {
    id: 11, image: "Late Shri Pushkarlal Ji & Om Prakash Ji Tibrewala Oration 2025.webp", fallbackBg: "#3b2511",
    title: "Late Shri Pushkarlal Ji & Om Prakash Ji Tibrewala Oration 2025",
    meta: "Hyderabad • 22–23 August 2025",
    full: "Dr. N. Venkatesh Prajna delivered the Late Shri Pushkarlal Ji & Om Prakash Ji Tibrewala Oration 2025 talk on 'Eminence Vs Evidence: Interpreting the Grey Zones in Clinical Practice' at LV Prasad Eye Institute, Hyderabad.",
  },
  {
    id: 12, image: "2025_9_Award_Best CIO (1).webp", fallbackBg: "#241a3b",
    title: "CIO 100 Special Awards at the Foundry CIO100 Awards & Symposium",
    meta: "Bangalore • 17–19 September 2025",
    full: "Srini, Chief Technology Officer, Auroitech, was honoured with the CIO 100 Special Awards: Data Security Maestros, and The Evangelist 100 Award, which recognise CIOs and CTOs for rethinking digitalisation, driving innovation, and strengthening resiliency in an AI-driven world, backed by strategic initiatives that enhance value creation and accelerate organisational growth.",
  },
  {
    id: 13, image: "2025_10_Andhra Pradesh Opththalmic Society Conference_Dr. Haripriya (2) copy.webp", fallbackBg: "#0d1f35",
    title: "Dr. Sundararama Raju Cataract Lecture Medal 2025",
    meta: "Guntur • 19–21 September 2025",
    full: "Dr. Haripriya Aravind was honoured with the Dr. Sundararama Raju Cataract Lecture Medal 2025 for Best Scientific Presentation and Best Team in the Ophthalmic Premier League at the 10th Andhra Pradesh Ophthalmic Society (APOS) Annual Conference. Title: How can we ensure high-quality eye care?",
  },
  {
    id: 14, image: "2025_10_Andhra Pradesh Opththalmic Society Conference_Dr.webp", fallbackBg: "#0d1f35",
    title: "Dr. R. Rajesh Ganesuni Innovations in Ophthalmology Lecture 2025 Award",
    meta: "Guntur • 19–21 September 2025",
    full: "Dr. R. Venkatesh, CMO, Aravind-Pondicherry, was honoured with the Dr. R. Rajesh Ganesuni Innovations in Ophthalmology Lecture 2025 Award, at the 10th Andhra Pradesh Ophthalmic Society (APOS) Annual Conference",
  },

  {
    id: 15, image: "2025_9_Dr.Kim_Global Health Summit (2).webp", fallbackBg: "#1a2d0d",
    title: "The Global Digital Health Summit, Expo & Innovation Award 2025",
    meta: "Mumbai • 19–21 September 2025",
    full: "Dr. R. Kim was honoured with the Global Digital Health Summit, Expo & Innovation Award 2025 at the 4th Edition of the Global Digital Health Summit.",
  },
  {
    id: 16, image: "Women scientisit.webp", fallbackBg: "#2d1a0d",
    title: "Dr. Vidya Ravi Memorial Award for Women Scientist",
    meta: "Trichy • 28th September 2025",
    full: "Dr. Gowri Priya Chidambaranathan, Scientist, Immunology & Stem Cell Biology, AMRF, was honoured with the award for proving the existence of stem cells in the trabecular meshwork and its deficiency leading to glaucoma, at the National Conference on Advances in Burns Treatment - Thermal and Radiation.",
  },
  {
    id: 17, image: "USICON.webp", fallbackBg: "#0d2d3a",
    title: "Dr. G. Venkataswamy Endowment Award",
    meta: "Jammu • 3–5 October 2025",
    full: "Dr. B. Manohar Babu, CMO, Aravind-Salem, was honoured with the Award in recognition of his outstanding contributions to the field of uveitis, at the 26th Annual Conference – Uveitis Society of India (USICON) 2025. Title: 'My Journey as an Ophthalmologist.'",
  },
  {
    id: 18, image: "2025_11_Award_Dr.Chayakanta Mahapatra Oration_Usha 2 copy.webp", fallbackBg: "#3b2511",
    title: "Prof. Dr. Chhayakanta Mahapatra Oration Award",
    meta: "Odisha • 22nd November 2025",
    full: "Dr. Usha Kim, Chief, Orbit, Oculoplasty, Ocular Oncology & Ocular Prosthetics Services, Aravind-Madurai, was honoured with the award at the Annual Conference of Odisha State Ophthalmological Society 2025.",
  },
  {
    id: 19, image: "apprecation award.webp", fallbackBg: "#241a3b",
    title: "Appreciation Award",
    meta: "Salem • 18th December 2025",
    full: "Boopathi S, Optometrist, Aravind-Salem, received an Appreciation Award in recognition of his enthusiastic participation and meaningful contributions, at the Eicher Driver Care Programme.",
  },
  {
    id: 20, image: "2026_1_Dr. J.L. Sharma Memorial Oration Award_Kim (2) copy.webp", fallbackBg: "#0d1f35",
    title: "Dr. J.L. Sharma Memorial Oration Award",
    meta: "Ambala • 17–18 January 2026",
    full: "Dr. R. Kim was honoured with the Award at the 20th Annual Conference of the Haryana Ophthalmological Society (OPHTHAFEST 2026) and the Annual Conference of the Ambala Ophthalmological Society.",
  },
  {
    id: 21, image: "2026_1_Dr RDR_STANLEY AWARD copy.webp", fallbackBg: "#1a2d0d",
    title: "Stanley Award 2026",
    meta: "Chennai • 25th January 2026", 
    full: "Dr. R. D. Ravindran was honoured with the Stanley Award 2026, recognising his excellence in the professional field and his remarkable contributions to Stanley Medical College. The award was conferred by the Stanley Alumni Association (SAA), Stanley Medical College, Chennai.",
  },
  {
    id: 22, image: "2025_4_ASCRS_Annual Meeting (3) copy.webp", fallbackBg: "#0d1f35",
    title: "ASCRS Foundation Prestigious Chang-Crandall Humanitarian Awards 2026",
    meta: "USA • 5th February 2026",
    full: "Dr. R. Venkatesh and Dr. Haripriya Aravind have been selected by the American Society of Cataract and Refractive Surgery (ASCRS) Foundation Board as recipients of the prestigious Chang-Crandall Humanitarian Award in recognition of their exceptional service to the global ophthalmic community.",
  },
  {
    id: 23, image: "Guniess record.webp", fallbackBg: "#1a2d0d",
    title: "Guinness World Record",
    meta: "New Delhi • 25th February 2026",
    full: "Dr. Parag K. Shah and Dr. Shivkumar Chandrashekharan, Chief, IOL & Cataract Services, Aravind-Tirunelveli, were part of the Guinness World Record attempt by the National Board of Examinations in Medical Sciences (NBEMS), New Delhi, for the 'Most viewers of an Artificial Intelligence in Healthcare lesson live stream on YouTube,' which recorded 17,999 doctors as simultaneous viewers during the live session.",
  },
  
  {
    id: 24, image: "Venkatesh  84th Annual Conference of the All-India Ophthalmological Society (AIOS) 2026.webp", fallbackBg: "#3b2511",
    title: "the AIOS - Lalit Verma (LV) Pearl Award 2026",
    meta: "Jaipur • 12–15 March 2026",
    full: "Dr. R. Venkatesh was honoured with the AIOS - Lalit Verma (LV) Pearl Award 2026, in recognition of his outstanding contributions to education, research, and leadership in Ophthalmology, at the 84th Annual Conference of the All-India Ophthalmological Society (AIOS) 2026.",
  },
  
  {
    id: 25, image: "Rathinam madam AIOS.webp", fallbackBg: "#3b2511",
    title: "Endowment Award",
    meta: "Jaipur • 12–15 March 2026",
    full: "Dr. S.R. Rathinam, Chief / Principal, Uveitis Services, Aravind-Madurai, received the Endowment Award for delivering the AIOS P. Namperumalsamy Endowment Lecture, at the 84th Annual Conference of the All-India Ophthalmological Society (AIOS) 2026.Title: How Did We Find Out the Cause of an Epidemic Fever and Uveitis? Leptospirosis in India",
  },
  {
    id: 26, image: "wings award.webp", fallbackBg: "#241a3b",
    title: "Indian Medical Association Women Doctors Wing Awards",
    meta: "Aravind-Coimbatore • 29th March 2026",
    full: "Dr. Kalpana Narendran, Chief, Cataract & Paediatric Ophthalmology Services, Aravind-Coimbatore, was honoured with the Lifetime Luminary Award, while Dr. Manju Vinythera, Medical Consultant, City Centre, Aravind-Coimbatore, received the Distinguished Service to Community Award, in recognition of their dedicated service and outstanding contributions to community healthcare.",
  },
];

/* ══════════════════════════════════════════════════════════
   RECOGNITION CARD (uniform card — fixed image / caption / date / content)
   All images fixed at 220px height, all cards equal size.
   Description is shown in full but visually clamped to a fixed
   number of lines via CSS (.aw-card-desc-clamp) — no "Read more" toggle.
══════════════════════════════════════════════════════════ */
function RecognitionCard({ card, num }) {
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <div className="aw-card">
      <div 
        className="aw-card-img-wrap" 
        onClick={() => setZoomOpen(true)}
      >
        <img
          src={card.image}
          alt={card.title}
          className="aw-card-img"
          style={{ background: card.fallbackBg }}
          onError={(e) => { e.target.style.opacity = "0"; }}
        />
        <div className="aw-card-overlay"><span className="aw-card-zoom">&#9654; View</span></div>
      </div>

      <div className="aw-card-body">
        <h3 className="aw-card-title">{card.title}</h3>
        <p className="aw-card-meta">{card.meta}</p>
        <p className="aw-card-desc-full">{card.full}</p>
      </div>

      {zoomOpen && createPortal(
        <div className="aw-lightbox-overlay" onClick={() => setZoomOpen(false)}>
          <div className="aw-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="aw-lightbox-close" onClick={() => setZoomOpen(false)}>&#10005;</button>
            <div className="aw-lightbox-img-wrap">
              <img src={card.image} alt={card.title} className="aw-lightbox-img" onError={(e) => { e.target.style.opacity = "0"; }} />
            </div>
            <p className="aw-lightbox-caption">{card.title}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function AwardRecognition() {
  return (
    <div className="aw-page">

      {/* ══ HERO — dummy placeholder content, replace once copy is ready ══ */}
      <section className="aw-hero">
        <div className="aw-hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />
        <div className="aw-hero-overlay" />
        <div className="aw-hero-content">
          <div className="aw-hero-tag">
          </div>
          <h1 className="pc-hero-title">Recognitions<span className="pc-hero-gold"> and awards</span></h1>
          <p className="aw-hero-desc">
        A wide range of awards and honours were bestowed upon Aravind members, recognising their dedication to their work and service to the community, in keeping with the footsteps of Dr. V. While these achievements were never pursued for awards or recognition, the honours serve as a reminder and motivation to reach more people and work towards a better world, one free from avoidable blindness.          </p>
        </div>
      </section>

      {/* ══ SECTION: RECOGNITIONS ══ */}
      <section className="aw-section" id="recognitions">
        <div className="aw-section-inner">
          <h2 className="pc-section-title">
           Honours  <span className="pc-gold">and recognitions</span>
          </h2>
          <div className="aw-grid">
            {RECOGNITION_CARDS.map((card, i) => (
              <RecognitionCard key={card.id} card={card} num={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="aw-more-details">
        Kindly <a href="11_AR_Lr_Awards_2025-26_8.8.2026.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="aw-page-nav" aria-label="Page navigation">
        <Link className="aw-page-nav-link aw-page-nav-link-prev" to="/innovation">
          <span className="aw-page-nav-label">&larr; Previous</span>
          <span className="aw-page-nav-title">Innovation</span>
        </Link>
        <Link className="aw-page-nav-link aw-page-nav-link-next" to="/">
          <span className="aw-page-nav-label">Next &rarr;</span>
          <span className="aw-page-nav-title">Home</span>
        </Link>
      </nav>

    </div>
  );
}