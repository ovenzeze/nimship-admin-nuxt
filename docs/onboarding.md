# Developer Onboarding Guide

## Project Structure Overview

The Nimship Admin project follows a typical Nuxt 3 structure with some custom directories:

```
nimship-admin-nuxt/
├── components/       # Vue components
│   └── ui/           # Reusable UI components
├── composables/      # Vue 3 Composition API functions
├── layouts/          # Page layouts
├── pages/            # Application pages and routes
├── plugins/          # Nuxt plugins
├── public/           # Static assets
├── server/           # Server-side code
├── stores/           # Pinia stores
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── tests/            # Test files
```

## Development Workflow

1. **Issue Tracking**: All tasks are tracked as issues in our project management tool.
2. **Branching**: Create a new branch for each feature or bug fix, named according to the issue (e.g., `feature/issue-123` or `bugfix/issue-456`).
3. **Development**: Write code and tests for your feature or bug fix.
4. **Testing**: Run tests locally to ensure all existing and new tests pass.
5. **Code Review**: Submit a pull request for review. At least one approval is required before merging.
6. **Continuous Integration**: Our CI pipeline will run tests and linting checks on your PR.
7. **Merging**: Once approved and CI checks pass, merge your branch into the main branch.

## Code Style and Best Practices

- Follow the Vue 3 Style Guide: [https://v3.vuejs.org/style-guide/](https://v3.vuejs.org/style-guide/)
- Use TypeScript for type safety
- Write unit tests for all new features and bug fixes
- Use Composition API for new components
- Keep components small and focused on a single responsibility
- Use Pinia for state management
- Follow the SOLID principles in your code design

## Testing

### Running Tests
- Run all tests: `pnpm test`
- Run unit tests: `pnpm test:unit`
- Run integration tests: `pnpm test:integration`
- Run tests in watch mode: `pnpm test:watch`

### Test Coverage
- Generate test coverage report: `pnpm test:coverage`
- View the coverage report in the `coverage` directory

### Docker Testing
- Run tests inside Docker container: `docker-compose run --rm app pnpm test`
- Run specific test file: `docker-compose run --rm app pnpm test path/to/test-file.spec.ts`

## Continuous Integration (CI) Testing
- We use GitHub Actions for our CI/CD pipeline
- Tests are automatically run on all pull requests
- Code coverage must not decrease for PRs to be merged

## Deployment

We use Docker for our deployment process:

1. Build the production Docker image: `docker build -t nimship-admin:latest .`
2. Push the image to our container registry: `docker push our-registry/nimship-admin:latest`
3. Our CD pipeline will deploy the new image to the staging environment for final testing before production deployment

## Frequently Asked Questions

1. **Q: How do I add a new page to the application?**
   A: Create a new `.vue` file in the `pages` directory. Nuxt will automatically create a route for this page.

2. **Q: How do I add a new API endpoint?**
   A: Create a new file in the `server/api` directory. Nuxt will automatically create an API route for this endpoint.

3. **Q: How do I add a new store?**
   A: Create a new file in the `stores` directory using Pinia's `defineStore` function.

4. **Q: How do I run the application in development mode?**
   A: Run `pnpm dev` in the project root directory.

5. **Q: How do I debug the application?**
   A: You can use Vue Devtools for frontend debugging and Node.js debugging tools for backend debugging.

## Getting Help

If you encounter any issues or have questions:

1. Check the project documentation in the `docs` directory
2. Ask in the #nimship-admin channel on Slack
3. Reach out to the tech lead or your assigned mentor

Remember, there are no silly questions. If you're stuck, it's always better to ask for help than to spend too much time struggling alone!

## Useful Resources

- Vue 3 Documentation: [https://v3.vuejs.org/](https://v3.vuejs.org/)
- Nuxt 3 Documentation: [https://nuxt.com/docs](https://nuxt.com/docs)
- TypeScript Documentation: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- Vitest Documentation: [https://vitest.dev/guide/](https://vitest.dev/guide/)
- Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)
- Pinia Documentation: [https://pinia.vuejs.org/](https://pinia.vuejs.org/)

Welcome to the team! We're excited to have you on board and look forward to your contributions to the Nimship Admin project.
