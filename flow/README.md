# CyberLex Phase-1 demo — P7

A self-contained, role-by-role demo of **P7: Cases + Progress + Videos + Gamification**, plus an end-to-end node workflow for the team-leader review.

The demo has no backend, no accounts, no API keys and no build step at runtime. Every page is a standalone HTML file. Learner state stays in the browser's `localStorage`; nothing is uploaded.

> Teaching aid, not legal advice. The seeded names, scores and provider links are demo fixtures, not learner records.

---

## Quick start

### Option A — open a file directly

Open `flow/index.html` in a browser. Every page works as a single file.

### Option B — serve the folder (recommended for the full demo)

Serving the folder gives every role page the same origin, so a lesson link attached in **Faculty** is visible in **Learner**, and progress exported from **Learner** can be imported in **Admin**.

```powershell
python -m http.server 4173 --directory flow
```

Then open <http://localhost:4173/>.

No Node.js, database, environment variable or account is required to view the demo.

### Rebuild the standalone HTML files

The files in `flow/*.html` are generated from the fragments in `flow/src/`.

```powershell
node flow/build.mjs
```

The build inlines `styles.css`, `shared.js`, the page shell and the page body into each output file. Edit the source fragments, not the generated HTML.

---

## The six pages

| Page | Audience | What it demonstrates |
|---|---|---|
| [`index.html`](index.html) | Everyone | Demo hub: P7 scope, role cards, acceptance summary, five-minute path |
| [`client.html`](client.html) | Learner / client | Modules overview, 12 case cards, 9 video slots, progress, points, badges, local leaderboard, export/import/reset |
| [`faculty.html`](faculty.html) | Faculty / instructor | Video manager, preview, class readiness, local cohort snapshot, role boundary |
| [`admin.html`](admin.html) | Administrator | Operations overview, video registry, embed tests, storage inspector, gamification rules, role matrix, audit |
| [`reviewer.html`](reviewer.html) | Reviewer / team lead | P7 acceptance checklist, provider test matrix, demo script, sign-off |
| [`workflow.html`](workflow.html) | Everyone | Interactive node map of the learner, faculty and admin journey |

Supporting documents:

* [`ROLE-SCOPE.md`](ROLE-SCOPE.md) — who sees what, who can do what, and where the boundaries are.
* [`DEMO-EMAIL.md`](DEMO-EMAIL.md) — a ready-to-send email with the agenda and links.

---

## What P7 delivers

### 1. Cases

* **12 landmark authorities**, each with name, citation and a one-paragraph holding.
* Search across name, citation and holding.
* Filter by **All / Reviewed / Unreviewed**.
* Reveal or hide a single card, **Reveal all** or **Hide all**.
* Review state is persisted per card in `localStorage`.
* A reviewed card is worth **5 points**. Hiding it removes those 5 points, so points always match the saved review state.
* The card deck is usable on a phone and in a projected class.

The 12 authorities are:

| # | Authority | Citation |
|---|---|---|
| 1 | Shreya Singhal v. Union of India | (2015) 5 SCC 1 |
| 2 | K.S. Puttaswamy v. Union of India | (2017) 10 SCC 1 |
| 3 | Anvar P.V. v. P.K. Basheer | (2014) 10 SCC 473 |
| 4 | Arjun Panditrao Khotkar v. Kailash Gorantyal | (2020) 7 SCC 1 |
| 5 | Aveek Sarkar v. State of West Bengal | (2014) 4 SCC 257 |
| 6 | Sharat Babu Digumarti v. Govt of NCT of Delhi | (2017) 2 SCC 18 |
| 7 | Christian Louboutin SAS v. Nakul Bajaj | 2018 SCC OnLine Del 12215 |
| 8 | MySpace Inc. v. Super Cassettes Industries | 2016 SCC OnLine Del 6382 |
| 9 | Anuradha Bhasin v. Union of India | (2020) 3 SCC 637 |
| 10 | State of Tamil Nadu v. Suhas Katti | CC No. 4680 of 2004, Egmore |
| 11 | CBI v. Arif Azim (Sony Sambandh) | Delhi, 2003 |
| 12 | Shafhi Mohammad v. State of Himachal Pradesh | (2018) 2 SCC 801 |

### 2. Progress

* Module completion, drill scores, lab scores, investigation scores and case reviews in one view.
* Points breakdown by source, with earned / maximum for each source.
* **Reset** clears modules, drills, labs, simulations, case reviews and the leaderboard — but keeps lesson video links, theme and display name.
* **Export** downloads a versioned JSON file: `{ app: "cyberlex", version: 1, exportedAt, state }`.
* **Import** accepts that envelope or a raw state object, validates and clamps scores, and replaces the local state.
* A module ledger shows each module's score out of 3.
* Export is the portability story: there is no cloud sync and no server-side record.

### 3. Videos

* One lesson slot per module, nine slots total.
* Accepts **YouTube**, **Vimeo**, **Google Drive** and direct **`.mp4` / `.webm` / `.ogg`** links.
* Normalises share links to embed URLs.
* Empty slots show a clean attach prompt with provider samples, not a broken iframe.
* Attached links can be previewed, copied, changed or removed.
* Every frame player is sandboxed and uses a strict referrer policy.
* The link is stored on the teaching device only. Production defaults are intentionally empty in `packages/content/src/videos.ts`; the demo seeds four fixtures so the provider matrix can be tested immediately.

Provider fixtures used in the demo:

| Provider | Fixture |
|---|---|
| YouTube | `https://www.youtube.com/watch?v=cQYACLLAPOw` |
| Vimeo | `https://vimeo.com/76979871` |
| Google Drive | `https://drive.google.com/file/d/1yKbrlk-2yuzVTX3P33kKEV4wMoJRMwMW/view` |
| Direct file | `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4` |

Sandbox used on frame players:

```text
allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox
```

The fixtures are provider tests, not legal lessons. They exist only to prove that the slot accepts each format.

### 4. Gamification

Points are **derived from saved progress**, never stored as a separate running total. Re-answering a drill or re-opening a case cannot farm points.

| Action | Points | Maximum |
|---|---:|---:|
| Module completed | 50 | 9 × 50 = 450 |
| Drill answer correct | 10 | 27 × 10 = 270 |
| Lab check correct | 5 | 16 × 5 = 80 |
| Investigation point | 10 | 24 × 10 = 240 |
| Case card reviewed | 5 | 12 × 5 = 60 |
| **Total** | | **1,100** |

Levels:

| Level | Name | Minimum points |
|---:|---|---:|
| 1 | Junior clerk | 0 |
| 2 | Associate | 200 |
| 3 | Junior counsel | 450 |
| 4 | Senior counsel | 750 |
| 5 | Silk | 1,000 |

14 badges:

| Badge | Trigger |
|---|---|
| First authority | Complete one module |
| Doctrine five | Complete five modules |
| Nine of nine | Complete all nine modules |
| Clean drill | Score 3/3 on any drill |
| Every drill sat | Attempt every module drill |
| Volatility order | Sequence all eight volatility sources |
| Chain intact | Build the full chain of custody |
| First verdict | Finish one investigation |
| Three verdicts | Finish all three investigations |
| No ground given | Score the maximum on an investigation |
| Case brief | Review 10 of 12 authorities |
| Twelve authorities | Review all 12 authorities |
| Five hundred | Reach 500 points |
| One thousand | Reach 1,000 points |

The **local leaderboard** is a per-browser comparison tool. It saves a display name, points, module count, case count and timestamp. It is not a class ranking and cannot be verified by a server. The seeded demo has five rows, including the current profile.

---

## Roles at a glance

The full matrix is in [`ROLE-SCOPE.md`](ROLE-SCOPE.md). In Phase-1, a role page is a **scope**, not an authentication boundary. Anyone with the demo can open any page; a real deployment would gate the routes.

### Learner / client

**Sees:** dashboard, modules, lab, investigations, 12 case cards, 9 video slots, progress, points, badges, local leaderboard.

**Can:** read doctrine, answer drills, run labs and simulations, review cases, attach a lesson link on their own device, save a leaderboard score, export/import progress, reset learning data.

**Cannot:** sign in, sync across devices, see another learner's device data, publish a public profile.

### Faculty / instructor

**Sees:** module readiness, all nine video slots, preview player, class-ready lab/sim/case counts, a seeded cohort snapshot.

**Can:** attach, replace, preview, copy or clear a lesson link on this device; run the lab and case deck in class; reset the demo.

**Cannot:** see a learner's scores or name from another device, create accounts, enrol learners, run a cloud cohort, edit statutory content.

### Administrator

**Sees:** runtime posture (zero server calls, zero accounts, zero learner PII on any server), video registry, storage inspector, points rules, badge catalogue, leaderboard, permission matrix, audit log.

**Can:** test an embed, clear a local video slot, export/import the demo progress file, reset demo progress, inspect the role matrix and audit.

**Cannot:** read a learner's browser storage from a server, manage accounts (there are none), edit legal content, or turn the static demo into a back office.

### Reviewer / team lead

**Sees:** P7 scope, eight-item acceptance checklist, provider/behaviour test matrix, build evidence, five-minute demo script, sign-off form.

**Can:** tick checks, run the script, record a verdict (`approved`, `approved with notes`, `changes requested`) and sign the demo.

**Cannot:** create a server audit trail. The signature is a local demo note stored in this browser.

---

## End-to-end workflow

[`workflow.html`](workflow.html) is a node map with 15 nodes and 16 edges.

* Solid edges are the learner path.
* Dashed edges are the faculty and admin support paths.
* The role filter dims everything outside the selected scope.
* Clicking a node shows **what happens**, **who can do it**, **what is written** and **the acceptance check**.
* **Play walkthrough** moves through the learner path in order.
* **Reset view** returns to the landing node.

Stages:

1. **Discover** — landing → role view → dashboard.
2. **Learn** — module reader → video slot → applied drill.
3. **Practise** — forensics lab → investigations → case law.
4. **Prove** — progress → points and badges → export/import → reviewer sign-off.

The faculty path attaches the lesson that feeds the video node; the admin path tests the registry and moves the local progress file.

---

## Five-minute demo path

1. **Learner overview** — show points, level, next action and case count.
2. **Case deck** — search `Anvar`, reveal a card, show the count and `+5 points`.
3. **Video slot** — open **Videos**, play a linked provider, then attach a sample to an empty slot.
4. **Progress** — export the JSON, clear progress, show that lesson links and theme survive, import the file back.
5. **Leaderboard** — save a display name and score; the current row is marked **you**.
6. **Workflow** — open the node map, play the walkthrough, click a support node.
7. **Sign-off** — open **Reviewer**, tick the checks and record a verdict.

Reset the seeded data from the top bar between rehearsals.

---

## Data model

Demo progress key:

```text
cybernova.p7.demo.v1
```

Reviewer sign-off key:

```text
cybernova.p7.review.v1
```

Demo state shape:

```json
{
  "profile": "Aarav Mehta",
  "done": { "access": true },
  "scores": { "access": 3, "vol": 8, "sim-exfil": 7 },
  "flipped": { "0": true },
  "videos": { "access": "https://www.youtube.com/watch?v=..." },
  "board": [
    { "name": "Meera Nair", "points": 710, "modules": 7, "cases": 12, "updatedAt": 1761000000000 }
  ],
  "theme": "light"
}
```

The production app uses a separate key, `cyberlex`, and the same no-server rule.

### Seeded demo state

* Profile: **Aarav Mehta**
* Points: **620** of 1,100
* Level: **3 · Junior counsel**
* Modules: **5 / 9**
* Cases: **8 / 12**
* Badges: **7 / 14**
* Videos: **4 / 9** linked
* Leaderboard: **5** seeded rows

Reset from the top bar to restore this state. The progress-page reset and admin reset are different: they clear learning data but keep lesson links, theme and display name.

### Export / import

Export downloads a dated file such as `cyberlex-progress-2026-10-27.json`:

```json
{
  "app": "cyberlex",
  "version": 1,
  "exportedAt": "2026-10-27T00:00:00.000Z",
  "state": { "...": "..." }
}
```

Import accepts either the envelope or a raw state object. Unknown fields are ignored; scores are clamped; invalid JSON and unrecognisable files are rejected with a readable error.

---

## Source layout

```text
flow/
  build.mjs                 # inlines src fragments into standalone HTML
  src/
    shell.html              # shared head, top bar, nav, footer
    styles.css              # full demo design system
    shared.js               # state, scoring, badges, videos, export/import
    index.body.html         # hub
    client.body.html        # learner view
    faculty.body.html       # faculty view
    admin.body.html         # admin view
    reviewer.body.html      # reviewer sign-off
    workflow.body.html      # node map
  index.html                # generated
  client.html               # generated
  faculty.html              # generated
  admin.html                # generated
  reviewer.html             # generated
  workflow.html             # generated
  README.md
  ROLE-SCOPE.md
  DEMO-EMAIL.md
```

The production P7 implementation lives in the Next.js app:

* `apps/web/src/lib/store.tsx` — persisted profile, board and sanitised reads.
* `apps/web/src/lib/gamification.ts` — points, levels, badges, local leaderboard, export/import.
* `apps/web/src/components/ProgressView.tsx` — progress, gamification and reset/export/import UI.
* `apps/web/src/components/CaseDeck.tsx` — 12-card deck, search, filters, persisted review state.
* `apps/web/src/components/VideoBlock.tsx` — video slots, provider normalisation, sandboxed iframe.
* `packages/content/src/videos.ts` — production defaults, intentionally empty.

The flow demo mirrors those behaviours with a separate local key so it can be handed to a reviewer without running the Next.js app.

---

## Test evidence

Run from the repository root:

```powershell
npm run typecheck
npm run test
npm run build
```

Expected results:

* Typecheck passes across the workspace.
* Content and core tests pass.
* Production build generates the static pages.

The flow demo was exercised in a browser for:

* 12 case cards, search, filter, reveal/hide all, persisted review and points movement.
* Reset that clears scores but keeps videos and theme.
* Export/import round-trip through the real file input.
* 9 video slots; YouTube, Vimeo, Drive and direct-file players; empty slot; sandbox attribute.
* Points, 14 badges, level and local leaderboard save.
* Faculty attach/preview/clear and admin embed/clear.
* Reviewer checklist persistence and sign-off.
* Workflow filter, node detail, walkthrough playback and reset.

---

## Boundaries and non-goals

* No backend, accounts, auth, cloud sync, telemetry or third-party scripts.
* No server-side learner data; there is no cohort analytics to show.
* No admin content editor; statutory content is typed data owned outside P7.
* No real certification, grading or legal advice.
* The leaderboard is local and unverified by design.
* Video fixtures are for provider testing, not teaching content.
* The reviewer sign-off is a local note, not an audit trail.

Phase-2 could add an opt-in class code for cohort analytics, but that would change the privacy model and is out of scope for P7.
