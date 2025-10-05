# Contributing to Polymers Protocol

Thank you for your interest in contributing to Polymers Protocol! This guide outlines best practices for development, coding standards, commit messages, testing, and pull requests.

⸻

🛠️ Getting Started
	1.	Fork the Repository
Click the Fork button on GitHub to create your own copy of the repo.
	2.	Clone Your Fork

git clone https://github.com/<your-username>/smartbin.git
cd smartbin


	3.	Install Dependencies

npm install
cp .env.example .env

Configure your .env with the appropriate keys for testing.

	4.	Create a Feature Branch

git checkout -b feature/your-feature-name



⸻

📏 Coding Standards

We use TypeScript, React/React Native, Next.js, Tailwind CSS, and Node.js. Follow these guidelines:
	•	Formatting & Linting
	•	Prettier: npx prettier --write .
	•	ESLint: npx eslint . --fix
	•	Tailwind classes: alphabetically where possible.
	•	TypeScript
	•	Enable strict typing: avoid any.
	•	Use interfaces/types for all object shapes.
	•	Async functions must handle errors (try/catch).
	•	React
	•	Functional components with hooks preferred.
	•	Keep components modular; max 200 lines per component.
	•	Use React.memo or useMemo for expensive computations.
	•	File Naming
	•	PascalCase for React components: SmartBinCard.tsx.
	•	camelCase for utils/hooks/constants: useTelemetry.ts.
	•	Kebab-case for scripts: simulate-iot.ts.
	•	Documentation
	•	JSDoc comments for exported functions.
	•	Update /docs if new modules or features are added.

⸻

💾 Commit Message Guidelines

We follow Conventional Commits:

<type>(<scope>): <subject>

Types:
	•	feat – New feature
	•	fix – Bug fix
	•	docs – Documentation
	•	style – Formatting, no code change
	•	refactor – Code refactor
	•	test – Adding or updating tests
	•	chore – Maintenance tasks

Examples:

feat(iot): add NB-IoT fallback support
fix(api): handle Supabase insert errors gracefully
docs(contributing): add commit guidelines
style(ui): format SwapPanel components with Prettier


⸻

🧪 Testing Workflow
	1.	Unit Tests

npm run test

	•	Jest is used for backend & frontend unit testing.
	•	Coverage threshold: 80%.

	2.	LSTM & AI Models

npm run test:lstm

	•	Ensure model predictions match baseline data.

	3.	IoT Simulation

npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards


	4.	OTA & Deployment

npm run ota:deploy



⸻

📦 Pull Request Template

Use this template when opening a PR:

## Description
<!-- Describe the changes made and why. Link any related issues. -->

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactor
- [ ] Other: ________

## Related Issue
<!-- Link the issue (if any) -->
Closes #<issue_number>

## How Has This Been Tested?
<!-- Explain testing procedures and results -->
- Unit tests
- LSTM model validation
- IoT simulation
- Manual UI testing

## Checklist:
- [ ] My code follows the project’s coding standards
- [ ] I have added relevant tests
- [ ] I have updated the documentation if necessary
- [ ] My changes do not break existing functionality


⸻

🔒 Security & Environment
	•	Do not commit .env or secret keys.
	•	Report vulnerabilities to the maintainers via GitHub Security Advisories.
	•	Ensure third-party packages are up-to-date (npm audit).

⸻

🤝 Code Review
	•	PRs must be reviewed by at least one core maintainer.
	•	Maintain descriptive commit messages and clean history (squash commits if needed).
	•	Ensure CI passes (npm run test & npm run lint) before merge.

⸻

📚 Additional Resources
	•	Polymers Protocol Repo
	•	Solana Developer Docs
	•	Helium DePIN Docs
	•	Supabase Docs
	•	TypeScript Handbook
