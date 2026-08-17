// ============================================================
//  Laico.jsx  —  LAICO Page (Real content from PDF 2024-25)
//  Same structure as Education.jsx / PatientCare.jsx
// ============================================================

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/laico.css";


const HERO_IMAGE    = "LAICO 1080x1920.webp";
const HERO_FALLBACK = "/2024_4_Hospital Administration course (11).jpg";
const STATS = [
  { number: "11",     label: "ECSO Hospitals" },
  { number: "42,230", label: "Cataract Surgeries (ECSO)" },
  { number: "1,654",  label: "Employees Onboarded (LMS)" },
  { number: "40+",    label: "Countries (Aurosiksha Quizzes)" },
];

/* ── Knowledge Base for AI ── */
const KNOWLEDGE_BASE = [
  { tag: "Overview", title: "About LAICO", keywords: ["laico","who","collaborating","strategic planning","ecsc","erec","2030","capacity building"], text: "LAICO, as a WHO Collaborating Centre, conducted a two-day consultation focused on improving access to and the quality of eye care services. The consultation aimed to achieve the Effective Cataract Surgical Coverage (eCSC) and Effective Refractive Error Coverage (eREC) targets by 2030. LAICO also initiated a five-year strategic planning exercise covering education, consultancy, Aurosiksha, and research." },
  { tag: "Mentoring", title: "Capacity Building — New Hospitals", keywords: ["alwar","tamale","kabgayi","ghana","rwanda","rajasthan","capacity building","needs assessment","vision building"], text: "LAICO partnered with three hospitals for capacity building in 2024-25: Alwar District Hospital Eye Unit (Rajasthan), Tamale Eye Hospital (Ghana), and Kabgayi Eye Unit (Rwanda). Each received situation analyses and needs assessment visits from a LAICO senior faculty member and an Aravind doctor." },
  { tag: "Mentoring", title: "Onsite Follow-up Visits", keywords: ["sankara","rotary hooghly","alakh nayan","trilochan","mgm","berhampur","odisha","west bengal","udaipur","sambalpur","raipur"], text: "Follow-up visits were conducted at Sankara Eye Hospital (Odisha), Rotary Hooghly Eye Hospital (West Bengal), Alakh Nayan Mandhir Eye Hospital (Udaipur), Trilochan Netralaya-Sambalpur (Odisha), and MGM Eye Institute-Raipur (Chhattisgarh)." },
  { tag: "LEAP", title: "LEAP NABH Collaborative Series", keywords: ["nabh","accreditation","jagannath","bhawanipatna","entry level","five hospitals","january 2025"], text: "In February 2024, LAICO launched the second batch of the LEAP NABH Collaborative Series. Five hospitals enrolled in this 12-month programme. By January 2025, four hospitals had successfully achieved NABH Entry-Level Accreditation. An onsite visit was conducted to Jagannath Netralaya, Bhawanipatna, Odisha." },
  { tag: "LEAP", title: "ECSO LEAP Series", keywords: ["ecso","cataract surgical outcomes","42230","42,230","6/12","89%","biometry","sterilisation","eleven hospitals"], text: "LAICO launched the ECSO LEAP series in October 2023. Eleven hospitals were enrolled. During the collaborative period, participating hospitals collectively performed 42,230 cataract surgeries and achieved 6/12 or better outcomes in 89% of operated eyes." },
  { tag: "LEAP", title: "Closing the Loop — Cataract and Refractive Error", keywords: ["closing the loop","nandadeep","sitapur","thulsi","nashik","11 hospitals","march 2024","advice rate","90%"], text: "LAICO launched a collaborative series to increase cataract and refraction services from March 2024 with 11 hospitals enrolled. Target: advice rate of over 90% for cataract and refractive errors, 75% acceptance for cataract surgery, 90% for spectacles. Hospitals visited include Nandadeep Eye Hospital (Maharashtra), M.N.Eye Hospital (Chennai), Sitapur Eye Hospital (UP), and Thulsi Eye Hospital (Nashik)." },
  { tag: "Consultancy", title: "Lions Eye Hospitals — 3-Year Initiative", keywords: ["lions","lcif","three year","chikalthana","gauhati","ghaziabad","raniganj","rr lions","nidadavole","five hospitals"], text: "In December 2024, Lions Council of India with LCIF launched a three-year capacity-building project for five Lions Eye Hospitals. Needs assessment visits were conducted in January-February 2025, followed by a strategic planning workshop in March 2025. Hospitals: Chikalthana Lions Hospital (Aurangabad), Gauhati Lions Eye Hospital (Assam), Lions Eye Hospital (Ghaziabad), Raniganj Lions Eye Hospital (West Bengal), R.R. Lions Eye Hospital (Nidadavole, AP)." },
  { tag: "Consultancy", title: "Strengthening Public-Private Partnerships", keywords: ["sightsavers","csr","public private","niral","jeevan jyoti","sai netra","global hospital","jharkhand","bihar","rajasthan"], text: "In partnership with Sightsavers, LAICO identified four districts with CSR levels below the national average of 6,000. Partner hospitals: Niral Eye Hospital (Gumla, Jharkhand), Lions Eye Hospital (Katihar, Bihar), Jeevan Jyoti Eye Hospital (Jhabua, MP), Sai Netra Mandir (Bhubaneswar), Global Hospital (Sirohi, Rajasthan). Needs assessment visits in October-November 2024, strategic planning workshop January 2025." },
  { tag: "Consultancy", title: "Cure Blindness Project Immersion", keywords: ["cure blindness","ghana","ethiopia","himalaya","nepal","sub-saharan africa","august","september 2024","fiji"], text: "Teams from the Cure Blindness Project in Ghana and Ethiopia, and Himalaya Eye Hospital in Nepal, participated in an immersion programme at LAICO from 29 August to 4 September 2024. Focused on high-volume, high-quality cataract surgical programmes in Sub-Saharan Africa." },
  { tag: "Training", title: "Customised Training — Eye Health Advocacy", keywords: ["tata steel","jharkhand","odisha","15 participants","december 2024","school screening","community mobilisation"], text: "LAICO organised a training programme for 15 participants from Tata Steel Foundation (Jharkhand and Odisha) on 5-10 December 2024. Included classroom sessions on global blindness, eye conditions, camp planning, community referral systems, and ROP. Participants attended field visits and developed outreach strategies." },
  { tag: "Training", title: "Onsite Ophthalmic Instruments Maintenance Training", keywords: ["fred hollows","fiji","pacific eye institute","20 trainees","vanuatu","solomon islands","tonga","samoa","kiribati","november 2024"], text: "Three members from Aravind-Madurai's Biomedical Engineering Department conducted an onsite programme organised by Fred Hollows Foundation NZ at Pacific Eye Institute, Suva, Fiji (18-22 November 2024). 20 trainees from Fiji, Vanuatu, Solomon Islands, Tonga, Samoa, and Kiribati participated." },
  { tag: "Aurosiksha", title: "Aurosiksha LMS 2025-26", keywords: ["aurosiksha","lms","learning management","14634","3332","self-paced","siksha bites","49 editions","39 countries","four webinars"], text: "The Aurosiksha LMS has been upgraded into a single ecosystem of courses, quizzes, webinars, and microlearning, also usable as a mobile app. Three self-paced courses were developed during the year. The platform recorded 14,634 total users including 3,332 new registrations, with 2,093 trainees enrolled and 2,868 employees onboarded across 10 departments. 11 online quizzes averaged 799 participants each; the weekly Siksha Bites series published 49 editions. Four webinars reached 641 attendees from 39 countries." },
  { tag: "October Summit", title: "CPE — Hospital Management", keywords: ["cpe","hospital administrators","4-6 november","27 participants","nepal","october summit"], text: "LAICO conducted the CPE programme for alumni of the Hospital Administrators' Course on 4-6 November 2024. 27 participants from Nepal and across India, and 14 from Aravind participated. Focus: innovative approaches and best practices in hospital administration." },
  { tag: "October Summit", title: "eCSC & eREC Consultation 2030", keywords: ["ecsc","erec","2030","29-30 november","29 participants","diagnostic gap","compliance gap","quality gap","who","bangladesh"], text: "LAICO organised a two-day consultation on 29-30 November 2024 focused on achieving eCSC and eREC targets by 2030. 29 participants from India, Nepal, and Bangladesh participated. Topics: diagnostic gap, compliance gap, and quality gap. The report was shared with WHO headquarters." },
  { tag: "Research", title: "Health Service Research", keywords: ["redcap","raab","kanniyakumari","4862","journal club","48 sessions","research data management","january 2025"], text: "LAICO conducted a two-day workshop on Research Data Management using REDCap software on 3-4 January 2025. The second RAAB survey in Tamil Nadu was conducted in Kanniyakumari (Aug-Oct 2024): 4,862 individuals aged 50+ from 86 locations examined; ~25% required eye care. The LAICO Journal Club conducted 48 sessions over the past year, with one-fourth anchored by outside participants." },
];

/* ── Mentoring — Kenya Cataract Project (KCP) ── */
const KCP_TEXT = [
  "LAICO, with the support of Bloomberg Philanthropies, has launched a two-year programme in Kenya, partnering with public and private eye hospitals across the country. Initiated in 2025, the project aims to enhance the effectiveness of cataract services and support cataract surgeries over a two-year period, with a strong focus on underserved communities through comprehensive outreach initiatives. Partnered with 12 private eye hospitals across Kenya, the programme places emphasis on improving cataract surgical outcomes through system strengthening.",
  "The launch event of the Kenya Cataract Programme (KCP) was held on 6–7 July 2025 at Nairobi, presided over by Dr. Monicah Bitok, National Eye Care Coordinator at the Ministry of Health, Kenya, in the presence of Thulasiraj Ravilla, Dr. R.D. Ravindran, and R.D. Sriram, and members of the LAICO faculty team.",
  "Since the programme launch, until March 2026, these 12 partner institutions had performed 6,911 cataract surgeries (23% of the project target) through outreach services.",
  "As part of building a strong network and perspective, 13 representatives from the above-listed partner institutions attended the 'Management Priorities in Eye Care Delivery (Head's Course)' training at LAICO in January 2026. Further, a mid-term partners' meeting was held at LAICO, Madurai, following the training, revisiting the goals and strategies of the individual partners.",
];

/* Single photo shown below the KCP text, under a divider line.
   Replace `image` with the actual filename once available. */
const KCP_PHOTO = [
  { id: 1, image: "KCP Photos 1.webp", fallbackBg: "#0d2240", caption: "Launch of the Kenya Cataract Programme (KCP) — Nairobi, 6–7 July 2025" },
];

/* ── Mentoring — Other Mentoring Events ──
   Now displayed as plain heading + text cards (Training-section style),
   no photos in this section. */
const OTHER_MENTORING_EVENTS = [
  {
    id: 1, fallbackBg: "#0d2240",
    title: "Need Assessment Visits",
    short: "LAICO conducted need assessment and follow-up visits to five partner hospitals to strengthen mentoring engagements.",
    full: "A team from LAICO, comprising senior faculty members and ophthalmologists, carried out need assessment and follow-up visits to strengthen partnerships with the following hospitals: Gautami Eye Institute, Rajahmundry, Andhra Pradesh (Dr. B.S. Ganesh Babu, Senior Faculty, LAICO); Akhand Jyoti Eye Hospital, Purina (R. Suresh Kumar, Senior Faculty, LAICO); India Eye Institute, Noida, Uttar Pradesh (R. Suresh Kumar, B. Udayakumar, Senior Faculty, LAICO, and Dr. R. Janani, Medical Consultant, Paediatric Ophthalmology & Adult Strabismus Services, Aravind-Salem); Lions Eye Hospital, Raniganj, West Bengal (R. Suresh Kumar); and Lions Eye Hospital, Katihar, Bihar (R. Suresh Kumar and Sanjay).",
  },
  {
    id: 2, fallbackBg: "#1a2d0d",
    title: "Vision Building & Strategic Planning Workshop",
    short: "A four-day workshop with Sightsavers brought together partner hospitals and District Programme Managers to build district-specific eye care strategies.",
    full: "LAICO initiated a three-year capacity-building project in collaboration with Sightsavers to strengthen eye care service delivery across five underserved districts in India. A key component of the project is the District Planning Initiative, which aims to develop context-specific strategies and action plans to improve the delivery and uptake of eye care services. As part of this initiative, LAICO organised a four-day vision building and strategic planning workshop from 30th May to 2nd June 2025. The workshop brought together representatives from partner hospitals along with the Sightsavers team, the District Programme Managers (DPMs), and the LAICO team. The workshop focused on identifying strategic priorities and strengthening capacities in key areas, including public-private partnerships, sustainable outreach models, improving cataract surgery uptake, and quality assurance and sterilisation standards.",
  },
  {
    id: 3, fallbackBg: "#2d0d1a",
    title: "New Facility Inaugurated at Cape Coast Teaching Hospital (CCTH), Ghana",
    short: "The Aravind team helped establish a new eye care facility at CCTH, Ghana, inaugurated on 26th March 2026, and performed the first surgeries there.",
    full: "In support of the vision of the Cure Blindness Project, the Aravind team, including members from LAICO and Aravind-Pondicherry, played a pivotal role in planning and establishing a new eye care facility at Cape Coast Teaching Hospital in Ghana. The facility was inaugurated on 26th March 2026. Dr. Krishna Chaitanya, Thamizhkumaran, Sr. Revathi, and Sr. Ananthi from Aravind-Pondicherry were present on-site for about a month, working closely with the CCTH eye team to operationalise the facility. They also performed the first surgeries during the week following the inauguration.",
  },
  {
    id: 4, fallbackBg: "#1a1a2d",
    title: "In-Person Learning Session: Enhancing Cataract Surgical Outcomes — Batch II",
    short: "A three-day session for 16 participants from five partner hospitals focused on improving post-operative visual outcomes after cataract surgery.",
    full: "The three-day in-person learning session for ophthalmologists, administrators, and paramedical personnel from partner eye hospitals aimed to support participating institutions in achieving a post-operative visual acuity of 6/12 or better in at least 90% of cataract-operated eyes at the latest follow-up visit (21–45 days after surgery). The learning session focused on finalising evidence-based clinical protocols for cataract surgery, developing strategies to improve post-operative follow-up rates, and designing driver diagrams to guide quality improvement efforts toward the programme goal. The session was attended by 16 participants from Global Hospital Institute of Ophthalmology, Rajasthan; Nirala Eye Hospital, Jharkhand; Reiyukai Eiko Masunaga Eye Hospital, Nepal; Tulsi Eye Hospital, Maharashtra; and Raniganj Lions MJM Eye Hospital, West Bengal.",
  },
  {
    id: 5, fallbackBg: "#2d2d1a",
    title: "Strengthening Low Vision & Vision Rehabilitation Services in Vietnam",
    short: "In collaboration with Orbis Vietnam, LAICO trained nine professionals and helped establish a Low Vision Clinic at Van Thau Eye Hospital.",
    full: "As part of its collaboration with Orbis Vietnam, LAICO supported the strengthening of low vision and vision rehabilitation services through a series of capacity-building initiatives. Between June and September 2025, nine professionals — including ophthalmologists, optometrists, and nursing assistants — from partner hospitals completed a three-month training programme at Aravind-Madurai. The training covered low vision assessment, low vision aids, digital resources, early intervention, and cerebral visual impairment (CVI) assessment. Building on this initiative, Dr. B. Sahithya, Medical Consultant, Paediatric Ophthalmology & Adult Strabismus Services, Aravind-Madurai, and Sr. Jegadeswari from Aravind-Madurai, along with Mohammed Gowth, Senior Faculty, LAICO, visited Vietnam to assess service needs, demonstrate the establishment of a low vision clinic, and conduct training on low vision and vision rehabilitation. The team engaged with four institutions: the National Institute of Ophthalmology, Vietnam; Van Thau Eye Hospital; Hai Phong Hospital; and Hanoi Medical University. As part of the initiative, a fully functional Low Vision Clinic was established at Van Thau Eye Hospital. In addition, a one-day workshop titled 'Improving Low Vision Services in Vietnam' was conducted, bringing together 35 participants from eight eye hospitals.",
  },
  {
    id: 6, fallbackBg: "#0d2d2d",
    title: "Observation Visit — Sadguru Netra Chikitsalaya, Chitrakoot",
    short: "At the request of the SEVA Foundation, LAICO observed and advised on Vision Centre operations at Sadguru Netra Chikitsalaya, Madhya Pradesh.",
    full: "At the request of the SEVA Foundation, Mohammed Gowth undertook an observation visit to the Vision Centres of Sadguru Netra Chikitsalaya, Chitrakoot, Madhya Pradesh on 24–30 May 2025. During the visit, he observed and shared recommendations on the functioning of the Vision Centres, including patient flow, clinical processes, supply chain management, and monitoring systems.",
  },
];

/* ── Teaching & Training — text (heading + paragraph, no cards) ── */
const TRAINING_SECTIONS = [
  {
    id: 1,
    title: "Aurosiksha",
    paragraphs: [
      "Towards enhancing training of AOPs, Aurosiksha offers training resources, online courses and access to continuous education. The initiative has expanded to include self-paced learning courses. To support this transformation, the Aurosiksha Learning Management System (LMS) has been upgraded. The enhanced platform will integrate courses, quizzes, webinars, and microlearning resources into a single ecosystem and also usable as a mobile app, improving accessibility and the overall learning experience. While Aurosiksha is progressing toward an annual subscription model for self-paced learning, existing trainer resources will continue to remain free of cost. During the year, three self-paced courses were developed: Counselling for Diabetic Retinopathy, Community Eye Health Workers, and Asepsis and Sterilisation for Cataract Surgery.",
      "The Aurosiksha LMS continued to support AOP training across AECS, recording 14,634 total users, including 3,332 new registrations. The platform also facilitated 10 departments, with 2,093 trainees enrolled and 2,868 employees onboarded for continuous skill recertification. Aurosiksha's digital learning initiatives witnessed significant global engagement. A total of 11 online quizzes were conducted, attracting an average of 799 participants per quiz. The weekly Siksha Bites microlearning series published 49 learning bites, achieving an average impression rate of 1,411 per post and continuing to engage learners through social media.",
      "During the year, four webinars were conducted with a total participation of 641 attendees from 39 countries. The webinar series featured 17 expert speakers, including 13 faculty members from AECS and four external experts, providing diverse perspectives and enriching the learning experience for participants worldwide. Aurosiksha continues to be used by Dr. Shroff's Charity Eye Hospital which has integrated the Aurosiksha LMS into its training programmes for their Certified Ophthalmic Personnel.",
    ],
  },
  {
    id: 2,
    title: "Leadership & Practice Development Programme for Private Practitioners",
    paragraphs: [
      "This year marked the launch of the Leadership and Practice Development Programme for private practitioners, introduced at the request of the Tamil Nadu Ophthalmic Association (TNOA). Two batches were conducted during the year, benefiting around 80 practising ophthalmologists from Tamil Nadu, Kerala, and Andhra Pradesh. The programme focused on strengthening leadership and practice management skills, covering key areas such as demand generation, financial management, ownership building, and clinical quality improvement.",
    ],
  },
  {
    id: 3,
    title: "Onsite Ophthalmic Instrument Maintenance Training — Papua New Guinea",
    paragraphs: [
      "Participants received hands-on training in the working principles, dismantling, reassembly, and maintenance of ophthalmic instruments through demonstrations and practical sessions. Subsequently, from 9–20 March 2026, an on-site instrument maintenance training was conducted in Papua New Guinea, organised by The Fred Hollows Foundation, New Zealand. The programme was held in Port Moresby for 12 participants and Madang for 14 participants, including one ophthalmologist at each location.",
    ],
  },
];

/* ── Teaching & Training — Consultation Workshops (photo-gallery format) ──
   Same shape as the Oration event block: title + description + a
   `photos` array (id, image, fallbackBg, caption), rendered as a
   photo grid with click-to-zoom lightbox — same as ORATION_EVENT_1. */
const CONSULTATION_WORKSHOP_CARDS = [
  {
    id: "influencing-change-2025",
    title: "Workshop on Influencing Change",
    description: "As part of the October events, an internal workshop on Influencing Change was organised at LAICO, led by Colin Williams (UK), held on 30th September 2025, an experienced leadership and management consultant. Participants shared experiences about managing change, engaged in mutual learning by discussing challenges and successes, and identified specific steps to implement back at work. A total of 33 participants, including Managers, Doctors, and AOPs from all Aravind centres, attended the programme.",
    photos: [
      { id: 1, image: "2025_10_October summit_Influncing workshop (2).webp", fallbackBg: "#0d1f35", caption: "Workshop on Influencing Change, led by Colin Williams (UK) — 30th September 2025" },
      { id: 2, image: "2025_10_October summit_Influncing workshop (3).webp", fallbackBg: "#0d1f35", caption: "Managers, Doctors, and AOPs from all Aravind centres participating in the workshop" },
    ],
  },
  {
    id: "consulting-skills-2025",
    title: "Workshop on Consulting Skills",
    description: "As part of the October Summit, a Workshop on \"Consulting Skills\" was organised for LAICO Faculty on 2-3 October 2025 and was facilitated by Colin Williams. The peer group workshop aimed to enhance Aravind's consulting capabilities through peer learning and reflection, providing a platform to share experiences, explore practical models, and practice strategies to strengthen the impact of mentoring efforts.",
    photos: [
      { id: 1, image: "Consulting Skills (1).webp", fallbackBg: "#1a2d0d", caption: "Workshop on Consulting Skills, facilitated by Colin Williams — 2–3 October 2025" },
    ],
  },
  {
    id: "primary-eye-care-2025",
    title: "National-Level Workshop on Integrated Primary Eye Care through Telemedicine-Enabled Vision Centres",
    description: "The workshop held on 3-4 November 2025, brought together State Programme Officers of National Programme for Control of Blindness from 12 Indian States to exchange ideas and best practices for strengthening primary eye care delivery through technology. Dr R. Joshi, ADGHS - NPCB & VI, delivered a talk on \"The Scope for Primary Eye Care in India – Future.\" Dr Chandrakumar, State Project Director from Government of Tamil Nadu was present to share the work being done in the state. State programme directors shared the design of their respective integrated primary eye care models. Discussions focused on enhancing accessibility and quality of primary eye care through telemedicine, strengthening collaboration between stakeholders for integrated service delivery, and exploring innovative approaches to expand vision centre networks across regions.",
    photos: [
      { id: 1, image: "2025_11_VC_Managment Course.webp", fallbackBg: "#2d0d1a", caption: "State Programme Officers of NPCB & VI from 12 Indian States at the workshop — 3–4 November 2025" },
    ],
  },
  {
    id: "who-searo-2025",
    title: "WHO Regional Meeting on Eye Health: Towards Better Vision",
    description: "The World Health Organization South-East Asia Regional Office (WHO SEARO) organised the Regional Meeting at GRT Hotel, Madurai on 10-12 November 2025, with Aravind hosting the event. A total of 60 participants representing nine countries from the Southeast Asia region took part in this consultation. The meeting brought together delegates from Ministries of Health, WHO country and regional offices, WHO Collaborating Centres for Eye Care, and NGOs. The discussions focused on reviewing progress related to effective cataract surgical and refractive error coverage, diabetic retinopathy screening and SPECS 2030, a global initiative addressing refractive errors, and outlining the way forward to achieve the 2030 global eye health targets.",
    photos: [
      { id: 1, image: "2025_11_MDU_WHO Meeting (5).webp", fallbackBg: "#1a1a2d", caption: "WHO Regional Meeting on Eye Health — GRT Hotel, Madurai, 10–12 November 2025"},
      { id: 2, image: "2025_11_MDU_WHO Meeting (1).webp", fallbackBg: "#1a1a2d", caption: "Delegates from Ministries of Health, WHO offices, and WHO Collaborating Centres for Eye Care" },
      { id: 3, image: "2025_11_MDU_WHO Meeting (21).webp", fallbackBg: "#1a1a2d", caption: "Dr. R.D. Ravindran welcoming participants at the WHO Regional Meeting on Eye Health" },
      { id: 4, image: "2025_11_MDU_WHO Meeting (23).webp", fallbackBg: "#1a1a2d", caption: "Thulasiraj Ravilla presenting on “Achieving and Measuring Effective eCSC & eREC" },
      { id: 5, image: "2025_11_MDU_WHO Meeting (28).webp", fallbackBg: "#1a1a2d", caption: "Participants observing the Aravind Eye Care System’s service delivery model during a community outreach camp" },
      { id: 6, image: "2025_11_MDU_WHO Meeting (17).webp", fallbackBg: "#1a1a2d", caption: "Delegates participating in the WHO Regional Meeting on “Eye Health: Towards Better Vision" },


    ],
  },
];

/* ── Teaching & Training — Health Service Research ── */
const HEALTH_RESEARCH_TEXT = [
  "The Health Services Research Division at LAICO leads research initiatives across the AECS, aimed at improving the delivery, accessibility, and effectiveness of eye care services. During 2025-2026, the division focused on generating evidence to strengthen universal eye health coverage, particularly through the evaluation of Vision Centres, telemedicine, and other innovative service delivery models. Major studies examined the impact of Vision Centres on eye care utilisation, service coverage, uptake of care following ocular injury, and reduction of visual impairment in rural South India.",
  "The division also continued to support partner hospitals and organisations in conducting epidemiological and operational research by providing training in research methods, digital data collection, data management, statistical analysis, and scientific reporting. Key collaborative projects included a Rapid Assessment of Refractive Error (RARE) survey among Rohingya displaced populations in Bangladesh, a Rapid Assessment of Avoidable Blindness (RAAB) survey in Zanzibar, and Cure Blindness-supported studies on eye injuries in Ethiopia and outcomes of small-incision cataract surgery in campaign-based versus hospital-based settings across Sub-Saharan Africa.",
  "To foster a culture of research and critical inquiry among non-clinical staff, LAICO continued its weekly Journal Club, which serves as a platform for scientific discussion and critical appraisal of published literature. During the year, 48 sessions were conducted, including 12 led by participants from external institutions, reflecting the programme's growing national and international reach. LAICO also collaborated with the WHO-SEARO to organize the regional seminar Towards Better Vision: WHO South-East Asia Regional Meeting on Eye Health. The division coordinated the documentation of the meeting proceedings, which were subsequently published by WHO.",
  "Additional research activities undertaken during the year included a meta-analysis comparing iCare and Goldmann applanation tonometers, a multicentric validation study of a hand hygiene checklist customised for eye care organisations, an evaluation of a telemedicine-based screening programme for retinopathy of prematurity involving 12,890 eyes, and an assessment of mobile health readiness among patients attending a tertiary eye hospital in South India. As part of its capacity-building efforts, the division hosted an international webinar titled Effective Data Management for Research and Hospital Operations in March 2026 as a precursor to the annual REDCap workshop in April 2026. The webinar attracted nearly 80 participants from around the world.",
];

/* ══════════════════════════════════════
   AI SEARCH
══════════════════════════════════════ */
function AISearch() {
  const [query, setQuery]               = useState("");
  const [apiAnswer, setApiAnswer]       = useState("");
  const [loading, setLoading]           = useState(false);
  const [searched, setSearched]         = useState(false);
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
          system: `You are a helpful assistant for the Aravind Eye Care System Annual Activity Report 2024–25, LAICO section. Answer using ONLY the data below. Keep answers to 2–5 sentences with specific numbers where available. If not in the report, say so and suggest contacting communications@aravind.org. If completely unrelated to LAICO or Aravind Eye Care, respond ONLY with: OUT_OF_SCOPE.`,
          messages: [{ role: "user", content: `Data:\n${context}\n\nQuestion: ${q}` }],
        }),
      });
      if (!res.ok) throw new Error("fail");
      const data = await res.json();
      const text = data.content?.[0]?.text?.trim() || "";
      if (text === "OUT_OF_SCOPE") setIsOutOfScope(true);
      else setApiAnswer(text || "Try asking about LEAP series, mentoring hospitals, consultancy, or Aurosiksha.");
    } catch {
      const qLow = q.toLowerCase();
      const matched = KNOWLEDGE_BASE.filter(i =>
        i.keywords.some(kw => qLow.includes(kw) || kw.includes(qLow)) ||
        i.title.toLowerCase().includes(qLow) || i.text.toLowerCase().includes(qLow)
      );
      setApiAnswer(matched.length > 0
        ? matched.slice(0, 2).map(m => m.text).join(" ")
        : "Try again shortly, or ask about LEAP NABH, ECSO, Lions Eye Hospitals, or Aurosiksha LMS.");
    }
    setLoading(false);
  };

  const handleClear = () => { setQuery(""); setApiAnswer(""); setSearched(false); setIsOutOfScope(false); };

  return (
    <div className="ai-search-wrap">
      <div className="ai-search-bar">
        <span className="ai-search-icon">✦</span>
        <input className="ai-search-input" type="text"
          placeholder="Ask anything… e.g. ECSO outcomes, Lions Eye Hospitals, Aurosiksha LMS"
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
            This question is outside the <strong>LAICO 2024–25 Report</strong>.
            Try asking about LEAP series, mentoring visits, consultancy projects, or Aurosiksha.
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
   INITIATIVE CARD — exact PatientCare style
   WITHOUT numbered gold circle, WITHOUT photo
   (used for "Other Mentoring Events")
══════════════════════════════════════ */
function InitiativeCard({ card, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => { if (contentRef.current) setContentHeight(contentRef.current.scrollHeight); }, []);

  return (
    <div className={`pc-card${isOpen ? " pc-card-open" : ""}`}
      style={{ borderTop: "4px solid #c8921a", alignSelf: "start" }}>
      <div style={{ background: card.fallbackBg, padding: "18px 22px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
        <h3 style={{ fontFamily: "'PT Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.4px" }}>{card.title}</h3>
      </div>
      <div className="pc-card-body" style={{ display: "flex", flexDirection: "column" }}>
        <p className="pc-card-short">{card.short}</p>
        <div ref={contentRef} style={{ maxHeight: isOpen ? `${contentHeight || 600}px` : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height 0.42s ease, opacity 0.3s ease" }}>
          <p className="pc-card-full-text">{card.full}</p>
        </div>
        {onToggle && (
          <button className="pc-card-readmore" style={{ marginTop: 12, alignSelf: "flex-start" }} onClick={onToggle}>
            {isOpen ? <>Read less <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: 10 }}>▼</span></> : <>Read more <span style={{ fontSize: 10 }}>▼</span></>}
          </button>
        )}
      </div>
    </div>
  );
}

/* Static photo block — for a single photo (e.g. KCP launch photo) with
   caption and click-to-zoom lightbox, no arrows/dots needed. */
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
          <div key={item.id} className="photo-card" onClick={() => setLightbox(i)}>
            <div className="photo-card-img-wrap" style={{ background: item.fallbackBg }}>
              <img src={item.image} alt={item.caption} className="photo-card-img"
                onError={e => { e.target.style.opacity = "0"; }} />
                <div className="photo-card-overlay"><span className="photo-card-zoom">&#9654; View</span></div>
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
              <img src={items[lightbox].image} alt={items[lightbox].caption} className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }} />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            {total > 1 && (
              <>
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

/* Photo carousel — arrows + scrollable track + dot indicators + lightbox.
   Used when an event has 3 or more photos (matches the "Beyond Aravind"
   reference layout: arrow / 3 cards / arrow, with dots below). */
function PhotoCarousel({ items }) {
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
                  <img src={item.image} alt={item.caption} className="photo-card-img"
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
            <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {total > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-prev"
                onClick={() => setLightbox(((lightbox - 1) + total) % total)}>&#8592;</button>
            )}
            <div className="photo-lightbox-img-wrap">
              <img src={items[lightbox].image} alt={items[lightbox].caption} className="photo-lightbox-img"
                onError={e => { e.target.style.opacity = "0"; }} />
            </div>
            <p className="photo-lightbox-caption">{items[lightbox].caption}</p>
            {total > 1 && (
              <button className="photo-lightbox-arrow photo-lightbox-next"
                onClick={() => setLightbox((lightbox + 1) % total)}>&#8594;</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
   EVENT WITH PHOTO GALLERY
   Same pattern as the Oration block: title + description text,
   then photos with click-to-zoom lightbox. Used for each
   Consultation Workshop card.

   Format rule: 1–2 photos → simple static grid (PhotoGridStatic).
   3+ photos → arrow/dot carousel (PhotoCarousel), matching the
   "Beyond Aravind" reference layout.
══════════════════════════════════════ */
function EventWithPhotoGallery({ event, isLast }) {
  const PhotoComponent = event.photos.length >= 3 ? PhotoCarousel : PhotoGridStatic;
  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
        fontWeight: 700,
        color: "#0d1f35",
        margin: "0 0 10px",
      }}>
        {event.title}
      </h3>
      <p className="pc-section-body" style={{ marginBottom: 20 }}>{event.description}</p>

      <PhotoComponent items={event.photos} />

      {!isLast && (
        <hr style={{ border: "none", borderTop: "1px solid #e2c88a", margin: "36px 0 0" }} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Laico() {
  const [expandedMentoring, setExpandedMentoring] = useState(null);

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
            LAICO<br />
          
          </h1>
          <p className="pc-hero-desc">
           Dr. V. once said, "I had the opportunity to help and so I did. As long as people suffer, you do not retire." True to this philosophy, he never hesitated to share Aravind's model of eye care delivery, believing that no one should suffer from needless blindness and wishing that every patient could have access to quality eye care. Carrying this vision forward, LAICO continues to share and refine the Aravind model through mentoring and capacity-building initiatives. By fostering innovation and strengthening the capacities of eye hospitals across the globe, LAICO expands Aravind's impact far beyond its own institutions.
          </p>
        
        </div>
      </section>
      {/* ══ SECTION 1: LAICO OVERVIEW ══ */}
      
      {/* ══ SECTION 2: MENTORING INITIATIVES ══ */}
      <section className="pc-section pc-infra-section" id="mentoring">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Mentoring <span className="pc-gold">Initiatives</span></h2>

          {/* Kenya Cataract Project (KCP) */}
          <div className="edu-course-block">
            <div className="edu-course-block-title">
              Kenya Cataract Project <span className="edu-course-block-title-accent">(KCP)</span>
            </div>
            {KCP_TEXT.map((para, i) => (
              <p key={i} className="pc-section-body" style={{ marginBottom: 16 }}>{para}</p>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid #e2c88a", margin: "28px 0 8px" }} />
            <PhotoGridStatic items={KCP_PHOTO} />
          </div>

          {/* Other Mentoring Events — heading + text cards only, no photos */}
          <div className="edu-course-block" style={{ marginTop: 40 }}>
            <div className="edu-course-block-title">
              Other <span className="edu-course-block-title-accent">Mentoring Events</span>
            </div>
            <div className="pc-cards-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start", marginTop: 24 }}>
              {OTHER_MENTORING_EVENTS.map(card => (
                <InitiativeCard key={card.id} card={card}
                  isOpen={expandedMentoring === card.id}
                  onToggle={() => setExpandedMentoring(prev => prev === card.id ? null : card.id)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TEACHING & TRAINING ══ */}
      <section className="pc-section" id="teaching-training">
        <div className="pc-section-inner">
          <h2 className="pc-section-title">Teaching and <span className="pc-gold">Training</span></h2>
          <p className="pc-section-body">
            LAICO organised specialised training and capacity-building programmes in 2025–26,
            spanning digital learning through Aurosiksha, leadership development for private
            practitioners, and onsite instrument maintenance training.
          </p>

          {/* Teaching & Training content — plain heading + paragraph text,
              same format as Health Service Research (no cards). */}
          {TRAINING_SECTIONS.map((section, i) => (
            <div key={section.id} className="edu-course-block" style={{ marginTop: i === 0 ? 32 : 40 }}>
              <div className="edu-course-block-title">
                {section.title}
              </div>
              {section.paragraphs.map((para, pi) => (
                <p key={pi} className="pc-section-body" style={{ marginTop: pi === 0 ? 0 : 16 }}>{para}</p>
              ))}
            </div>
          ))}

          {/* Consultation Workshops — sub-section
              Each workshop rendered as: heading, description text, then
              a photo-gallery grid (with click-to-zoom lightbox) —
              same format as the Oration event block. */}
          <div className="edu-course-block" style={{ marginTop: 48 }}>
            <div className="edu-course-block-title">
            </div>

            {CONSULTATION_WORKSHOP_CARDS.map((event, i) => (
              <EventWithPhotoGallery
                key={event.id}
                event={event}
                isLast={i === CONSULTATION_WORKSHOP_CARDS.length - 1}
              />
            ))}
          </div>

          {/* Health Service Research — sub-section */}
          <div className="edu-course-block" style={{ marginTop: 48 }}>
            <div className="edu-course-block-title">
              Health Service <span className="edu-course-block-title-accent">Research</span>
            </div>
            {HEALTH_RESEARCH_TEXT.map((para, i) => (
              <p key={i} className="pc-section-body" style={{ marginTop: i === 0 ? 0 : 16 }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* MORE DETAILS PROMPT */}
      <p className="pc-more-details">
        Kindly <a href="5_New AR_Lr_LAICO_2025-26.pdf" target="_blank" rel="noopener noreferrer">click here</a> for more details — download the (PDF).
      </p>

      {/* PAGE NAVIGATION */}
      <nav className="pc-page-nav" aria-label="Page navigation">
        <Link className="pc-page-nav-link pc-page-nav-link-prev" to="/education">
          <span className="pc-page-nav-label">&larr; Previous</span>
          <span className="pc-page-nav-title">Education and Training</span>
        </Link>
        <Link className="pc-page-nav-link pc-page-nav-link-next" to="/research">
          <span className="pc-page-nav-label">Next &rarr;</span>
          <span className="pc-page-nav-title">Research</span>
        </Link>
      </nav>

    </div>
  );
}