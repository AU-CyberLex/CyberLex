# Architecture

Active codebase: Next.js 14 App Router in `src/`. (`cyberlex.html` at repo root is the legacy prototype, unreferenced.)

## Routing

Standard App Router pages — no custom router, no hash views (unlike the legacy file):

* `src/app/layout.tsx` — document shell: fonts (Spectral / IBM Plex Sans / Mono via Google Fonts), `metadata`, `StoreProvider`, `SiteHeader`, `SiteFooter`.
* `src/app/page.tsx` — home: hero, `EvidenceDemo` (live SHA-256 exhibit), progress bar.
* `src/app/modules/page.tsx` + `src/app/modules/[id]/page.tsx` — module grid + reader (doctrine, `VideoBlock`, `Quiz`).
* `src/app/lab/page.tsx` — composes the six bench components in `src/components/lab/`.
* `src/app/sims/page.tsx` + `src/app/sims/[id]/page.tsx` — `SimGrid` + `SimRunner`.
* `src/app/cases/page.tsx` — `CaseDeck`.
* `src/app/progress/page.tsx` — `ProgressView`.

Unknown module/sim ids should render the index (or Next `notFound()`); the reader pages look up `src/data/*` by id.

## State (`src/lib/store.tsx`)

* Client-only `StoreProvider` with `{ done, scores, flipped, videos, theme }`.
* Persisted as JSON under `localStorage` key `cyberlex`. SSR-safe: initial state is empty, hydrated from `localStorage` in `useEffect`.
* `theme` syncs to `document.documentElement[data-theme]`; absent attribute = follow OS `prefers-color-scheme` (tokens in `globals.css`).
* Components consume via `useStore()`. Scores use keys: module id → `correct/total`, `vol`, `coc`, `sim-<id>`.

## Data flow

```
src/data/*.ts  →  page.tsx  →  components/*.tsx
                                      ↓
                              useStore() → localStorage
```

Content files are imported statically — no fetching, no API routes, no server components carrying state. Interactive components are `"use client"`.

## Styling

* Tailwind (`tailwind.config.js`) for layout + typography scale; shadcn-style primitives in `src/components/ui.tsx`.
* Design tokens as CSS variables in `src/app/globals.css` (`--bg`, `--surface`, `--text`, `--seal`, `--forensic`, `--amber`, …) with light/dark values; Tailwind `seal`/`forensic` colors map to the variables.
* Fonts: Spectral (serif headings), IBM Plex Sans (body), IBM Plex Mono (hashes, tags, code).

## Helpers

* `src/lib/hash.ts` — `sha256()` via `crypto.subtle`; returns hex. Requires secure context.
* `src/lib/video.ts` — `embedUrl()`: YouTube (any form) → `youtube-nocookie` embed; Vimeo → player URL; Drive share link → preview; direct `.mp4/.webm/.ogg` → `<video>`; any other `https://` → generic iframe. Empty/invalid → null (empty slot UI).
* `src/data/videos.ts` — shipped defaults (currently all empty); per-device overrides live in `state.videos`.
