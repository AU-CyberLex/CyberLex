# P7 role scope — who sees what, who can do what

> CyberLex Phase-1 · P7 demo · Status: implemented and testable
>
> This document is the role boundary for the demo and the production app. It is deliberately blunt about what does **not** exist: no accounts, no server-side learner data, no cloud cohort and no admin content editor.

---

## 1. The model in one paragraph

Phase-1 has **no authentication**. A role is a **scope** that describes what a person is trying to do and which surfaces they need. The demo exposes four scopes as separate pages so a reviewer can see the boundaries. Anyone with the demo can open any page; a real deployment would put route-level auth in front of the faculty, admin and reviewer scopes. The learner's progress, scores, display name and leaderboard stay in that browser's `localStorage`. No role can read another browser's storage from a server, because there is no server.

This is not a gap in P7. It is the product's P-3/P-4 principle: **no accounts, ever; the device is the database.**

---

## 2. Permission matrix

| Capability | Learner / client | Faculty / instructor | Administrator | Reviewer / team lead |
|---|---|---|---|---|
| Open the demo hub | Yes | Yes | Yes | Yes |
| Read modules, lab, investigations, cases | Yes | Yes | Inspect | Inspect |
| Answer drills and save scores | Yes | Class demo only | No | No |
| Run lab benches and investigations | Yes | Yes, in class | Inspect | Inspect |
| Review case cards | Yes | Yes | Inspect | Inspect |
| Attach / replace / clear a lesson video | Own device | Yes | Test / clear | No |
| Preview the learner video player | Yes | Yes | Yes, in embed test | No |
| Copy a lesson link | Own device | Yes | Yes | No |
| Export progress | Own file | Own device | Demo file | No |
| Import progress | Own file | Own device | Demo file | No |
| Clear learning progress | Own device | Own device | Demo state | No |
| Reset the seeded demo | Yes | Yes | Yes | Yes |
| See another learner's device data | **No** | **No** | **No** | **No** |
| Create or manage accounts | **No** | **No** | **No** | **No** |
| Run a cloud cohort / class analytics | **No** | **No** | **No** | **No** |
| Edit statutory or case content | **No** | **No** | **No** | **No** |
| Sign off P7 | No | No | No | **Yes** |
| Publish a video to every device | No | **No** (local only) | **No** | No |

Legend: **Yes** = the page demonstrates the action. **Inspect** = read-only view of demo data. **Class demo only** = faculty can drive the learner page on the teaching device, but there is no class roster or account. **No** = intentionally out of scope, not a missing button.

---

## 3. Learner / client

**Demo page:** [`client.html`](client.html)
**Personas served:** P1 exam candidate, P2 practising advocate, P4 forensics newcomer.

### Sees

* A dashboard with points, level, next best action, module completion, lab count, investigation count, badges and a local leaderboard preview.
* Nine statutory modules with doctrine, a video slot and a three-question drill.
* Six forensics workbenches and three branching investigations.
* Twelve landmark-authority cards with search, filters and reveal state.
* Nine lesson video slots: four seeded provider fixtures and five clean empty slots.
* A progress page with points breakdown, lab/sim scores, all 14 badges, a module ledger and export/import/reset.
* A local leaderboard with a display-name field and saved snapshot rows.

### Can

* Read doctrine and sit drills. Completing the third answer marks the module done regardless of score.
* Run the lab and investigations; scores persist as `vol`, `coc` and `sim-<id>`.
* Review a case card for +5 points; hide it to remove the points.
* Attach a YouTube, Vimeo, Drive or direct-file lesson link on this device.
* Save a display name and current score to the local leaderboard.
* Export progress as versioned JSON, import it on another device, or clear learning progress.
* Reset the seeded demo from the top bar.

### Writes

* `done[module]` — module completion.
* `scores[module]`, `scores.vol`, `scores.coc`, `scores["sim-<id>"]` — saved scores.
* `flipped[index]` — case review state.
* `videos[module]` — local lesson link.
* `profile`, `board` — display name and local leaderboard rows.
* `theme` — light/dark preference.

### Cannot

* Create an account or sign in.
* Sync progress across devices without exporting/importing a file.
* See another learner's browser storage, scores or name.
* Publish a public profile or enter a class competition.
* Get a verified or server-authoritative leaderboard rank.
* Change statutory text or case holdings.

### Boundary note

A learner can edit their own display name and their own local score snapshot. That is acceptable because the leaderboard is a personal comparison tool, not an assessment. The product never presents it as a class ranking.

---

## 4. Faculty / instructor

**Demo page:** [`faculty.html`](faculty.html)
**Persona served:** P3 faculty / trainer.

### Sees

* Teaching readiness: lessons linked, lab benches, investigations and authority cards.
* A module-by-module video manager with provider, link, status and actions.
* A preview panel showing the exact player the learner will see.
* A module readiness list (linked / empty).
* A seeded demo cohort snapshot with points, modules, cases and saved date.
* A role-boundary panel listing what faculty can and cannot do.

### Can

* Attach, replace, preview, copy or clear a lesson link on this device.
* Use the provider samples to test YouTube, Vimeo, Drive and direct-file slots.
* See the empty state the learner sees when no lesson is linked.
* Run the lab benches, investigations and case deck in class.
* Reset the demo state on the teaching device.

### Writes

* `videos[module]` on the local device only.
* The demo state's `theme` and `profile` only when using the shared top-bar reset or learner page; the faculty page itself does not edit learner scores.

### Cannot

* See a learner's name, scores or progress from another device.
* Create accounts, enrol learners or run a cloud cohort.
* Publish a video to every device. The link is local by design.
* Edit statutory text, case holdings or quiz answers from this view.
* Bypass the iframe sandbox or inject scripts into the learner page.

### Why the cohort snapshot is seeded

Phase-1 has no server-side learner record. A real cohort table would require accounts, a class code or an opt-in sync — all outside P7. The faculty page labels the table **local demo only** so it cannot be mistaken for a real roster.

---

## 5. Administrator

**Demo page:** [`admin.html`](admin.html)
**Scope:** local operations for a static product.

### Sees

* Runtime posture: zero server calls, zero accounts, zero learner PII on any server, linked video slots.
* Operational health across Cases, Progress, Videos, Gamification and Storage.
* P7 release gates: typecheck, tests, build, sandbox presence and docs.
* Video registry: module, provider, raw link, status and actions.
* Storage inspector: the exact JSON shape exported by the progress page.
* Points rules, badge catalogue and local leaderboard.
* Role/permission matrix and audit log.
* MOM follow-ups: demo email, role-scope doc and reviewer page.

### Can

* Test an embed in a modal player.
* Clear a local video slot.
* Export/import the demo progress file.
* Clear learning progress while keeping videos, theme and display name.
* Inspect the role matrix and the session audit log.
* Reset the seeded demo from the top bar.

### Writes

* `videos[module]` when clearing a slot.
* The local progress file on import or clear.
* An in-session audit list (not persisted; it is a demo aid).

### Cannot

* Read a learner's browser storage from a server.
* Manage accounts, roles or permissions (there is no auth system).
* Run cohort analytics or see class-level data.
* Edit statutory content, case holdings or quiz answers.
* Change points or badge rules from the UI. They are code constants in `apps/web/src/lib/gamification.ts`; changing them is a code review, not an admin action.
* Turn the demo into a production back office.

### Admin boundary

The admin console is a **demo operations surface**. It is not a CMS, an identity provider or a gradebook. If a future phase adds accounts, this page must be redesigned around real authentication and authorisation; it must not be extended by quietly adding a server.

---

## 6. Reviewer / team lead

**Demo page:** [`reviewer.html`](reviewer.html)
**Scope:** P7 acceptance and sign-off.

### Sees

* P7 scope and out-of-scope boundaries.
* Eight acceptance checks covering cases, reset, export/import, four video providers, empty/sandbox behaviour, points/badges, leaderboard and docs/build.
* A provider and behaviour test matrix with expected and observed results.
* Build evidence for typecheck, tests and production build.
* A five-minute demo script with checkboxes.
* A sign-off form: reviewer name, role, verdict and notes.
* Links to every role page, the workflow and the README.

### Can

* Tick or clear acceptance checks; the state persists in `localStorage`.
* Tick the demo script steps.
* Record a verdict: **approved**, **approved with notes**, or **changes requested**.
* Sign the demo and clear the signature.

### Writes

* `cybernova.p7.review.v1` — checks, script steps, name, role, verdict, notes and timestamp.
* Nothing outside this browser.

### Cannot

* Create a server audit trail or notify anyone automatically.
* Change learner progress or video links from the reviewer page.
* Approve statutory content or replace the team's real tracker/MOM.
* Bypass the demo's scope boundaries.

### Sign-off caveat

The signature is a **local demo note**, not an audit record. The real decision should live in the team's tracker, MOM or release record. The page says this explicitly.

---

## 7. System / anonymous visitor

**Demo page:** [`index.html`](index.html), [`workflow.html`](workflow.html)

A visitor can:

* Read the hub, role cards, P7 acceptance summary and five-minute path.
* Open the interactive node map, filter by role, inspect a node and play the walkthrough.
* Open any role page in the demo.
* Reset the seeded demo state.

A visitor cannot:

* See another device's learner data.
* Create an account or a public profile.
* Reach a server-side admin surface, because none exists.

---

## 8. Page and route map

| Demo page | Production analogue | Access model |
|---|---|---|
| `index.html` | `/` | Public |
| `client.html` | `/modules`, `/lab`, `/sims`, `/cases`, `/progress` | Public learner scope |
| `faculty.html` | `/modules/[id]` video slot + class prep | Faculty scope; would be gated in production |
| `admin.html` | No production analogue in Phase-1 | Demo operations scope; would be gated in production |
| `reviewer.html` | No production analogue | Demo review scope; would be gated in production |
| `workflow.html` | No production analogue | Demo documentation |

The production app keeps learner state under the `cyberlex` key. The flow demo uses `cybernova.p7.demo.v1` so a reviewer can run the demo without touching the app's local state.

---

## 9. Data ownership and retention

| Data | Owner | Storage | Leaves the device? |
|---|---|---|---|
| Module completion | Learner | `localStorage` | Only in an exported JSON file |
| Drill/lab/sim scores | Learner | `localStorage` | Only in an exported JSON file |
| Case review state | Learner | `localStorage` | Only in an exported JSON file |
| Lesson video links | Faculty / learner device | `localStorage` | Only in an exported JSON file |
| Display name | Learner | `localStorage` | Only in an exported JSON file |
| Local leaderboard | Learner | `localStorage` | Only in an exported JSON file |
| Theme | Learner | `localStorage` | Only in an exported JSON file |
| Reviewer checks/sign-off | Reviewer | `localStorage` (`cybernova.p7.review.v1`) | No |
| Server-side learner record | Nobody | None | Not applicable |
| Telemetry | Nobody | None | No |

Export is the only sanctioned way to move learner data between devices. Import is the only sanctioned way to restore it. There is no background sync.

---

## 10. Phase-2 candidates (not P7)

These are explicitly **not** in P7 and must not be implied by the demo:

* Opt-in class code for faculty cohort analytics.
* Accounts and route-level auth.
* Cloud progress sync.
* Admin content editor.
* Server-authoritative leaderboards or certificates.
* Video publishing to a shared catalogue.

Any of these would change the privacy model, the data-retention model and the role boundaries. They need their own requirements, threat model and acceptance criteria.

---

## 11. Role acceptance checklist

Use this when reviewing the role boundaries:

- [ ] Learner can review a case, see points move, reset progress and keep lesson links.
- [ ] Learner can export and re-import progress through the file input.
- [ ] Learner can attach and clear a video on the device.
- [ ] Faculty can attach, preview and clear a lesson; the learner page sees the same link when served from the same origin.
- [ ] Faculty cannot see a real cohort table; the seeded snapshot is labelled as demo-only.
- [ ] Admin can test an embed and clear a slot.
- [ ] Admin can inspect the local JSON and reset progress without deleting videos or theme.
- [ ] Admin cannot edit points rules or statutory content from the UI.
- [ ] Reviewer can tick all checks, run the script and record a verdict.
- [ ] Reviewer sign-off is stored locally and labelled as a demo note.
- [ ] No page makes a network call for learner data.
- [ ] No page claims to provide legal advice or a verified rank.

---

## 12. One-line handoff

**Learner owns the learning record; faculty owns the lesson link on the teaching device; admin operates the local demo; reviewer verifies the claims; nobody owns a server-side learner profile, because there isn't one.**
