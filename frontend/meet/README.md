(# Frontend (meet) — Progress so far)

## Summary

- **Purpose:** Vite + React single-page app for Meet-IQ; uses Clerk for authentication and builds with Vite.
- **Entry point:** `frontend/meet/src/main.jsx` — mounts React app and provides Clerk `ClerkProvider`.
- **Auth:** Clerk integration requires `VITE_CLERK_PUBLISHABLE_KEY` in Vite environment.

## Technologies used

- **Vite** — development server and build tool.
- **React** — UI library.
- **@clerk/clerk-react** — authentication (sign-in, sign-out, user button components).

## What is implemented

- App shell in `frontend/meet/src/App.jsx` with basic sign-in/sign-out UI using Clerk components.
- Frontend expects `VITE_CLERK_PUBLISHABLE_KEY` (throws error on missing key at startup).
- Vite scripts: `dev`, `build`, `preview` defined in `frontend/meet/package.json`.

## Workflow diagram (current)

```
Developer
	├─ runs `npm run dev` (frontend) -> Vite dev server serves React app
	├─ builds frontend with `npm run build` -> `frontend/meet/dist`
	└─ Clerk handles authentication in the browser

Frontend (browser)
	├─ calls Backend API endpoints (e.g., `/health`, `/books`)
	└─ receives data from Express server

Backend (Express)
	└─ connects to MongoDB via Mongoose (uses `DB_URL` from `backend/.env`)

Production
	└─ Express serves `frontend/meet/dist` when `NODE_ENV=production`
```

## How to run (dev)

1. Ensure Vite env var is set for Clerk: create `frontend/meet/.env` with `VITE_CLERK_PUBLISHABLE_KEY=your_key`.
2. From `frontend/meet` run:

```bash
npm install
npm run dev
```

Or from project root run frontend prefix commands:

```bash
npm run --prefix frontend/meet dev
```

## Notes / Next steps (you will edit manually)

- Replace placeholder UI with real routes, components, and pages.
- Add secure handling for Clerk callbacks and any required backend endpoints for auth if needed.
- Confirm production build is created and served by backend when deploying.



##
- setup of frontend
	# topic to get deep into
  - installed tw , daisyUi ,react-route , react-hot-toast , tanStack(instead of lengthy fetching and loading data) , axios (instead of fetch)
