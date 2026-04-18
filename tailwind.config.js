/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0b",
        surface: "#141416",
        "surface-light": "#1c1c1f",
        primary: "#e8a838",
        "primary-dim": "#c48a2a",
        secondary: "#f5e6d3",
        accent: "#d4a056",
        "text-main": "#ede8e3",
        "text-muted": "#8a8278",
        border: "#2a2a2d",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Syne Fallback', 'sans-serif'],
        heading: ['Space Grotesk', 'Space Grotesk Fallback', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #e8a838, 0 0 20px #e8a838' },
          to: { boxShadow: '0 0 20px #d4a056, 0 0 30px #d4a056' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
