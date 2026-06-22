import React from "react";

/**
 * High-quality detailed SVG render of the traditional Maasai Shield and Crossed Spears.
 * Colored in the iconic Kenyan heritage palette: Crimson Red, Deep Black, Clean White, and Kenya Green.
 */
export function MaasaiCrest({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Spears */}
      <path
        d="M20 100 L80 20 M18 102 L22 98 M78 22 L82 18"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M80 100 L20 20 M82 102 L78 98 M22 22 L18 18"
        stroke="#111111"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Spearheads */}
      <path d="M78 18 L83 15 L80 23 Z" fill="#111111" />
      <path d="M22 18 L17 15 L20 23 Z" fill="#111111" />
      
      {/* Spear Ends */}
      <path d="M19 99 L15 103 L21 101 Z" fill="#555555" />
      <path d="M81 99 L85 103 L79 101 Z" fill="#555555" />

      {/* Main Shield Body */}
      <path
        d="M50 10 C68 25, 72 55, 68 85 C62 105, 50 115, 50 115 C50 115, 38 105, 32 85 C28 55, 32 25, 50 10 Z"
        fill="#111111"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Shield Inner Content (Red / Green / White splits) */}
      {/* Left Red Half */}
      <path
        d="M50 12 C35 26, 30 55, 34 85 C39 103, 50 113, 50 113 V12 Z"
        fill="#E2231A"
      />

      {/* Shield Center Black Stripe with White dots */}
      <path
        d="M44 20 C44 20, 48 50, 48 85 C48 98, 45 105, 45 105 H55 C55 105, 52 98, 52 85 C52 50, 56 20, 56 20 H44 Z"
        fill="#111111"
      />
      
      {/* White traditional shield markings */}
      <path
        d="M38 45 C41 50, 41 70, 38 75"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M62 45 C59 50, 59 70, 62 75"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Left side Green emblem curve */}
      <path
        d="M33 55 C34 65, 37 75, 41 80 L42 50 Z"
        fill="#008753"
      />
      {/* Right side Green emblem curve */}
      <path
        d="M67 55 C66 65, 63 75, 59 80 L58 50 Z"
        fill="#008753"
      />

      {/* Center White Rings */}
      <circle cx="50" cy="40" r="3" fill="#FFFFFF" />
      <circle cx="50" cy="60" r="3" fill="#FFFFFF" />
      <circle cx="50" cy="80" r="3" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Reusable traditional Greek-key / tribal maze vector pattern, designed as a 
 * faint background decor or a rich solid panel.
 */
export function GreekMazePattern({ 
  className = "opacity-5", 
  color = "currentColor" 
}: { 
  className?: string; 
  color?: string; 
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="greek-maze" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 10 10 L 50 10 L 50 50 L 30 50 L 30 30 L 40 30 L 40 40 L 44 40 L 44 26 L 26 26 L 26 54 L 54 54 L 54 6 L 6 6 L 6 54 L 10 54 Z"
              fill="none"
              stroke={color}
              strokeWidth="2.1"
              strokeLinejoin="bevel"
            />
            <path
              d="M 30 10 L 30 18 L 18 18 L 18 42 L 22 42 L 22 22 L 34 22 L 34 10 Z"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#greek-maze)" />
      </svg>
    </div>
  );
}

/**
 * Speed Sash component — representing a solid, dynamic diagonal split top-left to bottom-right.
 * Consists of the Kenyan flag colors slicing fast: Black, White, Red, White, Green.
 */
export function SpeedSash({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden shrink-0 select-none ${className}`}>
      <div className="absolute inset-0 flex flex-col transform -skew-y-3 scale-y-200">
        <div className="h-1/5 bg-[#111111]" />
        <div className="h-1/5 bg-white" />
        <div className="h-1/5 bg-[#E2231A]" />
        <div className="h-1/5 bg-white" />
        <div className="h-1/5 bg-[#008753]" />
      </div>
    </div>
  );
}

/**
 * Stylized duo of runners in stride, delivering a premium Olympic marathon style visual.
 */
export function RunnersSilhouette({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.85">
        {/* Background Runner (Female Athlete) */}
        <path
          d="M 160 120 C 145 92 110 50 100 85 C 95 102 110 130 125 150 C 140 170 152 195 150 215 M 150 215 L 120 260 M 150 215 L 180 250 M 125 150 L 90 190 M 130 120 L 160 90"
          stroke="#008753"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="165" cy="80" r="14" fill="#008753" />

        {/* Foreground Runner (Male Athlete) */}
        <path
          d="M 230 140 C 215 110 180 70 170 105 C 165 122 180 150 195 170 C 210 190 220 215 215 235 M 215 235 L 190 285 M 215 235 L 245 275 M 195 170 L 155 210 M 205 135 L 240 110"
          stroke="#E2231A"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="235" cy="100" r="16" fill="#E2231A" />
      </g>
    </svg>
  );
}
