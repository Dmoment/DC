const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', 'system-ui', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        anthropic: {
          bg: '#f4f1ed', // Warm light beige/stone
          text: '#191919', // Soft black
          accent: '#d97757', // Terracotta/Coral accent often seen
          secondary: '#6b6b6b', // Gray text
          border: '#e5e5e5',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
