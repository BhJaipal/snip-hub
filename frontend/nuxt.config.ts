// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	tailwindcss: {
		cssPath: "./app.css",
		configPath: "./tailwind.config.js"
	},
	devtools: { enabled: true },
	modules: [
		"nuxt-icon",
		"@nuxt/image",
		"@nuxt/ui",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt"
	],
	alias: {
		server: "./server",
		composables: "./composables",
		"#components": "./.nuxt/components.d.ts",
		"~~": "./assets",
		"~/plugins": "./plugins"
	}
});
