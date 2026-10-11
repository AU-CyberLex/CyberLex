# Content guide

All teaching content is typed data in `src/data/`. Edit the file, save, and the corresponding page updates. No CMS, no rebuild plugins needed (just `npm run dev`).

## Modules + quizzes — `src/data/modules.ts`

Array of 9 entries: `id`, `tag` (provision label), `title`, `blurb`, `video` (slot heading), `body` (HTML doctrine), `quiz` (exactly 3 questions).

```ts
{
  id: 'identity',
  tag: '§66C · §66D',
  title: 'Identity theft and cheating by personation',
  blurb: '…',
  video: 'Impersonation online: 66C, 66D and the BNS cheating provisions',
  body: `<p>…</p>`,          // HTML string, rendered as-is
  quiz: [
    { q: '…', a: ['opt A', 'opt B', 'opt C'], c: 1, e: 'Explanation shown after answering.' },
    // …2 more
  ]
}
```

* `c` is the zero-based index of the correct option.
* Keep `blurb` to one line (card) and `body` structured with `<h3>` / `<ul class="tight">` / `<div class="callout …">` as in existing entries.
* Quiz completion marks the module done regardless of score; scores display as `correct/3` on `/progress`.

## Investigations — `src/data/sims.ts`

Array of 3 entries: `id`, `title`, `tag`, `blurb`, `steps` (4 decisions each).

```ts
{
  id: 'exfil', title: 'The departing associate', tag: '§43 · §66 · §72A',
  blurb: '…',
  steps: [
    { n: 'Narrative…', o: [
      { t: 'Choice text', s: -2, f: 'Feedback explaining the consequence.' },
      { t: 'Choice text', s: 2,  f: '…' },
      { t: 'Choice text', s: 0,  f: '…' },
    ]},
    // …3 more steps
  ]
}
```

* `s` is the score delta (−2 … +2). Max per sim = `steps × 2`.
* No undo by design — the runner advances on choice.

## Cases — `src/data/cases.ts`

`{ n, c, h }` = name, citation, holding. 12 entries rendered by `CaseDeck`; tap flips the card (persisted in `state.flipped`).

## Lab benches

| File | Content |
|---|---|
| `src/data/vol.ts` | 8 order-of-volatility sources, most → least volatile (array order is the answer) |
| `src/data/sigs.ts` | Seized files: filename, hex header, ASCII, true type, match/mismatch + explanation |
| `src/data/coc.ts` | 8 chain-of-custody steps in correct order (array order is the answer) |
| `src/data/certs.ts` | 5 certificate scenarios: text, `ok` (admissible?), explanation |
| `src/data/tools.ts` | Toolkit cards: name, category, what it does, what it proves, where to press |

Bench components live in `src/components/lab/` (`IntegrityBench`, `VolatilityBench`, `SignatureBench`, `CustodyBench`, `CertificateBench`, `ToolkitGrid`).

## Videos — `src/data/videos.ts` + in-app links

* `VIDEOS` maps module id → default URL (all empty by default → empty-slot UI).
* Accepts YouTube (any form), Vimeo, Drive share links, direct `.mp4/.webm/.ogg` — see `embedUrl()` in `src/lib/video.ts`.
* Users can paste a link in the app; it is stored per-device in `state.videos` and overrides the default. Clearing it restores the default.

## Conventions

* Indian-law citations use `§` tags plus BNS/BSA/BNSS cross-references where the 2023 codes renumbered an offence.
* Callouts in `body` HTML: `callout law` (provision), `callout fx` (forensics), plain `callout` (caution).
* Verify every proposition against the bare act / judgment before committing — the app footer and README carry the same disclaimer.
