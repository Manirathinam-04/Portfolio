import React from 'react';
import './CrawlingSpiders.css';

/**
 * Individual Spider SVG with animated walking legs and authentic redback markings.
 */
function SpiderIcon({ size = 38, variant = 'red', isMoving = true }) {
  const accentColor = variant === 'cyan' ? '#38bdf8' : variant === 'volt' ? '#CEFF00' : '#ff2a3b';
  const bodyColor = '#0a0d10';

  return (
    <svg
      viewBox="-32 -32 64 64"
      width={size}
      height={size}
      className={`spider-svg ${isMoving ? 'is-crawling' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`spiderGlow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Spider Shadow */}
      <ellipse cx="0" cy="4" rx="14" ry="18" fill="rgba(0, 0, 0, 0.65)" filter="blur(2px)" />

      {/* 8 Jointed Legs (4 Left, 4 Right) */}
      <g className="spider-legs-group">
        {/* Left Front Leg 1 */}
        <path
          d="M -5 -6 Q -18 -18, -24 -14"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-odd leg-l1"
        />
        {/* Right Front Leg 1 */}
        <path
          d="M 5 -6 Q 18 -18, 24 -14"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-even leg-r1"
        />

        {/* Left Mid-Front Leg 2 */}
        <path
          d="M -6 -2 Q -24 -6, -27 2"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-even leg-l2"
        />
        {/* Right Mid-Front Leg 2 */}
        <path
          d="M 6 -2 Q 24 -6, 27 2"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-odd leg-r2"
        />

        {/* Left Mid-Rear Leg 3 */}
        <path
          d="M -6 5 Q -24 10, -22 22"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-odd leg-l3"
        />
        {/* Right Mid-Rear Leg 3 */}
        <path
          d="M 6 5 Q 24 10, 22 22"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-even leg-r3"
        />

        {/* Left Rear Leg 4 */}
        <path
          d="M -5 11 Q -20 24, -16 32"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-even leg-l4"
        />
        {/* Right Rear Leg 4 */}
        <path
          d="M 5 11 Q 20 24, 16 32"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          className="spider-leg leg-odd leg-r4"
        />
      </g>

      {/* Abdomen (Rear) */}
      <ellipse
        cx="0"
        cy="11"
        rx="9.5"
        ry="13.5"
        fill={bodyColor}
        stroke={accentColor}
        strokeWidth="1.5"
      />
      {/* Spider-Man Hourglass / Bio Emblem */}
      <path
        d="M -3 6 L 3 6 L -3 16 L 3 16 Z"
        fill={accentColor}
        opacity="0.9"
      />

      {/* Cephalothorax (Head & Torso) */}
      <circle
        cx="0"
        cy="-5"
        r="6.5"
        fill={bodyColor}
        stroke={accentColor}
        strokeWidth="1.4"
      />

      {/* Chelicerae / Fangs */}
      <path d="M -2 -11 L -1 -14 M 2 -11 L 1 -14" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />

      {/* Glowing Spider Eyes */}
      <circle cx="-2.2" cy="-7.5" r="1.1" fill="#ffffff" />
      <circle cx="2.2" cy="-7.5" r="1.1" fill="#ffffff" />
      <circle cx="-4" cy="-5.5" r="0.8" fill={accentColor} />
      <circle cx="4" cy="-5.5" r="0.8" fill={accentColor} />
    </svg>
  );
}

/**
 * CrawlingSpiders Component
 * Renders multiple realistic spiders that crawl across the project card
 * as the user scrolls, and then scurry down off the card into the abyss!
 *
 * @param {number} progress - normalized scroll progress from 0 to 1 for this phase
 */
export default function CrawlingSpiders({ progress = 0 }) {
  // Only render if spider phase has started (progress > 0)
  if (progress <= 0.01) return null;

  // We have 6 spiders with distinct paths across the card and phone:
  // Waypoint format: { startX, startY, midX, midY, endX, endY, rot1, rot2, size, variant, silk: boolean }
  const spiders = [
    {
      id: 'spider-alpha',
      size: 42,
      variant: 'red',
      // Starts near top-right of card, crawls across header, down right edge, and drops down
      path: (t) => {
        if (t < 0.5) {
          const sub = t / 0.5;
          const x = 70 + sub * 18; // % across deck
          const y = 8 + sub * 28; // % down deck
          const rot = 135;
          return { x, y, rot, opacity: Math.min(1, t * 8) };
        } else {
          const sub = (t - 0.5) / 0.5;
          const x = 88 - sub * 4;
          const y = 36 + sub * 75; // Exits bottom (> 100%)
          const rot = 180;
          return { x, y, rot, opacity: 1 };
        }
      }
    },
    {
      id: 'spider-beta',
      size: 38,
      variant: 'volt',
      // Drops onto the phone mockup screen, crawls down the screen, and exits bottom
      silk: true,
      path: (t) => {
        if (t < 0.45) {
          const sub = t / 0.45;
          const x = 32 + sub * 2;
          const y = -10 + sub * 42; // Enters from top on silk
          const rot = 180;
          return { x, y, rot, opacity: 1 };
        } else {
          const sub = (t - 0.45) / 0.55;
          const x = 34 + sub * 3;
          const y = 32 + sub * 80; // Scurries down phone screen and off bottom
          const rot = 175;
          return { x, y, rot, opacity: 1 };
        }
      }
    },
    {
      id: 'spider-gamma',
      size: 34,
      variant: 'cyan',
      // Crawls from the bottom-left across the active project details card
      path: (t) => {
        if (t < 0.5) {
          const sub = t / 0.5;
          const x = 48 + sub * 16;
          const y = 45 + sub * 12;
          const rot = 110;
          return { x, y, rot, opacity: Math.min(1, t * 6) };
        } else {
          const sub = (t - 0.5) / 0.5;
          const x = 64 + sub * 2;
          const y = 57 + sub * 55; // exits bottom
          const rot = 170;
          return { x, y, rot, opacity: 1 };
        }
      }
    },
    {
      id: 'spider-delta',
      size: 28,
      variant: 'red',
      // Fast baby spider skittering down the right border
      path: (t) => {
        const x = 92 - t * 4;
        const y = -5 + t * 120; // Fast traverse top to bottom
        const rot = 175;
        return { x, y, rot, opacity: Math.min(1, t * 10) };
      }
    },
    {
      id: 'spider-epsilon',
      size: 36,
      variant: 'volt',
      // Drops on silk next to the phone, sways, then drops down off screen
      silk: true,
      path: (t) => {
        if (t < 0.5) {
          const sub = t / 0.5;
          const x = 24 + Math.sin(sub * Math.PI * 2) * 2;
          const y = -15 + sub * 50;
          const rot = 180;
          return { x, y, rot, opacity: 1 };
        } else {
          const sub = (t - 0.5) / 0.5;
          const x = 24 + sub * 4;
          const y = 35 + sub * 78;
          const rot = 165;
          return { x, y, rot, opacity: 1 };
        }
      }
    },
    {
      id: 'spider-zeta',
      size: 32,
      variant: 'cyan',
      // Crawls across the top project tabs then scurries down
      path: (t) => {
        if (t < 0.4) {
          const sub = t / 0.4;
          const x = 50 + sub * 20;
          const y = 4 + sub * 4;
          const rot = 90;
          return { x, y, rot, opacity: Math.min(1, t * 8) };
        } else {
          const sub = (t - 0.4) / 0.6;
          const x = 70 + sub * 5;
          const y = 8 + sub * 102;
          const rot = 170;
          return { x, y, rot, opacity: 1 };
        }
      }
    }
  ];

  return (
    <div className="crawling-spiders-container" pointer-events="none">
      {spiders.map((sp) => {
        const { x, y, rot, opacity } = sp.path(progress);
        if (opacity <= 0) return null;

        return (
          <React.Fragment key={sp.id}>
            {/* Optional Web Silk Thread for dropping spiders */}
            {sp.silk && y > -10 && (
              <div
                className="spider-silk-thread"
                style={{
                  left: `${x}%`,
                  top: 0,
                  height: `${Math.max(0, y)}%`,
                  opacity: Math.min(0.7, opacity * 0.8)
                }}
              />
            )}

            <div
              className="crawling-spider-wrapper"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                opacity: opacity
              }}
            >
              <SpiderIcon size={sp.size} variant={sp.variant} isMoving={true} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
