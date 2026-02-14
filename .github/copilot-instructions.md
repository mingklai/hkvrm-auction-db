# Copilot / AI Agent Instructions for hkvrm-auction-db

Purpose: give an AI coding agent the actionable, repository-specific knowledge
needed to be immediately productive when editing, running, or extending this
Next.js app.

1) Big picture
- This is a Next.js (App Router) TypeScript project using the `app/`
  directory (see `app/layout.tsx` and `app/page.tsx`). It's a minimal starter
  template (created by `create-next-app`) with client-side UI rendered via
  Next 13+ features such as `next/font`.
- Styling uses Tailwind (see `postcss.config.mjs` and `globals.css`) and the
  project imports fonts with `next/font` in `app/layout.tsx`.

2) How to run & common commands
- Development: `npm run dev` (maps to `next dev`). Server starts on port 3000.
- Build: `npm run build` then `npm run start` for production.
- Lint: `npm run lint` (project uses a top-level `eslint.config.mjs`).
- Files to edit for quick UI changes: `app/page.tsx` (home page) and
  `app/layout.tsx` (global layout, fonts, `globals.css`).

3) Key files and examples
- `package.json` — shows `next@16.x`, `react@19.x` and scripts (`dev`,
  `build`, `start`, `lint`). Use these scripts for reproducible workflows.
- `app/layout.tsx` — sets global fonts via `next/font` and loads `globals.css`.
  Example: change font variables here when adjusting typography.
- `app/page.tsx` — the example landing page; UI is built with Tailwind classes
  and the `next/image` component. To change the text shown in the app, edit
  this file.
- `next.config.ts` — present but minimal; add runtime or image config here.
- `globals.css` — central place for Tailwind base utilities and overrides.

4) Conventions & patterns to follow (discoverable in repo)
- App router (files under `app/`) is the canonical place for routes and
  layout; avoid creating `pages/` unless intentionally mixing routers.
- Use the Next `Image` component for static images in `public/` (see
  `app/page.tsx` referencing `/next.svg` and `/vercel.svg`).
- Styling: use Tailwind utility classes directly in JSX; dark mode classes
  are present (e.g. `dark:`) so preserve class-driven theming.
- Lint: repository expects ESLint in root; run the provided `lint` script
  before opening PRs.

5) Integrations & deploy
- Deploy target is Vercel by default (README mentions Vercel templates).
- No DB or external API config found in this repo—changes are UI-only unless
  you add environment/config files.

6) Agent behaviors and safety
- When making code changes, run the dev server locally (`npm run dev`) to
  verify UI updates and check the browser at `http://localhost:3000`.
- Do not add or assume secret keys or external services unless the repo
  includes an explicit config file or docs; ask the user if needed.

7) PR guidance for AI-generated changes
- Keep commits small and focused (edit `app/page.tsx` or `app/layout.tsx` only
  when making small UI tweaks).
- Run `npm run lint` before opening a PR. Include screenshots for UI changes
  when applicable.

If anything above is unclear or you'd like the agent to include additional
checks (type checks, a formatting step, or CI config), tell me which and I'll
update this file.
