<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio — Next.js App Router

Fresh `create-next-app` single-page portfolio. Next 16.3.5 + React 19 + Tailwind CSS v4. No monorepo, no API routes, no DB, no tests, no CI.

## Commands

- `npm run dev` — dev server (also regenerates the `AGENTS.md` block above; don't delete it)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (`eslint-config-next`, flat config in `eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck (no `typecheck` script defined)

No test runner configured — don't add one unprompted.

## Structure

- Entrypoints: `app/layout.tsx` (root layout, Geist fonts, `LayoutProps<"/">` typing), `app/page.tsx` (entire page content), `app/globals.css`
- Path alias: `@/*` maps to repo root (`./*`), not `./src/*` — there is no `src/`
- Static assets in `public/`; only `favicon.ico` currently used

## Tailwind v4 notes

- No `tailwind.config.*`. Theme is CSS-first: `@import "tailwindcss"` + `@theme inline` in `app/globals.css`
- PostCSS uses `@tailwindcss/postcss` (`postcss.config.mjs`) — don't replace with `tailwindcss` direct plugin or v3 config
