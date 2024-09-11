export const projectConfig = {
  meta: {
    type: "dashboard",
    framework: ["nuxt 3", "Vue3"],
    ui: ["tailwind css", "shadcn-ui/vue", "nuxt-ui"],
    icons: [],
    service: ["supabase", "nuxt server api"],
    language: "typescript",
    database: "nuxt-js/supabase",
    auth: "supabase",
    hosting: "vercel",
    i18n: "nuxt-i18n",
    content: "@nuxt/content",
    animation: "@formkit/auto-animate",
    fonts: "@nuxtjs/google-fonts",
  },
  rules: {
    refactor: [
      "try-design-system",
      "use-shadcn-ui-vue",
      "use-nuxt-js-supabase",
      "use-tailwind-css",
    ],
    "best-practices": [
      "error-handling-with-try-catch",
      "detailed-format-logging",
      "no-huge-component",
      "use-database-types",
      "use-color-variables",
      "use-nuxt-js-supabase",
      "use-i18n-for-localization",
      "use-nuxt-content-for-static-content",
      "use-auto-animate-for-smooth-transitions",
      "optimize-font-loading-with-google-fonts",
      "use-typescript-with-strict-mode-off",
      "skip-lib-check-for-performance",
    ],
    performance: [
      "use-nuxt-ui",
      "use-supabase",
      "use-nuxt-js-supabase",
      "use-google-fonts-with-optimization",
    ],
    style: [
      "use-tailwind-css",
      "support-mobile-responsive",
      "use-shadcn-ui-vue",
      "use-nuxt-ui",
    ],
  },
  docs: {
    "shadcn-ui/vue": "/Users/clayzhang/Code/nimship-admin-nuxt/public/shadcn-ui-vue.md",
    "nuxt-ui": "/Users/clayzhang/Code/nimship-admin-nuxt/public/nuxt-ui.md",
    "color-variables": "/Users/clayzhang/Code/nimship-admin-nuxt/public/color-variables.md",
    "database-types": "/Users/clayzhang/Code/nimship-admin-nuxt/types/database.ts",
  },
  guidelines: {
    pageArchitecture: [
      "Implement state management (e.g., Pinia) for complex state handling across components",
      "Add a driver details page for comprehensive individual driver views",
      "Implement error boundaries for graceful error handling and display",
    ],
    componentDivision: {
      existingComponents: {
        DriverFilter: [
          "Break down into smaller components (WarehouseFilter, TeamFilter, etc.) if it becomes more complex",
          "Implement more advanced search functionality",
          "Utilize the NimshipFilter component for flexible filter rendering",
          "Implement horizontal scrolling for filters when space is limited",
        ],
        NimshipFilter: [
          "Integrate ButtonSwitcher component for improved user experience with fewer options",
          "Implement dynamic rendering based on the number of options and 'as' prop",
          "Handle both ButtonSwitcher and Select rendering within the same component",
        ],
        ButtonSwitcher: [
          "Use for toggle-style selection of filter options when there are 3 or fewer choices",
          "Ensure consistent styling with other UI components",
          "Implement proper accessibility features for keyboard navigation and screen readers",
        ],
        DriverTable: [
          "Create separate components for different cell types (StatusCell, RatingCell, etc.)",
          "Implement a separate DriverActionMenu component for the dropdown in each row",
        ],
        DriverDialog: [
          "Split into smaller components: DriverPersonalInfo, DriverEmploymentInfo, DriverLicenseInfo",
        ],
      },
      newComponents: [
        "DriverStats: To display key statistics about drivers",
        "DriverBulkActions: For performing actions on multiple selected drivers",
      ],
    },
    uiLayout: [
      "Implement a responsive design for mobile devices",
      "Enhance the DriverTable with column resizing, sticky headers, and row selection",
      "Improve the filter section with presets, advanced search, and horizontal scrolling",
      "Add a dashboard section with key metrics and charts",
      "Improve accessibility with ARIA labels and keyboard navigation",
    ],
    performanceOptimizations: [
      "Implement virtualization for the DriverTable to handle large datasets efficiently",
      "Use debounce for filter inputs to reduce unnecessary API calls",
      "Implement pagination or infinite scrolling for large datasets",
    ],
    additionalFeatures: [
      "Implement export functionality (CSV, PDF) for driver data",
      "Add a driver import feature for bulk adding of drivers",
      "Implement a change history or audit log for driver information changes",
    ],
    codeImprovements: [
      "Standardize error handling across components",
      "Implement more robust type checking, especially for API responses",
      "Consider using a form library like vee-validate consistently across all forms",
      "Implement unit and integration tests for critical components and functions",
      "Ensure proper prop validation and default values in all components",
    ],
    uxEnhancements: [
      "Add tooltips for complex fields or actions",
      "Implement inline editing for quick updates in the DriverTable",
      "Add confirmation dialogs for critical actions (e.g., deleting a driver)",
      "Implement a 'What's New' feature to highlight recent changes or new features",
      "Ensure smooth transitions when switching between ButtonSwitcher and Select in NimshipFilter",
    ],
  },
};

export default projectConfig;
