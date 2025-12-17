/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       screens: {
        xxs: "375px",
      },
      colors: {
        // Base colors
        background: "#FFFFFF",
        text: "#0F0F0F",

        // Dashboard
        dashboard: {
          bg: "#EFF6FF", // soft blue background
          card: "#FFFFFF",
          border: "#E5E7EB",
          text: "#111827",
        },

        // Buttons
        primary: {
          DEFAULT: "#000000", // black buttons
          hover: "#1F2937",   // dark gray hover
        },
      },
    },
  },
  plugins: [],
};
