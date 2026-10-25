import { useEffect, useState } from 'react';
import './SpidermanWebShooter.css';

/**
 * Realistic SpidermanWebShooter Component
 * Renders:
 * 1. Realistic armored Spider-Man gauntlet on the left with glowing cyan nozzle
 * 2. Dynamic SVG web line connecting wrist nozzle (x1, y1) to project frame (x2, y2)
 * 3. Comic THWIP! sound effect badge and impact splat
 * 4. Realistic web fibers, tension sag, and electric energy charge
 */
export default function SpidermanWebShooter({
  scrollProgress = 0,
  nozzleRef,
  anchorRef,
  viewportRef
}) {
  const [coords, setCoords] = useState({ x1: 180, y1: 380, x2: 900, y2: 320 });

  // Update dynamic coordinates on scroll, resize, or animation frame
  useEffect(() => {
    const updateCoords = () => {
      if (!viewportRef?.current || !nozzleRef?.current || !anchorRef?.current) return;
      const vRect = viewportRef.current.getBoundingClientRect();
      const nRect = nozzleRef.current.getBoundingClientRect();
      const aRect = anchorRef.current.getBoundingClientRect();

      setCoords({
        x1: nRect.left + nRect.width / 2 - vRect.left,
        y1: nRect.top + nRect.height / 2 - vRect.top,
        x2: aRect.left + aRect.width / 2 - vRect.left,
        y2: aRect.top + aRect.height / 2 - vRect.top
      });
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    const interval = setInterval(updateCoords, 100);

    return () => {
      window.removeEventListener('resize', updateCoords);
      clearInterval(interval);
    };
  }, [viewportRef, nozzleRef, anchorRef, scrollProgress]);

  // Web shooting calculation:
  // Progress 0.08 - 0.25: Web is flying from nozzle to target
  // Progress >= 0.25: Web is attached and pulling
  const isWebActive = scrollProgress >= 0.07;
  const isWebHit = scrollProgress >= 0.24;
  const isPulling = scrollProgress >= 0.24 && scrollProgress <= 0.72;

  let currentTargetX = coords.x2;
  let currentTargetY = coords.y2;

  if (scrollProgress < 0.24 && scrollProgress >= 0.07) {
    const flightT = Math.min(1, (scrollProgress - 0.07) / 0.17);
    currentTargetX = coords.x1 + (coords.x2 - coords.x1) * flightT;
    currentTargetY = coords.y1 + (coords.y2 - coords.y1) * flightT;
  }

  // Calculate curve control points for realistic tensed / sagging web cable
  const dx = currentTargetX - coords.x1;
  const dy = currentTargetY - coords.y1;
  const midX = coords.x1 + dx * 0.5;
  // Sag decreases as tension increases during pull
  const sagAmount = isPulling ? 8 : 28;
  const midY = coords.y1 + dy * 0.5 + sagAmount;

  // Arm recoil / pull physics
  const armPullOffset = isPulling ? Math.sin((scrollProgress - 0.24) * 8) * 8 - 10 : 0;
  const armRotate = isPulling ? -3.5 : isWebActive ? -1.5 : 0;

  return (
    <>
      {/* 1. Realistic Arm & Gauntlet Stage (Anchored on the Far Left) */}
      <div
        className="spidey-arm-stage"
        style={{
          transform: `translateY(-48%) translateX(${armPullOffset}px) rotate(${armRotate}deg)`
        }}
      >
        <div className="spidey-arm-image-container">
          <img
            src="/spidey-arm-real.jpg"
            alt="Spider-Man Arm Web Shooter"
            className="spidey-arm-img"
          />

          {/* Wrist Web-Shooter Nozzle Anchor Point (Where Web Shoots From) */}
          <div className="spidey-wrist-nozzle" ref={nozzleRef}>
            {/* Glowing cyan reactor core */}
            <div className={`nozzle-core-glow ${isWebActive ? 'active' : ''}`}>
              <div className="nozzle-inner-fire"></div>
              <div className="nozzle-pulse-ring"></div>
              <div className="nozzle-flare"></div>
            </div>
          </div>
        </div>

        {/* THWIP! Comic Burst Sound Effect */}
        {scrollProgress >= 0.12 && scrollProgress <= 0.38 && (
          <div className="spidey-thwip-badge">
            <div className="thwip-badge-inner">
              <span className="thwip-text">THWIP!</span>
              <span className="thwip-sub">WEB SHOOTER FIRED</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Full-Stage Dynamic SVG Web Line Layer */}
      {isWebActive && (
        <svg
          className="spidey-dynamic-web-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="webCableGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.95" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#e11d48" floodOpacity="0.4" />
            </filter>
            <linearGradient id="webLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffea00" />
            </linearGradient>
          </defs>

          {/* Secondary Spiral Web Fibers */}
          <path
            d={`M ${coords.x1} ${coords.y1} Q ${midX} ${midY - 12}, ${currentTargetX} ${currentTargetY}`}
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1.8"
            strokeDasharray="10 5"
            className="web-spiral-fiber"
          />
          <path
            d={`M ${coords.x1} ${coords.y1} Q ${midX} ${midY + 14}, ${currentTargetX} ${currentTargetY}`}
            stroke="rgba(56, 189, 248, 0.75)"
            strokeWidth="1.6"
            strokeDasharray="6 8"
            className="web-spiral-fiber-2"
          />

          {/* Primary High-Tension Web Cable */}
          <path
            d={`M ${coords.x1} ${coords.y1} Q ${midX} ${midY}, ${currentTargetX} ${currentTargetY}`}
            stroke="url(#webLineGrad)"
            strokeWidth={isPulling ? "4" : "3.2"}
            strokeLinecap="round"
            filter="url(#webCableGlow)"
            className="web-main-cable"
          />

          {/* Web Nodes / Silk Droplets */}
          <circle
            cx={coords.x1 + dx * 0.25}
            cy={coords.y1 + dy * 0.25 + sagAmount * 0.5}
            r="3.5"
            fill="#ffffff"
            filter="url(#webCableGlow)"
          />
          <circle
            cx={coords.x1 + dx * 0.55}
            cy={coords.y1 + dy * 0.55 + sagAmount * 0.8}
            r="4"
            fill="#ffffff"
            filter="url(#webCableGlow)"
          />
          <circle
            cx={coords.x1 + dx * 0.82}
            cy={coords.y1 + dy * 0.82 + sagAmount * 0.4}
            r="3.5"
            fill="#ffffff"
            filter="url(#webCableGlow)"
          />
        </svg>
      )}

      {/* 3. Web Impact Splat Attached to Project Frame Anchor */}
      {isWebHit && (
        <div
          className="spidey-impact-splat"
          style={{
            left: `${coords.x2}px`,
            top: `${coords.y2}px`
          }}
        >
          <svg viewBox="0 0 100 100" width="70" height="70" fill="none">
            {/* Impact Spider-Web Splat Decal */}
            <circle cx="50" cy="50" r="14" stroke="#ffffff" strokeWidth="2.5" fill="rgba(255, 255, 255, 0.4)" />
            <circle cx="50" cy="50" r="28" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.8" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="42" stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.4" strokeDasharray="5 5" />
            {/* Radial Spokes */}
            <path d="M 50 8 L 50 92 M 8 50 L 92 50 M 18 18 L 82 82 M 18 82 L 82 18" stroke="#ffffff" strokeWidth="2" />
            <circle cx="50" cy="50" r="7" fill="#ffffff" />
          </svg>
        </div>
      )}
    </>
  );
}
