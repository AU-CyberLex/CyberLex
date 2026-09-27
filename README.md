# CyberLex — Cyber Law & Digital Forensics Studio

Learn cyber law the way it is actually litigated: statutory modules, a working forensics lab, and branching investigations built on Indian law — the IT Act 2000, DPDP Act 2023, Bharatiya Sakshya Adhiniyam 2023 and BNSS 2023.

Single self-contained web app. No build, no backend, no dependencies except Google Fonts. Open `cyberlex.html` in a browser and it works.

## Quick start

1. Open `cyberlex.html` directly, or serve the folder:
   ```powershell
   # any static server works, e.g.
   npx serve .
   ```
2. Navigate: Home → Modules → Forensics lab → Simulations → Case law → Progress.
3. Progress, drill scores and video links are saved in `localStorage` on that device only.

## What is inside

**9 statutory modules** (`#modules`) — each with doctrine, video slot, and 3-question applied drill:

* Unauthorised access and data theft (§43 · §66)
* Identity theft and cheating by personation (§66C · §66D)
* Obscene and sexually explicit material (§67 · §67A · §67B)
* Intermediary liability and safe harbour (§79 + IT Rules 2021)
* Data protection (DPDP Act 2023)
* Electronic evidence and the certificate (§63 BSA, formerly §65B)
* Jurisdiction and extra-territorial reach (§1(2) · §75)
* Interception, blocking and protected systems (§69 · §69A · §69B · §70)
* Cyber terrorism and source code offences (§66F · §65)

**Forensics lab** (`#lab`) — 6 workbenches:

1. Integrity — live SHA-256, seizure hash vs. current hash
2. Order of volatility — RFC 3227 sequencing drill
3. File signature inspector — magic numbers vs. extensions
4. Chain of custody builder — seizure to production
5. Section 63 certificate clinic — admissible or not
6. Toolkit reference — FTK Imager, Autopsy, EnCase/X-Ways, Cellebrite/AXIOM, Volatility, Wireshark, write blockers, C-DAC

**3 branching investigations** (`#sims`) — scored decisions with no undo:

* The departing associate (§43 · §66 · §72A)
* The customer care call (§66C · §66D · §318 BNS)
* The morphed image (§66E · §79 · Rules 2021)

**12 landmark authorities** (`#cases`) — flashcards: Shreya Singhal, Puttaswamy, Anvar P.V., Arjun Panditrao, Aveek Sarkar, Sharat Babu Digumarti, Christian Louboutin, MySpace, Anuradha Bhasin, Suhas Katti, Sony Sambandh, Shafhi Mohammad.

## Adding lesson videos

Each module has an empty video slot by default. In the app, paste a YouTube / Vimeo / Drive / direct `.mp4` link — it is stored locally via `state.videos`.

To ship defaults, edit the `VIDEOS` registry in `cyberlex.html`:

```js
const VIDEOS = {
  access: 'https://youtu.be/...',
  // ...
};
```

## Tech notes

* One file: `cyberlex.html` — HTML + CSS + vanilla JS, hash router (`#home`, `#modules/…`, `#lab`, `#sims`, `#cases`, `#progress`).
* Dark/light theme via `prefers-color-scheme` + manual override.
* Requires `WebCrypto` (`crypto.subtle`) for SHA-256 — needs a secure context (https / localhost). Shows a fallback message otherwise.

## Disclaimer

Teaching aid only, not legal advice. Statute and rules change frequently and case law moves. Always verify against the bare act on India Code and read judgments in full before relying on any proposition.