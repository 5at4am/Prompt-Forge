# Contributing to PromptForge

Thank you for considering contributing to PromptForge! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How Can I Contribute?

### Reporting Bugs

- **Use the GitHub issue tracker** — Check if the bug has already been reported by searching on GitHub under Issues.
- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps to reproduce the problem** in as much detail as possible.
- **Provide specific examples** to demonstrate the steps.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots or animated GIFs** if possible.

### Suggesting Enhancements

- **Use the GitHub issue tracker** — Check if the enhancement has already been suggested.
- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
- **Provide specific examples to demonstrate the steps** or point out the part of PromptForge where the enhancement should be applied.
- **Explain why this enhancement would be useful** to most PromptForge users.

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Include screenshots and animated GIFs in your pull request whenever possible
- Follow the JavaScript and CSS styleguides
- Include adequate tests
- Document new code
- End all files with a newline

## Development Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git

### Setup Steps

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/Prompt-Forge.git
   cd Prompt-Forge
   ```
3. Install dependencies:
   ```bash
   # Server dependencies
   cd prop/server
   npm install
   
   # Client dependencies
   cd ../client
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the server directory based on the README instructions
5. Start the development servers:
   ```bash
   # Start server (from server directory)
   npm run dev
   
   # Start client (from client directory)
   npm run dev
   ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

- All JavaScript code is linted with ESLint
- Use ES6 syntax where possible
- Use semicolons
- 2 spaces for indentation
- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Prefer arrow function expressions (=>)
- Prefer template literals to string concatenation

### CSS/Tailwind Styleguide

- Follow the BEM naming convention for custom CSS
- Prefer Tailwind utility classes where possible
- Use meaningful class names

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.
