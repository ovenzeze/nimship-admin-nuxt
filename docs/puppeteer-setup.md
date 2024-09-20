# Puppeteer Setup Guide

This guide will help you set up and use Puppeteer for headless browser testing in this project.

## Installation

Puppeteer is already included as a project dependency. To ensure it's properly installed, run:

```bash
npm install
```

## Common Issues and Solutions

### Error: Chrome executable not found

If you encounter this error, it might be because the Chrome binary wasn't downloaded correctly. Try the following:

1. Manually install Puppeteer:
   ```bash
   npm install puppeteer
   ```

2. If the above doesn't work, you can try installing Puppeteer with a specific Chrome version:
   ```bash
   npm install puppeteer@chrome-89
   ```

### Error: Protocol error (Runtime.callFunctionOn): Session closed.

This error often occurs when the browser closes unexpectedly. Ensure that your tests are not closing the browser prematurely.

## Basic Usage in the Project

Here's a basic example of how to use Puppeteer in your tests:

```javascript
const puppeteer = require('puppeteer');

async function runTest() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Perform actions and assertions here
  
  await browser.close();
}

runTest();
```

## Best Practices

1. Always close the browser after your tests are complete.
2. Use `page.waitForSelector()` to ensure elements are loaded before interacting with them.
3. For debugging, you can launch Puppeteer in non-headless mode:
   ```javascript
   const browser = await puppeteer.launch({ headless: false });
   ```

## Further Reading

- [Puppeteer API Documentation](https://pptr.dev/)
- [Puppeteer GitHub Repository](https://github.com/puppeteer/puppeteer)

If you encounter any issues not covered in this guide, please refer to the Puppeteer documentation or seek help from the development team.
