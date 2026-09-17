import React from 'react';

interface MapVectorProps {
  activeProject?: string;
  zoomLevel?: number; // 0 to 1
  opacityLayers?: {
    baseGrid?: number;
    coastline?: number;
    roads?: number;
    neighbourhoods?: number;
    andheriFocus?: number;
    projectPin?: number;
  };
}

export const MapVector: React.FC<MapVectorProps> = ({
  activeProject = 'jamming-studio',
  opacityLayers = {
    baseGrid: 1,
    coastline: 1,
    roads: 1,
    neighbourhoods: 1,
    andheriFocus: 1,
    projectPin: 1,
  }
}) => {
  return (
      <defs>
        {/* Subtle grid pattern */}
        <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0ded8" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="0.8" fill="#aaa8a0" />
        </pattern>

        <pattern id="microGrid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f0eee8" strokeWidth="0.25" />
        </pattern>

        {/* Diagonal architectural zoning hatch */}
        <pattern id="zoningHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#dcd9d0" strokeWidth="0.6" />
        </pattern>

        {/* Radial spotlight for Andheri West */}
        <radialGradient id="andheriGlow" cx="39.2%" cy="32.0%" r="20%" fx="39.2%" fy="32.0%">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#111111" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#111111" stopOpacity="0" />
        </radialGradient>

        {/* Focus pulse effect */}
        <filter id="subtleBlur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* LAYER 0: CARTOGRAPHIC BASE GRIDS & SPATIAL CALIPERS */}
      {/* ========================================================================= */}
      <g id="layer-grids" opacity={opacityLayers.baseGrid ?? 1}>
        <rect width="1000" height="1000" fill="#fbfaf7" />
        <rect width="1000" height="1000" fill="url(#microGrid)" />
        <rect width="1000" height="1000" fill="url(#archGrid)" />

        {/* Global coordinate axes and tick marks */}
        <g stroke="#9c988e" strokeWidth="0.5" opacity="0.6">
          {/* Latitude lines */}
          <line x1="40" y1="100" x2="960" y2="100" strokeDasharray="2 6" />
          <line x1="40" y1="250" x2="960" y2="250" strokeDasharray="2 6" />
          <line x1="40" y1="400" x2="960" y2="400" strokeDasharray="2 6" />
          <line x1="40" y1="550" x2="960" y2="550" strokeDasharray="2 6" />
          <line x1="40" y1="700" x2="960" y2="700" strokeDasharray="2 6" />
          <line x1="40" y1="850" x2="960" y2="850" strokeDasharray="2 6" />

          {/* Longitude lines */}
          <line x1="150" y1="40" x2="150" y2="960" strokeDasharray="2 6" />
          <line x1="300" y1="40" x2="300" y2="960" strokeDasharray="2 6" />
          <line x1="450" y1="40" x2="450" y2="960" strokeDasharray="2 6" />
          <line x1="600" y1="40" x2="600" y2="960" strokeDasharray="2 6" />
          <line x1="750" y1="40" x2="750" y2="960" strokeDasharray="2 6" />
          <line x1="900" y1="40" x2="900" y2="960" strokeDasharray="2 6" />

          {/* Spatial Crosses (+) at intersections */}
          {[150, 300, 450, 600, 750, 900].map(x => 
            [100, 250, 400, 550, 700, 850].map(y => (
              <g key={`${x}-${y}`}>
                <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke="#888478" strokeWidth="0.8" />
                <line x1={x} y1={y - 3} x2={x} y2={y + 3} stroke="#888478" strokeWidth="0.8" />
              </g>
            ))
          )}
        </g>

        {/* Global coordinate labels */}
        <g fill="#9c988e" className="font-mono-tech" fontSize="6.5" letterSpacing="0.08em">
          <text x="50" y="96">19°17'40&quot;N</text>
          <text x="50" y="246">19°11'15&quot;N</text>
          <text x="50" y="396">19°05'30&quot;N</text>
          <text x="50" y="546">18°59'45&quot;N</text>
          <text x="50" y="696">18°54'00&quot;N</text>
          <text x="50" y="846">18°48'15&quot;N</text>

          <text x="145" y="975" textAnchor="middle">72°46'30&quot;E</text>
          <text x="295" y="975" textAnchor="middle">72°49'45&quot;E</text>
          <text x="445" y="975" textAnchor="middle">72°53'00&quot;E</text>
          <text x="595" y="975" textAnchor="middle">72°56'15&quot;E</text>
          <text x="745" y="975" textAnchor="middle">72°59'30&quot;E</text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 1: MUMBAI PENINSULA COASTLINE & WATER BODIES */}
      {/* ========================================================================= */}
      <g id="layer-coastline" opacity={opacityLayers.coastline ?? 1}>
        {/* Arabian Sea Water Tint */}
        <path
          d="M 0,0 L 320,0 Q 300,100 290,160 Q 280,220 310,270 Q 350,310 330,370 Q 310,430 380,480 Q 420,510 400,560 Q 370,610 420,680 Q 440,730 460,820 Q 470,890 450,940 Q 430,970 410,1000 L 0,1000 Z"
          fill="#f4f2eb"
          opacity="0.8"
        />

        {/* Coastal Bathymetry / Depth Ripples (ultra-fine monochrome lines) */}
        <path
          d="M 0,10 Q 280,110 270,180 Q 260,240 290,290 Q 330,330 310,390 Q 290,450 360,500 Q 400,530 380,580 Q 350,630 400,700 Q 420,750 440,840 Q 450,910 430,960 L 0,990"
          fill="none"
          stroke="#d8d4c8"
          strokeWidth="0.4"
          strokeDasharray="4 2"
        />
        <path
          d="M 0,25 Q 260,130 250,200 Q 240,260 270,310 Q 310,350 290,410 Q 270,470 340,520 Q 380,550 360,600 Q 330,650 380,720 Q 400,770 420,860 L 0,980"
          fill="none"
          stroke="#d8d4c8"
          strokeWidth="0.3"
        />

        {/* Detailed High-Resolution Coastline Path of Mumbai Island & Salsette */}
        <path
          d={`
            M 360,40
            C 340,90 320,130 305,180
            C 290,230 300,260 325,290
            C 345,315 365,330 345,365
            C 325,400 330,440 375,475
            C 410,500 425,530 410,565
            C 390,610 395,640 430,690
            C 455,730 465,780 475,835
            C 485,885 470,925 455,950
            C 445,968 458,985 475,980
            C 490,970 500,940 495,900
            C 490,840 520,790 535,740
            C 550,690 540,650 565,610
            C 590,570 630,550 670,510
            C 720,460 760,400 780,330
            C 800,260 790,190 770,120
            C 750,70 700,50 640,40
            Z
          `}
          fill="#ffffff"
          stroke="#222222"
          strokeWidth="1.2"
        />

        {/* Mahim Bay & Mithi River Inlet */}
        <path
          d="M 405,565 C 430,580 460,575 480,560 C 510,540 535,510 550,470 C 560,430 550,390 570,360"
          fill="none"
          stroke="#555550"
          strokeWidth="0.8"
        />

        {/* Versova Creek & Malad Estuary (Adjacent to Jamming Studio in Andheri West) */}
        <path
          d="M 325,290 C 340,285 365,290 380,305 C 395,320 405,310 415,295 C 425,280 410,260 420,240"
          fill="none"
          stroke="#444440"
          strokeWidth="0.9"
        />

        {/* Bandra-Worli Sea Link (Iconic cable-stayed curve across Mahim Bay) */}
        <g id="sea-link" opacity="0.9">
          <path
            d="M 410,565 C 420,620 425,650 430,690"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.4"
          />
          {/* Cable stay pylons */}
          <line x1="418" y1="625" x2="426" y2="635" stroke="#111111" strokeWidth="2.5" />
          <line x1="422" y1="655" x2="430" y2="665" stroke="#111111" strokeWidth="2.5" />
          <text x="438" y="650" fill="#666660" fontSize="5" className="font-mono-tech">SEA LINK</text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 2: ARTERIAL HIGHWAYS, ROADS & RAIL CORRIDORS */}
      {/* ========================================================================= */}
      <g id="layer-roads" opacity={opacityLayers.roads ?? 1}>
        {/* Western Express Highway (Primary North-South Spine) */}
        <path
          d="M 460,40 L 450,150 L 440,260 L 435,360 L 445,460 L 460,540 L 475,640 L 485,760 L 480,870"
          fill="none"
          stroke="#111111"
          strokeWidth="1.6"
        />

        {/* Eastern Express Highway */}
        <path
          d="M 640,40 L 630,160 L 615,280 L 590,390 L 570,490 L 545,600 L 525,720 L 500,850"
          fill="none"
          stroke="#555550"
          strokeWidth="1.2"
        />

        {/* S.V. Road (Swami Vivekananda Arterial) */}
        <path
          d="M 420,120 L 412,230 L 405,330 L 415,440 L 428,520 L 440,590"
          fill="none"
          stroke="#666660"
          strokeWidth="0.9"
        />

        {/* New Link Road (Passing right through Andheri West) */}
        <path
          d="M 380,180 L 388,260 L 392,320 L 398,390 L 408,460"
          fill="none"
          stroke="#111111"
          strokeWidth="1.2"
        />

        {/* Western Railway Spine (Dashed dual line) */}
        <path
          d="M 432,60 L 425,180 L 418,300 L 422,410 L 436,500 L 450,600 L 465,720 L 472,850"
          fill="none"
          stroke="#888880"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Key East-West Connectors (JVLR - Jogeshwari Vikhroli Link Road, Santacruz Chembur Link Road) */}
        <path d="M 390,260 L 440,260 L 530,270 L 620,280" fill="none" stroke="#777770" strokeWidth="0.9" />
        <path d="M 395,380 L 440,375 L 510,390 L 580,410" fill="none" stroke="#777770" strokeWidth="0.9" />
        <path d="M 425,520 L 470,515 L 530,510 L 580,500" fill="none" stroke="#777770" strokeWidth="0.9" />

        {/* Secondary Urban Streets Grid (Fine network) */}
        <g stroke="#d0ccc2" strokeWidth="0.4">
          <line x1="360" y1="210" x2="430" y2="210" />
          <line x1="355" y1="240" x2="435" y2="240" />
          <line x1="365" y1="300" x2="430" y2="300" />
          <line x1="370" y1="340" x2="430" y2="340" />
          <line x1="380" y1="370" x2="435" y2="370" />
          <line x1="390" y1="420" x2="445" y2="420" />
          <line x1="400" y1="480" x2="455" y2="480" />
          <line x1="420" y1="620" x2="475" y2="620" />
          <line x1="430" y1="670" x2="485" y2="670" />
          <line x1="440" y1="740" x2="495" y2="740" />
          <line x1="450" y1="800" x2="505" y2="800" />
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 3: REGIONAL & NEIGHBOURHOOD ZONING BOUNDARIES */}
      {/* ========================================================================= */}
      <g id="layer-regions" opacity={opacityLayers.neighbourhoods ?? 1}>
        {/* Andheri West Regional Boundary Highlight */}
        <g id="region-andheri-west">
          <polygon
            points="350,270 415,270 435,360 380,370 335,330"
            fill="url(#andheriGlow)"
            stroke="#111111"
            strokeWidth="1.0"
            strokeDasharray="4 2"
          />
          <rect x="355" y="275" width="60" height="80" fill="url(#zoningHatch)" opacity="0.4" />
        </g>

        {/* Bandra West Boundary */}
        <polygon
          points="390,470 450,470 460,540 405,560"
          fill="none"
          stroke="#a09c90"
          strokeWidth="0.6"
          strokeDasharray="3 3"
        />

        {/* BKC (Bandra Kurla Complex) */}
        <polygon
          points="520,460 610,460 620,520 540,530"
          fill="none"
          stroke="#a09c90"
          strokeWidth="0.6"
          strokeDasharray="3 3"
        />

        {/* South Mumbai / Nariman Point */}
        <polygon
          points="440,810 510,810 490,950 445,950"
          fill="none"
          stroke="#a09c90"
          strokeWidth="0.6"
          strokeDasharray="3 3"
        />
      </g>

      {/* ========================================================================= */}
      {/* LAYER 4: DETAILED ANDHERI WEST / LOKHANDWALA STREET GRID (ZOOM FOCUS) */}
      {/* ========================================================================= */}
      <g id="layer-andheri-detail" opacity={opacityLayers.andheriFocus ?? 1}>
        {/* Veera Desai Industrial Area & Studio Enclave */}
        <g stroke="#222222" strokeWidth="0.7">
          {/* Veera Desai Main Road */}
          <line x1="382" y1="305" x2="415" y2="308" />
          {/* Oshiwara Link Road Branch */}
          <line x1="388" y1="315" x2="422" y2="318" />
          {/* Sab TV Road */}
          <line x1="390" y1="328" x2="425" y2="330" />
          {/* Cross alleys & plot boundaries */}
          <line x1="392" y1="305" x2="392" y2="338" />
          <line x1="400" y1="306" x2="400" y2="335" />
          <line x1="408" y1="307" x2="408" y2="332" />
        </g>

        {/* Specific Architectural Building Footprint for Jamming Studio (Plot 42) */}
        <g id="jamming-studio-building-footprint">
          {/* Surrounding plot parcels */}
          <rect x="385" y="312" width="5" height="4" fill="#ebe8de" stroke="#77756e" strokeWidth="0.4" />
          <rect x="398" y="314" width="6" height="5" fill="#ebe8de" stroke="#77756e" strokeWidth="0.4" />
          <rect x="386" y="322" width="7" height="4" fill="#ebe8de" stroke="#77756e" strokeWidth="0.4" />
          <rect x="402" y="324" width="8" height="5" fill="#ebe8de" stroke="#77756e" strokeWidth="0.4" />

          {/* JAMMING STUDIO FOOTPRINT (CALIBRATED TRAPEZOIDAL ACOUSTIC ENVELOPE) */}
          <polygon
            points="391.2,318.5 394.8,318.2 395.4,323.0 391.0,323.5"
            fill="#111111"
            stroke="#111111"
            strokeWidth="0.8"
          />

          {/* Architectural dimension lines & calipers */}
          <line x1="388" y1="316" x2="388" y2="325" stroke="#d9381e" strokeWidth="0.4" strokeDasharray="1 1" />
          <line x1="386" y1="316" x2="390" y2="316" stroke="#d9381e" strokeWidth="0.4" />
          <line x1="386" y1="325" x2="390" y2="325" stroke="#d9381e" strokeWidth="0.4" />
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 5: CARTOGRAPHIC LABELS & TYPOGRAPHY */}
      {/* ========================================================================= */}
      <g id="layer-labels">
        {/* City & Sea Watermarks */}
        <text
          x="120"
          y="500"
          fill="#c8c4b8"
          fontSize="22"
          letterSpacing="0.35em"
          className="font-mono-tech"
          transform="rotate(-85 120 500)"
        >
          ARABIAN SEA
        </text>

        <text
          x="750"
          y="280"
          fill="#d0ccbe"
          fontSize="18"
          letterSpacing="0.25em"
          className="font-mono-tech"
        >
          THANE CREEK
        </text>

        {/* Regional District Labels */}
        <g fill="#444440" className="font-mono-tech" fontSize="8" letterSpacing="0.12em">
          <text x="360" y="260">ANDHERI WEST</text>
          <text x="445" y="255" fill="#888880">ANDHERI EAST</text>
          <text x="340" y="380">JUHU / JVPD</text>
          <text x="400" y="460">BANDRA WEST</text>
          <text x="530" y="455">BKC DISTRICT</text>
          <text x="440" y="800">NARIMAN POINT</text>
          <text x="445" y="880">COLABA</text>
        </g>

        {/* Micro Neighbourhoods */}
        <g fill="#777770" className="font-mono-tech" fontSize="5.5" letterSpacing="0.06em">
          <text x="375" y="295">LOKHANDWALA</text>
          <text x="375" y="342">VERSOVA BEACH</text>
          <text x="382" y="303">VEERA DESAI ROAD</text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 6: ARCHITECTURAL PROJECT PINS & ANNOTATIONS */}
      {/* ========================================================================= */}
      <g id="layer-project-pins" opacity={opacityLayers.projectPin ?? 1}>
        {/* Primary Target: JAMMING STUDIO (392, 320) */}
        <g id="pin-jamming-studio" className="cursor-pointer">
          {/* Subtle concentric focal rings */}
          <circle cx="392" cy="320" r="14" fill="none" stroke="#111111" strokeWidth="0.3" strokeDasharray="1 2" />
          <circle cx="392" cy="320" r="8" fill="none" stroke="#111111" strokeWidth="0.4" />
          <circle cx="392" cy="320" r="3.5" fill="#111111" />
          <circle cx="392" cy="320" r="1.2" fill="#ffffff" />

          {/* Architectural Leader Line */}
          <path
            d="M 392,320 L 365,300 L 320,300"
            fill="none"
            stroke="#111111"
            strokeWidth="0.8"
          />

          {/* Pin Label Box */}
          <g transform="translate(230, 275)">
            <rect x="0" y="0" width="85" height="22" fill="#ffffff" stroke="#111111" strokeWidth="0.6" />
            <text x="5" y="9" fill="#111111" fontSize="5" fontWeight="700" className="font-mono-tech">JAMMING STUDIO</text>
            <text x="5" y="15" fill="#666660" fontSize="3.8" className="font-mono-tech">PARTHIV GOHIL — ANDHERI W</text>
            <text x="5" y="19.5" fill="#999990" fontSize="3.2" className="font-mono-tech">19°08'22.4&quot;N 72°49'51.2&quot;E</text>
          </g>
        </g>

        {/* Secondary: TEDx Gateway (480, 840) */}
        <g id="pin-tedx-gateway" opacity="0.6" className="cursor-pointer">
          <circle cx="480" cy="840" r="2.5" fill="#555550" />
          <path d="M 480,840 L 510,830 L 540,830" fill="none" stroke="#777770" strokeWidth="0.5" />
          <text x="545" y="832" fill="#555550" fontSize="4.5" className="font-mono-tech">TEDx GATEWAY</text>
        </g>

        {/* Secondary: Housing One (440, 530) */}
        <g id="pin-housing-one" opacity="0.6" className="cursor-pointer">
          <circle cx="440" cy="530" r="2.5" fill="#555550" />
          <path d="M 440,530 L 410,520 L 370,520" fill="none" stroke="#777770" strokeWidth="0.5" />
          <text x="320" y="522" fill="#555550" fontSize="4.5" className="font-mono-tech">HOUSING ONE</text>
        </g>

        {/* Secondary: Urban Traction (580, 490) */}
        <g id="pin-urban-traction" opacity="0.6" className="cursor-pointer">
          <circle cx="580" cy="490" r="2.5" fill="#555550" />
          <path d="M 580,490 L 610,480 L 650,480" fill="none" stroke="#777770" strokeWidth="0.5" />
          <text x="655" y="482" fill="#555550" fontSize="4.5" className="font-mono-tech">URBAN TRACTION</text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* LAYER 7: SCALE BAR & CARTOGRAPHIC COMPASS */}
      {/* ========================================================================= */}
      <g id="layer-scale-bar" transform="translate(820, 920)">
        {/* Scale Rule */}
        <line x1="0" y1="0" x2="100" y2="0" stroke="#111111" strokeWidth="1.2" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#111111" strokeWidth="1.2" />
        <line x1="50" y1="-2" x2="50" y2="2" stroke="#111111" strokeWidth="0.8" />
        <line x1="100" y1="-3" x2="100" y2="3" stroke="#111111" strokeWidth="1.2" />
        <text x="0" y="10" fill="#555550" fontSize="5" className="font-mono-tech">0</text>
        <text x="47" y="10" fill="#555550" fontSize="5" className="font-mono-tech">5 KM</text>
        <text x="92" y="10" fill="#555550" fontSize="5" className="font-mono-tech">10 KM</text>
        <text x="0" y="19" fill="#888880" fontSize="4.5" className="font-mono-tech">DATUM: WGS 84 / UTM ZONE 43N</text>

        {/* Minimal Architectural North Arrow */}
        <g transform="translate(115, -15)">
          <line x1="0" y1="18" x2="0" y2="-6" stroke="#111111" strokeWidth="1.0" />
          <polygon points="0,-10 -3,-4 0,-6 3,-4" fill="#111111" />
          <text x="-2.2" y="-13" fill="#111111" fontSize="6" fontWeight="bold" className="font-mono-tech">N</text>
        </g>
      </g>
    </svg>
  );
};
