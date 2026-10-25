import { useState } from 'react';
import './Projects.css';
import { portfolioData } from '../data/portfolioData';
import MobileDeviceMockup from './MobileDeviceMockup';
import ProjectModal from './ProjectModal';
import { 
  Info, 
  CheckCircle2, 
  ArrowUpRight, 
  Smartphone,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'Sports', 'Finance', 'Authentication'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => {
        if (activeFilter === 'Sports') return p.category.toLowerCase().includes('sports');
        if (activeFilter === 'Finance') return p.category.toLowerCase().includes('finance');
        if (activeFilter === 'Authentication') return p.category.toLowerCase().includes('security') || p.category.toLowerCase().includes('auth') || p.title.toLowerCase().includes('login');
        return true;
      });

  return (
    <section id="projects" className="section-wrapper projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">
            Production-Ready Mobile Applications
          </h2>
          <p className="section-description">
            Clean Flutter mobile applications engineered with responsive UI components, robust REST API integrations, and scalable state architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="projects-filter-bar">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`project-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              <span>{filter}</span>
            </button>
          ))}
        </div>

        {/* Projects Cards List */}
        <div className="projects-cards-list">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={project.id} 
                className={`project-feature-card card ${isReversed ? 'row-reversed' : ''}`}
                style={{
                  '--project-accent': project.accentColor
                }}
              >
                {/* Accent top gradient line */}
                <div 
                  className="card-accent-strip"
                  style={{ backgroundColor: project.accentColor }}
                ></div>

                {/* Left/Right Column: Phone Mockup Showcase */}
                <div className="project-mockup-col">
                  <div 
                    className="mockup-halo"
                    style={{
                      background: `radial-gradient(circle, ${project.accentColor}25 0%, transparent 70%)`
                    }}
                  ></div>

                  <div className="mockup-frame-wrap">
                    <MobileDeviceMockup type={project.mockupType} />
                  </div>

                  <div className="mockup-label-badge">
                    <Smartphone size={13} color={project.accentColor} />
                    <span>Interactive Flutter UI</span>
                  </div>
                </div>

                {/* Left/Right Column: Project Information */}
                <div className="project-details-col">
                  <div className="project-meta-header">
                    <div className="project-tags-group">
                      <span className="project-category-tag">
                        {project.category}
                      </span>
                      <span className="project-badge-pill">
                        <Sparkles size={11} /> {project.badge}
                      </span>
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="project-highlights-box">
                    <span className="highlights-box-title">Key Architectural Highlights:</span>
                    <ul className="project-highlights-list">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="highlight-row">
                          <CheckCircle2 
                            size={16} 
                            color={project.accentColor} 
                            className="highlight-check" 
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="project-tech-group">
                    <span className="tech-group-title">Tech Stack:</span>
                    <div className="project-tech-pills">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-pill-item">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions-row">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Info size={15} />
                      <span>Project Details</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        title="View Source on GitHub"
                      >
                        <GithubIcon size={15} />
                        <span>View Code</span>
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
