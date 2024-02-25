// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	tailwindcss: {
		cssPath: "./app.css",
		configPath: "./tailwind.config.js"
	},
	plugins: ["./plugins/apollo.ts"],
	devtools: { enabled: true },
	modules: ["nuxt-icon", "@nuxt/image", "@nuxt/ui", "@nuxtjs/tailwindcss"],
	app: {
		head: {
			link: [
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/icon?family=Material+Icons"
				}
			]
		}
	}
});
