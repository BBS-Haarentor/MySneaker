import  { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1a202c",
        "secondary-dark": "#151a23",
        "primary-light": "#f7fafc",
        "secondary": "#4fd1c5",
      }
    },
  },
  plugins: [],
}
export default config
