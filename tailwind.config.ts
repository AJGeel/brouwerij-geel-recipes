import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        reveal: {
          from: { opacity: "0", transform: "translateY(24px)" },
        },
        "bubble-rise": {
          "0%": { opacity: "0", transform: "translateY(0)" },
          "10%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-110vh)" },
        },
        "bubble-sway": {
          "0%, 100%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        reveal: "reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        "bubble-rise": "bubble-rise 30s linear infinite",
        "bubble-sway": "bubble-sway 7s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        foreground: token("foreground"),
        surface: token("surface"),
        gray: {
          "100": token("gray-100"),
          "400": token("gray-400"),
          "500": token("gray-500"),
          "600": token("gray-600"),
          "700": token("gray-700"),
          "900": token("gray-900"),
        },
        amber: {
          "100": token("amber-100"),
          "200": token("amber-200"),
          "500": token("amber-500"),
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
