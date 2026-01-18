/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E293B', // primary text (light mode)
          secondary: '#475569',
          muted: '#64748B',
          background: '#F8FAFC',
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
