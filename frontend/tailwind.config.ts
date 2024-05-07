import type { Config } from "tailwindcss";
const config: Config = {
	darkMode: "selector",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.{vue,js,ts}",
		"./pages/**/*.{vue,js,ts}",
		"./plugins/**/*.{js,ts}",
		"./*.css",
		"./error.{vue,js,ts}",
		"./app.vue"
	],
	theme: {
		extend: {}
	},
	plugins: []
};
export default config;
