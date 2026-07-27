/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        academy: {
          ink: "#07111f",
          canvas: "#050b13",
          panel: "#0b1726",
          elevated: "#102136",
          line: "#20364d",
          blue: "#1677ff",
          cyan: "#27d3c2",
          teal: "#19b7a7",
          amber: "#f0a500",
          violet: "#9b6cff",
          red: "#ef6575"
        }
      },
      boxShadow: {
        panel: "0 18px 48px rgba(0, 0, 0, 0.22)",
        focus: "0 0 0 3px rgba(22, 119, 255, 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "Aptos", "Segoe UI", "sans-serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "Consolas", "monospace"]
      }
    }
  },
  plugins: []
};
