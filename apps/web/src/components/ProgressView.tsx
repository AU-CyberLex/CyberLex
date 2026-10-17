"use client";
import { COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import { useStore } from "@/lib/store";

export function ProgressView() {
  const { state, setState } = useStore();
  const doneCount = MODULES.filter((m) => state.done[m.id]).length;
  const pct = Math.round((doneCount / MODULES.length) * 100);
  const rows: Array<[string, string]> = [];
  if (state.scores.vol !== undefined) rows.push(["Order of volatility", state.scores.vol + "/" + VOL.length]);
  if (state.scores.coc !== undefined) rows.push(["Chain of custody", state.scores.coc + "/" + COC.length]);
  SIMS.forEach((s) => {
    if (state.scores["sim-" + s.id] !== undefined)
      rows.push([s.title, state.scores["sim-" + s.id] + "/" + s.steps.length * 2]);
  });

  return (
    <div>
      <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">Your progress</h2>
      <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
        Stored in this browser only.
      </p>
      <div className="mt-6 rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
        <h3 className="font-serif text-lg font-medium">Modules completed</h3>
        <div className="my-3 h-2 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <i className="block h-full" style={{ width: pct + "%", background: "var(--forensic)" }} />
        </div>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {doneCount} of {MODULES.length} modules
        </p>
        <div className="mt-4">
          {MODULES.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2.5 border-t py-2 text-[0.88rem]"
              style={{ borderColor: "var(--rule)" }}
            >
              <span
                className="h-[7px] w-[7px] flex-none rounded-full"
                style={{ background: state.done[m.id] ? "var(--forensic)" : "var(--rule)" }}
              />
              <span>{m.title}</span>
              <span className="ml-auto font-mono text-[0.78rem]" style={{ color: "var(--muted)" }}>
                {state.scores[m.id] !== undefined
                  ? state.scores[m.id] + "/" + m.quiz.length
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
        <h3 className="font-serif text-lg font-medium">Drill scores</h3>
        <div className="mt-2">
          {rows.length ? (
            rows.map((r) => (
              <div
                key={r[0]}
                className="flex border-t py-2 text-[0.88rem]"
                style={{ borderColor: "var(--rule)" }}
              >
                <span>{r[0]}</span>
                <span className="ml-auto font-mono text-[0.78rem]" style={{ color: "var(--muted)" }}>
                  {r[1]}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              No lab or investigation scores yet.
            </p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => {
            const videos = state.videos;
            const theme = state.theme;
            setState({ done: {}, scores: {}, flipped: {}, videos, theme });
          }}
          className="rounded border px-3 py-2 text-sm"
          style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
        >
          Clear all saved progress
        </button>
      </div>
    </div>
  );
}
