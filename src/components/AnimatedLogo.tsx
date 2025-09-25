"use client";

import React from "react";

/**
 * AnimatedLogo
 *
 * Usage:
 * <AnimatedLogo width={160} height={160} scale={1} />
 *
 * The component inlines the SVG markup (which references /jk-fresh-logo.jpg).
 * The embedded JPG must be served from public/ or available at /jk-fresh-logo.jpg
 */
export default function AnimatedLogo({
  width = 160,
  height = 160,
  scale = 1,
  className = "",
}: {
  width?: number;
  height?: number;
  scale?: number;
  className?: string;
}) {
  const style: React.CSSProperties = {
    width,
    height,
    transform: `scale(${scale})`,
    display: "inline-block",
  };

  return (
    <div style={style} className={className} aria-hidden={false}>
      {/* Inline SVG — it references /jk-fresh-logo.jpg so put the JPG in public/ or the root served path */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 800"
        role="img"
        aria-label="JK Fresh animated logo"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <filter id="bolder" x="-20%" y="-20%" width="140%" height="140%">
            <feColorMatrix
              type="matrix"
              values="1.15 0 0 0 0  0 1.15 0 0 0  0 0 1.15 0 0  0 0 0 1 0"
              result="boost"
            />
            <feGaussianBlur in="boost" stdDeviation="0.6" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="boost" />
            </feMerge>
          </filter>

          <clipPath id="logo-clip">
            <rect x="0" y="0" width="800" height="800" rx="12" ry="12" />
          </clipPath>

          <style type="text/css">{`
            .logo-root { transform-origin: 50% 50%; }
            .pulse { animation: pulse 3.6s ease-in-out infinite; }
            .rotate { animation: slow-rotate 12s linear infinite; }
            .float { animation: float 6s ease-in-out infinite; }
            @keyframes pulse {
              0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
              50% { transform: scale(1.02); filter: drop-shadow(0 6px 10px rgba(0,0,0,0.12)); }
              100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); }
            }
            @keyframes slow-rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
              100% { transform: translateY(0px); }
            }
          `}</style>
        </defs>

        <g
          className="logo-root pulse float"
          clipPath="url(#logo-clip)"
          filter="url(#bolder)"
        >
          {/* Embedded raster image — ensure the JPG is available at /jk-fresh-logo.jpg */}
          <image
            href="/jk-fresh-logo.jpg"
            x="0"
            y="0"
            width="800"
            height="800"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <g className="rotate" transform="translate(650,110)">
          <circle cx="0" cy="0" r="24" fill="#F4A500">
            <animate attributeName="r" values="20;26;20" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <path d="M-6 -12 C -2 -6, 2 -6, 6 -12" fill="none" stroke="#1f5a2d" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
