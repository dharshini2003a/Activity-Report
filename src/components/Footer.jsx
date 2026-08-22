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
        <div className="sfd-col sfd-col-contact">
          <div className="sfd-col-title">Mail Id</div>
          <div className="sfd-divider" />

          <div className="sfd-contact-item">
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            <div>
              <a href="mailto:communications@aravind.org">communications@aravind.org</a>
            </div>
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
          href="Activity Report 2025-2026.pdf"
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