import './SpidermanHeroWebScene.css';

/**
 * Realistic3DSpider Component
 * Renders a photorealistic 3D spider that crawls across the hero card
 * surface with an articulated 8-leg walking gait and descends over the edge
 * on a silk dragline.
 */
export default function Realistic3DSpider({ progress = 0 }) {
  if (progress <= 0.02) return null;

  // Trajectory calculation based on scroll progress (0 to 1)
  // Phase A (0.0 to 0.55): Crawls horizontally across the hero card surface
  // Phase B (0.55 to 1.0): Reaches edge, turns downward, and descends over edge on silk
  let posX;
  let posY;
  let rot;
  let silkLength = 0;
  const opacity = Math.min(1, progress * 6);
  const isWalking = progress > 0.03 && progress < 0.98;

  if (progress < 0.55) {
    const t = progress / 0.55;
    posX = 58 + t * 34; // moves from 58% to 92% across card
    posY = 22 + t * 18; // moves slightly downward across card
    rot = 110 + t * 15;
  } else {
    const t = (progress - 0.55) / 0.45;
    posX = 92; // stays on right edge
    posY = 40 + t * 75; // descends down over the edge (> 100% exits card bottom)
    rot = 180; // pointing straight down
    silkLength = t * 75; // silk dragline trailing behind
  }

  return (
    <div className="hero-crawling-spider-stage" pointer-events="none">
      {/* Silk dragline extending from card edge down to descending spider */}
      {silkLength > 0 && (
        <div
          className="hero-spider-silk-dragline"
          style={{
            left: `${posX}%`,
            top: '40%',
            height: `${silkLength}%`
          }}
        />
      )}

      {/* Spider Entity */}
      <div
        className="hero-spider-entity"
        style={{
          left: `${posX}%`,
          top: `${posY}%`,
          transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          opacity
        }}
      >
        <svg
          viewBox="-35 -35 70 70"
          width="48"
          height="48"
          className={`spider-anatomical-svg ${isWalking ? 'walking-cycle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="chitinShine" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#2c3e50" />
              <stop offset="40%" stopColor="#11161d" />
              <stop offset="100%" stopColor="#05070a" />
            </radialGradient>
            <filter id="spiderShadowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Contact Shadow on Card Surface */}
          <ellipse cx="0" cy="5" rx="14" ry="18" fill="rgba(0,0,0,0.7)" filter="url(#spiderShadowFilter)" />

          {/* 8 Articulated Jointed Legs with Alternating Crawling Gait */}
          <g className="spider-legs-mesh">
            {/* Front Pair (L1 & R1) */}
            <path
              d="M -5 -6 Q -18 -18, -25 -14"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-odd-walk"
            />
            <path
              d="M 5 -6 Q 18 -18, 25 -14"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-even-walk"
            />

            {/* Mid-Front Pair (L2 & R2) */}
            <path
              d="M -6 -2 Q -24 -6, -28 3"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-even-walk"
            />
            <path
              d="M 6 -2 Q 24 -6, 28 3"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-odd-walk"
            />

            {/* Mid-Rear Pair (L3 & R3) */}
            <path
              d="M -6 5 Q -25 10, -23 23"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-odd-walk"
            />
            <path
              d="M 6 5 Q 25 10, 23 23"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-even-walk"
            />

            {/* Rear Pair (L4 & R4) */}
            <path
              d="M -5 11 Q -21 26, -17 34"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-even-walk"
            />
            <path
              d="M 5 11 Q 21 26, 17 34"
              stroke="#0f172a"
              strokeWidth="2.0"
              strokeLinecap="round"
              className="spider-leg leg-odd-walk"
            />
          </g>

          {/* Abdomen (Opisthosoma) */}
          <ellipse
            cx="0"
            cy="12"
            rx="10.5"
            ry="14.5"
            fill="url(#chitinShine)"
            stroke="#1e293b"
            strokeWidth="1.2"
          />

          {/* Red Hourglass Bio-Marking on Dorsal Surface */}
          <path
            d="M -3 6 L 3 6 L -3 18 L 3 18 Z"
            fill="#e11d48"
            opacity="0.95"
            filter="drop-shadow(0 0 3px #ff2a3b)"
          />

          {/* Cephalothorax (Head & Torso with Specular Chitin) */}
          <circle
            cx="0"
            cy="-5"
            r="7"
            fill="url(#chitinShine)"
            stroke="#334155"
            strokeWidth="1.2"
          />

          {/* Fangs / Chelicerae */}
          <path d="M -2.5 -12 L -1 -15 M 2.5 -12 L 1 -15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

          {/* Micro Clustered Specular Eyes */}
          <circle cx="-2.2" cy="-8" r="1.1" fill="#ffffff" />
          <circle cx="2.2" cy="-8" r="1.1" fill="#ffffff" />
          <circle cx="-4" cy="-6" r="0.8" fill="#e11d48" />
          <circle cx="4" cy="-6" r="0.8" fill="#e11d48" />
        </svg>
      </div>
    </div>
  );
}
