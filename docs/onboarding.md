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

## Common Workflows
1. Creating a new page
2. Adding a new component
3. Implementing a new feature
4. Fixing a bug
5. Working with Docker:
   - Rebuilding the Docker image after dependency changes: `docker-compose build`
   - Stopping the Docker container: `docker-compose down`
   - Viewing Docker logs: `docker-compose logs`

## Testing Procedures
### Local Testing
1. Running unit tests: `npm run test:unit`
2. Running end-to-end tests: `npm run test:e2e`
3. Writing new tests

### Docker Testing
1. Running tests inside Docker container: `docker-compose run --rm app npm run test`
2. Running specific test file: `docker-compose run --rm app npm run test path/to/test-file.spec.js`

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
- Docker Documentation: [https://docs.docker.com/](https://docs.docker.com/)

## Getting Help
Provide information on how to get help or who to contact for different types of issues.

## Troubleshooting
### Common Docker Issues
1. Port conflicts: If the port is already in use, modify the port mapping in `docker-compose.yml`
2. Volume mounting issues: Ensure paths in `docker-compose.yml` are correct for your system
3. Performance issues on Windows/Mac: Consider using Docker's WSL 2 backend on Windows or Docker's new virtualization framework on Mac
