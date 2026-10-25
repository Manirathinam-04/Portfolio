import { useState, useEffect, useRef } from 'react';
import './Hero.css';
import { portfolioData } from '../data/portfolioData';
import MobileDeviceMockup from './MobileDeviceMockup';
import HeroOrbitShowcase from './HeroOrbitShowcase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDownRight, 
  Mail, 
  Smartphone, 
  Code2, 
  Layers, 
  Download, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { profile } = portfolioData;
  const [activePreview, setActivePreview] = useState('sports'); // 'sports' | 'finance' | 'auth'
  const [heroMode, setHeroMode] = useState('orbit'); // 'orbit' | 'app'
  const heroTrackRef = useRef(null);
  const stickyFrameRef = useRef(null);
  const visualRef = useRef(null);
  const contentRef = useRef(null);
  const promptRef = useRef(null);

  // Smooth scroll-driven entrance via gsap.matchMedia:
  // Desktop (>1024px): Visual card glides in on scroll with scrub
  // Mobile (<=1024px): Naturally placed in flow with clean props
  useEffect(() => {
    const track = heroTrackRef.current;
    const visualEl = visualRef.current;
    const contentEl = contentRef.current;
    const promptEl = promptRef.current;
    if (!track || !visualEl) return;

    const mm = gsap.matchMedia();

    // Desktop animation
    mm.add('(min-width: 1025px) and (prefers-reduced-motion: no-preference)', () => {
      const initialShiftX = Math.min(540, Math.max(340, window.innerWidth * 0.40));

      gsap.set(visualEl, {
        x: initialShiftX,
        opacity: 0.35,
        scale: 0.93,
        rotationY: -6,
        transformPerspective: 1000
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8
        }
      });

      tl.to(visualEl, {
        x: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.85,
        ease: 'power2.out'
      }, 0.05);

      if (contentEl) {
        tl.to(contentEl, {
          y: -25,
          duration: 0.85,
          ease: 'power1.out'
        }, 0.05);
      }

      if (promptEl) {
        tl.to(promptEl, {
          opacity: 0,
          y: 12,
          duration: 0.25,
          ease: 'power1.out'
        }, 0);
      }
    });

    // Mobile / Tablet / Reduced Motion: clean, non-pinned static reset
    mm.add('(max-width: 1024px), (prefers-reduced-motion: reduce)', () => {
      gsap.set([visualEl, contentEl], {
        clearProps: 'all'
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="home" className="hero-scroll-track" ref={heroTrackRef}>
      <div className="hero-sticky-frame" ref={stickyFrameRef}>
        {/* Ambient background glow accents */}
        <div className="hero-glow-blob"></div>
        <div className="hero-glow-secondary"></div>

        <div className="container hero-container">
          {/* Left Column: Intro & Content */}
          <div className="hero-content" ref={contentRef}>
            {/* Top Profile Badge with Photo & Availability Status */}
            <div className="hero-top-badge animate-fade-in-up">
              <div className="hero-avatar-frame">
                <img 
                  src={profile.photo} 
                  alt={profile.name} 
                  className="hero-avatar-img"
                />
                <span className="hero-avatar-dot" title="Available for opportunities"></span>
              </div>
              <div className="hero-avatar-meta">
                <span className="hero-avatar-name">{profile.shortName}</span>
                <span className="hero-avatar-title">{profile.primaryRole}</span>
              </div>
              <div className="status-pill hero-status">
                <span className="pulse-indicator">
                  <span className="ping"></span>
                  <span className="dot"></span>
                </span>
                <span>{profile.availability}</span>
              </div>
            </div>

            {/* Main Greeting & Name */}
            <div className="hero-greeting animate-fade-in-up">
              <span className="hero-intro-text">Hi, I'm</span>
              <h1 className="hero-name">
                Manirathinam<span className="accent-dot">.</span>
              </h1>
            </div>

            {/* Highlighted Title */}
            <div className="hero-role-wrapper animate-fade-in-up">
              <div className="hero-role-badge">
                <Smartphone size={18} className="role-icon" />
                <span className="role-highlight">Flutter Developer</span>
              </div>
              <span className="role-secondary">Mobile Application Developer</span>
            </div>

            {/* Supporting Text */}
            <p className="hero-description animate-fade-in-up">
              {profile.heroTagline} Specializing in <strong>Flutter</strong> and <strong>Dart</strong> to bridge elegant, responsive UI designs with scalable REST APIs and Firebase backend integration.
            </p>

            {/* CTAs */}
            <div className="hero-cta-group animate-fade-in-up">
              <a href="#projects" className="btn btn-primary">
                <span>Explore My Work</span>
                <ArrowDownRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
              <a 
                href={profile.resumeUrl} 
                download={profile.resumeFilename} 
                className="btn btn-outline"
                title="Download Resume PDF"
              >
                <Download size={17} />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links & Stack Badges */}
            <div className="hero-footer-bar animate-fade-in-up">
              <div className="hero-social-links">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="GitHub Profile"
                  title="Visit GitHub: Manirathinam-04"
                >
                  <GithubIcon size={19} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label="LinkedIn Profile"
                  title="Visit LinkedIn: manirathinam04"
                >
                  <LinkedinIcon size={19} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="social-icon-btn"
                  aria-label="Send Email"
                  title={`Send Email to ${profile.email}`}
                >
                  <Mail size={19} />
                </a>
              </div>

              <div className="hero-stack-pills">
                <span className="mini-pill"><span className="flutter-dot"></span> Flutter</span>
                <span className="mini-pill">Dart</span>
                <span className="mini-pill">REST APIs</span>
                <span className="mini-pill">Firebase</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Technical Showcase Card (Glides from right on scroll) */}
          <div className="hero-visual" ref={visualRef}>
            <div className="visual-card-wrapper">
              {/* View Mode Switcher: Orbit Showcase vs Interactive App */}
              <div className="hero-view-switcher">
                <button
                  type="button"
                  className={`view-switch-btn ${heroMode === 'orbit' ? 'active' : ''}`}
                  onClick={() => setHeroMode('orbit')}
                >
                  <Sparkles size={14} />
                  <span>Developer Orbit</span>
                </button>
                <button
                  type="button"
                  className={`view-switch-btn ${heroMode === 'app' ? 'active' : ''}`}
                  onClick={() => setHeroMode('app')}
                >
                  <Smartphone size={14} />
                  <span>Flutter Apps</span>
                </button>
              </div>

              {heroMode === 'orbit' ? (
                <HeroOrbitShowcase />
              ) : (
                <div className="hero-mockup-wrapper animate-fade-in-up">
                  {/* Interactive Tab Switcher above the Phone Mockup */}
                  <div className="mockup-tab-selector">
                    <button
                      type="button"
                      className={`mockup-tab ${activePreview === 'sports' ? 'active' : ''}`}
                      onClick={() => setActivePreview('sports')}
                    >
                      <span className="tab-dot sports"></span>
                      <span>FC-Genius</span>
                    </button>
                    <button
                      type="button"
                      className={`mockup-tab ${activePreview === 'finance' ? 'active' : ''}`}
                      onClick={() => setActivePreview('finance')}
                    >
                      <span className="tab-dot finance"></span>
                      <span>Expense App</span>
                    </button>
                    <button
                      type="button"
                      className={`mockup-tab ${activePreview === 'auth' ? 'active' : ''}`}
                      onClick={() => setActivePreview('auth')}
                    >
                      <span className="tab-dot auth"></span>
                      <span>Campus Login</span>
                    </button>
                  </div>

                  {/* Flutter Phone Mockup */}
                  <div className="mockup-display-area">
                    <MobileDeviceMockup type={activePreview} interactive={true} />
                  </div>

                  {/* Floating Technical Code Widget */}
                  <div className="floating-code-widget">
                    <div className="code-header">
                      <Code2 size={13} color="#CEFF00" />
                      <span>flutter_app.dart</span>
                    </div>
                    <div className="code-snippet">
                      <code>
                        <span className="code-keyword">Widget</span> build(BuildContext context) &#123;
                        <br />
                        &nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-class">MaterialApp</span>(
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;theme: <span className="code-prop">ThemeData</span>.dark(),
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;home: <span className="code-prop">{activePreview === 'sports' ? 'FCGeniusHome()' : activePreview === 'finance' ? 'ExpenseDashboard()' : 'CampusAuthScreen()'}</span>,
                        <br />
                        &nbsp;&nbsp;);
                        <br />
                        &#125;
                      </code>
                    </div>
                  </div>

                  {/* Floating State Badge */}
                  <div className="floating-state-badge">
                    <Layers size={13} color="#CEFF00" />
                    <span>Reactive State &amp; REST Services</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="hero-scroll-prompt" ref={promptRef}>
          <ChevronDown size={18} className="prompt-arrow" />
          <span>Scroll to reveal showcase</span>
        </div>

      </div>
    </section>
  );
}
