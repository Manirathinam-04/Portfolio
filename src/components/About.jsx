import './About.css';
import { portfolioData } from '../data/portfolioData';
import { 
  Smartphone, 
  Network, 
  Layout, 
  GitBranch, 
  MapPin, 
  CheckCircle2, 
  Terminal,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';

export default function About() {
  const { profile } = portfolioData;

  const getPillarIcon = (index) => {
    switch (index) {
      case 0:
        return <Smartphone size={22} className="pillar-icon" />;
      case 1:
        return <Network size={22} className="pillar-icon" />;
      case 2:
        return <Layout size={22} className="pillar-icon" />;
      case 3:
      default:
        return <GitBranch size={22} className="pillar-icon" />;
    }
  };

  return (
    <section id="about" className="section-wrapper about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>About Me</span>
          </div>
          <h2 className="section-title">
            Engineering Practical Mobile Apps with Clean Code &amp; Thoughtful UI
          </h2>
          <p className="section-description">
            A developer mindset centered on user experience, reliable state management, and robust API integration.
          </p>
        </div>

        {/* Content Layout */}
        <div className="about-layout-wrapper">
          {/* Left Column: Visual Profile Card */}
          <div className="about-profile-card card">
            <div className="profile-image-container">
              <div className="profile-image-frame">
                <img 
                  src={profile.photo} 
                  alt={profile.name} 
                  className="profile-full-img"
                />
                <div className="profile-overlay-gradient"></div>
                
                {/* Floating Role Pill */}
                <div className="floating-profile-pill">
                  <Smartphone size={14} color="#CEFF00" />
                  <span>Flutter Developer</span>
                </div>
              </div>
            </div>

            <div className="profile-card-details">
              <div className="profile-header-info">
                <h3 className="profile-card-name">{profile.name}</h3>
                <p className="profile-card-role">{profile.title}</p>
              </div>

              {/* Verified Highlights from Resume */}
              <div className="profile-credential-list">
                <div className="credential-row">
                  <Briefcase size={15} color="#CEFF00" className="cred-icon" />
                  <div className="cred-text">
                    <span className="cred-title">Flutter Developer Intern</span>
                    <span className="cred-sub">Global Tech Professionals, UK London</span>
                  </div>
                </div>

                <div className="credential-row">
                  <GraduationCap size={15} color="#38BDF8" className="cred-icon" />
                  <div className="cred-text">
                    <span className="cred-title">M.Tech Computer Science &amp; Engg</span>
                    <span className="cred-sub">Erode Sengunthar Engg College (CGPA: 7.0)</span>
                  </div>
                </div>

                <div className="credential-row">
                  <Award size={15} color="#A855F7" className="cred-icon" />
                  <div className="cred-text">
                    <span className="cred-title">Infosys Certified Specialist</span>
                    <span className="cred-sub">Master Flutter &amp; REST API Certifications</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="profile-card-actions">
                <a 
                  href={profile.resumeUrl} 
                  download={profile.resumeFilename} 
                  className="btn btn-primary btn-sm w-full"
                  title="Download verified resume PDF"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
                
                <div className="profile-contact-mini-row">
                  <a 
                    href={`tel:${profile.phone}`} 
                    className="btn btn-secondary btn-sm"
                    title={`Call ${profile.phone}`}
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="btn btn-secondary btn-sm"
                    title={`Email ${profile.email}`}
                  >
                    <Mail size={14} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area: Narrative Story & Pillars */}
          <div className="about-main-content">
            {/* Narrative Story Card */}
            <div className="about-narrative-card card">
              <div className="narrative-badge">
                <Terminal size={14} color="#CEFF00" />
                <span>Background &amp; Philosophy</span>
              </div>

              {profile.bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="about-paragraph">
                  {paragraph}
                </p>
              ))}

              {/* Quick specs / developer attributes */}
              <div className="about-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Primary Stack</span>
                  <span className="spec-value highlight">Flutter &amp; Dart</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">API Tooling</span>
                  <span className="spec-value">Postman &amp; REST</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Location</span>
                  <span className="spec-value">
                    <MapPin size={13} className="spec-icon" /> {profile.location}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Availability</span>
                  <span className="spec-value highlight-avail">
                    <CheckCircle2 size={13} className="spec-icon" /> {profile.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Focus Pillars */}
            <div className="pillars-grid">
              {profile.pillars.map((pillar, index) => (
                <div key={pillar.title} className="pillar-card card">
                  <div className="pillar-icon-box">
                    {getPillarIcon(index)}
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Link Card to Contact */}
            <div className="about-banner-card card">
              <div className="banner-content">
                <span className="banner-tag">Ready to collaborate</span>
                <h4 className="banner-title">Looking for an enthusiastic, skilled Flutter developer?</h4>
                <p className="banner-sub">
                  Open for full-time opportunities, internships, and high-impact mobile projects.
                </p>
              </div>
              <a href="#contact" className="btn btn-primary btn-sm">
                <span>Let's Talk</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
