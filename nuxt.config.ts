export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
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
}) 