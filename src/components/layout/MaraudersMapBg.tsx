import { Ghost } from "lucide-react";

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

          {/* Golden Snitch symbol - thicker and golder */}
          <g id="snitch" transform="scale(1.6)">
            {/* Body */}
            <circle cx="0" cy="0" r="4.2" fill="#d4af37" stroke="#76532e" strokeWidth="1" />
            {/* Wings */}
            <path 
              d="M -4 0 C -13 -8 -19 -4 -26 -1 C -19 2 -10 -1 -4 0 Z M 4 0 C 13 -8 19 -4 26 -1 C 19 2 10 -1 4 0 Z" 
              fill="#e3cca1" 
              stroke="#c5a059" 
              strokeWidth="1.8" 
              strokeLinejoin="round"
            />
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
              animation: snitchFlutter 10s infinite ease-in-out;
            }
            
            @keyframes walkStep {
              0% { opacity: 0; }
              /* Fade in at step start - highly visible */
              5% { opacity: 0.90; filter: drop-shadow(0 0 1.5px currentColor); }
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

            @keyframes peevesFloat {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.2; }
              25% { transform: translate(-100px, 80px) rotate(15deg); opacity: 0.65; }
              50% { transform: translate(120px, -50px) rotate(-15deg); opacity: 0.3; }
              75% { transform: translate(-40px, -100px) rotate(10deg); opacity: 0.55; }
            }

            @keyframes snitchFlutter {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
              30% { transform: translate(160px, -110px) rotate(120deg) scale(0.9); opacity: 0.8; }
              65% { transform: translate(-110px, 70px) rotate(-80deg) scale(1.15); opacity: 0.5; }
            }
          `}</style>
        </defs>

        {/* ── VECTOR RUST SPLATTERS & TEA STAINS IN MAP ── */}
        <g id="map-rust-splatters" className="pointer-events-none select-none" filter="url(#rustStainFilter)">
          {/* Far Left Side Splatters (New) */}
          <path d="M 70 150 C 50 130 35 140 30 160 C 25 180 45 195 60 185 C 75 175 80 165 70 150 Z" fill="var(--rust)" opacity="0.35" />
          <path d="M 25 170 L 29 173 L 23 175 Z" fill="var(--rust)" opacity="0.30" />
          <path d="M 85 185 L 89 188 L 84 189 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 40 195 L 43 198 L 38 199 Z" fill="var(--rust)" opacity="0.25" />

          <path d="M 90 700 C 70 680 50 690 45 710 C 40 730 60 745 75 735 C 90 725 95 715 90 700 Z" fill="var(--parchment-dark)" opacity="0.35" />
          <path d="M 40 720 L 44 723 L 38 725 Z" fill="var(--parchment-dark)" opacity="0.30" />
          <path d="M 105 735 L 109 738 L 104 739 Z" fill="var(--parchment-dark)" opacity="0.28" />

          {/* Far Right Side Splatters (New) */}
          <path d="M 1520 400 C 1500 380 1480 390 1475 410 C 1470 430 1490 445 1505 435 C 1520 425 1530 415 1520 400 Z" fill="var(--rust)" opacity="0.35" />
          <path d="M 1465 420 L 1469 423 L 1463 425 Z" fill="var(--rust)" opacity="0.30" />
          <path d="M 1535 435 L 1539 438 L 1534 439 Z" fill="var(--rust)" opacity="0.28" />

          <path d="M 1490 780 C 1470 760 1450 770 1445 790 C 1440 810 1460 825 1475 815 C 1490 805 1500 795 1490 780 Z" fill="var(--parchment-dark)" opacity="0.35" />
          <path d="M 1435 800 L 1439 803 L 1433 805 Z" fill="var(--parchment-dark)" opacity="0.30" />
          <path d="M 1515 815 L 1519 818 L 1514 819 Z" fill="var(--parchment-dark)" opacity="0.28" />

          {/* Top-Left Stains (Library Area) */}
          <path d="M 170 230 C 145 205 120 215 110 240 C 98 265 120 290 145 280 C 170 270 182 255 170 230 Z" fill="var(--rust)" opacity="0.35" />
          {/* Jagged droplets nearby */}
          <path d="M 105 210 Q 103 214 107 216 Q 109 212 105 210 Z" fill="var(--rust)" opacity="0.36" />
          <path d="M 185 275 Q 182 280 188 282 Q 190 277 185 275 Z" fill="var(--rust)" opacity="0.36" />
          <path d="M 120 290 L 123 293 L 118 294 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 95 245 L 98 247 L 94 249 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 160 305 L 164 309 L 159 310 Z" fill="var(--rust)" opacity="0.28" />

          {/* Bottom-Left Stains (Chamber of Codes Area) */}
          <path d="M 220 830 C 205 815 190 825 185 845 C 180 865 200 878 215 870 C 230 862 238 845 220 830 Z" fill="var(--parchment-dark)" opacity="0.38" />
          {/* Jagged droplets nearby */}
          <path d="M 180 880 L 184 883 L 178 885 Z" fill="var(--parchment-dark)" opacity="0.32" />
          <path d="M 238 890 Q 236 894 241 896 Q 243 891 238 890 Z" fill="var(--parchment-dark)" opacity="0.28" />
          <path d="M 195 895 L 198 897 L 194 899 Z" fill="var(--parchment-dark)" opacity="0.28" />
          <path d="M 245 825 L 248 827 L 243 829 Z" fill="var(--parchment-dark)" opacity="0.28" />

          {/* Center-Right Large Splatter */}
          <path d="M 1220 580 C 1180 560 1160 595 1150 615 C 1138 638 1170 660 1205 650 C 1240 640 1250 605 1220 580 Z" fill="var(--rust)" opacity="0.32" />
          {/* Jagged droplets nearby */}
          <path d="M 1135 645 L 1139 648 L 1133 650 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 1245 550 Q 1242 555 1249 557 Q 1251 552 1245 550 Z" fill="var(--rust)" opacity="0.28" />
          <path d="M 1190 665 L 1193 668 L 1188 669 Z" fill="var(--rust)" opacity="0.25" />
          <path d="M 1230 635 L 1234 639 L 1229 640 Z" fill="var(--rust)" opacity="0.25" />

          {/* Faded cup ring stain in the center-left gallery area */}
          <path d="M 520 460 A 62 58 0 1 1 519.9 460" stroke="var(--parchment-dark)" strokeWidth="1.6" opacity="0.28" strokeDasharray="3 12" fill="none" />
          
          {/* Blood-ink Drips (Top-Right Area near Whomping Willow) */}
          <path d="M 1430 180 C 1410 170 1390 180 1385 195 C 1380 210 1400 220 1420 215 C 1440 210 1450 190 1430 180 Z" fill="var(--blood-ink)" opacity="0.35" />
          {/* Jagged droplets nearby */}
          <path d="M 1370 210 L 1374 213 L 1368 215 Z" fill="var(--blood-ink)" opacity="0.28" />
          <path d="M 1450 225 Q 1447 230 1454 232 Q 1456 227 1450 225 Z" fill="var(--blood-ink)" opacity="0.28" />
          <path d="M 1400 235 L 1403 238 L 1398 239 Z" fill="var(--blood-ink)" opacity="0.25" />
          
          {/* Additional new middle-left splatter block */}
          <path d="M 450 680 C 430 660 410 670 405 685 C 400 700 415 710 430 705 C 445 700 460 690 450 680 Z" fill="var(--rust)" opacity="0.32" />
          <path d="M 390 690 L 394 693 L 388 695 Z" fill="var(--rust)" opacity="0.25" />
          <path d="M 460 700 L 463 703 L 458 704 Z" fill="var(--rust)" opacity="0.25" />
          
          {/* Additional new middle-right splatter block */}
          <path d="M 1250 280 C 1230 260 1210 270 1205 285 C 1200 300 1215 310 1230 305 C 1245 300 1260 290 1250 280 Z" fill="var(--parchment-dark)" opacity="0.32" />
          <path d="M 1190 290 L 1194 293 L 1188 295 Z" fill="var(--parchment-dark)" opacity="0.25" />
          <path d="M 1265 305 L 1268 308 L 1263 309 Z" fill="var(--parchment-dark)" opacity="0.25" />
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

          {/* Chamber of Codes outline (bottom left - Ved's Secret Lab) */}
          <rect x="150" y="650" width="220" height="160" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Whomping Willow Sketch (bottom right) */}
          <path d="M 1350 820 Q 1370 750 1400 750 Q 1380 780 1365 820 M 1350 820 Q 1320 760 1300 790 Q 1325 800 1335 820 M 1350 820 L 1350 870 M 1330 850 L 1370 850" strokeWidth="1.5" />
        </g>

        {/* ── CASTLE ARCHITECTURE ROOM LABELS (DARKER) ── */}
        <g fill="currentColor" stroke="none" opacity="0.65" className="select-none font-display text-blood-ink">
          <text x="800" y="508" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" opacity="0.7">VP</text>
          <text x="260" y="235" textAnchor="middle" fontSize="12" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">THE SILENT LIBRARY</text>
          <text x="260" y="720" textAnchor="middle" fontSize="12" fontFamily="var(--font-pirata)" fill="var(--blood-ink)">CHAMBER OF CODES</text>
          <text x="260" y="745" textAnchor="middle" fontSize="11" fontFamily="var(--font-handwritten)" fill="var(--ink-faded)">Ved Patil's Sanctum</text>
          <text x="1350" y="730" textAnchor="middle" fontSize="12" fontFamily="var(--font-handwritten)" fill="var(--blood-ink)">Whomping Willow</text>
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
        <g fill="currentColor" fontFamily="var(--font-pirata), serif" fontSize="9" letterSpacing="2.5" className="opacity-45 select-none font-display">
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

        {/* ── PATH 4: HARRY & HERMIONE IN THE SILENT LIBRARY ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="220" y="170" transform="rotate(180 220 170)" className="footprint-step" style={{ animationDelay: "1.0s" }} />
          <use href="#foot-right" x="250" y="170" transform="rotate(180 250 170)" className="footprint-step" style={{ animationDelay: "1.0s" }} />
          <use href="#foot-left" x="220" y="195" transform="rotate(180 220 195)" className="footprint-step" style={{ animationDelay: "1.5s" }} />
          <use href="#foot-right" x="250" y="195" transform="rotate(180 250 195)" className="footprint-step" style={{ animationDelay: "1.5s" }} />
          <use href="#foot-left" x="220" y="220" transform="rotate(180 220 220)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          <use href="#foot-right" x="250" y="220" transform="rotate(180 250 220)" className="footprint-step" style={{ animationDelay: "2.0s" }} />
          <use href="#foot-left" x="220" y="245" transform="rotate(180 220 245)" className="footprint-step" style={{ animationDelay: "2.5s" }} />
          <use href="#foot-right" x="250" y="245" transform="rotate(180 250 245)" className="footprint-step" style={{ animationDelay: "2.5s" }} />
        </g>

        {/* ── PATH 5: PADFOOT (SIRIUS BLACK) PAW PRINTS ── */}
        <g className="text-blood-ink">
          <use href="#paw-print" x="650" y="440" transform="rotate(180 650 440)" className="paw-step" style={{ animationDelay: "3.0s" }} />
          <use href="#paw-print" x="650" y="480" transform="rotate(180 650 480)" className="paw-step" style={{ animationDelay: "3.5s" }} />
          <use href="#paw-print" x="650" y="520" transform="rotate(180 650 520)" className="paw-step" style={{ animationDelay: "4.0s" }} />
          <use href="#paw-print" x="650" y="560" transform="rotate(180 650 560)" className="paw-step" style={{ animationDelay: "4.5s" }} />
        </g>

        {/* ── PATH 6: VED PATIL PACING IN CHAMBER OF CODES ── */}
        <g className="text-blood-ink">
          <use href="#foot-left" x="170" y="700" transform="rotate(90 170 700)" className="footprint-step" style={{ animationDelay: "5.0s" }} />
          <use href="#foot-right" x="195" y="700" transform="rotate(90 195 700)" className="footprint-step" style={{ animationDelay: "5.4s" }} />
          <use href="#foot-left" x="220" y="700" transform="rotate(90 220 700)" className="footprint-step" style={{ animationDelay: "5.8s" }} />
          <use href="#foot-right" x="245" y="700" transform="rotate(90 245 700)" className="footprint-step" style={{ animationDelay: "6.2s" }} />
        </g>

        {/* ── EASTER EGG: PEEVES THE POLTERGEIST (FLOATING & SPINNING) ── */}
        <g className="peeves-anim text-blood-ink opacity-85">
          <text x="500" y="320" fontSize="12" fontFamily="var(--font-handwritten)" fontWeight="bold">Peeves <Ghost /></text>
        </g>

        {/* ── EASTER EGG: GOLDEN SNITCH (FLUTTERING AROUND) ── */}
        <g className="snitch-anim text-gold opacity-90">
          <use href="#snitch" x="800" y="340" />
          <text x="800" y="330" textAnchor="middle" fontSize="8" fontFamily="var(--font-handwritten)">Golden Snitch</text>
        </g>

        {/* ── MOVING CHARACTER NAME TAGS ── */}
        <g fill="currentColor" fontFamily="var(--font-handwritten), cursive" fontSize="12" fontWeight="bold" className="text-blood-ink opacity-85">
          {/* Albus Dumbledore - placed stationary near the Hogwarts crest */}
          <g className="map-pulse-line">
            <text x="800" y="400" textAnchor="middle" fontSize="11" opacity="0.8">Albus Dumbledore</text>
          </g>

          {/* Harry Potter - walks/paces in circular corridor (delayed entry sequence) */}
          <g className="footprint-step" style={{ animationDelay: "2.4s" }}>
            <text x="1050" y="555" transform="rotate(15 1050 555)" fontSize="10">Harry Potter</text>
          </g>

          {/* Severus Snape - pacing along the North Gate corridor */}
          <g className="footprint-step" style={{ animationDelay: "5.0s" }}>
            <text x="1230" y="185" transform="rotate(-90 1230 185)" fontSize="10">Severus Snape</text>
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
