import { resolve } from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: false },
  pages: true,

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimum-scale=1'
    }
  },

  modules: [
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxtjs/supabase",
    "@formkit/auto-animate",
    "@nuxt/ui",
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  shadcn: { prefix: "", componentDir: "./components/ui" },

  googleFonts: {
    display: "swap",
    download: true,
    preload: true,
    useStylesheet: true,
    families: {
      Roboto: true,
      Inter: [400, 700],
      "Crimson Text": [400, 600, 700],
      "Noto Sans SC": [400, 600],
    },
  },

  content: {
    documentDriven: true,
    // navigation: { fields: ['auth', 'publishedAt'] },
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
    },
    sources: {
      content: { driver: 'fs', base: resolve(__dirname, 'docs'), prefix: '/docs' },

    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/terms", "/privacy", "/invoice", "/agent", "*"],
      cookieRedirect: true,
    },
  },

  components: [
    {
      path: "./components",
      pathPrefix: false,
      extensions: ["vue"],
      priority: 99,
    },
    {
      path: "./components/ui",
      pathPrefix: false,
      extensions: ["vue"],
      priority: 100,
    },
  ],

  compatibilityDate: "2024-09-26",
};