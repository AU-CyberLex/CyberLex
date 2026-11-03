# CyberLex Phase 1 role scope: P7

**Owner:** P7 — cases, progress, videos, and gamification

## Deliverables

- Maintain the twelve landmark case cards and their reviewed state.
- Provide module lesson slots for YouTube, Vimeo, Google Drive preview, and direct HTTPS video files, with a clear empty state when no valid lesson is configured.
- Keep learner progress on-device and show module completion, scores, case review, points, levels, badges, and a device-local leaderboard.
- Provide validated progress export and import, plus an explicit reset action with clear preservation semantics.
- Prepare the Phase 1 demo email and this role-scope note.

## Boundaries and hand-offs

- P7 owns the cases, progress view, video slots, and gamification behavior. Module doctrine, quizzes, simulations, and lab exercise content remain with their assigned owners.
- Shared state shape, navigation, theme, and global styling affect other work. Coordinate those edits with the relevant owner before changing them, following the work-split rule.
- P7 does not publish lesson recordings, send demo invitations, deploy staging, or collect learner data. Those actions require the project owner’s destination, credentials, or explicit hand-off.
- No accounts, server-side progress, cross-device leaderboard, subscription, blockchain, biometrics, or advanced cryptography are in Phase 1 scope.

## Completion checks

- All twelve cards can be searched, filtered, revealed, and hidden; review state persists and contributes points once per card.
- Each module has a lesson slot. Supported URLs play; empty or invalid URLs leave a readable slot; iframe players use the sandbox attribute.
- Progress survives reload. Exported progress imports back, malformed input is rejected safely, and reset clears earned progress and leaderboard entries while preserving lesson links, theme, and display name.
- Points are derived from saved work, badges reflect completion, and leaderboard rows are saved local snapshots.
- The demo email remains a draft until its placeholders are replaced and the recipient, schedule, and demo URL are verified.
