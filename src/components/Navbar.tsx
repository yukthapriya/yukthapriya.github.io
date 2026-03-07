import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  // Darken navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close nav on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleNavLinkClick = () => setNavOpen(false);

  return (
    <nav
      className={`site-nav${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main"
    >
      <div className="container nav-inner">
        {/* Logo */}
        <a href="/" className="logo" aria-label="Home — Yuktha Priya Masupalli">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="logo-grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#00d4ff" />
                <stop offset="1" stopColor="#00ff9d" />
              </linearGradient>
            </defs>
            <rect rx="8" width="36" height="36" fill="url(#logo-grad)" />
            <text
              x="50%"
              y="57%"
              textAnchor="middle"
              fontFamily="Orbitron, sans-serif"
              fontWeight="700"
              fontSize="14"
              fill="#001"
            >
              YP
            </text>
          </svg>
          <span className="logo-text">
            Yuktha Priya{' '}
            <small className="logo-role">Software &amp; ML Engineer</small>
          </span>
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span className={`hamburger${navOpen ? ' open' : ''}`} aria-hidden="true" />
        </button>

        {/* Nav links */}
        <div
          id="primary-nav"
          className="nav-links"
          data-visible={navOpen ? 'true' : 'false'}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href.replace('#', '') ? 'active' : ''}
              onClick={handleNavLinkClick}
            >
              {link.label}
            </a>
          ))}
          <a
            className="btn btn-small nav-resume"
            href="/Resume.pdf"
            download
            onClick={handleNavLinkClick}
          >
            <i className="fas fa-download" aria-hidden="true" /> Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
