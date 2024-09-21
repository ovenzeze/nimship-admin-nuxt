# Project Structure

This document provides an overview of the project's directory structure and the purpose of each major directory and file.

## Root Directory

- `pages/`: Contains Vue components representing individual pages of the application.
- `components/`: Houses reusable Vue components used throughout the application.
- `composables/`: Contains Vue composition functions for shared logic.
- `utils/`: Utility functions and helper modules.
- `types/`: TypeScript type definitions.
- `docs/`: Project documentation.
- `public/`: Static assets that are served directly.
- `assets/`: Other assets that may require processing before being served.
- `layouts/`: Nuxt layouts for structuring page templates.
- `middleware/`: Nuxt middleware for adding logic to be run before rendering a page or group of pages.
- `plugins/`: Vue plugins and other JavaScript plugins.
- `store/`: (If using Vuex) State management files.
- `tests/`: Test files for the application.

## Configuration Files

- `nuxt.config.ts`: Main configuration file for Nuxt.js.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.
- `.eslintrc.js`: ESLint configuration for code linting.
- `.prettierrc`: Prettier configuration for code formatting.

## Other Important Files

- `README.md`: Project overview and setup instructions.
- `.gitignore`: Specifies files that Git should ignore.
- `Dockerfile` (if present): Instructions for building a Docker container for the application.

For a more detailed breakdown of the project structure, refer to the `utils/outline.ts` file.
