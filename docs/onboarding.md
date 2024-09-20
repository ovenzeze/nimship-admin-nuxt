# Developer Onboarding Guide

## Project Overview
Briefly describe the project, its purpose, and main features.

## Project Structure
Explain the main directories and their purposes:
- `pages`: Vue components representing pages
- `components`: Reusable Vue components
- `composables`: Vue composition functions
- `utils`: Utility functions
- `types`: TypeScript type definitions
- `docs`: Project documentation
- `tests`: Test files for the project

## Development Environment Setup
### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (if any)
4. Start the development server: `npm run dev`

### Docker Setup
1. Ensure Docker and Docker Compose are installed on your system
2. Build the Docker image: `docker-compose build`
3. Start the Docker container: `docker-compose up`
4. Access the application at `http://localhost:3000` (or the port specified in your Docker configuration)

## Coding Standards
- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Use ESLint for code linting
- Use Prettier for code formatting

## Test-Driven Development (TDD) Process
1. Write a failing test for the feature you want to implement
2. Run the test to ensure it fails
3. Write the minimum amount of code to make the test pass
4. Run the test to ensure it passes
5. Refactor the code if necessary, ensuring the test still passes
6. Repeat for each new feature or bug fix

## Testing Procedures
### Writing Tests
- Use Vitest for unit and integration testing
- Place test files in the `tests` directory, mirroring the structure of the `src` directory
- Name test files with the `.spec.ts` or `.test.ts` extension

### Running Tests
- Run all tests: `npm run test`
- Run unit tests: `npm run test:unit`
- Run integration tests: `npm run test:integration`
- Run tests in watch mode: `npm run test:watch`

### Test Coverage
- Generate test coverage report: `npm run test:coverage`
- View the coverage report in the `coverage` directory

### Docker Testing
- Run tests inside Docker container: `docker-compose run --rm app npm run test`
- Run specific test file: `docker-compose run --rm app npm run test path/to/test-file.spec.ts`

## Continuous Integration (CI) Testing
- Describe the CI/CD pipeline setup (e.g., GitHub Actions, GitLab CI)
- Explain how tests are automatically run on pull requests
- Describe any quality gates that must be passed before merging

## Common Workflows
1. Creating a new feature
   a. Create a new branch
   b. Write failing tests for the feature
   c. Implement the feature, making the tests pass
   d. Refactor if necessary
   e. Submit a pull request
2. Fixing a bug
   a. Create a new branch
   b. Write a failing test that reproduces the bug
   c. Fix the bug, making the test pass
   d. Submit a pull request
3. Refactoring
   a. Ensure all tests are passing
   b. Make small, incremental changes
   c. Run tests after each change to ensure nothing breaks

## Deployment
Explain the deployment process and any CI/CD pipelines in use.

### Docker Deployment
1. Build the production Docker image: `docker build -t your-app-name:latest .`
2. Push the image to your container registry: `docker push your-registry/your-app-name:latest`
3. Deploy the image to your production environment (this step may vary depending on your hosting setup)

## Useful Resources
- Vue 3 Documentation: [https://v3.vuejs.org/](https://v3.vuejs.org/)
- Nuxt 3 Documentation: [https://nuxt.com/docs](https://nuxt.com/docs)
- TypeScript Documentation: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- Vitest Documentation: [https://vitest.dev/guide/](https://vitest.dev/guide/)
- Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)

## Getting Help
Provide information on how to get help or who to contact for different types of issues.

## Troubleshooting
### Common Docker Issues
1. Port conflicts: If the port is already in use, modify the port mapping in `docker-compose.yml`
2. Volume mounting issues: Ensure paths in `docker-compose.yml` are correct for your system
3. Performance issues on Windows/Mac: Consider using Docker's WSL 2 backend on Windows or Docker's new virtualization framework on Mac

### Common Testing Issues
1. Tests failing unexpectedly: Ensure all dependencies are up to date
2. Slow tests: Consider using Vitest's --maxWorkers flag to limit the number of workers
3. Mocking issues: Make sure to properly mock external dependencies in unit tests
