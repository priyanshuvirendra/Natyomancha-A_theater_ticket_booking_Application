/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background1: "#000407",
        background2: "#121212",
        shadow: "#232222",
        primary_text: "#FFFAF4",
        secondary_text: "#a3a09d",
        highlight: "#3434b8",
        highlight_hover: "#121272",
      },
      fontFamily: {
        // sans: ["var(--font-sora)", ...fontFamily.sans],
        // code: "var(--font-code)",
        // grotesk: "var(--font-grotesk)",
        open_sans: ["Open Sans", "sans-serif"], // normal text
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"], // secondary heading
        montserrat: ["Montserrat", "sans-serif"], // primary heading
        ubuntu: ["Ubuntu", "sans-serif"], // buttons
        logo_text: ["Macondo", "cursive"],
      },
    },
  },
  plugins: [],
};
