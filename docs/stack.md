# Tezga: Stack

| Part | Choice | Why (one sentence) |
|---|---|---|
| **Front end** | **React 19 + Vite** (JavaScript) | Fast to build mobile-friendly pages, huge community, and Vite starts in under a second, so it is easy for one person to move quickly. |
| **Back end** | **Node.js + Express 5** | The same language as the front end, and the working Nkonlinestore code (catalogue, cart, COD orders) is already Node + Express, so I can reuse it. |
| **Database** | **SQLite**, through Node's built-in `node:sqlite` | One file, zero setup and no native build on Windows, which is plenty for the first ~50 shops and easy to move to Postgres later. |
| **Migrations** | Plain `.sql` files in `backend/migrations/`, run by `npm run migrate` | Every table is readable SQL, and the runner also checks that the models in `backend/src/models/` match the tables. |
| **Fonts** | `@fontsource/space-grotesk`, `@fontsource/inter` | Self-hosted `.woff2`, as the brand book asks. |

Needs **Node.js 22.13 or newer** (for `node:sqlite`).
