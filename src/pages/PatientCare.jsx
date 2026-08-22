import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/patientcare.css";

const HERO_IMAGE    = "patient care 1080x1920.webp";
const HERO_FALLBACK = "/Covr_Page%20-%20Copy";



// ── Patient Care Stats (row 1 only) ──
const PC_STATS_ROW1 = [
  { number: "8",    label: "Tertiary Eye Hospitals" },
  { number: "8",    label: "Secondary Eye Care Centres" },
  { number: "8",    label: "Community Eye Clinics" },
  { number: "120",  label: "Vision Centres" },

];


const OUTPATIENT_STATS = [
  { value: "xxx", label: "Paying Sections" },
  { value: "xxx", label: "Free Sections" },
  { value: "xxx", label: "Screening camps" },
  { value: "xxx", label: "Vision Centres" },
  { value: "xxx", label: "Community Eye Clinics & City Centres" },
  { value: "xxx", label: "Total Outpatient Visits", highlight: true },
];

const SURGERY_STATS = [
  { value: "xxx", label: "Paying sections" },
  { value: "xxx", label: "Subsidised (Walk-Ins to the free hospital)" },
  { value: "xxx", label: "Free (Through screening camps)" },
  { value: "xxx", label: "Total Surgeries, Laser procedures and Injections", highlight: true },
];

const OUTREACH_PERFORMANCE_STATS = [
  { value: "—", label: "No. of Comprehensive Eye Camps" },
  { value: "—", label: "No. of Diabetic Retinopathy Screening Camps" },
  { value: "—", label: "No. of Refraction Camps" },
  { value: "—", label: "Eye Screening of School Children – Base Hospital (Schools served)" },
  { value: "—", label: "No. of Paediatric Eye Screening Camps" },
  { value: "—", label: "RoP Screening (Screening Visits)" },
];

function StatGroup({ title, stats }) {
  return (
    <div className="pc-stats-group">
      <h3 className="pc-stats-group-title">{title}</h3>
      <div className="pc-stats-icon-grid">
        {stats.map((s, i) => (
          <div key={i} className={`pc-stat-card${s.highlight ? " pc-stat-card-highlight" : ""}`}>
            <div className="pc-stat-value">{s.value}</div>
            <div className="pc-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PerformanceStatistics() {
  return (
    <div className="pc-stats-wrap">
      <StatGroup title="Outpatient Visits" stats={OUTPATIENT_STATS} />
      <StatGroup title="Surgeries, Laser procedures and Injections" stats={SURGERY_STATS} />
      <StatGroup title="Outreach Performance" stats={OUTREACH_PERFORMANCE_STATS} />
    </div>
  );
}

const INFRA_CARDS = [
  {
    id: 1,
    image: "2025_4_Thanjavur_Inauguration_Builiding_RK(1).webp",
    fallbackBg: "#1a3a5c",
    title: "LAUNCH OF ARAVIND EYE HOSPITAL, THANJAVUR ",
    short: "A new tertiary centre was inaugurated at Thanjavur, on 20th April 2025, serving a population of 7.2 million across the Delta region of Tamil Nadu.",
    full: "A new tertiary centre for Aravind was constructed at Thanjavur and dedicated on 20th April 2025. The inaugural event was presided over by Shri. P.R. Venketrama Raja, Chairman, Ramco Group, and Shri. Babaji Rajah Bhonsle, Hereditary Trustee, Thanjavur Palace Devasthanam. The hospital, spanning 400,000 sq. ft., offers both free and paid services covering all ophthalmic subspecialties, with the capacity to handle 1,700–2,000 outpatients daily and perform 250–300 surgeries per day. Equipped with state-of-the-art facilities, the new hospital aims to ensure continued access to quality eye care for a population of 7.2 million across Thanjavur and the surrounding districts.",
  },
  {
    id: 2,
    image: "chengalpattu_2026 (2).webp",
    fallbackBg: "#0d2d1f",
    title: "BEENT EYE HOSPITAL, CHENGALPATTU JOINS THE ARAVIND FAMILY",
    short: "BEENT Eye Hospital, Chengalpattu became Aravind's eighth secondary centre in Chennai on 29th August 2025.",
    full: "BEENT Eye Hospital, Chengalpattu, became part of the Aravind family on 29th August 2025. Now functioning as Aravind's eighth secondary centre in Chennai, the merger represents the coming together of two institutions united by shared values, principles, and practices. This integration has further strengthened Aravind's service to the people of Chengalpattu, expanding the reach and impact of quality eye care in the region.,"
  },
  {
    id: 3,
    image: "2025_12_Salem_New Building_Inauguration (7) copy.webp",
    fallbackBg: "#2d1a0d",
    title: "RELOCATION OF ARAVIND-SALEM",
    short: "A new facility of Aravind-Salem was inaugurated on 14 December 2025.",
    full: "To meet the growing demand for quality eye care, Aravind-Salem has relocated to a nearby location in Uthamacholapuram. From its earlier building spread across 42,000 sq. ft., the hospital has moved to a new facility covering 250,000 sq. ft. over seven acres of land. The new hospital has the capacity to serve 2,000 patients per day and perform 150 surgeries daily through 14 operation theatres. The new building was inaugurated on 14th December 2025 by the Honourable Supreme Court Justice Thiru. R. Mahadevan. The new Operation Theatre building commenced operations on 8th January 2026 with the installation and launch of advanced sterilisation facilities",
  },
  {
    id: 4,
    image: "2007_Madurai_Building.webp",
    fallbackBg: "#1a2d3a",
    title: "PLAN FOR A NEW CAMPUS FOR ARAVIND-MADURAI",
    short: "As part of future expansion, there are plans to relocate Aravind-Madurai, the first hospital in the network, to a nearby site.",
    full: "Preliminary planning for construction, design, and the incorporation of modern technology, while ensuring the capacity to meet increasing patient volumes, has gained momentum. Visits by the senior leadership team of cataract surgical and refractive error coverage, diabetic retinopathy screening and SPECS 2030, a global initiative addressing refractive errors, and outlining the way forward to achieve the 2030 global eye health targets",
  },
];

// ── NEW: Initiatives Data (7 carousel items) ──
const INITIATIVE_CARDS = [
  {
    id: 1,
    image: "initiative-1-vr-simulator.webp",
    fallbackBg: "#0d2d3a",
    title: "RELOCATION OF STORES DEPARTMENT, ARAVIND-MADURAI",
    short: "The stores department of Aravind-Madurai was relocated on 12th May 2025.",
    full: "From the OP building, the stores department has moved to the AMRF building, in order to streamline processes and facilitate the smoother store operations.",
  },
  {
    id: 2,
    image: "initiative-2-mrd-facility.webp",
    fallbackBg: "#1a2d0d",
    title: "A NEW MRD FACILITY AT ARAVIND-THENI",
    short: "A new MRD facility was opened at Aravind-Theni, on 30th July 2025.",
    full: "Inaugurated by Srinivasulu Thayam, Chief Technology Officer, Auroitech, the facility will help ease patient congestion in the OPD and ensure more efficient use of the available space.",
  },
  {
    id: 3,
    image: "initiative-3-eye-gym.webp",
    fallbackBg: "#2d1a2d",
    title: "EYE GYM, VISION-SKILLS TRAINING LAB & MYOPIA CONTROL CLINIC",
    short: "Aravind-Tirunelveli opened Eye Gym on 15th September 2025.",
    full: "This specialised facility is dedicated to diagnosing and treating vision disorders such as amblyopia (lazy eye) and binocular vision anomalies.",

  },
  {
    id: 4,
    image: "2025_12_PDY_Clinical Trial Unit_Inauguration (7).webp",
    fallbackBg: "#1a1a2d",
    title: "CLINICAL TRIAL UNIT AT ARAVIND-PONDICHERRY",
    short: "Opening of the first Clinical Trial Unit (CTU) at Aravind-Pondicherry,on 31st December 2025.",
    full: "Inaugurated by Dr. G. Natchiar, Director Emeritus, AECS, the unit has been established to provide all essential research investigations in a single dedicated location.",
  },
  {
    id: 5,
    image: "2026_2_MDU_Lowvision Community Meet-up (20).webp",
    fallbackBg: "#2d2d1a",
    title: "LOW VISION COMMUNITY MEETUP & AWARENESS",
    short: "Aravind-Madurai organised the Low vision community meetup & awareness on 14th February 2026.",
    full: "The programme was organised to create awareness about education, career opportunities, and rehabilitation services for persons with severe visual impairments.",
  },
  {
    id: 6,
    image: "2026_2_CBE_Renovated Optical and Lens Grinding Labs (8).webp",
    fallbackBg: "#1a2d2d",
    title: "RENOVATED OPTICAL EDGING & ESSILOR LENS LAB",
    short: "The renovated facility at Aravind-Coimbatore was inaugurated on 2nd March 2026.",
    full: "Developed in accordance with Pollution Control Board norms, the facility provides an eco-friendly and pollution-free working environment for employees.",
  },
  {
    id: 7,
    image: "2026_3_MDU_Aravind–Alcon Center for Surgical Advancement_Inau (2).webp",
    fallbackBg: "#2d1a1a",
    title: "INAUGURATION OF ARAVIND-ALCON CENTRE-FOR-SURGICAL-ADVANCEMENT (VR) ",
    short: "The Aravind-Alcon Centre, along with the conference hall, was inaugurated at Aravind-Madurai on 25th March 2026.",
    full: "The centre aims to enhance surgeons’ skills through advanced simulation technologies, supporting excellence in patient care.",
  },
];


const OUTREACH_CARDS = [
  {
    id: 1,
    image: "Sight First Seminar.webp",
    fallbackBg: "#0d2240",
    title: "Sight First Seminars 2025–2026",
    short: "The programmes were held on different dates in Madurai, Thanjavur, and Pondicherry for members of the Lions Districts, focusing on strengthening the SightFirst initiative and reinforcing their collective commitment to eliminating needless blindness.",
    full: "Sight First Seminars were organised at Aravind Eye Hospitals in Madurai, Thanjavur, and Pondicherry on 31st August 2025, 27th September 2025, and 12th October 2025, respectively. Conducted for the newly elected office bearers of Lions Districts 3242B and 3242F, the seminars aimed to raise awareness about eye health issues and strengthen Lions members' participation in community eye care programmes.",
    
  },
  {
    id: 2,
    image: "2026_1_MDU_Camp_Retreat (3).webp",
    fallbackBg: "#0d2d1f",
    title: "Annual Outreach Planning Meeting 2026",
    short: "Held at Aravind-Madurai on 7–8 January 2026, the programme brought together 73 camp staff from all Aravind tertiary hospitals to review performance and plan outreach strategies.",
    full: "Conducted for over three decades during the first week of January, the Annual Outreach Planning Meeting brings together outreach teams from all Aravind tertiary hospitals to review the previous year's performance and plan strategies for the year ahead. This year's meeting, held at Aravind-Madurai on 7–8 January 2026, focused not only on performance review but also on in-depth discussions about challenges faced in 2025. The meeting featured individual organiser presentations, panel discussions, group activities, and sessions on various outreach-related topics and was attended by 73 camp staff from all Aravind tertiary centres.",
  },
  {
    id: 3,
    image: "2025_10_MDU_Sponsors Day (33).webp",
    fallbackBg: "#2d1a0d",
    title: "Sponsors' Day at Aravind Eye Hospitals",
    short: "Five Sponsors' Day programmes were held at Tirunelveli, Madurai, Chennai, Tirupati, and Coimbatore between August 2025 and January 2026.",
    full: "A total of five Sponsors' Day programmes were organised at Aravind Eye Hospitals in Tirunelveli, Madurai, Chennai, Tirupati, and Coimbatore on 31st August 2025, 9th October 2025, 11th October 2025, 6th December 2025, and 4th January 2026, respectively. These events served as a heartfelt expression of gratitude to the many generous donors and well-wishers who continue to support Aravind's mission. The programmes featured detailed presentations showcasing the hospital's achievements, patient care statistics, community outreach initiatives, and success stories from the past year. Representatives from several social organisations and volunteers were felicitated for their commendable service in the field of eye care.",
    photos: [
      { id: 1, image: "2025_8_TVL_Sponsors Day (13).webp", fallbackBg: "#1a2d0d", caption: "Sponsors' Day — Aravind-Tirunelveli, 31st August 2025" },
      { id: 2, image: "2025_8_TVL_Sponsors Day (15).webp", fallbackBg: "#2d1a0d", caption: "Sponsors' Day —  Aravind-Coimbatore, 4th January 2026" },
      
    ],
  },
];

/* Vision Centers Inaugurated Photos — 2025-26 */
const VC_INAUGURAL_PHOTOS = [
  { id: 1, image: "2025_9_VC_ Pallathur_ Inauguration (2) copy.webp",fallbackBg: "#0d2240", caption: "Inauguration of Vision Centre at Pallathur — Aravind-Madurai, 12th September 2025" },
  { id: 2, image: "2025_6_MDU_Lakshmi Vision Centre_Inau (6).webp", fallbackBg: "#1a2d0d", caption: "Inauguration of Vision Centre at Lakshmi Hospital (TVS Group), Madurai — 25th June 2025" },
  { id: 3, image: "2026_1_TVL_Sengottai VC inauguration (15).webp", fallbackBg: "#2d1a0d", caption: "Inauguration of Vision Centre at Shengottai — Aravind-Tirunelveli, 23rd January 2026" },
];

/* Vision Center Events — 2025-26 */
const VC_EVENT_CARDS = [
  {
    id: 1, fallbackBg: "#0d2240",
    title:"SKILL UPGRADATION PROGRAMME",
    short: "A skill upgradation programme for Madurai VC staff was conducted by Aravind Madurai on 28th April 2025.",
    full: "The programme focused on Importance and key aspects of taking quality fundus images and techniques. Further, a hands-on training was conducted to ensure the staff are technically competent to take quality fundus images which helps in reducing ungradable images.",
  },
  {
    id: 2, fallbackBg: "#1a2d0d",
    title: "Seva Audit of Vision Centres",
    short: "As part of its ongoing commitment to excellence in eye care delivery, Aravind-Salem conducted a Seva Audit of Vision Centres at Omalur and Mecheri on 12th May 2025.",
    full: "And at Thalaivasal and Harur on 13th May 2025. The purpose of these visits was to ensure that all Vision Centres continue to uphold the highest standards of community eye care.",
  },
  {
    id: 3, fallbackBg: "#2d0d1a",
    title: "Vision Centre CMEs",
    short: "Vision Centre CMEs were organised by Aravind Eye Hospitals in Tirunelveli and Madurai on 28th September 2025 and 7-8 November 2025 respectively.",
    full: "These sessions aimed to enhance knowledge and skills, update participants on recent developments in clinical practice, and reinforce the importance of delivering quality eye care in the community.",
  },
  {
    id: 4, fallbackBg: "#0d2d2d",
    title: "Vision Centre Exhibition",
    short: "To commemorate 22 years of Vision Centre services and to raise awareness about the range of services offered, Aravind-Madurai organised a Vision Centre Exhibition on 17th April 2025.",
    full: "The initiative encouraged patients to seek consultation locally and reduce unnecessary travel.",
  },
  {
    id: 5, fallbackBg: "#2d1a2d",
    title: "TRAINING OF TRAINERS (TOT) WORKSHOP",
    short: "A Training of Trainers (ToT) workshop was held at Aravind-Madurai on 4th October 2025 to enhance the quality of Vision Centre services.",
    full: "The programme trained 25 assessors, Vision Technicians, and Clinical Coordinators to independently conduct skill assessments. Following the workshop, assessments were conducted across several Aravind centres, including Salem, where nine Vision Centre Technicians and Coordinators participated.",
  },
];

/* AIEBS Highlights Photos — 2025-26 */
const AIEBS_HIGHLIGHT_PHOTOS = [
  { id: 1, image: "1580248-ttd-eo-j-syamala-rao.webp", fallbackBg: "#0d2240", caption: "Aravind-Tirupati inaugurates its Eye Donation Centre at Sri Venkateswara Institute of Medical Sciences — 28th August 2025" },
  { id: 2, image: "2026_1_MDU_Eyebank_Rotary club meeting (31).webp", fallbackBg: "#1a2d0d", caption: "Rotary Club of Madurai West donates a specular microscope and accessories to RAIEB, Madurai — 29th January 2026" },
];

/* National Eye Donation Fortnight Photos — 2025-26 */
const EYE_DONATION_FORTNIGHT_PHOTOS = [
  { id: 1, image: "2025_9_Tutricorn_Eye Donation Awareness Rally (4).webp",fallbackBg: "#0d2240", caption: "National Eye Donation Fortnight — Aravind-Tuticorin" },
  { id: 2, image: "2025_9_TVL_40th Eye Donation Fortnight (3).webp",fallbackBg: "#1a2d0d", caption: "National Eye Donation Fortnight — Aravind-Tirunelveli" },
  { id: 3, image: "2025_9_TPT_Eyedonationfortnight (3).webp", fallbackBg: "#2d1a0d", caption: "National Eye Donation Fortnight — Aravind-Tirupathi" },
  { id: 4, image: "2025_8_MDU_Eye Donation Fortnight (11).webp",fallbackBg: "#1a1a2d", caption: "National Eye Donation Fortnight — Aravind-Madurai" },
];

const PROJECTS_DATA = [
  {
    id: 1,
    tab: "Vision Rehabilitation",
    image: "CBE_LV_2025 (6).webp",
    fallbackBg: "#0d2240",
    imageRight: true,
    funder: "Supported by Vision-Aid",
    title: "Vision Rehabilitation Programme",
    short: "With support from Vision-Aid, Aravind strengthened infrastructure and expanded low vision and rehabilitation services across its centres.",
    full: "During the year, nearly 15,000 patients were served through assessments, rehabilitation, vision therapy, mobility training, early intervention, and digital accessibility support. At Madurai, 5,117 individuals underwent low vision or functional vision assessments, with assistive devices, vision therapy, computer training, and smartphones provided to beneficiaries. The four Vision-Aid-supported centres at Tirunelveli, Pondicherry, Coimbatore, and Tirupati served 9,875 patients and distributed a range of optical, non-optical and electronic aids. The programme also supported capacity building, outreach screening, awareness initiatives, and the introduction of assistive technologies such as Smart Vision Glasses and the Vision Tracker app.",
  },
  {
    id: 2,
    tab: "School Eye Health",
    image: "2026_Lowvision_NVDA Training5.webp",
    fallbackBg: "#1a2d0d",
    imageRight: true,
    funder: "Supported by AEF & Trees for Life International",
    title: "INTEGRATING SCHOOL EYE HEALTH INTO VISION CENTRES",
    short: "Supported by the Aravind Eye Foundation (AEF), the project addressed visual impairment among school and pre-school children through screening and treatment",
    full: "During the year, 363 schools and 50,083 students were covered in Madurai and Tirunelveli, with 27,652 children screened. Of those identified with vision problems, 805 were advised spectacles, while others were referred for specialised care. In Pondicherry, with support from Trees for Life International, 26,482 students across 45 schools were screened, with 427 children receiving spectacles and 150 receiving specialised hospital care.",
  },
  {
    id: 3,
    tab: "ROP Tele-Screening",
    image: "",
    fallbackBg: "#2d1a0d",
    imageRight: false,
    funder: "Aravind-Theni",
    title: "Strengthening Retinopathy of Prematurity (ROP) Tele-Screening Services — Theni",
    short: "The project focused on early identification, timely treatment, and continuous follow-up of Retinopathy of Prematurity through tele-screening and outreach services, with services expanded to seven additional NICUs in Salem.",
    full: "The project focused on early identification, timely treatment, and continuous follow-up of Retinopathy of Prematurity (ROP) through tele-screening and outreach services. During the reporting year, 788 premature babies were screened, with 14 diagnosed with ROP; all received timely treatment, including intravitreal injections where required, along with counselling and follow-up care. ROP tele-screening services were expanded to seven additional NICUs in Salem, with the procurement of vehicles and equipment completed to support the initiative.",
  },
  {
    id: 4,
    tab: "Spectacles for Schoolchildren",
    image: "",
    fallbackBg: "#1a1a2d",
    imageRight: true,
    funder: "Supported by AEF, implemented by Aravind-Madurai",
    title: "Spectacles for Schoolchildren",
    short: "Supported by the AEF, the programme was implemented through Aravind Eye Hospitals in Madurai, Theni, Tirunelveli, Tuticorin, Kovilpatti, Coimbatore, Pondicherry, Salem, Tirupati, and Chennai.",
    full: "to improve visual health and educational performance among schoolchildren through school-based eye screening initiatives. During the reporting year, the initiative was carried out across six tertiary and four secondary hospitals, in terms of supporting the glass for the children A total of 3,08,979 students were screened, and 13,437 children diagnosed with refractive errors were provided with spectacles."
  },
  {
    id: 5,
    tab: "STRENGTHENING RETINOPATHY OF PREMATURITY (ROP) TELE-SCREENING SERVICES — THENI",
    image: "",
    fallbackBg: "#2d2d1a",
    imageRight: false,
    funder: "Aravind Eye Care System",
    title: "STRENGTHENING RETINOPATHY OF PREMATURITY (ROP) TELE-SCREENING SERVICES — THENI",
    short: "The project focused on early identification, timely treatment, and continuous follow-up of Retinopathy of Prematurity (ROP) through tele-screening and outreach services.",
    full: "During the reporting year, 788 premature babies were screened, with 14 diagnosed with ROP, all received timely treatment, including intravitreal injections where required, along with counselling and follow-up care. ROP tele-screening services were expanded to seven additional NICUs in Salem, with the procurement of vehicles and equipment completed to support the initiative.",
  },
  {
    id: 6,
    tab: "RING OF HOPE",
    image: "",
    fallbackBg: "#0d2d2d",
    imageRight: true,
    funder: "Aravind Eye Care System",
    title: "Management of Recalcitrant Non-Infectious Uveitic Patients with Newer Biologics and Immunosuppressive Therapy",
    short: "Supported by the AEF and implemented by Aravind Madurai, the Ring of Hope Fund provides free treatment and genetic testing for underprivileged children and adults with eye cancers across all Aravind centres.",
    full: "Past year, 40 new Retinoblastoma patients were registered, 1,436 review visits were conducted, and 139 adult patients received care. Advanced treatment services included one intra-arterial procedure and 82 genetic tests.",
  },
  {
    id: 7,
    tab: "ENHANCING THE MANAGEMENT OF CHILDREN WITH GLAUCOMA",
    image: "ChatGPT Image Jul 13, 2026, 09_21_35 AM.webp",
    fallbackBg: "#2d0d1a",
    imageRight: false,
    funder: "ENHANCING THE MANAGEMENT OF CHILDREN WITH GLAUCOMA",
    title: "Creating Access to Rural Eyecare (CARE) Project",
    short: "The project focused on sibling screening for children diagnosed with primary childhood glaucoma and on supporting treatment and rehabilitation for children from low socio-economic backgrounds with progressive glaucoma.",
    full: ". Last year, seven new childhood glaucoma cases and 60 review cases were managed. As part of sibling screening efforts, 40 registrations were completed, 13 children underwent clinical evaluation, and four confirmed cases were identified. The programme also supported 27 children from low socioeconomic backgrounds, including medication support for 15 children.",
  },
   {
    id:8,
    tab: "MANAGEMENT OF RECALCITRANT NON-INFECTIOUS UVEITIC PATIENTS WITH NEWER BIOLOGICS AND IMMUNOSUPPRESSIVE THERAPY",
    image: "ChatGPT Image Jul 13, 2026, 09_21_35 AM.webp",
    fallbackBg: "#2d0d1a",
    imageRight: false,
    funder: "MANAGEMENT OF RECALCITRANT NON-INFECTIOUS UVEITIC PATIENTS WITH NEWER BIOLOGICS AND IMMUNOSUPPRESSIVE THERAPY",
    title: "MANAGEMENT OF RECALCITRANT NON-INFECTIOUS UVEITIC PATIENTS WITH NEWER BIOLOGICS AND IMMUNOSUPPRESSIVE THERAPY",
    short: "The project focused on strengthening the management of complex non-infectious uveitis through multidisciplinary care involving rheumatology specialists, with emphasis on early treatment using newer biologics and immunosuppressive agents, including Mycophenolate Mofetil (MMF).",
    full: "During the reporting year, 11 patients were enrolled, and 10 underwent joint rheumatology evaluation. Biologic therapy was initiated for 10 patients, including Adalimumab for seven patients and Rituximab for two patients, while MMF therapy was started for one patient. Regular follow-up, monitoring, and patient counselling were provided for all enrolled patients.",
  },
   {
    id:9,
    tab: "CREATING ACCESS TO RURAL EYECARE (CARE) PROJECT",
    image: "ChatGPT Image Jul 13, 2026, 09_21_35 AM.webp",
    fallbackBg: "#2d0d1a",
    imageRight: false,
    funder: "CREATING ACCESS TO RURAL EYECARE (CARE) PROJECT",
    title: "CREATING ACCESS TO RURAL EYECARE (CARE) PROJECT",
    short: "Supported by the AEF, the one-year CARE Project by Aravind-Tirupati aimed to improve eye care utilisation among rural communities in 44 villages around Puttur through door-to-door and school screenings, referrals, and health education.",
    full: "Using Peek Vision’s mobile application for screening and data collection, 2,830 individuals were screened, with 1,250 referred for further care. Of those who attended the clinic, 20 underwent cataract surgery, 35 received spectacles, and 14 were referred for specialised treatment.",
  },
];

/* ══════════════════════════════════════════════════════════════
   AWARENESS PHOTOS — 10 events
   Replace image paths with your actual filenames
══════════════════════════════════════════════════════════════ */
const AWARENESS_PHOTOS = [
  {
    id: 1,
    image: "2025_11_Chennai_Myopia_Day (3).webp",
    fallbackBg: "#0d1f35",
    caption: "Eye health awareness programme for children on Myopia Day at Aravind-Chennai, ",
  },
  {
    id: 2,
    image: "2025_11_CBE_Myopia Awareness (7).webp",
    fallbackBg: "#1a2d0d",
    caption: "Myopia Day eye health awareness programme for children at Aravind-Coimbatore",
  },
  {
    id: 3,
    image: "2026_3_TVL_World Down Syndrome Day (1).webp",
    fallbackBg: "#0d2d2d",
    caption: "National Eye Donation Fortnight, Aravind-Tirunelveli",
  },
  {
    id: 4,
    image: "2025_11_Theni_DR_Awareness Rally (15).webp",
    fallbackBg: "#1a0d2d",
    caption: "National Eye Donation Fortnight, Aravind-Tirupati",
  },
  {
    id: 5,
    image: "03_AR_Lr_Patientcare_new 2_2025-26.webp",
    fallbackBg: "#2d1a0d",
    caption: "Diabetic day awareness exhibition at Aravind - Madurai",
  },
  {
    id: 6,
    image: "03_AR_Lr_Patientcare_new 3_2025-26.webp",
    fallbackBg: "#0d2d1a",
    caption: "World Glaucoma Week observation at Aravind-Dindigul",
  },
  {
    id: 7,
    image: "salem galucoma week.webp",
    fallbackBg: "#2d0d1a",
    caption: "World Glaucoma Week observation at Aravind-Salem",
  },
  {
    id: 8,
    image: "03_AR_Lr_Patientcare_new 4_2025-26.webp",
    fallbackBg: "#1a1a0d",
    caption: "World Disability Day awareness exhibition at Aravind-Tirunelveli",
  },
  {
    id: 9,
    image: "03_AR_Lr_Patientcare_new 5_2025-26.webp",
    fallbackBg: "#0d1a2d",
    caption: "World Sight Day observance at Aravind-Pondicherry",
  },
  {
    id: 10,
    image: "03_AR_Lr_Patientcare_new 6_2025-26.webp",
    fallbackBg: "#1a2d1a",
    caption: "World Sight Day awareness rally at Aravind-Madurai",
  },
];

/* ── STAT BOX — fade-in when scrolled into view ── */
function StatBox({ value, label }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`proj-stat-box${visible ? " proj-stat-visible" : ""}`}>
      <span className="proj-stat-value">{value}</span>
      <span className="proj-stat-label">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CAROUSEL PROJECTS SECTION
   ✅ FIX: openCard state lives HERE in ProjectsSection
   → only ONE card's id stored → only that card expands
   → CarouselCard gets isOpen prop + onToggle prop
   → e.stopPropagation() prevents card click from firing on button
══════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  const [current,  setCurrent]  = useState(0);
  const [openCard, setOpenCard] = useState(null); // ← ONE id at a time
  const trackRef = useRef(null);
  const total    = PROJECTS_DATA.length;

  const scrollTo = (idx) => {
    setCurrent(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx];
      if (card) card.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
    }
  };

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);

  // ✅ Toggle: open clicked card, close if already open
  const handleToggle = (id) => {
    setOpenCard(prev => prev === id ? null : id);
  };

  return (
    <div className="carousel-wrap">

      {/* ✅ Track + side arrows wrapped together so arrows align to card height */}
      <div className="carousel-track-wrap">
        <button className="carousel-arrow carousel-arrow-left"
          onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8592;</button>

        <div className="carousel-track" ref={trackRef}>
          {PROJECTS_DATA.map((project, i) => (
            <CarouselCard
              key={project.id}
              project={project}
              index={i}
              isActive={current === i}
              isOpen={openCard === project.id}
              onToggle={() => handleToggle(project.id)}
              onCardClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <button className="carousel-arrow carousel-arrow-right"
          onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">&#8594;</button>
      </div>

      <div className="carousel-dots">
        {PROJECTS_DATA.map((_, i) => (
          <button key={i}
            className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`}
            onClick={() => scrollTo(i)} aria-label={`Project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Single Carousel Card (WITHOUT STATS) ── */
function CarouselCard({ project, index, isActive, isOpen, onToggle, onCardClick }) {
  const fullRef           = useRef(null);
  const [fullH, setFullH] = useState(0);

  // Measure height once after mount — works because div is always rendered
  useEffect(() => {
    if (fullRef.current) setFullH(fullRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`carousel-card${isActive ? " carousel-card-active" : ""}`}
      onClick={!isActive ? onCardClick : undefined}
    >
      {/* ── Colored Header ── */}
      <div className="carousel-card-img-wrap" style={{ background: project.fallbackBg, padding: "18px 22px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
        <h3 style={{
          fontFamily: "'PT Sans', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#ffffff", margin: 0,
          textTransform: "uppercase", letterSpacing: "0.4px",
        }}>{project.title}</h3>
      </div>

      {/* ── Body (NO STATS) ── */}
      <div className="carousel-card-body">
        <p className="carousel-card-short">{project.short}</p>

        {/* ✅ Expand only THIS card — height measured on mount */}
        <div ref={fullRef} style={{
          maxHeight : isOpen ? `${fullH || 600}px` : "0px",
          opacity   : isOpen ? 1 : 0,
          overflow  : "hidden",
          transition: "max-height 0.45s ease, opacity 0.3s ease",
        }}>
          <p className="carousel-card-full">{project.full}</p>
        </div>

        {/* ✅ stopPropagation stops card click from firing */}
        <button className="carousel-readmore-btn"
          onClick={e => { e.stopPropagation(); onToggle(); }}>
          {isOpen
            ? <>Read less <span style={{ display:"inline-block", transform:"rotate(180deg)", fontSize:10 }}>▼</span></>
            : <>Read more <span style={{ fontSize:10 }}>▼</span></>
          }
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   REUSABLE PHOTO CAROUSEL
   Usage: <PhotoCarousel items={AWARENESS_PHOTOS} />
   Same pattern reusable for Education, LAICO, Aurolab, IT etc.
══════════════════════════════════════════════════════════════ */
function PhotoCarousel({ items }) {
  const [current,  setCurrent]  = useState(0);
  const [lightbox, setLightbox] = useState(null); // index of open lightbox
  const trackRef = useRef(null);
  const total    = items.length;

  const scrollTo = (idx) => {
    const newIdx = ((idx % total) + total) % total;
    setCurrent(newIdx);
    if (trackRef.current) {
      const card = trackRef.current.children[newIdx];
      if (card) {
        const trackLeft = trackRef.current.getBoundingClientRect().left;
        const cardLeft  = card.getBoundingClientRect().left;
        const offset    = cardLeft - trackLeft + trackRef.current.scrollLeft;
        trackRef.current.scrollTo({ left: offset, behavior: "smooth" });
      }
    }
  };

  const prev = (e) => { e.stopPropagation(); scrollTo(current - 1); };
  const next = (e) => { e.stopPropagation(); scrollTo(current + 1); };

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="carousel-wrap">
        {/* Arrows row */}
        <div className="carousel-track-wrap">
          <button className="carousel-arrow" onClick={prev} aria-label="Previous">&#8592;</button>

          <div className="carousel-track photo-carousel-track" ref={trackRef}>
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`photo-card${current === i ? " photo-card-active" : ""}`}
                onClick={() => { setCurrent(i); setLightbox(i); }}
              >
                <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="photo-card-img"
                    onError={e => { e.target.style.opacity = "0"; }}
                  />
                  {/* Number badge */}
                 
                  {/* Hover overlay */}
                  <div className="photo-card-overlay">
                    <span className="photo-card-zoom">&#9654; View</span>
                  </div>
                </div>
                {/* Caption */}
                <p className="photo-card-caption">{item.caption}</p>
              </div>
            ))}
          </div>

          <button className="carousel-arrow" onClick={next} aria-label="Next">&#8594;</button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <button className="photo-lightbox-arrow photo-lightbox-prev"
              onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={items[lightbox].image}
                alt={items[lightbox].caption}
                className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            <button className="photo-lightbox-arrow photo-lightbox-next"
              onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── STATIC PHOTO GRID (no arrows/dots — for small sets like 2 items) ── */
function PhotoGridStatic({ items }) {
  const [lightbox, setLightbox] = useState(null);
  const total = items.length;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="photo-grid-static">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="photo-card"
            onClick={() => setLightbox(i)}
          >
            <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
              <img
                src={item.image}
                alt={item.caption}
                className="photo-card-img"
                onError={e => { e.target.style.opacity = "0"; }}
              />
              <div className="photo-card-overlay">
                <span className="photo-card-zoom">&#9654; View</span>
              </div>
            </div>
            <p className="photo-card-caption">{item.caption}</p>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="photo-lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="photo-lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {total > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-prev"
                onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            )}
            <div className="photo-lightbox-img-wrap">
              <img
                src={items[lightbox].image}
                alt={items[lightbox].caption}
                className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            {total > 1 && (
              <>
                <div className="photo-lightbox-counter">{lightbox + 1} / {total}</div>
                <button className="photo-lightbox-arrow photo-lightbox-next"
                  onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── INFRA CARD (original) ──
   ✅ UPDATED: if `card.photos` is provided (Sight First Seminars,
   Sponsors' Day), clicking the card's main image opens a MULTI-PHOTO
   lightbox gallery — prev/next arrows + dots cycle through every city's
   photo, in order — right there in the same lightbox. No separate
   gallery is shown inside "Read more" anymore; Read more only expands
   the text as before. Cards without `photos` keep the old single-image
   lightbox behaviour unchanged. */
function InfraCard({ card, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasGallery = card.photos && card.photos.length > 0;
  const galleryItems = hasGallery ? card.photos : [{ image: card.image, caption: card.title }];
  const galleryTotal = galleryItems.length;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const openLightbox = () => { setLightboxIndex(0); setZoomOpen(true); };
  const goPrev = (e) => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + galleryTotal) % galleryTotal); };
  const goNext = (e) => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % galleryTotal); };

  useEffect(() => {
    if (!zoomOpen) return;
    const handler = (e) => { if (e.key === "Escape") setZoomOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoomOpen]);

  return (
    <div className={`pc-card${isOpen ? " pc-card-open" : ""}`}>
      <div
        className="pc-card-img-wrap"
        style={{ cursor: "pointer" }}
        onClick={openLightbox}
      >
        <img
          src={card.image}
          alt={card.title}
          className="pc-card-img"
          onError={e => { e.target.style.opacity = "0"; }}
        />
        <div className="photo-card-overlay">
          <span className="photo-card-zoom">&#9654; View</span>
        </div>
      </div>
      <div className="pc-card-body">
        <h3 className="pc-card-title">{card.title}</h3>
        <p className="pc-card-short">{card.short}</p>
        <div
          ref={contentRef}
          style={{
            maxHeight : isOpen ? `${contentHeight || 600}px` : "0px",
            opacity   : isOpen ? 1 : 0,
            overflow  : "hidden",
            transition: "max-height 0.42s ease, opacity 0.3s ease",
          }}
        >
          <p className="pc-card-full-text">{card.full}</p>
        </div>
        <button className="pc-card-readmore" onClick={onToggle}>
          {isOpen
            ? <>Read less <span style={{display:"inline-block",transform:"rotate(180deg)",fontSize:10}}>▼</span></>
            : <>Read more <span style={{fontSize:10}}>▼</span></>
          }
        </button>
      </div>

      {/* ── Lightbox — rendered via portal so it always covers the full
           viewport. When card.photos exists, prev/next arrows + dots
           cycle through all the photos in order, in the same lightbox. ── */}
      {zoomOpen && createPortal(
        <div className="photo-lightbox-overlay" onClick={() => setZoomOpen(false)}>
          <div className="photo-lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setZoomOpen(false)}>✕</button>

            {hasGallery && galleryTotal > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-prev" onClick={goPrev}>&#8592;</button>
            )}

            <div className="photo-lightbox-img-wrap">
              <img
                src={galleryItems[lightboxIndex].image}
                alt={galleryItems[lightboxIndex].caption || card.title}
                className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{galleryItems[lightboxIndex].caption || card.title}</p>

            {hasGallery && galleryTotal > 1 && (
              <>
                <div className="photo-lightbox-counter">{lightboxIndex + 1} / {galleryTotal}</div>
                <button className="photo-lightbox-arrow photo-lightbox-next" onClick={goNext}>&#8594;</button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ── INITIATIVE CARD — text-only (no image), same expand behaviour ── */
function InitiativeCard({ card, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, []);

  return (
    <div className={`pc-card${isOpen ? " pc-card-open" : ""}`}
      style={{ borderTop: `4px solid #c8921a` }}>

      {/* Colored top bar instead of image */}
      <div style={{
        background: card.fallbackBg,
        padding: "18px 22px 14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        {/* ✅ FIX 3: title color changed to #000 (black) */}
        <h3 style={{
          fontFamily: "'PT Sans', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#ffffff", margin: 0,
          textTransform: "uppercase", letterSpacing: "0.4px",
        }}>{card.title}</h3>
      </div>

      <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
        {/* ✅ FIX 3: short text is black via .pc-card-short CSS */}
        <p className="pc-card-short">{card.short}</p>

        {/* ✅ FIX 2: expand only this card — no gap push on siblings because alignSelf:start */}
        <div
          ref={contentRef}
          style={{
            maxHeight : isOpen ? `${contentHeight || 600}px` : "0px",
            opacity   : isOpen ? 1 : 0,
            overflow  : "hidden",
            transition: "max-height 0.42s ease, opacity 0.3s ease",
          }}
        >
          {/* ✅ FIX 3: full text black via .pc-card-full-text CSS */}
          <p className="pc-card-full-text">{card.full}</p>
        </div>

        {/* ✅ FIX 1: button sits directly below content — no overlap, no extra space */}
        <button className="pc-card-readmore"
          style={{ marginTop: 12, alignSelf: "flex-start" }}
          onClick={onToggle}>
          {isOpen
            ? <>Read less <span style={{display:"inline-block",transform:"rotate(180deg)",fontSize:10}}>▼</span></>
            : <>Read more <span style={{fontSize:10}}>▼</span></>
          }
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INFRASTRUCTURE CAROUSEL SECTION
══════════════════════════════════════════════════════════════ */
function InfrastructureCarouselSection() {
  const [current,  setCurrent]  = useState(0);
  const [openCard, setOpenCard] = useState(null);
  const trackRef = useRef(null);
  const total    = INFRA_CARDS.length;

  const scrollTo = (idx) => {
    setCurrent(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx];
      if (card) card.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
    }
  };

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);

  const handleToggle = (id) => {
    setOpenCard(prev => prev === id ? null : id);
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-track-wrap">
        <button className="carousel-arrow carousel-arrow-left"
          onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8592;</button>

        <div className="carousel-track" ref={trackRef}>
          {INFRA_CARDS.map((infra, i) => (
            <InfraCarouselCard
              key={infra.id}
              card={infra}
              index={i}
              isActive={current === i}
              isOpen={openCard === infra.id}
              onToggle={() => handleToggle(infra.id)}
              onCardClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <button className="carousel-arrow carousel-arrow-right"
          onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">&#8594;</button>
      </div>

      <div className="carousel-dots">
        {INFRA_CARDS.map((_, i) => (
          <button key={i}
            className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`}
            onClick={() => scrollTo(i)} aria-label={`Infrastructure ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Infrastructure Carousel Card (with image) ── */
function InfraCarouselCard({ card, index, isActive, isOpen, onToggle, onCardClick }) {
  const fullRef = useRef(null);
  const [fullH, setFullH] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (fullRef.current) setFullH(fullRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`carousel-card${isActive ? " carousel-card-active" : ""}`}
      onClick={!isActive ? onCardClick : undefined}
    >
      {/* ── Image with View overlay ── */}
      <div
        className="carousel-card-img-wrap"
        style={{ cursor: "pointer" }}
        onClick={() => setZoomOpen(true)}
      >
        <img
          src={card.image}
          alt={card.title}
          className="carousel-card-img"
          onError={e => { e.target.style.opacity = "0"; }}
        />
        <div className="photo-card-overlay">
          <span className="photo-card-zoom">&#9654; View</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="carousel-card-body">
        <h3 className="carousel-card-title">{card.title}</h3>
        <p className="carousel-card-short">{card.short}</p>

        <div ref={fullRef} style={{
          maxHeight : isOpen ? `${fullH || 600}px` : "0px",
          opacity   : isOpen ? 1 : 0,
          overflow  : "hidden",
          transition: "max-height 0.45s ease, opacity 0.3s ease",
        }}>
          <p className="carousel-card-full">{card.full}</p>
        </div>

        <button className="carousel-readmore-btn"
          onClick={e => { e.stopPropagation(); onToggle(); }}>
          {isOpen
            ? <>Read less <span style={{ display:"inline-block", transform:"rotate(180deg)", fontSize:10 }}>▼</span></>
            : <>Read more <span style={{ fontSize:10 }}>▼</span></>
          }
        </button>
      </div>

      {/* ── Lightbox ── */}
      {zoomOpen && createPortal(
        <div className="photo-lightbox-overlay" onClick={() => setZoomOpen(false)}>
          <div className="photo-lightbox-box" onClick={e => e.stopPropagation()}>
            <button className="photo-lightbox-close" onClick={() => setZoomOpen(false)}>✕</button>
            <div className="photo-lightbox-img-wrap">
              <img
                src={card.image}
                alt={card.title}
                className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }}
              />
            </div>
            <p className="photo-lightbox-caption">{card.title}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INITIATIVES CAROUSEL SECTION (HORIZONTAL - LIKE PROJECTS)
══════════════════════════════════════════════════════════════ */
function InitiativesCarouselSection() {
  const [current,  setCurrent]  = useState(0);
  const [openCard, setOpenCard] = useState(null);
  const trackRef = useRef(null);
  const total    = INITIATIVE_CARDS.length;

  const scrollTo = (idx) => {
    setCurrent(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx];
      if (card) card.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
    }
  };

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);

  const handleToggle = (id) => {
    setOpenCard(prev => prev === id ? null : id);
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-track-wrap">
        <button className="carousel-arrow carousel-arrow-left"
          onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8592;</button>

        <div className="carousel-track" ref={trackRef}>
          {INITIATIVE_CARDS.map((initiative, i) => (
            <InitiativeCarouselItemCard
              key={initiative.id}
              initiative={initiative}
              index={i}
              isActive={current === i}
              isOpen={openCard === initiative.id}
              onToggle={() => handleToggle(initiative.id)}
              onCardClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <button className="carousel-arrow carousel-arrow-right"
          onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">&#8594;</button>
      </div>

      <div className="carousel-dots">
        {INITIATIVE_CARDS.map((_, i) => (
          <button key={i}
            className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`}
            onClick={() => scrollTo(i)} aria-label={`Initiative ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Initiatives Carousel Card (photo card — same format as Infrastructure Developments) ── */
function InitiativeCarouselItemCard({ initiative, index, isActive, isOpen, onToggle, onCardClick }) {
  const fullRef = useRef(null);
  const [fullH, setFullH] = useState(0);

  useEffect(() => {
    if (fullRef.current) setFullH(fullRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`carousel-card${isActive ? " carousel-card-active" : ""}`}
      onClick={!isActive ? onCardClick : undefined}
    >
      {/* ── Colored Header (no image available for this section) ── */}
      <div className="carousel-card-img-wrap" style={{ background: initiative.fallbackBg, padding: "18px 22px 14px", display: "flex", alignItems: "center" }}>
        <h3 style={{
          fontFamily: "'PT Sans', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#ffffff", margin: 0,
          textTransform: "uppercase", letterSpacing: "0.4px",
        }}>{initiative.title}</h3>
      </div>

      {/* ── Body ── */}
      <div className="carousel-card-body">
        <p className="carousel-card-short">{initiative.short}</p>

        <div ref={fullRef} style={{
          maxHeight : isOpen ? `${fullH || 600}px` : "0px",
          opacity   : isOpen ? 1 : 0,
          overflow  : "hidden",
          transition: "max-height 0.45s ease, opacity 0.3s ease",
        }}>
          <p className="carousel-card-full">{initiative.full}</p>
        </div>

        <button className="carousel-readmore-btn"
          onClick={e => { e.stopPropagation(); onToggle(); }}>
          {isOpen
            ? <>Read less <span style={{ display:"inline-block", transform:"rotate(180deg)", fontSize:10 }}>▼</span></>
            : <>Read more <span style={{ fontSize:10 }}>▼</span></>
          }
        </button>
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════════
   EYE BANK SECTION
══════════════════════════════════════════════════════════════ */
/* Eye Bank Statistics — Apr 2025 to Mar 2026 */
const EYE_BANK_STATS = [
  { centre: "Madurai",      collected: "3115", utilised: "871",  sent: "219" },
  { centre: "Coimbatore",   collected: "1157", utilised: "422",  sent: "9"   },
  { centre: "Tirunelveli",  collected: "1270", utilised: "426",  sent: "8"   },
  { centre: "Pondicherry",  collected: "1017", utilised: "469",  sent: "34"  },
  { centre: "Chennai",      collected: "338",  utilised: "206",  sent: "6"   },
];
const EYE_BANK_STATS_TOTAL = { collected: "6897", utilised: "2394", sent: "276" };

function EyeBankStatsTable() {
  return (
    <div className="pc-stats-table-wrap">
      <table className="pc-stats-table">
        <caption>Statistics</caption>
        <thead>
          <tr>
            <th>Centre</th>
            <th>Eyes collected</th>
            <th>Eyes utilised for corneal transplantation</th>
            <th>Sent to other institutions</th>
          </tr>
        </thead>
        <tbody>
          {EYE_BANK_STATS.map(row => (
            <tr key={row.centre}>
              <td>{row.centre}</td>
              <td>{row.collected}</td>
              <td>{row.utilised}</td>
              <td>{row.sent}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{EYE_BANK_STATS_TOTAL.collected}</td>
            <td>{EYE_BANK_STATS_TOTAL.utilised}</td>
            <td>{EYE_BANK_STATS_TOTAL.sent}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function EyeBankSection() {
  return (
    <div>
      {/* Main intro */}
      <div className="vc-sub-block">
        <h3 className="vc-sub-heading">Aravind Integrated Eye Bank Services</h3>
        <p className="pc-section-body">
        AIEBS works towards providing solutions for corneal blindness through awareness creation, volunteer training, community-based death notification systems, and efficient response to eye donation calls. AIEBS collaborates with community volunteers, educational institutions, and organisations such as Lions Clubs International and Rotary International to promote eye donation and support cornea retrieval. During the reporting year, around 55% of corneas were retrieved through community-based programmes, while 45% were retrieved through Hospital Cornea Retrieval Programme (HCRP).
        </p>
        <p className="pc-section-body">
        AIEBS currently partners with 18 Government Medical College Hospitals under HCRP, while also strengthening collaborations with private hospitals. During the reporting year, Aravind Eye Banks distributed corneas, sclera, and amniotic membrane grafts (AMG) to 43 institutions.
        </p>
        <PhotoGridStatic items={AIEBS_HIGHLIGHT_PHOTOS} />
      </div>

      {/* Eye Bank Statistics */}
      <div className="vc-sub-block">
        <h3 className="vc-sub-heading">Eye Bank Statistics</h3>
        <EyeBankStatsTable />
      </div>

      {/* Awareness Creation */}
      <div className="vc-sub-block">
        <h3 className="vc-sub-heading">Awareness Creation</h3>
        <p className="pc-section-body">
          AIEBS organised awareness programmes in collaboration with volunteers, educational
          institutions, clubs, and hospitals, including observance of the{" "}
          <strong>40th National Eye Donation Fortnight</strong> (25th August 2025 – 8th September 2025)
          to encourage public participation in eye donation.
        </p>
        <PhotoCarousel items={EYE_DONATION_FORTNIGHT_PHOTOS} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISION CENTERS FULL SECTION
══════════════════════════════════════════════════════════════ */
function VisionCentersSection() {
  return (
    <div>
      {/* Intro */}
      <p className="pc-section-body">
        The number of vision centres increased to 120 last year, with the addition of three new centres in different locations, while a few existing centres were relocated.
      </p>

      {/* New Vision Centres */}
      <div className="vc-sub-block">
        <h3 className="vc-sub-heading">New Vision Centres Inaugurated in 2025–2026</h3>
        <PhotoCarousel items={VC_INAUGURAL_PHOTOS} />
      </div>

      {/* Vision Center Events — carousel, same format as Projects/Infrastructure */}
      <div className="vc-sub-block" style={{ marginTop: 8 }}>
        <h3 className="vc-sub-heading">Vision Centres Events</h3>
        <VisionCenterEventsCarousel />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VISION CENTER EVENTS CAROUSEL (same visual language as Projects)
══════════════════════════════════════════════════════════════ */
function VisionCenterEventsCarousel() {
  const [current,  setCurrent]  = useState(0);
  const [openCard, setOpenCard] = useState(null);
  const trackRef = useRef(null);
  const total    = VC_EVENT_CARDS.length;

  const scrollTo = (idx) => {
    setCurrent(idx);
    if (trackRef.current) {
      const card = trackRef.current.children[idx];
      if (card) card.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
    }
  };

  const prev = () => scrollTo((current - 1 + total) % total);
  const next = () => scrollTo((current + 1) % total);

  const handleToggle = (id) => {
    setOpenCard(prev => prev === id ? null : id);
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-track-wrap">
        <button className="carousel-arrow carousel-arrow-left"
          onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8592;</button>

        <div className="carousel-track" ref={trackRef}>
          {VC_EVENT_CARDS.map((card, i) => (
            <VisionCenterEventCard
              key={card.id}
              card={card}
              isActive={current === i}
              isOpen={openCard === card.id}
              onToggle={() => handleToggle(card.id)}
              onCardClick={() => scrollTo(i)}
            />
          ))}
        </div>

        <button className="carousel-arrow carousel-arrow-right"
          onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">&#8594;</button>
      </div>

      <div className="carousel-dots">
        {VC_EVENT_CARDS.map((_, i) => (
          <button key={i}
            className={`carousel-dot${current === i ? " carousel-dot-active" : ""}`}
            onClick={() => scrollTo(i)} aria-label={`Event ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Vision Center Event Card — colored header + expand, no image (matches Projects card) ── */
function VisionCenterEventCard({ card, isActive, isOpen, onToggle, onCardClick }) {
  const fullRef           = useRef(null);
  const [fullH, setFullH] = useState(0);

  useEffect(() => {
    if (fullRef.current) setFullH(fullRef.current.scrollHeight);
  }, []);

  return (
    <div
      className={`carousel-card${isActive ? " carousel-card-active" : ""}`}
      onClick={!isActive ? onCardClick : undefined}
    >
      <div className="carousel-card-img-wrap" style={{ background: card.fallbackBg, padding: "18px 22px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <h3 style={{
          fontFamily: "'PT Sans', sans-serif",
          fontSize: 14, fontWeight: 700,
          color: "#ffffff", margin: 0,
          textTransform: "uppercase", letterSpacing: "0.4px",
          textAlign: "center",
        }}>{card.title}</h3>
      </div>

      <div className="carousel-card-body">
        <p className="carousel-card-short">{card.short}</p>

        <div ref={fullRef} style={{
          maxHeight : isOpen ? `${fullH || 600}px` : "0px",
          opacity   : isOpen ? 1 : 0,
          overflow  : "hidden",
          transition: "max-height 0.45s ease, opacity 0.3s ease",
        }}>
          <p className="carousel-card-full">{card.full}</p>
        </div>

        <button className="carousel-readmore-btn"
          onClick={e => { e.stopPropagation(); onToggle(); }}>
          {isOpen
            ? <>Read less <span style={{ display:"inline-block", transform:"rotate(180deg)", fontSize:10 }}>▼</span></>
            : <>Read more <span style={{ fontSize:10 }}>▼</span></>
          }
        </button>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function PatientCare() {
  const [expandedCard,       setExpandedCard]        = useState(null);
  const [expandedOutreach,   setExpandedOutreach]    = useState(null);

  return (
    <div className="pc-page">

      {/* HERO */}
      <section className="pc-hero">
        <div className="pc-hero-bg" style={{ backgroundImage:`url('${HERO_IMAGE}'), url('${HERO_FALLBACK}')` }} />
        <div className="pc-hero-overlay" />
        <div className="pc-hero-content">
          <div className="pc-hero-tag"></div>
          <h1 className="pc-hero-title">Patient<span className="pc-hero-gold"> Care</span></h1>
          <p className="pc-hero-desc">
Responding to the growing eye care needs of patients across all its centres has led to the steady expansion of hospitals and service areas year after year, carrying the noble burden of Dr. V., who once said, “I was not condescending to do something good for them (people), as though I were a superior being. Rather, I felt a part of me was suffering with them.” As partners in Dr. V’s mission, doctors, AOPs, and staff at every level contribute their best to delivering quality and effective services, ensuring that no one suffers from needless blindness. Aravind continues to bridge the gap between the availability of services and those who need them most.          </p>
          <div className="pc-hero-stats">
            {PC_STATS_ROW1.map((s,i)=>(
              <div key={i} className="pc-hero-stat">
                <span className="pc-hero-stat-num">{s.number}</span>
                <span className="pc-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE — CAROUSEL */}
      <section className="pc-section pc-infra-section" id="infrastructure">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">
            Infrastructure <span className="pc-gold">Developments</span>
          </h2>
          <InfrastructureCarouselSection />
        </div>
      </section>

      {/* ══ INITIATIVES — CAROUSEL (HORIZONTAL - SAME AS PROJECTS) ══ */}
      <section className="pc-section" id="initiatives">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">
            Initiatives to Improve <span className="pc-gold">Eye Care Service Delivery</span>
          </h2>
          <InitiativesCarouselSection />
        </div>
      </section>

      {/* PROJECTS TO ENHANCE EYE CARE */}
      <section className="pc-section pc-infra-section" id="projects-enhance">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">
            Projects to Enhance <span className="pc-gold">Eye Care Service Delivery</span>
          </h2>
          <ProjectsSection />
        </div>
      </section>

      {/* AWARENESS */}
      <section className="pc-section" id="awareness">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Eye Care Awareness &amp; <span className="pc-gold">Patient Education</span></h2>
          <p className="pc-section-body">
           Across its locations, Aravind Eye Hospitals actively promoted eye health awareness through exhibitions, rallies, student competitions, webinars, media programmes, and public talks. These initiatives highlighted the importance of eye care, common eye conditions, and available treatment options. 
          </p>
          <PhotoCarousel items={AWARENESS_PHOTOS} />
        </div>
      </section>

      {/* PERFORMANCE STATISTICS */}
      <section className="pc-section pc-stats-section" id="statistics">
        <div className="pc-section-inner">

          <h2 className="pc-section-title">Performance<span className="pc-gold"> April 2025 - March 2026</span></h2>
          <PerformanceStatistics />
        </div>
      </section>

      {/* OUTREACH */}
      <section className="pc-section pc-infra-section" id="outreach">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Community <span className="pc-gold">Outreach</span></h2>
          <p className="pc-section-body">
           During the year, Aravind’s outreach camps screened 5,56,043 patients, with 1,02,762 patients undergoing surgeries for cataract and other eye conditions. School eye-screening programmes covered 6,52,818 children, including 3,05,601 children across 735 government schools under the Kannoli Kappom Thittam. Overall, 16,188 children received spectacles with support from AEF, other projects, and donors.
          </p>
          <div className="pc-cards-grid">
            {OUTREACH_CARDS.map(card => (
              <InfraCard
                key={card.id}
                card={card}
                isOpen={expandedOutreach === card.id}
                onToggle={() => setExpandedOutreach(prev => prev === card.id ? null : card.id)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* COMMUNITY EYE CLINICS AND CITY CENTRES */}
      <section className="pc-section pc-section-tight" id="community-eye-clinics">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Community Eye Clinics <span className="pc-gold">and City Centres</span></h2>
          <p className="pc-section-body">
            During April 2025 to March 2026, four community eye clinics and four city centres together handled 245,965 patient visits.
          </p>
        </div>
      </section>

      {/* VISION CENTERS */}
      <section className="pc-section pc-infra-section pc-section-tight-bottom" id="vision-centers">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Vision <span className="pc-gold">Centres</span></h2>
          <VisionCentersSection />
        </div>
      </section>

      {/* EYE BANK */}
      <section className="pc-section pc-infra-section pc-section-tight" id="eye-bank">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Eye <span className="pc-gold">Bank</span></h2>
          <EyeBankSection />
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="/03_AR_Lr_Patientcare_new%202_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>
{/* PAGE NAVIGATION */}
<nav className="pc-page-nav" aria-label="Page navigation">
  <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/highlights">
    <span className="pc-page-nav-label">&larr; Previous</span>
    <span className="pc-page-nav-title">Highlights</span>
  </Link>
  <div className="pc-page-nav-divider" />
  <Link className="pc-page-nav-link pc-page-nav-link-next" to="/education">
    <span className="pc-page-nav-label">Next &rarr;</span>
    <span className="pc-page-nav-title">Education and Training</span>
  </Link>
</nav>
    </div>
  );
}