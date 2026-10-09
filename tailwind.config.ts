import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

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
      },
      animation: {
        reveal: "reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          "100": "#F4F4F4",
          "400": "#A699A5",
          "500": "#8F7F8E",
          "600": "#634E63",
          "900": "#20011F",
        },
        amber: {
          "100": "#EDE8E1",
          "200": "#CBC8C3",
          "500": "#A07F4D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
