import './Education.css';
import { portfolioData } from '../data/portfolioData';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Network
} from 'lucide-react';

export default function Education() {
  const { education, certifications } = portfolioData;

  const renderCertIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone size={20} color="#CEFF00" />;
      case 'Network':
        return <Network size={20} color="#38BDF8" />;
      case 'Sparkles':
      default:
        return <Sparkles size={20} color="#A855F7" />;
    }
  };

  return (
    <section id="education" className="section-wrapper education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Academic &amp; Professional Qualifications</span>
          </div>
          <h2 className="section-title">
            Education &amp; Industry Certifications
          </h2>
          <p className="section-description">
            Strong academic foundations in Computer Science paired with verified professional certifications in Flutter, REST APIs, and modern engineering.
          </p>
        </div>

        {/* Two-Column Grid: Education & Certifications */}
        <div className="education-grid">
          {/* Left Column: Academic Education */}
          <div className="education-col">
            <div className="col-header">
              <div className="col-icon-wrap edu">
                <GraduationCap size={22} color="#CEFF00" />
              </div>
              <div>
                <h3 className="col-title">Academic Background</h3>
                <p className="col-subtitle">Formal degrees &amp; technical coursework</p>
              </div>
            </div>

            <div className="education-cards-list">
              {education.map((item) => (
                <div key={item.id} className="edu-card card">
                  <div className="edu-card-top">
                    <span className="edu-type-badge">{item.type}</span>
                    <span className="edu-score-badge">{item.score}</span>
                  </div>

                  <h4 className="edu-degree">{item.degree}</h4>
                  <p className="edu-field">{item.field}</p>

                  <div className="edu-meta">
                    <span className="edu-meta-item">
                      <GraduationCap size={13} /> {item.institution}
                    </span>
                    <span className="edu-meta-item">
                      <Calendar size={13} /> {item.period}
                    </span>
                    <span className="edu-meta-item">
                      <MapPin size={13} /> {item.location}
                    </span>
                  </div>

                  <p className="edu-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Industry Certifications */}
          <div className="certifications-col">
            <div className="col-header">
              <div className="col-icon-wrap cert">
                <Award size={22} color="#38BDF8" />
              </div>
              <div>
                <h3 className="col-title">Professional Certifications</h3>
                <p className="col-subtitle">Validated credentials from top technology leaders</p>
              </div>
            </div>

            <div className="cert-cards-list">
              {certifications.map((cert) => (
                <div key={cert.id} className="cert-card card">
                  <div className="cert-card-header">
                    <div className="cert-icon-frame">
                      {renderCertIcon(cert.icon)}
                    </div>
                    <div className="cert-title-wrap">
                      <div className="cert-badge-row">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-type-pill">{cert.badge}</span>
                      </div>
                      <h4 className="cert-title">{cert.title}</h4>
                    </div>
                  </div>

                  <p className="cert-description">{cert.description}</p>

                  <div className="cert-footer">
                    <span className="cert-verified-tag">
                      <CheckCircle2 size={13} color="#CEFF00" /> Verified Credential
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
