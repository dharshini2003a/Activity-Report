// ============================================================
  //  Education.jsx  —  Education & Training Page
  //  CME sections use photo-card carousel (same as PatientCare)
  //  Course Details is a single unified perf-table (no tabs)
  // ============================================================

  import { useState, useRef, Fragment } from "react";
  import { Link } from "react-router-dom";
  import "../styles/education.css";

  const HERO_IMAGE    = "education trainning 1080x1920.webp";
  const HERO_FALLBACK = "Cover_Page%20-%20Copy.jpg";

  const STATS = [
    { number: "577",  label: "Total Candidates Trained" },
    { number: "20+",  label: "CME / CPE Programmes" },
    { number: "30+",  label: "Courses Offered" },
    { number: "8",    label: "International Fellows" },
  ];

  /* ── CME / CPE Programmes 2025–26 — card grid (no photos supplied in source) ── */
  const CME_PROGRAMMES = [
    { tag: "Pondicherry", date: "27 April 2025", title: "Workshop on CORNEA SSTC – Lamellar Keratoplasty", image: "2025_4_PDY_Cornea SSTC_Workshop (6).webp", desc: "A focused workshop on advanced lamellar corneal surgeries covered Deep Anterior Lamellar Keratoplasty (DALK), Descemet's Stripping Endothelial Keratoplasty (DSEK), and Descemet Membrane Endothelial Keratoplasty (DMEK)." },
    { tag: "Pondicherry", date: "18 May 2025", title: "Neuro Synapse 2025: A Day of Knowledge Sharing!", image: "2025_5_PDY_Neurosynapse_Conference (20).webp", desc: "The conference on Decoding Neuro-ophthalmology Disorders brought together renowned specialists and postgraduates to share knowledge and experiences through a series of engaging sessions and discussions." },
    { tag: "Tirunelveli", date: "14–15 June 2025", title: "CME on Ocular Diagnostics", image: "2025_6_TVL_CME on Ocular Diagnostics (25).webp", desc: "The CME aimed to familiarise ophthalmologists with recent trends and advancements in ophthalmology through scientific sessions on major subspecialties and a dry lab training session focused on key diagnostic investigations." },
    { tag: "Pondicherry", date: "22 June 2025", title: "Paediatric and Strabismus Symposium – PASS 2025", image: "2025_6_PDY_Pass CME (16).webp", desc: "The CME covered all aspects of myopia, including strategies to prevent its progression and a step-by-step guide to setting up a myopia clinic, along with amblyopia management and treatment approaches for accommodation anomalies." },
    { tag: "Salem", date: "22 June 2025", title: "CME on Phaco Summit – From Basics to Breakthroughs", image: "2025_6_Salem_Phaco CME (14).webp", desc: "The CME on phacoemulsification featured speakers presenting modern cataract surgery techniques, complication management, and surgical advancements, with an interactive debate on \"Phaco vs. SICS in Complex Cases.\"" },
    { tag: "Tirunelveli", date: "19–20 July 2025", title: "Syn-Neurons 2025 – Neuro-Ophthalmology Update", image: "2025_7_TVL_Syn.Neuron (5).webp", desc: "The workshop fostered a systematically integrated approach to Neuro-Ophthalmology, offering evidence-based updates on paediatric care, genetics, neuroimaging techniques, and hands-on training sessions." },
    { tag: "Chennai", date: "24 July 2025", title: "Training the Trainers' Workshop", image: "2025_8_Chennai_Dr. Karl Golnik _Faculty Development Workshop (1).webp", desc: "Conducted by Dr. Karl Golnik from the Barrow Neurological Institute, this workshop strengthened teaching skills in medical education, covering engaging teaching methods, assessment strategies, and managing challenging residents." },
    { tag: "Madurai", date: "9 August 2025", title: "CME on GLOW – Glaucoma Learning & Outreach for Wellbeing", image: "2025_8_MDU_GLOW_Glaucoma CME (24).webp", desc: "Aimed at helping private practitioners develop expertise in glaucoma management, the CME featured lectures on the fundamentals of glaucoma along with observational training in patient investigative procedures." },
    { tag: "Madurai", date: "17 August 2025", title: "Uvea 4 All – Infectious Uveitis", image: "2025_8_PDY_Uvea 4 All (3).webp", desc: "The CME covered COTS study, toxoplasma uveitis, infectious and parasitic uveitis, AI-powered uveitis and the Proton registry, clinical trials in uveitis, and intravitreal steroid implants, among other topics." },
    { tag: "Tirupati", date: "24 August 2025", title: "CME on Unified for Young Eyes", image: "2025_8_TPT_CME_Unified for young eye  (68).webp", desc: "This multidisciplinary CME brought together ophthalmologists, paediatricians, neurologists and optometrists to strengthen collaboration, with workshop stations on ocular examination, CVI screening, and early intervention strategies." },
    { tag: "Pondicherry", date: "14 September 2025", title: "Workshop on \"Secondary IOLs Demystified\"", image: "2025_9_PDYi_Secondary IOL_CME (7).webp", desc: "Residents, fellows and faculty came together for a full day of academic learning and skill development, highlighted by a hands-on Wet Lab where participants practised techniques under expert guidance." },
    { tag: "Pondicherry", date: "26 October 2025", title: "Exploring Orbitology: Orbital Infections and Inflammation", image: "2025_10_PDY_CME_Exploring Orbitology (3).webp", desc: "The day blended theory and practice, with Dr. Milind N. Naik from L V Prasad Eye Institute elaborating on specific orbital inflammations, including the thyroid eye disease spectrum and its management." },
    { tag: "Tirunelveli", date: "9 November 2025", title: "Kera Eye Cone 2025", image: "2025_11_TVL_KERACONE_CME (8).webp", desc: "The CME focused on corneal ectatic disorders, especially keratoconus — its diagnosis, management and recent advances — and featured a live video demonstration of Corneal Allogenic Intrastromal Ring Segments (CAIRS)." },
    { tag: "Madurai", date: "9 November 2025", title: "Mastering the Art of Scleral Buckling: Precision & Perfection", image: "2025_11_MDU_Scleral Buckling CME _Retina (3).webp", desc: "Organised for Vitreo-Retina fellows, the symposium covered safe anaesthesia, complication management, paediatric challenges, and buckling in recurrent retinal detachment after vitrectomy." },
    { tag: "Pondicherry", date: "16 November 2025", title: "Keraventure 2025", image: "2025_11_PDY_Keraventure_CME (4).webp", desc: "Aimed at advancing the management of keratitis, the conference featured case discussions and a debate, along with a keynote by Dr. M. Srinivasan on 50 years of experience managing corneal ulcers." },
    { tag: "Madurai", date: "7 December 2025", title: "Workshop on Master MSICS Techniques", image: "2025_12_MDU_MSICS workshop (11).webp", desc: "The workshop provided an in-depth look at the latest techniques in microsurgical cataract extraction, with hands-on training sessions for participants." },

    { tag: "Madurai", date: "12–13 December 2025", title: "5th Annual Conference of Indian Paediatric Glaucoma Society (IPGS 2025)", image: "2025_12_MDU_IPGS Conference_Pandian Hotel (12).webp", desc: "Hosted by AECS, the conference brought together 99 participants, including international and Indian experts, with nearly 50 presentations on childhood and developmental glaucoma." },
    { tag: "Coimbatore", date: "17–18 December 2025", title: "Surgical Skills Enhancement Programme", image: "2025_12_PDY_TSTC_Workshop (22).webp", desc: "In association with Alcon, a programme for final-year vitreoretinal fellows enhanced surgical skills and clinical decision-making, covering ergonomics, diagnostics, and advances in vitrectomy systems." },
    { tag: "Chennai", date: "25 January 2026", title: "ReFocus 2026 – The Refractive Surgery Colloquium", image: "2026_1_Chennai_REFOCUS (4).webp", desc: "The colloquium empowered practising ophthalmologists and fellows with practical knowledge for sustainable eye care practice through interactive lectures, discussions and expert panel sessions." },
    { tag: "Coimbatore", date: "15 February 2026", title: "CME on Nerve Palsies, Amblyopia and Asthenopia", image: "2026_2_CBE_Nerve Palsies Amblyopia _CME (6).webp", desc: "The CME featured sessions on KM Screen diagnostics, Digital Hess, Orthoptics and Bynocs therapeutics, along with dry labs and a wet lab on strabismus training using Aurolab model eyes." },
    { tag: "Salem", date: "22 February 2026", title: "CME on Secondary IOL & Wetlab", image: "2026_2_Salem_CME on Secondary IOL (33).webp", desc: "A key highlight was an interactive debate on decision-making in aphakia, followed by lectures in the morning and a wet lab session in the afternoon." },
    { tag: "Pondicherry", date: "23 February 2026", title: "Glaucoma Conclave 2026: An Update on Non-Surgical Management of Glaucoma", image: "2026_2_PDY_Glaucoma Conclave (15).webp", desc: "The conclave featured sessions on medications and technology in glaucoma care, covering medical management, newer anti-glaucoma medications, adherence, nanodroppers, implants and neuroprotection." },
    { tag: "Coimbatore", date: "27 February 2026", title: "Vision Rehabilitation Update for Doctors, DNB PGs and Optometrists", image: "2026_2_CBE_Low vision Rehabiliation Update  (2).webp", desc: "Organised as part of Low Vision Month, the session focused on adult low vision management, digital resources, rehabilitation guidance, and strengthening referral pathways." },
    { tag: "Coimbatore", date: "23 March 2026", title: "GLOW CME", image: "2026_3_CBE_GLOW CME (32).webp", desc: "The glaucoma seminar and gonioscopy workshop for general ophthalmologists covered glaucoma epidemiology, target IOP, OCT and visual field analysis, medical management, and demonstrations of gonioscopy." },
    { tag: "Salem", date: "29 March 2026", title: "Indian Medical Association CME", image: "2026_Salem_Indian Medical Association CME_Dr. Anuja.webp", desc: "Aravind-Salem, in association with the Indian Medical Association (IMA), Salem, organised the CME to enhance knowledge sharing among medical professionals on the latest developments in eye care." },
    { tag: "Pondicherry", date: "29 March 2026", title: "CME on Retina 4U 2026: Retinopathy of Prematurity", image: "2026_3_PDY_Retina 4U_CME (8).webp", desc: "Themed \"Tiny Babies, Timely Decisions: Tackling ROP,\" the sessions covered screening protocols, timely interventions, and the latest management strategies for retinopathy of prematurity." },
  ];

  /* ── Other training & knowledge-sharing initiatives — gallery format ──
     Add the actual photo filename in `image` (same folder as HERO_IMAGE).
     Leave empty "" if you don't have a photo yet — it'll fall back to the
     navy/green colour block automatically. ── */
  const OTHER_INITIATIVES = [
    { id: "cann", title: "10th Edition of CANN", image: "01.webp", desc: "The 10th Edition of Coimbatore Aravind's Neuro-Ophthalmic Newsletter (CANN), has been published by the Neuro-Ophthalmology Department of Aravind-Coimbatore, coinciding with the Golden Jubilee celebrations of the AECS. This special edition honoured Dr. G. Natchiar, Director Emeritus, AECS, a true visionary whose pioneering spirit laid the foundation for neuro-ophthalmology in India. As a resident-focused issue, it includes two original studies by trainees along with insightful case reports contributed by postgraduates." },
    { id: "writathon", title: "Writathon", image: "2025_10_PDY_Writathon (1).webp", desc: "The annual Writathon event promotes research activities across Aravind in terms of writing, learning, and knowledge-sharing. It brings researchers together to achieve specific writing goals within a set timeframe. This year, the event, held at Aravind-Pondicherry on 17th October 2025, received over 30 submissions, including articles, videos, case reports, case series, image essays, letters to the editor, and clinical images. The best works have been submitted for acceptance and publication in prestigious journals." },
    { id: "library-week", title: "Library Week", image: " 2025_11_MDU_Library Week (4).webp", desc: "To enhance awareness and use of library resources, the Aravind Library and Information Centre, Madurai, organised Library Week at Aravind-Madurai. Conducted in two phases for Residents and AOPs during October–November 2025, the programme featured interactive events such as photo quizzes, skill tests, treasure hunts, and oral quizzes covering ophthalmology and general topics." },
  ];


  /* ── Course data — single unified table, grouped by section ── */
  const COURSE_SECTIONS = [
  {
    heading: "Postgraduate Courses",
    rows: [
      { course: "Master of Surgery in Ophthalmology (3 years)", count: 17 },
      { course: "Diplomate of the National Board (3 years)",    count: 33 },
      { course: "Post DO DNB (2 years)",                        count: 12 },
    ],
  },
  {
    heading: "Long-Term Ophthalmology Fellowship",
    rows: [
      { course: "Ant. Segment / Intraocular Lens Microsurgery (2 years)", count: 27 },
      { course: "Orbit & Oculoplasty (18 months)",                       count:  9 },
      { course: "Paediatric Ophthalmology & Strabismus (18 months)",     count:  8 },
      { course: "Glaucoma (2 years)",                                    count: 25 },
      { course: "Retina & Vitreous (2 years)",                           count: 34 },
      { course: "Comprehensive Ophthalmology (2 years)",                 count:  6 },
      { course: "Cornea (18 months)",                                    count: 27 },
      { course: "Medical Retina (1 year)",                               count:  9 },
      { course: "Uvea (1 year)",                                         count:  1 },
      { course: "Surgical Paediatric Retina Fellowship - RoP (1 year)",  count:  1 },
      { course: "Fellowship in General Ophthalmology",                  count:  6 },
    ],
  },
  {
    heading: "Long-Term Ophthalmology Fellowship (International)",
    rows: [
      { course: "Cornea (1 year)",                               count: 1 },
      { course: "Paediatric Ophthalmology & Strabismus (1 year)",count: 2 },
      { course: "Orbit & Oculoplasty (1 year)",                  count: 1 },
      { course: "Retina",                                        count: 1 },
    ],
  },
  {
    heading: "Short-Term Ophthalmology Fellowship (International)",
    rows: [
      { course: "Orbit & Oculoplasty (6 months)",    count: 2 },
      { course: "Glaucoma (6 months)",                count: 1 },
      { course: "Paediatric Ophthalmology (6 months)",count: 1 },
      { course: "Retina & Vitreous (6 months)",       count: 1 },
    ],
  },
  {
    heading: "Short-Term Clinical Courses for Ophthalmologists",
    rows: [
      { course: "Clinical Observership Programme in Diagnosis and Management of Glaucoma (1 month)", count:  4 },
      { course: "Neuro Ophthalmology (3 months)",                                                     count:  3 },
      { course: "Phacoemulsification (1 month)",                                                      count: 66 },
      { course: "Small Incision Cataract Surgery (1 month)",                                          count: 58 },
      { course: "Management of Retinopathy of Prematurity & Paediatric Retinal Disorders (1 month)",  count: 13 },
      { course: "HelpMeSee Simulation-Based Training in MSICS (1 week)",                              count: 14 },
    ],
  },
  {
    heading: "Short-Term Paramedical Courses",
    rows: [
      { course: "Vision Technicians",                                              count: 10 },
      { course: "Telescreening in Retinopathy of Prematurity",                     count:  2 },
      { course: "Optical Dispensing",                                              count:  4 },
      { course: "Short-Term Course in OT Techniques",                              count:  5 },
      { course: "Short-Term Course in Refraction Techniques",                      count:  2 },
      { course: "Orientation to Paediatric Ocular Anesthesia for Anaesthetic Nurses", count: 2 },
      { course: "Training for Ocularists",                                         count:  6 },
      { course: "Training for Orthoptists",                                        count:  1 },
    ],
  },
  {
    heading: "Management Courses",
    rows: [
      { course: "Fellowship in Eye Hospital Management (1 year)",                                                count:  6 },
      { course: "Community Outreach and Social Marketing for Eye Care Services (3 weeks)",                       count: 19 },
      { course: "Eyexcel – Excellence in Eye Care Training (5 days)",                                            count: 47 },
      { course: "Management Priorities in Eye Care Delivery (1 week)",                                           count: 29 },
      { course: "Management Training and Systems / Development for Hospital Administrators / Managers (1 month)",count: 20 },
      { course: "Management Training for Eye Care Programme Managers (2 weeks)",                                 count: 17 },
      { course: "Vision Centre Management (6 days)",                                                             count: 19 },
      { course: "Online Project Management for Eye Care (1 month)",                                              count: 13 },
      { course: "Ophthalmic Instrument Maintenance – for Technicians (1 month)",                                 count: 15 },
      { course: "Ophthalmic Instrument Maintenance (Online)",                                                    count:  5 },
      { course: "Eye Bank Techniques (1 month)",                                                                 count:  5 },
      { course: "Eye Bank Management",                                                                           count:  4 },
    ],
  },
];

  /* ── Knowledge Base for AI ── */
  const KNOWLEDGE_BASE = [
    { tag: "Overview",      title: "Education & Training Overview",      keywords: ["education","training","overview","aecs","courses","577","candidates","participants"], text: "Priority for education and training has taken AECS a long way, facilitating employees, participants from other eye care providers, and individuals from diverse fields. A total of 577 candidates were trained in April 2024 – March 2025 across postgraduate, fellowship, clinical, paramedical, and management courses." },
    { tag: "ARCORE",        title: "ARCORE Training Facility — Chennai", keywords: ["arcore","rotary","chennai","hybrid","training facility","advanced"], text: "AECS set up the Aravind Rotary Center For Advanced Ophthalmic Resources & Education (ARCORE) in Chennai — a cutting-edge training facility facilitating hybrid ways of skills enhancement, broadening the horizon of learning for ophthalmic professionals." },
    { tag: "CME",           title: "CME / CPE Programmes 2025–26",      keywords: ["cme","cpe","programmes","workshop","glow","uvea","keraventure","phaco summit","dstc","orbitology","glaucoma conclave"], text: "Over 30 CME/CPE programmes were held across Aravind hospitals in 2025–26, including Neuro Synapse 2025 (Pondicherry), CME on Ocular Diagnostics (Tirunelveli), PASS 2025, Phaco Summit, Syn-Neurons 2025, GLOW, Uvea 4 All, Keraventure 2025, Kera Eye Cone 2025, and the Glaucoma Conclave 2026, among others." },
    { tag: "Initiatives",   title: "Other Training & Knowledge Initiatives", keywords: ["arcore","ikshana","akshivikas","writathon","library week","hackathon","cann","capacity building"], text: "Other initiatives include ARCORE's Ikshana and Akshivikas training programmes, the annual Writathon (Oct 2025, Pondicherry), Library Week (Madurai), Hackathon 2026 (Pondicherry), the 10th edition of CANN newsletter, and internal capacity building such as Dr. Indira Durai's Micromasters at the University of Michigan." },
    { tag: "Course Details",title: "Postgraduate Courses",              keywords: ["ms ophthalmology","dnb","post do dnb","postgraduate","ms","dnb"], text: "Postgraduate courses: MS in Ophthalmology (3 years) – 20 candidates; Diplomate of the National Board (3 years) – 27 candidates; Post DO DNB (2 years) – 21 candidates." },
    { tag: "Course Details",title: "Long-Term Fellowship — Indian",     keywords: ["fellowship","anterior segment","iol","orbit","oculoplasty","paediatric","glaucoma fellowship","retina","vitreous","cornea","medical retina","uvea","general ophthalmology"], text: "Long-term fellowships (Indian): Ant. Segment/IOL Microsurgery – 33; Orbit & Oculoplasty – 6; Paediatric Ophthalmology & Strabismus – 9; Glaucoma – 25; Retina and Vitreous – 37; Comprehensive Ophthalmology – 2; Cornea – 26; Medical Retina – 7; Uvea – 1; General Ophthalmology – 27." },
    { tag: "Course Details",title: "International Fellowships",         keywords: ["international fellowship","international","glaucoma international","paediatric international","orbit international"], text: "Long-term international fellowships: Glaucoma (1 yr) – 1; Paediatric Ophthalmology & Strabismus (1 yr) – 1; Orbit & Oculoplasty (1 yr) – 1. Short-term international: Orbit & Oculoplasty (6 months) – 3; Glaucoma – 1; Cornea – 1; Retina Vitreous – 1." },
    { tag: "Course Details",title: "Short-Term Clinical Courses",       keywords: ["phacoemulsification","sics","small incision","rop","helpmesee","msics","observership"], text: "Short-term clinical courses: Clinical Observership in Glaucoma (1 month) – 12; Phacoemulsification (1 month) – 64; SICS (1 month) – 63; RoP & Paediatric Retinal Disorders (1 month) – 9; HelpMeSee Simulation MSICS (1 week) – 13." },
    { tag: "Course Details",title: "Management & Paramedical Courses",  keywords: ["management","eyexcel","eye hospital management","ophthalmic instruments","eye bank management","vision technician","optical dispensing","orthoptist"], text: "Management courses total trained: Fellowship in Eye Hospital Management – 7; Community Outreach & Social Marketing – 14; Eyexcel – 31; Management Priorities in Eye Care Delivery – 27; Hospital Administrators/Managers – 22; Eye Care Programme Managers – 13; Online Project Management – 16; Ophthalmic Instrument Maintenance – 9; Online Instruments Maintenance – 5; Eye Bank Management – 4." },
    { tag: "Course Details",title: "Total Candidates Trained 2024–2025",keywords: ["total","577","total candidates","total trained"], text: "Total candidates trained from April 2024 to March 2025: 577 across all postgraduate, fellowship, clinical, paramedical, and management courses at Aravind Eye Hospitals and LAICO." },
  ];

  /* ══════════════════════════════════════
    AI SEARCH
  ══════════════════════════════════════ */
  function AISearch() {
    const [query, setQuery]         = useState("");
    const [apiAnswer, setApiAnswer] = useState("");
    const [loading, setLoading]     = useState(false);
    const [searched, setSearched]   = useState(false);
    const [isOutOfScope, setIsOutOfScope] = useState(false);

    const handleSearch = async () => {
      const q = query.trim();
      if (!q) return;
      setLoading(true); setSearched(true); setApiAnswer(""); setIsOutOfScope(false);
      const context = KNOWLEDGE_BASE.map(i => `[${i.tag}] ${i.title}: ${i.text}`).join("\n\n");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514", max_tokens: 600,
            system: `You are a helpful assistant for the Aravind Eye Care System Annual Activity Report 2024–25, Education & Training section. Answer using ONLY the data below. Keep answers to 2–5 sentences with specific numbers where available. If not in the report, say so and suggest contacting communications@aravind.org. If completely unrelated to Aravind Eye Care, respond ONLY with: OUT_OF_SCOPE.`,
            messages: [{ role: "user", content: `Data:\n${context}\n\nQuestion: ${q}` }],
          }),
        });
        if (!res.ok) throw new Error("fail");
        const data = await res.json();
        const text = data.content?.[0]?.text?.trim() || "";
        if (text === "OUT_OF_SCOPE") setIsOutOfScope(true);
        else setApiAnswer(text || "Try asking about ARCORE, CME programmes, fellowships, or total candidates trained.");
      } catch {
        const qLow = q.toLowerCase();
        const matched = KNOWLEDGE_BASE.filter(i =>
          i.keywords.some(kw => qLow.includes(kw) || kw.includes(qLow)) ||
          i.title.toLowerCase().includes(qLow) || i.text.toLowerCase().includes(qLow)
        );
        setApiAnswer(matched.length > 0
          ? matched.slice(0, 2).map(m => m.text).join(" ")
          : "Try again shortly, or ask about ARCORE, CME programmes, fellowships, or total candidates trained.");
      }
      setLoading(false);
    };

    const handleClear = () => { setQuery(""); setApiAnswer(""); setSearched(false); setIsOutOfScope(false); };

    return (
      <div className="ai-search-wrap">
        <div className="ai-search-bar">
          <span className="ai-search-icon">✦</span>
          <input className="ai-search-input" type="text"
            placeholder="Ask anything… e.g. ARCORE facility, total candidates trained, Pondicherry CME"
            value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()} />
          {searched && (
            <button className="ai-close-btn"
              style={{ borderRadius: 0, borderTop: "none", borderBottom: "none", minHeight: 50 }}
              onClick={handleClear}>✕</button>
          )}
          <button className="ai-search-btn" onClick={handleSearch} disabled={loading || !query.trim()}>
            {loading ? "…" : "Ask AI"}
          </button>
        </div>
        {loading && <div className="ai-answer-box"><div className="ai-loading">✦ Thinking…</div></div>}
        {searched && !loading && isOutOfScope && (
          <div className="ai-answer-box" style={{ borderLeft: "4px solid #c8921a", background: "#fffbf2" }}>
            <div className="ai-answer-label" style={{ color: "#c8921a" }}>ℹ Outside This Report</div>
            <p className="ai-answer-text" style={{ color: "#555" }}>
              This question is outside the <strong>Aravind Education &amp; Training 2024–25 Report</strong>.
              Try asking about CME programmes, fellowships, ARCORE, or total candidates trained.
            </p>
            <button className="ai-close-btn" onClick={handleClear}>Close ✕</button>
          </div>
        )}
        {searched && !loading && apiAnswer && !isOutOfScope && (
          <div className="ai-answer-box">
            <div className="ai-answer-label">✦ AI Answer</div>
            <p className="ai-answer-text">{apiAnswer}</p>
            <button className="ai-close-btn" onClick={handleClear}>Close ✕</button>
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════
    CME / CPE PROGRAMME CAROUSEL
    Numbered badge + colour block + heading + 2-line desc + Read More
    (same carousel mechanics as the PatientCare photo carousel)
  ══════════════════════════════════════ */
  const CME_CARD_COLORS = ["#0d1f35", "#1c3320", "#0f2b28", "#3a2414", "#241a3a", "#2a1414", "#12242e"];

  function CmeCarousel({ programmes }) {
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [openCard, setOpenCard] = useState(null); // ← ONE id at a time (same pattern as PatientCare)
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const scrollToCard = (idx) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[idx];
      if (!card) return;
      const trackLeft = track.getBoundingClientRect().left;
      const cardLeft  = card.getBoundingClientRect().left;
      track.scrollBy({ left: cardLeft - trackLeft, behavior: "smooth" });
    };

    const prev = () => { const n = (active - 1 + programmes.length) % programmes.length; setActive(n); scrollToCard(n); };
    const next = () => { const n = (active + 1) % programmes.length; setActive(n); scrollToCard(n); };
    const goTo = (i) => { setActive(i); scrollToCard(i); };
    // ✅ Toggle: open clicked card, close if already open — never touches other cards
    const handleToggle = (id) => setOpenCard(prev => (prev === id ? null : id));

    const openLightbox  = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const prevLightbox  = () => setLightboxIndex(i => (i - 1 + programmes.length) % programmes.length);
    const nextLightbox  = () => setLightboxIndex(i => (i + 1) % programmes.length);

    return (
      <div className="carousel-wrap" style={{ marginTop: 16, paddingBottom: 0 }}>
        <div className="carousel-track-wrap">
          <button className="carousel-arrow" onClick={prev} aria-label="Previous">&#8592;</button>

          <div className="carousel-track" ref={trackRef}>
            {programmes.map((p, i) => {
              const cardId = p.id ?? i;
              const isOpen = openCard === cardId;
              return (
                <div key={cardId} className={`photo-card cme-card${active === i ? " photo-card-active" : ""}`}>
                  <div
                    className="photo-card-img-wrap"
                    style={{
                      background: CME_CARD_COLORS[i % CME_CARD_COLORS.length],
                      cursor: p.image ? "pointer" : "default",
                    }}
                    onClick={() => p.image && openLightbox(i)}
                  >
                    {p.image && (
                      <>
                        <img
                          className="photo-card-img"
                          src={p.image}
                          alt={p.title}
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <div className="photo-card-overlay">
                          <span className="photo-card-zoom">&#9654; View</span>
                        </div>
                      </>
                    )}
                  </div>
                  <h4 className="cme-card-title">{p.title}</h4>
                  <p className="cme-card-meta">{p.tag} &bull; {p.date}</p>
                  <p className={`cme-card-desc${isOpen ? " cme-card-desc-expanded" : ""}`}>{p.desc}</p>
                  <button
                    className="edu-readmore-btn"
                    onClick={(e) => { e.stopPropagation(); handleToggle(cardId); }}
                  >
                    {isOpen ? "Show Less" : "Read More"}
                  </button>
                </div>
              );
            })}
          </div>

          <button className="carousel-arrow" onClick={next} aria-label="Next">&#8594;</button>
        </div>

        <div className="carousel-dots" style={{ marginTop: 12 }}>
          {programmes.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${active === i ? " carousel-dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Programme ${i + 1}`}
            />
          ))}
        </div>

        {lightboxIndex !== null && (
          <div className="photo-lightbox-overlay" onClick={closeLightbox}>
            <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
              <button className="photo-lightbox-close" onClick={closeLightbox} aria-label="Close">&#10005;</button>
              <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={prevLightbox} aria-label="Previous">&#8592;</button>

              <div className="photo-lightbox-img-wrap">
                <img
                  className="photo-lightbox-img"
                  src={programmes[lightboxIndex].image}
                  alt={programmes[lightboxIndex].title}
                />
              </div>
              <p className="photo-lightbox-caption">
                {programmes[lightboxIndex].title}<br />
                <span style={{ opacity: 0.75, fontSize: 13 }}>
                  {programmes[lightboxIndex].tag} &bull; {programmes[lightboxIndex].date}
                </span>
              </p>
              <span className="photo-lightbox-counter">{lightboxIndex + 1} / {programmes.length}</span>

              <button className="photo-lightbox-arrow photo-lightbox-next" onClick={nextLightbox} aria-label="Next">&#8594;</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════
    CONFERENCE CARD — with Read More for long presenter lists
  ══════════════════════════════════════ */
  function ConfCard({ conf }) {
    const [expanded, setExpanded] = useState(false);
    const COLLAPSED_COUNT = 3;
    const presenters = conf.presenters || [];
    const shown = expanded ? presenters : presenters.slice(0, COLLAPSED_COUNT);
    const hiddenCount = presenters.length - COLLAPSED_COUNT;

    return (
      <div className="conf-card">
        <div className="conf-card-header">
          <span className="conf-card-tag">{conf.tag}</span>
          <span className="conf-card-date">{conf.date}</span>
        </div>
        <h3 className="conf-card-title">{conf.title}</h3>
        <p className="conf-card-venue">{conf.venue}</p>
        <ul className="conf-card-list">
          {shown.map((p, i) => (
            <li key={i}>
              <strong>{p.name}</strong> — {p.papers.join("; ")}
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <button className="edu-readmore-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? "Show Less" : `Read More (+${hiddenCount} more)`}
          </button>
        )}
      </div>
    );
  }


  /* ══════════════════════════════════════
    OTHER INITIATIVES GALLERY — click image to open a lightbox
    (same "▶ View" hover overlay + lightbox pattern used elsewhere)
  ══════════════════════════════════════ */
  function InitiativesGallery({ items }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [openCard, setOpenCard] = useState(null); // ← ONE id at a time (same pattern as PatientCare)

    const openLightbox  = (i) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const prevLightbox  = () => setLightboxIndex(i => (i - 1 + items.length) % items.length);
    const nextLightbox  = () => setLightboxIndex(i => (i + 1) % items.length);

    // ✅ Toggle: open clicked card, close if already open — never touches other cards
    const handleToggle = (id) => setOpenCard(prev => (prev === id ? null : id));

    return (
      <>
        <div className="edu-initiatives-grid">
          {items.map((item, i) => {
            const cardId = item.id ?? i;
            const isOpen = openCard === cardId;
            return (
              <div key={cardId} className="photo-card edu-initiative-card">
                <div
                  className="photo-card-img-wrap"
                  style={{
                    background: CME_CARD_COLORS[i % CME_CARD_COLORS.length],
                    cursor: item.image ? "pointer" : "default",
                  }}
                  onClick={() => item.image && openLightbox(i)}
                >
                  {item.image && (
                    <>
                      <img
                        className="photo-card-img"
                        src={item.image}
                        alt={item.title}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div className="photo-card-overlay">
                        <span className="photo-card-zoom">&#9654; View</span>
                      </div>
                    </>
                  )}
                </div>
                <h4 className="cme-card-title">{item.title}</h4>
                <p className={`cme-card-desc${isOpen ? " cme-card-desc-expanded" : ""}`}>{item.desc}</p>
                <button
                  className="edu-readmore-btn"
                  onClick={(e) => { e.stopPropagation(); handleToggle(cardId); }}
                >
                  {isOpen ? "Show Less" : "Read More"}
                </button>
              </div>
            );
          })}
        </div>

        {lightboxIndex !== null && (
          <div className="photo-lightbox-overlay" onClick={closeLightbox}>
            <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
              <button className="photo-lightbox-close" onClick={closeLightbox} aria-label="Close">&#10005;</button>

              {items.length > 1 && (
                <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={prevLightbox} aria-label="Previous">&#8592;</button>
              )}

              <div className="photo-lightbox-img-wrap">
                <img
                  className="photo-lightbox-img"
                  src={items[lightboxIndex].image}
                  alt={items[lightboxIndex].title}
                />
              </div>
              <p className="photo-lightbox-caption">{items[lightboxIndex].title}</p>
              {items.length > 1 && (
                <span className="photo-lightbox-counter">{lightboxIndex + 1} / {items.length}</span>
              )}

              {items.length > 1 && (
                <button className="photo-lightbox-arrow photo-lightbox-next" onClick={nextLightbox} aria-label="Next">&#8594;</button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  /* ══════════════════════════════════════
    COURSES TABLE — single unified table (no tabs)
    Every category stacked one after another, frozen first column,
    navy section headers, gold grand total.
  ══════════════════════════════════════ */
function CoursesTable() {
  const grandTotal = COURSE_SECTIONS.reduce((s, sec) => s + sec.rows.reduce((ss, r) => ss + r.count, 0), 0);

  return (
    <div className="perf-wrap">
      <div className="perf-table-wrap">
        <table className="perf-table">
          <colgroup>
            <col style={{ width: 320 }} />
            <col style={{ width: 220 }} />
          </colgroup>
          <thead>
            <tr>
              <th className="perf-th perf-th-label">Course</th>
              <th className="perf-th perf-th-total">Candidates</th>
            </tr>
          </thead>
          <tbody>
            {COURSE_SECTIONS.map((sec, si) => (
              <Fragment key={si}>
                <tr className="perf-row-section">
                  <td className="perf-section-label" colSpan={2}>{sec.heading}</td>
                </tr>

                {sec.rows.map((row, i) => (
                  <tr key={i} className="perf-row">
                    <td className="perf-td-label">{row.course}</td>
                    <td className="perf-td perf-td-bold" style={{ textAlign: "center" }}>
                      {String(row.count).padStart(2, "0")}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}

            <tr className="perf-row-total">
              <td className="perf-td-label perf-td-label-total">
                Total Candidates Trained — Apr 2025 – Mar 2026
              </td>
              <td className="perf-td-total-val perf-td-grand" style={{ textAlign: "center" }}>{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
  /* ══════════════════════════════════════
    MAIN PAGE
  ══════════════════════════════════════ */
  export default function Education() {
    return (
      <div className="pc-page">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="pc-hero">
          <div className="pc-hero-bg"></div>
          <div className="pc-hero-bg pc-hero-bg-desktop" style={{ backgroundImage: `url('${"education trainning 1080x1920.webp"}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-bg pc-hero-bg-mobile" style={{ backgroundImage: `url('${"education-mobile.webp"}'), url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />

          <div className="pc-hero-overlay" />
          <div className="pc-hero-content">
            <div className="pc-hero-tag">
              
            </div>
            <h1 className="pc-hero-title">
          Education<span className="pc-hero-gold"> and Training</span><br />
             
            </h1>
            <p className="pc-hero-desc">
              A key initiative that has gone hand in hand with Aravind's core clinical activities, contributing to its growth, is its strong commitment to education and training. Inspired by Dr. V.'s belief that “Intelligence and capability are not enough. There must also be the joy of doing something beautiful,” this initiative has not only strengthened Aravind but has also contributed to the field of ophthalmology by enabling institutions and professionals to carry forward his mission. Through structured training and academic programmes, Aravind equips professionals with the knowledge, skills, and compassion needed to enhance the quality of eye care.
            </p>
            <div className="pc-hero-stats">
              {STATS.map((s, i) => (
                <div key={i} className="pc-hero-stat">
                  <span className="pc-hero-stat-num">{s.number}</span>
                  <span className="pc-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ══ SECTION 1: EDUCATION & TRAINING — course details table ══ */}
        <section className="pc-section" id="education-training">
          <div className="pc-section-inner">
            <h2 className="pc-section-title edu-candidates-title">
              Candidates Trained <span className="pc-gold">2025 – 2026</span>
            </h2>
            <p className="pc-section-body">
              Aravind offers a range of education and training programmes aimed at extending the scope
              of eye care services. These courses cater to the specific needs of candidates aspiring
              to serve society. The table below gives the full category-wise breakdown.
            </p>

            <CoursesTable />

            <h3 className="edu-course-block-title" style={{ marginTop: 48 }}>
              Custom Designed <span className="edu-course-block-title-accent">Courses</span>
            </h3>
            <p className="pc-section-body">
              Aravind and LAICO offer customised training programmes tailored to individual and organisational needs, combining hands-on training and observation in clinical and administrative areas.
            </p>
            <p className="pc-section-body">
          During April 2025 to March 2026, 45 participants from 5 countries, including Antigua and Barbud, Ghana, India, South Sudan, and Vietnam attended these customised training programmes. The courses were conducted across various Aravind centres in Madurai, Coimbatore, Pondicherry, Tirunelveli, and at LAICO, based on their individual requirements.         
             </p>
          </div>
        </section>

        {/* ══ SECTION 2: CME / CPE ════════════════════════════ */}
        <section className="pc-section pc-infra-section" id="cme-cpe">
          <div className="pc-section-inner">
            <h2 className="pc-section-title">
              Continuing Medical Education <span className="pc-gold"></span>
            </h2>
            <p className="pc-section-body">
              Several Continuing Medical Education (CME) programmes, workshops, and retreat sessions were conducted across Aravind hospitals
              during 2025–26, serving as common forums to discuss the latest trends, innovations, and
              best practices in ophthalmology.
            </p>

            <CmeCarousel programmes={CME_PROGRAMMES} />

            {/* ── Other training & knowledge-sharing initiatives — gallery format ── */}
            <div className="edu-hospital-block" style={{ marginTop: 48 }}>
              <h3 className="edu-course-block-title">
                 <h2 className="pc-section-title">
             Other Training Knowledge Initiatives <span className="pc-gold"></span>
            </h2>
              </h3>
              <InitiativesGallery items={OTHER_INITIATIVES} />
            </div>
          </div>
        </section>

        {/* MORE DETAILS PROMPT */}
        <p className="pc-more-details">
          Kindly <a href="4_AR_Lr_Edu& Tra_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
        </p>
{/* PAGE NAVIGATION */}
<nav className="pc-page-nav" aria-label="Page navigation">
  <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/patientcare">
    <span className="pc-page-nav-label">&larr; Previous</span>
    <span className="pc-page-nav-title">Patient Care</span>
  </Link>
  <div className="pc-page-nav-divider" />
  <Link className="pc-page-nav-link pc-page-nav-link-next" to="/laico">
    <span className="pc-page-nav-label">Next &rarr;</span>
    <span className="pc-page-nav-title">Consultancy & Capacity Building</span>
  </Link>
</nav>
      </div>
    );
  }