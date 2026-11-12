# Nyulo Interior

Website and admin panel for an interior design studio — portfolio, services, process, reviews, journal, contact form and a budget planner, all editable from an admin panel.

Live: https://nyulo.com · Admin: https://nyulo.com/admin

| Folder | What it is | Stack | Dev URL |
|---|---|---|---|
| [`FrontEnd/`](FrontEnd/) | Public website | React (Vite), Tailwind CSS v4 | http://localhost:5173 |
| [`BackEnd/`](BackEnd/) | Public API (read content, receive leads) | Node.js, Express | http://localhost:5000 |
| [`AdminFrontEnd/`](AdminFrontEnd/) | Admin panel | React (Vite), Tailwind CSS v4 | http://localhost:5174/admin/ |
| [`AdminBackEnd/`](AdminBackEnd/) | Admin API (sign-in, editing, uploads) | Node.js, Express | http://localhost:5001 |

Both APIs share one PostgreSQL database in production. In development, with no database configured, they share JSON files in `BackEnd/data/`.

## Run locally

```bash
# each in its own terminal
cd BackEnd       && npm install && npm run dev
cd AdminBackEnd  && npm install && npm run dev
cd FrontEnd      && npm install && npm run dev
cd AdminFrontEnd && npm install && npm run dev
```

Start `BackEnd` first: it creates the seed content. Then open http://localhost:5174/admin/ and create the admin account.

## How content flows

1. An admin signs in to the panel and edits a project, a service or a piece of site content.
2. `AdminBackEnd` validates the change and writes it to the database.
3. `BackEnd` reads the same database, so the public website shows the change on the next page load — nothing needs redeploying.

Uploaded photos are saved to `public_html/uploads` on the server and served directly by the web server.

## Deploying

[`DEPLOYMENT.md`](DEPLOYMENT.md) describes the live setup and the one-command redeploy. Each folder's README covers its own architecture.
