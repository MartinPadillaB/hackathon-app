# PRD — Hackathon Project Finder (MVP)

## 1) Summary
During hackathons, participants often struggle to quickly discover interesting projects, understand who is already working on what, and efficiently form teams. This app lets users browse available coding projects, join a project as their single active selection (up to a team size of 6), switch to another project, or propose new project ideas.

## 2) Problem Statement
Hackathon participants need a fast, low-friction way to:
- Find projects that are still accepting team members.
- See how many participants are currently assigned to each project.
- Join a project quickly and switch if they change their mind.
- Propose new project ideas that others can discover immediately.

Without a centralized system, teams form inefficiently and participants waste time searching or coordinating informally.

## 3) Goals
### Primary goals (MVP)
1. Enable rapid discovery of hackathon projects via a project card list.
2. Allow a participant to join exactly one project at a time (their “active selection”).
3. Enforce project capacity of 6 participants:
   - When a project reaches 6 participants, it becomes “Full” and is no longer joinable.
   - If someone leaves a full project, it becomes joinable again immediately.
4. Allow users to propose new project ideas that appear instantly for others.
5. Provide a simple “local-only” entry flow (enter name to get started).

### Non-goals (explicitly out of MVP scope)
- Authentication, accounts, passwords, or third-party sign-in.
- Admin moderation workflow (new ideas are visible instantly).
- Advanced social features like chat, file uploads, or threaded discussions.
- Search/filtering, tags, or popularity-based sorting (planned “later”).

## 4) Users & User Personas
### Primary users
- Hackathon participants who want to discover, join, or create coding projects.

### Roles/permissions
The app is participant-to-participant only; there are no organizer/admin roles in MVP.

## 5) Assumptions & Key Rules
1. **Local sign-in:** Users enter a name and are considered distinct participants in the app without any authentication provider.
2. **Single active selection:** Each user can be signed up to exactly one project at a time.
3. **Capacity rule (6 pax):**
   - A project can have up to 6 participants.
   - When participant count reaches 6, the project is considered full and join actions are disabled.
   - If a participant leaves and count drops below 6, the project becomes joinable again immediately.
4. **Proposed projects are instantly available:** A newly proposed project appears in the project list immediately, and other users may join it right away.
5. **Public visibility:** Project cards and details are visible to all users (no privacy gating in MVP).

## 6) User Stories (MVP)
1. As a participant, I can enter my name so I can join projects without creating an account.
2. As a participant, I can browse project cards so I can quickly choose something interesting.
3. As a participant, I can open a project and see its description and current participant count.
4. As a participant, I can join a project so it becomes my active selection.
5. As a participant, I can switch my active selection to a different project if I want to help elsewhere.
6. As a participant, I can give up my current project so my spot becomes available to others.
7. As a participant, I can propose a new project idea so it becomes visible to others immediately.

## 7) Functional Requirements
### 7.1 Local user entry
- The app shows an entry screen prompting the user to enter a display name.
- After entering a name, the user is allowed to browse, join, switch, or propose.
- MVP requirement: no login/logout semantics beyond the “started session” experience.

### 7.2 Browse project cards
- The main screen displays a list of projects as cards.
- Each card shows at minimum:
  - Title
  - Estimated time
  - Required skills (summary)
  - Current participant count (e.g., `3/6`)
  - Status indicator (`Join` enabled when not full, `Full` when at 6)
- Clicking a card opens the project details view.

### 7.3 Project detail view
Project details show:
- Title
- Description
- Required skills
- Estimated time
- Number of participants (and capacity `<= 6`)
- Join/switch actions depending on the user’s current active selection and the project’s capacity

### 7.4 Join project (set active selection)
- A user may join a project only if:
  - The project is not full, and
  - The user is not already signed up for that same project (switching handled separately).
- Since the user can have only one active selection:
  - Joining a new project should automatically update the user’s active selection to the new project.
  - If this implies leaving a previously selected project, the previous project participant count must decrease accordingly.

### 7.5 Switch / give up current selection
- From the user’s current context (e.g., project detail screen or dashboard), the user can:
  - Switch to a different project (updates active selection).
  - Give up the current project (becoming “unassigned” / no active selection).
- When a user gives up a project:
  - Participant count decreases.
  - If that project was full, it becomes joinable immediately.
  - All UI updates reflect the new capacity state.

### 7.6 Propose new project
- The app includes a “Propose project” flow/form.
- Required fields for a new project:
  - Title
  - Description
  - Required skills
  - Estimated time
- After submission:
  - The new project appears immediately in the project list.
  - The submitting user may optionally remain unassigned until they explicitly join (recommended UX), or be allowed to join immediately (UX choice to decide during implementation).

## 8) Data Model (Conceptual)
### Entities
- **User**
  - `id` (generated locally; unique per participant session/device)
  - `name` (display name; can be stored as provided)
  - `activeProjectId` (nullable) — derived from signup state
)
- **Project**
  - `id`
  - `title`
  - `description`
  - `requiredSkills` (string list or structured list)
  - `estimatedTime`
  - `createdAt`
  - `participantsCount` (derived from participant relation; should match real relation count)
- **ProjectMembership**
  - `projectId`
  - `userId`
  - Enforced such that a user has at most one active membership at a time.

### Capacity logic
- A project is “Full” when membership count is `>= 6`.
- Join actions are disabled when “Full”.
- Leave/give up actions reduce membership count and may re-open capacity immediately.

## 9) UX / UI Requirements (MVP)
### Screens (suggested)
1. `Enter name` screen
2. `Project list` screen (project cards)
3. `Project details` screen
4. `Propose project` screen/form

### UI behavior
- Project list must reflect “full vs joinable” state accurately.
- If a user switches projects:
  - UI should update both:
    - The newly joined project participant count
    - The previously joined project participant count (potentially re-opening it if it was full)
- Keep navigation simple: list -> details; details -> join/switch/give up.

## 10) Non-Functional Requirements
1. **Performance**
   - Fast loading (exact number TBD during implementation), with project list visible quickly.
2. **Reliability / consistency**
   - Capacity state must remain consistent under rapid join/leave actions.
3. **Accessibility (baseline)**
   - Use semantic HTML and keyboard-navigable UI elements for core flows.

## 11) Analytics / Metrics (Lightweight)
MVP metrics to consider:
- Number of users who enter name (sessions started).
- Number of project join actions.
- Number of project propose actions.
- Conversion: started session -> joined a project.
- Average time to first join.

## 12) Release Scope
### MVP includes
- Local name entry
- Project list as cards
- Project detail view
- Join / switch / give up with “one active selection” rule
- Project capacity enforcement with “re-open immediately” rule
- Propose project (instant visibility)
- Required project fields: title, description, required skills, estimated time

### Later (post-MVP)
- Search/filter
- Tags
- Sorting by popularity
- Team chat
- File uploads

## 13) Open Questions (for implementation)
1. If the user submits a proposal, should they be automatically joined to their new project or remain unassigned until they click Join?
2. Should the user be able to edit their display name after entry?
3. What is the best UI mechanism for confirming switching (especially if leaving the current project frees a slot)?
4. What backend/data approach will be used to support multi-user real-time updates (still compatible with “local-only” entry)?

