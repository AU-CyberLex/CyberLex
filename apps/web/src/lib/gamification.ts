import { CASES, COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import {
  MAX_BOARD_ENTRIES,
  MAX_IMPORT_CHARS,
  MAX_NAME_LENGTH,
  POINT_RULES,
  sanitizeState,
  type CyberlexState,
  type LeaderboardEntry,
} from "./progress";

export { MAX_POINTS, POINT_RULES } from "./progress";

/* ------------------------------------------------------------------ */
/* Points                                                              */
/* ------------------------------------------------------------------ */

export type PointRow = {
  id: string;
  label: string;
  earned: number;
  max: number;
  detail: string;
};

function finiteScore(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
}

export function reviewedCases(state: CyberlexState): number {
  return CASES.reduce((n, _, i) => n + (state.flipped?.[i] ? 1 : 0), 0);
}

export function completedModules(state: CyberlexState): number {
  return MODULES.reduce((n, m) => n + (state.done?.[m.id] ? 1 : 0), 0);
}

export function pointRows(state: CyberlexState): PointRow[] {
  const moduleDone = MODULES.reduce(
    (n, m) => n + (state.done?.[m.id] ? POINT_RULES.moduleComplete : 0),
    0
  );
  const moduleMax = MODULES.length * POINT_RULES.moduleComplete;

  const drillDone = MODULES.reduce(
    (n, m) => n + Math.min(finiteScore(state.scores?.[m.id]), m.quiz.length) * POINT_RULES.drillCorrect,
    0
  );
  const drillMax = MODULES.reduce((n, m) => n + m.quiz.length, 0) * POINT_RULES.drillCorrect;

  const vol = Math.min(finiteScore(state.scores?.vol), VOL.length);
  const coc = Math.min(finiteScore(state.scores?.coc), COC.length);
  const labDone = (vol + coc) * POINT_RULES.labCorrect;
  const labMax = (VOL.length + COC.length) * POINT_RULES.labCorrect;

  const simDone = SIMS.reduce((n, s) => {
    const max = s.steps.length * 2;
    return n + Math.min(finiteScore(state.scores?.["sim-" + s.id]), max) * POINT_RULES.simPoint;
  }, 0);
  const simMax = SIMS.reduce((n, s) => n + s.steps.length * 2, 0) * POINT_RULES.simPoint;

  const cases = reviewedCases(state);
  const caseDone = cases * POINT_RULES.caseReviewed;
  const caseMax = CASES.length * POINT_RULES.caseReviewed;

  return [
    {
      id: "modules",
      label: "Modules completed",
      earned: moduleDone,
      max: moduleMax,
      detail: `${completedModules(state)} of ${MODULES.length} × ${POINT_RULES.moduleComplete} pts`,
    },
    {
      id: "drills",
      label: "Drill answers",
      earned: drillDone,
      max: drillMax,
      detail: `${drillDone / POINT_RULES.drillCorrect} correct × ${POINT_RULES.drillCorrect} pts`,
    },
    {
      id: "labs",
      label: "Lab checks",
      earned: labDone,
      max: labMax,
      detail: `Volatility ${vol}/${VOL.length} · chain ${coc}/${COC.length} × ${POINT_RULES.labCorrect} pts`,
    },
    {
      id: "sims",
      label: "Investigation points",
      earned: simDone,
      max: simMax,
      detail: `Simulation score × ${POINT_RULES.simPoint} pts`,
    },
    {
      id: "cases",
      label: "Case cards reviewed",
      earned: caseDone,
      max: caseMax,
      detail: `${cases} of ${CASES.length} × ${POINT_RULES.caseReviewed} pts`,
    },
  ];
}

export function totalPoints(state: CyberlexState): number {
  return pointRows(state).reduce((n, row) => n + row.earned, 0);
}

/* ------------------------------------------------------------------ */
/* Levels                                                              */
/* ------------------------------------------------------------------ */

export type Level = {
  level: number;
  name: string;
  min: number;
  next: number | null;
  /** 0..1 progress toward the next level. */
  progress: number;
};

const LEVELS = [
  { min: 0, name: "Junior clerk" },
  { min: 200, name: "Associate" },
  { min: 450, name: "Junior counsel" },
  { min: 750, name: "Senior counsel" },
  { min: 1000, name: "Silk" },
];

export function levelFor(points: number): Level {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].min) index = i;
  }
  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const progress = next ? Math.min(1, (points - current.min) / (next.min - current.min)) : 1;
  return { level: index + 1, name: current.name, min: current.min, next: next?.min ?? null, progress };
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

export type BadgeTone = "teal" | "amber" | "oxblood" | "navy";

export type Badge = {
  id: string;
  name: string;
  description: string;
  tone: BadgeTone;
  earned: boolean;
  progress: number;
  target: number;
  /** Short glyph, not an emoji. */
  mark: string;
};

function badge(
  id: string,
  name: string,
  description: string,
  tone: BadgeTone,
  progress: number,
  target: number,
  mark: string
): Badge {
  return {
    id,
    name,
    description,
    tone,
    earned: progress >= target,
    progress: Math.min(progress, target),
    target,
    mark,
  };
}

export function badgesFor(state: CyberlexState): Badge[] {
  const modules = completedModules(state);
  const cases = reviewedCases(state);
  const points = totalPoints(state);
  const drillScores = MODULES.map((m) => finiteScore(state.scores?.[m.id]));
  const simScores = SIMS.map((s) => finiteScore(state.scores?.["sim-" + s.id]));
  const perfectDrill = MODULES.some((m, i) => drillScores[i] === m.quiz.length);
  const drillsSat = MODULES.filter((m) => !!state.done?.[m.id]).length;
  const firstSim = SIMS.some((s) => state.scores?.["sim-" + s.id] !== undefined);
  const allSims = SIMS.every((s) => state.scores?.["sim-" + s.id] !== undefined);
  const perfectSim = SIMS.some((s, i) => simScores[i] === s.steps.length * 2);

  return [
    badge("first-module", "First authority", "Complete one statutory module.", "teal", modules, 1, "I"),
    badge("five-modules", "Doctrine five", "Complete five of the nine modules.", "teal", modules, 5, "V"),
    badge("all-modules", "Nine of nine", "Complete every statutory module.", "teal", modules, 9, "IX"),
    badge("perfect-drill", "Clean drill", "Score 3/3 on any applied drill.", "amber", perfectDrill ? 1 : 0, 1, "3"),
    badge("all-drills", "Every drill sat", "Attempt the drill in every module.", "amber", drillsSat, MODULES.length, "A"),
    badge("volatility", "Volatility order", "Sequence all eight sources correctly.", "navy", finiteScore(state.scores?.vol), VOL.length, "8"),
    badge("custody", "Chain intact", "Build the full chain of custody correctly.", "navy", finiteScore(state.scores?.coc), COC.length, "C"),
    badge("first-sim", "First verdict", "Finish one branching investigation.", "oxblood", firstSim ? 1 : 0, 1, "1"),
    badge("all-sims", "Three verdicts", "Finish all three investigations.", "oxblood", simScores.filter((n, i) => state.scores?.["sim-" + SIMS[i].id] !== undefined).length, SIMS.length, "3"),
    badge("perfect-sim", "No ground given", "Score the maximum on any investigation.", "oxblood", perfectSim ? 1 : 0, 1, "M"),
    badge("ten-cases", "Case brief", "Review ten of the twelve authorities.", "amber", cases, 10, "X"),
    badge("all-cases", "Twelve authorities", "Review every landmark authority card.", "amber", cases, CASES.length, "XII"),
    badge("points-500", "Five hundred", "Reach 500 points.", "teal", points, 500, "500"),
    badge("points-1000", "One thousand", "Reach 1,000 points.", "oxblood", points, 1000, "1k"),
  ];
}

/* ------------------------------------------------------------------ */
/* Local leaderboard                                                   */
/* ------------------------------------------------------------------ */

/**
 * Leaderboard rows are saved snapshots, not live totals. A learner has to press
 * "Save score" again after finishing more work; that is what the UI promises.
 * A profile with no saved row (for example after clearing progress) must not
 * reappear as a phantom zero-point entry.
 */
export function boardWithCurrent(state: CyberlexState): LeaderboardEntry[] {
  return [...(state.board || [])].sort(
    (a, b) => b.points - a.points || a.name.localeCompare(b.name)
  );
}

export function saveBoardEntry(state: CyberlexState, name: string): CyberlexState {
  const clean = name.trim().slice(0, MAX_NAME_LENGTH);
  if (!clean) return state;
  const entry: LeaderboardEntry = {
    name: clean,
    points: totalPoints(state),
    modules: completedModules(state),
    cases: reviewedCases(state),
    updatedAt: Date.now(),
  };
  const rows = (state.board || []).filter(
    (row) => row.name.trim().toLowerCase() !== clean.toLowerCase()
  );
  rows.push(entry);
  rows.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  const board = rows.slice(0, MAX_BOARD_ENTRIES);
  if (!board.some((row) => row.name.toLowerCase() === clean.toLowerCase())) {
    board[board.length - 1] = entry;
    board.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  }
  return { ...state, profile: clean, board };
}

/* ------------------------------------------------------------------ */
/* Export / import                                                     */
/* ------------------------------------------------------------------ */

export const EXPORT_VERSION = 1;

export type ExportEnvelope = {
  app: "cyberlex";
  version: number;
  exportedAt: string;
  state: CyberlexState;
};

export function exportProgress(state: CyberlexState): string {
  const envelope: ExportEnvelope = {
    app: "cyberlex",
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    state: sanitizeState(state).state,
  };
  return JSON.stringify(envelope, null, 2);
}

export type ImportResult = {
  state: CyberlexState;
  warnings: string[];
};

/**
 * Accepts either the versioned envelope produced by `exportProgress` or a raw
 * state object (useful when moving an older device). Rejects payloads that do
 * not look like progress at all; every field is sanitised before it reaches the
 * store, including scores, leaderboard rows and video URLs.
 */
export function importProgress(text: string): ImportResult {
  if (typeof text !== "string" || text.length > MAX_IMPORT_CHARS) {
    throw new Error("That progress file is too large. Use a file exported by CyberLex.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("The progress file must contain a JSON object.");
  }

  const envelope = parsed as Record<string, unknown>;
  const raw =
    envelope.state && typeof envelope.state === "object" && !Array.isArray(envelope.state)
      ? (envelope.state as Record<string, unknown>)
      : envelope;
  const keys = ["done", "scores", "flipped", "videos", "profile", "board", "theme"];
  if (!keys.some((key) => key in raw)) {
    throw new Error("No recognisable progress fields were found in that file.");
  }

  const warnings: string[] = [];
  if (envelope.app !== undefined && envelope.app !== "cyberlex") {
    warnings.push("This file was not exported by CyberLex; only known fields were kept.");
  }
  if (typeof envelope.version === "number" && envelope.version > EXPORT_VERSION) {
    warnings.push("The file was exported by a newer version; unknown fields were ignored.");
  }

  const result = sanitizeState(raw);
  warnings.push(...result.warnings);
  return { state: result.state, warnings };
}
