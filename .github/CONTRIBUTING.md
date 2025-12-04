# 🚀 Contributing to ConnectSphere-Social-Networking-React-Native-Engine

Thank you for considering contributing to the ConnectSphere Social Networking Engine! We welcome your contributions to help make this project even better.

This project adheres to the Apex Technical Authority standards, emphasizing **Zero-Defect, High-Velocity, Future-Proof** development. Contributions should align with these principles and the established technical stack.

## 1. Code of Conduct

This project adheres to a Contributor Covenant Code of Conduct. Please review the [CODE_OF_CONDUCT.md](https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine/blob/main/CODE_OF_CONDUCT.md) to understand the expected standards of behavior.

## 2. How to Contribute

We accept contributions in various forms, including:

*   **Reporting Bugs:** Use the GitHub Issues tab to report any bugs you encounter. Please provide detailed steps to reproduce the issue.
*   **Suggesting Features:** Open an issue to discuss new features or improvements.
*   **Submitting Pull Requests:** Fork this repository, make your changes, and submit a pull request. Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## 3. Development Environment Setup

To contribute, you'll need to set up the development environment. This project uses **React Native** with **Expo**, **Node.js** (LTS recommended), and **MongoDB**.

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine.git
    cd ConnectSphere-Social-Networking-React-Native-Engine
    

2.  **Install Node.js dependencies:**
    bash
    npm install
    
    *(Ensure you have the latest LTS version of Node.js installed. Use a version manager like `nvm` or `fnm` if possible.)*

3.  **Set up MongoDB:**
    *   You can use a local MongoDB installation or a cloud-hosted instance (e.g., MongoDB Atlas).
    *   Ensure your `.env` file is configured with the correct MongoDB connection string.

4.  **Start the development server:**
    bash
    npm start # or npx expo start
    

## 4. Branching Strategy

We follow a simplified Git branching strategy:

*   `main`: Represents the stable, production-ready code.
*   `develop`: Integration branch for ongoing development. New features and bug fixes are merged here first.
*   `feature/<feature-name>`: Branches for new features.
*   `bugfix/<bug-name>`: Branches for fixing bugs.

All pull requests should target the `develop` branch unless otherwise specified.

## 5. Code Standards & Linting

This project enforces high code quality standards. We utilize **ESLint** and **Prettier** for JavaScript/TypeScript code.

*   **Linting:**
    bash
    npm run lint
    
*   **Formatting:**
    bash
    npm run format
    

Ensure your code passes linting checks before submitting a pull request. We recommend configuring your IDE to use these tools automatically.

## 6. Testing

Comprehensive testing is crucial. We use **Jest** for unit and integration testing of the backend (Node.js/Express) and **React Native Testing Library** for frontend components.

*   **Run Tests:**
    bash
    npm test
    

All new code should be accompanied by relevant tests.

## 7. Pull Request Process

1.  Ensure your branch is up-to-date with the `develop` branch (`git pull origin develop`).
2.  Run linters and tests to confirm no regressions.
3.  Write a clear and concise commit message, following Conventional Commits specifications if possible.
4.  Submit your Pull Request to the `develop` branch.
5.  Include a description of your changes and the problem they solve.
6.  Be prepared to address feedback from maintainers.

## 8. AI AGENT DIRECTIVES

This repository is managed with AI Agent directives as defined in [AGENTS.md](https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine/blob/main/AGENTS.md). Contributions should be aware of these directives.

## 9. Questions?

If you have any questions or need clarification, please open an issue.

Thank you again for contributing!
