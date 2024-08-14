export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
    "nuxt-icons",
    "@nuxtjs/i18n",
    "nuxt-lucide-icons"
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
  imports: { dirs: ['composables', '~/components/ui/**'] },
  runtimeConfig: { public: {} },
  compatibilityDate: '2024-07-28',
  components: [{ path: '~/components', pathPrefix: false, extensions: ['vue'], priority: 99 }],
})