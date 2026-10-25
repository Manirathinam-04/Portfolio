import './SpidermanHeroWebScene.css';

/**
 * RealisticWebStrand Component
 * Renders physically plausible, thin spider-silk strands connecting
 * the mechanical web-shooter nozzle to the existing hero card anchor.
 */
export default function RealisticWebStrand({
  startPos = { x: 180, y: 350 },
  endPos = { x: 800, y: 320 },
  shootProgress = 0, // 0 to 1 during shooting phase
  isAttached = false,
  isTaut = false
}) {
  if (shootProgress <= 0.02) return null;

  // Calculate current tip coordinates during flight
  let currentEndX = endPos.x;
  let currentEndY = endPos.y;

  if (!isAttached && shootProgress < 1) {
    currentEndX = startPos.x + (endPos.x - startPos.x) * shootProgress;
    currentEndY = startPos.y + (endPos.y - startPos.y) * shootProgress;
  }

  const dx = currentEndX - startPos.x;
  const dy = currentEndY - startPos.y;
  const midX = startPos.x + dx * 0.5;

  // Silk natural sag: sags slightly when loose, tightens when taut
  const sag = isTaut ? 4 : 22 * (1 - shootProgress * 0.5);
  const midY = startPos.y + dy * 0.5 + sag;

  return (
    <div className="realistic-web-strand-layer" pointer-events="none">
      <svg className="realistic-web-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="silkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffffff" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.6" />
          </filter>

          <linearGradient id="silkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="15%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>

        {/* 1. Micro Secondary Spiral Silk Fiber */}
        <path
          d={`M ${startPos.x} ${startPos.y} Q ${midX} ${midY - 8}, ${currentEndX} ${currentEndY}`}
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.0"
          strokeDasharray="6 4"
          className="web-micro-fiber"
        />

        {/* 2. Micro Braided Fiber (Cyan Tint) */}
        <path
          d={`M ${startPos.x} ${startPos.y} Q ${midX} ${midY + 10}, ${currentEndX} ${currentEndY}`}
          stroke="rgba(56, 189, 248, 0.55)"
          strokeWidth="0.9"
          strokeDasharray="4 6"
          className="web-micro-fiber-2"
        />

        {/* 3. Primary Core Spider-Silk Strand (Thin & Realistic) */}
        <path
          d={`M ${startPos.x} ${startPos.y} Q ${midX} ${midY}, ${currentEndX} ${currentEndY}`}
          stroke="url(#silkGradient)"
          strokeWidth={isTaut ? "2.2" : "1.8"}
          strokeLinecap="round"
          filter="url(#silkGlow)"
          className="web-core-strand"
        />

        {/* 4. Natural Silk Droplets / Nodes */}
        {shootProgress > 0.4 && (
          <circle
            cx={startPos.x + dx * 0.3}
            cy={startPos.y + dy * 0.3 + sag * 0.6}
            r="2"
            fill="#ffffff"
            filter="url(#silkGlow)"
          />
        )}
        {shootProgress > 0.7 && (
          <circle
            cx={startPos.x + dx * 0.65}
            cy={startPos.y + dy * 0.65 + sag * 0.8}
            r="2.2"
            fill="#ffffff"
            filter="url(#silkGlow)"
          />
        )}
      </svg>

      {/* 5. Web Impact Splat Decal on Card Anchor */}
      {isAttached && (
        <div
          className="hero-web-impact-decal"
          style={{
            left: `${endPos.x}px`,
            top: `${endPos.y}px`
          }}
        >
          <svg viewBox="0 0 60 60" width="46" height="46" fill="none">
            <circle cx="30" cy="30" r="8" stroke="#ffffff" strokeWidth="1.8" fill="rgba(255, 255, 255, 0.45)" />
            <circle cx="30" cy="30" r="16" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 30 6 L 30 54 M 6 30 L 54 30 M 12 12 L 48 48 M 12 48 L 48 12" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="4" fill="#ffffff" />
          </svg>
        </div>
      )}
    </div>
  );
}
