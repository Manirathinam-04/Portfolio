import './Experience.css';
import { portfolioData } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Edit3
} from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-wrapper experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Experience</span>
          </div>
          <h2 className="section-title">
            Development Journey &amp; Project Track Record
          </h2>
          <p className="section-description">
            Hands-on mobile application engineering, Flutter architecture, and open-source contributions. Easily customizable with your formal career milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline">
          {experience.map((item, index) => (
            <div key={item.id} className="timeline-item">
              {/* Timeline Indicator */}
              <div className="timeline-marker">
                <div className="marker-dot">
                  <Briefcase size={14} color="#CEFF00" />
                </div>
                {index < experience.length - 1 && <div className="marker-line"></div>}
              </div>

              {/* Timeline Content Card */}
              <div className="timeline-card card">
                <div className="timeline-card-header">
                  <div className="timeline-title-group">
                    <span className="timeline-type-badge">{item.type}</span>
                    <h3 className="timeline-role">{item.role}</h3>
                    <h4 className="timeline-org">{item.organization}</h4>
                  </div>

                  <div className="timeline-meta-group">
                    <span className="meta-badge">
                      <Calendar size={13} /> {item.period}
                    </span>
                    <span className="meta-badge">
                      <MapPin size={13} /> {item.location}
                    </span>
                  </div>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                {/* Achievements / Responsibilities */}
                <div className="timeline-achievements">
                  <span className="achievements-heading">Key Contributions:</span>
                  <ul className="achievements-list">
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className="achievement-item">
                        <CheckCircle2 size={15} color="#CEFF00" className="achievement-icon" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Helpful edit notification note */}
                {item.note && (
                  <div className="timeline-edit-note">
                    <Edit3 size={13} />
                    <span>{item.note}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
