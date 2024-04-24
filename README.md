# Welcome to Baha Webstation Regression

+ This demonstration project illustrates advanced automation testing strategies for web applications, serving as a blueprint to showcase best practices and robust testing frameworks utilizing Playwright in JavaScript.

### Project Overview

+ The Baha Webstation Regression project represents automation testing techniques to ensure comprehensive and reliable software delivery. Key features include:

+ **Page Object Model (POM):** Enhances maintainability through a structured approach to scripting tests.

+ **Object-Oriented Programming (OOP):** Ensures scalability and reusability across testing scenarios.

+ **Continuous Integration and Deployment (CI/CD):** Automates the testing process, integrating seamlessly with GitHub Actions to support continuous quality assurance.

+ **Multi-Tab Testing:** Simulates complex user interactions to mimic real-world usage.

+ **Code Standards:** Adheres to best practices for coding and naming conventions, promoting readability and maintainability.

## Getting Started

### Prerequisites

+ The project utilizes Playwright, a Node.js library for browser automation. Installation of Node.js is required to run the tests effectively.

### Setup Instructions

1. Install Dependencies: **npm install**
2. Install Required Browsers: **npx playwright install**

### Executing Tests

+ To conduct tests in a headless browser environment, adjust settings in **playwright.config.js** or execute: **npx playwright test --headed**

### Project Structure

+ **tests/:** Contains organized test scripts categorized by functionality to streamline test execution.

+ **TT POM/:** Features page objects that encapsulate UI interactions, enhancing test clarity.

+ **utils/:** Houses utilities and helper functions that support test scripts.

+ Continuous Integration and Deployment

+ The project integrates with GitHub Actions, ensuring that all tests are executed automatically upon each push or pull request, facilitating a robust development cycle. 

+ Workflow configurations can be reviewed and modified within .github/workflows.

## Regression Testing Framework

+ For detailed exploration of regression testing practices and methodologies, refer to the comprehensive guide:

[Regression Instructions](./Regression_instructions/Regression_instructions.docx)

**Test scripts are documented and numbered to correlate directly with the instruction guide, ensuring ease of navigation and clarity.**
