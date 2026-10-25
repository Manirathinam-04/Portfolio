import { useState } from 'react';
import './Skills.css';
import { portfolioData } from '../data/portfolioData';
import { 
  Smartphone, 
  Code2, 
  Layout, 
  Layers, 
  Component, 
  Palette, 
  Network, 
  FileJson, 
  Flame, 
  Cpu, 
  GitBranch, 
  Terminal, 
  Laptop, 
  Atom, 
  FileCode, 
  Globe, 
  Braces,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', ...skills.map(s => s.category)];

  const renderSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={18} />;
      case 'Code2': return <Code2 size={18} />;
      case 'Layout': return <Layout size={18} />;
      case 'Layers': return <Layers size={18} />;
      case 'Component': return <Component size={18} />;
      case 'Palette': return <Palette size={18} />;
      case 'Network': return <Network size={18} />;
      case 'FileJson': return <FileJson size={18} />;
      case 'Flame': return <Flame size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'GitBranch': return <GitBranch size={18} />;
      case 'Github': return <GithubIcon size={18} />;
      case 'Terminal': return <Terminal size={18} />;
      case 'Laptop': return <Laptop size={18} />;
      case 'Atom': return <Atom size={18} />;
      case 'FileCode': return <FileCode size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'Braces': return <Braces size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      case 'CheckCircle2': return <CheckCircle2 size={18} />;
      default: return <Code2 size={18} />;
    }
  };

  const filteredCategories = activeTab === 'All'
    ? skills
    : skills.filter(item => item.category === activeTab);

  return (
    <section id="skills" className="section-wrapper skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="section-tag-dot"></span>
            <span>Technical Skills</span>
          </div>
          <h2 className="section-title">
            Specialized Mobile Toolkit &amp; Engineering Capabilities
          </h2>
          <p className="section-description">
            Focused on building production-grade mobile applications. Presented transparently with no fabricated percentage bars.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="skills-categories-grid">
          {filteredCategories.map((group) => {
            const isPrimaryGroup = group.category === "Mobile Development";
            return (
              <div 
                key={group.category} 
                className={`skill-group-card card ${isPrimaryGroup ? 'primary-group' : ''}`}
              >
                <div className="group-header">
                  <div className="group-title-row">
                    <h3 className="group-title">{group.category}</h3>
                    {isPrimaryGroup && (
                      <span className="primary-tag">
                        <Sparkles size={11} /> Core Focus
                      </span>
                    )}
                  </div>
                  <p className="group-desc">{group.description}</p>
                </div>

                <div className="skills-badge-list">
                  {group.skills.map((skill) => {
                    const isHigh = skill.level === 'Primary';
                    return (
                      <div 
                        key={skill.name} 
                        className={`skill-badge-item ${isHigh ? 'primary-skill' : ''}`}
                      >
                        <div className="skill-icon-wrap">
                          {renderSkillIcon(skill.icon)}
                        </div>
                        <div className="skill-meta">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-level-text">{skill.level}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Philosophy Bar */}
        <div className="skills-philosophy-bar card">
          <div className="philosophy-item">
            <CheckCircle2 size={18} color="#CEFF00" />
            <div>
              <strong>Modular Architecture</strong>
              <p>Decoupled widgets, clear separation of concerns, and scalable folders.</p>
            </div>
          </div>
          <div className="philosophy-divider"></div>
          <div className="philosophy-item">
            <CheckCircle2 size={18} color="#CEFF00" />
            <div>
              <strong>API Reliability</strong>
              <p>Graceful offline states, resilient JSON parsing, and type safety.</p>
            </div>
          </div>
          <div className="philosophy-divider"></div>
          <div className="philosophy-item">
            <CheckCircle2 size={18} color="#CEFF00" />
            <div>
              <strong>Fluid Performance</strong>
              <p>Smooth 60/120 FPS renders, lightweight builds, and responsive ergonomics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
