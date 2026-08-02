/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        ink: "#0A0A0A",
        mist: "#E8E9EB",
      },
    },
  },
  plugins: [],
};
