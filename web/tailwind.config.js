import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        "accurate-dark": {
          extend: "dark",
          colors: {
            background: "#242427",
            foreground: "#ffffff",
            primary: {
              50: "#240122",
              100: "#3a0e36",
              200: "#51164b",
              300: "#681c5f",
              400: "#802573",
              500: "#993287",
              600: "#b94aa1",
              700: "#d973bb",
              800: "#edabda",
              900: "#f8d6ee",
              DEFAULT: "#6a2161",
              foreground: "#ffffff",
            },
            focus: "#b94aa1",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
}
