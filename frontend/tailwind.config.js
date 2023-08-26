/** @type {import('tailwindcss').Config} */
export default {
    purge: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}", "./src/*.{vue, js, ts, tsx, jsx}", "./src/**/**/*.{vue, js, ts, tsx, jsx}"],
    content: [],
    mode: "development",
    darkMode: true,
    theme: {
          extend: {},
        },
    plugins: [],
}
