# Joshua.Dev Portfolio

A premium, animated personal portfolio and lead-generation site for Abakah Joshua Blessed, a full-stack/backend/AI developer, showcasing his skills, real projects, services, and pricing, with contact and website-order forms that submit to the shared API server and persist to MongoDB.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio site (Vite dev server)
- `pnpm --filter @workspace/api-server run dev` — run the API server, which backs the contact/order forms
- `pnpm run build` — build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate the OpenAPI-derived client/schemas (see Gotchas — outputs TypeScript by design)
- Required env: `MONGODB_URI` — MongoDB connection string (secret, never hardcoded)

## Stack

- pnpm workspaces, Node.js 24, **plain JavaScript (ESM)** — the whole monorepo (portfolio, api-server, all `lib/*` packages, `scripts`) was converted from TypeScript to JS. `artifacts/mockup-sandbox` is Replit's own canvas/mockup-sandbox tooling and was intentionally left in TypeScript — it's platform infrastructure, not part of this product.
- Portfolio frontend: React + Vite, **Chakra UI v3** (not Tailwind/shadcn) for all styling/components — Tailwind was fully removed since nothing used it. Framer Motion for animation, react-hook-form + zod for forms, wouter for routing.
- API: Express 5
- DB: **MongoDB via Mongoose** (switched from Postgres/Drizzle). Contact and order form submissions are persisted as `ContactSubmission`/`OrderSubmission` documents.
- API codegen: Orval (from OpenAPI spec) — see Gotchas, its output is unused/hand-ported now.
- Build: esbuild (ESM bundle)

## Where things live

- `artifacts/portfolio` — the portfolio site (all sections in `src/components/sections/*`, Chakra theme in `src/theme.js`, providers in `src/components/Provider.jsx`, toast setup in `src/components/ui/toaster.jsx`)
- `artifacts/api-server/src/routes/leads.js` — the `POST /api/contact` and `POST /api/order` routes the portfolio's forms call; both persist to MongoDB via `@workspace/db`
- `lib/db` — Mongoose connection (`connectDB()`) and schemas (`ContactSubmission`, `OrderSubmission`)
- `artifacts/mockup-sandbox` — canvas/mockup sandbox artifact, unrelated to this product (still TypeScript)

## Architecture decisions

- Chosen Chakra UI v3 (`createSystem`/`defaultConfig`, not `extendTheme`) over the scaffold's default Tailwind/shadcn setup, per explicit user preference.
- Chakra v3 has no `useToast` hook — toasts go through a `createToaster()` instance (`toaster.create({...})`) rendered via a `<Toaster />` component mounted once in `App.jsx`.
- The contact and website-order forms submit to the API server and are persisted to MongoDB; there is still no email/CRM notification logic — see Gotchas.
- Converted the entire monorepo from TypeScript to plain JavaScript per user request. Deleted ~50+ dead shadcn/Radix scaffold files under `components/ui/*` (never wired into the Chakra UI) rather than converting them, since they were unused.
- `lib/api-zod` and `lib/api-client-react` are now hand-maintained plain JS (ported from their generated TS output) rather than actively regenerated — see the Orval gotcha below.

## Product

- Single-page portfolio covering hero, about, skills, experience, 5 real featured projects (SeedBridge, GH-GPT, Instagram Clone, Universal Backend Service, OpenLabs Backend) with live URLs, open-source stats, backend-services offerings, services, "why choose me", testimonials, process, pricing, FAQ, blog placeholder, contact, and a "Let's Build Your Dream Website" order form, plus footer/socials, dark-mode-default theme toggle, and a custom 404 page.

## User preferences

- Use Chakra UI (not Tailwind/shadcn) for styling in the portfolio artifact.
- The site owner has their own backend/notification pipeline; the site should only call clearly documented API routes rather than the agent building full backend logic (email sending, CRM, etc.) for the forms.
- Use plain JavaScript, not TypeScript, across the monorepo (excluding `artifacts/mockup-sandbox`, which is platform tooling).
- Use MongoDB (via Mongoose), not Postgres/Drizzle, as the backend database.

## Gotchas

- `POST /api/contact` and `POST /api/order` persist to MongoDB but still do **not** send email/CRM notifications — wire that in if the site owner wants real-time alerts.
- Orval (the API codegen tool) only generates TypeScript output by design — there's no plain-JS codegen mode. `lib/api-spec/orval.config.js` still runs it, but `lib/api-zod`/`lib/api-client-react` are now hand-maintained plain JS files, not actively regenerated. If you rerun `codegen`, you'll need to manually port the freshly generated `.ts` files back to `.js`.
- When using `react-icons`, verify an icon name actually exists in the installed `react-icons` version before importing it (several `Si*` names referenced in early drafts, e.g. `SiAmazon`/`SiCss3`/`SiJava`/`SiOpenai`/`SiVisualstudiocode`, don't exist in this version — use `FaAws`/`FaCss3Alt`/`FaJava`/`RiOpenaiLine`/`VscVscode` instead).

## Pointers

- See the `pnpm-workspace` skill for workspace structure and package details
