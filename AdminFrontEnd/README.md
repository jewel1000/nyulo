# Nyulo Interior — Admin Panel

React app for managing the website, served at **https://nyulo.com/admin**. Built with Vite, React, Tailwind CSS v4 and React Router.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5174/admin/
```

It needs both APIs running: the admin API (`../AdminBackEnd`, port 5001) for signing in and saving, and the public API (`../BackEnd`, port 5000) for reading the current site content. Their addresses are set in `.env`.

## What you can edit

| Menu | What it changes on the website |
|---|---|
| Projects | Portfolio under “Our Work”: text, cover photo, gallery, homepage feature |
| Services | Service cards and pages, footer list, contact form options |
| Reviews | Client reviews and which appear on the homepage |
| Journal | Articles |
| Site content | Company and contact details, homepage slideshow, numbers bar, “How we work” steps, “Why choose us” cards, team, About page, call-to-action banner, Budget Planner prices |
| Contact messages / Budget requests | Leads: mark as contacted or closed, add private notes, delete |
| Password | Change your sign-in password |

Changes are live as soon as they are saved; the public site does not need redeploying.

## Structure

```
src/
├── api/         # axios clients (admin API with token, public API read-only) + image upload
├── auth/        # sign-in state
├── components/  # Layout, FormBuilder (all field types), shared UI
├── config/      # resources.jsx (collections) and siteSections.js (site content)
└── pages/       # Login, Dashboard, ResourcePage, LeadsPage, SiteContentPage, AccountPage
```

Screens are generated from configuration. To add a field to a collection, add one entry to `config/resources.jsx` (and to the schema in `AdminBackEnd/src/validations/resources.js`); to add a site-content field, add it to `config/siteSections.js` and to the defaults in `BackEnd/src/seed/siteDefaults.js`.

## Build and deploy

```bash
npm run build                        # outputs dist/, with every URL under /admin/
cd ../deploy && CP_PASS='...' npm run deploy:admin
```

`vite.config.js` sets `base: '/admin/'` and `public/.htaccess` sends deep links such as `/admin/projects` back to the app.
