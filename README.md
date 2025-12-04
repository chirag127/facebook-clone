# ConnectSphere-Social-Networking-React-Native-Engine

![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/ConnectSphere-Social-Networking-React-Native-Engine/ci.yml?style=flat-square&logo=github)
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ConnectSphere-Social-Networking-React-Native-Engine?style=flat-square&logo=codecov)
![Tech Stack](https://img.shields.io/badge/TechStack-RN%2BNodeJS%2BMongoDB-blue?style=flat-square&logo=react)
![Lint/Format](https://img.shields.io/badge/Lint--Format-Biome-brightgreen?style=flat-square&logo=biome)
![License](https://img.shields.io/github/license/chirag127/ConnectSphere-Social-Networking-React-Native-Engine?style=flat-square&logo=github)
![GitHub Stars](https://img.shields.io/github/stars/chirag127/ConnectSphere-Social-Networking-React-Native-Engine?style=flat-square&logo=github)

<p align="center">
  <a href="https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine">
    <img src="https://img.shields.io/github/stars/chirag127/ConnectSphere-Social-Networking-React-Native-Engine?style=social&label=Star%20this%20Repo" alt="Star this Repo">
  </a>
</p>

## Project Overview

ConnectSphere is a robust, full-stack social networking engine designed for modern mobile applications. Built with React Native, Node.js (Express), and MongoDB, it provides a comprehensive boilerplate for developing features such as user authentication, dynamic news feeds, intricate friend management systems, and real-time notification capabilities.

## Architecture

This project employs a **Full-Stack Modular Monolith** architecture, ensuring cohesive development and maintainability while facilitating clear separation of concerns between the frontend (React Native) and backend (Node.js/Express). The database layer utilizes MongoDB for flexible and scalable data storage.

mermaid
graph TD
    A[React Native Mobile Client] --> B(API Gateway / Express Server)
    B --> C{MongoDB Database}
    B --> D[Real-time Service (e.g., Socket.IO)]
    D --> A


## Table of Contents

*   [Features](#features)
*   [Tech Stack](#tech-stack)
*   [Getting Started](#getting-started)
*   [Development Standards](#development-standards)
*   [AI Agent Directives](#ai-agent-directives)

## Features

*   **User Authentication:** Secure sign-up, login, and profile management.
*   **News Feed:** Dynamic content aggregation and display.
*   **Friend Management:** Add, remove, and manage connections.
*   **Real-time Notifications:** Instant updates for user activities.
*   **Scalable Backend:** Built on Node.js and Express for performance.
*   **Flexible Database:** MongoDB for efficient data handling.

## Tech Stack

*   **Mobile Frontend:** React Native (Expo managed workflow)
*   **Backend API:** Node.js, Express.js
*   **Database:** MongoDB
*   **Real-time Communication:** Socket.IO (or similar)
*   **Language:** JavaScript (ESNext)
*   **Linting & Formatting:** Biome
*   **Testing:** Vitest (Unit/Integration), Playwright (E2E)

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or Yarn
*   MongoDB installed and running
*   Expo CLI installed (`npm install -g expo-cli`)

### Installation & Setup

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine.git
    cd ConnectSphere-Social-Networking-React-Native-Engine
    

2.  **Install Backend Dependencies:**
    bash
    cd backend
    npm install
    # Or yarn install
    

3.  **Install Frontend Dependencies:**
    bash
    cd ../frontend
    npm install
    # Or yarn install
    

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory based on the provided `.env.example`.

5.  **Start MongoDB:**
    Ensure your MongoDB server is running.

### Running the Application

1.  **Start the Backend Server:**
    bash
    cd backend
    npm start
    # Or yarn start
    

2.  **Start the Frontend Development Server:**
    bash
    cd ../frontend
    npm start
    # Or yarn start
    

## Development Standards

*   **SOLID Principles:** Adhere to the Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
*   **DRY (Don't Repeat Yourself):** Avoid redundant code through abstraction and modularity.
*   **YAGNI (You Ain't Gonna Need It):** Implement only necessary features to maintain agility and reduce complexity.
*   **Error Handling:** Implement robust, consistent error handling across both frontend and backend.
*   **Code Reviews:** All code changes must pass through a peer review process.

## AI Agent Directives

<details>
<summary>Click to expand AI Agent Directives</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend)**
    *   **Stack:** This project leverages **TypeScript 6.x** (Strict mode enabled), **Vite 7** (with Rolldown bundler), **React 20 (Next.js 15)**, **TailwindCSS v4**, and **Tauri v2.x** for desktop applications (if applicable).
    *   **State Management:** Standardized on **Signals** (e.g., Preact Signals, SolidJS Signals pattern).
    *   **Linting & Formatting:** **Biome** (for unparalleled speed and comprehensive checks).
    *   **Testing:** **Vitest** for unit and integration tests, **Playwright** for end-to-end (E2E) testing.
    *   **Architecture:** Adheres to **Feature-Sliced Design (FSD)** for scalable frontend architecture.

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Low Level)**
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **TERTIARY SCENARIO C: DATA / AI / SCRIPTS (Python)**
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.

---

## 4. APEX NAMING CONVENTION (THE "STAR VELOCITY" ENGINE)

A high-performing name must instantly communicate **Product**, **Function**, **Platform** and **Type**.

**Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>`
**Format:** `Title-Case-With-Hyphens` (e.g., `ChatFlow-AI-Powered-Real-Time-Chat-Web-App` or `ZenRead-Book-Reader-CLI-Tool`).

**Rules:**
1.  **Length:** 3 to 10 words.
2.  **Keywords:** MUST include high-volume terms.
3.  **Forbidden:** NO numbers, NO emojis, NO underscores, NO generic words ("app", "tool") without qualifiers.

---

## 5. CODE QUALITY & VERIFICATION PROTOCOLS

*   **Static Analysis:** Employ **Biome** for linting and formatting. All code must pass Biome checks without warnings or errors.
*   **Unit & Integration Testing:** Utilize **Vitest**. Aim for a minimum of **85% code coverage**. Tests must cover core logic, edge cases, and API interactions.
*   **End-to-End (E2E) Testing:** Employ **Playwright**. Critical user flows must be covered by E2E tests.
*   **Dependency Management:** Use `npm` or `yarn`. Keep dependencies updated to the latest stable versions.
*   **Security:** Regularly scan for vulnerabilities. Follow OWASP Top 10 best practices.

---

## 6. CONTRIBUTING & COLLABORATION

*   **Branching Strategy:** Utilize Gitflow or a similar robust branching model.
*   **Pull Requests:** All PRs must include clear descriptions, link to relevant issues, and pass all CI checks.
*   **Code Reviews:** Mandatory peer review for all merged code.

---

## 7. DOCUMENTATION & KNOWLEDGE MANAGEMENT

*   **README:** Comprehensive and up-to-date README is the **SSOT** for project overview, setup, and usage.
*   **API Documentation:** Auto-generate API docs where applicable (e.g., using JSDoc for backend).
*   **Architectural Diagrams:** Maintain up-to-date diagrams (Mermaid, PlantUML) in documentation.

---

## 8. DEPLOYMENT & CI/CD

*   **CI/CD Pipeline:** Maintain a robust CI/CD pipeline (GitHub Actions) for automated testing, linting, and deployment.
*   **Environment Management:** Utilize clear staging and production environments.

---

## 9. ISSUE MANAGEMENT & FEEDBACK

*   **Issue Templates:** Use defined issue templates (Bug Report, Feature Request) for structured feedback.
*   **Pull Request Templates:** Standardize PR submissions with templates.

</details>
