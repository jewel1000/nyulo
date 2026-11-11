# Nyulo Interior

Full-stack web application for an interior design studio — portfolio, services, process, testimonials, blog, contact and an interior cost calculator.

| Folder | Stack | Dev URL |
|---|---|---|
| [`BackEnd/`](BackEnd/) | Node.js, Express, MongoDB (Mongoose) | http://localhost:5000 |
| [`FrontEnd/`](FrontEnd/) | React (Vite), Tailwind CSS v4, React Router | http://localhost:5173 |

## Run locally

```bash
# Terminal 1 — API
cd BackEnd
npm install
npm run dev

# Terminal 2 — Web app
cd FrontEnd
npm install
npm run dev
```

MongoDB is optional in development: without it the API serves seeded demo data from memory. With MongoDB running, an empty database is seeded automatically on first start (`npm run seed` re-seeds).

See each folder's README for architecture details.

## Deploying

[`DEPLOYMENT.md`](DEPLOYMENT.md) covers cPanel, VPS (nginx + PM2 or Docker) and Vercel/Render, plus DNS, HTTPS and a post-launch checklist.
