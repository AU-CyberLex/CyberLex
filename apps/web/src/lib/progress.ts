import { CASES, COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import { embedUrl } from "@cyberlex/core";

export type LeaderboardEntry = {
  /** Display name. Local-only; never sent anywhere. */
  name: string;
  /** Snapshot of total points when the score was saved. */
  points: number;
  /** Snapshot of completed modules. */
  modules: number;
  /** Snapshot of reviewed case cards. */
  cases: number;
  /** Epoch milliseconds. */
  updatedAt: number;
};

export type CyberlexState = {
  done: Record<string, boolean>;
  scores: Record<string, number>;
  flipped: Record<string, boolean>;
  videos: Record<string, string>;
  theme?: "light" | "dark";
  /** Learner display name for the local leaderboard. */
  profile?: string;
  /** Device-local leaderboard snapshots. */
  board?: LeaderboardEntry[];
};

export const POINT_RULES = {
  moduleComplete: 50,
  drillCorrect: 10,
  labCorrect: 5,
  simPoint: 10,
  caseReviewed: 5,
} as const;

export const MAX_POINTS =
  MODULES.length * POINT_RULES.moduleComplete +
  MODULES.reduce((n, m) => n + m.quiz.length, 0) * POINT_RULES.drillCorrect +
  (VOL.length + COC.length) * POINT_RULES.labCorrect +
  SIMS.reduce((n, s) => n + s.steps.length * 2, 0) * POINT_RULES.simPoint +
  CASES.length * POINT_RULES.caseReviewed;

export const MAX_IMPORT_CHARS = 1_000_000;
export const MAX_BOARD_ENTRIES = 25;
export const MAX_NAME_LENGTH = 60;
export const MAX_VIDEO_URL_LENGTH = 2048;

const MODULE_IDS = MODULES.map((m) => m.id);
const DONE_KEYS = new Set([
  ...MODULE_IDS,
  ...SIMS.map((s) => "sim-" + s.id),
]);

const SCORE_LIMITS = new Map<string, number>();
for (const m of MODULES) SCORE_LIMITS.set(m.id, m.quiz.length);
SCORE_LIMITS.set("vol", VOL.length);
SCORE_LIMITS.set("coc", COC.length);
for (const s of SIMS) SCORE_LIMITS.set("sim-" + s.id, s.steps.length * 2);

const FLIPPED_KEYS = new Set(CASES.map((_, i) => String(i)));
const VIDEO_IDS = new Set(MODULE_IDS);
const MAX_DATE = 8_640_000_000_000_000;

export function createEmptyState(): CyberlexState {
  return { done: {}, scores: {}, flipped: {}, videos: {} };
}

/** Kept for callers that want a ready-made empty value. */
export const EMPTY_STATE: CyberlexState = createEmptyState();

export type SanitizeResult = {
  state: CyberlexState;
  warnings: string[];
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function cleanInt(value: unknown, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(max, Math.round(value)));
}

function countUnknown(source: Record<string, unknown>, known: Set<string>): number {
  return Object.keys(source).filter((key) => !known.has(key)).length;
}

/**
 * Turns untrusted storage or an imported file into the exact state shape the
 * app understands. Unknown keys are dropped, scores are clamped to the content
 * limits, and only supported video providers survive. This is deliberately
 * shared by the store and the import path so both fail closed.
 */
export function sanitizeState(raw: unknown): SanitizeResult {
  const warnings: string[] = [];
  let issues = 0;

  const outer = asRecord(raw);
  if (!outer) {
    return { state: createEmptyState(), warnings: ["No usable progress object was found."] };
  }
  const source = asRecord(outer.state) ?? outer;
  const state = createEmptyState();

  const done = asRecord(source.done);
  if (source.done !== undefined && !done) issues++;
  if (done) {
    for (const key of DONE_KEYS) {
      const value = done[key];
      if (value === undefined) continue;
      if (typeof value === "boolean") state.done[key] = value;
      else issues++;
    }
    issues += countUnknown(done, DONE_KEYS);
  }

  const scores = asRecord(source.scores);
  if (source.scores !== undefined && !scores) issues++;
  if (scores) {
    for (const [key, max] of SCORE_LIMITS) {
      const value = scores[key];
      if (value === undefined) continue;
      const clean = cleanInt(value, max);
      if (clean === null) {
        issues++;
        continue;
      }
      if (clean !== value) issues++;
      state.scores[key] = clean;
    }
    issues += countUnknown(scores, new Set(SCORE_LIMITS.keys()));
  }

  const flipped = asRecord(source.flipped);
  if (source.flipped !== undefined && !flipped) issues++;
  if (flipped) {
    for (const key of FLIPPED_KEYS) {
      const value = flipped[key];
      if (value === undefined) continue;
      if (typeof value === "boolean") state.flipped[key] = value;
      else issues++;
    }
    issues += countUnknown(flipped, FLIPPED_KEYS);
  }

  const videos = asRecord(source.videos);
  if (source.videos !== undefined && !videos) issues++;
  if (videos) {
    for (const key of VIDEO_IDS) {
      const value = videos[key];
      if (value === undefined) continue;
      if (typeof value !== "string") {
        issues++;
        continue;
      }
      const clean = value.trim().slice(0, MAX_VIDEO_URL_LENGTH);
      if (!clean || !embedUrl(clean)) {
        issues++;
        continue;
      }
      state.videos[key] = clean;
    }
    issues += countUnknown(videos, VIDEO_IDS);
  }

  if (source.profile !== undefined) {
    if (typeof source.profile !== "string") {
      issues++;
    } else {
      const profile = source.profile.trim().slice(0, MAX_NAME_LENGTH);
      if (profile) state.profile = profile;
      else issues++;
    }
  }

  if (source.theme !== undefined) {
    if (source.theme === "light" || source.theme === "dark") state.theme = source.theme;
    else issues++;
  }

  if (source.board !== undefined) {
    if (!Array.isArray(source.board)) {
      issues++;
    } else {
      const rows = new Map<string, LeaderboardEntry>();
      for (const item of source.board.slice(0, 100)) {
        const row = asRecord(item);
        if (!row) {
          issues++;
          continue;
        }
        const name = typeof row.name === "string" ? row.name.trim().slice(0, MAX_NAME_LENGTH) : "";
        if (!name) {
          issues++;
          continue;
        }
        const points = cleanInt(row.points, MAX_POINTS);
        const modules = cleanInt(row.modules, MODULES.length);
        const cases = cleanInt(row.cases, CASES.length);
        const updatedAt = cleanInt(row.updatedAt, MAX_DATE);
        if (points === null || modules === null || cases === null || updatedAt === null) issues++;
        const clean: LeaderboardEntry = {
          name,
          points: points ?? 0,
          modules: modules ?? 0,
          cases: cases ?? 0,
          updatedAt: updatedAt ?? 0,
        };
        const key = name.toLowerCase();
        const existing = rows.get(key);
        if (!existing || clean.updatedAt >= existing.updatedAt) rows.set(key, clean);
      }
      state.board = [...rows.values()]
        .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
        .slice(0, MAX_BOARD_ENTRIES);
      if (source.board.length > MAX_BOARD_ENTRIES) {
        warnings.push(`Only the top ${MAX_BOARD_ENTRIES} leaderboard rows were kept.`);
      }
    }
  }

  if (issues > 0) {
    warnings.push("Some invalid saved values were ignored or clamped to safe limits.");
  }
  return { state, warnings };
}
