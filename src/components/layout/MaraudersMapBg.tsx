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
          {/* Turbulence displacement filter to make vector shapes look like organic, jagged weathered stains instead of round bubbles */}
          <filter id="rustStainFilter" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="1.2" />
          </filter>

          {/* Footprint Left Symbol - scaled 2x */}
          <g id="foot-left" transform="scale(2)">
            <ellipse cx="-1.5" cy="0" rx="1.6" ry="3.5" fill="currentColor" />
            <ellipse cx="-1.2" cy="-4" rx="1.4" ry="2.0" fill="currentColor" />
            {/* Small toe dots */}
            <circle cx="-2.5" cy="-7" r="0.45" fill="currentColor" />
            <circle cx="-1.5" cy="-7.5" r="0.45" fill="currentColor" />
            <circle cx="-0.6" cy="-7.3" r="0.4" fill="currentColor" />
            <circle cx="0.1" cy="-6.7" r="0.35" fill="currentColor" />
          </g>

          {/* Footprint Right Symbol - scaled 2x */}
          <g id="foot-right" transform="scale(2)">
            <ellipse cx="1.5" cy="0" rx="1.6" ry="3.5" fill="currentColor" />
            <ellipse cx="1.2" cy="-4" rx="1.4" ry="2.0" fill="currentColor" />
            {/* Small toe dots */}
            <circle cx="2.5" cy="-7" r="0.45" fill="currentColor" />
            <circle cx="1.5" cy="-7.5" r="0.45" fill="currentColor" />
            <circle cx="0.6" cy="-7.3" r="0.4" fill="currentColor" />
            <circle cx="-0.1" cy="-6.7" r="0.35" fill="currentColor" />
          </g>

          {/* Padfoot dog paw print symbol */}
          <g id="paw-print" transform="scale(1.8)">
            {/* Center pad */}
            <path d="M 0 0 C -2.5 -2.5 -4.5 0 -3.5 3 C -2.5 5 2.5 5 3.5 3 C 4.5 0 2.5 -2.5 0 0 Z" fill="currentColor" />
            {/* 4 toe pads */}
            <circle cx="-3" cy="-3.5" r="1.1" fill="currentColor" />
            <circle cx="-0.8" cy="-5.8" r="1.1" fill="currentColor" />
            <circle cx="1.8" cy="-5.8" r="1.1" fill="currentColor" />
            <circle cx="3.8" cy="-3.5" r="1.1" fill="currentColor" />
          </g>

          {/* Mrs. Norris cat paw print symbol */}
          <g id="cat-paw" transform="scale(1.3)">
            <path d="M 0 0 C -1.8 -1.8 -3.2 0 -2.5 2 C -1.8 3.5 1.8 3.5 2.5 2 C 3.2 0 1.8 -1.8 0 0 Z" fill="currentColor" />
            <circle cx="-2.2" cy="-2.5" r="0.7" fill="currentColor" />
            <circle cx="-0.6" cy="-4.2" r="0.7" fill="currentColor" />
            <circle cx="1.3" cy="-4.2" r="0.7" fill="currentColor" />
            <circle cx="2.7" cy="-2.5" r="0.7" fill="currentColor" />
          </g>

          {/* Golden Snitch — engraved magical artifact with articulated feather wings */}
          <g id="snitch" transform="scale(2.2)">
            <circle cx="0" cy="0" r="8.2" fill="#ffd76a" opacity="0.12" className="snitch-aura" />

            {/* Layered translucent wings */}
            <g className="snitch-wing snitch-wing-left">
              <path d="M -4 -1 C -12 -12 -24 -13 -34 -8 C -26 -6 -17 -2 -5 2 Z" fill="#fff8dc" fillOpacity="0.72" stroke="#8a6420" strokeWidth="0.7" />
              <path d="M -5 0 C -16 -6 -27 -5 -36 0 C -25 1 -15 3 -5 3 Z" fill="#fffbe8" fillOpacity="0.58" stroke="#a67c2d" strokeWidth="0.55" />
              <path d="M -5 1 C -16 2 -25 7 -31 12 C -21 9 -13 7 -4 4 Z" fill="#fff5c2" fillOpacity="0.45" stroke="#a67c2d" strokeWidth="0.5" />
              <path d="M -5 0 Q -18 -6 -32 -7 M -5 1 Q -20 0 -34 1 M -5 2 Q -18 6 -29 10" stroke="#d4af37" strokeWidth="0.55" fill="none" opacity="0.8" />
            </g>
            <g className="snitch-wing snitch-wing-right">
              <path d="M 4 -1 C 12 -12 24 -13 34 -8 C 26 -6 17 -2 5 2 Z" fill="#fff8dc" fillOpacity="0.72" stroke="#8a6420" strokeWidth="0.7" />
              <path d="M 5 0 C 16 -6 27 -5 36 0 C 25 1 15 3 5 3 Z" fill="#fffbe8" fillOpacity="0.58" stroke="#a67c2d" strokeWidth="0.55" />
              <path d="M 5 1 C 16 2 25 7 31 12 C 21 9 13 7 4 4 Z" fill="#fff5c2" fillOpacity="0.45" stroke="#a67c2d" strokeWidth="0.5" />
              <path d="M 5 0 Q 18 -6 32 -7 M 5 1 Q 20 0 34 1 M 5 2 Q 18 6 29 10" stroke="#d4af37" strokeWidth="0.55" fill="none" opacity="0.8" />
            </g>

            {/* Metallic sphere */}
            <circle cx="0" cy="0" r="5.4" fill="#d9a514" stroke="#4b2b0a" strokeWidth="1.05" />
            <circle cx="0" cy="0" r="4.35" fill="#f3c742" stroke="#8a5b0b" strokeWidth="0.55" />
            <path d="M 0 -4.2 C -2.1 -2.7 -2.1 2.7 0 4.2 C 2.1 2.7 2.1 -2.7 0 -4.2 Z" fill="none" stroke="#9b6b13" strokeWidth="0.55" />
            <path d="M -4.1 -1.2 Q 0 1.1 4.1 -1.2 M -3.7 1.8 Q 0 -0.1 3.7 1.8" fill="none" stroke="#9b6b13" strokeWidth="0.45" opacity="0.9" />
            <circle cx="0" cy="0" r="1.1" fill="#b57f10" stroke="#5b3608" strokeWidth="0.4" />
            <circle cx="0" cy="0" r="0.42" fill="#ffe89a" />
            <path d="M -2.8 -2.7 A 4 4 0 0 1 0.7 -4" stroke="#fff8d8" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.9" />
            <path d="M 2.4 2.8 A 3.5 3.5 0 0 1 0.8 3.9" stroke="#6d4309" strokeWidth="0.65" fill="none" opacity="0.75" />
          </g>

          {/* SVG text paths for curved handwriting */}
          <path id="textPath-arc-outer" d="M 500 500 A 300 300 0 0 1 1100 500" fill="none" />
          <path id="textPath-arc-inner" d="M 550 500 A 250 250 0 0 1 1050 500" fill="none" />
          <path id="textPath-round" d="M 800 350 A 150 150 0 1 1 799.9 350" fill="none" />
          <path id="textPath-bottom-arc" d="M 300 800 Q 800 650 1300 800" fill="none" />
          <path id="textPath-top-motto" d="M 400 120 Q 800 60 1200 120" fill="none" />

          {/* Walk sequence CSS animation style */}
          <style>{`
            .footprint-step {
              opacity: 0;
              animation: walkStep 10s infinite linear;
            }
            .paw-step {
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
            .peeves-anim {
              animation: peevesFloat 18s infinite ease-in-out;
            }
            .snitch-anim {
              animation: snitchRareFlight 10s infinite cubic-bezier(0.4, 0, 0.2, 1);
              filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.85));
              transition: filter 0.25s ease;
            }
            .snitch-anim:hover {
              animation-play-state: paused !important;
              filter: drop-shadow(0 0 16px rgba(255, 215, 0, 1)) drop-shadow(0 0 6px #ffffff) !important;
            }
            .snitch-anim:hover text {
              fill: #681d18 !important;
            }
            .snitch-wing-left {
              transform-origin: -4px 0px;
              animation: snitchWingLeft 0.18s infinite alternate ease-in-out;
            }
            .snitch-wing-right {
              transform-origin: 4px 0px;
              animation: snitchWingRight 0.18s infinite alternate ease-in-out;
            }
            .snitch-anim:hover .snitch-wing-left,
            .snitch-anim:hover .snitch-wing-right {
              animation-duration: 0.07s;
            }
            .snitch-aura {
              animation: snitchAura 1.4s infinite ease-in-out;
            }
            .secret-passage {
              animation: secretInk 13s infinite ease-in-out;
            }
            .moving-stair {
              transform-box: fill-box;
              transform-origin: center;
              animation: staircaseShift 24s infinite ease-in-out;
            }
            
            @keyframes walkStep {
              0% { opacity: 0; }
              5% { opacity: 0.90; filter: drop-shadow(0 0 1.5px currentColor); }
              25% { opacity: 0.70; }
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

            @keyframes peevesFloat {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.2; }
              25% { transform: translate(-100px, 80px) rotate(15deg); opacity: 0.65; }
              50% { transform: translate(120px, -50px) rotate(-15deg); opacity: 0.3; }
              75% { transform: translate(-40px, -100px) rotate(10deg); opacity: 0.55; }
            }

            /* Golden Snitch: Smooth 10s cycle (visible for 7s, hidden for 3s).
               Glides smoothly along outer towers & borders, off-center. */
            @keyframes snitchRareFlight {
              0%, 10% { transform: translate(0px, 0px) scale(0.15) rotate(0deg); opacity: 0; }
              14% { transform: translate(-70px, 55px) scale(1) rotate(-12deg); opacity: 1; }
              28% { transform: translate(-360px, 115px) scale(1.08) rotate(-22deg); opacity: 1; }
              43% { transform: translate(-720px, 25px) scale(0.95) rotate(18deg); opacity: 0.96; }
              58% { transform: translate(-1050px, 310px) scale(1.1) rotate(-32deg); opacity: 1; }
              72% { transform: translate(-690px, 650px) scale(0.92) rotate(26deg); opacity: 0.95; }
              84% { transform: translate(-180px, 565px) scale(1.08) rotate(-18deg); opacity: 1; }
              92% { transform: translate(30px, 260px) scale(0.72) rotate(12deg); opacity: 0.75; }
              100% { transform: translate(0px, 0px) scale(0.15) rotate(0deg); opacity: 0; }
            }

            @keyframes snitchWingLeft {
              from { transform: rotate(-7deg) scaleY(1); }
              to { transform: rotate(10deg) scaleY(0.62); }
            }
            @keyframes snitchWingRight {
              from { transform: rotate(7deg) scaleY(1); }
              to { transform: rotate(-10deg) scaleY(0.62); }
            }
            @keyframes snitchAura {
              0%, 100% { opacity: 0.08; transform: scale(0.9); }
              50% { opacity: 0.28; transform: scale(1.16); }
            }
            @keyframes secretInk {
              0%, 100% { opacity: 0.12; stroke-dashoffset: 0; }
              45%, 70% { opacity: 0.48; }
              70% { stroke-dashoffset: -18; }
            }
            @keyframes staircaseShift {
              0%, 35%, 100% { transform: rotate(0deg); }
              50%, 75% { transform: rotate(8deg); }
            }
          `}</style>
        </defs>

        {/* ── VECTOR RUST SPLATTERS & TEA STAINS IN MAP ── */}
        <g id="map-rust-splatters" className="pointer-events-none select-none" filter="url(#rustStainFilter)">
          {/* Far Left Side Splatters */}
          <path d="M 70 150 C 50 130 35 140 30 160 C 25 180 45 195 60 185 C 75 175 80 165 70 150 Z" fill="var(--rust)" opacity="0.35" />
          <path d="M 25 170 L 29 173 L 23 175 Z" fill="var(--rust)" opacity="0.30" />
          <path d="M 85 185 L 89 188 L 84 189 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 40 195 L 43 198 L 38 199 Z" fill="var(--rust)" opacity="0.25" />

          <path d="M 90 700 C 70 680 50 690 45 710 C 40 730 60 745 75 735 C 90 725 95 715 90 700 Z" fill="var(--parchment-dark)" opacity="0.35" />
          <path d="M 40 720 L 44 723 L 38 725 Z" fill="var(--parchment-dark)" opacity="0.30" />
          <path d="M 105 735 L 109 738 L 104 739 Z" fill="var(--parchment-dark)" opacity="0.28" />

          {/* Far Right Side Splatters */}
          <path d="M 1520 400 C 1500 380 1480 390 1475 410 C 1470 430 1490 445 1505 435 C 1520 425 1530 415 1520 400 Z" fill="var(--rust)" opacity="0.35" />
          <path d="M 1465 420 L 1469 423 L 1463 425 Z" fill="var(--rust)" opacity="0.30" />
          <path d="M 1535 435 L 1539 438 L 1534 439 Z" fill="var(--rust)" opacity="0.28" />

          <path d="M 1490 780 C 1470 760 1450 770 1445 790 C 1440 810 1460 825 1475 815 C 1490 805 1500 795 1490 780 Z" fill="var(--parchment-dark)" opacity="0.35" />
          <path d="M 1435 800 L 1439 803 L 1433 805 Z" fill="var(--parchment-dark)" opacity="0.30" />
          <path d="M 1515 815 L 1519 818 L 1514 819 Z" fill="var(--parchment-dark)" opacity="0.28" />

          {/* Top-Left Stains (Library Area) */}
          <path d="M 170 230 C 145 205 120 215 110 240 C 98 265 120 290 145 280 C 170 270 182 255 170 230 Z" fill="var(--rust)" opacity="0.35" />
          <path d="M 105 210 Q 103 214 107 216 Q 109 212 105 210 Z" fill="var(--rust)" opacity="0.36" />
          <path d="M 185 275 Q 182 280 188 282 Q 190 277 185 275 Z" fill="var(--rust)" opacity="0.36" />
          <path d="M 120 290 L 123 293 L 118 294 Z" fill="var(--rust)" opacity="0.28" />

          {/* Bottom-Left Stains (Chamber of Codes Area) */}
          <path d="M 220 830 C 205 815 190 825 185 845 C 180 865 200 878 215 870 C 230 862 238 845 220 830 Z" fill="var(--parchment-dark)" opacity="0.38" />

          {/* Center-Right Large Splatter */}
          <path d="M 1220 580 C 1180 560 1160 595 1150 615 C 1138 638 1170 660 1205 650 C 1240 640 1250 605 1220 580 Z" fill="var(--rust)" opacity="0.32" />

          {/* Faded cup ring stain in the center-left gallery area */}
          <path d="M 520 460 A 62 58 0 1 1 519.9 460" stroke="var(--parchment-dark)" strokeWidth="1.6" opacity="0.28" strokeDasharray="3 12" fill="none" />
          
          {/* Blood-ink Drips (Top-Right Area near Whomping Willow) */}
          <path d="M 1430 180 C 1410 170 1390 180 1385 195 C 1380 210 1400 220 1420 215 C 1440 210 1450 190 1430 180 Z" fill="var(--blood-ink)" opacity="0.35" />
        </g>

        {/* ── BACKGROUND CORRIDORS & CASTLE SHAPES ── */}
        <g stroke="currentColor" strokeWidth="1.2" fill="none" className="opacity-35">
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
        <g className="map-slow-spin opacity-30" stroke="currentColor" fill="none">
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

          {/* The Silent Library outline (top left) */}
          <rect x="150" y="150" width="220" height="150" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Chamber of Codes outline (bottom left) */}
          <rect x="150" y="650" width="220" height="160" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Room of Requirement (Pulsing outline center-top) */}
          <rect x="710" y="240" width="180" height="80" rx="8" strokeWidth="1.4" strokeDasharray="4 4" />

          {/* Great Hall & Floating Candle outline (top center) */}
          <polygon points="650,330 950,330 950,390 650,390" strokeWidth="1.5" strokeDasharray="6 3" />

          {/* Potions Dungeon (bottom center) */}
          <rect x="680" y="780" width="240" height="100" rx="6" strokeWidth="1.2" strokeDasharray="5 3" />

          {/* Astronomy Tower (top right) */}
          <circle cx="1350" cy="180" r="50" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Gryffindor Common Room (middle right) */}
          <rect x="1220" y="320" width="160" height="100" rx="10" strokeWidth="1.2" strokeDasharray="4 2" />

          {/* Whomping Willow Sketch */}
          <path d="M 1350 820 Q 1370 750 1400 750 Q 1380 780 1365 820 M 1350 820 Q 1320 760 1300 790 Q 1325 800 1335 820 M 1350 820 L 1350 870 M 1330 850 L 1370 850" strokeWidth="1.5" />
        </g>

        {/* ── HOGWARTS GROUNDS, TOWERS, COURTYARDS & SECRET PASSAGES ── */}
        <g stroke="currentColor" fill="none" opacity="0.22" className="map-pulse-line">
          {/* Grand Staircase: offset flights to keep the map hand-drawn and irregular */}
          <g className="moving-stair" transform="translate(525 315)">
            <path d="M 0 0 L 115 0 L 115 18 L 20 18 L 20 38 L 128 38" strokeWidth="1.3" />
            <path d="M 8 5 L 108 5 M 25 23 L 108 23 M 28 43 L 120 43" strokeWidth="0.55" strokeDasharray="3 3" />
          </g>

          {/* Headmaster's spiral stair and office */}
          <path d="M 610 205 C 575 205 575 255 610 255 C 645 255 645 205 610 205 Z" strokeDasharray="4 3" />
          <path d="M 600 245 C 625 235 590 222 615 212" strokeWidth="0.8" />
          <circle cx="610" cy="230" r="5" />

          {/* Clock Tower and courtyard */}
          <rect x="1045" y="690" width="90" height="105" rx="4" />
          <circle cx="1090" cy="718" r="18" />
          <line x1="1090" y1="718" x2="1090" y2="707" />
          <line x1="1090" y1="718" x2="1100" y2="723" />
          <path d="M 980 680 L 1030 650 L 1145 650 L 1190 685 L 1160 745 L 1140 805 L 1025 805 L 990 760 Z" strokeDasharray="7 4" />

          {/* Owlery */}
          <circle cx="1190" cy="125" r="35" />
          <circle cx="1190" cy="125" r="26" strokeDasharray="2 4" />
          <path d="M 1172 112 Q 1190 98 1208 112 M 1170 137 Q 1190 151 1210 137" />

          {/* Greenhouses */}
          <path d="M 1115 840 Q 1150 800 1185 840 L 1185 890 L 1115 890 Z" />
          <path d="M 1200 840 Q 1235 800 1270 840 L 1270 890 L 1200 890 Z" />
          <line x1="1150" y1="812" x2="1150" y2="890" />
          <line x1="1235" y1="812" x2="1235" y2="890" />

          {/* Quidditch pitch with hoops */}
          <ellipse cx="460" cy="150" rx="125" ry="58" strokeWidth="1.5" />
          <ellipse cx="460" cy="150" rx="102" ry="42" strokeDasharray="6 5" />
          <path d="M 355 128 V 155 M 365 124 V 155 M 375 128 V 155 M 545 128 V 155 M 555 124 V 155 M 565 128 V 155" />
          <circle cx="355" cy="124" r="7" /><circle cx="365" cy="120" r="7" /><circle cx="375" cy="124" r="7" />
          <circle cx="545" cy="124" r="7" /><circle cx="555" cy="120" r="7" /><circle cx="565" cy="124" r="7" />

          {/* Black Lake shoreline and boathouse */}
          <path d="M 80 350 C 150 320 220 350 275 330 C 335 308 390 335 430 320" strokeWidth="1.5" />
          <path d="M 75 365 C 145 340 215 370 280 348 C 335 330 390 355 445 338" strokeDasharray="3 6" />
          <path d="M 300 340 L 340 325 L 380 340 L 380 370 L 300 370 Z M 315 370 L 315 390 M 365 370 L 365 390" />

          {/* Forbidden Forest edge */}
          <path d="M 80 820 Q 105 755 130 820 Q 155 735 180 820 Q 210 760 235 825 Q 265 745 295 825 Q 325 765 350 830" />
          <path d="M 105 790 V 865 M 180 785 V 870 M 265 790 V 875 M 325 800 V 870" />

          {/* Hagrid's Hut */}
          <path d="M 405 845 L 445 815 L 485 845 V 890 H 405 Z" />
          <path d="M 420 835 L 420 810 L 430 810 L 430 828" />
          <circle cx="465" cy="862" r="7" />

          {/* Wooden bridge / viaduct */}
          <path d="M 940 185 Q 1030 125 1115 175" strokeWidth="2" />
          <path d="M 940 198 Q 1030 138 1115 188" />
          <path d="M 970 175 L 978 190 M 1005 154 L 1012 169 M 1042 145 L 1048 160 M 1080 154 L 1087 169" />

          {/* Secret passages */}
          <path className="secret-passage" d="M 500 650 C 470 610 440 570 405 535 C 365 495 330 465 300 430" stroke="var(--blood-ink)" strokeWidth="1.2" strokeDasharray="5 8" />
          <path className="secret-passage" d="M 1350 820 C 1430 770 1470 705 1515 650" stroke="var(--blood-ink)" strokeWidth="1.1" strokeDasharray="4 7" style={{ animationDelay: "4s" }} />
          <path className="secret-passage" d="M 610 255 C 650 285 675 300 710 300" stroke="var(--blood-ink)" strokeWidth="0.9" strokeDasharray="3 6" style={{ animationDelay: "7s" }} />
        </g>

        {/* Handwritten landmark labels and suspicious annotations */}
        <g fontFamily="var(--font-handwritten), cursive" fill="var(--blood-ink)" opacity="0.62">
          <text x="580" y="300" fontSize="10" transform="rotate(-5 580 300)">Grand Staircase</text>
          <text x="610" y="190" textAnchor="middle" fontSize="9">Headmaster's Office</text>
          <text x="1090" y="812" textAnchor="middle" fontSize="10">Clock Tower Courtyard</text>
          <text x="1190" y="82" textAnchor="middle" fontSize="10">Owlery</text>
          <text x="1190" y="910" textAnchor="middle" fontSize="10">Herbology Greenhouses</text>
          <text x="460" y="228" textAnchor="middle" fontSize="11">Quidditch Pitch</text>
          <text x="180" y="335" fontSize="12">Black Lake</text>
          <text x="340" y="405" textAnchor="middle" fontSize="9">Boathouse</text>
          <text x="210" y="905" textAnchor="middle" fontSize="11">Forbidden Forest</text>
          <text x="445" y="910" textAnchor="middle" fontSize="10">Hagrid's Hut</text>
          <text x="1020" y="125" fontSize="9" transform="rotate(-18 1020 125)">Viaduct & Wooden Bridge</text>

          <text x="535" y="610" fontSize="8" transform="rotate(-22 535 610)">secret passage?</text>
          <text x="1430" y="735" fontSize="8" transform="rotate(-35 1430 735)">to the Shrieking Shack</text>
          <text x="725" y="215" fontSize="8" transform="rotate(7 725 215)">password required</text>
          <text x="985" y="430" fontSize="8" transform="rotate(-8 985 430)">Filch patrols here</text>
          <text x="565" y="350" fontSize="8" transform="rotate(-5 565 350)">staircases change</text>
          <text x="185" y="270" fontSize="8" transform="rotate(4 185 270)">Restricted Section — keep out</text>
        </g>

        {/* ── CASTLE ARCHITECTURE ROOM LABELS ── */}
        <g fill="currentColor" stroke="none" opacity="0.75" className="select-none font-display text-blood-ink">
          <text x="800" y="508" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" opacity="0.7">VP</text>
          <text x="260" y="235" textAnchor="middle" fontSize="12" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">THE SILENT LIBRARY</text>
          <text x="260" y="720" textAnchor="middle" fontSize="12" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">CHAMBER OF CODES</text>
          <text x="260" y="745" textAnchor="middle" fontSize="11" fontFamily="var(--font-handwritten)" fill="var(--ink-faded)">Ved Patil's Sanctum</text>
          
          {/* Authentic Room & Passage Labels */}
          <text x="800" y="285" textAnchor="middle" fontSize="11" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">ROOM OF REQUIREMENT</text>
          <text x="800" y="365" textAnchor="middle" fontSize="13" fontFamily="var(--font-pirata)" fill="var(--leather)">GREAT HALL & FLOATING CANDLES</text>
          <text x="800" y="835" textAnchor="middle" fontSize="12" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">POTIONS DUNGEON</text>
          <text x="1350" y="185" textAnchor="middle" fontSize="11" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">ASTRONOMY TOWER</text>
          <text x="1300" y="375" textAnchor="middle" fontSize="11" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">GRYFFINDOR COMMON ROOM</text>
          <text x="1350" y="730" textAnchor="middle" fontSize="12" fontFamily="var(--font-handwritten)" fill="var(--blood-ink)">Whomping Willow</text>
          <text x="500" y="660" textAnchor="middle" fontSize="10" fontFamily="var(--font-handwritten)" fill="var(--ink-faded)" transform="rotate(-15 500 660)">Passage to Honeydukes (One-Eyed Witch)</text>
        </g>

        {/* ── COMPASS ROSE PRINTED IN THE MAP ── */}
        <g transform="translate(1270, 220)" className="pointer-events-none select-none">
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

          {/* North arrow - rich crimson ink */}
          <polygon points="90,18 83,90 90,83 97,90" fill="var(--blood-ink)" opacity="0.75" />
          {/* South arrow */}
          <polygon points="90,162 83,90 90,97 97,90" fill="var(--ink-faded)" opacity="0.65" />
          {/* East */}
          <polygon points="162,90 90,83 97,90 90,97" fill="var(--ink-faded)" opacity="0.6" />
          {/* West */}
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

        {/* ── DYNAMIC CURVED TEXT OVERLAYS & MARAUDER'S MOTTOES ── */}
        <g fill="currentColor" fontFamily="var(--font-pirata), serif" fontSize="9" letterSpacing="2.5" className="opacity-55 select-none font-display">
          <text><textPath href="#textPath-top-motto" startOffset="50%" textAnchor="middle">DRACO DORMIENS NUNQUAM TITILLANDUS ✦ NEVER TICKLE A SLEEPING DRAGON</textPath></text>
          <text><textPath href="#textPath-arc-outer" startOffset="50%" textAnchor="middle">✦ INIIMICUS INTER CATASTROPHE ET ARCANUM ✦</textPath></text>
          <text><textPath href="#textPath-arc-inner" startOffset="50%" textAnchor="middle">MESSERS MOONY, WORMTAIL, PADFOOT & PRONGS</textPath></text>
          <text fontSize="7" letterSpacing="1.5"><textPath href="#textPath-round" startOffset="25%">✦ SALVETE FLORENTIA CASTLE MAP ✦ HOGWARTS TURRIS MAGNUS</textPath></text>
          <text fontSize="10" letterSpacing="3"><textPath href="#textPath-bottom-arc" startOffset="50%" textAnchor="middle">I SOLEMNLY SWEAR THAT I AM UP TO NO GOOD ✦ MISCHIEF MANAGED</textPath></text>
        </g>

        {/* ── MOVING FOOTPRINTS ALONG CORRIDORS ── */}

        {/* Path 1: Walking from bottom-left diagonal to center-left (Up-Right at 45°) */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="244" y="806" transform="rotate(45 244 806)" className="footprint-step" style={{ animationDelay: "0.0s" }} />
          <use href="#foot-right" x="268" y="782" transform="rotate(45 268 782)" className="footprint-step" style={{ animationDelay: "0.4s" }} />
          <use href="#foot-left" x="284" y="766" transform="rotate(45 284 766)" className="footprint-step" style={{ animationDelay: "0.8s" }} />
          <use href="#foot-right" x="308" y="742" transform="rotate(45 308 742)" className="footprint-step" style={{ animationDelay: "1.2s" }} />
          <use href="#foot-left" x="324" y="726" transform="rotate(45 324 726)" className="footprint-step" style={{ animationDelay: "1.6s" }} />
          <use href="#foot-right" x="348" y="702" transform="rotate(45 348 702)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          <use href="#foot-left" x="364" y="686" transform="rotate(45 364 686)" className="footprint-step" style={{ animationDelay: "2.4s" }} />
          <use href="#foot-right" x="388" y="662" transform="rotate(45 388 662)" className="footprint-step" style={{ animationDelay: "2.8s" }} />
          <use href="#foot-left" x="404" y="646" transform="rotate(45 404 646)" className="footprint-step" style={{ animationDelay: "3.2s" }} />
          <use href="#foot-right" x="428" y="622" transform="rotate(45 428 622)" className="footprint-step" style={{ animationDelay: "3.6s" }} />
          <use href="#foot-left" x="444" y="606" transform="rotate(45 444 606)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          <use href="#foot-right" x="468" y="582" transform="rotate(45 468 582)" className="footprint-step" style={{ animationDelay: "4.4s" }} />
        </g>

        {/* Path 2: Walking around the concentric circular hall (clockwise curve, facing forward along tangent) */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="1087" y="525" transform="rotate(185 1087 525)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          <use href="#foot-right" x="1101" y="581" transform="rotate(195 1101 581)" className="footprint-step" style={{ animationDelay: "2.4s" }} />
          <use href="#foot-left" x="1061" y="622" transform="rotate(205 1061 622)" className="footprint-step" style={{ animationDelay: "2.8s" }} />
          <use href="#foot-right" x="1055" y="679" transform="rotate(215 1055 679)" className="footprint-step" style={{ animationDelay: "3.2s" }} />
          <use href="#foot-left" x="1003" y="703" transform="rotate(225 1003 703)" className="footprint-step" style={{ animationDelay: "3.6s" }} />
          <use href="#foot-right" x="979" y="755" transform="rotate(235 979 755)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          <use href="#foot-left" x="922" y="761" transform="rotate(245 922 761)" className="footprint-step" style={{ animationDelay: "4.4s" }} />
          <use href="#foot-right" x="881" y="801" transform="rotate(255 881 801)" className="footprint-step" style={{ animationDelay: "4.8s" }} />
          <use href="#foot-left" x="825" y="787" transform="rotate(265 825 787)" className="footprint-step" style={{ animationDelay: "5.2s" }} />
        </g>

        {/* Path 3: Walking along the top right horizontal corridor going left (facing Left at -90°) */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="1350" y="192" transform="rotate(-90 1350 192)" className="footprint-step" style={{ animationDelay: "4.0s" }} />
          <use href="#foot-right" x="1320" y="208" transform="rotate(-90 1320 208)" className="footprint-step" style={{ animationDelay: "4.3s" }} />
          <use href="#foot-left" x="1290" y="192" transform="rotate(-90 1290 192)" className="footprint-step" style={{ animationDelay: "4.6s" }} />
          <use href="#foot-right" x="1260" y="208" transform="rotate(-90 1260 208)" className="footprint-step" style={{ animationDelay: "4.9s" }} />
          <use href="#foot-left" x="1230" y="192" transform="rotate(-90 1230 192)" className="footprint-step" style={{ animationDelay: "5.2s" }} />
          <use href="#foot-right" x="1200" y="208" transform="rotate(-90 1200 208)" className="footprint-step" style={{ animationDelay: "5.5s" }} />
          <use href="#foot-left" x="1170" y="192" transform="rotate(-90 1170 192)" className="footprint-step" style={{ animationDelay: "5.8s" }} />
          <use href="#foot-right" x="1140" y="208" transform="rotate(-90 1140 208)" className="footprint-step" style={{ animationDelay: "6.1s" }} />
          <use href="#foot-left" x="1110" y="192" transform="rotate(-90 1110 192)" className="footprint-step" style={{ animationDelay: "6.4s" }} />
          <use href="#foot-right" x="1080" y="208" transform="rotate(-90 1080 208)" className="footprint-step" style={{ animationDelay: "6.7s" }} />
        </g>

        {/* ── PATH 4: HARRY & HERMIONE IN THE SILENT LIBRARY ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="220" y="170" transform="rotate(180 220 170)" className="footprint-step" style={{ animationDelay: "1.0s" }} />
          <use href="#foot-right" x="250" y="170" transform="rotate(180 250 170)" className="footprint-step" style={{ animationDelay: "1.0s" }} />
          <use href="#foot-left" x="220" y="195" transform="rotate(180 220 195)" className="footprint-step" style={{ animationDelay: "1.5s" }} />
          <use href="#foot-right" x="250" y="195" transform="rotate(180 250 195)" className="footprint-step" style={{ animationDelay: "1.5s" }} />
        </g>

        {/* ── PATH 5: FRED & GEORGE WEASLEY IN ONE-EYED WITCH PASSAGE (Facing Up-Right at 75°) ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="420" y="670" transform="rotate(75 420 670)" className="footprint-step" style={{ animationDelay: "1.8s" }} />
          <use href="#foot-right" x="440" y="665" transform="rotate(75 440 665)" className="footprint-step" style={{ animationDelay: "2.1s" }} />
          <use href="#foot-left" x="460" y="660" transform="rotate(75 460 660)" className="footprint-step" style={{ animationDelay: "2.4s" }} />
          <use href="#foot-right" x="480" y="655" transform="rotate(75 480 655)" className="footprint-step" style={{ animationDelay: "2.7s" }} />
        </g>

        {/* ── PATH 6: ARGUS FILCH & MRS. NORRIS (CAT PAW PRINTS) IN POTIONS DUNGEON (Facing Right at 90°) ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="720" y="810" transform="rotate(90 720 810)" className="footprint-step" style={{ animationDelay: "3.2s" }} />
          <use href="#foot-right" x="750" y="810" transform="rotate(90 750 810)" className="footprint-step" style={{ animationDelay: "3.6s" }} />
          <use href="#cat-paw" x="735" y="830" transform="rotate(90 735 830)" className="paw-step" style={{ animationDelay: "3.4s" }} />
          <use href="#cat-paw" x="765" y="830" transform="rotate(90 765 830)" className="paw-step" style={{ animationDelay: "3.8s" }} />
        </g>

        {/* ── PATH 7: PADFOOT (SIRIUS BLACK) PAW PRINTS (Facing Down at 180°) ── */}
        <g className="text-blood-ink">
          <use href="#paw-print" x="650" y="440" transform="rotate(180 650 440)" className="paw-step" style={{ animationDelay: "3.0s" }} />
          <use href="#paw-print" x="650" y="480" transform="rotate(180 650 480)" className="paw-step" style={{ animationDelay: "3.5s" }} />
          <use href="#paw-print" x="650" y="520" transform="rotate(180 650 520)" className="paw-step" style={{ animationDelay: "4.0s" }} />
          <use href="#paw-print" x="650" y="560" transform="rotate(180 650 560)" className="paw-step" style={{ animationDelay: "4.5s" }} />
        </g>

        {/* ── PATH 8: VED PATIL PACING IN CHAMBER OF CODES (Facing Right at 90°) ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="170" y="700" transform="rotate(90 170 700)" className="footprint-step" style={{ animationDelay: "5.0s" }} />
          <use href="#foot-right" x="195" y="700" transform="rotate(90 195 700)" className="footprint-step" style={{ animationDelay: "5.4s" }} />
          <use href="#foot-left" x="220" y="700" transform="rotate(90 220 700)" className="footprint-step" style={{ animationDelay: "5.8s" }} />
          <use href="#foot-right" x="245" y="700" transform="rotate(90 245 700)" className="footprint-step" style={{ animationDelay: "6.2s" }} />
        </g>

        {/* ── EASTER EGG: PEEVES THE POLTERGEIST (FLOATING & SPINNING) ── */}
        <g className="peeves-anim text-blood-ink opacity-85" transform="translate(500 320)">
          <path d="M 0 8 C -8 1 -7 -12 0 -17 C 7 -12 8 1 0 8 Z M -5 4 L -10 11 M 0 7 L 0 14 M 5 4 L 10 11"
                fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="-2.5" cy="-8" r="0.8" fill="currentColor" />
          <circle cx="2.5" cy="-8" r="0.8" fill="currentColor" />
          <path d="M -3 -3 Q 0 0 3 -3" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <text x="14" y="0" fontSize="12" fontFamily="var(--font-handwritten)" fontWeight="bold">Peeves</text>
        </g>

        {/* ── EASTER EGG: GOLDEN SNITCH (CATCHABLE / HOVER TO STOP) ── */}
        <g className="snitch-anim pointer-events-auto cursor-pointer select-none">
          <use href="#snitch" x="1380" y="140" />
          <text 
            x="1380" 
            y="118" 
            textAnchor="middle" 
            fontSize="10" 
            fontFamily="var(--font-pirata), serif" 
            fill="var(--blood-ink)"
            fontWeight="bold"
            letterSpacing="1.2"
            style={{ filter: "drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))" }}
          >
            Golden Snitch ✦
          </text>
        </g>

        {/* ── MOVING CHARACTER NAME TAGS ── */}
        <g fill="currentColor" fontFamily="var(--font-handwritten), cursive" fontSize="12" fontWeight="bold" className="text-blood-ink opacity-85">
          {/* Albus Dumbledore - placed stationary near the Hogwarts crest */}
          <g className="map-pulse-line">
            <text x="800" y="400" textAnchor="middle" fontSize="11" opacity="0.8">Albus Dumbledore</text>
          </g>

          {/* Harry Potter - walks/paces in circular corridor along the curve */}
          <g className="footprint-step" style={{ animationDelay: "3.6s" }}>
            <text x="1005" y="722" transform="rotate(45 1005 722)" fontSize="10">Harry Potter</text>
          </g>

          {/* Severus Snape - pacing along the North Gate corridor */}
          <g className="footprint-step" style={{ animationDelay: "5.0s" }}>
            <text x="1230" y="185" transform="rotate(-90 1230 185)" fontSize="10">Severus Snape</text>
          </g>

          {/* Fred & George Weasley in passage to Honeydukes */}
          <g className="footprint-step" style={{ animationDelay: "2.2s" }}>
            <text x="440" y="650" transform="rotate(-15 440 650)" fontSize="10">Fred & George W.</text>
          </g>

          {/* Argus Filch & Mrs. Norris in Potions Dungeon */}
          <g className="footprint-step" style={{ animationDelay: "3.5s" }}>
            <text x="750" y="795" fontSize="10">Filch & Mrs. Norris 🐾</text>
          </g>

          {/* Moony & Prongs near Astronomy Tower */}
          <g className="footprint-step" style={{ animationDelay: "4.5s" }}>
            <text x="1310" y="160" fontSize="10">Moony & Prongs</text>
          </g>

          {/* Harry & Hermione tags inside the Silent Library */}
          <g className="footprint-step" style={{ animationDelay: "2.0s" }}>
            <text x="210" y="215" fontSize="10">Harry P.</text>
            <text x="270" y="215" fontSize="10">Hermione G.</text>
          </g>

          {/* Padfoot (Sirius) tag in center corridor */}
          <g className="paw-step" style={{ animationDelay: "3.8s" }}>
            <text x="600" y="505" fontSize="10">Padfoot 🐾</text>
          </g>

          {/* Ved Patil (Coding) tag inside Chamber of Codes */}
          <g className="footprint-step" style={{ animationDelay: "5.8s" }}>
            <text x="260" y="775" textAnchor="middle" fontSize="11">Ved's Patronus</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
