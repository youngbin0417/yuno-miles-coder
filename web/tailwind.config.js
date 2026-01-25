/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yuno: {
          yellow: '#FFD700',
          red: '#FF4500',
          black: '#1A1A1A'
        }
      }
    },
  },
  plugins: [],
}
