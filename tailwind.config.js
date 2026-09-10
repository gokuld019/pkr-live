/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1B3B8C",
          "blue-dark": "#12285E",
          "blue-light": "#2852BE",
          orange: "#F0722F",
          "orange-dark": "#D45B1C",
          "orange-light": "#FF8D52",
          cream: "#F6EDE2",
          sand: "#FAF5EF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        elevated: "0 20px 40px -10px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
