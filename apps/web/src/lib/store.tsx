"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export const EMPTY_STATE: CyberlexState = {
  done: {},
  scores: {},
  flipped: {},
  videos: {},
};

const KEY = "cyberlex";
const Ctx = createContext<{
  state: CyberlexState;
  setState: React.Dispatch<React.SetStateAction<CyberlexState>>;
} | null>(null);

function read(): CyberlexState {
  if (typeof window === "undefined") return { ...EMPTY_STATE };
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      done: raw.done || {},
      scores: raw.scores || {},
      flipped: raw.flipped || {},
      videos: raw.videos || {},
      theme: raw.theme === "light" || raw.theme === "dark" ? raw.theme : undefined,
      profile: typeof raw.profile === "string" ? raw.profile : undefined,
      board: Array.isArray(raw.board) ? raw.board : [],
    };
  } catch {
    return { ...EMPTY_STATE };
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CyberlexState>({ ...EMPTY_STATE });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
    const root = document.documentElement;
    if (state.theme) root.setAttribute("data-theme", state.theme);
    else root.removeAttribute("data-theme");
  }, [state, ready]);
  const value = useMemo(() => ({ state, setState }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}
