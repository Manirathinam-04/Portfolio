import { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { portfolioData } from '../data/portfolioData';
import MobileDeviceMockup from './MobileDeviceMockup';
import ProjectModal from './ProjectModal';
import { 
  Info, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Layers,
  ChevronDown
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const activeProject = projects[activeProjectIndex] || projects[0];

  // Real-time scroll listener tracking the section's scroll progress
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = trackHeight - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);

      // Auto-switch project screen based on scroll depth
      if (clamped < 0.38) {
        setActiveProjectIndex(0); // Campus Login
      } else if (clamped >= 0.38 && clamped < 0.72) {
        setActiveProjectIndex(1); // Expense Tracker
      } else {
        setActiveProjectIndex(2); // FC-Genius
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Smooth scroll-driven horizontal frame entrance:
  // Starts offset to the right, smoothly glides into exact center as user scrolls
  let frameTranslateX = 0;
  let frameScale = 1;
  const initialRightShift = typeof window !== 'undefined' 
    ? Math.min(380, window.innerWidth * 0.32)
    : 320;

  if (scrollProgress < 0.28) {
    const t = scrollProgress / 0.28;
    const eased = 1 - Math.pow(1 - t, 3);
    frameTranslateX = (1 - eased) * initialRightShift;
    frameScale = 0.96 + eased * 0.04;
  } else {
    frameTranslateX = 0;
    frameScale = 1;
  }

  // Manual project tab selection
  const handleSelectProject = (index) => {
    setActiveProjectIndex(index);
  };

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="projects-scroll-track" ref={trackRef}>
      {/* Sticky Fullscreen Viewport */}
      <div className="projects-sticky-viewport" ref={viewportRef}>
        
        {/* Ambient background glow accents */}
        <div 
          className="projects-ambient-glow"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeProject.accentColor}18 0%, transparent 65%)`
          }}
        ></div>

        {/* Top Header & Live Scroll Status Bar */}
        <div className="projects-top-hud">
          <div className="hud-tag">
            <Smartphone size={15} color="#CEFF00" />
            <span>INTERACTIVE MOBILE SHOWCASE • ONE DEVICE</span>
          </div>

          <div className="hud-phase-status">
            <span className="phase-pill">
              <span className="dot-active" style={{ backgroundColor: activeProject.accentColor }}></span>
              <span>Showing: <strong>{activeProject.title}</strong> (Scroll to Switch)</span>
            </span>
          </div>
        </div>

        {/* Project Stage: Smoothly glides into center on scroll */}
        <div 
          className="project-showcase-stage"
          style={{
            transform: `translateX(${frameTranslateX}px) scale(${frameScale})`
          }}
        >
          {/* Top Control Bar: Tabs, Counter, & Navigation Arrows */}
          <div className="project-nav-bar">
            <div className="nav-bar-left">
              <span className="project-counter-badge">
                <span className="counter-pulse" style={{ backgroundColor: activeProject.accentColor }}></span>
                <span>Active Screen <strong>0{activeProjectIndex + 1}</strong> / 0{projects.length}</span>
              </span>
            </div>

            <div className="project-tabs-pill-list">
              {projects.map((proj, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    className={`project-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectProject(idx)}
                    style={{
                      '--accent-color': proj.accentColor
                    }}
                  >
                    <span className="tab-accent-dot"></span>
                    <span className="tab-title">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="project-nav-arrows">
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="nav-arrow-btn"
                onClick={handleNext}
                aria-label="Next Project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Main Stage Grid: Single Phone Mockup (Left) + Details Card (Right) */}
          <div className="project-stage-grid">
            {/* The One Phone Mockup for ALL projects */}
            <div className="project-phone-column">
              <div 
                className="phone-ambient-halo"
                style={{ 
                  background: `radial-gradient(circle, ${activeProject.accentColor}35 0%, transparent 70%)` 
                }}
              ></div>

              <div className="phone-mockup-wrapper">
                <MobileDeviceMockup type={activeProject.mockupType} />
              </div>

              <div className="phone-under-badge">
                <Smartphone size={13} color={activeProject.accentColor} />
                <span>Active Mobile UI: <strong>{activeProject.title}</strong></span>
              </div>
            </div>

            {/* Active Project Details Card */}
            <div className="project-details-card card">
              <div 
                className="details-accent-bar"
                style={{ backgroundColor: activeProject.accentColor }}
              ></div>

              <div className="details-header">
                <div className="details-tags-row">
                  <span className="details-category-badge">
                    {activeProject.category}
                  </span>
                  <span className="details-badge-pill">
                    {activeProject.badge}
                  </span>
                </div>
                <h3 className="details-title">{activeProject.title}</h3>
                <p className="details-summary">{activeProject.summary}</p>
              </div>

              {/* Highlights Checklist */}
              <div className="details-highlights">
                <span className="highlights-header">Key Architectural Highlights:</span>
                <div className="highlights-list">
                  {activeProject.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="highlight-item">
                      <CheckCircle2 size={16} color={activeProject.accentColor} className="hl-icon" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="details-tech-stack">
                <span className="tech-stack-label">Technologies &amp; Architecture:</span>
                <div className="tech-tags-wrap">
                  {activeProject.technologies.map((tech) => (
                    <span key={tech} className="tech-tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="details-actions-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedProject(activeProject)}
                >
                  <Info size={15} />
                  <span>Project Details</span>
                </button>

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    title="View GitHub Repository"
                  >
                    <GithubIcon size={15} />
                    <span>View Code</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}

                <button
                  type="button"
                  className="btn btn-outline btn-sm next-proj-btn"
                  onClick={handleNext}
                >
                  <span>Next App Screen</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Scroll Progress Indicator */}
        <div className="projects-scroll-hint-bar">
          <div className="scroll-hint-content">
            <ChevronDown size={17} className="scroll-hint-arrow" />
            <span>Scroll down to cycle through all 3 projects on the phone</span>
          </div>
          <div className="scroll-progress-line">
            <div 
              className="scroll-progress-fill" 
              style={{ 
                width: `${Math.round(scrollProgress * 100)}%`,
                backgroundColor: activeProject.accentColor
              }}
            ></div>
          </div>
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
