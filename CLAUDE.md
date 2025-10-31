# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS 3.0 project built with Next.js 15 and PostgreSQL. It uses the App Router architecture with TypeScript and includes integration and e2e testing.

## Key Technologies

- **Payload CMS 3.0**: Headless CMS with admin panel
- **Next.js 15**: React framework with App Router
- **PostgreSQL**: Database via `@payloadcms/db-postgres`
- **TypeScript**: Strict mode enabled
- **Lexical**: Rich text editor
- **pnpm**: Package manager (required)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Clean dev start (removes .next cache)
pnpm devsafe

# Build for production
pnpm run build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Testing

```bash
# Run all tests (integration + e2e)
pnpm test

# Run integration tests only (Vitest)
pnpm run test:int

# Run e2e tests only (Playwright)
pnpm run test:e2e
```

Test locations:
- Integration tests: `tests/int/**/*.int.spec.ts` (using Vitest + jsdom)
- E2E tests: `tests/e2e/**/*.e2e.spec.ts` (using Playwright)

## Type Generation

```bash
# Generate TypeScript types from Payload collections
pnpm run generate:types

# Generate import map for admin UI
pnpm run generate:importmap
```

Generated types are written to `src/payload-types.ts`. Run `generate:types` after modifying collection schemas.

## Architecture

### Payload Configuration

Main config: `src/payload.config.ts`

- Uses PostgreSQL adapter (connection via `DATABASE_URI` env var)
- Lexical editor for rich text
- Two default collections: Users (auth-enabled) and Media (upload-enabled)
- Admin user collection slug: `users`

### Next.js App Structure

The app uses route groups to separate concerns:

- **`(frontend)`**: Public-facing pages
  - Contains frontend routes, styles, and layouts

- **`(payload)`**: Payload CMS routes
  - `/admin/*`: Admin panel UI (catch-all route)
  - `/api/*`: REST API endpoints
  - `/api/graphql`: GraphQL endpoint
  - `/api/graphql-playground`: GraphQL IDE

- **`my-route`**: Example custom route

The `(frontend)` and `(payload)` route groups have separate root layouts, allowing different styling and structure.

### Collections

Collections are defined in `src/collections/`:

- **Users** (`users`): Auth-enabled collection for admin users
  - Uses email as title field
  - Minimal schema (extendable)

- **Media** (`media`): Upload-enabled collection
  - Public read access
  - Requires `alt` text field

When adding new collections, import and add them to the `collections` array in `payload.config.ts`.

### TypeScript Configuration

Path aliases configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@payload-config` → `./src/payload.config.ts`

Use these aliases instead of relative imports when possible.

### Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for encryption/auth (generate a secure random string)

Note: The example shows MongoDB URI format, but this project uses PostgreSQL.

## Node.js Requirements

- Node.js: `^18.20.2` or `>=20.9.0`
- pnpm: `^9` or `^10`

All commands use `NODE_OPTIONS=--no-deprecation` to suppress deprecation warnings during development.

## Docker Support

A `docker-compose.yml` and `Dockerfile` are provided for containerized development and deployment.
