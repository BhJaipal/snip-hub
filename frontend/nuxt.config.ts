// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	tailwindcss: {
		cssPath: "./app.css",
		configPath: "./tailwind.config.js"
	},
	devtools: { enabled: true },
	modules: ["nuxt-icon", "@nuxt/image", "@nuxt/ui"],
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
