# Meet - Collaborative Video & Code Editor

## Overview

Meet is a full-stack application for real-time collaborative coding with video calls. Developers can join sessions to solve problems together, write and execute code, and communicate via video and chat.

## Tech Stack

**Frontend:**
- React + Vite (UI framework & build tool)
- Tailwind CSS + DaisyUI (styling)
- Axios (HTTP client)
- TanStack Query (data fetching & caching)
- React Router (routing)
- React Hot Toast (notifications)
- Clerk (authentication)

**Backend:**
- Node.js + Express (REST API)
- MongoDB (database)
- Inngest (background jobs)
- Stream API (real-time messaging & video)

**Code Execution:**
- Piston API (code execution engine)

## Key Concepts

- **Sessions**: Multi-user collaborative coding environments
- **Video Calls**: Real-time video communication
- **Code Editor**: Live multi-language code editing
- **Code Execution**: Run and test code snippets instantly
- **Chat**: Session-based messaging
- **Authentication**: Clerk-based user management


## Project Structure

```
Meet/
├── frontend/meet/          # React Vite app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page routes
│   │   ├── api/            # API client
│   │   └── config/         # Config & utilities
│   └── package.json
└── backend/                # Express server
    ├── src/
    │   ├── controllers/    # Business logic
    │   ├── models/         # Database schemas
    │   ├── routes/         # API endpoints
    │   ├── middleware/     # Auth & utilities
    │   └── config/         # Configuration
    └── package.json
```

## Quick Start

**Frontend:**
```bash
cd frontend/meet
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
npm start
```

Set required env variables in `.env` files (Clerk key for frontend, DB URL & API keys for backend).

