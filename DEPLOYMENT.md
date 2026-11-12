# Deploying Nyulo Interior to nyulo.com

## Live deployment (current setup)

Deployed on **Namecheap shared hosting** — cPanel user `nyuldgvn`, LiteSpeed, shared IP `162.0.235.139`, SSH on port **21098**.

| Piece | Where |
|---|---|
| Public website | `/home/nyuldgvn/public_html` → https://nyulo.com |
| Public API | `/home/nyuldgvn/nyulo-api`, Node 22 via the CloudLinux selector, mounted at `/api` → https://nyulo.com/api/v1 |
| Admin panel | `/home/nyuldgvn/public_html/admin` → https://nyulo.com/admin |
| Admin API | `/home/nyuldgvn/nyulo-admin-api`, Node 22, mounted at `/admin-api` → https://nyulo.com/admin-api/v1 |
| Uploaded photos | `/home/nyuldgvn/public_html/uploads` → https://nyulo.com/uploads |
| Database | PostgreSQL 10 on the same host — database `nyuldgvn_nyulo`, user `nyuldgvn_app` |

The Namecheap parking page that was there before is preserved in `~/_backup-parking-page`.

### Redeploying

```bash
(cd FrontEnd && npm run build)
(cd AdminFrontEnd && npm run build)
cd deploy && npm install                      # first time only
CP_PASS='your-cpanel-password' npm run deploy
```

That deploys all four apps. To deploy one, use `npm run deploy:frontend`, `deploy:backend`, `deploy:admin` or `deploy:admin-api`. The script uploads over SFTP and, for the two APIs, reinstalls dependencies and restarts the app.

Redeploying never touches the database, the uploaded photos, or the admin account.

Two gotchas, both hit during the first deploy:

- **Don't deploy via zip.** PowerShell's `Compress-Archive` writes backslash path separators and Linux `unzip` rejects the archive. The script uploads files directly instead.
- **`install-modules` reports a false failure.** The selector compares the site's content type before and after installing; the API correctly changing from `text/html` to `application/json` trips that check. The script passes `--skip-web-check`.

### Admin panel

Sign in at https://nyulo.com/admin with the admin username and password. The password can be changed under **Password** in the panel. Sign-in is limited to 10 attempts per 15 minutes.

The admin API was registered once with:

```bash
cloudlinux-selector create --json --interpreter nodejs --app-root nyulo-admin-api --app-uri admin-api \
  --version 22.23.4 --app-mode production --startup-file src/server.js --env-vars '{ ... }'
```

Its environment variables (cPanel → **Setup Node.js App** → `nyulo-admin-api`) are `NODE_ENV`, `CLIENT_URL`, `DATABASE_URL` (same database as the public API), `UPLOAD_DIR=/home/nyuldgvn/public_html/uploads` and `UPLOAD_PUBLIC_URL=https://nyulo.com/uploads`.

**Locked out?** There is no password-reset email. Delete the row from the `admins` table (cPanel → phpPgAdmin) and reload the panel: with no admin left it offers to create a new account. Do this only when needed, and create the new account straight away, because until then anyone who opens the panel could.

### Database

The API stores everything in the hosting account's own PostgreSQL. Each collection (`projects`, `services`, `testimonials`, `blogs`, `contacts`, `estimates`) is a table of JSONB documents — `id`, `data`, `created_at` — created automatically on startup and seeded when empty.

The connection string lives in the app's `DATABASE_URL` environment variable (cPanel → **Setup Node.js App** → `nyulo-api`). The database password was generated on the server and is stored only there; to connect with another tool, read it from that screen or reset it under cPanel → **PostgreSQL Databases**.

**Reading leads.** Contact messages and budget requests appear in the admin panel under **Leads**. They are stored in the `contacts` and `estimates` tables, which can also be browsed in cPanel → **phpPgAdmin** or read over the public API with the API key:

```bash
curl -H "x-api-key: YOUR_ADMIN_API_KEY" https://nyulo.com/api/v1/contacts
curl -H "x-api-key: YOUR_ADMIN_API_KEY" https://nyulo.com/api/v1/estimates
```

**Changing site content.** Use the admin panel. Editing `BackEnd/src/seed/data.js` or `siteDefaults.js` does not change the live site on its own: seed data is only loaded into an empty database, and a site section saved from the panel overrides its default. The tables `settings` (saved site sections) and `admins` (admin accounts) sit alongside the content tables.

If `DATABASE_URL` is unset or PostgreSQL is unreachable, the API falls back to MongoDB (`MONGODB_URI`) and then to seed data plus JSON files under `BackEnd/data/`, so it keeps serving either way. `GET /api/v1/health` reports which store is active.

---

## The general picture

Two applications ship together:

| Part | What it is | Where it goes |
|---|---|---|
| `FrontEnd/dist` | Static files produced by `npm run build` | Served at `https://nyulo.com` |
| `BackEnd` | Long-running Node.js process | Reached at `https://nyulo.com/api` |

The frontend is just files. The backend is a **process that must keep running**, which is the part that decides what hosting works: plain shared hosting that only serves HTML cannot run it.

Pick the section below that matches your hosting.

---

## Before you start (applies to every option)

1. **Create a MongoDB database.** [MongoDB Atlas](https://www.mongodb.com/atlas) has a free M0 tier that is enough to launch. Create a cluster, add a database user, allow network access from your server's IP (or `0.0.0.0/0` if the IP is dynamic), and copy the connection string.
2. **Generate an admin API key** — it protects the endpoints that create and delete projects, services and blog posts:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **Point the domain at the server.** In your domain registrar's DNS panel:
   - `A` record, host `@` → your server's IP address
   - `CNAME` record, host `www` → `nyulo.com`

   DNS changes take anywhere from a few minutes to a few hours to spread.

---

## Option A — cPanel shared hosting

Works if your cPanel has **Setup Node.js App** (most Bangladeshi hosts with LiteSpeed/CloudLinux do). Check for it in cPanel under "Software" before going further; if it is absent, use Option C instead.

Two ready-to-upload zips are already built in `deploy/packages/`:

| File | Upload to | Contains |
|---|---|---|
| `nyulo-frontend-public_html.zip` | `public_html` | The built site, including `.htaccess` |
| `nyulo-backend.zip` | `nyulo-api` | `src/`, `package.json`, `package-lock.json` — no `node_modules` |

Rebuild them any time with `cd FrontEnd && npm run build`, then re-zip.

### 1. Backend

1. In cPanel → **Setup Node.js App** → *Create Application*:
   - Node version: 20 or 22
   - Application root: `nyulo-api`
   - Application URL: `nyulo.com/api`
   - Application startup file: `src/server.js`
2. In **File Manager**, create the folder `nyulo-api` in your home directory, upload `nyulo-backend.zip` into it and use *Extract*. **Never upload `node_modules`** — cPanel installs it for you in step 4.
3. In the same screen add the environment variables:

   | Name | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | your Atlas connection string |
   | `CLIENT_URL` | `https://nyulo.com,https://www.nyulo.com` |
   | `ADMIN_API_KEY` | the key you generated |

   Leave `PORT` unset — cPanel assigns it.
4. Click **Run NPM Install**, then **Restart**.
5. Verify: open `https://nyulo.com/api/v1/health`. You should see `"database":"connected"`.

   If that URL 404s, your host's Passenger strips the `/api` prefix before Express sees it. The API is mounted at both `/api/v1` and `/v1` for exactly this reason, so try `https://nyulo.com/api/health` — if *that* works, change `VITE_API_URL` in `FrontEnd/.env.production` to `https://nyulo.com/api` and rebuild.

### 2. Frontend

1. Upload `nyulo-frontend-public_html.zip` into `public_html` and use **Extract**, so the files land directly in `public_html` (you should see `index.html` and `assets/` there, not a nested folder).
2. In File Manager → **Settings**, tick *Show Hidden Files* and confirm `.htaccess` is present. Without it, refreshing the page on `/projects` returns a 404.
3. In cPanel → **SSL/TLS Status**, run AutoSSL so HTTPS works.

Open `https://nyulo.com`. Done.

---

## Option B — VPS (DigitalOcean, Contabo, Hetzner, Linode…)

This is the setup the included `deploy/nginx.conf` and `ecosystem.config.cjs` are written for.

```bash
# --- On the server, as root ---
apt update && apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt install -y nodejs
npm install -g pm2

# --- Get the code ---
mkdir -p /var/www/nyulo && cd /var/www/nyulo
git clone <your-repo-url> .      # or upload the folders with scp/SFTP

# --- Backend ---
cd BackEnd
npm ci --omit=dev
cp .env.production.example .env
nano .env                         # fill in MONGODB_URI, CLIENT_URL, ADMIN_API_KEY
mkdir -p logs
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup           # run the command it prints

# --- Frontend ---
cd ../FrontEnd
npm ci
npm run build
mkdir -p /var/www/nyulo/frontend
cp -r dist/* /var/www/nyulo/frontend/

# --- Web server ---
cp /var/www/nyulo/deploy/nginx.conf /etc/nginx/sites-available/nyulo.com
ln -s /etc/nginx/sites-available/nyulo.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# --- HTTPS (free, auto-renewing) ---
apt install -y certbot python3-certbot-nginx
certbot --nginx -d nyulo.com -d www.nyulo.com
```

Check `https://nyulo.com/api/v1/health`, then `https://nyulo.com`.

**Redeploying later:**
```bash
cd /var/www/nyulo && git pull
cd BackEnd && npm ci --omit=dev && pm2 restart nyulo-api
cd ../FrontEnd && npm ci && npm run build && cp -r dist/* /var/www/nyulo/frontend/
```

### VPS with Docker instead

If Docker is installed, skip everything above:

```bash
cd /var/www/nyulo
printf 'MONGO_ROOT_PASSWORD=%s\nADMIN_API_KEY=%s\n' "$(openssl rand -hex 16)" "$(openssl rand -hex 32)" > .env
docker compose up -d --build
```

This runs MongoDB, the API and nginx together. Put Caddy or a host-level nginx in front for HTTPS, or add certbot to the `web` container.

---

## Option C — Static host + managed Node host (no server admin)

Good when your hosting only serves static files, or you would rather not manage a server. Both tiers below are free to start.

**Backend on [Render](https://render.com):** New → Web Service → connect the repo → Root directory `BackEnd`, Build `npm ci`, Start `node src/server.js`. Add the environment variables from the table in Option A. Render gives you a URL like `https://nyulo-api.onrender.com`.

> Render's free tier sleeps after 15 minutes idle, so the first request after a quiet spell takes ~30 seconds. Their cheapest paid tier removes that. Railway and Fly.io are equivalent alternatives.

**Frontend on [Vercel](https://vercel.com):** Import the repo → Root directory `FrontEnd` → it detects Vite and uses the included `vercel.json`. Set the environment variable `VITE_API_URL` to `https://nyulo-api.onrender.com/api/v1`. Then add `nyulo.com` under the project's Domains tab and follow the DNS records it shows you.

Netlify works the same way; the `public/_redirects` file is already there for it.

After deploying, set the backend's `CLIENT_URL` to `https://nyulo.com,https://www.nyulo.com` and redeploy it, or the browser will block the API calls with a CORS error.

---

## Seeding the live database

The API seeds itself the first time it connects to an **empty** database, so usually there is nothing to do. To wipe and reload the demo content:

```bash
cd BackEnd && npm run seed
```

Run it on the server, or locally with `MONGODB_URI` pointed at the production database.

---

## Post-launch checklist

- [ ] `https://nyulo.com` loads over HTTPS, no browser warning
- [ ] `https://nyulo.com/api/v1/health` reports `"database":"connected"` — if it says `in-memory demo mode`, `MONGODB_URI` is wrong or Atlas is blocking the server's IP
- [ ] Refreshing the page on `/projects` or `/blog` works (SPA routing is configured)
- [ ] The contact form submits successfully, and the lead appears in:
      `curl -H "x-api-key: YOUR_KEY" https://nyulo.com/api/v1/contacts`
- [ ] The cost calculator returns an estimate
- [ ] `ADMIN_API_KEY` is a long random value, not `change-me-in-production`
- [ ] `.env` files are not in the repository

---

## Things to change before real traffic

The site is production-ready to launch, but these are placeholders you will want to replace:

1. **Contact details** — phone, email and address live in [`FrontEnd/src/constants/index.js`](FrontEnd/src/constants/index.js).
2. **Photos** — every image is an Unsplash placeholder. Swap the URLs in [`BackEnd/src/seed/data.js`](BackEnd/src/seed/data.js) for your real project photography, then re-seed.
3. **Testimonials and client names** — currently invented demo content. Publishing fabricated reviews or client logos under your real brand is a legal and reputational risk, so replace them with real ones or remove the sections before launch.
4. **Pricing** — the cost calculator's rates are in [`BackEnd/src/constants/index.js`](BackEnd/src/constants/index.js). Set them to your actual per-sqft figures.
5. **Email notifications** — contact submissions are currently only logged and stored. [`BackEnd/src/services/contact.service.js`](BackEnd/src/services/contact.service.js) has the hook point marked for adding Nodemailer, Resend or a similar service.
6. **Admin authentication** — write endpoints use a single shared API key. Replace it with proper JWT login before building an admin panel.
