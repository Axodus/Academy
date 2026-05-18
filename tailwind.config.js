/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        academy: {
          ink: "#111827",
          panel: "#f7f8fa",
          line: "#d9dee7",
          blue: "#1f4f8f",
          teal: "#0f766e",
          gold: "#b7791f",
          red: "#b42318"
        }
      },
      boxShadow: {
        panel: "0 18px 60px rgba(17, 24, 39, 0.08)"
      }
    }
  },
  plugins: []
};
