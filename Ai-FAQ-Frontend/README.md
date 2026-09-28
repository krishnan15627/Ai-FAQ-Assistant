# HealthFAQ — Vanilla HTML/CSS/JS Frontend

This version contains only:
- HTML
- CSS
- JavaScript

React, TypeScript, JSX, Vite, node_modules and Figma files have been removed.

## Backend connection

The frontend is configured for:

http://localhost:5000

Verified backend routes used by this frontend:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- POST /api/ai/answer

The AI endpoint requires a JWT. The frontend stores the login token in localStorage and sends it as:
Authorization: Bearer <token>

Gemini API keys are NOT placed in this frontend. Keep GEMINI_API_KEY on the Node/Express backend.

## Run

Do not double-click index.html if your browser blocks fetch requests. Use a small local static server.

If Python is installed:

python -m http.server 8080

Then open:

http://localhost:8080

Make sure the backend is already running on port 5000.

## Change backend URL

Open js/api.js and change:

const API_BASE = "http://localhost:5000";

Or set it from the browser console:

localStorage.setItem("apiBaseUrl", "http://localhost:5000");
location.reload();

## Notes

The public medicines/FAQ/category content is frontend educational/demo content based on the supplied React project. The authentication and AI Assistant are wired to the supplied backend API rather than using fake frontend responses.
