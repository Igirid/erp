// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-echarts",
    "nuxt-lucide-icons",
    "@primevue/nuxt-module",
    "@nuxtjs/color-mode",
    "@nuxt/image",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      theme: {
        preset: "Aura",
        options: {
          prefix: "p",
          // darkModeSelector: "system",
          cssLayer: false,
        },
      },
    },
  },
  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
  },
});