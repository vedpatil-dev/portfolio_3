import React from "react";

export default function MaraudersMapBg() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-45"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-blood-ink/55"
      >
        <defs>
          {/* Footprint Left Symbol */}
          <g id="foot-left">
            <ellipse cx="-1.5" cy="0" rx="1.6" ry="3.5" fill="currentColor" />
            <ellipse cx="-1.2" cy="-4" rx="1.4" ry="2.0" fill="currentColor" />
            {/* Small toe dots */}
            <circle cx="-2.5" cy="-7" r="0.45" fill="currentColor" />
            <circle cx="-1.5" cy="-7.5" r="0.45" fill="currentColor" />
            <circle cx="-0.6" cy="-7.3" r="0.4" fill="currentColor" />
            <circle cx="0.1" cy="-6.7" r="0.35" fill="currentColor" />
          </g>

          {/* Footprint Right Symbol scaled up 2.8x */}
          <g id="foot-right" transform="scale(1.8)">
            <ellipse cx="1.5" cy="0" rx="1.6" ry="3.5" fill="currentColor" />
            <ellipse cx="1.2" cy="-4" rx="1.4" ry="2.0" fill="currentColor" />
            {/* Small toe dots */}
            <circle cx="2.5" cy="-7" r="0.45" fill="currentColor" />
            <circle cx="1.5" cy="-7.5" r="0.45" fill="currentColor" />
            <circle cx="0.6" cy="-7.3" r="0.4" fill="currentColor" />
            <circle cx="-0.1" cy="-6.7" r="0.35" fill="currentColor" />
          </g>

          {/* SVG text paths for curved handwriting */}
          <path id="textPath-arc-outer" d="M 500 500 A 300 300 0 0 1 1100 500" fill="none" />
          <path id="textPath-arc-inner" d="M 550 500 A 250 250 0 0 1 1050 500" fill="none" />
          <path id="textPath-round" d="M 800 350 A 150 150 0 1 1 799.9 350" fill="none" />
          <path id="textPath-bottom-arc" d="M 300 800 Q 800 650 1300 800" fill="none" />

          {/* Walk sequence CSS animation style */}
          <style>{`
            .footprint-step {
              opacity: 0;
              animation: walkStep 10s infinite linear;
            }
            .map-slow-spin {
              transform-origin: 800px 500px;
              animation: slowSpin 240s infinite linear;
            }
            .map-pulse-line {
              animation: pulseLine 6s infinite ease-in-out;
            }
            
            @keyframes walkStep {
              0% { opacity: 0; }
              /* Fade in at step start - highly visible */
              5% { opacity: 0.85; filter: drop-shadow(0 0 1.5px currentColor); }
              /* Keep visible for a bit */
              25% { opacity: 0.70; }
              /* Fade out */
              35% { opacity: 0; }
              100% { opacity: 0; }
            }

            @keyframes slowSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes pulseLine {
              0%, 100% { stroke-opacity: 0.15; }
              50% { stroke-opacity: 0.35; }
            }
          `}</style>
        </defs>

        {/* ── BACKGROUND CORRIDORS & CASTLE SHAPES ── */}
        <g stroke="currentColor" strokeWidth="1.2" fill="none" className="opacity-18">
          {/* Main concentric circular halls */}
          <circle cx="800" cy="500" r="300" strokeDasharray="6 8" />
          <circle cx="800" cy="500" r="250" strokeDasharray="3 4" />
          <circle cx="800" cy="500" r="150" strokeWidth="1.8" />
          <circle cx="800" cy="500" r="142" strokeDasharray="2 3" />

          {/* Tangent halls / corridors */}
          <line x1="200" y1="500" x2="500" y2="500" strokeDasharray="8 6" />
          <line x1="1100" y1="500" x2="1400" y2="500" strokeDasharray="8 6" />
          
          <line x1="800" y1="100" x2="800" y2="350" strokeDasharray="8 6" />
          <line x1="800" y1="650" x2="800" y2="900" strokeDasharray="8 6" />

          {/* Diagonals corridors */}
          <line x1="400" y1="200" x2="690" y2="390" strokeDasharray="5 5" />
          <line x1="910" y1="390" x2="1200" y2="200" strokeDasharray="5 5" />
          <line x1="400" y1="800" x2="690" y2="610" strokeDasharray="5 5" />
          <line x1="910" y1="610" x2="1200" y2="800" strokeDasharray="5 5" />

          {/* Outer gallery borders */}
          <rect x="50" y="50" width="1500" height="900" rx="15" strokeWidth="2.5" strokeDasharray="12 8" />
          <rect x="62" y="62" width="1476" height="876" rx="10" strokeWidth="1" opacity="0.5" />
        </g>

        {/* ── ROTATING ASTROLABE / RINGS ── */}
        <g className="map-slow-spin opacity-12" stroke="currentColor" fill="none">
          <circle cx="800" cy="500" r="282" strokeWidth="0.8" strokeDasharray="40 2" />
          <circle cx="800" cy="500" r="225" strokeWidth="1.2" strokeDasharray="20 40 80 10" />
          <circle cx="800" cy="500" r="120" strokeWidth="0.6" strokeDasharray="4 8" />

          {/* Astrolabe Pointer Lines */}
          <line x1="800" y1="200" x2="800" y2="800" strokeWidth="0.5" opacity="0.4" />
          <line x1="500" y1="500" x2="1100" y2="500" strokeWidth="0.5" opacity="0.4" />
          <line x1="587" y1="287" x2="1013" y2="713" strokeWidth="0.5" opacity="0.3" />
          <line x1="587" y1="713" x2="1013" y2="287" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* ── CASTLE ARCHITECTURE DETAILED OUTLINES ── */}
        <g stroke="currentColor" fill="none" opacity="0.12" className="map-pulse-line">
          {/* North Gate Tower Outline */}
          <path d="M 750 100 L 750 60 L 765 60 L 765 80 L 800 50 L 835 80 L 835 60 L 850 60 L 850 100 Z" strokeWidth="1.5" />
          <line x1="750" y1="80" x2="850" y2="80" />
          <path d="M 785 80 L 785 100 M 815 80 L 815 100" />
          <circle cx="800" cy="70" r="3" />

          {/* East Tower Outline */}
          <path d="M 1400 450 L 1440 450 L 1440 430 L 1450 430 L 1450 570 L 1440 570 L 1440 550 L 1400 550 Z" strokeWidth="1.5" />
          <line x1="1420" y1="450" x2="1420" y2="550" />

          {/* West Tower Outline */}
          <path d="M 200 450 L 160 450 L 160 430 L 150 430 L 150 570 L 160 570 L 160 550 L 200 550 Z" strokeWidth="1.5" />
          <line x1="180" y1="450" x2="180" y2="550" />

          {/* Hogwarts Crest outline center */}
          <path d="M 780 470 Q 800 455 820 470 Q 825 500 820 530 Q 800 545 780 530 Q 775 500 780 470 Z" strokeWidth="1.8" />
          <text x="800" y="508" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" fill="currentColor" opacity="0.6">H</text>
        </g>

        {/* ── COMPASS ROSE PRINTED IN THE MAP ── */}
        <g transform="translate(1320, 140)" className="pointer-events-none select-none">
          {/* Outer rings */}
          <circle cx="90" cy="90" r="85" stroke="var(--ink-faded)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.65" />
          <circle cx="90" cy="90" r="72" stroke="var(--parchment-dark)" strokeWidth="1" opacity="0.45" fill="none" />
          <circle cx="90" cy="90" r="12" stroke="var(--parchment-dark)" strokeWidth="0.8" opacity="0.35" fill="none" />

          {/* Cardinal spokes */}
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={angle}
              x1="90" y1="90"
              x2={90 + 72 * Math.cos((angle * Math.PI) / 180)}
              y2={90 + 72 * Math.sin((angle * Math.PI) / 180)}
              stroke="var(--ink-faded)"
              strokeWidth="1.2"
              opacity="0.55"
            />
          ))}
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={`n${angle}`}
              x1="90" y1="90"
              x2={90 - 72 * Math.cos((angle * Math.PI) / 180)}
              y2={90 - 72 * Math.sin((angle * Math.PI) / 180)}
              stroke="var(--ink-faded)"
              strokeWidth="1.2"
              opacity="0.55"
            />
          ))}

          {/* North arrow (large) - rich crimson ink */}
          <polygon points="90,18 83,90 90,83 97,90" fill="var(--blood-ink)" opacity="0.75" />
          {/* South arrow - dark sepia */}
          <polygon points="90,162 83,90 90,97 97,90" fill="var(--ink-faded)" opacity="0.65" />
          {/* East - dark sepia */}
          <polygon points="162,90 90,83 97,90 90,97" fill="var(--ink-faded)" opacity="0.6" />
          {/* West - dark sepia */}
          <polygon points="18,90 90,83 83,90 90,97" fill="var(--ink-faded)" opacity="0.6" />

          {/* Center dots */}
          <circle cx="90" cy="90" r="5" fill="var(--leather)" opacity="0.7" />
          <circle cx="90" cy="90" r="2.5" fill="var(--blood-ink)" opacity="0.8" />

          {/* N label */}
          <text 
            x="90" 
            y="12" 
            textAnchor="middle" 
            fontSize="11" 
            fontFamily="var(--font-pirata), serif" 
            fill="var(--blood-ink)" 
            fontWeight="bold"
            opacity="0.75"
          >
            N
          </text>
        </g>

        {/* ── DYNAMIC CURVED TEXT OVERLAYS ── */}
        <g fill="currentColor" fontFamily="var(--font-pirata), serif" fontSize="9" letterSpacing="2.5" className="opacity-18 select-none font-display">
          <text><textPath href="#textPath-arc-outer" startOffset="50%" textAnchor="middle">✦ INIIMICUS INTER CATASTROPHE ET ARCANUM ✦</textPath></text>
          <text><textPath href="#textPath-arc-inner" startOffset="50%" textAnchor="middle">MESSERS MOONY, WORMTAIL, PADFOOT & PRONGS</textPath></text>
          <text fontSize="7" letterSpacing="1.5"><textPath href="#textPath-round" startOffset="25%">✦ SALVETE FLORENTIA CASTLE MAP ✦ HOGWARTS TURRIS MAGNUS</textPath></text>
          <text fontSize="10" letterSpacing="3"><textPath href="#textPath-bottom-arc" startOffset="50%" textAnchor="middle">I SOLEMNLY SWEAR THAT I AM UP TO NO GOOD</textPath></text>
        </g>

        {/* ── MOVING FOOTPRINTS ALONG CORRIDORS (CONTINUOUS CHANGES) ── */}

        {/* Path 1: Walking from bottom-left diagonal to center-left */}
        {/* Total cycle is 10s. Steps fade in and out in sequence */}
        <g className="text-blood-ink">
          {/* Step 1 */}
          <use href="#foot-left" x="250" y="800" transform="rotate(40 250 800)" className="footprint-step" style={{ animationDelay: "0.0s" }} />
          <use href="#foot-right" x="270" y="780" transform="rotate(40 270 780)" className="footprint-step" style={{ animationDelay: "0.4s" }} />
          {/* Step 2 */}
          <use href="#foot-left" x="290" y="760" transform="rotate(40 290 760)" className="footprint-step" style={{ animationDelay: "0.8s" }} />
          <use href="#foot-right" x="310" y="740" transform="rotate(40 310 740)" className="footprint-step" style={{ animationDelay: "1.2s" }} />
          {/* Step 3 */}
          <use href="#foot-left" x="330" y="720" transform="rotate(40 330 720)" className="footprint-step" style={{ animationDelay: "1.6s" }} />
          <use href="#foot-right" x="350" y="700" transform="rotate(40 350 700)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          {/* Step 4 */}
          <use href="#foot-left" x="370" y="680" transform="rotate(40 370 680)" className="footprint-step" style={{ animationDelay: "2.4s" }} />
          <use href="#foot-right" x="390" y="660" transform="rotate(40 390 660)" className="footprint-step" style={{ animationDelay: "2.8s" }} />
          {/* Step 5 */}
          <use href="#foot-left" x="410" y="640" transform="rotate(40 410 640)" className="footprint-step" style={{ animationDelay: "3.2s" }} />
          <use href="#foot-right" x="430" y="620" transform="rotate(40 430 620)" className="footprint-step" style={{ animationDelay: "3.6s" }} />
          {/* Step 6 */}
          <use href="#foot-left" x="450" y="600" transform="rotate(40 450 600)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          <use href="#foot-right" x="470" y="580" transform="rotate(40 470 580)" className="footprint-step" style={{ animationDelay: "4.4s" }} />
        </g>

        {/* Path 2: Walking around the concentric circular hall (clockwise) */}
        <g className="text-blood-ink">
          {/* Angle 0 deg (Right side going down) */}
          <use href="#foot-left" x="1100" y="500" transform="rotate(95 1100 500)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          <use href="#foot-right" x="1090" y="530" transform="rotate(110 1090 530)" className="footprint-step" style={{ animationDelay: "2.4s" }} />
          {/* Angle ~15 deg */}
          <use href="#foot-left" x="1070" y="560" transform="rotate(125 1070 560)" className="footprint-step" style={{ animationDelay: "2.8s" }} />
          <use href="#foot-right" x="1040" y="588" transform="rotate(140 1040 588)" className="footprint-step" style={{ animationDelay: "3.2s" }} />
          {/* Angle ~30 deg */}
          <use href="#foot-left" x="1005" y="612" transform="rotate(155 1005 612)" className="footprint-step" style={{ animationDelay: "3.6s" }} />
          <use href="#foot-right" x="970" y="632" transform="rotate(170 970 632)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          {/* Angle ~45 deg (Bottom right corner) */}
          <use href="#foot-left" x="930" y="647" transform="rotate(185 930 647)" className="footprint-step" style={{ animationDelay: "4.4s" }} />
          <use href="#foot-right" x="890" y="655" transform="rotate(200 890 655)" className="footprint-step" style={{ animationDelay: "4.8s" }} />
          {/* Angle ~60 deg */}
          <use href="#foot-left" x="850" y="658" transform="rotate(215 850 658)" className="footprint-step" style={{ animationDelay: "5.2s" }} />
          <use href="#foot-right" x="810" y="655" transform="rotate(230 810 655)" className="footprint-step" style={{ animationDelay: "5.6s" }} />
        </g>

        {/* Path 3: Walking along the top right horizontal corridor going left */}
        <g className="text-blood-ink">
          {/* Step 1 */}
          <use href="#foot-left" x="1350" y="200" transform="rotate(-90 1350 200)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          <use href="#foot-right" x="1320" y="200" transform="rotate(-90 1320 200)" className="footprint-step" style={{ animationDelay: "4.3s" }} />
          {/* Step 2 */}
          <use href="#foot-left" x="1290" y="200" transform="rotate(-90 1290 200)" className="footprint-step" style={{ animationDelay: "4.6s" }} />
          <use href="#foot-right" x="1260" y="200" transform="rotate(-90 1260 200)" className="footprint-step" style={{ animationDelay: "4.9s" }} />
          {/* Step 3 */}
          <use href="#foot-left" x="1230" y="200" transform="rotate(-90 1230 200)" className="footprint-step" style={{ animationDelay: "5.2s" }} />
          <use href="#foot-right" x="1200" y="200" transform="rotate(-90 1200 200)" className="footprint-step" style={{ animationDelay: "5.5s" }} />
          {/* Step 4 */}
          <use href="#foot-left" x="1170" y="200" transform="rotate(-90 1170 200)" className="footprint-step" style={{ animationDelay: "5.8s" }} />
          <use href="#foot-right" x="1140" y="200" transform="rotate(-90 1140 200)" className="footprint-step" style={{ animationDelay: "6.1s" }} />
          {/* Step 5 */}
          <use href="#foot-left" x="1110" y="200" transform="rotate(-90 1110 200)" className="footprint-step" style={{ animationDelay: "6.4s" }} />
          <use href="#foot-right" x="1080" y="200" transform="rotate(-90 1080 200)" className="footprint-step" style={{ animationDelay: "6.7s" }} />
        </g>
        {/* ── MOVING CHARACTER NAME TAGS ── */}
        <g fill="currentColor" fontFamily="var(--font-handwritten), cursive" fontSize="12" fontWeight="bold" className="text-blood-ink opacity-65">
          {/* Albus Dumbledore - placed stationary near the Hogwarts crest */}
          <g className="map-pulse-line">
            <text x="800" y="440" textAnchor="middle" fontSize="11" opacity="0.7">Albus Dumbledore</text>
          </g>

          {/* Harry Potter - walks/paces in circular corridor (delayed entry sequence) */}
          <g className="footprint-step" style={{ animationDelay: "2.4s" }}>
            <text x="1050" y="555" transform="rotate(15 1050 555)" fontSize="10">Harry Potter</text>
          </g>

          {/* Severus Snape - pacing along the North Gate corridor */}
          <g className="footprint-step" style={{ animationDelay: "5.0s" }}>
            <text x="1230" y="185" transform="rotate(-90 1230 185)" fontSize="10">Severus Snape</text>
          </g>

          {/* Ved Patil - positioned in the Great Hall / center */}
          <g className="map-pulse-line">
            <text x="800" y="575" textAnchor="middle" fontSize="13" fontWeight="bold" className="tracking-wide">Ved Patil</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
