// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "@nuxtjs/tailwindcss",
      "nuxt-icon",
      "@nuxt/image"
  ],
    app: {
      head: {
          link: [
              { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}
          ]
      }
    }
})
