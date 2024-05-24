import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: "var(--font-lexend)",
      },
      colors: {
        primary: "#fc9948",
        secondary: "#02060C",
        complementory: "#414449",
        highlights: "#e1e1e5"
      },
      padding: {
        body: "4%",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
