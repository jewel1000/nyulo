# Nyulo Interior — Backend API

REST API for the Nyulo Interior web application, built with **Node.js + Express** in a layered, scalable architecture. Storage is pluggable: **PostgreSQL** in production, with MongoDB and file storage as fallbacks.

## Quick start

```bash
npm install
npm run dev        # starts on http://localhost:5000
```

Works out of the box **with no database at all**: content is served from seed data and leads (contacts, estimates) are saved to JSON files in `data/`.

Storage is picked at startup, in order: `DATABASE_URL` (PostgreSQL, used in production) → `MONGODB_URI` (MongoDB) → files. An empty database is seeded automatically on first connect. `GET /api/v1/health` shows which store is active.

## Architecture

```
src/
├── config/        # env config + database connection
├── constants/     # enums & pricing model
├── models/        # Mongoose schemas
├── repositories/  # data-access layer: Postgres, Mongo, file and memory adapters behind one interface
├── services/      # business logic (no req/res here)
├── controllers/   # thin HTTP handlers
├── routes/        # route definitions, versioned under /api/v1
├── middlewares/   # errors, validation, admin API key guard
├── validations/   # declarative body schemas
├── utils/         # ApiError, ApiResponse, asyncHandler, pagination, slugify, logger
└── seed/          # demo data + seeding script
```

Request flow: **route → middleware (validate/auth) → controller → service → repository → model**.

## API overview (`/api/v1`)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/health` | Health + active store (`postgres` / `mongodb` / `file`) | — |
| GET | `/projects?category=&featured=&page=&limit=` | List projects | — |
| GET | `/projects/:slug` | Project detail | — |
| POST/PATCH/DELETE | `/projects` | Manage projects | `x-api-key` |
| GET | `/services`, `/services/:slug` | Services | — |
| GET | `/testimonials?featured=true` | Testimonials | — |
| GET | `/blogs?tag=&page=`, `/blogs/:slug` | Blog | — |
| POST | `/contacts` | Submit contact form | — |
| GET | `/contacts` | List leads | `x-api-key` |
| GET | `/estimates/config` | Estimator packages/space types | — |
| POST | `/estimates/calculate` | Calculate a quote | — |
| POST | `/estimates` | Save quote + contact as a lead | — |
| GET | `/estimates` | List estimate leads | `x-api-key` |

All responses share one envelope: `{ success, message, data, meta? }`.

Admin write endpoints require the `x-api-key` header matching `ADMIN_API_KEY` in `.env` — replace with full JWT auth when an admin panel is built.

## Environment variables

See `.env.example`. Copy it to `.env` and adjust.
