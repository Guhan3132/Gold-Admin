# MeiGold Admin Dashboard

Operations control panel for **MeiGold** — a UAE fractional gold & silver investment platform (DMCC, Dubai). This dashboard gives internal teams a single view of users, custody, approvals, KYC queues, live market rates, and fulfillment activity.

Built as a **light-theme** admin UI using MeiGold brand tokens (navy + gold, DM Sans).

**Repository:** [github.com/Guhan3132/MeiGold-Admin](https://github.com/Guhan3132/MeiGold-Admin)

---

## Features

| Area | Description |
|------|-------------|
| **Operations report** | Platform pulse, attention cards, live market ticker, activity charts |
| **Approvals queue** | Status-driven table for sell-back, KYC, inventory, and pickup items |
| **Alerts** | Priority feed for payouts, stock, and compliance events |
| **User management** | Searchable user table with tier, status, KYC, and AUM |
| **Live rates** | Gold & silver spot-style cards with sparkline history; marquee on Users page |
| **Navigation** | Sidebar for Dashboard, Alerts, Users, KYC/AML, Orders, Stock, Sell-back, Settings |

> **Note:** Most data is **mock JSON** today. APIs and Prisma schema are scaffolded for future wiring to a real backend.

---

## Tech stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- **Charts:** Recharts
- **State:** Zustand (market store)
- **ORM (schema only):** Prisma + PostgreSQL
- **Auth (planned):** NextAuth.js

---

## Getting started

### Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+

PostgreSQL is optional for local UI development — the app runs with mock API responses without a database.

### 1. Clone the repository

```bash
git clone https://github.com/Guhan3132/MeiGold-Admin.git
cd MeiGold-Admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables (optional)

Copy the example env file if you plan to connect a database or auth later:

```bash
cp .env.example .env
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Prisma) |
| `NEXTAUTH_SECRET` | Session secret for NextAuth |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

If port 3000 is busy, Next.js will use the next available port (check the terminal output).

### 5. Production build

```bash
npm run build
npm start
```

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check without emit |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database (when seed script exists) |

---

## Project structure

```
src/
├── app/
│   ├── (dashboard)/          # Shell layout (sidebar + top bar)
│   │   ├── dashboard/        # Operations report
│   │   └── users/            # User management
│   ├── api/
│   │   ├── market/prices/    # Mock live metal prices
│   │   └── stats/overview/   # Mock dashboard stats
│   ├── globals.css           # Brand CSS variables
│   └── layout.tsx            # Root layout (DM Sans)
├── components/
│   ├── dashboard/            # Charts & stat cards
│   ├── layout/               # Sidebar, TopBar, LiveTicker, marquee
│   ├── shared/               # Shared UI (e.g. period filter)
│   └── ui/                   # shadcn/ui primitives
├── hooks/                    # useLiveRates, useMarketData, etc.
├── lib/                      # Mock data, utils, Prisma client
├── stores/                   # Zustand stores
└── types/                    # Shared TypeScript types
prisma/
└── schema.prisma             # Database schema (not fully wired)
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Operations report |
| `/users` | User management + live rate marquee |
| `/alerts`, `/kyc`, `/orders`, etc. | Linked in nav (pages not yet implemented) |

---

## Design system

The UI follows **MeiGold brand guidelines** (light theme):

- **Canvas:** warm off-white (`#FBF8EF`)
- **Ink:** deep navy text (`#02091A`)
- **Accent:** gold (`#B68B51`) for CTAs and highlights
- **Typography:** DM Sans
- **Semantic colors:** success, danger, warning, info ramps for badges and status

Tokens live in `src/app/globals.css` and `tailwind.config.ts`.

---

## API (mock)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/market/prices` | GET | Gold/silver price array |
| `/api/stats/overview` | GET | Dashboard summary stats |

Replace these route handlers with real data sources when the backend is ready.

---

## Troubleshooting

**Styles look broken (plain HTML, no layout)**  
Stop the dev server, delete the `.next` folder, and restart:

```bash
rm -rf .next    # Windows: Remove-Item -Recurse -Force .next
npm run dev
```

**Port already in use**  
Kill the process on that port or let Next.js pick another (e.g. 3001).

---

## License

Private — MeiGold FZ-LLC. All rights reserved.

---

## Contributing

This is an internal admin project. For changes, open a branch, commit, and push to `main` (or use pull requests if your team enables them).

```bash
git checkout -b feature/your-change
git add .
git commit -m "Describe your change"
git push -u origin feature/your-change
```
