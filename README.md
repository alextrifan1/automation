# Automated E2E Testing Framework with WebdriverIO and TypeScript

## Project Overview

This project is a test automation framework for conducting end-to-end (E2E) & api testing on web applications. It is built using WebdriverIO. The project is written in TypeScript and utilizes Mocha as the test framework along with the Expect-WebdriverIO assertion library.

### Key Technologies

*   **Test Framework:** WebdriverIO (`@wdio/cli`)
*   **Test Runner:** WebdriverIO Local Runner (`@wdio/local-runner`)
*   **Assertion Library:** Expect-WebdriverIO
*   **UI Test Framework:** Mocha (`@wdio/mocha-framework`)
*   **Language:** TypeScript
*   **Code Quality:** ESLint (linting) and Prettier (formatting)
*   **Environment Variables:** `dotenv`

## Building and Running

### Prerequisites

*   Node.js (version 20 or higher)
*   npm (Node Package Manager)

### Installation

To install the project dependencies, run the following command in the root directory:

```bash
npm install
```

### Running Tests

To execute the E2E tests, use the following command:

```bash
npm run test
```

This command will run all the test files located in the `test/specs` directory. To run a specific test file, you can set the `SPEC_TO_RUN` environment variable:

```bash
SPEC_TO_RUN=./test/specs/l_001.e2e.ts npm run test
```

## Development Conventions

### Project Structure

The project follows a standard structure for WebdriverIO projects, with a clear separation of concerns:

*   `test/specs`: Contains the test files (e.g., `l_001.e2e.ts`).
*   `test/pageobjects`: Contains the page objects, which encapsulate the logic for interacting with specific pages of the application.
*   `test/locators`: Contains the locators (e.g., CSS selectors) for the elements on the pages.
*   `test/utils`: Contains utility functions that can be reused across the tests.
*   `wdio.conf.ts`: The main configuration file for WebdriverIO.
*   `package.json`: Defines the project's dependencies and scripts.
*   `tsconfig.json`: The configuration file for the TypeScript compiler.

### Coding Style

The project uses ESLint and Prettier to enforce a consistent coding style. Before committing any code, it is recommended to run the linting and formatting scripts to ensure that the code adheres to the project's standards.

### Continuous Integration

The project is configured with a GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically runs the tests, linter, and formatter on every push and pull request to the `main` branch. This ensures that the codebase remains in a healthy state. If the tests fail, screenshots are uploaded as artifacts to the workflow run.
