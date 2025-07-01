module.exports = {
  content: [
    "./index.html",
    "./src/*/.{js,ts,jsx,tsx}", // ✅ Correct pattern for all files inside subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};