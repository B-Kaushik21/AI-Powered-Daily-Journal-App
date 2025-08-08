/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelPink: "#FDDDE6",
        pastelBlue: "#CDE7F0",
        pastelYellow: "#FFF7D6",
        pastelGreen: "#DFF6DD",
      },
      fontFamily: {
        cute: ['"Comic Neue"', 'cursive'],
      }
    },
  },
  plugins: [],
}
