/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        walnut: '#321C04',
        cream: '#F5EFE6',
        bone: '#FFFDF9',
        brass: '#C9A227',
        ash: '#8A7E6F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 24px 60px -32px rgba(50, 28, 4, 0.28)',
        subtle: '0 12px 32px -16px rgba(50, 28, 4, 0.12)',
        glow: '0 0 40px -10px rgba(201, 162, 39, 0.25)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '250ms',
        base: '450ms',
        slow: '700ms',
        cinematic: '1100ms',
      },
    },
  },
  plugins: [],
}
