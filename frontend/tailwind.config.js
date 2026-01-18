/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111827', // primary text (light mode)
          secondary: '#374151',
          muted: '#6B7280',
          background: '#F9FAFB',
          accent: '#2563EB',
          accentHover: '#1D4ED8',
          border: '#E5E7EB',
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626'
        }
      }
    }
  },
  plugins: []
};
