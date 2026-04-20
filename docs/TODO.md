## Hackathon Project Finder — Implementation TODO

> Work in **very small, AI-friendly increments**. Keep each checkbox as a separate, small task.

---

### 1. Project Initialization & “Hello World” (deployable)
- [x] Create new Vite + React + TypeScript project structure (if not already created).
- [x] Initialize `package.json` with scripts (`dev`, `build`, `preview`, `test`).
- [x] Add basic `.gitignore` (include `node_modules`, build artifacts, env files).
- [x] Add minimal `README.md` at repo root with project summary and how to run locally.
- [x] Implement a minimal `App` component that renders “Hello Hackathon Project Finder”.
- [x] Add a very simple CSS baseline or component library decision (pure CSS, Tailwind, etc.).
- [x] **Security**: Ensure no secrets, tokens, or personal data are hardcoded; verify repo is safe to publish.
- [x] **Docs**: Document in `README.md` how to install dependencies and run the dev server.

#### 1.1 Initial deployment pipeline
- [ ] Choose deployment target (e.g., Vercel, Netlify, GitHub Pages, or similar).
- [ ] Add a simple CI workflow to build the app on every push (e.g., GitHub Actions with `npm install` + `npm run build`).
- [ ] Configure deployment from main branch (or chosen branch) after successful CI build.
- [ ] Verify deployed “Hello World” page is reachable.
- [ ] **Security**: Confirm deployed output exposes no environment variables or sensitive information.
- [ ] **Docs**: Add a short “Deployment” section to `README.md` (how it’s deployed, where to see it).

---

### 2. Basic UI Skeleton with Mocked Data
#### 2.1 Layout & routing
- [ ] Introduce a simple routing structure (e.g., React Router) for:
  - [ ] `Enter name` screen
  - [ ] `Project list` screen
  - [ ] `Project details` screen
  - [ ] `Propose project` screen
- [ ] Add a minimal top-level layout (header with app name, main content area).
- [ ] **Security**: Avoid passing any sensitive parameters via URL; keep only non-sensitive routing state.
- [ ] **Docs**: Add a short section to `docs/requirements.md` or new `docs/architecture.md` describing the basic screen flow.

#### 2.2 Mock data models
- [ ] Create TypeScript interfaces for `User`, `Project`, and `ProjectMembership` (conceptual only).
- [ ] Create a small in-memory array of mocked projects with:
  - [ ] `title`
  - [ ] `description`
  - [ ] `requiredSkills`
  - [ ] `estimatedTime`
  - [ ] `participantsCount`
- [ ] Use mocked data to render project cards on the `Project list` screen.
- [ ] **Security**: Ensure mock data contains no real user data; use fictional names/values.
- [ ] **Docs**: Document the initial data model in `docs/architecture.md` (or similar).

---

### 3. Local User Entry (Name Only) — Frontend Logic
- [ ] Implement `EnterName` screen with a text input and “Continue” button.
- [ ] Validate that the name is non-empty before allowing continue.
- [ ] Store the user’s name locally (e.g., React context or local state; decide if localStorage is used).
- [ ] Redirect user to the `Project list` screen after entering a valid name.
- [ ] Display the user’s name in the header (e.g., “Hi, {name}”).
- [ ] **Security**: If using `localStorage` or similar, confirm only the display name is stored (no sensitive identifiers).
- [ ] **Docs**: Add a “Local user entry” section documenting how identity is modeled (local-only, no auth).

---

### 4. Project List UI with Mocked Data
- [ ] Render project cards using mocked projects.
- [ ] Each card shows:
  - [ ] Title
  - [ ] Estimated time
  - [ ] Required skills (summary)
  - [ ] Participant count (e.g., `3/6`)
  - [ ] Status (e.g., `Join` button enabled/disabled based on mock `participantsCount`)
- [ ] Clicking a card navigates to `Project details` with the selected project’s ID.
- [ ] Apply basic styling for a clean, modern card layout (responsive if possible).
- [ ] **Security**: Sanitize any user-rendered strings (e.g., if later a user can propose projects with free-text).
- [ ] **Docs**: Document the list view behavior briefly in `docs/architecture.md` or a UI notes section.

---

### 5. Project Details UI with Mocked Data
- [ ] Implement `ProjectDetails` component/screen.
- [ ] Show full project information:
  - [ ] Title
  - [ ] Description
  - [ ] Required skills
  - [ ] Estimated time
  - [ ] Participant count and capacity (e.g., `4/6`)
- [ ] Show placeholder buttons for:
  - [ ] `Join this project`
  - [ ] `Switch to this project`
  - [ ] `Leave project`
- [ ] For now, wire these buttons to simple console logs or temporary toasts (no real logic yet).
- [ ] **Security**: Ensure no dangerous HTML injection if descriptions are user-provided; keep them as plain text.
- [ ] **Docs**: Note the details view and planned actions in documentation.

---

### 6. State Management Setup (Single Active Project, Still Local/Mock)
- [ ] Decide and implement global state management (e.g., React Context, Zustand, Redux, or simple lifted state).
- [ ] Represent the current `User` (id + name + active project id) in state.
- [ ] Represent projects and memberships in state (still starting from mocked data).
- [ ] Implement a helper to compute `participantsCount` for each project from memberships.
- [ ] **Security**: Keep client state minimal and free of any sensitive or unnecessary fields.
- [ ] **Docs**: Document chosen state management strategy in `docs/architecture.md`.

---

### 7. Implement Join / Switch / Leave Logic (Local State Only)
- [ ] Implement a `joinProject(projectId)` action:
  - [ ] Check project capacity (`< 6`) before joining.
  - [ ] If user already has an active project, treat this as a switch (leave old, join new).
- [ ] Implement `leaveProject()` action:
  - [ ] Remove user’s membership from current project.
  - [ ] Update active project to `null`.
- [ ] Ensure `participantsCount` updates correctly when joining and leaving.
- [ ] Update UI:
  - [ ] Enable/disable `Join` button based on capacity and current membership.
  - [ ] Show `Switch` / `Leave` buttons only when appropriate.
- [ ] **Security**: Add guardrails in actions so invalid operations (e.g., joining a full project) are impossible even if UI glitches.
- [ ] **Docs**: Update documentation with the rules for join/switch/leave and capacity handling.

---

### 8. Propose New Project (Local State Only)
- [ ] Implement `ProposeProject` form with required fields:
  - [ ] Title
  - [ ] Description
  - [ ] Required skills
  - [ ] Estimated time
- [ ] On submit, create a new project object in state (participants count `0/6`).
- [ ] Add the new project immediately to the project list.
- [ ] Decide behavior: whether proposer is automatically joined or not (based on implementation decision).
- [ ] **Security**:
  - [ ] Validate and limit input length to prevent very large payloads.
  - [ ] Keep all user input as plain text (no interpreted HTML).
- [ ] **Docs**: Document the proposing flow and fields in `docs/requirements.md` or a dedicated `docs/user-flows.md`.

---

### 9. Capacity Rules & Edge Cases (Local Simulation)
- [ ] Enforce a maximum of 6 participants per project in state logic.
- [ ] When participant count becomes 6:
  - [ ] Mark project as `Full` in derived state.
  - [ ] Disable `Join` for that project in list and details views.
- [ ] When a participant leaves a full project:
  - [ ] Recompute count and reopen `Join` availability.
- [ ] Add clear UI label (e.g., `Full`, `Joinable`) to project cards and details.
- [ ] **Security**: Ensure no function can bypass capacity checks even if called directly.
- [ ] **Docs**: Document capacity rules and edge cases in architecture or technical notes.

---

### 10. Persistence (Optional, Local-Only)
- [ ] Decide if user name and current active project are persisted (e.g., `localStorage`).
- [ ] Implement a small persistence layer (read on load, write on changes).
- [ ] Handle “reset” action for development (e.g., clear local storage).
- [ ] **Security**:
  - [ ] Avoid storing anything sensitive; only store `name`, `activeProjectId`, and maybe lightweight preferences.
  - [ ] Document what is stored and where.
- [ ] **Docs**: Add a persistence section describing how state survives page reloads.

---

### 11. Testing (Unit + Basic Integration)
- [ ] Set up a testing framework (e.g., Vitest + React Testing Library).
- [ ] Write unit tests for:
  - [ ] joinProject / leaveProject / switch logic.
  - [ ] Capacity enforcement (never allow > 6).
  - [ ] Propose project behavior (new project appears, correct default values).
- [ ] Write component tests for:
  - [ ] `EnterName` (validation works).
  - [ ] Project list renders expected cards based on mock data.
  - [ ] Project details show correct info.
- [ ] Integrate tests into CI workflow (failing tests should fail the pipeline).
- [ ] **Security**: Add one or two tests that assert potentially dangerous inputs are not rendered as HTML.
- [ ] **Docs**: Add a “Testing” section in `README.md` (how to run tests, what is covered).

---

### 12. CI/CD Enhancements
- [ ] Extend CI to run:
  - [ ] Linting (e.g., ESLint) on every push.
  - [ ] Type-checking (`tsc --noEmit`).
  - [ ] Unit tests.
- [ ] Add status badges (if using GitHub Actions) to `README.md`.
- [ ] Configure preview deployments for pull requests (if supported by chosen platform).
- [ ] **Security**:
  - [ ] Ensure CI logs do not contain secrets (none should exist by design).
  - [ ] If future environment variables are added, restrict their visibility appropriately.
- [ ] **Docs**: Document the CI/CD flow in a short `docs/ci-cd.md`.

---

### 13. UX Polish & Accessibility
- [ ] Improve card styling and spacing for readability on desktop and mobile.
- [ ] Ensure keyboard navigation works across all interactive elements.
- [ ] Add basic ARIA labels for buttons where needed.
- [ ] Provide simple empty states (no projects, no active project, etc.).
- [ ] **Security**: Make sure error messages don’t leak implementation details.
- [ ] **Docs**: Note any known accessibility limitations and future work.

---

### 14. Production-Ready Checklist for MVP
- [ ] Review all flows against PRD:
  - [ ] Local name entry
  - [ ] Project list
  - [ ] Project details
  - [ ] Join / switch / leave
  - [ ] Capacity rule (6 pax)
  - [ ] Propose project with instant visibility
- [ ] Run full CI pipeline and ensure green build.
- [ ] Manually test main flows in deployed environment.
- [ ] **Security**: Quick review for:
  - [ ] XSS risk (no raw HTML from user input).
  - [ ] No hidden debug routes or dev-only tools in production.
  - [ ] No unnecessary data stored in local storage.
- [ ] **Docs**: Final pass on documentation:
  - [ ] Update `README.md` for MVP status.
  - [ ] Ensure all core flows are described somewhere in `docs/`.

