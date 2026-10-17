# CyberLex — Feature Catalogue

> Version 1.0 · 17 Oct 2026 · Status: as-built inventory
> Companion docs: [PRD](PRD.md) · [BRD](BRD.md) · [TRD](TRD.md) · [CONTENT](CONTENT.md) · [ARCHITECTURE](ARCHITECTURE.md)

This is the complete inventory of what CyberLex ships today, how each feature behaves, where it lives in the codebase, and how to accept it. Planned work is listed separately in §4.

## 1. Index

| ID | Feature | Routes | Status | Requirements |
|---|---|---|---|---|
| F-01 | Home & live evidence demo | `/` | Shipped | FR-01 |
| F-02 | Statutory modules | `/modules`, `/modules/[id]` | Shipped | FR-02 |
| F-03 | Applied drills | `/modules/[id]` | Shipped | FR-03 |
| F-04 | Video lesson slots | `/modules/[id]` | Shipped | FR-04 |
| F-05 | Integrity bench (SHA-256) | `/lab` | Shipped | FR-05 |
| F-06 | Order-of-volatility bench | `/lab` | Shipped | FR-05 |
| F-07 | File signature inspector | `/lab` | Shipped | FR-05 |
| F-08 | Chain-of-custody builder | `/lab` | Shipped | FR-05 |
| F-09 | §63 certificate clinic | `/lab` | Shipped | FR-05 |
| F-10 | Toolkit reference grid | `/lab` | Shipped | FR-05 |
| F-11 | Branching investigations | `/sims`, `/sims/[id]` | Shipped | FR-06 |
| F-12 | Landmark authorities deck | `/cases` | Shipped | FR-07 |
| F-13 | Progress dashboard | `/progress` | Shipped | FR-08 |
| F-14 | Light/dark theming | everywhere | Shipped | FR-09 |
| F-15 | Device-local persistence | everywhere | Shipped | FR-10 |
| F-16 | Navigation, shell & disclaimers | everywhere | Shipped | FR-11 |
| F-17 | Secure-context fallback | `/`, `/lab` | Shipped | FR-12 |

## 2. Feature details

### F-01 — Home & live evidence demo

* **What it does:** States the product promise, shows headline counts (9 modules · 6 workbenches · 3 investigations · 12 authorities), offers primary CTAs to `/modules` and `/lab`, and renders a live integrity demo.
* **The demo:** A sample exhibit (`seized_chat_log.txt`, tagged §63 BSA) is hashed at load; the learner edits the text and the current hash updates live. Any change breaks the "intact" state — the fastest possible lesson in why electronic evidence fails.
* **Completion bar:** Reflects `done / 9` modules from stored state.
* **Lives in:** `src/app/page.tsx`, `src/components/EvidenceDemo.tsx`, `src/lib/hash.ts`.
* **Accept:** edit one character → hash changes, integrity visibly breaks; secure-context fallback message otherwise.

### F-02 — Statutory modules

* **What it does:** Nine modules, each a self-contained study unit: doctrine written like a practitioner's note, provision tag with BNS/BSA cross-references, lesson video slot, drill and a study note.
* **The nine:** Unauthorised access and data theft (§43 · §66) · Identity theft and personation (§66C · §66D) · Obscene material (§67 · §67A · §67B) · Intermediary liability (§79 + IT Rules 2021) · Data protection (DPDP Act 2023) · Electronic evidence (§63 BSA, formerly §65B) · Jurisdiction (§1(2) · §75) · Interception, blocking, protected systems (§69 · §69A · §69B · §70) · Cyber terrorism and source code offences (§66F · §65).
* **Doctrine rendering:** house HTML structure — `<h3>` sections, tight lists, comparison tables, and callouts (`law`, `fx`, caution).
* **Lives in:** `src/app/modules/page.tsx`, `src/app/modules/[id]/page.tsx`, `src/data/modules.ts`, `src/components/ModuleGrid.tsx`.
* **Accept:** grid lists 9 cards; each reader renders doctrine + video + drill; unknown id → 404.

### F-03 — Applied drills

* **What it does:** Exactly three deliberately ambiguous questions per module. Selecting an answer locks it and reveals an explanation that says why each wrong option fails, tied to provisions. Answering all three marks the module complete regardless of score; the score records as `correct/3`.
* **Lives in:** `src/components/Quiz.tsx`; state keys: module id → `done`, module id → score.
* **Accept:** after the third answer, completion panel appears with score and a link back; partial progress shows "n of 3 answered"; answers cannot be changed once locked.

### F-04 — Video lesson slots

* **What it does:** Each module pairs doctrine with a lesson slot headed by the module's teaching title. Defaults are empty by design; faculty paste a link and it persists on that device, overriding the default. Clearing the link restores the empty/default state.
* **Supported sources:** YouTube (all URL forms → `youtube-nocookie`), Vimeo, Google Drive share links, direct `.mp4/.webm/.ogg`, or any other https iframe.
* **Lives in:** `src/components/VideoBlock.tsx`, `src/lib/video.ts`, defaults in `src/data/videos.ts`, overrides in `state.videos`.
* **Accept:** paste a valid link → embed plays (or renders); reload → still present; invalid input → readable empty state, never a broken frame.

### F-05 — Integrity bench (SHA-256)

* **What it does:** A live integrity workbench: the seized exhibit's hash is computed at seizure and compared with the current hash; learner detects and reasons about corruption/tampering.
* **Lives in:** `src/components/lab/IntegrityBench.tsx`; reuses `sha256Hex()`.
* **Accept:** matching hashes read as intact; any edit flips the verdict; insecure context shows the fallback explanation.

### F-06 — Order-of-volatility bench

* **What it does:** Sequencing drill over 8 evidence sources (RFC 3227 style, most → least volatile). The correct order is the array order in the data file; learner receives scored feedback.
* **Lives in:** `src/components/lab/VolatilityBench.tsx`, `src/data/vol.ts`; score persisted as `vol`.
* **Accept:** submission scores against the canonical order; score appears on `/progress`.

### F-07 — File signature inspector

* **What it does:** Seized files show filename/extension against the raw hex magic number and ASCII; the learner decides match/mismatch and is shown the true type and why extension-based trust fails.
* **Lives in:** `src/components/lab/SignatureBench.tsx`, `src/data/sigs.ts`.
* **Accept:** each file reveals true type + explanation after the decision.

### F-08 — Chain-of-custody builder

* **What it does:** Ordering drill over the 8 chain-of-custody steps from seizure to production; scored.
* **Lives in:** `src/components/lab/CustodyBench.tsx`, `src/data/coc.ts`; score persisted as `coc`.
* **Accept:** submitted order scored; error feedback names the broken link in the chain; score on `/progress`.

### F-09 — §63 certificate clinic

* **What it does:** Five certificate scenarios; learner adjudicates admissible / not admissible, then sees the statutory reasoning (the §65B→§63 BSA line of authority).
* **Lives in:** `src/components/lab/CertificateBench.tsx`, `src/data/certs.ts`.
* **Accept:** every scenario reveals explanation after the call.

### F-10 — Toolkit reference grid

* **What it does:** Reference cards for the standard toolkit — FTK Imager, Autopsy, EnCase/X-Ways, Cellebrite/AXIOM, Volatility, Wireshark, write blockers, C-DAC — each with category, what it does, what it proves, and where to press.
* **Lives in:** `src/components/lab/ToolkitGrid.tsx`, `src/data/tools.ts`.
* **Accept:** all cards render searchable content fields without truncation on mobile.

### F-11 — Branching investigations

* **What it does:** Three scored investigations — *The departing associate* (§43 · §66 · §72A), *The customer care call* (§66C · §66D · §318 BNS), *The morphed image* (§66E · §79 · Rules 2021). Four decisions each, three options per decision scoring −2…+2, running score shown, **no undo**. Every choice yields immediate feedback framing the litigation consequence. The conclusion screen rates the run (`score / steps×2`) in one of three verdict bands and offers "Run it again".
* **Lives in:** `src/app/sims/page.tsx`, `src/app/sims/[id]/page.tsx`, `src/components/SimRunner.tsx`, `src/components/SimGrid.tsx`, `src/data/sims.ts`; scores persisted as `sim-<id>` (latest run replaces previous).
* **Accept:** choices lock immediately; feedback appears before Continue; final score recorded; unknown id → 404.

### F-12 — Landmark authorities deck

* **What it does:** 12 tap-to-flip flashcards — name, citation, holding — covering Shreya Singhal, Puttaswamy, Anvar P.V., Arjun Panditrao, Aveek Sarkar, Sharat Babu Digumarti, Christian Louboutin, MySpace, Anuradha Bhasin, Suhas Katti, Sony Sambandh and Shafhi Mohammad (with its overruling noted).
* **Lives in:** `src/components/CaseDeck.tsx`, `src/data/cases.ts`; flipped state persisted in `state.flipped`.
* **Accept:** each card flips to a one-paragraph ratio; flip state survives reload.

### F-13 — Progress dashboard

* **What it does:** One screen for: modules completed (`done / 9` with progress bar), per-module drill scores (`x/3` or "—"), and drill/lab/sim score rows (order of volatility, chain of custody, each simulation). "Clear all saved progress" resets completion/scores/flips while preserving video links and theme.
* **Lives in:** `src/components/ProgressView.tsx`; reads `state.done` / `state.scores`.
* **Accept:** completing a drill or sim updates the dashboard; empty state reads "No lab or investigation scores yet."; reset keeps videos/theme.

### F-14 — Light/dark theming

* **What it does:** Follows the OS preference by default; a labelled header toggle overrides and persists per device. Applied via `data-theme` on the document root against full light/dark token sets.
* **Lives in:** `src/components/SiteHeader.tsx`, `src/lib/store.tsx`, tokens in `src/app/globals.css`, Tailwind config `darkMode`.
* **Accept:** toggle switches instantly; persists across reloads; no flash-of-wrong-theme beyond the mounted-state label.

### F-15 — Device-local persistence

* **What it does:** Single state object `{ done, scores, flipped, videos, theme }` under `localStorage` key `cyberlex`. Nothing is uploaded. Corrupt storage degrades to a clean empty state.
* **Lives in:** `src/lib/store.tsx` (`StoreProvider`, `useStore`).
* **Accept:** reload restores everything; manually corrupting the key does not crash any page; clearing site data yields a pristine first-visit state.

### F-16 — Navigation, shell & disclaimers

* **What it does:** Sticky header with active-route highlighting (Home, Modules, Forensics lab, Simulations, Case law, Progress), 1180px content rhythm, footer disclaimer, and the home-page "verify the bare act" caution. Unknown routes → 404.
* **Lives in:** `src/app/layout.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`.
* **Accept:** nested routes highlight their parent nav item; disclaimer visible on every page via footer.

### F-17 — Secure-context fallback

* **What it does:** Wherever SHA-256 is required (home demo, integrity bench), an unavailable `crypto.subtle` or insecure context produces an explanatory fallback instead of a silent failure or endless "computing…".
* **Lives in:** `src/lib/hash.ts` + call sites `EvidenceDemo.tsx`, `IntegrityBench.tsx`.
* **Accept:** served over plain http from a non-localhost origin, both surfaces explain the requirement.

## 3. Cross-cutting behaviours worth accepting together

* **Flow:** Home demo (integrity) → modules (doctrine) → drill (application) → lab (procedure) → sims (decisions) → cases (authority) → progress (record).
* **No-undo discipline:** drills lock answers; sims lock choices and show running consequences — by design, matching litigation reality.
* **Privacy line:** no accounts, no server, no telemetry; the only stored data is learning progress on the device.

## 4. Backlog (proposed — not built)

| ID | Idea | Notes |
|---|---|---|
| B-01 | Progress export/import | Versioned JSON; keeps the no-server rule |
| B-02 | Additional investigations & drill bank | More §66F/§69/DPDP scenarios |
| B-03 | Glossary of terms | For the forensics-newcomer persona |
| B-04 | Print stylesheet | Classroom handouts from module/lab pages |
| B-05 | PWA / offline mode | Service worker; must remain zero-telemetry |
| B-06 | Per-route metadata | Shareable deep links |
| B-07 | Cohort result codes | Assessment without accounts; needs privacy review |
| B-08 | Automated tests & CI | Unit (embedUrl, hash), content validation, route smoke |
| B-09 | Self-hosted fonts | Removes the last third-party request |
| B-10 | Hindi / regional editions | i18n architecture required |

## 5. Requirement traceability

| PRD requirement | Features |
|---|---|
| FR-01 Home & evidence demo | F-01 (uses F-17) |
| FR-02 Modules reader | F-02 |
| FR-03 Drills | F-03 |
| FR-04 Video slots | F-04 |
| FR-05 Forensics lab | F-05, F-06, F-07, F-08, F-09, F-10 |
| FR-06 Investigations | F-11 |
| FR-07 Case deck | F-12 |
| FR-08 Progress | F-13 |
| FR-09 Theming | F-14 |
| FR-10 Persistence | F-15 |
| FR-11 Shell & disclaimers | F-16 |
| FR-12 Secure-context fallback | F-17 |

## 6. Maintenance notes

* Content edits follow [CONTENT.md](CONTENT.md) field shapes; `VOL`/`COC` array order is the answer; quiz `c` is zero-based.
* Adding a module or sim automatically creates its route via `generateStaticParams()`; counts on the home page are hard-coded copy — update them with content.
* Before committing content, verify propositions against the bare act or full judgment (repo convention), and keep the disclaimers intact.
