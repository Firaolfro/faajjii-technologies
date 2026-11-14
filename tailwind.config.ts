import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        faajji: {
          950: "#050b18",
          900: "#091428",
          850: "#0d1c38",
          800: "#13284f",
          700: "#1d3d75",
          600: "#2563eb",
          500: "#3b82f6",
          400: "#60a5fa",
          300: "#93c5fd",
          cyan: "#00d2ff",
          accent: "#38bdf8",
        },
      },
      backgroundImage: {
        "tech-gradient": "radial-gradient(ellipse at top, #1e3a8a 0%, #091428 50%, #030712 100%)",
        "metallic-button": "linear-gradient(180deg, #f8fafc 0%, #cbd5e1 50%, #94a3b8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
