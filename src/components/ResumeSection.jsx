import { useState } from 'react';
import './ResumeSection.css';
import { portfolioData } from '../data/portfolioData';
import { 
  FileText, 
  FileDown, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  ShieldCheck,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function ResumeSection() {
  const { profile } = portfolioData;
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    setDownloadTriggered(true);
    setTimeout(() => setDownloadTriggered(false), 3000);
  };

  return (
    <section id="resume" className="section-wrapper resume-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="section-title">
            Professional Qualifications &amp; Resume
          </h2>
          <p className="section-description">
            A comprehensive overview of mobile development competencies, technical proficiencies, project experience, and software engineering practices.
          </p>
        </div>

        {/* Resume Feature Card */}
        <div className="resume-container card">
          <div className="resume-card-grid">
            {/* Left: Photo Thumbnail & Document Specs */}
            <div className="resume-doc-preview">
              <div className="resume-photo-frame">
                <img 
                  src={profile.photo} 
                  alt={profile.name} 
                  className="resume-portrait-img" 
                />
                <span className="doc-format-badge">PDF • 2 PAGES</span>
              </div>
              <div className="doc-meta-text">
                <h3 className="doc-owner-name">{profile.name}</h3>
                <p className="doc-owner-role">{profile.title}</p>
                <div className="doc-specs">
                  <span className="spec-tag">ATS-Friendly</span>
                  <span className="spec-tag highlight-tag">UK Internship</span>
                </div>
              </div>
            </div>

            {/* Middle: Key Highlight bullets from Real Resume */}
            <div className="resume-highlights-col">
              <h4 className="highlights-title">Verified Resume Highlights</h4>
              <ul className="resume-points-list">
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>Flutter Developer Intern</strong> at Global Tech Professionals (London, UK)
                  </span>
                </li>
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>Front-End Intern</strong> at Splendenslab IT Ventures (Salem)
                  </span>
                </li>
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>REST API &amp; JSON Handling</strong>, Postman testing, and loading/error states
                  </span>
                </li>
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>Authentication Flows</strong>: Login, Registration, OTP, and Form Validations
                  </span>
                </li>
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>M.Tech in CSE</strong> (Integrated) at Erode Sengunthar Engg College (CGPA: 7.0)
                  </span>
                </li>
                <li className="resume-point">
                  <CheckCircle2 size={16} color="#CEFF00" />
                  <span>
                    <strong>Certified</strong>: Master Flutter &amp; REST API (Infosys) &amp; Anthropic
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: Actions & Verification */}
            <div className="resume-actions-col">
              <a
                href={profile.resumeUrl}
                download={profile.resumeFilename}
                onClick={handleDownload}
                className="btn btn-primary w-full"
                title="Download verified resume PDF"
              >
                <FileDown size={18} />
                <span>{downloadTriggered ? 'Downloading...' : 'Download Resume (PDF)'}</span>
              </a>

              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="btn btn-secondary w-full"
                title="Preview resume directly on screen"
              >
                {showPreview ? <EyeOff size={17} /> : <Eye size={17} />}
                <span>{showPreview ? 'Hide Document Preview' : 'Preview Resume'}</span>
              </button>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full"
                title="Open resume PDF in new tab"
              >
                <ExternalLink size={17} />
                <span>Open in New Tab</span>
              </a>

              {/* Verified Badge */}
              <div className="resume-verified-badge-box">
                <div className="box-title">
                  <ShieldCheck size={16} color="#34d399" />
                  <span>Verified Document</span>
                </div>
                <p className="box-text">
                  Direct copy of Manirathinam's active resume with verified internships, contact information, and credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Document Preview Drawer */}
          {showPreview && (
            <div className="resume-inline-preview animate-fade-in-up">
              <div className="preview-top-toolbar">
                <div className="toolbar-left">
                  <FileText size={16} color="#CEFF00" />
                  <span>Manirathinam_R_Resume.pdf — Live Document Preview</span>
                </div>
                <div className="toolbar-right">
                  <a 
                    href={profile.resumeUrl} 
                    download={profile.resumeFilename} 
                    className="btn btn-secondary btn-xs"
                  >
                    <FileDown size={14} />
                    <span>Download</span>
                  </a>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-xs"
                    onClick={() => setShowPreview(false)}
                  >
                    Close Preview
                  </button>
                </div>
              </div>

              <div className="preview-iframe-wrapper">
                <iframe
                  src={`${profile.resumeUrl}#toolbar=0&navpanes=0`}
                  title="Manirathinam R Resume Preview"
                  className="preview-iframe"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
