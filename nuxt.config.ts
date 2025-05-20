import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    './modules/calendar',
  ],

  css: ['~/assets/css/main.css'],

  pinia: {
    storesDirs: ['./stores/**', './modules/calendar/stores/**'],
  },

  imports: {
    dirs: ['composables', './modules/calendar/composables/**']
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    baseURL: '/roadsurfer-frontend-coding-challenge/'
  }
})