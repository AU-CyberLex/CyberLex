"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CyberlexState = {
  done: Record<string, boolean>;
  scores: Record<string, number>;
  flipped: Record<string, boolean>;
  videos: Record<string, string>;
  theme?: "light" | "dark";
};

const KEY = "cyberlex";
const Ctx = createContext<{
  state: CyberlexState;
  setState: React.Dispatch<React.SetStateAction<CyberlexState>>;
} | null>(null);

function read(): CyberlexState {
  if (typeof window === "undefined") return { done: {}, scores: {}, flipped: {}, videos: {} };
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      done: raw.done || {},
      scores: raw.scores || {},
      flipped: raw.flipped || {},
      videos: raw.videos || {},
      theme: raw.theme,
    };
  } catch {
    return { done: {}, scores: {}, flipped: {}, videos: {} };
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CyberlexState>({ done: {}, scores: {}, flipped: {}, videos: {} });
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

export function useIsDark() {
  const { state } = useStore();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const compute = () =>
      setDark(state.theme ? state.theme === "dark" : mq.matches);
    compute();
    mq.addEventListener("change", compute);
    return () => mq.removeEventListener("change", compute);
  }, [state.theme]);
  return dark;
}
