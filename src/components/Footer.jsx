// ============================================================
  //  Footer.jsx  —  Site Footer (Dark Navy Theme)
  //  Used on: ALL pages — just import <Footer /> anywhere
  //  Two columns: Contact Info | Reach Us links
  // ============================================================

import "../styles/footer.css";

// "Reach Us" links — add more organisations here
const REACH_LINKS = [
  { label: "Aravind Eye Care System",         icon: "fa-solid fa-building",      href: "https://aravind.org/" },
  { label: "Auroitech",                        icon: "fa-solid fa-microscope",    href: "#" },
  { label: "Aravind Medical Research Foundation", icon: "fa-solid fa-heart-pulse", href: "#" },
  { label: "LAICO",                            icon: "fa-solid fa-video",         href: "#" },
  { label: "Aurolab",                          icon: "fa-solid fa-flask",         href: "#" },
];

export default function Footer() {
  return (
    <footer className="site-footer-dark">
      <div className="site-footer-dark-inner">

        {/* ── LEFT: Contact Information ── */}
        <div className="sfd-col">
          <div className="sfd-col-title">Contact Information</div>
          <div className="sfd-divider" />

          {/* Address */}
          <div className="sfd-contact-item">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <div>
              <strong>Aravind Eye Hospital</strong>
              1, Anna Nagar, Madurai, Tamil Nadu – 625 020, India
            </div>
          </div>

          {/* Email */}
          <div className="sfd-contact-item">
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            <div>
              <a href="mailto:communications@aravind.org">communications@aravind.org</a>
            </div>
          </div>

          {/* Phone */}
          <div className="sfd-contact-item">
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <div>+91 452 435 6105</div>
          </div>
        </div>

        {/* ── RIGHT: Reach Us ── */}
        <div className="sfd-col">
          <div className="sfd-col-title">Reach Us</div>
          <div className="sfd-divider" />

          <ul className="sfd-reach-grid">
            {REACH_LINKS.map((link, i) => (
              <li key={i}>
                <a href={link.href}>
                  <i className={link.icon} aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── PDF Download Bar ── */}
      <div className="sfd-bottom">
        <a
          href="Annual_Activity_Report_2025-26.pdf"
          className="sfd-pdf-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
          Download PDF version of Activity Report
        </a>
      </div>
    </footer>
  );
}
