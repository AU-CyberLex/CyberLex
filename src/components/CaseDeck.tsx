"use client";
import { CASES } from "@/data/cases";
import { useStore } from "@/lib/store";

type C = { n: string; c: string; h: string };

export function CaseDeck() {
  const { state, setState } = useStore();
  const cases = CASES as unknown as C[];
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cases.map((c, i) => {
        const flipped = !!state.flipped[i];
        return (
          <button
            key={c.n}
            type="button"
            onClick={() =>
              setState((s) => ({ ...s, flipped: { ...s.flipped, [i]: !s.flipped[i] } }))
            }
            className="rounded border p-4 text-left"
            style={{
              background: flipped ? "var(--forensic-soft)" : "var(--surface)",
              borderColor: flipped ? "var(--forensic)" : "var(--rule)",
            }}
          >
            <h4 className="font-serif text-[1.02rem] font-medium">{c.n}</h4>
            <span className="mt-0.5 block font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
              {c.c}
            </span>
            <p className="mt-2 text-[0.86rem]" style={{ color: flipped ? "var(--text)" : "var(--muted)" }}>
              {flipped ? c.h : "Tap to reveal the holding."}
            </p>
          </button>
        );
      })}
    </div>
  );
}
