import React from "react";

interface ApparelBlueprintProps {
  colorway: "Red" | "White";
  isSinglet: boolean;
  view: "front" | "back";
  className?: string;
}

export default function ApparelBlueprint({
  colorway,
  isSinglet,
  view,
  className = "w-full h-full",
}: ApparelBlueprintProps) {
  const isRed = colorway === "Red";

  // Palette definitions
  const baseBg = isRed ? "#E2231A" : "#FFFFFF";
  const contrastBg = isRed ? "#FFFFFF" : "#111111"; // text, primary lines
  const subtleSashDark = "#111111"; // black stripe
  const subtleSashRed = "#E2231A";
  const subtleSashWhite = "#FFFFFF";
  const greenSashColor = "#008753"; // green panel
  const greenSashPatternColor = "#00482b"; // darker green for pattern inside green sash

  // Shirt dimensions & paths (Symmetric relative to X=150)
  // Standard width: 300, Standard height: 380
  const tShirtPath = `
    M 105 50 
    C 125 70, 175 70, 195 50 
    L 230 65 
    L 265 110 
    L 235 125 
    L 220 115 
    L 220 320 
    C 180 330, 120 330, 80 320 
    L 80 115 
    L 65 125 
    L 35 110 
    L 70 65 
    Z
  `;

  const singletPath = `
    M 112 50 
    C 130 76, 170 76, 188 50 
    L 196 50 
    C 202 90, 215 115, 215 125 
    L 215 325 
    C 180 335, 120 335, 85 325 
    L 85 125 
    C 85 115, 98 90, 104 50 
    Z
  `;

  const garmentPath = isSinglet ? singletPath : tShirtPath;

  return (
    <svg
      viewBox="0 0 300 380"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Repeating Greek Maze Pattern for the shirt base background */}
        <pattern id="base-maze" width="30" height="30" patternUnits="userSpaceOnUse">
          <path
            d="M 5 5 L 25 5 L 25 25 L 15 25 L 15 15 L 20 15 L 20 20 L 22 20 L 22 13 L 13 13 L 13 27 L 27 27 L 27 3 L 3 3 L 3 27 L 5 27 Z"
            fill="none"
            stroke={isRed ? "#C21510" : "#E2E2E2"}
            strokeWidth="1.2"
            strokeLinejoin="bevel"
            opacity={isRed ? "0.65" : "0.5"}
          />
        </pattern>

        {/* Repeating bolder maze pattern in green sash */}
        <pattern id="sash-maze" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 4 4 L 20 4 L 20 20 L 12 20 L 12 12 L 16 12 L 16 16 L 18 16 L 18 10 L 10 10 L 10 22 L 22 22 L 22 2 L 2 2 L 2 22 L 4 22 Z"
            fill="none"
            stroke={greenSashPatternColor}
            strokeWidth="1.5"
            strokeLinejoin="bevel"
          />
        </pattern>

        {/* 3D Realistic Sportswear fold shadow */}
        <linearGradient id="body-shade" x1="150" y1="0" x2="150" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isRed ? "0.15" : "0.0"} />
          <stop offset="40%" stopColor="#000000" stopOpacity="0.0" />
          <stop offset="90%" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>

        {/* Dynamic Clipping Path so sashes and graphic prints don't bleed outside the shirt borders */}
        <clipPath id="garment-clip">
          <path d={garmentPath} />
        </clipPath>

        {/* Arch curved path for Back Typography text print */}
        <path id="back-arch" d="M 60 78 Q 150 42 240 78" />
      </defs>

      {/* 2D Flat shadow effect */}
      <path
        d={garmentPath}
        fill="rgba(0,0,0,0.025)"
        transform="translate(4, 5)"
        className="pointer-events-none"
      />

      {/* Main Shirt Solid Base color */}
      <path
        d={garmentPath}
        fill={baseBg}
        stroke={isRed ? "#9c0b05" : "#D4D4D4"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "fill 0.3s ease" }}
      />

      {/* Repeating Greek-key Background pattern layer */}
      <path d={garmentPath} fill="url(#base-maze)" className="pointer-events-none" />

      {/* Clipped Decorative Elements (Specific design prints) */}
      <g clipPath="url(#garment-clip)">
        
        {/* Dynamic Brand Speed-Sash (Runs from upper left to bottom right) */}
        {view === "front" ? (
          <g>
            {/* The diagonal green sash filled with the bold Greek-key tribal motif */}
            {/* Covers lower right torso */}
            <path
              d="M 120 180 Q 150 140 250 110 L 320 110 L 320 380 L 100 380 Z"
              fill={greenSashColor}
            />
            <path
              d="M 120 180 Q 150 140 250 110 L 320 110 L 320 380 L 100 380 Z"
              fill="url(#sash-maze)"
              opacity="0.3"
            />

            {/* Separator stripes lining the sash diagonal */}
            {isRed ? (
              // On Red shirt: Black stripe, then White stripe
              <>
                {/* Thin dividing line */}
                <path
                  d="M 115 183 Q 146 142 248 111"
                  stroke={subtleSashWhite}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 111 185 Q 142 144 244 113"
                  stroke={subtleSashDark}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </>
            ) : (
              // On White shirt: Black stripe, then Red stripe
              <>
                <path
                  d="M 115 183 Q 146 142 248 111"
                  stroke={subtleSashRed}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 111 185 Q 142 144 244 113"
                  stroke={subtleSashDark}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        ) : (
          // Back View Sash (Mirror/Wraps around left torso base)
          <g>
            <path
              d="M -20 110 Q 150 140 180 180 L 200 380 L -20 380 Z"
              fill={greenSashColor}
            />
            <path
              d="M -20 110 Q 150 140 180 180 L 200 380 L -20 380 Z"
              fill="url(#sash-maze)"
              opacity="0.3"
            />
            {isRed ? (
              <>
                <path
                  d="M 52 111 Q 154 142 185 183"
                  stroke={subtleSashWhite}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 56 113 Q 158 144 189 185"
                  stroke={subtleSashDark}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <path
                  d="M 52 111 Q 154 142 185 183"
                  stroke={subtleSashRed}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 56 113 Q 158 144 189 185"
                  stroke={subtleSashDark}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        )}

        {/* FRONT PRINT: Logo & Runner Silhouettes */}
        {view === "front" && (
          <g>
            {/* "254 RUNNER" chest typography */}
            <text
              x="150"
              y="102"
              fill={contrastBg}
              fontSize="23"
              fontFamily="Impact, sans-serif"
              fontWeight="900"
              letterSpacing="1.2"
              textAnchor="middle"
              fontStyle="italic"
            >
              254
            </text>
            <text
              x="150"
              y="118"
              fill={contrastBg}
              fontSize="12"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="800"
              letterSpacing="4"
              textAnchor="middle"
            >
              RUNNER
            </text>

            {/* Runners Silhouette Front Graphic Print */}
            {/* Female athlete left, male athlete right in rapid sprint motion */}
            <g transform="translate(48, 122) scale(0.52)" opacity="0.95">
              {/* Common outline style */}
              {/* Back female runner */}
              <path
                d="M 120 120 C 110 100 80 65 72 90 C 68 102 80 120 90 135 C 100 150 108 170 106 185 M 106 185 L 82 225 M 106 185 L 128 215 M 90 135 L 62 165 M 92 120 L 115 95"
                stroke={contrastBg}
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="125" cy="85" r="11" fill={contrastBg} />

              {/* Front male runner */}
              <path
                d="M 175 135 C 163 110 132 75 125 102 C 120 116 132 138 143 155 C 155 172 162 192 158 208 M 158 208 L 138 250 M 158 208 L 180 240 M 143 155 L 110 190 M 151 130 L 178 110"
                stroke={contrastBg}
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="180" cy="98" r="13" fill={contrastBg} />
            </g>
          </g>
        )}

        {/* BACK PRINT: Arched Slogan & Traditional Maasai Shield */}
        {view === "back" && (
          <g>
            {/* Arched "BORN KENYAN, BORN TO RUN" curved text along the upper shoulders path */}
            <text fill={contrastBg} fontSize="8.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="950" letterSpacing="0.8">
              <textPath href="#back-arch" startOffset="50%" textAnchor="middle">
                BORN KENYAN, BORN TO RUN
              </textPath>
            </text>

            {/* Traditional Maasai Shield in matching color splits (Center Print) */}
            <g transform="translate(100, 102) scale(1.0)">
              {/* Crossed Spears */}
              <path
                d="M 20 80 L 80 20"
                stroke={contrastBg}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 80 80 L 20 20"
                stroke={contrastBg}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path d="M 78 18 L 82 15 L 80 22 Z" fill={contrastBg} />
              <path d="M 22 18 L 18 15 L 20 22 Z" fill={contrastBg} />

              {/* Shield container body */}
              <path
                d="M 50 10 C 65 22, 68 50, 65 75 C 60 90, 50 100, 50 100 C 50 100, 40 90, 35 75 C 32 50, 35 22, 50 10 Z"
                fill="#111111"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />

              {/* Red Left Half */}
              <path
                d="M 50 11.5 C 37 23, 33 50, 36 75 C 40 88, 50 98, 50 98 V 11.5 Z"
                fill="#E2231A"
              />

              {/* Active Green side accents */}
              <path d="M 35 50 C 36 58, 38 66, 42 70 L 43 45 Z" fill="#008753" />
              <path d="M 65 50 C 64 58, 62 66, 58 70 L 57 45 Z" fill="#008753" />

              {/* Center Black Spine with circular traditional markings */}
              <path
                d="M 45 18 C 45 18, 48 45, 48 75 C 48 85, 46 92, 46 92 H 54 C 54 92, 52 85, 52 75 C 52 45, 55 18, 55 18 H 45 Z"
                fill="#111111"
              />
              <circle cx="50" cy="35" r="2.2" fill="#FFFFFF" />
              <circle cx="50" cy="52" r="2.2" fill="#FFFFFF" />
              <circle cx="50" cy="69" r="2.2" fill="#FFFFFF" />

              {/* Horizontal White loop tribal markings */}
              <path
                d="M 41 40 C 43 44, 43 56, 41 60"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M 59 40 C 57 44, 57 56, 59 60"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          </g>
        )}

        {/* Small arm stripe / flag trim detailing the sleeve cuff */}
        {!isSinglet && (
          <g>
            {/* Left sleeve cuff flag bands */}
            <rect x="238" y="105" width="23" height="4" transform="rotate(35, 238, 105)" fill="#111111" />
            <rect x="241" y="109" width="23" height="4" transform="rotate(35, 241, 109)" fill="#FFFFFF" />
            <rect x="244" y="113" width="23" height="4" transform="rotate(35, 244, 113)" fill="#E2231A" />
            <rect x="247" y="117" width="23" height="4" transform="rotate(35, 247, 117)" fill="#FFFFFF" />
            <rect x="250" y="121" width="23" height="4" transform="rotate(35, 250, 121)" fill="#008753" />

            {/* Right sleeve cuff flag bands */}
            <rect x="39" y="117" width="23" height="4" transform="rotate(-35, 39, 117)" fill="#111111" />
            <rect x="36" y="113" width="23" height="4" transform="rotate(-35, 36, 113)" fill="#FFFFFF" />
            <rect x="33" y="109" width="23" height="4" transform="rotate(-35, 33, 109)" fill="#E2231A" />
            <rect x="30" y="105" width="23" height="4" transform="rotate(-35, 30, 105)" fill="#FFFFFF" />
            <rect x="27" y="101" width="23" height="4" transform="rotate(-35, 27, 101)" fill="#008753" />
          </g>
        )}
      </g>

      {/* Realistic 3D folding shadow and depth texture overlay */}
      <path d={garmentPath} fill="url(#body-shade)" className="pointer-events-none" />

      {/* Crew neck binding detail */}
      {isSinglet ? (
        <path
          d="M 112 50 C 130 76, 170 76, 188 50"
          stroke={isRed ? "#9c0b05" : "#D4D4D4"}
          strokeWidth="3.5"
          fill="none"
        />
      ) : (
        <path
          d="M 105 50 C 125 70, 175 70, 195 50"
          stroke={isRed ? "#9c0b05" : "#D4D4D4"}
          strokeWidth="3.5"
          fill="none"
        />
      )}
    </svg>
  );
}
