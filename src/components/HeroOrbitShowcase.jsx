import { useState } from 'react';
import './HeroOrbitShowcase.css';
import { 
  FlutterBrandIcon, 
  DartBrandIcon, 
  PythonBrandIcon, 
  FirebaseBrandIcon, 
  PostmanBrandIcon, 
  GitBrandIcon, 
  AndroidBrandIcon, 
  FigmaBrandIcon 
} from './TechOrbitIcons';
import { Sparkles, Smartphone, Code2 } from 'lucide-react';

export default function HeroOrbitShowcase() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="orbit-showcase-container">
      {/* Ambient background glows */}
      <div className="orbit-core-glow"></div>
      <div className="orbit-secondary-glow"></div>

      {/* Orbit System Wrapper */}
      <div className="orbit-system">
        {/* Decorative Static Orbit Rings (Backside) */}
        <div className="orbit-ring ring-1"></div>
        <div className="orbit-ring ring-2"></div>
        <div className="orbit-ring ring-3"></div>

        {/* Orbit Track 1: Inner Orbit (Clockwise rotation) */}
        <div className="orbit-track track-inner">
          {/* Flutter (Top) */}
          <div className="orbit-node node-top">
            <div 
              className="tech-icon-pill flutter-pill" 
              title="Flutter"
              onMouseEnter={() => setHoveredTech('Flutter (Primary)')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <FlutterBrandIcon size={28} />
              <span className="node-tooltip">Flutter</span>
            </div>
          </div>

          {/* Dart (Right) */}
          <div className="orbit-node node-right">
            <div 
              className="tech-icon-pill dart-pill" 
              title="Dart"
              onMouseEnter={() => setHoveredTech('Dart (Language)')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <DartBrandIcon size={26} />
              <span className="node-tooltip">Dart</span>
            </div>
          </div>

          {/* Firebase (Bottom) */}
          <div className="orbit-node node-bottom">
            <div 
              className="tech-icon-pill firebase-pill" 
              title="Firebase"
              onMouseEnter={() => setHoveredTech('Firebase Services')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <FirebaseBrandIcon size={26} />
              <span className="node-tooltip">Firebase</span>
            </div>
          </div>

          {/* Android (Left) */}
          <div className="orbit-node node-left">
            <div 
              className="tech-icon-pill android-pill" 
              title="Android"
              onMouseEnter={() => setHoveredTech('Android Mobile')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <AndroidBrandIcon size={26} />
              <span className="node-tooltip">Android</span>
            </div>
          </div>
        </div>

        {/* Orbit Track 2: Outer Orbit (Counter-clockwise rotation with diagonal alignment) */}
        <div className="orbit-track track-outer">
          {/* Python (Top-Right) */}
          <div className="orbit-node node-top-right">
            <div 
              className="tech-icon-pill python-pill" 
              title="Python"
              onMouseEnter={() => setHoveredTech('Python')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <PythonBrandIcon size={26} />
              <span className="node-tooltip">Python</span>
            </div>
          </div>

          {/* Postman / REST API (Bottom-Right) */}
          <div className="orbit-node node-bottom-right">
            <div 
              className="tech-icon-pill postman-pill" 
              title="REST APIs & Postman"
              onMouseEnter={() => setHoveredTech('RESTful APIs & Postman')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <PostmanBrandIcon size={26} />
              <span className="node-tooltip">REST APIs</span>
            </div>
          </div>

          {/* Git (Bottom-Left) */}
          <div className="orbit-node node-bottom-left">
            <div 
              className="tech-icon-pill git-pill" 
              title="Git & GitHub"
              onMouseEnter={() => setHoveredTech('Git & GitHub')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <GitBrandIcon size={26} />
              <span className="node-tooltip">Git</span>
            </div>
          </div>

          {/* Figma (Top-Left) */}
          <div className="orbit-node node-top-left">
            <div 
              className="tech-icon-pill figma-pill" 
              title="Figma UI/UX"
              onMouseEnter={() => setHoveredTech('Figma to Flutter')}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <FigmaBrandIcon size={24} />
              <span className="node-tooltip">Figma</span>
            </div>
          </div>
        </div>

        {/* Center Foreground: Manirathinam's Photo with smooth bottom gradient fade */}
        <div className="orbit-portrait-center">
          <div className="portrait-backdrop-halo"></div>
          <img 
            src="/hero-portrait.png" 
            alt="Manirathinam R - Flutter Developer" 
            className="portrait-main-img" 
          />
        </div>

        {/* Foreground Floating Badges */}
        <div className="floating-orbit-badge badge-top-right">
          <span className="badge-pulse-dot"></span>
          <Smartphone size={14} color="#CEFF00" />
          <span>Flutter &amp; Dart</span>
        </div>

        <div className="floating-orbit-badge badge-bottom-left">
          <Code2 size={14} color="#38BDF8" />
          <span>REST APIs &amp; Firebase</span>
        </div>

        {/* Active Technology Banner on hover */}
        {hoveredTech && (
          <div className="orbit-active-banner animate-fade-in-up">
            <Sparkles size={13} color="#CEFF00" />
            <span>{hoveredTech}</span>
          </div>
        )}
      </div>
    </div>
  );
}
