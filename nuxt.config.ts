export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  typescript: {
    strict: false,
    builder: 'vite',
    typeCheck: false, 
    tsConfig: {
      "compilerOptions": {
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "noEmit": true
      },
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@formkit/auto-animate",
  ],


  shadcn: { prefix: "", componentDir: "./components/ui"},

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
      exclude: ["/terms", "/privacy", "/invoice", "/*"],
      cookieRedirect: true,
    },
  },
  compatibilityDate: "2024-07-28",
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
});
