import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[300],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          ["dark-hover"]: colors.neutral[900],
        },
        brand: {
          primary: "#64748B",
          accent: "#F43F5E",
          white: "#FFFFFF",
          darkText: "#E4E4E4",
          lightGray: "#B0B0B0",
          darkerText: "#121212",
          card: "#1E1E1E",
          navbar: "#181818",
          darkBg: "#121212",
          overlay: "rgba(0,0,0,0.7)",
          success: "#00C853",
          danger: "#D50000",
        },
        darkBg: "#121212",
        lighterBg: "#E4E4E4",
        lightBg: "#FFFFFF",

        lightText: "#222222",
      },
    },
  },
  plugins: [],
};

export default config;
