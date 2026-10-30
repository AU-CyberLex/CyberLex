"use client";
import Link from "next/link";
import { MODULES } from "@cyberlex/content";
import { useStore } from "@/lib/store";

export function ModuleGrid() {
  const { state } = useStore();
  const completed = MODULES.filter((m) => state.done[m.id]).length;
  const pct = Math.round((completed / MODULES.length) * 100);
  return (
    <div>
      <div
        className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border p-4"
        style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
      >
        <div className="font-mono text-[0.8rem]" style={{ color: "var(--accent-ink)" }}>
          &gt;_ your progress
        </div>
        <div className="h-2 min-w-[140px] flex-1 overflow-hidden rounded-full" style={{ background: "var(--rule)" }}>
          <div className="h-full transition-all" style={{ width: pct + "%", background: "var(--accent)" }} />
        </div>
        <div className="font-mono text-[0.8rem]">
          {completed}/{MODULES.length} modules · {pct}%
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => {
          const done = !!state.done[m.id];
          const score = state.scores[m.id];
          const cta = done ? "Review" : score !== undefined ? "Continue" : "Start";
          return (
            <Link
              key={m.id}
              href={"/modules/" + m.id}
              className="group relative flex min-h-full flex-col gap-3 overflow-hidden rounded-lg border p-5 text-left no-underline transition-all hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
              style={{
                background: "var(--surface)",
                borderColor: done ? "var(--accent-ink)" : "var(--rule)",
                color: "var(--text)",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[1.6rem] font-bold leading-none" style={{ color: "var(--accent-ink)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.72rem]"
                  style={{ color: "var(--accent-ink)", borderColor: "var(--accent-ink)" }}
                >
                  {m.tag}
                </span>
              </div>
              <h3 className="text-[1.06rem] font-bold leading-snug tracking-tight">{m.title}</h3>
              <p className="m-0 text-[0.85rem]" style={{ color: "var(--muted)" }}>
                {m.blurb}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <span
                  className="rounded-sm px-1.5 py-0.5 font-mono text-[0.7rem] font-semibold"
                  style={
                    done
                      ? { background: "var(--accent)", color: "var(--on-accent)" }
                      : { border: "1px solid var(--rule)", color: "var(--muted)" }
                  }
                >
                  {done ? "✓ DONE" : "NOT STARTED"}
                </span>
                <span className="font-mono text-[0.72rem]" style={{ color: "var(--muted)" }}>
                  drill {score ?? 0}/{m.quiz.length}
                </span>
                <span className="ml-auto font-mono text-[0.8rem] font-semibold transition-transform group-hover:translate-x-1" style={{ color: "var(--accent-ink)" }}>
                  {cta} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
