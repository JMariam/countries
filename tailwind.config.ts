import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xl': '1280px',
      'lg': '1024px',
      'md': '768px',
      'sm': '560px',
    },
    extend: {
      colors: {
       'dark-mode-element': 'hsl(209, 23%, 22%)',
       'dark-mode-background': 'hsl(207, 26%, 17%)',
       'very-dark-blue': 'hsl(200, 15%, 8%)',
       'dark-grey': 'hsl(0, 0%, 52%)',
       'very-light-grey': 'hsl(0, 0%, 98%)',
       'white': 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
