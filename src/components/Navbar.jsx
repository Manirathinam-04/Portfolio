import { useState, useEffect } from 'react';
import './Navbar.css';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, FileDown, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { profile, navLinks } = portfolioData;

  // Throttled scroll listener with requestAnimationFrame to prevent re-render thrashing
  useEffect(() => {
    let ticking = false;
    let lastSectionCheck = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 25;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

          const now = Date.now();
          if (now - lastSectionCheck > 120) {
            lastSectionCheck = now;
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'resume', 'contact'];
            const scrollPosition = window.scrollY + 140;

            for (const sectionId of sections) {
              const el = document.getElementById(sectionId);
              if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                  setActiveSection((prev) => (prev !== sectionId ? sectionId : prev));
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Monogram / Avatar Brand */}
        <a href="#home" className="navbar-brand" aria-label="Go to top">
          <div className="brand-monogram">
            <img src={profile.photo} alt={profile.shortName} className="brand-avatar-mini" />
            <div className="monogram-dot"></div>
          </div>
          <div className="brand-text">
            <span className="brand-name">{profile.shortName}</span>
            <span className="brand-role">{profile.primaryRole}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = activeSection === targetId;
              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                    {isActive && <span className="active-indicator" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button: Download Resume */}
        <div className="navbar-actions">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFilename}
            className="btn btn-outline btn-sm resume-nav-btn"
            title="Download PDF Resume"
          >
            <FileDown size={15} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobileMenu();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const targetId = link.href.replace('#', '');
                const isActive = activeSection === targetId;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight size={16} className="mobile-arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFilename}
              onClick={closeMobileMenu}
              className="btn btn-primary w-full"
            >
              <FileDown size={18} />
              <span>Download Resume</span>
            </a>

            <div className="mobile-socials">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                GitHub
              </a>
              <span className="dot-divider">•</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
