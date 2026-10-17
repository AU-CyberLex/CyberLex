# CyberLex — Cyber Law & Digital Forensics Studio

Learn cyber law the way it is actually litigated: statutory modules, a working forensics lab, and branching investigations built on Indian law — the IT Act 2000, DPDP Act 2023, Bharatiya Sakshya Adhiniyam 2023 and BNSS 2023.

Next.js 14 + React 18 + TypeScript + Tailwind CSS app. Content lives in typed data files under `src/data/`; progress is stored in `localStorage` on the device only.

> `cyberlex.html` in the repo root is the legacy single-file prototype. It is retained for reference only — the Next.js app in `src/` is the active codebase.

## Quick start

Requirements: Node.js 20+.

```powershell
npm install
npm run dev      # http://localhost:3000
```

```powershell
npm run build    # production build
npm start        # serve the production build
npm run lint     # Next.js lint
```

No environment variables, no backend, no database.

## Routes

| Route | What it is |
|---|---|
| `/` | Home: hero + live SHA-256 exhibit demo + progress bar |
| `/modules` | Grid of the 9 statutory modules |
| `/modules/[id]` | Doctrine, video slot, applied drill (3 Qs) |
| `/lab` | 6 forensics workbenches |
| `/sims` | Branching investigations index |
| `/sims/[id]` | Scored investigation runner (no undo) |
| `/cases` | 12 landmark-authority flashcards |
| `/progress` | Modules completed + drill/lab/sim scores |

## What is inside

**9 statutory modules** — each with doctrine, video slot, and 3-question drill:

* Unauthorised access and data theft (§43 · §66)
* Identity theft and cheating by personation (§66C · §66D)
* Obscene and sexually explicit material (§67 · §67A · §67B)
* Intermediary liability and safe harbour (§79 + IT Rules 2021)
* Data protection (DPDP Act 2023)
* Electronic evidence and the certificate (§63 BSA, formerly §65B)
* Jurisdiction and extra-territorial reach (§1(2) · §75)
* Interception, blocking and protected systems (§69 · §69A · §69B · §70)
* Cyber terrorism and source code offences (§66F · §65)

**Forensics lab** (`/lab`) — 6 workbenches:

1. Integrity — live SHA-256, seizure hash vs. current hash
2. Order of volatility — RFC 3227 sequencing drill
3. File signature inspector — magic numbers vs. extensions
4. Chain of custody builder — seizure to production
5. Section 63 certificate clinic — admissible or not
6. Toolkit reference — FTK Imager, Autopsy, EnCase/X-Ways, Cellebrite/AXIOM, Volatility, Wireshark, write blockers, C-DAC

**3 branching investigations** (`/sims`) — scored decisions:

* The departing associate (§43 · §66 · §72A)
* The customer care call (§66C · §66D · §318 BNS)
* The morphed image (§66E · §79 · Rules 2021)

**12 landmark authorities** (`/cases`) — flashcards: Shreya Singhal, Puttaswamy, Anvar P.V., Arjun Panditrao, Aveek Sarkar, Sharat Babu Digumarti, Christian Louboutin, MySpace, Anuradha Bhasin, Suhas Katti, Sony Sambandh, Shafhi Mohammad.

## Project structure

```text
src/
  app/               # Next.js App Router pages
    page.tsx         # home + exhibit demo
    modules/         # modules index + [id] reader
    lab/             # lab workbenches page
    sims/            # sims index + [id] runner
    cases/           # flashcards page
    progress/        # progress page
    layout.tsx       # fonts, metadata, StoreProvider, header/footer
    globals.css      # CSS variables, theme tokens
  components/        # Quiz, VideoBlock, CaseDeck, SimRunner, …
    lab/             # IntegrityBench, VolatilityBench, …
  data/              # content: modules, sims, cases, tools, videos, …
  lib/
    store.tsx        # localStorage state (done/scores/flipped/videos/theme)
    hash.ts          # WebCrypto SHA-256 helper
    video.ts         # embedUrl(): YouTube/Vimeo/Drive/mp4 → player src
```

See `docs/ARCHITECTURE.md` for routing/state/styling details and `docs/CONTENT.md` for editing content. Project definition docs: `docs/BRD.md` (business requirements), `docs/PRD.md` (product requirements), `docs/TRD.md` (technical requirements) and `docs/FEATURES.md` (feature catalogue).

## Editing content

All teaching content is plain TypeScript data — no CMS:

* Modules + quizzes: `src/data/modules.ts`
* Investigations: `src/data/sims.ts`
* Cases: `src/data/cases.ts`
* Lab: `src/data/vol.ts`, `sigs.ts`, `coc.ts`, `certs.ts`, `tools.ts`
* Default videos: `src/data/videos.ts` (empty strings = empty slot; per-device links override via the in-app paste box, stored in `localStorage`)

Details and field shapes: `docs/CONTENT.md`.

## State, theming, crypto notes

* State shape `{ done, scores, flipped, videos, theme }` under `localStorage` key `cyberlex` (`src/lib/store.tsx`). Nothing is uploaded.
* Theme: light/dark via `prefers-color-scheme` + manual override stored in state; Tailwind dark mode keys off `[data-theme="dark"]`.
* SHA-256 uses `crypto.subtle` (`src/lib/hash.ts`), which needs a secure context (https / localhost). The UI shows a fallback message otherwise.

## Deploy

Any Next.js host works (Vercel, Netlify, Docker, `npm run build && npm start`). No env vars to set.

## Disclaimer

Teaching aid only, not legal advice. Statute and rules change frequently and case law moves. Always verify against the bare act on India Code and read judgments in full before relying on any proposition.
