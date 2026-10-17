# CyberLex — Product Requirements Document (PRD)

> Version 1.0 · 17 Oct 2026 · Status: as-built reference
> Owner: CyberLex maintainer · Companion docs: [BRD](BRD.md) · [TRD](TRD.md) · [FEATURES](FEATURES.md) · [CONTENT](CONTENT.md)

## 1. Product overview

CyberLex is a single-page application teaching Indian cyber law and digital forensics. Nine statutory modules establish doctrine; six forensics workbenches build procedural competence; three scored investigations force decisions under pressure; twelve flashcards anchor landmark authorities. Progress is saved on the learner's device only.

Information architecture (all routes are real App Router pages):

| Route | Page |
|---|---|
| `/` | Home — hero, live SHA-256 exhibit demo, progress bar |
| `/modules` | Grid of the 9 statutory modules |
| `/modules/[id]` | Module reader — doctrine, video slot, applied drill |
| `/lab` | Six forensics workbenches |
| `/sims` | Branching investigations index |
| `/sims/[id]` | Scored investigation runner (no undo) |
| `/cases` | 12 landmark-authority flashcards |
| `/progress` | Completion and score summary, reset control |

## 2. Problem statement and product principles

A learner can recite §66 and still mischarge a case; a practitioner can know *Anvar* and still lose an exhibit on chain of custody. CyberLex is built to attack that gap directly.

Product principles (apply to every requirement below):

* **P-1 — Practice beats exposition.** Every module ends in a drill; every lab bench makes a decision; every simulation has consequences.
* **P-2 — Indian law first.** Provisions, authorities and procedure are Indian throughout; cross-references bridge the 2023 renumbering.
* **P-3 — No accounts, ever.** There is no sign-in and no server-side learner data.
* **P-4 — The device is the database.** Progress, scores and preferences live in `localStorage`; clearing them is a first-class, visible action.
* **P-5 — Honest framing.** The product never pretends to be authority: disclaimers are persistent and readable, not buried.

## 3. Goals and non-goals

**Goals**

* G-1 Give law students an exam-shaped, application-first way to learn Indian cyber law.
* G-2 Give practitioners a fast procedural refresher they can finish in one sitting per topic.
* G-3 Model litigation consequences (no undo, contamination, admissibility) rather than quiz trivia.
* G-4 Require zero operational setup from the learner: open a URL and start.
* G-5 Let faculty attach recordings without touching code.

**Non-goals**

* Not a certification, accreditation or graded assessment instrument.
* Not legal advice, and not a citable source.
* No accounts, social features, leaderboards or cloud sync.
* No CMS, admin UI or paid content.
* No telemetry, ads, or third-party trackers.
* No AI tutor/chatbot in the current scope.

## 4. Personas

| Persona | Context | Needs | How the studio serves them |
|---|---|---|---|
| **P1 — Exam candidate** (law student / judiciary aspirant) | Weeks before exams; needs recall plus application | Provisions with exact ingredients; practice on ambiguous facts; visible completion | Modules + drills, score tracking on `/progress` |
| **P2 — Practising advocate** (junior litigator, in-house counsel) | Needs a working grasp of electronic evidence procedure fast | Procedure that survives cross-examination; charge-selection judgement; tool awareness | Forensics lab benches, branching investigations, toolkit reference |
| **P3 — Faculty / trainer** | Preparing a class or a recorded lecture | A place for the recording mapped to doctrine; a classroom-ready lab | Video slot per module (paste a link, stored per device); benches usable live in class |
| **P4 — Forensics newcomer** (IT student/analyst) | Knows tooling, weak on legal framing | Admissibility rules, §63 BSA certificate, chain of custody, what each artifact proves | Lab benches with explicit "what it proves" framing; case flashcards |

## 5. Key user journeys

* **J-1 — First visit (P1).** Land on `/` → read the live exhibit demo and tamper with it (integrity lesson lands before any statute) → Start with the modules → read doctrine → answer 3 drill questions → module flips to done → `/progress` shows the first tick.
* **J-2 — Practitioner practice (P2).** `/sims` → choose an investigation → four decisions, each with immediate feedback and a running score, no undo → verdict screen ("Run it again" or leave) → score recorded.
* **J-3 — Faculty setup (P3).** `/modules/[id]` → paste a video link in the lesson slot → link persists on that device, overriding the shipped default → repeat per module. No developer, no CMS.
* **J-4 — Return visit.** Open the site → header shows the same theme and progress → `/progress` → pick up an unfinished module or improve a simulation score.

## 6. Functional requirements

Priorities are P0 (must ship) — every requirement below is currently shipped; planned work is listed in §12. Requirement IDs are traceable to features in [FEATURES.md](FEATURES.md).

### FR-01 — Home and live evidence demo (P0)

**Story:** As a learner, I want to see why electronic evidence integrity matters before I read any statute.

**Acceptance criteria**

* Home shows the product promise, headline counts (9/6/3/12), primary CTAs (`/modules`, `/lab`) and a completion bar reflecting saved progress.
* The evidence demo displays a sample exhibit text and its SHA-256; editing any character changes the current hash and visibly breaks the "intact" state.
* Hash computation uses the WebCrypto API; outside a secure context the demo shows a readable fallback instead of failing silently.

### FR-02 — Statutory modules reader (P0)

**Story:** As a learner, I want doctrine that reads like a practitioner wrote it, with exact ingredients and punishment.

**Acceptance criteria**

* `/modules` lists all 9 modules as cards with provision tag, title and one-line blurb.
* `/modules/[id]` renders: back link, provision tag, title, video slot, doctrine HTML, the drill, and a study note.
* Doctrine uses headings, tight lists, tables and callouts (`law`, `fx`, caution) consistently.
* Unknown ids render the Next.js 404 (`notFound()`), not a broken page.

### FR-03 — Applied drills (P0)

**Story:** As a learner, I want three deliberately ambiguous questions with explanations so I can test application, not recall.

**Acceptance criteria**

* Exactly 3 questions per module; each answer choice locks on selection and reveals an explanation that says *why* the wrong answers fail.
* Answering all three marks the module complete **regardless of score**; the score is recorded as `correct/total`.
* A completion panel links back to the module index; an "n of 3 answered" counter shows partial progress.

### FR-04 — Video lesson slots (P0)

**Story:** As faculty, I want to attach my recording to a module without touching code.

**Acceptance criteria**

* Each module renders a lesson slot headed by the module's video title.
* Empty slots show a clear "no lesson linked yet" state with a paste box.
* Accepts YouTube (any form), Vimeo, Google Drive share links, and direct `.mp4/.webm/.ogg`; the link is stored per device and overrides any shipped default.
* Clearing the pasted link restores the default (which is empty by default).
* Invalid or empty input renders the empty state, never a broken embed.

### FR-05 — Forensics lab (P0)

**Story:** As a practitioner-in-training, I want to practise the six procedural competencies that decide electronic-evidence cases.

**Acceptance criteria (per bench)**

| Bench | Requirement |
|---|---|
| Integrity | Live SHA-256 of a seized exhibit; learner compares seizure vs current hash; mismatch/corruption is detected and explained. |
| Order of volatility | Learner sequences 8 sources most→least volatile (RFC 3227 style); correct order is the data-file order; scored feedback. |
| File signature inspector | Seized files show filename/extension vs hex magic number and ASCII; learner decides match/mismatch and gets the true type and explanation. |
| Chain of custody builder | Learner orders 8 custody steps from seizure to production; scored. |
| §63 certificate clinic | 5 certificate scenarios; learner adjudicates admissible/not, with the statutory reasoning revealed. |
| Toolkit reference | Reference cards for FTK Imager, Autopsy, EnCase/X-Ways, Cellebrite/AXIOM, Volatility, Wireshark, write blockers and C-DAC: what it does, what it proves, where to press. |

* Volatility and chain-of-custody scores are persisted (`vol`, `coc`) and appear on `/progress`.
* The integrity bench explains the secure-context fallback when WebCrypto is unavailable.

### FR-06 — Branching investigations (P0)

**Story:** As a practitioner, I want decision consequences under time pressure — with no undo.

**Acceptance criteria**

* Three investigations: *The departing associate* (§43 · §66 · §72A), *The customer care call* (§66C · §66D · §318 BNS), *The morphed image* (§66E · §79 · Rules 2021).
* Each has 4 decision steps with 3 options scoring −2…+2; a running score is visible; choices cannot be revised or skipped.
* Each choice reveals immediate, litigation-shaped feedback explaining the consequence.
* After the last step: an explicit conclusion screen with score (`x of steps×2`) and one of three verdict bands; "Run it again" restarts; the completed run is recorded as `sim-<id>`.
* Unknown ids render 404.

### FR-07 — Landmark authorities deck (P0)

**Story:** As a learner, I want the twelve authorities that shape cyber-law practice as quick-recall cards.

**Acceptance criteria**

* 12 cards: name, citation, holding; tap flips the card.
* Flipped state persists per device.
* Holdings state the ratio in one compact paragraph (e.g. *Shreya Singhal*: §66A struck down; "actual knowledge" read down; incitement vs advocacy).

### FR-08 — Progress dashboard (P0)

**Story:** As a learner, I want to see exactly where I stand in one screen.

**Acceptance criteria**

* Modules: completion bar (`done / 9`), per-module done indicator and drill score (`x/3` or "—").
* Drill scores: rows for order-of-volatility, chain-of-custody and each completed simulation (`score / max`), with an explicit empty state.
* "Clear all saved progress" resets completion/scores/flips but preserves the learner's video links and theme.

### FR-09 — Theming (P0)

**Acceptance criteria**

* Default follows `prefers-color-scheme`; a header toggle overrides and persists per device.
* Override is applied via `data-theme` on the document root; all surfaces, rules and accent colors have light and dark token values.
* The toggle is keyboard reachable and labelled.

### FR-10 — Local persistence (P0)

**Acceptance criteria**

* State shape `{ done, scores, flipped, videos, theme }` persists under the `localStorage` key `cyberlex`; nothing is uploaded anywhere.
* Reads are defensive: corrupt or absent storage yields a clean empty state, never a crash.
* SSR renders an empty state first; the client hydrates from storage without hydration errors.

### FR-11 — Navigation, shell and disclaimers (P0)

**Acceptance criteria**

* Sticky header with active-route highlighting for Home, Modules, Forensics lab, Simulations, Case law, Progress.
* Footer carries the teaching-aid disclaimer; the home page repeats the "verify the bare act" caution.
* Unknown routes fall through to a standard 404.

### FR-12 — Secure-context fallback (P0)

**Acceptance criteria**

* Anywhere SHA-256 is required (home demo, integrity bench), absence of WebCrypto / insecure context produces an explanatory message with the requirement (https or localhost), not a silent failure or infinite spinner.

## 7. UX requirements

* **UX-1 States:** empty (no video, no scores), loading (hash "computing…"), error-tolerant (corrupt storage), and completed states are all explicitly designed — never blank regions.
* **UX-2 No undo, honestly presented:** simulation choices lock immediately; the product says so before it matters.
* **UX-3 Feedback always educates:** every wrong answer/choice explains why the wrong option fails, tied to a provision or doctrine.
* **UX-4 Responsive:** single-column on small screens; two-column study layouts on large screens; header nav wraps without overflow.
* **UX-5 Tone:** plain, professional legal English; no gamification confetti, no dark patterns; counts and scores stated without praise inflation.
* **UX-6 Accessibility baseline:** semantic headings, real buttons and links, visible focus, labelled controls (e.g. theme toggle `aria-label`), sufficient token contrast; a formal WCAG audit is future work (see TRD §13).
* **UX-7 Trust:** scores and completion are stated plainly; progress is a record, not a marketing claim.

## 8. Content requirements

* **CR-1** Each module has exactly 3 drill questions with one correct option and an explanation (`e`) that teaches.
* **CR-2** Indian citations use `§` tags and cross-reference BNS/BSA/BNSS renumberings where they exist.
* **CR-3** Doctrine bodies use the house structure: `<h3>` sections, `<ul class="tight">`, tables, and `callout law` / `callout fx` / plain `callout` boxes.
* **CR-4** Simulations carry 4 steps, each with 3 options spanning negative/neutral/positive scores and full consequence feedback.
* **CR-5** Cases carry name (`n`), citation (`c`), holding (`h`) — 12 total.
* **CR-6** Every content proposition is verified against the bare act or full judgment before commit (see [CONTENT.md](CONTENT.md)).
* **CR-7** Disclaimers remain visible in README, footer and home page.

## 9. Non-functional requirements (summary)

Full technical requirements are in [TRD.md](TRD.md). In brief:

* **Privacy:** no network transmission of learner data; no accounts; no analytics.
* **Performance:** statically rendered pages, minimal client JavaScript, no runtime data fetching; instant route loads on any modern connection.
* **Availability:** any static Next.js host; no runtime dependencies or environment configuration.
* **Robustness:** storage failures degrade to empty state; unsupported WebCrypto degrades to an explained fallback.

## 10. Measurement

No analytics by design (see BRD §9). Product success is checked through: the release checklist in §11; classroom/onboarding observation; and direct examination of the progress page in facilitated sessions. Any proposal to add measurement must first resolve the privacy constraint in BR-04.

## 11. Release criteria

Before shipping a change:

1. `npm run lint` and `npm run build` pass.
2. Every route renders: `/`, `/modules`, each `/modules/[id]` (9), `/lab`, `/sims`, each `/sims/[id]` (3), `/cases`, `/progress`, plus one unknown id per dynamic route (404).
3. Drills, sims, benches, case deck, theme toggle and video paste still behave per §6.
4. Progress survives a reload; "clear progress" preserves videos and theme.
5. Hash features verified on https/localhost and fallback verified off secure context.
6. Any content touched has been verified against the bare act / judgment (CR-6).
7. Disclaimers intact.

## 12. Out of scope and future considerations

| Idea | Value | Constraint to resolve |
|---|---|---|
| Progress export/import (file or code) | Move device without a server | Format versioning |
| More investigations / drill bank | Depth for repeat learners | Content authoring capacity |
| PWA / offline caching | Classroom use without Wi-Fi | Service-worker lifecycle; keep no-telemetry line |
| Cohort mode (shareable result codes) | Assessment without accounts | Privacy review (BR-04) |
| Print stylesheet | Handout-friendly doctrine/lab pages | Design pass |
| Glossary of terms | Reduce friction for P4 | Content pass |
| Hindi / other Indian languages | Access | i18n architecture (TRD §18) |
| AI tutor | Personalised practice | Excluded now; privacy and accuracy review required |

## 13. Open questions

* Who owns the periodic statute-review pass, and on what calendar?
* Should a re-run simulation keep the best score or the latest? (Current behaviour: latest.)
* Should modules get per-page metadata for sharing/search? (Currently only root metadata exists.)
* Should quiz state survive a page reload once started? (Current behaviour: in-page only; completion persists.)
* What is the default video hosting recommendation for faculty (Drive vs YouTube vs uploaded mp4)?
