export default ({
    meta: {
        type: 'dashboard',
        framework: ['nuxt 3', 'Vue3'],
        ui: ['tailwind css', 'tailwind-animate', 'shadcn-ui/vue', 'nuxt-ui'],
        icons: ['phosphor-icons'],
        service: ['supabase', 'nuxt server api'],
        language: 'typescript',
        database: 'nuxt-js/supabse',
        auth: 'supabase',
        hosting: 'vercel',
    },
    rules: {
        'refactor': ['try-design-system', 'use-shadcn-ui-vue', 'use-phosphor-icons', 'use-nuxt-js-supabase', 'use-tailwind-css', 'use-tailwind-animate'],
        'best-practices': ['error-handling-with-try-catch', 'detailed-format-logging', 'no-huge-component', 'use-database-types', 'use-color-variables', 'use-nuxt-js-supabase'],
        'performance': ['use-nuxt-ui', 'use-phosphor-icons', 'use-supabase', 'use-nuxt-js-supabase'],
        'style': ['use-tailwind-css', 'use-tailwind-animate', 'support-mobile-responsive', 'use-shadcn-ui-vue', 'use-nuxt-ui'],
    },
    docs: {
        'shadcn-ui/vue': '/Users/clayzhang/Code/nimship-admin-nuxt/public/shadcn-ui-vue.md',
        'nuxt-ui': '/Users/clayzhang/Code/nimship-admin-nuxt/public/nuxt-ui.md',
        'color-variables': '/Users/clayzhang/Code/nimship-admin-nuxt/public/color-variables.md',
        'database-types': '/Users/clayzhang/Code/nimship-admin-nuxt/types/database.ts'
    }
})