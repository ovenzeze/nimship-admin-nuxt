export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
    "nuxt-icons",
    "@nuxtjs/i18n",
    "nuxt-lucide-icons",
    '@nuxt/content',
    "@nuxt/icon"
  ],

  shadcn: { prefix: '', componentDir: './components/ui' },

  googleFonts: {
    display: 'swap',
    download: true,
    preload: true,
    useStylesheet: true,
    families: {
      Roboto: true,
      Inter: [400, 700],
      'Crimson Text': [400, 600, 700],
      'Noto Sans SC': [400, 600],
    }
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/terms', '/privacy'],
    }
  },

  build: {
    transpile: ['vee-validate'],
  },

  imports: { dirs: ['composables', '~/components/ui/**'] },
  runtimeConfig: { public: {} },
  compatibilityDate: '2024-07-28',
  components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'], priority: 99 }],
})