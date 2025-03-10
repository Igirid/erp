// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ["/"], // Ensures the homepage is generated
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-echarts",
    "nuxt-lucide-icons",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: "Aura",
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false,
        },
      },
    },
  },
});
