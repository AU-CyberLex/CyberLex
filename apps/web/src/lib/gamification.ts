import { CASES, COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import type { CyberlexState, LeaderboardEntry } from "./store";

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

export const POINT_RULES = {
  moduleComplete: 50,
  drillCorrect: 10,
  labCorrect: 5,
  simPoint: 10,
  caseReviewed: 5,
} as const;

function finiteScore(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0;
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

export const MAX_POINTS = pointRows({
  done: Object.fromEntries(MODULES.map((m) => [m.id, true])),
  scores: {
    ...Object.fromEntries(MODULES.map((m) => [m.id, m.quiz.length])),
    vol: VOL.length,
    coc: COC.length,
    ...Object.fromEntries(SIMS.map((s) => ["sim-" + s.id, s.steps.length * 2])),
  },
  flipped: Object.fromEntries(CASES.map((_, i) => [i, true])),
  videos: {},
}).reduce((n, row) => n + row.max, 0);

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
  const allDrills = MODULES.every((_, i) => drillScores[i] > 0);
  const firstSim = SIMS.some((_, i) => simScores[i] > 0 || state.scores?.["sim-" + SIMS[i].id] !== undefined);
  const allSims = SIMS.every((s) => state.scores?.["sim-" + s.id] !== undefined);
  const perfectSim = SIMS.some((s, i) => simScores[i] === s.steps.length * 2);

  return [
    badge("first-module", "First authority", "Complete one statutory module.", "teal", modules, 1, "I"),
    badge("five-modules", "Doctrine five", "Complete five of the nine modules.", "teal", modules, 5, "V"),
    badge("all-modules", "Nine of nine", "Complete every statutory module.", "teal", modules, 9, "IX"),
    badge("perfect-drill", "Clean drill", "Score 3/3 on any applied drill.", "amber", perfectDrill ? 1 : 0, 1, "3"),
    badge("all-drills", "Every drill sat", "Attempt the drill in every module.", "amber", drillScores.filter((n) => n > 0).length, MODULES.length, "A"),
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

export function boardWithCurrent(state: CyberlexState): LeaderboardEntry[] {
  const rows = [...(state.board || [])];
  if (state.profile) {
    const name = state.profile.trim().toLowerCase();
    const withoutCurrent = rows.filter((row) => row.name.trim().toLowerCase() !== name);
    withoutCurrent.push({
      name: state.profile,
      points: totalPoints(state),
      modules: completedModules(state),
      cases: reviewedCases(state),
      updatedAt:
        rows.find((row) => row.name.trim().toLowerCase() === name)?.updatedAt ?? Date.now(),
    });
    return withoutCurrent.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
  }
  return rows.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
}

export function saveBoardEntry(state: CyberlexState, name: string): CyberlexState {
  const clean = name.trim().slice(0, 60);
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
  return { ...state, profile: clean, board: rows.slice(0, 25) };
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
    state,
  };
  return JSON.stringify(envelope, null, 2);
}

function cleanRecord<T>(
  raw: unknown,
  map: (value: unknown) => T | undefined
): Record<string, T> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, T> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const next = map(value);
    if (next !== undefined) out[key] = next;
  }
  return out;
}

function cleanBoard(raw: unknown): LeaderboardEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((row): row is Record<string, unknown> => !!row && typeof row === "object" && !Array.isArray(row))
    .map((row) => {
      const name = typeof row.name === "string" ? row.name.trim().slice(0, 60) : "";
      const points = finiteScore(row.points);
      const modules = finiteScore(row.modules);
      const cases = finiteScore(row.cases);
      const updatedAt = finiteScore(row.updatedAt);
      return { name, points, modules, cases, updatedAt };
    })
    .filter((row) => row.name.length > 0)
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .slice(0, 25);
}

export type ImportResult = {
  state: CyberlexState;
  warnings: string[];
};

/**
 * Accepts either the versioned envelope produced by `exportProgress` or a raw
 * state object (useful when moving an older device). Rejects payloads that do
 * not look like progress at all; clamps every score to a sane value.
 */
export function importProgress(text: string): ImportResult {
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
  if (envelope.app && envelope.app !== "cyberlex") {
    warnings.push("This file was not exported by CyberLex; only known fields were kept.");
  }
  if (typeof envelope.version === "number" && envelope.version > EXPORT_VERSION) {
    warnings.push("The file was exported by a newer version; unknown fields were ignored.");
  }

  const scores = cleanRecord<number>(raw.scores, (value) =>
    typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : undefined
  );
  const done = cleanRecord<boolean>(raw.done, (value) =>
    typeof value === "boolean" ? value : undefined
  );
  const flipped = cleanRecord<boolean>(raw.flipped, (value) =>
    typeof value === "boolean" ? value : undefined
  );
  const videos = cleanRecord<string>(raw.videos, (value) =>
    typeof value === "string" && value.trim() ? value.trim().slice(0, 2048) : undefined
  );
  const profile =
    typeof raw.profile === "string" && raw.profile.trim()
      ? raw.profile.trim().slice(0, 60)
      : undefined;
  const theme = raw.theme === "light" || raw.theme === "dark" ? raw.theme : undefined;

  return {
    state: { done, scores, flipped, videos, profile, board: cleanBoard(raw.board), theme },
    warnings,
  };
}
