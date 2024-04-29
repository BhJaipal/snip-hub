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
		"#components": "./.nuxt/components.d.ts",
		"#imports": "./.nuxt/imports.d.ts",
		composables: "./composables",
		"~~": "./assets",
		"~/plugins": "./plugins",
		"#ui/types": "./node_modules/@nuxt/ui/dist/runtime/types/index.d.ts"
	}
});
