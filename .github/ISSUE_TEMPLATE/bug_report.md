---
name: Bug Report
about: "Suggest a bug fix for this project"
title: "[BUG] - "
labels: "bug"
assignees: "chirag127"

body:
  - type: markdown
    attributes:
      value: |+
        ### Thank you for reporting a bug!

        Please provide as much detail as possible to help us reproduce and fix the issue.

        **Project:** ConnectSphere-Social-Networking-React-Native-Engine
        **Repository:** [https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine](https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine)

        --- 
  - type: input
    id: "problem"
    attributes:
      label: "What is the expected behavior?"
      description: "Describe what you expected to happen."
      placeholder: "e.g., Users should be able to log in with valid credentials."
    validations:
      required: true
  - type: input
    id: "current-behavior"
    attributes:
      label: "What is the actual behavior?"
      description: "Describe what happened instead."
      placeholder: "e.g., The login button is unresponsive, and no error is shown."
    validations:
      required: true
  - type: textarea
    id: "steps-to-reproduce"
    attributes:
      label: "Steps to Reproduce"
      description: "Provide a clear, step-by-step guide to reproduce the bug."
      placeholder: |
        1. Go to the login screen.
        2. Enter valid username and password.
        3. Tap the 'Login' button.
        4. Observe the unexpected behavior.
    validations:
      required: true
  - type: input
    id: "environment"
    attributes:
      label: "Environment"
      description: "Please specify the environment where you encountered the bug (e.g., OS, Browser/App Version, Device Model)."
      placeholder: "e.g., Android 13, Samsung Galaxy S22, React Native 0.74.1"
    validations:
      required: true
  - type: textarea
    id: "additional-context"
    attributes:
      label: "Additional Context"
      description: "Add any other context about the problem here. Screenshots, error logs, or relevant code snippets are highly appreciated."
      placeholder: |
        Paste any relevant logs, error messages, or screenshots here.
        (Note: You can attach files directly to the issue.)
    validations:
      required: false
  - type: markdown
    attributes:
      value: |+
        --- 

        #### System & Agent Directives
        This report is being processed within the **ConnectSphere-Social-Networking-React-Native-Engine** project, adhering to the **Apex Technical Authority** standards.
        For technical details and architectural guidelines, please refer to the project's **AGENTS.md** file.
        [AGENTS.md](https://github.com/chirag127/ConnectSphere-Social-Networking-React-Native-Engine/blob/main/.github/AGENTS.md)
