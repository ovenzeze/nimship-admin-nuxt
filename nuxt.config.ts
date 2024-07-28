export default defineNuxtConfig({
  pages: true,
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', "@nuxtjs/supabase"],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  compatibilityDate: '2024-07-28',
})