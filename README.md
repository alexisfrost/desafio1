# desafio1

Node.js + TypeScript + Express API with mock JWT authentication and a score lookup by RUT.

## Requirements

- Node.js 22.9 or later (tested on Node 24)
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

   On Windows (PowerShell): `Copy-Item .env.example .env`

3. Set `JWT_SECRET` in `.env` to a long random string. The server will not start without it. You can generate one with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```

| Variable         | Description                                           | Default |
| ---------------- | ----------------------------------------------------- | ------- |
| `PORT`           | Port the server listens on                            | `3000`  |
| `JWT_SECRET`     | Secret used to sign and verify JWTs (HS256)           | —       |
| `JWT_EXPIRES_IN` | Token lifetime, in seconds or as `15m`, `1h`, `7d`    | `1h`    |
| `CORS_ORIGINS`   | Extra allowed origins, comma-separated (see below)    | —       |

CORS: browser requests from any `localhost`, `127.0.0.1` or `[::1]` origin, on any port, are always allowed. Origins listed in `CORS_ORIGINS` are allowed too, and all others are blocked by the browser.

## Running

Development mode, which restarts on file changes:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

The server runs at `http://localhost:3000`, and the API is under `/api`.

## Trying the API

### Swagger UI

Open **http://localhost:3000/docs** in the browser:

1. Run `POST /login` with one of the mock users below and copy the `token` from the response.
2. Click **Authorize**, paste the token and confirm.
3. Run `GET /score/{rut}`.

The raw OpenAPI spec is available at `http://localhost:3000/docs.json`.

### Mock users

| Username | Password   | Role  | RUT            |
| -------- | ---------- | ----- | -------------- |
| `admin`  | `admin123` | admin | —              |
| `pablo`  | `pablo123` | user  | `12.345.678-9` |
| `maria`  | `maria123` | user  | `9.876.543-2`  |

Users can only query their own RUT. Admins can query any RUT.

### With curl

```bash
# Log in and get a token
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"pablo","password":"pablo123"}'

# Query a score with the token
curl http://localhost:3000/api/score/12.345.678-9 \
  -H "Authorization: Bearer <token>"
```

## Endpoints

| Method | Path              | Auth         | Description                                          |
| ------ | ----------------- | ------------ | ---------------------------------------------------- |
| POST   | `/api/login`      | —            | Validates mock credentials and returns a signed JWT  |
| GET    | `/api/score/:rut` | Bearer token | Returns `{ rut, score, fecha }` for the RUT           |

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Run from source with auto-restart            |
| `npm run build`     | Compile TypeScript to `dist/`                 |
| `npm start`         | Run the compiled build                       |
| `npm run typecheck` | Type-check without emitting files            |

## AI assistance

This project was built with help from [Claude Code](https://claude.com/claude-code), Anthropic's AI coding assistant, running the Claude Opus 5.5 model.

**The AI's part:** working from the author's requests, it wrote most of the code and documentation:

- the project setup (Express, TypeScript, npm scripts)
- the `/login` and `/score/:rut` endpoints and their mock data
- JWT signing and the two middlewares (token validation and RUT access)
- the Swagger/OpenAPI docs and this README
- manual endpoint tests during development, and commit messages that the author reviewed

**The author's part:** the author set the requirements, decided how the project should be built, reviewed and adjusted the generated code, and approved each commit.

Commits made with the assistant carry a `Co-Authored-By: Claude` trailer.
