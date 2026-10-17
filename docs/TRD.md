# CyberLex — Technical Requirements Document (TRD)

> Version 1.0 · 17 Oct 2026 · Status: as-built reference
> Owner: CyberLex maintainer · Companion docs: [BRD](BRD.md) · [PRD](PRD.md) · [FEATURES](FEATURES.md) · [ARCHITECTURE](ARCHITECTURE.md) · [CONTENT](CONTENT.md)

## 1. Overview

CyberLex is a statically rendered Next.js 14 App Router application. All teaching content ships as typed TypeScript data; all interactivity is client-side; all learner state is device-local. There is no backend, no API layer, no database and no runtime configuration.

This document records the technical requirements the system must satisfy and the as-built design that satisfies them. [ARCHITECTURE.md](ARCHITECTURE.md) remains the short orientation guide; this TRD is the fuller contract, including security, compatibility, performance and testing requirements.

## 2. Stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 14.2.5 | `reactStrictMode: true`; no custom router |
| UI | React | 18.3.1 | Interactive components are `"use client"` |
| Language | TypeScript | 5.5.3 | Content and components typed; `@/*` path alias to `src/` |
| Styling | Tailwind CSS | 3.4.7 | `darkMode: ["class", '[data-theme="dark"]']` |
| CSS pipeline | PostCSS + Autoprefixer | 8.4.39 / 10.4.19 | |
| Runtime | Node.js | 20+ | Build/run only; the app has no server logic |
| Tests | none (manual QA) | — | See §16 |

Runtime dependencies are deliberately minimal: `next`, `react`, `react-dom`. No UI kit, no state library, no analytics, no test library ships today.

## 3. Architecture

```text
Browser
  └─ Next.js static pages (App Router, prerendered)
       ├─ src/app/*            page composition (server components by default)
       ├─ src/components/*     interactive client components ("use client")
       ├─ src/data/*.ts        teaching content, typed, static imports
       └─ src/lib/*            store (localStorage), hash (WebCrypto), video (embed URLs)

No network calls at runtime. No API routes. No server state.
```

**Requirements**

* **TR-ARCH-1:** Content must be imported statically; no fetching, no CMS, no build-time headless queries.
* **TR-ARCH-2:** Only components that need interactivity may be client components; page shells and list pages should stay server-rendered.
* **TR-ARCH-3:** Dynamic routes must enumerate content via `generateStaticParams()` and 404 on unknown ids (`notFound()`).
* **TR-ARCH-4:** No learner data may cross the network boundary; the only outbound request the app makes is the Google Fonts stylesheet in `layout.tsx` (preconnected).

## 4. Project structure

```text
src/
  app/                 Next.js App Router pages
    page.tsx           home + evidence demo + progress bar
    layout.tsx         fonts, metadata, StoreProvider, header/footer
    globals.css        CSS variables / design tokens
    modules/           index + [id] reader
    lab/               6 workbenches
    sims/              index + [id] runner
    cases/             flashcards
    progress/          progress view
  components/          Quiz, VideoBlock, CaseDeck, SimRunner, EvidenceDemo, …
    lab/               IntegrityBench, VolatilityBench, SignatureBench, CustodyBench, CertificateBench, ToolkitGrid
    ui.tsx             Panel, Callout, SecTag, SectionHeading primitives
  data/                modules, sims, cases, vol, sigs, coc, certs, tools, videos
  lib/
    store.tsx          StoreProvider + useStore, localStorage persistence
    hash.ts            sha256Hex() via WebCrypto
    video.ts           embedUrl() for YouTube/Vimeo/Drive/mp4
cyberlex.html          legacy single-file prototype (reference only, unreferenced)
```

## 5. Routing and rendering

| Route | Kind | Rendering |
|---|---|---|
| `/` | Static | Client component (progress bar + live demo) |
| `/modules`, `/sims`, `/cases`, `/lab`, `/progress` | Static | Server shell + client widgets |
| `/modules/[id]` | Static params from `MODULES` | Server component; `notFound()` on miss |
| `/sims/[id]` | Static params from `SIMS` | Server component; `notFound()` on miss |

**Requirements**

* **TR-ROUTE-1:** Every content route must be prerenderable; `npm run build` must produce static output for all 9 module pages and 3 sim pages.
* **TR-ROUTE-2:** The header must highlight the active route, including nested routes (prefix match on `/modules/…`, `/sims/…`).
* **TR-ROUTE-3:** Unknown dynamic ids must return the standard 404, never a partially rendered page.

## 6. Data layer and schemas

Content is the database. Files under `src/data/` are plain typed exports; the shapes below are the contract (see [CONTENT.md](CONTENT.md) for authoring guidance).

| Export | File | Shape |
|---|---|---|
| `MODULES` | `modules.ts` | `{ id, tag, title, blurb, video, body, quiz: [{ q, a: string[], c: number, e }] }` · 9 entries, exactly 3 quiz items each |
| `SIMS` | `sims.ts` | `{ id, title, tag, blurb, steps: [{ n, o: [{ t, s: −2…+2, f }] }] }` · 3 entries, 4 steps each |
| `CASES` | `cases.ts` | `{ n, c, h }` · 12 entries |
| `VOL` | `vol.ts` | 8 volatility sources, array order = correct order |
| `SIGS` | `sigs.ts` | seized files: filename, hex header, ASCII, true type, match flag + explanation |
| `COC` | `coc.ts` | 8 chain-of-custody steps, array order = correct order |
| `CERTS` | `certs.ts` | 5 certificate scenarios: text, `ok` (admissible), explanation |
| `TOOLS` | `tools.ts` | toolkit cards: name, category, what it does, what it proves, where to press |
| `VIDEOS` | `videos.ts` | module id → default lesson URL (empty string = empty slot) |

**Requirements**

* **TR-DATA-1:** Data files must remain valid TypeScript with no runtime side effects; they are imported directly by pages and client components.
* **TR-DATA-2 (trust boundary):** `body` HTML is first-party, repository-reviewed content rendered with `dangerouslySetInnerHTML`. User-supplied HTML must never enter this path. Treat `src/data/*` edits like code review (CONTENT.md conventions).
* **TR-DATA-3:** Array order is the answer for `VOL` and `COC`; editors must not reorder without updating the bench logic expectations.
* **TR-DATA-4:** Quiz `c` is the zero-based correct index; validation of "exactly 3" and index bounds is by convention and review today (see §16 for recommended checks).

## 7. State and persistence

**Shape** (serialized as JSON under `localStorage` key `cyberlex`):

```ts
type CyberlexState = {
  done: Record<string, boolean>;   // module id | "sim-<id>" → completed
  scores: Record<string, number>;  // module id → correct/3 · vol · coc · "sim-<id>" → points
  flipped: Record<string, boolean>; // case card flipped
  videos: Record<string, string>;  // module id → user-pasted lesson URL
  theme?: "light" | "dark";        // absent = follow OS
};
```

**Requirements**

* **TR-STATE-1 (SSR safety):** Initial state must be empty on the server; storage is read in a `useEffect` after mount (guarded by a `ready` flag) so SSR output matches the first client render.
* **TR-STATE-2 (defensive reads):** Corrupt/absent storage must yield a clean empty state; all `JSON.parse` and `setItem` calls are wrapped in `try/catch`.
* **TR-STATE-3 (single writer):** All writes go through `setState` from `useStore()`; components never touch `localStorage` directly.
* **TR-STATE-4 (theme sync):** On every state change, `document.documentElement[data-theme]` is set or removed to match `state.theme`; absent attribute = OS preference via `prefers-color-scheme`.
* **TR-STATE-5 (reset semantics):** "Clear all saved progress" resets `done`, `scores`, `flipped` but explicitly preserves `videos` and `theme`.
* **TR-STATE-6 (compat):** Score keys are stable (`vol`, `coc`, `sim-<id>`); adding new keys is backward compatible, renaming them is a breaking change requiring migration or a reset.

## 8. Helpers

### 8.1 Hashing — `src/lib/hash.ts`

* **TR-HASH-1:** `sha256Hex(text)` must use `crypto.subtle.digest("SHA-256", …)` and return lowercase hex.
* **TR-HASH-2:** Callers must handle unavailability (non-secure context / unsupported browser) with a readable fallback (see PRD FR-12); never an unhandled rejection.
* **TR-HASH-3:** Hashing is client-only; no crypto work happens during SSR.

### 8.2 Video embedding — `src/lib/video.ts`

`embedUrl(raw)` maps a pasted URL to a player source or `null`:

| Input | Output |
|---|---|
| YouTube (any form: `watch?v=`, `youtu.be/…`, embed) | `youtube-nocookie.com` embed |
| Vimeo | Vimeo player URL |
| Google Drive share link | Drive preview URL |
| Direct `.mp4` / `.webm` / `.ogg` | `<video>` source |
| Any other `https://` URL | generic `<iframe>` |
| Empty / invalid / non-https | `null` → empty-slot UI |

* **TR-VIDEO-1:** A `null` result must always render the empty state; an invalid pasted link must never break the module layout.
* **TR-VIDEO-2:** Per-device pasted links override `VIDEOS` defaults; clearing the input restores the default (empty by default).

## 9. Styling and design system

* **Tokens:** CSS variables in `globals.css` — `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--rule`, `--seal`, `--seal-soft`, `--forensic`, `--forensic-soft`, `--amber`, `--amber-soft` — each with light values, `prefers-color-scheme: dark` values and explicit `[data-theme="dark"]` values.
* **Semantics:** `seal` (crimson) = law/authority accents; `forensic` (teal) = correctness/success; `amber` = caution.
* **Tailwind mapping:** `seal` and `forensic` colors bind to the variables; typography uses `font-serif` (Spectral), `font-sans` (IBM Plex Sans), `font-mono` (IBM Plex Mono).
* **Fonts:** loaded from Google Fonts with `preconnect` in `layout.tsx`; fallbacks (`Georgia`, `system-ui`, monospace) keep the page readable if fonts fail.

**Requirements**

* **TR-UI-1:** New UI must use existing tokens/primitives (`Panel`, `Callout`, `SecTag`, `SectionHeading`) rather than raw hex values.
* **TR-UI-2:** Both themes must be checked for every new surface; token changes apply to all three token blocks (root, media query, `[data-theme="dark"]`).
* **TR-UI-3:** Layout containers keep the standard `max-w-[1180px]` page rhythm, sticky header offset (`scroll-padding-top: 72px`) and responsive single/two-column grids.

## 10. Security and privacy

* **TR-SEC-1:** No secrets, tokens or credentials are ever placed in the app; there is no backend to authenticate to.
* **TR-SEC-2:** Learner data stays on-device under `cyberlex`; the app makes no telemetry, analytics or beacon requests. (The one external fetch is the Google Fonts stylesheet; a self-hosted/offline font path is a future hardening option.)
* **TR-SEC-3:** The only HTML injection point is `dangerouslySetInnerHTML` for first-party module doctrine; it must never receive fetched or user-authored content.
* **TR-SEC-4:** `localStorage` holds learning progress only — no identifiers, no tokens — which keeps the classic localStorage XSS exfiltration risk largely moot, but the trust boundary in TR-DATA-2 and minimal-dependency policy remain mandatory.
* **TR-SEC-5:** Dependencies must stay minimal (three runtime deps today); any addition requires review for bundle size, maintenance and security surface, and the lockfile must be committed.

## 11. Browser support and platform constraints

* **TR-COMPAT-1:** Target evergreen browsers (Chromium, Firefox, Safari current and previous major) on desktop and mobile.
* **TR-COMPAT-2:** Hash features require a secure context (https, or localhost in development) for `crypto.subtle`; the fallback path (TR-HASH-2) covers file:// and unsupported-browser cases.
* **TR-COMPAT-3:** `localStorage` may be unavailable (private mode, disabled storage). The store must degrade to an in-memory session without crashing (TR-STATE-2).
* **TR-COMPAT-4:** The app must remain usable with JavaScript in its default state; no feature may depend on pop-ups or third-party cookies.

## 12. Performance

* **TR-PERF-1:** All pages prerender at build time; first load must not block on client data fetching (there is none).
* **TR-PERF-2:** Keep the client component surface scoped: pages shell in server components, interactivity in leaf components, so route payloads stay small.
* **TR-PERF-3:** Google Fonts load with `preconnect`; avoid additional third-party scripts entirely.
* **TR-PERF-4:** Hash operations are single, small-string digests triggered by user action; no polling or background work.

## 13. Accessibility

**Requirements and current baseline** (a formal WCAG audit is future work, tracked in the PRD backlog):

* **TR-A11Y-1:** Semantic landmarks — `header`, `nav[aria-label="Primary"]`, `main`, `footer`; one `h1` per page, ordered headings inside.
* **TR-A11Y-2:** All interactive elements are real `button`/`Link` elements with visible focus; the theme toggle carries an explicit `aria-label`; `suppressHydrationWarning` is scoped to the toggle's text only.
* **TR-A11Y-3:** Text/background token pairs must meet WCAG AA contrast in both themes when tokens change.
* **TR-A11Y-4:** Status text ("n of 3 answered", score lines, fallbacks) must be plain readable text, not color-only cues.

## 14. SEO and metadata

* **TR-SEO-1:** Root metadata (`title`, `description`) is set in `layout.tsx`; `html lang="en"` is declared.
* **TR-SEO-2:** Content correctness beats SEO: no keyword stuffing in doctrine; per-route metadata may be added later (PRD open question) without restructuring routes.

## 15. Build, run and deploy

| Command | Purpose |
|---|---|
| `npm install` | Install (Node 20+) |
| `npm run dev` | Local dev at `http://localhost:3000` |
| `npm run build` | Production build (static prerender) |
| `npm start` | Serve the production build |
| `npm run lint` | Next.js lint |

* **TR-DEPLOY-1:** No environment variables, no server config; deploy to any Next.js-compatible host (Vercel, Netlify, Docker, `npm run build && npm start`).
* **TR-DEPLOY-2:** The legacy `cyberlex.html` prototype must stay out of the active build and be clearly marked reference-only.

## 16. Testing and QA

Current state: **manual QA against the PRD release checklist (§11)**. `npm run lint` and `npm run build` are the only automated gates — there is no test framework in the repository.

Recommended additions, in priority order:

* **TR-TEST-1:** Unit tests for `embedUrl()` (every input class in §8.2) and `sha256Hex()` (known-vector hex, fallback branch).
* **TR-TEST-2:** Content validation test: every module has exactly 3 quiz items and an in-range `c`; every sim has 4 steps; `VOL`/`COC` lengths are 8; case count is 12.
* **TR-TEST-3:** Smoke test (Playwright-style) across all routes including a 404 path, plus: paste a video link → reload → still present; complete a drill → progress reflects it; toggle theme → persists.
* **TR-TEST-4:** A CI workflow running lint + build + tests on every push.

## 17. Technical debt and known limitations

| Item | Impact | Disposition |
|---|---|---|
| No automated tests / CI | Regressions rely on manual QA | TR-TEST-1…4 |
| `dangerouslySetInnerHTML` doctrine bodies | XSS surface is first-party only; content reviewed as code | Accepted with TR-DATA-2 policy |
| Type casts (`as unknown as`) around `MODULES`/`SIMS` in reader/progress pages | Weakens type safety at data seams | Candidate cleanup: derive types from data exports |
| No per-route metadata | Weaker sharing/SEO for deep links | PRD open question |
| Quiz/sim UI state is in-page only (completion persists) | Reload mid-drill restarts the drill | By design today; revisit if learners ask |
| Re-running a sim overwrites the stored score (latest, not best) | Session nuance | Documented; PRD open question |
| Google Fonts runtime fetch | External dependency; slight privacy/cold-start cost | Optional self-hosting later |
| `cyberlex.html` legacy file in repo root | Repository noise | Keep; labelled reference-only (TR-DEPLOY-2) |
| English-only | Access ceiling in India | i18n architecture if demand (PRD backlog) |

## 18. Future technical considerations

* **Export/import:** versioned JSON download/upload of `CyberlexState` — trivially compatible with TR-STATE-6 if new keys only are added.
* **PWA:** service worker for offline assets; must not introduce background network calls (TR-SEC-2).
* **i18n:** route or content-level localization; content is centralized in `src/data`, which makes string extraction tractable, but quiz/sim copy needs translator-grade review.
* **Content pipeline:** optional build-time validation (TR-TEST-2) and a per-route metadata map generated from data files.
* **Self-hosted fonts:** removes the last third-party request.
