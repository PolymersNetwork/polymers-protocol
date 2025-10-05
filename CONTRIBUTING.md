# Contributing to Polymers Protocol

Thank you for your interest in contributing! This document outlines the coding standards, commit message conventions, testing workflow, and pull request process to ensure a consistent, high-quality development workflow for the Polymers Protocol ecosystem.

**Table of Contents**
	1.	Code of Conduct
	2.	Getting Started
	3.	Coding Standards
	4.	Commit Message Guidelines
	5.	Testing Workflow
	6.	Pull Request Guidelines
	7.	Additional Resources


## Code of Conduct

Please read and adhere to our Code of Conduct.
Polymers Protocol values collaboration, respect, and inclusivity.


## Getting Started
	1.	Fork the repository and clone your fork:

git clone https://github.com/<your-username>/smartbin.git
cd smartbin
npm install
cp .env.example .env


	2.	Set up environment variables in .env (see .env.example).
	3.	Run development servers:

cd apps/web && npm run dev      # Web dashboard
cd ../mobile && npm run start   # Mobile app
npm run simulate:iot            # IoT simulations
npm run test:lstm               # LSTM analytics


## Coding Standards
	•	Language: TypeScript for all applications, with strict typing.
	•	Styling: Tailwind CSS with custom color palette:
	•	Dark green #1A3C34
	•	Sand #F4A261
	•	Light gray #D3D3D3
	•	White #FFFFFF
	•	Formatting:
	•	Prettier & ESLint enforced:

npm run lint
npm run format


	•	File structure: Follow the monorepo layout:

**/apps**
/shared
/lib
/hooks
/constants
/utils
/api
/prisma
/docs


	•	React/Next.js best practices:
	•	Use functional components and hooks.
	•	Maintain separation between UI (/components) and logic (/lib, /api).
	•	Add JSDoc/TSDoc comments for public functions.
	

## Commit Message Guidelines

Use Conventional Commits:

<type>(<scope>): <short description>

	•	Types:
	•	feat: new feature
	•	fix: bug fix
	•	docs: documentation updates
	•	refactor: code restructuring
	•	test: tests added/fixed
	•	chore: build/config changes

**Examples:**

feat(helium): add NB-IoT fallback support
fix(lstm_model): correct fill level prediction formula
docs(swap-panel): update README and GIF links

	•	Keep messages under 72 characters.
	•	Include issue references if applicable: Closes #123.

⸻

## Testing Workflow
	1.	Unit & integration tests (Jest):

npm run test


	2.	IoT simulations:

npm run simulate:iot
npm run simulate:hivemapper
npm run simulate:rewards


	3.	LSTM analytics tests:

npm run test:lstm


	4.	OTA firmware testing (if applicable):

npm run ota:deploy


	5.	Linting & formatting:

npm run lint
npm run format



## All tests must pass before opening a PR.


Pull Request Guidelines
	1.	Branch naming:

type/short-description

Example:

feat/nft-twins-minting
fix/iot-telemetry-parser


	2.	Pull Request template: Fill in .github/PULL_REQUEST_TEMPLATE.md. Include:
	•	Description
	•	Related issue
	•	Testing steps
	•	Screenshots/GIFs if UI changes
	3.	Review Process:
	•	PRs must pass CI checks: lint, tests, simulations.
	•	Assign reviewers from relevant teams (frontend, backend, iot).
	•	Address all comments before merging.
	4.	Squash commits for clean history.

⸻

## Additional Resources
	•	Polymers Protocol README
	•	Solana Docs
	•	Helium DePIN Docs
	•	Conventional Commits
