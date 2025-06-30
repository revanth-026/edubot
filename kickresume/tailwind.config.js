/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        indigo: "#2F3C7E",       // Primary Color
        teal: "#00C9A7",         // Accent Color
        ivory: "#F8F9FA",        // Background Light
        charcoal: "#212529",     // Text Dark
        graycool: "#6C757D",     // Muted Text
        coral: "#FF6B6B",        // Highlight
        lightgray: "#E9ECEF",    // Card Background
      },
    },
  },
  plugins: [],
};