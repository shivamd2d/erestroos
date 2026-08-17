# RestroPRO SaaS

> Multi-tenant Restaurant Management SaaS — POS, Kitchen Display, QR Menu, Reservations, Inventory, Reports & more.

## ⚡ One-Click Consolidated Deployment (Railway)

**Architecture:** Single consolidated full-stack app (Express Backend + React Frontend served together).  
**Hosting:** 1 Railway Service (Node.js) + 1 Railway Database (MySQL).  
**Cost:** ~$5/month total.

---

## 🚀 Quick Deployment to Railway

### 1. Create Railway Project
1. Go to [railway.app](https://railway.app) → **New Project**.
2. Select **Deploy from GitHub repo** → select this repo.
3. Railway automatically detects `railway.json` and runs `npm run install:all && npm run build` followed by `npm start`.

### 2. Add MySQL Database
1. In your Railway project canvas, click **+ New** → **Database** → **MySQL**.
2. Click the MySQL box → **Variables** tab → copy `DATABASE_URL`.

### 3. Add Environment Variables
In your Railway web service → **Variables** tab, add:

```env
DATABASE_URL           = <paste from MySQL service above>
PORT                   = 3000
JWT_SECRET             = <random 64-char string>
JWT_EXPIRY             = 15m
JWT_EXPIRY_REFRESH     = 30d
COOKIE_EXPIRY          = 900000
COOKIE_EXPIRY_REFRESH  = 2592000000
PASSWORD_SALT          = 10
ENCRYPTION_KEY         = <random 32-char string>
SMTP_HOST              = smtp.resend.com
SMTP_PORT              = 465
SMTP_EMAIL             = you@yourdomain.com
SMTP_PASSWORD          = <resend API key>
STRIPE_SECRET          =                # optional
STRIPE_WEBHOOK_SECRET  =                # optional
```

> **Generate random secrets:** `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 4. Seed the Database
1. In Railway, click **MySQL** → **Data** tab (or connect via any MySQL client).
2. Execute the queries inside `restropro_saas.sql`.

### 5. Generate Domain & Open App
1. In your Railway web service → **Settings** → **Networking** → click **Generate Domain** (or attach your custom domain).
2. Open the URL — your entire React frontend, REST API (`/api/v1`), and Socket.io are all live on that single URL!

---

## 💻 Local Development

Run the entire application with a single command:

```bash
# 1. Install all dependencies (root, backend, frontend)
npm run install:all
npm install

# 2. Setup your local environment
cp .env.example backend/.env

# 3. Start full-stack dev server (Vite frontend + Backend nodemon with hot-reload)
npm run dev
```

- **Frontend (Vite dev server):** http://localhost:5173
- **Backend (API server):** http://localhost:3000

---

## 📦 Consolidated Project Structure

```
.
├── package.json        # Root workspace scripts (build, dev, start)
├── railway.json        # Railway deployment configuration
├── restropro_saas.sql  # Database schema definition
├── .env.example        # Reference environment variables
│
├── backend/            # Express.js REST API & Socket.io server
│   ├── src/
│   │   ├── routes/     # /api/v1 endpoints
│   │   ├── services/   # Database operations
│   │   ├── controllers/
│   │   └── config/
│   └── index.js
│
└── frontend/           # React 18, Vite, Tailwind CSS, DaisyUI
    ├── src/
    └── dist/           # Built static assets served by backend in production
```
