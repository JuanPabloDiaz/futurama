# Contributing to Futurama Character Explorer

Thank you for considering contributing to the Futurama Character Explorer! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and courteous to others, and avoid any form of harassment or discriminatory behavior.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Any relevant details about your environment (browser, OS, etc.)

### Suggesting Enhancements

We welcome suggestions for new features or improvements. When suggesting an enhancement:

- Use a clear, descriptive title
- Provide a detailed description of the proposed feature
- Explain why this feature would be useful to most users
- Include mockups or examples if possible

### Pull Requests

We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/futurama.git
   cd futurama
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Make your changes and test them locally

## Style Guidelines

### JavaScript/React

- Use ES6+ features when appropriate
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Use functional components with hooks

### CSS/Tailwind

- Follow the existing design system
- Use the custom Futurama theme classes when possible
- Maintain responsive design principles
- Keep accessibility in mind

## Adding New Characters

If you want to add new characters to the database:

1. Add the character data to `/data/characters.json` following the existing format
2. Ensure all required fields are present (name, description, etc.)
3. Add image URLs if available
4. Test that the character appears correctly on the homepage and detail page

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions or need help, please create an issue with the "question" label.

Thank you for contributing to the Futurama Character Explorer! Good news, everyone!
