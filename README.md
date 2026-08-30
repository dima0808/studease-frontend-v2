# StudEase frontend

React + Vite single-page app for the StudEase test platform.

## Requirements

[Bun](https://bun.sh) 1.2+ — it is the package manager and the script runner for
this project. `bun.lock` is committed; there is no `package-lock.json`.

```sh
curl -fsSL https://bun.sh/install | bash   # macOS / Linux
powershell -c "irm bun.sh/install.ps1 | iex"  # Windows
```

## Getting started

```sh
bun install
bun run dev
```

| Script | What it does |
|---|---|
| `bun run dev` | Vite dev server with HMR |
| `bun run build` | Production build into `dist/` |
| `bun run preview` | Serve the production build on port 3000 |
| `bun run lint` | ESLint over the repo |
| `bun run format` | Prettier write |

## Environment

Vite reads `VITE_`-prefixed variables from `.env*` files (see
`.env.production`). `src/constants/config.js` composes them into `API_URL` and
`WS_URL`.

## Student test flow

The student-facing API is attempt-token based. `POST /tests/{testId}/start`
returns an `attemptToken` **once**; it is kept in `sessionStorage` keyed by
`testId` (`src/utils/attemptToken.js`), attached to every `/tests/{testId}/…`
request by the axios interceptor in `src/api/axios.js`, and presented on the
STOMP `CONNECT`/`SUBSCRIBE` frames for `/topic/testSession/{sessionKey}`.
See `FRONTEND_HANDOFF.md` for the full contract.
