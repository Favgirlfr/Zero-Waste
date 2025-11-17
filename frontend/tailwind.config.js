export default {
  darkMode: 'class', // Enables manual dark mode toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Optional: custom brand colors for Zero Waste Exchange
        brand: {
          light: '#e6f4ea',
          DEFAULT: '#34a853',
          dark: '#1f6f3d',
        }
      }
    },
  },
  plugins: [],
}