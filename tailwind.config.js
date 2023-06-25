/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#01050f",
          dark: "#f8fbfc",
        },
        background: {
          light: "#fafbff",
          dark: "#101e1e",
        },
        primary: "#0f50f5",
        secondary: "#ffffff",
        accent: "#0947e1",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
