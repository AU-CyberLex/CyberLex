# CyberLex — Business Requirements Document (BRD)

> Version 1.0 · 17 Oct 2026 · Status: as-built reference
> Owner: CyberLex maintainer · Review cycle: on scope or statute change
> Related: [PRD](PRD.md) · [TRD](TRD.md) · [FEATURES](FEATURES.md) · [ARCHITECTURE](ARCHITECTURE.md) · [CONTENT](CONTENT.md)

## 1. Purpose

This document states why CyberLex exists as a product: the problem, the objectives, the audience, the scope boundaries and how success is judged. It stays at the level of outcomes and is technology-neutral. Product behaviour lives in [PRD.md](PRD.md), technical design in [TRD.md](TRD.md), and the shipped inventory in [FEATURES.md](FEATURES.md).

## 2. Executive summary

CyberLex is a free, browser-based teaching studio for Indian cyber law and digital forensics. It pairs statutory doctrine with a working forensics lab and scored, branching investigations, so learners practise applying the law to facts instead of memorising provisions in isolation.

It is built on four Indian instruments: the **IT Act 2000**, the **DPDP Act 2023**, the **Bharatiya Sakshya Adhiniyam 2023** (evidence) and the **BNSS 2023** (procedure), with BNS 2023 cross-references where the penal provisions apply.

The studio is a static Next.js web application: no backend, no database, no accounts, no analytics, no environment variables. All learner progress is stored on the learner's own device. Operating cost is effectively zero and no personal data ever leaves the browser.

## 3. Business context

The problem this addresses:

* **Doctrine is taught; application is not.** A syllabus tells a student what §66 says. It rarely makes them choose the right charge on deliberately ambiguous facts, which is exactly what practice, exams and moot problems demand.
* **Electronic evidence cases are lost on procedure.** *Anvar P.V.* and *Arjun Panditrao* turned the §63 BSA certificate into a hard requirement. Most learners never build a chain of custody, verify a hash or challenge a certificate — so they cannot cross-examine on one either.
* **The 2023 codes renumbered the map.** The BNS, BSA and BNSS replaced the IPC, Evidence Act and CrPC. Reported judgments, police papers and examiners still use the old numbers. Learners need both citations side by side.
* **The alternatives are thin or out of reach.** Free material is scattered across articles and bare acts; structured courses tend to be expensive, global in focus, or light on Indian procedure.

## 4. Business objectives

| ID | Objective |
|---|---|
| BO-1 | Close the gap between knowing a provision and applying it to facts. |
| BO-2 | Teach the procedural forensics competencies a cyber-law practitioner is cross-examined on: hashing, volatility, file signatures, chain of custody, the §63 certificate and standard tooling. |
| BO-3 | Keep the studio free to host, free to use and operationally near-zero cost. |
| BO-4 | Keep every learner's data on their own device — no accounts, no telemetry, no PII. |
| BO-5 | Let faculty drop their own recorded lessons into the studio without a CMS or developer help. |
| BO-6 | Keep teaching content reviewable, correctable and auditable (content lives in typed files under version control). |
| BO-7 | Present post-2023 statutory citations alongside the pre-2023 numbers learners will meet in practice. |

## 5. Audience and stakeholders

| Audience | Relationship to the studio | Primary need |
|---|---|---|
| Law students / judiciary aspirants | Primary learners | Exam-shaped recall plus applied problem-solving under Indian statutes |
| Junior advocates & in-house counsel | Practitioners | Fast, practical refreshers and litigation-shaped decision practice |
| Faculty / trainers | Content consumers and contributors | A place to attach recorded lessons to doctrine, and a ready classroom aid |
| IT / forensics beginners | Adjacent learners | The legal framing of forensic procedure they already know technically |
| Maintainer / content editor | Owner | Content accuracy, easy edits, minimal infrastructure |
| Degree/diploma programmes, moot trainers | Institutional adopters | A free, linkable lab for assignments and exercises |

## 6. Value proposition

> Learn cyber law the way it is actually litigated — Indian statutes, a real forensics lab, and decisions with consequences.

Differentiators:

1. **Indian-law native.** Every module, drill and investigation is anchored to Indian provisions and Indian authorities, including the 2023 renumbering.
2. **Practice-first.** Drills, six interactive benches and three scored investigations force decisions; nothing is a passive reading page.
3. **Procedure, not just doctrine.** The lab teaches exactly the procedural failure points that decide electronic evidence cases in court.
4. **Privacy by design.** No accounts, no server-side data, no analytics. Progress never leaves the device.
5. **Zero-infrastructure.** Static build, no backend, no cost to run, deployable on any Next.js host.

## 7. Scope

**In scope**

* 9 statutory modules, each with doctrine, a video lesson slot and a 3-question drill.
* 6 forensics workbenches (integrity/hash, volatility, file signatures, chain of custody, §63 certificate clinic, toolkit reference).
* 3 scored, branching investigations with no undo.
* 12 landmark-authority flashcards.
* Progress tracking (module completion, drill, lab and simulation scores) stored per device.
* Per-device video lesson links, light/dark theming, shareable static hosting.

**Out of scope**

* User accounts, cloud sync, or any server-side storage of learner data.
* Certificates, accreditation or formal assessment for institutions.
* Legal advice or citable authority (the studio is a teaching aid only).
* A CMS, admin panel or editorial workflow beyond version-controlled content files.
* Payments, ads, sponsorships or analytics/telemetry.
* Native mobile apps and multilingual content (currently English only).

## 8. Business requirements

| ID | Requirement | Rationale | Status |
|---|---|---|---|
| BR-01 | Deliver applied Indian cyber-law learning as a free web studio covering the IT Act, DPDP Act, BSA and BNSS/BNS. | BO-1, BO-7 | Shipped |
| BR-02 | Include a hands-on digital forensics lab covering the six procedural competencies. | BO-2 | Shipped |
| BR-03 | Operate with no backend, database, or environment secrets so hosting is free and maintenance is minimal. | BO-3 | Shipped |
| BR-04 | Store all learner state on the device; collect no telemetry and no personal data. | BO-4 | Shipped |
| BR-05 | Allow a faculty member to attach a video lesson per module with no developer involvement. | BO-5 | Shipped |
| BR-06 | Keep all teaching content in version-controlled, structured files that can be edited and reviewed like code. | BO-6 | Shipped |
| BR-07 | Show both pre-2023 and post-2023 citations wherever the codes renumbered an offence. | BO-7 | Shipped |
| BR-08 | Carry a visible "teaching aid, not legal advice" disclaimer in the product and repository. | Risk R-2 | Shipped |
| BR-09 | Support light and dark presentation, following the OS preference by default. | Learner comfort / accessibility | Shipped |
| BR-10 | Be deployable on any commodity Next.js host without configuration. | BO-3 | Shipped |

## 9. Success measures

The studio deliberately has **no analytics**, so success is judged through verifiable, non-telemetric signals rather than dashboards:

| Signal | Target | How it is observed |
|---|---|---|
| A learner completes at least 3 modules in a first sitting | 3+ modules marked done on the progress page | Direct observation / classroom feedback |
| Drill scores improve after simulation practice | Noticeable shift in drill accuracy between first and second attempts across a cohort | Facilitated session notes |
| Faculty can attach a lesson video unaided | Under 2 minutes, no developer help | Onboarding observation |
| Zero personal data on any server | Always | Directly verifiable: no backend exists |
| Zero hosting cost | Always | Deployment configuration |
| Quality gate holds | `npm run lint` and `npm run build` pass; all routes render without runtime errors | Release checklist (see PRD §11) |

Any future measurement must stay privacy-preserving; adding third-party analytics would require revisiting BR-04 and this section.

## 10. Constraints and assumptions

* Content accuracy depends on a maintainer with legal training reviewing the statute and case law; the repository convention is "verify the bare act before committing".
* Indian statute and rules change frequently; content needs a review pass at least every academic term and after any amending Act.
* Learners use modern evergreen browsers; the live hash feature additionally requires a secure context (https or localhost).
* English-only for now; no i18n infrastructure exists.
* Editing content means editing the repository and redeploying — an accepted trade-off of the no-CMS design.

## 11. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-1 | Content drifts from amended statutes or new case law | Medium | High | Review cadence; "verify against the bare act" convention and disclaimer in README, footer and home page |
| R-2 | Learners treat the studio as citable authority | Medium | High | Persistent disclaimers; drill and module copy that models verification habits |
| R-3 | Progress lost on device wipe / not portable across devices | High | Low | Documented clearly on the progress page; export/import is a future candidate (PRD §12) |
| R-4 | WebCrypto unavailable outside secure contexts | Medium | Low | Explicit fallback message in the integrity bench and home demo |
| R-5 | Sensitive subject matter (obscenity, terrorism provisions) handled poorly | Low | High | Statute-anchored, non-graphic editorial tone; content reviewed like code |
| R-6 | Legacy single-file prototype (`cyberlex.html`) mistaken for the product | Low | Low | Clearly labelled as reference-only in README; unreferenced by the app |
| R-7 | Single-maintainer bus factor for content accuracy | Medium | Medium | Content-as-code, CONTENT.md guide, documented review conventions |

## 12. Roadmap (suggested)

* **Near term:** full content verification pass against the current bare acts; ship default faculty video links; glossary of recurring terms.
* **Mid term:** progress export/import (move device without a server); more investigations and drills; print-friendly styles for classroom handouts.
* **Long term:** offline-capable PWA; cohort/assessment mode for classrooms (still without accounts, e.g. shareable result codes); additional Indian-language editions.

## 13. Change control

Requirements changes, scope shifts and new content enter through the repository (pull request) and are reviewed against this document. Any change that introduces server-side data, accounts or telemetry is a scope change to BR-03/BR-04 and requires an explicit decision recorded here.
