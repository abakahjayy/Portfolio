---
name: TypeScript-to-JavaScript monorepo conversion
description: Lessons from converting a full pnpm-workspace scaffold (portfolio + api-server + lib/* + scripts) from TS to plain JS.
---

- Delete dead/unused scaffold code before converting it. This template ships ~50+ shadcn/Radix UI primitives under `components/ui/*` that are often never wired into the actual (e.g. Chakra-based) UI — grep for real usage first and delete the unused ones rather than porting them. This turns a large conversion into a small, mostly-mechanical one.
- Orval (the OpenAPI codegen tool used for `lib/api-zod`/`lib/api-client-react`) only generates TypeScript output — there is no plain-JS codegen mode. If a project converts those generated packages to hand-maintained JS, future codegen runs will still emit `.ts` files that must be manually re-ported; document this tradeoff rather than fighting the tool.
- `artifact.toml`-registered artifacts each keep their own `tsconfig.json`; the root `tsconfig.json`/`package.json` `typecheck`/`build` scripts only reference `lib/*` packages via TS project references — once those libs become JS, remove the references (and the root `typecheck` script) rather than leaving dangling `tsc --build` targets.
- When a scaffold pulls in Tailwind (`@tailwindcss/vite`, `@import "tailwindcss"` in `index.css`) alongside Chakra/MUI-style components, check whether any component actually uses Tailwind `className`s before ripping it out — often only one leftover component (e.g. a Radix Accordion) does, and it can be rewritten with the primary UI library's native equivalent instead of keeping a second styling system alive for one file.
