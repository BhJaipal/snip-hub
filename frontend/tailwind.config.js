/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./*.css",
    "./error.{vue,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

