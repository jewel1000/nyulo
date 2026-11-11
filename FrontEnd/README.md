# Nyulo Interior — Frontend

React SPA for the Nyulo Interior web application. Built with **Vite + React + Tailwind CSS v4 + React Router v7**, consuming the Node.js API in `../BackEnd`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Set the API base URL in `.env` (`VITE_API_URL`, defaults to `http://localhost:5000/api/v1`). Start the backend first for live data.

## Structure

```
src/
├── api/          # axios client + one module per resource
├── components/
│   ├── layout/   # Header, Footer, Layout shell
│   ├── common/   # Button, SectionHeading, Reveal, Spinner, form fields…
│   ├── home/     # homepage sections (Hero, Stats, Portfolio, Process…)
│   ├── projects/ # ProjectCard
│   ├── services/ # ServiceCard
│   ├── blog/     # BlogCard
│   ├── testimonials/
│   ├── contact/  # ContactForm
│   └── estimator/ # EstimatorForm, EstimateResult
├── pages/        # one component per route
├── routes/       # AppRoutes
├── hooks/        # useFetch, useCountUp
├── constants/    # nav, company info, process steps, static content
└── utils/        # formatters, icon map
```

## Pages

`/` home · `/about` · `/services` (+`/:slug`) · `/projects` (+`/:slug`, category filter) · `/process` · `/testimonials` · `/blog` (+`/:slug`) · `/contact` · `/cost-estimator` · 404

## Theming

Design tokens (colors, fonts) live in `src/index.css` under `@theme` — change the gold/ink palette there and the whole site follows.
