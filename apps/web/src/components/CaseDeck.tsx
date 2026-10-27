"use client";
import { useMemo, useState } from "react";
import { CASES } from "@cyberlex/content";
import { useStore } from "@/lib/store";
import { reviewedCases } from "@/lib/gamification";

type Filter = "all" | "reviewed" | "unreviewed";

export function CaseDeck() {
  const { state, setState } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const reviewed = reviewedCases(state);
  const pct = Math.round((reviewed / CASES.length) * 100);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CASES.map((c, i) => ({ ...c, i })).filter((c) => {
      const matchesQuery =
        !q ||
        c.n.toLowerCase().includes(q) ||
        c.c.toLowerCase().includes(q) ||
        c.h.toLowerCase().includes(q);
      const isReviewed = !!state.flipped[c.i];
      const matchesFilter =
        filter === "all" || (filter === "reviewed" ? isReviewed : !isReviewed);
      return matchesQuery && matchesFilter;
    });
  }, [query, filter, state.flipped]);

  const toggle = (i: number) => {
    setState((s) => ({ ...s, flipped: { ...s.flipped, [i]: !s.flipped[i] } }));
  };

  const setAll = (value: boolean) => {
    setState((s) => ({
      ...s,
      flipped: { ...s.flipped, ...Object.fromEntries(CASES.map((_, i) => [i, value])) },
    }));
  };

  return (
    <div>
      <div
        className="mt-5 rounded border p-4"
        style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <b className="font-serif text-lg font-medium">Case review</b>
              <span
                className="font-mono text-[0.76rem]"
                style={{ color: "var(--muted)" }}
                aria-live="polite"
              >
                {reviewed} of {CASES.length}
              </span>
            </div>
            <p className="mt-1 text-[0.82rem]" style={{ color: "var(--muted)" }}>
              Reveal a holding to mark the card reviewed. The count and +5 points persist on this
              device.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setAll(true)}
              disabled={reviewed === CASES.length}
              className="rounded border px-2.5 py-1.5 text-[0.8rem] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
            >
              Reveal all
            </button>
            <button
              type="button"
              onClick={() => setAll(false)}
              disabled={reviewed === 0}
              className="rounded border px-2.5 py-1.5 text-[0.8rem] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
            >
              Hide all
            </button>
          </div>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full"
          style={{ background: "var(--surface-2)" }}
          role="progressbar"
          aria-label="Case cards reviewed"
          aria-valuemin={0}
          aria-valuemax={CASES.length}
          aria-valuenow={reviewed}
        >
          <i className="block h-full" style={{ width: pct + "%", background: "var(--amber)" }} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="min-w-[240px] flex-1">
            <span className="sr-only">Search authorities</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              placeholder="Search by case, citation or holding…"
              className="w-full rounded border px-3 py-2 text-sm"
              style={{ background: "var(--surface-2)", borderColor: "var(--rule)", color: "var(--text)" }}
            />
          </label>
          <div className="flex gap-1" role="group" aria-label="Filter case cards">
            {(
              [
                ["all", "All"],
                ["reviewed", "Reviewed"],
                ["unreviewed", "Unreviewed"],
              ] as Array<[Filter, string]>
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className="rounded border px-2.5 py-1.5 text-[0.8rem]"
                style={
                  filter === value
                    ? { borderColor: "var(--seal)", background: "var(--seal-soft)", color: "var(--seal)" }
                    : { borderColor: "var(--rule)", background: "var(--surface-2)", color: "var(--muted)" }
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const flipped = !!state.flipped[c.i];
            return (
              <button
                key={c.n}
                type="button"
                onClick={() => toggle(c.i)}
                aria-pressed={flipped}
                aria-label={flipped ? `Hide holding for ${c.n}` : `Reveal holding for ${c.n}`}
                className="flex min-h-[210px] flex-col rounded border p-4 text-left transition-colors"
                style={{
                  background: flipped ? "var(--forensic-soft)" : "var(--surface)",
                  borderColor: flipped ? "var(--forensic)" : "var(--rule)",
                }}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-serif text-[1.02rem] font-medium leading-snug">{c.n}</span>
                  <span
                    className="mt-0.5 flex-none rounded-sm border px-1.5 py-0.5 font-mono text-[0.66rem]"
                    style={{
                      borderColor: flipped ? "var(--forensic)" : "var(--rule)",
                      color: flipped ? "var(--forensic)" : "var(--muted)",
                      background: "var(--surface)",
                    }}
                  >
                    {flipped ? "reviewed" : "open"}
                  </span>
                </span>
                <span className="mt-1 block font-mono text-[0.74rem]" style={{ color: "var(--muted)" }}>
                  {c.c}
                </span>
                <span
                  className="mt-3 block text-[0.84rem] leading-relaxed"
                  style={{ color: flipped ? "var(--text)" : "var(--muted)" }}
                >
                  {flipped ? c.h : "Tap to reveal the holding."}
                </span>
                <span className="mt-auto pt-3 text-[0.72rem]" style={{ color: "var(--muted)" }}>
                  {flipped ? "Reviewed · +5 pts" : "Unreviewed · +5 pts when opened"}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p
          className="mt-4 rounded border border-dashed p-6 text-center text-[0.86rem]"
          style={{ borderColor: "var(--rule)", color: "var(--muted)" }}
        >
          No authorities match that search and filter.
        </p>
      )}

      <p className="mt-5 text-[0.78rem]" style={{ color: "var(--muted)" }}>
        Twelve cards, one holding each. Read the full judgment before relying on any proposition —
        these are study prompts, not a digest.
      </p>
    </div>
  );
}
