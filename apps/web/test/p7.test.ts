import { test } from "node:test";
import assert from "node:assert/strict";
import { CASES, COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import {
  badgesFor,
  boardWithCurrent,
  completedModules,
  exportProgress,
  importProgress,
  levelFor,
  MAX_POINTS as GAME_MAX_POINTS,
  pointRows,
  reviewedCases,
  saveBoardEntry,
  totalPoints,
} from "../src/lib/gamification";
import {
  MAX_IMPORT_CHARS,
  MAX_POINTS,
  createEmptyState,
  sanitizeState,
  type CyberlexState,
} from "../src/lib/progress";

const YT = "https://www.youtube.com/watch?v=cQYACLLAPOw";
const MP4 = "https://cdn.example.edu/lecture.mp4";

function fullState(): CyberlexState {
  return {
    done: Object.fromEntries(MODULES.map((m) => [m.id, true])),
    scores: {
      ...Object.fromEntries(MODULES.map((m) => [m.id, m.quiz.length])),
      vol: VOL.length,
      coc: COC.length,
      ...Object.fromEntries(SIMS.map((s) => ["sim-" + s.id, s.steps.length * 2])),
    },
    flipped: Object.fromEntries(CASES.map((_, i) => [String(i), true])),
    videos: {},
  };
}

test("points add up to the advertised maximum", () => {
  assert.equal(GAME_MAX_POINTS, 1100);
  assert.equal(MAX_POINTS, 1100);
  const full = fullState();
  assert.equal(totalPoints(full), MAX_POINTS);
  for (const row of pointRows(full)) {
    assert.equal(row.earned, row.max, row.id);
  }
  assert.equal(completedModules(full), MODULES.length);
  assert.equal(reviewedCases(full), CASES.length);
});

test("all-drills uses completion, not a positive score", () => {
  const done = Object.fromEntries(MODULES.map((m) => [m.id, true]));
  const state: CyberlexState = {
    ...createEmptyState(),
    done,
    scores: Object.fromEntries(MODULES.map((m) => [m.id, 0])),
  };
  const badge = badgesFor(state).find((b) => b.id === "all-drills");
  assert.ok(badge);
  assert.equal(badge.earned, true);
  assert.equal(badge.progress, MODULES.length);
});

test("first investigation badge counts a zero score as finished", () => {
  const state: CyberlexState = {
    ...createEmptyState(),
    scores: { ["sim-" + SIMS[0].id]: 0 },
  };
  assert.equal(badgesFor(state).find((b) => b.id === "first-sim")?.earned, true);
});

test("levels use the documented thresholds", () => {
  assert.equal(levelFor(0).name, "Junior clerk");
  assert.equal(levelFor(199).level, 1);
  assert.equal(levelFor(200).name, "Associate");
  assert.equal(levelFor(450).name, "Junior counsel");
  assert.equal(levelFor(750).name, "Senior counsel");
  assert.equal(levelFor(1000).name, "Silk");
  assert.equal(levelFor(1000).next, null);
  assert.equal(levelFor(MAX_POINTS).progress, 1);
});

test("leaderboard rows are saved snapshots, not live totals", () => {
  let state: CyberlexState = { ...createEmptyState(), profile: "Aarav Mehta" };
  assert.deepEqual(boardWithCurrent(state), [], "a profile alone is not a saved row");

  state = saveBoardEntry(state, "Aarav Mehta");
  assert.equal(boardWithCurrent(state).length, 1);
  assert.equal(boardWithCurrent(state)[0].points, 0);

  state = {
    ...state,
    done: { access: true },
    scores: { access: 3 },
  };
  assert.equal(totalPoints(state), 80);
  assert.equal(boardWithCurrent(state)[0].points, 0, "the saved snapshot stays put");

  state = saveBoardEntry(state, "Aarav Mehta");
  assert.equal(boardWithCurrent(state)[0].points, 80, "saving updates the snapshot");
  assert.equal(boardWithCurrent(state)[0].name, "Aarav Mehta");
});

test("a low-scoring current learner is still kept in the top-25 board", () => {
  const rows = Array.from({ length: 25 }, (_, i) => ({
    name: "Learner " + i,
    points: 1000 - i,
    modules: 0,
    cases: 0,
    updatedAt: 1,
  }));
  let state: CyberlexState = { ...createEmptyState(), board: rows };
  state = saveBoardEntry(state, "Low scorer");
  const board = boardWithCurrent(state);
  assert.equal(board.length, 25);
  assert.equal(board.filter((row) => row.name === "Low scorer").length, 1);
});

test("sanitizeState drops unknown data and clamps known fields", () => {
  const raw = {
    done: { access: true, identity: "yes", bogus: true },
    scores: {
      access: 99,
      identity: 1.6,
      vol: -3,
      ["sim-" + SIMS[0].id]: 999,
      bogus: 10,
    },
    flipped: { 0: true, 1: "yes", 99: true },
    videos: {
      access: YT,
      identity: "https://evil.example/embed",
      evidence: "http://cdn.example.edu/lecture.mp4",
      dpdp: MP4,
      bogus: YT,
    },
    profile: "  Aarav Mehta  ",
    theme: "sepia",
    board: [
      { name: "Meera", points: 999999, modules: 99, cases: 99, updatedAt: 2 },
      { name: "meera", points: 10, modules: 1, cases: 1, updatedAt: 1 },
      { name: "Rohan", points: 500, modules: 5, cases: 8, updatedAt: 3 },
    ],
  };
  const { state, warnings } = sanitizeState(raw);
  assert.equal(state.done.access, true);
  assert.equal(state.done.identity, undefined);
  assert.equal(state.done.bogus, undefined);
  assert.equal(state.scores.access, MODULES[0].quiz.length);
  assert.equal(state.scores.identity, 2);
  assert.equal(state.scores.vol, 0);
  assert.equal(state.scores["sim-" + SIMS[0].id], SIMS[0].steps.length * 2);
  assert.equal(state.scores.bogus, undefined);
  assert.equal(state.flipped["0"], true);
  assert.equal(state.flipped["1"], undefined);
  assert.equal(state.flipped["99"], undefined);
  assert.equal(state.videos.access, YT);
  assert.equal(state.videos.dpdp, MP4);
  assert.equal(state.videos.identity, undefined);
  assert.equal(state.videos.evidence, undefined);
  assert.equal(state.videos.bogus, undefined);
  assert.equal(state.profile, "Aarav Mehta");
  assert.equal(state.theme, undefined);
  assert.equal(state.board?.length, 2);
  assert.equal(state.board?.[0].name, "Meera");
  assert.equal(state.board?.[0].points, MAX_POINTS);
  assert.ok(warnings.length > 0);
});

test("sanitizeState accepts an export envelope and rejects non-objects", () => {
  const envelope = { app: "cyberlex", state: { done: { access: true } } };
  assert.equal(sanitizeState(envelope).state.done.access, true);
  assert.deepEqual(sanitizeState(null).state, createEmptyState());
  assert.match(sanitizeState(null).warnings[0], /No usable progress/);
});

test("exportProgress writes a sanitized, versioned envelope", () => {
  const dirty: CyberlexState = {
    ...createEmptyState(),
    scores: { access: 999 },
    videos: { access: "https://evil.example/embed", identity: YT },
  };
  const parsed = JSON.parse(exportProgress(dirty)) as {
    app: string;
    version: number;
    state: CyberlexState;
  };
  assert.equal(parsed.app, "cyberlex");
  assert.equal(parsed.version, 1);
  assert.equal(parsed.state.scores.access, MODULES[0].quiz.length);
  assert.equal(parsed.state.videos.access, undefined);
  assert.equal(parsed.state.videos.identity, YT);
});

test("importProgress round-trips a full export", () => {
  const full = fullState();
  const result = importProgress(exportProgress(full));
  assert.equal(totalPoints(result.state), MAX_POINTS);
  assert.deepEqual(result.warnings, []);
});

test("importProgress rejects invalid payloads and reports warnings", () => {
  assert.throws(() => importProgress("{"), /valid JSON/);
  assert.throws(() => importProgress("[]"), /JSON object/);
  assert.throws(() => importProgress('{"foo":1}'), /No recognisable/);
  assert.throws(
    () => importProgress("x".repeat(MAX_IMPORT_CHARS + 1)),
    /too large/
  );

  const wrongApp = importProgress(
    JSON.stringify({ app: "other", state: { done: { access: true } } })
  );
  assert.equal(wrongApp.state.done.access, true);
  assert.match(wrongApp.warnings.join(" "), /not exported by CyberLex/);

  const newer = importProgress(
    JSON.stringify({ app: "cyberlex", version: 2, state: { done: { access: true } } })
  );
  assert.equal(newer.state.done.access, true);
  assert.match(newer.warnings.join(" "), /newer version/);
});

test("saveBoardEntry rejects an empty name without changing state", () => {
  const state = createEmptyState();
  assert.equal(saveBoardEntry(state, "   "), state);
});
