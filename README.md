# Welcome to Baha Webstation Regression

This demonstration project showcases advanced automation testing techniques, designed as a blueprint to exhibit a robust testing strategy for web applications.

## Project Overview

The project demonstrates the implementation of automated tests using Playwright in JavaScript, emphasizing best practices in software testing. It includes the Page Object Model (POM) for maintainability, Object-Oriented Programming (OOP) principles for test scalability, and Continuous Integration/Continuous Deployment (CI/CD) workflows to ensure reliable software delivery.

### Key Features

Page Object Model (POM): Ensures test maintainability through a structured approach.
Object-Oriented Programming (OOP): Provides a scalable test architecture.
Continuous Integration and Continuous Deployment (CI/CD): Facilitates streamlined and automated test execution.
Multi-Tab Testing: Simulates real-world browser interactions.
Variable Naming Conventions: Promotes clean and understandable code.
Code Organization: Aids efficient test management and execution.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system. This project is built using Playwright, a Node library, to run automated tests.

### Installation

1. Install dependencies: npm install
2. Install Playwright browsers: npx playwright install

### Running Tests

To execute the tests in headless mode, modify the headless configuration in playwright.config.js or use the following command: npx playwright test --headed

### Project Structure

tests/: Contains test scripts organized by functionality.
TT POM/: Page objects for encapsulating UI interactions.
utils/: Helper functions and utilities for tests.

### CI/CD Integration

This project utilizes GitHub Actions for Continuous Integration, automatically running tests against every push and pull request. Workflow configurations can be found in .github/workflows.

## Regression Testing Instructions

For detailed regression testing instructions and methodologies applied in this project, please refer to the comprehensive guide:

[Regression Instructions](./Regression_instructions/Regression_instructions.docx)

Each test folder is named after the instruction page it corresponds to, and every test is annotated with numbers indicating the specific part of the test it covers.
