/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#8B0023',
          light: '#A4002A',
          dark: '#6B001B',
          50:  '#FFF0F3',
          100: '#FFE0E6',
          200: '#FFC1CC',
          300: '#FF92A3',
          400: '#FF5370',
          500: '#8B0023',
          600: '#6B001B',
          700: '#4D0013',
          800: '#2E000C',
          900: '#1A0007',
        },
        cream: {
          DEFAULT: '#FFF8E7',
          light: '#FFFCF5',
          dark: '#E6DFC0',
          50:  '#FFFCF5',
          100: '#FFF8E7',
          200: '#F5ECD5',
          300: '#E6DFC0',
          400: '#D4C9A0',
        },
        charcoal: {
          DEFAULT: '#0F0F0F',
          light: '#1A1A1A',
          dark: '#080808',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
