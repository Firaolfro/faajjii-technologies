import React from "react";

interface FaajjiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "orbit" | "circuit";
}

export function FaajjiLogo({
  className = "",
  size = "md",
  showText = true,
  variant = "orbit",
}: FaajjiLogoProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {variant === "orbit" ? (
        // The Modern Orbit F Logo with Pixel Burst (from Image 2)
        <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_16px_rgba(0,180,255,0.65)]"
          >
            <defs>
              <linearGradient id="faajjiBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="faajjiCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="silverSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Pixel Burst effect on top right */}
            <rect x="70" y="14" width="7" height="7" rx="1.5" fill="#38bdf8" opacity="0.9" />
            <rect x="80" y="10" width="8" height="8" rx="1.5" fill="#60a5fa" opacity="0.8" />
            <rect x="91" y="8" width="7" height="7" rx="1.5" fill="#93c5fd" opacity="0.7" />
            <rect x="74" y="24" width="8" height="8" rx="1.5" fill="#38bdf8" opacity="0.9" />
            <rect x="85" y="20" width="9" height="9" rx="2" fill="#2563eb" opacity="0.95" />
            <rect x="97" y="18" width="8" height="8" rx="1.5" fill="#60a5fa" opacity="0.85" />
            <rect x="88" y="32" width="7" height="7" rx="1.5" fill="#38bdf8" opacity="0.75" />
            <rect x="98" y="29" width="8" height="8" rx="1.5" fill="#2563eb" opacity="0.8" />

            {/* Stylized Modern 'F' Wing */}
            <path
              d="M 32 30 
                 C 32 26, 36 22, 75 22 
                 C 68 28, 55 33, 44 33 
                 L 44 45 
                 C 55 45, 66 43, 72 41 
                 C 66 48, 55 52, 44 52 
                 L 44 88 
                 C 38 86, 32 80, 32 75 Z"
              fill="url(#faajjiBlue)"
            />

            {/* Orbit Ring swoop */}
            <path
              d="M 20 62 
                 C 20 46, 50 36, 78 40 
                 C 94 42, 102 48, 98 55 
                 C 93 63, 70 70, 42 68 
                 C 28 67, 20 65, 20 62 Z"
              stroke="url(#faajjiCyan)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ) : (
        // The 3D Circuit FT Logo (from Image 1)
        <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(37,99,235,0.7)]"
          >
            <defs>
              <linearGradient id="chromeF" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="35%" stopColor="#cbd5e1" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="electricT" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>

            {/* F letter in metallic chrome */}
            <path
              d="M26 26 H56 V39 H41 V51 H53 V63 H41 V88 H26 V26Z"
              fill="url(#chromeF)"
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />

            {/* T letter in blue */}
            <path
              d="M58 26 H88 V39 H78 V88 H68 V39 H58 V26Z"
              fill="url(#electricT)"
              stroke="#60a5fa"
              strokeWidth="1.5"
            />

            {/* Circuit board traces & nodes */}
            <path
              d="M56 46 H62 M62 46 V65 M62 65 H54 M62 55 H70 M50 72 H58 M58 72 V80"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="54" cy="65" r="2.5" fill="#38bdf8" />
            <circle cx="70" cy="55" r="2.5" fill="#38bdf8" />
            <circle cx="58" cy="80" r="2.5" fill="#38bdf8" />
          </svg>
        </div>
      )}

      {showText && (
        <div className="text-center mt-3">
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
            Faajji Technologies
          </h1>
          <p className="text-xs text-sky-200/80 font-medium tracking-wide mt-0.5">
            Innovation &bull; Technology &bull; Opportunity
          </p>
          <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-widest mt-0.5">
            Digital Ethiopia
          </p>
        </div>
      )}
    </div>
  );
}

export function LionBadge({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
      >
        {/* Lion Mane & Face outline */}
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <path
          d="M24 10 C18 10 14 14 14 19 C14 24 18 28 24 28 C30 28 34 24 34 19 C34 14 30 10 24 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M21 18 L24 22 L27 18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 22 V25" stroke="currentColor" strokeWidth="1.5" />
        {/* Crown / Star accent */}
        <path d="M24 6 L26 9 L29 9 L27 11 L28 14 L24 12 L20 14 L21 11 L19 9 L22 9 Z" fill="currentColor" />
        {/* Ethiopia map outline hint at base */}
        <path
          d="M17 33 C19 31 23 32 25 30 C27 29 29 32 31 34 C30 36 28 38 24 38 C20 38 18 35 17 33 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
