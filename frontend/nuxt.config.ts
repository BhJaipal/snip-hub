// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	tailwindcss: {
		cssPath: "./app.css",
		configPath: "./tailwind.config.js"
	},
	runtimeConfig: {
		githubApiToken: process.env.GITHUB_API_TOKEN
	},
	devtools: { enabled: true },
	modules: [
		"nuxt-icon",
		"@nuxt/image",
		"@nuxt/ui",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@nuxt/content"
	],
	content: {},
	alias: {
		"#components": "./.nuxt/components.d.ts",
		"~~": "./assets"
	}
});
