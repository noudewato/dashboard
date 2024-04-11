/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#3b82f6",
      primry: "#2563eb",
      neutral: "#fafafa",
      zinc: "#f5f5f5",
      purple: "#c084fc",
      slate500: "#475569",
      slates: "#020617",
      green: "#4ade80",
      red: "#dc2626",
      red500: "#ef4444",
      cyan: "#22d3ee",
      orange: "#f97316",
      gray400: "#9ca3af",
      gray300: "#d1d5db",
      lime500: "#65a30d",
      lime600: "#84cc16",
      blue500: "#3b82f6",
      blue400: "#60a5fa",
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
