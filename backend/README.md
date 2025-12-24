(# Backend — Progress so far)

## Summary

- **Purpose:** Express API server with MongoDB integration for the Meet-IQ project.
- **Entry point:** `backend/src/server.js` — starts the Express server and connects to MongoDB.
- **Environment:** configuration loaded from `backend/.env` via `backend/src/config/env.js`.

## Technologies used

- **Node.js (ESM)** — project uses `type: module` for imports.
- **Express** — HTTP server and routing.
- **Mongoose** — MongoDB object modeling and connection.
- **dotenv** — loads environment variables from `backend/.env`.
- **nodemon** (dev) — development auto-reload script.

## What is implemented

- Basic health-check endpoint: `GET /health` returning JSON success.
- Placeholder `GET /books` endpoint for future API work.
- Database connection implemented in `backend/src/config/db.js` and invoked on server start. The server will exit if `DB_URL` is not defined or connection fails.
- Static serving in production: when `ENV.NODE_ENV === "production"`, Express serves files from `../../frontend/meet/dist` and returns `index.html` for SPA routes.

## How to run (dev)

1. Ensure `backend/.env` contains `DB_URL` and `PORT`.
2. From project root run:

```bash
npm run --prefix backend dev
```

This runs `nodemon src/server.js` from `backend`.

## Notes / Next steps (you will edit manually)

- Ensure `DB_URL` is provided before starting the server.
- Add real API routes, controllers, models, and middleware as next tasks.
- Verify production build path for the frontend before deploying.

