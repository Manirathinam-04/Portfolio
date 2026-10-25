import './Footer.css';
import { portfolioData } from '../data/portfolioData';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  const { profile, navLinks } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Top Tier */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="footer-monogram">
              <img src={profile.photo} alt={profile.shortName} className="footer-avatar-mini" />
              <div className="monogram-dot"></div>
            </div>
            <div>
              <span className="footer-name">{profile.name}</span>
              <p className="footer-title">{profile.title}</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="footer-nav" aria-label="Footer Navigation">
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to Top */}
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Tier */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            &copy; {currentYear} {profile.name}. Designed &amp; built with clean code and modern web standards.
          </p>

          <div className="footer-social-icons">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="footer-social-btn"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
