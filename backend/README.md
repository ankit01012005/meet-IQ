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

__________________________________________________________________________________________
## After these

### connection between the clerk -> inngest -> mongoDB

- installed the cors and inngest
- created the user USER model to (save in the db)
- in the server.js used middleware and the cors by express instance - (app)

- created the inngest.js -> include configuration of innest function(a/c documentation)
- in server.js used the inggest fuction to implemnet it 
- in the inngest.js 
    - created two functions 1.userCreation and 2. userDeletion
    - at inngest site the id name should be meet-IQ

## After all code app creation at inngest and webhook intergration in clerk
- we have created or sync app in inggest after redeployment
    - thorught the link "https://meet-iq-1.onrender.com/api/inngest"

## How actually it works
- signup throgh clerk-> user stored in the clerk
- clerk sends notification to inngest through webhook
    - and inngest states the status at "run" wether user created or not
        - status shows after app creation

- as inngest has multiple fuction for DB 
- we have user.create and user.delete
- on user creation inngest call the user creation fuction at the inggest.js
    - and stores recond in DB

# similarly for deletion
-----------------------------

            clerk  
                |
                |
                inngest
                        |
                        |
                        Database

## stearm-chat config

- installed stream-chat
- in config stated it fuctions
- got the key and secrete 
- through it created instance of it 
- using instance upseted the user
- and deleted the user from stream chat
- stream chat is integrated with inggest 
- inngest ingest the data to DB and streamchat
