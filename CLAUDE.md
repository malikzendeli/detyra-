# Tezga

An online shop in Albanian, Macedonian and English for small sellers in Kosovo and North Macedonia. Cash on delivery only.

## Rule #1

**Read `docs/` before you change anything.** `docs/rules-and-flows.md` is the source of truth for behaviour, `docs/brand-book.md` for colours, fonts and tone, and `docs/data-model.md` for the database. If code and docs disagree, fix one of them on purpose and say which.

## Stack

- Front end: React 19 + Vite (JavaScript), in `frontend/`
- Back end: Node.js (>= 22.13) + Express 5, in `backend/`
- Database: SQLite file `backend/data/tezga.db` via built-in `node:sqlite` (git-ignored)
- Why: `docs/stack.md`

## Folder layout

```
package.json            npm workspaces + scripts that run both apps
frontend/               React + Vite
  src/App.jsx           landing page (the only screen so far)
  src/index.css         brand tokens (colours, fonts)
backend/
  src/server.js         starts the API on :3001
  src/app.js            Express app and routes (/health)
  src/db.js             opens the SQLite file
  src/migrate.js        runs migrations, then checks models match tables
  src/models/           one file per model (fields + links)
  migrations/NNN_*.sql  schema changes, never edit one that has been committed
  data/                 tezga.db lives here (git-ignored)
docs/                   business, brand, rules, stack, data model
```

## Commands

```bash
npm install        # install front end + back end
npm run migrate    # create/update backend/data/tezga.db
npm run dev        # API on http://localhost:3001, web on http://localhost:5173
```

## Conventions

- Money is an integer in minor units (1500 = 15.00 €). Dates are ISO 8601 UTC text.
- Customer-facing text has `_sq`, `_mk`, `_en` columns. Albanian is the default.
- Schema change = new file `backend/migrations/00N_name.sql` + update the model in `backend/src/models/` + `docs/data-model.md`. `npm run migrate` must print "models match".
- Copy follows the brand book tone: direct, warm, local, informal *ti*.
- v1 limits are in `docs/rules-and-flows.md` → "What version 1 will NOT do". Don't build those.
