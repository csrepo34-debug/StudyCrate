/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111827', // primary (graphite / dark slate)
          secondary: '#374151', // cool gray
          background: '#F9FAFB', // light gray background
          text: '#111827', // main text
          accent: '#4F46E5', // indigo accent
          muted: '#6B7280' // muted gray text
        }
      }
    }
  },
  plugins: []
};
