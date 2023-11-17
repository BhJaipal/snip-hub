// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
      "@nuxtjs/tailwindcss",
      "nuxt-icon"
  ],
    app: {
      head: {
          link: [
              { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}
          ]
      }
    }
})
