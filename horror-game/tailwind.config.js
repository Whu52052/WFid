/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horror: {
          bg: '#1A0A0A',
          'bg-secondary': '#2D1A1A',
          accent: '#8B0000',
          'text-primary': '#D4C4A8',
          'text-secondary': '#B8956C',
          border: '#3D2B2B',
          danger: '#660000',
        },
      },
      fontFamily: {
        horror: ['"Noto Sans SC"', 'sans-serif'],
        typewriter: ['"Courier New"', 'monospace'],
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'flicker': 'flicker 0.15s infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        breathing: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
