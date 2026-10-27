"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createEmptyState,
  sanitizeState,
  type CyberlexState,
} from "./progress";

export type { CyberlexState, LeaderboardEntry } from "./progress";
export { EMPTY_STATE } from "./progress";

const KEY = "cyberlex";

type StoreValue = {
  state: CyberlexState;
  setState: React.Dispatch<React.SetStateAction<CyberlexState>>;
  /** True when the browser refuses to persist state (private mode, quota, file://). */
  storageError: boolean;
};

const Ctx = createContext<StoreValue | null>(null);

function read(): CyberlexState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return createEmptyState();
    return sanitizeState(JSON.parse(raw)).state;
  } catch {
    return createEmptyState();
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CyberlexState>(createEmptyState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== KEY && event.key !== null) return;
      if (event.key === null || event.newValue == null) {
        setState(createEmptyState());
        return;
      }
      try {
        setState(sanitizeState(JSON.parse(event.newValue)).state);
      } catch {
        setState(createEmptyState());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
    const root = document.documentElement;
    if (state.theme) root.setAttribute("data-theme", state.theme);
    else root.removeAttribute("data-theme");
  }, [state, ready]);

  const value = useMemo(
    () => ({ state, setState, storageError }),
    [state, storageError]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}
