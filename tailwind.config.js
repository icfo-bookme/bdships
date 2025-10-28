/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // allows dark mode via class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: "#00026E",
        secondary: "#1E40AF",
      },
      fontFamily: {
        luxia: ["Luxia", "sans-serif"],
      },
      keyframes: {
        "shake-vertical": {
          "0%, 100%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-4px)" },
          "75%": { transform: "translateY(4px)" },
        },
      },
      animation: {
        "shake-vertical": "shake-vertical 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
