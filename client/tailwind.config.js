/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        "h-sm": { raw: "(min-height: 500px)" },
        "h-md": { raw: "(min-height: 700px)" },
        "h-lg": { raw: "(min-height: 900px)" },
        "2.5xl": { raw: "(min-width:1600px)" },
        "2.75xl": { raw: "(min-width:1700px)" },
        "3xl": { raw: "(min-width:1900px)" },
      },
      colors: {
        "light-gray-100": "#d7d7d7",
        "dark-gray-200": "#7a7a7a",
        "regular-orange": "#f59a23",
        "blue-gray-100": "#a3b9d6",
        "darkest-gray-100": "#333333",
        "discord-100": "#5865F2",
        "twitter-100": "#1DA1F2",
        "feedback-100": "#333333",
        "arrow-colour-grey": "#8f8f8f",
        "logo-background-dark-grey": "#7a7a7a",
        "green-map": "#718d43",
        "homeowner-font-colour": "#e2e2e2",
        "ethereum-icon-fill": "#3d3d3d",
        "grey-button-colour": "#7f7f7f",
        "grey-player-healthbar": "#555555",
        "winner-table-grey": "#797979",
        "winner-table-font-grey": "#7f7f7f",
      },
    },
  },
  plugins: [],
};

