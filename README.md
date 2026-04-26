# Hackathon Project Finder

[![CI and Deploy](https://github.com/MartinPadillaB/hackathon-app/actions/workflows/ci-deploy.yml/badge.svg)](https://github.com/MartinPadillaB/hackathon-app/actions/workflows/ci-deploy.yml)

Minimal React + TypeScript + Vite application scaffold for the Hackathon Project Finder.

## Run locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open `http://localhost:5173`.

### Build production bundle

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm run test
```

## Security notes

- No secrets, tokens, or personal data are hardcoded in source files.
- Environment files are ignored through `.gitignore` (`.env`, `.env.*`).
- Do not commit real credentials; if needed, use a local `.env` file only.

## Deployment

- **Target:** GitHub Pages
- **CI workflow:** `.github/workflows/ci-deploy.yml`
- **Build on every push:** GitHub Actions runs `npm install` and `npm run build` for all branches.
- **Deploy rule:** only pushes to `main` publish to GitHub Pages (after successful build).
- **Public URL:** [https://martinpadillab.github.io/hackathon-app/](https://martinpadillab.github.io/hackathon-app/)

### Deployment security

- The deployment uses only static files from `dist`; no server-side secrets are injected into runtime.
- No `.env` files are included in the artifact; they remain ignored by git.
