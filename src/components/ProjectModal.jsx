import { useEffect } from 'react';
import './ProjectModal.css';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Code2, 
  Cpu
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import MobileDeviceMockup from './MobileDeviceMockup';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Project Details"
        >
          <X size={20} />
        </button>

        <div className="modal-body">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-tags">
              <span className="modal-badge">{project.badge}</span>
              <span className="modal-category">{project.category}</span>
            </div>
            <h3 className="modal-title">{project.title}</h3>
            <p className="modal-summary">{project.summary}</p>
          </div>

          <div className="modal-grid">
            {/* Left Column: Mobile App Preview Mockup */}
            <div className="modal-preview-col">
              <div className="modal-mockup-wrapper">
                <MobileDeviceMockup type={project.mockupType} />
              </div>
            </div>

            {/* Right Column: Project Deep Dive */}
            <div className="modal-info-col">
              {/* Architecture & Engineering Overview */}
              <div className="modal-section">
                <div className="modal-section-title">
                  <Cpu size={16} color="#CEFF00" />
                  <span>Technical Architecture</span>
                </div>
                <p className="architecture-text">{project.architecture}</p>
              </div>

              {/* Key Implementation Highlights */}
              <div className="modal-section">
                <div className="modal-section-title">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>Key Features &amp; Implementations</span>
                </div>
                <ul className="modal-features-list">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="feature-item">
                      <div className="feature-dot"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="modal-section">
                <div className="modal-section-title">
                  <Code2 size={16} color="#CEFF00" />
                  <span>Tech Stack &amp; Libraries</span>
                </div>
                <div className="modal-tech-pills">
                  {project.technologies.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Action Links */}
              <div className="modal-actions">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <GithubIcon size={17} />
                    <span>View on GitHub</span>
                  </a>
                ) : (
                  <span className="repo-note">Repository link configurable in data file</span>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <ExternalLink size={17} />
                    <span>Live Demo / APK</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
