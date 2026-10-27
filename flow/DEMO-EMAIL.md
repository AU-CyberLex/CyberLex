# Demo email — P7 review

Ready-to-send email for the team leader. Replace the bracketed name and, if the folder is hosted, the demo base URL. Attach the whole `flow/` folder (or a zip of it) so the links in the email have a local fallback.

---

**To:** [Team leader name]
**Cc:** [Project group / MOM owner]
**Subject:** P7 demo ready — cases, progress, videos and gamification (CyberLex Phase-1)
**Attachment:** `flow/` folder or `cyberlex-p7-demo.zip`

---

Hi [Team leader name],

P7 — **Cases + Progress + Videos + Gamification** — is ready for a short review before the November deadline. I have built a role-by-role demo that shows what each user sees and can do, plus an end-to-end node workflow. The same P7 behaviour is implemented in the Next.js app; the demo is a standalone hand-off so you can review it without running the app or creating an account.

**Start here:** [demo base URL] (or open `flow/index.html` from the attached folder)

| View | Link | What it shows |
|---|---|---|
| Demo hub | [base URL]/index.html | P7 scope, role cards and the five-minute path |
| Learner / client | [base URL]/client.html | Modules, 12 case cards, 9 video slots, progress, points, badges and local leaderboard |
| Faculty / instructor | [base URL]/faculty.html | Lesson video manager, preview, class readiness and role boundary |
| Administrator | [base URL]/admin.html | Video registry, embed tests, storage inspector, gamification rules and audit |
| Reviewer / team lead | [base URL]/reviewer.html | Acceptance checklist, test matrix, demo script and sign-off |
| End-to-end workflow | [base URL]/workflow.html | Interactive node map with role filters and walkthrough playback |

Supporting documents: [README](README.md) · [Role scope](ROLE-SCOPE.md).

### Suggested 20-minute agenda

1. **Learner overview and case deck (5 min)** — points and level, search for `Anvar`, reveal a card and show the +5 points movement.
2. **Video slots (4 min)** — play a linked YouTube/Vimeo/Drive/direct-file fixture, then attach a sample to an empty slot. Every player is sandboxed; empty slots are clean prompts, not broken frames.
3. **Progress and portability (4 min)** — export the JSON, clear progress, show that lesson links and theme survive, then import the file back. The reset bug is fixed.
4. **Workflow (4 min)** — open the node map, filter by role, click a support node and play the learner path.
5. **Scope and sign-off (3 min)** — confirm the role boundaries and record a verdict on the Reviewer page.

### What I need from the review

* Approve P7, approve with notes, or request changes.
* Confirm the role scope: **no accounts, no backend, no server-side learner data**. Faculty and admin pages are scopes, not authentication. Learner state stays in `localStorage` and moves only by exported file.
* Confirm that production video defaults stay **empty** by design, with provider fixtures used only in the demo.

### Demo notes

* The demo is seeded with a sample learner: Aarav Mehta, 620 points, 5/9 modules, 8/12 cases, 7/14 badges and 4/9 video slots.
* Use **Reset demo** in the top bar to restore the seeded state between rehearsals. The progress-page reset is different: it clears learning data but keeps lesson links, theme and display name.
* Open the folder directly for a single page, or serve it with `python -m http.server 4173 --directory flow` so lesson links and progress are shared across role pages on the same origin.
* The local leaderboard is a per-browser comparison tool, not a class ranking. The faculty cohort snapshot is labelled as demo-only. The reviewer sign-off is a local note, not a server audit trail.
* Test evidence: `npm run typecheck`, `npm run test` and `npm run build` pass. The demo was clicked through in-browser for case search/reveal, video attach/remove, export/import/reset, leaderboard save, faculty preview, admin embed test, reviewer sign-off and workflow playback.

If the 20 minutes is tight, the two must-see screens are **Learner → Cases** and **Learner → Progress**; the workflow page is the fastest way to see the whole journey in one view.

Thanks,
[Your name]

---

## Shorter follow-up version

**Subject:** P7 demo — 20-minute review before November

Hi [Team leader name],

P7 (cases, progress, videos and gamification) is ready for review. The demo hub is here: [demo base URL] (or open `flow/index.html` from the attachment). The learner view shows the 12 case cards, 9 video slots, export/import/reset, points, badges and local leaderboard; the workflow page shows the end-to-end node path.

Could we take 20 minutes this week? I need a verdict on P7 and confirmation that the Phase-1 boundary stays local-only — no accounts, no backend, no server-side learner data. The full agenda and test notes are in `flow/README.md` and `flow/ROLE-SCOPE.md`.

Thanks,
[Your name]
