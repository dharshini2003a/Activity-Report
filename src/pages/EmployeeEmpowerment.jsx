import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/employeeempowerment.css";

const HERO_IMAGE    = "employee empoverment  1080x1920 (1).webp";
const HERO_FALLBACK = "/EE_Hero.jpg";

/* ══════════════════════════════════════
   AI / KEYWORD SEARCH KNOWLEDGE BASE
══════════════════════════════════════ */
const KNOWLEDGE_BASE = [
  { tag: "Overview", title: "Employee Empowerment Mission", keywords: ["dr v", "spirituality", "5000 employees", "work culture"], text: "Aravind's 5,000+ employees provide invaluable support to patient care across various roles, guided by Dr. V's belief in approaching work from a spiritual perspective — serving God by serving humanity. A unique work culture blends tradition and spirituality with continuous technological advancement." },
  { tag: "Workplace", title: "Building a Healthy Workplace", keywords: ["safety", "wellbeing", "motivation", "self-development", "coimbatore", "chennai", "madurai", "pondicherry", "salem", "tirunelveli"], text: "Staff welfare and well-being across all Aravind centres were strengthened through initiatives that promoted motivation, continuous learning, physical health, self-development, and workplace safety — spanning book exhibitions, work-life balance sessions, safety orientations, karate and self-defence sessions, and distance education support." },
  { tag: "Workplace", title: "Safety & Professional Development", keywords: ["safety session", "fire safety", "esi benefits", "annual parameters audit", "farm fest", "occupational safety"], text: "Safety initiatives included sessions for Maintenance Teams, Security and Escalator Staff, Occupational Safety Orientation for AOPs, Fire Safety Awareness at Salem, and an ESI benefits session at Tirunelveli. Aravind-Pondicherry's facility and gardening team won third place among 261 institutions at the 36th Farm Fest 2026." },
  { tag: "Retreats", title: "Departmental Retreats 2025-26", keywords: ["cataract retreat", "david chang", "cornea retreat", "glaucoma retreat", "paediatric retreat", "hr retreat"], text: "The Cataract Retreat at Chennai (7 April 2025) featured Dr. David Chang. The Cornea and Refractive Surgery Retreat at Thanjavur (6-7 September 2025) focused on five-year strategic planning. The Glaucoma Retreat at Tirunelveli, the Paediatric Retreat at Coimbatore, and the HR Retreat at Madurai each brought together specialists for planning and collaboration." },
  { tag: "Beyond Eye Care", title: "Resident Social Responsibility Programme", keywords: ["rsr", "suvadugal", "kakaipandiniyar", "vellivethiyar", "vaanavil", "trichy"], text: "The RSR programme conducted community outreach at Kakaipandiniyar and Vellivethiyar Girls Higher Secondary Schools, Madurai, distributing school kits to 15 students and support kits to 20 students who had lost a parent. The Vaanavil initiative at the Rehabilitation Centre for Blind Women, Trichy, raised over Rs. 4.11 lakh through a handicrafts exhibition-cum-sale." },
  { tag: "Beyond Eye Care", title: "Nadi Utsav & Auro Connect", keywords: ["nadi utsav", "auro connect", "ganga", "yamuna", "narmada", "brahmaputra"], text: "Nadi Utsav at Chennai (5-6 February 2026) was a talent-based cultural event for first-year AOP trainees, with teams named after Indian rivers competing in rangoli, riddles, singing, dance, and drawing. Auro Connect, launched at Coimbatore from February 2026, is a monthly recreational initiative run by twelve employee teams." },
  { tag: "Training", title: "CMEs, CPEs & Workshops for AOPs and Admins", keywords: ["cme", "retina investigations", "design thinking", "anterior vitrectomy", "operation theatre cme", "drivers training"], text: "A comprehensive calendar of CMEs, CPEs, and workshops upgraded skills across clinical, technical, and administrative departments — including Retina Investigations Decoded, a Design Thinking workshop, Anterior Vitrectomy (V-Drill) with Alcon, Operation Theatre CME, and department-specific CMEs for Facility Coordinators, Medical Records, Personnel, and Transport." },
  { tag: "My Life My Pride", title: "My Life My Pride Programme", keywords: ["my life my pride", "life skills", "counselling", "mithram", "thalir thiran thittam"], text: "My Life, My Pride is a staff development initiative for AOPs built around three pillars — Life Skills, Counselling, and Extra-Curricular Activities. The Peer Counselling Programme 'Mithram' at Madurai trains employees to support peers, while the 'Thalir Thiran Thittam' Life Skills Programme reached 1,155 trainees across all centres." },
];

/* ══════════════════════════════════════
   DATA — BUILDING A HEALTHY WORKPLACE
   (one gallery card per individual event)
══════════════════════════════════════ */
const WORKPLACE_CARDS = [
  { id: 1,  image: "2025_10_CBE_Book Fair (3).webp",  fallbackBg: "#0d1f35", title: "Annual Book Exhibition",                         short: "Aravind-Coimbatore • 3-4 October 2025",   full: "Held in collaboration with New Century Book House, encouraging reading among AOPs and children." },
  { id: 2,  image: "2025_11_CBE_Life Balance_Talk (8).webp", fallbackBg: "#1a2d0d", title: "Work-Life Balance Session",                        short: "Aravind-Coimbatore • 4 November 2025",     full: "A session conducted to support staff well-being." },
  { id: 3,  image: "2025_11_CBE_Safety Session for Maintenance Teams (1).webp", fallbackBg: "#2d1a0d", title: "Safety Session for Maintenance Teams",           short: "Aravind-Coimbatore • 20 November 2025",    full: "Conducted to reinforce safe work practices." },
  { id: 4,  image: "2025_12_CBE_Safety Awareness_Securities & Escalator Staffs (3).webp",  fallbackBg: "#0d2d3a", title: "Safety Awareness Session for Security & Escalator Staff", short: "Aravind-Coimbatore • 12 December 2025", full: "Held to enhance operational safety." },
  { id: 5,  image: "2026_1_CBE_Karate Life Skills_Women (3).webp",          fallbackBg: "#3b2511", title: "Karate & Self-Defence Session for Women",         short: "Aravind-Coimbatore • 9 January 2026",      full: "Organised to promote confidence and safety." },
  { id: 6,  image: "2026_2_CBE_Women Safety at Work (5).webp",    fallbackBg: "#241a3b", title: "Women's Safety at Work & ICC Awareness Session", short: "Aravind-Coimbatore • 17 February 2026",  full: "Conducted to strengthen awareness and empowerment among staff." },
  { id: 7,  image: "2026_3_CBE_Safety Orientation training (3).webp",       fallbackBg: "#0d1f35", title: "Occupational Safety Orientation for AOPs",        short: "Aravind-Coimbatore • 20 March 2026",       full: "Conducted to promote workplace safety awareness." },
  { id: 8,  image: "2026_3_CBE_Orientation Program for Security Personnel and Lift Operators (6).webp", fallbackBg: "#1a2d0d", title: "Orientation for Security Personnel & Lift Operators", short: "Aravind-Coimbatore • 29 March 2026",   full: "Organised to strengthen professional preparedness." },

  { id: 9, image: "2025_10_Chennai_Tvisha Bloom With In (6).webp",             fallbackBg: "#0d2d3a", title: "Tvisha: Bloom Within",                       short: "Aravind-Chennai • 30 September 2025",      full: "A programme addressing work-life balance and personal well-being." },


  { id: 10, image: "2025_10_PDY_Motivational Talk_Preeti Srinivasan (1).webp",           fallbackBg: "#241a3b", title: "Cultural & Inspirational Talk",                    short: "Aravind-Pondicherry • 23 October 2025",    full: "An insightful talk organised as part of cultural and inspirational initiatives." },
  { id: 11, image: "2026_1_PDY_Parameter (1).webp", fallbackBg: "#0d1f35", title: "Annual Parameters Audit",                        short: "Aravind-Pondicherry • 9-11 January 2026",  full: "A three-day audit conducted to strengthen quality and performance standards." },
  { id: 12, image: "2026_2_PDY_Honouring Farm Fest Winner.webp",       fallbackBg: "#1a2d0d", title: "36th Farm Fest 2026 Recognition",                 short: "Aravind-Pondicherry • 23 February 2026",   full: "The facility coordination and gardening team was recognised for securing third place among 261 institutions, reflecting their dedication to maintaining a green campus." },
  
  { id: 13, image: "2026_2_Aram Seiya Virumbu_Drama (3).webp",   fallbackBg: "#3b2511", title: "Tamil Play Aram Seiya Virumbu",              short: "Aravind-Madurai • 7 February 2026",         full: "Based on stories from Silappathikaram, staged to promote cultural values and inspiration." },

  { id: 14, image: "2025_6_Salem_Motivational Session_Mr. Janakiraman_Psychologist  (1).webp",         fallbackBg: "#2d1a0d", title: "Motivational Session",                             short: "Aravind-Salem • 29 May 2025",              full: "Conducted to inspire and engage staff." },
  { id: 15, image: "2025_11_TVL_Thirukkural Competition (5).webp",          fallbackBg: "#0d2d3a", title: "Thirukkural Programme on Hospitality & Empathy",  short: "Aravind-Salem • 3 June 2025",              full: "Conducted to reinforce values of compassionate care." },
  { id: 16, image: "2025_6_Salem_Honoring Our Unsung Heroes (6).webp",         fallbackBg: "#3b2511", title: "Appreciation Event for Cleaning & Security Staff", short: "Aravind-Salem • 4 June 2025",              full: "Organised to recognise their invaluable contribution." },
  { id: 17, image: "2026_4_Salem_Fire Safety Awareness (4).webp",           fallbackBg: "#241a3b", title: "Fire Safety Awareness Programme",                 short: "Aravind-Salem • 28 March 2026",            full: "Conducted to improve emergency readiness." },

  { id: 18, image: "2025_5_TVL_Outdoor Play area_inau (3).webp",    fallbackBg: "#0d1f35", title: "Outdoor Play Area Inauguration",                  short: "Aravind-Tirunelveli • 7 May 2025",         full: "An Outdoor Play Area for AOP hostelers was inaugurated to encourage physical activity and recreation." },
  { id: 20, image: "2025_8_TVL_Expanding beyond the Horizons (1).webp",    fallbackBg: "#1a2d0d", title: "Educational Guidance Session",                    short: "Aravind-Tirunelveli • 7 August 2025",      full: "A session on higher education opportunities conducted to support staff development." },
  { id: 21, image: "2026_1_TVL_Motivational Session  (3).webp",     fallbackBg: "#2d1a0d", title: "Not Just a Routine Job…Motivational Session", short: "Aravind-Tirunelveli • 10 January 2026", full: "Held to inspire purpose-driven service among staff." },
  { id: 22, image: "2026_2_TVL_Motivational Session (6).webp",  fallbackBg: "#0d2d3a", title: "Lighting Lives Beyond Limits",                short: "Aravind-Tirunelveli • 9 February 2026",    full: "An inspirational programme conducted for outreach and project teams." },
  { id: 23, image: "2026_3_TVL_Benefits of ESI (2).webp",    fallbackBg: "#3b2511", title: "ESI Benefits Awareness Session",                  short: "Aravind-Tirunelveli • 20 March 2026",      full: "Organised to increase awareness of employee welfare provisions." },
];

/* ══════════════════════════════════════
   DATA — RETREATS (carousel cards)
══════════════════════════════════════ */
const RETREAT_CARDS = [
  {
    id: 1, image: "2025_4_Chennai_Cataract Retreat (14) copy.webp", fallbackBg: "#0d1f35",
    title: "CATARACT RETREAT",
    short: "Aravind-Chennai, 7th April 2025 — with Dr. David Chang engaging in a meaningful exchange of ideas.",
    full: "The Cataract Retreat brought together key stakeholders to discuss current practices and future directions in cataract care, with Dr. David Chang contributing valuable insights on emerging technologies and innovative care models",
  },
  {
    id: 2, image: "2025_9_Thanjavur_Cornea Retreat_CME (27).webp", fallbackBg: "#1a2d0d",
    title: "CORNEA & REFRACTIVE SURGERY RETREAT",
    short: "Aravind-Thanjavur, 6-7 September 2025 — strategic planning for the next five years.",
    full: "The Retreat for the Department of Cornea and Refractive Surgery at Aravind-Thanjavur focused on strategic planning for the next five years.",
  },
  {
    id: 3, image: "2025_10_TVL_Glaucoma Retreat (13).webp", fallbackBg: "#2d1a0d",
    title: "GLAUCOMA RETREAT",
    short: "Aravind-Tirunelveli, 11-12 October 2025 — reviewing current practices and recent developments.",
    full: "The Glaucoma Retreat at Aravind-Tirunelveli reviewed current practices and recent developments in glaucoma management.",
  },
  {
    id: 4, image: "2025_11_CBE_Paediatric Retreat Programme (4).webp", fallbackBg: "#0d2d3a",
    title: "PAEDIATRIC RETREAT",
    short: "Aravind-Coimbatore, 1-2 November 2025 — learning and collaboration among paediatric ophthalmologists.",
    full: "The Paediatric Retreat at Aravind-Coimbatore encouraged learning and collaboration among paediatric ophthalmologists.",
  },
  {
    id: 5, image: "2026_2_MDU_HR Retreat_Beyond tha Boundaries (25).webp", fallbackBg: "#3b2511",
    title: "HR RETREAT",
    short: "Aravind-Madurai, 27-28 February 2026 — staff development, productivity, and organisational effectiveness.",
    full: "The HR Retreat organised by Aravind-Madurai focused on staff development, productivity, and organisational effectiveness",
  },
];

/* ══════════════════════════════════════
   DATA — BEYOND EYE CARE (numbered gallery cards)
══════════════════════════════════════ */
const BEYOND_CARDS = [
  {
    id: 1, image: "2025_8_RSR_Vellivethiyar School (1).webp", fallbackBg: "#0d1f35",
    title: "SCHOOL KIT DISTRIBUTION",
    short: "As part of Resident Social Responsibility Programme, residents conducted Community outreach at Madurai schools",
    full: "Residents along with members of Suvadugal conducted community outreach activities at Kakaipandiniyar Girls Higher Secondary School and Vellivethiyar Girls Higher Secondary School, Madurai, on 7th & 8th August 2025. The sessions focused on eye health and hygiene, women's health, self-belief, empowerment, and the importance of financial independence. School kits containing notebooks, stationery, tiffin boxes, water bottles, and uniforms were distributed to 15 students from Classes 10 and 11, while an additional 20 students who had lost one or both parents also received support kits. ",
  },
  {
    id: 1, image: "2026_1_MDU_Vanavil (26).webp", fallbackBg: "#0d1f35",
    title: "VAANAVIL INITIATIVE",
    short: "As part of Resident Social Responsibility Programme, sales event was conducted for blind women in Trichy..",
    full: "Residents extended their service through the Vaanavil initiative to the Rehabilitation Centre for Blind Women in Trichy. On 1st January 2026, an exhibition-cum-sale of handicrafts was organised, providing visually challenged women with an opportunity to showcase their talents and support sustainable livelihoods. The event raised over Rs. 4.11 lakh.",
  },
  
  {
    id: 2, image: "2026_2_Chennai_ NADI UTSAV (4).webp", fallbackBg: "#1a2d0d",
    title: "NADI UTSAV — CHENNAI",
    short: "A talent-based cultural event for first-year AOP trainees, held on 5-6 February 2026.",
    full: "Nadi Utsav, a talent-based cultural event was conducted for first-year AOP trainees. Participants were divided into four teams named after Indian rivers — the Ganga, the Yamuna, the Narmada, and the Brahmaputra — and competed in activities such as rangoli, riddles, singing, dance, drawing, and theme-based events, showcasing their creativity and teamwork.",
  },
  {
    id: 3, image: "2026_3_CBE_Vetri Team (17).webp", fallbackBg: "#2d1a0d",
    title: "AURO CONNECT",
    short: "A monthly recreational initiative run by twelve employee teams, from February 2026 onwards at Aravind-Coimbatore.",
    full: "A monthly recreational initiative aimed at strengthening teamwork, encouraged creativity, and providing staff with a refreshing break from routine work schedules. Employees were divided into twelve teams, with each team taking turns to organise monthly activities. The events include singing, dance, yoga, and interactive games",
  },
];

/* ══════════════════════════════════════
   DATA — CMEs, CPEs & WORKSHOPS FOR AOPs AND ADMINS (items 1-16)
══════════════════════════════════════ */
const TRAINING_CARDS = [
  { id: 1, image: "Retina Investigations CME  (25).webp", fallbackBg: "#0d1f35", title: "CME on Retina Investigations Decoded 2025", short: "Aravind-Madurai, 11–13 April 2025", full: "Focused on advancements in retinal investigations, covering OCT, FFA, OCTA, ERG, EOG, B-Scan, and ASOCT through theory sessions and discussions." },
  { id: 2, image: "2025_4_CBE_Ref_Skill Development Workshop (5).webp", fallbackBg: "#1a2d0d", title: "Refraction Department Skill Development Workshop", short: "Aravind-Coimbatore, 14 April 2025", full: "For first-year trainees, strengthening essential clinical skills such as hand hygiene, instilling eye drops, and measuring visual acuity." },
  { id: 3, image: "2025_6_Design Thinking Workshop (3).webp", fallbackBg: "#2d1a0d", title: "Design Thinking Workshop", short: "School of Design Thinking, Chennai, 25–27 June 2025", full: "A three-day residential workshop at the 8012 FinTech Design Center building practical skills in user-centred innovation, product design, and process thinking." },
  { id: 4, image: "2025_8_TVL_Workshop on Patient centrered care (2).webp", fallbackBg: "#0d2d3a", title: "Workshop on Patient-Centred Care", short: "Aravind-Tirunelveli, 5 August 2025", full: "Used lectures and games to strengthen understanding of patient-centred care practices." },
  { id: 5, image: "2025_8_TVL_A workshop on Enhancing Teaching skills (3).webp", fallbackBg: "#3b2511", title: "Workshop on Enhancing Teaching and Learning Skills", short: "Aravind-Tirunelveli, 12 August 2025", full: "Improved teaching and learning methods for trainers and trainees through interactive activities and healthcare-based examples." },
  { id: 6, image: "2025_8_MDU_Instrument course (1).webp", fallbackBg: "#241a3b", title: "CME on Instruments and Equipment Maintenance", short: "Aravind-Madurai, 22–24 August 2025", full: "Included sessions on equipment maintenance, EMR integration, calibration techniques, and hands-on training for instrument technicians." },
  { id: 7, image: "2025_9_MDU_OP_CME_Ramesh (6).webp", fallbackBg: "#0d1f35", title: "Out-patient and In-patient CME", short: "Aravind-Madurai, 5–7 September 2025", full: "A two-day programme for OP and IP staff focused on strengthening clinical knowledge, patient care, and service quality." },
  { id: 8, image: "2025_9_MDU_OT CME (4).webp", fallbackBg: "#1a2d0d", title: "Operation Theatre CME", short: "Aravind-Madurai, 19–20 September 2025", full: "Covered patient safety, OT workflow, infection prevention, documentation, instrument care, CSSD processes, emergency preparedness, and quality standards." },
  { id: 9, image: "2025_10_MDU_Anterior Vitrectomy Workshop(5).webp", fallbackBg: "#2d1a0d", title: "ANTERIOR VITRECTOMY (V-DRILL) WORKSHOP", short: "Aravind-Madurai, 3–4 October 2025 ", full: "Conducted in collaboration with Alcon, enhancing OT AOPs' understanding of anterior vitrectomy settings and surgical complication management." },
  { id: 10, image: "2025_11_MDU_Optical & Medical CME (13).webp", fallbackBg: "#0d2d3a", title: "Optical and Pharmacy CME", short: "Aravind-Madurai, 10 November 2025", full: "Focused on operational efficiency, patient safety, ADR reporting, and strengthening collaboration between departments." },
  { id: 11, image: "2025_11_MDU_Facility CME (34).webp  ", fallbackBg: "#3b2511", title: "CME for Facility Coordinators and Catering Team", short: "Aravind-Madurai, 13–14 November 2025", full: "Featured sessions on hospitality, event management, communication, teamwork, and new innovations; 23 Facility Coordinators from across all Aravind centres participated." },
  { id: 12, image: "2025_11_MDU_Medical Record Dept_CME (7).webp", fallbackBg: "#241a3b", title: "Medical Records Department CME", short: "Aravind-Madurai, 21 November 2025", full: "Highlighted quality improvement, patient flow management, and the importance of accurate medical records." },
  { id: 13, image: "2025_12_MDU_Personnel Dep_CME (19).webp", fallbackBg: "#0d1f35", title: "Personnel Department CME on SPARK", short: "Aravind-Madurai, 5–6 December 2025", full: "Covered NABH requirements, payroll processes, EPFO updates, and labour law amendments." },
  { id: 14, image: "2026_1_PDY_CPE for Co-ordinators (4).webp", fallbackBg: "#1a2d0d", title: "CPE for Coordinators, Technicians, Supervisors and Tutors", short: "Aravind-Pondicherry, 3–4 January 2026", full: "Strengthened teamwork, quality standards, and patient-centred care practices." },
  { id: 15, image: "2026_1_MDU_Transport CME (5).webp", fallbackBg: "#2d1a0d", title: "Transport Department Drivers' Training Camp", short: "Aravind-Madurai, 11 January 2026", full: "A one-day programme strengthening knowledge and skills in safe driving, traffic regulations, vehicle maintenance, fuel efficiency, passenger safety, professional conduct, and responsible service." },
  { id: 16, image: "2026_2_MDU_Physician_CME (29).webp", fallbackBg: "#0d2d3a", title: "CME for the Physician Team", short: " Aravind-Madurai, 28 February 2026", full: "Organised by the General Medicine services of AECS, focussing on history taking, systemic examination, emergency management, and reducing errors in blood pressure measurement, temperature checking, and ECG recording." },
];

/* ══════════════════════════════════════
   DATA — DEPARTMENT-SPECIFIC CPEs & SPECIALIZED TRAINING (items 17-22)
   NEW SECTION: Separated from above
══════════════════════════════════════ */
const DEPARTMENT_CPE_CARDS = [
  { id: 1, image: "2026_3_MDU_Maintenance CPE_Batch 2 (25).webp", fallbackBg: "#3b2511", title: "CPE on Standardising and Strategies for Improving Efficiency (Insurance)", short: "Aravind-Madurai • 13–14 February 2026", full: "The programme focused on accountability, ethical practices, timelines, and patient-centred service." },
  { id: 2, image: "2026_2_MDU_Stores CPE (21).webp", fallbackBg: "#241a3b", title: "CPE on Supply Chain Accuracy and Its Impact on Patient Safety (Stores)", short: "Aravind-Madurai • 13–14 February 2026", full: "The CPE emphasised process excellence, accountability, and user-focused service within the Stores Department." },
  { id: 3, image: "2026_3_MDU_Maintenance CPE_Batch 2 (4).webp", fallbackBg: "#0d1f35", title: "Maintenance Department CPE 2026", short: "Aravind-Madurai • 7 & 14 March 2026", full: "The meet focused on safety, maintenance performance, new technologies, and sharing operational experiences." },
  { id: 4, image: "2026_3_TVL_OPTO Tech CME (25).webp", fallbackBg: "#1a2d0d", title: "Enhancing Clinical Excellence through Optometry & Ophthalmic Technology (OPTO Tech)", short: "Aravind-Tirunelveli • 29 March 2026", full: "The CME strengthened clinical and technical skills through theory sessions and hands-on training in diagnostics, refraction, and patient care. It was attended by 92 participants, including faculty members, optometrists from other hospitals, and trainees." },
  { id: 5, image: "2025_9_MDU_Photography Class_Dana Berger (14).webp", fallbackBg: "#2d1a0d", title: "Workshop on Digital Storytelling", short: "Aravind-Madurai • 26 September 2025", full: "As part of the Mike Myers Memorial Event, Digital Storytelling in Health Communication was organised by Aravind Communications, featuring a session by Dana Berger, Creative Director and Documentarian from the USA. The workshop provided videographers, video editors, photographers, graphic designers, instructional designers, doctors, and counsellors with valuable insights into the role of digital storytelling in healthcare communication." },
  { id: 6, image: "2025_10_MDU_Photography Exhibition (7).webp", fallbackBg: "#0d2d3a", title: "Photography Exhibition", short: "Aravind-Madurai • 4–7 October 2025", full: "The Mike Myers Memorial Photography Exhibition was organised to honour Mike Myers, an Aravind volunteer and photography consultant who passed away on 4th October 2024. The exhibition featured portraits of Mike, photographs taken by him, selected works of Aravind photographers whose ophthalmic images featured on journal covers, and memorable moments capturing Aravind's journey." },
];

/* ══════════════════════════════════════
   DATA — MY LIFE MY PRIDE PHOTO GALLERY
   Simple image + caption carousel (same visual format as the
   Kenya Cataract Programme photo carousel — image, caption below,
   arrows + dots, no title bar / no read-more).
   Replace `image` with the actual filenames once available.
══════════════════════════════════════ */
const MY_LIFE_MY_PRIDE_PHOTOS = [
  { id: 1, image: "2025_7_TPT_ Cert. Award Ceremony_Taekwondo, Dance, and Tailoring(5) (4).webp", fallbackBg: "#0d1f35", caption: "Karate and Takewonda Performance by AOPs at Aravind-Tirupati" },
  { id: 2, image: "2025_7_TPT_ Cert. Award Ceremony_Taekwondo, Dance, and Tailoring(10).webp", fallbackBg: "#1a2d0d", caption: "An AOP showcasing her tailoring works at Aravind-Tirupati" },
  { id: 3, image: "2025_10_CBE_Vallikummi Argandram (4).webp", fallbackBg: "#2d1a0d", caption: "Vallikummi Arangetram at Aravind-Coimbatore" },
  { id: 4, image: "2026_2_CBE_Tailoring & Aari Closing Ceremony (3).webp", fallbackBg: "#0d2d3a", caption: "Aari work Class for AOPs at Aravind-Coimbatore" },
];

/* ══════════════════════════════════════
   CENTER ORDER (for "Building a Healthy Workplace" grouping)
   Order: Coimbatore, Chennai, Pondicherry, Madurai, Salem, Tirunelveli
══════════════════════════════════════ */
const CENTER_ORDER = [
  "Aravind-Coimbatore",
  "Aravind-Chennai",
  "Aravind-Pondicherry",
  "Aravind-Madurai",
  "Aravind-Salem",
  "Aravind-Tirunelveli",
];

function getCenterFromShort(short) {
  return (short.split("•")[0] || "").trim();
}

function groupCardsByCenter(cards) {
  const map = {};
  cards.forEach((card) => {
    const center = getCenterFromShort(card.short);
    if (!map[center]) map[center] = [];
    map[center].push(card);
  });
  return map;
}

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
          placeholder="Ask about Employee Empowerment — e.g. retreats, workplace, My Life My Pride, RSR"
        />
        {searched && (
          <button className="ai-close-btn" style={{ borderRadius: 0, borderTop: "none", borderBottom: "none", minHeight: 50 }} onClick={handleClear}>&#10005;</button>
        )}
        <button className="ai-search-btn" onClick={handleSearch} disabled={!query.trim()}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <div className="ai-answer-box" style={{ borderLeft: "4px solid #c8921a", background: "#fffbf2" }}>
          <p className="ai-answer-text" style={{ color: "#555" }}>
            No direct match in this report. Try asking about retreats, workplace wellbeing, My Life My Pride, or RSR.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <ul className="ai-results-list">
          {results.map((item, index) => (
            <li key={`${item.title}-${index}`} className="ai-result-card">
              <span className="ai-answer-label">{item.tag} • {item.title}</span>
              <p className="ai-answer-text">{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BUILD ONE CARD PER CENTRE (Sponsors'-Day style)
   Each centre becomes a single outer card — cover photo, title,
   short summary, full description — with a nested `photos` array
   holding every individual event photo + caption for that centre.
   The nested photos are only revealed inside the zoom lightbox
   (see PhotoCarouselCard below), navigable via arrows + counter.
══════════════════════════════════════════════════════════════ */
function buildWorkplaceCenterCards(cards) {
  const grouped = groupCardsByCenter(cards);
  return CENTER_ORDER.filter((c) => grouped[c] && grouped[c].length).map((center, idx) => {
    const events = grouped[center];
    const displayName = center.replace("Aravind-", "");
    return {
      id: idx + 1,
      image: events[0].image,
      fallbackBg: events[0].fallbackBg,
      title: `Aravind-${displayName}`,
      short: `${events.length} programme${events.length > 1 ? "s" : ""} held under Building a Healthy Workplace at ${displayName}.`,
      full: `As part of Building a Healthy Workplace, ${events.length} initiatives were organised at Aravind-${displayName} — ${events.map((e) => e.title).join(", ")} — strengthening motivation, safety, and staff well-being.`,
      photos: events.map((e, i) => ({
        id: i + 1,
        image: e.image,
        fallbackBg: e.fallbackBg,
        caption: `${e.title} — ${e.short.replace(`Aravind-${displayName} • `, "")}`,
      })),
    };
  });
}

const WORKPLACE_CENTER_CARDS = buildWorkplaceCenterCards(WORKPLACE_CARDS);

/* ══════════════════════════════════════════════════════════════
   REUSABLE PHOTO CAROUSEL SECTION
   Renders either a "list" card (bulleted items) or a "text" card
   (single paragraph), based on card.items vs card.full.
══════════════════════════════════════════════════════════════ */
function PhotoCarouselSection({ cards, ariaLabel, numbered, hideReadMore }) {
  const [current, setCurrent] = useState(0);
  const [openCard, setOpenCard] = useState(null);
  const trackRef = useRef(null);
  const total = cards.length;

  const scrollTo = (idx) => {
    setCurrent(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx];
      if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);
  const handleToggle = (id) => setOpenCard((p) => (p === id ? null : id));

  return (
    <div className="carousel-wrap">
      <div className="carousel-track-wrap">
        <button className="carousel-arrow carousel-arrow-left" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8592;</button>

        <div className="carousel-track" ref={trackRef}>
          {cards.map((card, i) => (
            <PhotoCarouselCard
              key={card.id}
              card={card}
              num={numbered ? i + 1 : null}
              isActive={current === i}
              isOpen={openCard === card.id}
              onToggle={() => handleToggle(card.id)}
              onCardClick={() => scrollTo(i)}
              hideReadMore={hideReadMore}
            />
          ))}
        </div>

        <button className="carousel-arrow carousel-arrow-right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">&#8594;</button>
      </div>

      <div className="carousel-dots">
        {cards.map((_, i) => (
          <button key={i} className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`} onClick={() => scrollTo(i)} aria-label={`${ariaLabel} ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ── Single carousel card (image + title + short + expandable full content) ── */
function PhotoCarouselCard({ card, num, isActive, isOpen, onToggle, onCardClick, hideReadMore }) {
  const fullRef = useRef(null);
  const [fullH, setFullH] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => { if (fullRef.current) setFullH(fullRef.current.scrollHeight); }, [isOpen]);

  const hasGallery = Array.isArray(card.photos) && card.photos.length > 0;
  const photos = hasGallery ? card.photos : [{ image: card.image, fallbackBg: card.fallbackBg, caption: card.title }];
  const total = photos.length;
  const current = photos[photoIndex] || photos[0];

  const openZoom = () => { setPhotoIndex(0); setZoomOpen(true); };
  const prevPhoto = (e) => { e.stopPropagation(); setPhotoIndex((i) => (i - 1 + total) % total); };
  const nextPhoto = (e) => { e.stopPropagation(); setPhotoIndex((i) => (i + 1) % total); };

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowLeft") setPhotoIndex((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setPhotoIndex((i) => (i + 1) % total);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomOpen, total]);

  return (
    <div className={`carousel-card${isActive ? " carousel-card-active" : ""}`} onClick={!isActive ? onCardClick : undefined}>
      <div className="carousel-card-img-wrap" style={{ cursor: "pointer" }} onClick={openZoom}>
        <img src={card.image} alt={card.title} className="carousel-card-img" loading="lazy" decoding="async" onError={(e) => { e.target.style.opacity = "0"; }} style={{ background: card.fallbackBg }} />
        
        <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
      </div>

      <div className="carousel-card-body">
        <h3 className="carousel-card-title">{card.title}</h3>
        <p className="carousel-card-short">{card.short}</p>

        {!hideReadMore && (
          <>
            <div ref={fullRef} style={{ maxHeight: isOpen ? `${fullH || 800}px` : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.45s ease, opacity 0.3s ease" }}>
              {card.items ? (
                <ul className="research-plain-list" style={{ marginTop: 4 }}>
                  {card.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              ) : (
                <p className="carousel-card-full">{card.full}</p>
              )}
            </div>

            <button className="carousel-readmore-btn" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
              {isOpen
                ? <>Read less <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: 10 }}>&#9660;</span></>
                : <>Read more <span style={{ fontSize: 10 }}>&#9660;</span></>}
            </button>
          </>
        )}
      </div>

      {zoomOpen && createPortal(
        <div className="photo-lightbox-overlay" onClick={() => setZoomOpen(false)}>
          <div className="photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setZoomOpen(false)}>&#10005;</button>

            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {total > 1 && (
                <button className="carousel-arrow" onClick={prevPhoto} aria-label="Previous" style={{ position: "absolute", left: -60, zIndex: 2 }}>&#8592;</button>
              )}

              <div className="photo-lightbox-img-wrap">
                <img
                  src={current.image}
                  alt={current.caption || card.title}
                  className="photo-lightbox-img"
                  onError={(e) => { e.target.style.opacity = "0"; }}
                  style={{ background: current.fallbackBg }}
                />
              </div>

              {total > 1 && (
                <button className="carousel-arrow" onClick={nextPhoto} aria-label="Next" style={{ position: "absolute", right: -60, zIndex: 2 }}>&#8594;</button>
              )}
            </div>

            <p className="photo-lightbox-caption">{current.caption || card.title}</p>
            {total > 1 && (
              <p style={{ margin: "4px 0 0", textAlign: "center", fontSize: 12, color: "#c8921a", fontWeight: 700 }}>
                {photoIndex + 1} / {total}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIMPLE PHOTO CAROUSEL — image + caption only (no title bar,
   no read-more). Matches the Kenya Cataract Programme carousel
   format exactly: arrow / photo cards / arrow, dots below,
   caption centred under each photo.
══════════════════════════════════════════════════════════════ */
function SimplePhotoCarousel({ items }) {
  const trackRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const getCardStep = () => {
    const track = trackRef.current;
    if (!track) return 300;
    const card = track.querySelector(".photo-card");
    if (!card) return 300;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "24") || 24;
    return card.offsetWidth + gap;
  };

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * getCardStep(), behavior: "smooth" });
  };

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * getCardStep(), behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = getCardStep();
    const idx = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(idx, total - 1)));
  };

  return (
    <>
      <div className="carousel-wrap" style={{ marginTop: 20, padding: 0 }}>
        <div className="carousel-track-wrap">
          <button className="carousel-arrow" onClick={() => scrollByCard(-1)} aria-label="Previous photo">&#8592;</button>
          <div className="carousel-track" ref={trackRef} onScroll={handleScroll}>
            {items.map((item, i) => (
              <div key={item.id} className="photo-card" onClick={() => setLightbox(i)}>
                <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
                  <img src={item.image} alt={item.caption} className="photo-card-img" loading="lazy" decoding="async"
                    onError={e => { e.target.style.opacity = "0"; }} />
                  <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
                </div>
                <p className="photo-card-caption">{item.caption}</p>
              </div>
            ))}
          </div>
          <button className="carousel-arrow" onClick={() => scrollByCard(1)} aria-label="Next photo">&#8594;</button>
        </div>
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button key={i} className={`carousel-dot${activeIndex === i ? " carousel-dot-active" : ""}`}
              onClick={() => scrollToIndex(i)} aria-label={`Go to photo ${i + 1}`} />
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>&#10005;</button>
            {total > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-prev"
                onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            )}
            <div className="photo-lightbox-img-wrap">
              <img
                src={items[lightbox].image}
                alt={items[lightbox].caption}
                className="photo-lightbox-img"
                style={{ background: items[lightbox].fallbackBg }}
                onError={e => { e.target.style.opacity = "0"; }}
              />
            </div>
            {total > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-next"
                onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
            )}
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function EmployeeEmpowerment() {
  return (
    <div className="pc-page">

      {/* ══ HERO ══ */}
      <section className="pc-hero">
        <div className="pc-hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-overlay" />
        <div className="pc-hero-content">
          <div className="pc-hero-tag">
            
          </div>
          <h1 className="pc-hero-title">
          Employee <span className="pc-hero-gold">Empowerment</span>
          </h1>
          <p className="pc-hero-desc">
            "With a firm belief in approaching work from a spiritual perspective, I have strived
            to be open to the divine force. We can serve humanity in our normal professional lives
            by being more generous and less selfish in what we do. You don't have to be a
            'religious' person to serve God. You serve God by serving humanity." — Dr. V.
            As partners in the fight against needless blindness, Aravind's 5,000+ employees
            provide invaluable support to patient care across various capacities and roles. A
            unique work culture that blends tradition and spirituality with the continuous
            adoption of technological advancements is key to Aravind's progress.
          </p>
        </div>
      </section>
      {/* ══ SECTION 1: BUILDING A HEALTHY WORKPLACE ══ */}
      <section className="pc-section pc-infra-section" id="workplace">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Building a Healthy <span className="pc-gold">Workplace</span></h2>
          <p className="pc-section-body">
            Staff welfare and well-being across all Aravind centres were strengthened through
            initiatives that promoted motivation, continuous learning, physical health,
            self-development, and workplace safety. These initiatives were reflected in a range
            of programmes, including:
          </p>
          <div style={{ marginTop: 32 }}>
            <PhotoCarouselSection cards={WORKPLACE_CENTER_CARDS} ariaLabel="Centre" numbered hideReadMore />
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: RETREATS ══ */}
      <section className="pc-section" id="retreats">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Retreats</h2>
          <p className="pc-section-body">
            Departmental retreats brought together key stakeholders across Aravind's network to
            discuss current practices, plan for the future, and strengthen collaboration.
          </p>
          <div style={{ marginTop: 32 }}>
            <PhotoCarouselSection cards={RETREAT_CARDS} ariaLabel="Retreat" />
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: BEYOND EYE CARE ══ */}
      <section className="pc-section pc-infra-section" id="beyond">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Beyond <span className="pc-gold">Eye Care</span></h2>
          <div style={{ marginTop: 32 }}>
            <PhotoCarouselSection cards={BEYOND_CARDS} ariaLabel="Highlight" numbered />
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: CMEs, CPEs & WORKSHOPS FOR AOPs AND ADMINS (items 1-16) ══ */}
      <section className="pc-section" id="training">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">CME's CPE's <span className="pc-gold">&Workshops for AOPs and Admins</span></h2>
          <p className="pc-section-body">
            A comprehensive calendar of CMEs, CPEs, and workshops upgraded skills across clinical,
            technical, and administrative departments throughout the year.
          </p>
          <div style={{ marginTop: 32 }}>
            <PhotoCarouselSection cards={TRAINING_CARDS} ariaLabel="Programme" numbered />
          </div>
        </div>
      </section>

      {/* ══ SECTION 4b: DEPARTMENT-SPECIFIC CPEs & SPECIALIZED TRAINING (NEW SECTION — items 17-22) ══ */}
      <section className="pc-section" id="department-cpe">
        <div className="pc-section-inner">
          <h2 className="pc-section-title"> Department-Specific CPEs<span className="pc-gold"> & Specialised Training</span></h2>
          <p className="pc-section-body">
            Targeted CPE programmes and specialised workshops for key departments strengthened operational excellence, interdepartmental collaboration, and professional expertise across Aravind's services.
          </p>
          <div style={{ marginTop: 32 }}>
            <PhotoCarouselSection cards={DEPARTMENT_CPE_CARDS} ariaLabel="Department Programme" numbered />
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: MY LIFE MY PRIDE ══ */}
      <section className="pc-section pc-section-tight-bottom pc-infra-section" id="mylife">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">My Life<span className="pc-gold"> My Pride</span></h2>
          <p className="pc-section-body">
            My Life, My Pride is a staff development initiative of AECS designed for AOPs to help
            them become physically and emotionally stronger while supporting their overall
            well-being and personal growth. The programme focuses on physical fitness, emotional
            resilience, vocational skills, and personal development. It is built around three key
            pillars: Life Skills, Counselling, and Extra-Curricular Activities, offering a
            holistic approach to employee empowerment.
          </p>

          <div className="edu-course-block" style={{ marginTop: 32 }}>
            <div className="edu-course-block-title">Counselling <span className="edu-course-block-title-accent">Programme</span></div>
            <p className="pc-section-body">
              The programme provides support at two levels: Personal Counselling and Peer Group
              Counselling. At Aravind-Chennai, personal counselling was provided on an ongoing
              one-to-one basis for trainees and employees, benefiting 375 participants. At
              Aravind-Pondicherry, a dual-mode approach combining group sessions and structured
              individual counselling supported 37 participants. At Aravind-Madurai, the Peer
              Counselling Programme, named Mithram, was launched to train a selected group of
              employees to support their peers facing personal and work-related challenges. The
              programme was initiated on 11th July 2025 with a workshop led by Dr. Synthia Mary
              Mathew, Retired Professor of Psychology from Lady Doak College, Madurai. The
              workshop focused on key areas such as self-awareness, interpersonal development,
              relationship management, and constructive feedback. Subsequently, two follow-up
              sessions were conducted on a quarterly basis to strengthen the peer counsellors'
              counselling skills and enhance their effectiveness in supporting colleagues.
            </p>
          </div>

          <div className="edu-course-block" style={{ marginTop: 40 }}>
            <div className="edu-course-block-title">Life Skills <span className="edu-course-block-title-accent">Programme</span></div>
            <p className="pc-section-body">
              The "Thalir Thiran Thittam" Life Skills Programme was integrated into the
              AOP curriculum and is conducted for first- and second-year AOP trainees across all
              tertiary and secondary Aravind centres. The programme covered 70 topics through
              activity-based learning methods. Professionally trained facilitators conducted
              sessions using interactive activities, video-based learning, and guided discussions.
              A total of 1,155 trainees participated across all centres.
            </p>
          </div>

          <div className="edu-course-block" style={{ marginTop: 40 }}>
            <div className="edu-course-block-title">Extra-Curricular <span className="edu-course-block-title-accent">Activities</span></div>
            <p className="pc-section-body">
              This initiative encourages voluntary participation and offers AOPs a wide range of
              opportunities in vocational skills, sports, performing arts, language development,
              and cultural activities. These programmes are conducted across all centres and are
              designed to foster discipline, creativity, teamwork, leadership, and professional
              confidence. Participants are also encouraged to take part in competitions organised
              by other institutions. Their achievements and prize-winning performances not only
              showcased their talents but also enhanced their confidence and motivation for
              personal and professional growth.
            </p>
          </div>

          {/* Photo gallery — 4 photos, same carousel format as the Kenya
              Cataract Programme carousel (image + caption, arrows, dots) */}
          <div className="edu-course-block" style={{ marginTop: 40 }}>
            <SimplePhotoCarousel items={MY_LIFE_MY_PRIDE_PHOTOS} />
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="09_AR_Lr_EE_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/auroitech">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">Information & Technology</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/innovation">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Innovation</span>
        </Link>
      </nav>

    </div>
  );
}