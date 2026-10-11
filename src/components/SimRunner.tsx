"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

type Step = { n: string; o: Array<{ t: string; s: number; f: string }> };

export function SimRunner({ simId, title, steps }: { simId: string; title: string; steps: Step[] }) {
  const { setState } = useStore();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const max = steps.length * 2;
  const verdict =
    score >= max - 1
      ? "You made the choices a careful practitioner would make."
      : score >= max / 2
        ? "Sound overall, but at least one decision gave away ground."
        : "This case would be in serious difficulty. Run it again.";

  if (finished) {
    return (
      <div className="rounded border p-6" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-medium">{title} — concluded</h3>
          <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>
            {score} of {max}
          </span>
        </div>
        <p className="mt-3 text-[0.92rem]">{verdict}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setScore(0);
              setPicked(null);
              setFinished(false);
            }}
            className="rounded border px-3 py-2 text-sm font-medium"
            style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
          >
            Run it again
          </button>
          <Link
            href="/sims"
            className="rounded border px-3 py-2 text-sm no-underline"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)", color: "var(--text)" }}
          >
            Back to investigations
          </Link>
        </div>
      </div>
    );
  }

  const st = steps[step];
  return (
    <div className="overflow-hidden rounded border" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5"
        style={{ background: "var(--surface-2)", borderColor: "var(--rule)" }}
      >
        <b className="font-serif">{title}</b>
        <span className="font-mono text-[0.8rem]" style={{ color: "var(--muted)" }}>
          Decision {step + 1} of {steps.length} · running score {score}
        </span>
      </div>
      <div className="p-5">
        <p className="mb-4 text-[0.95rem]">{st.n}</p>
        <div className="grid gap-1.5">
          {st.o.map((o, i) => (
            <button
              key={i}
              type="button"
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                setScore((s) => s + o.s);
              }}
              className="rounded border px-3 py-2 text-left text-[0.86rem]"
              style={{
                borderColor: "var(--rule)",
                background:
                  picked === i
                    ? o.s > 0
                      ? "var(--forensic-soft)"
                      : o.s < 0
                        ? "var(--seal-soft)"
                        : "var(--surface-2)"
                    : "var(--surface-2)",
                cursor: picked !== null ? "default" : "pointer",
              }}
            >
              {o.t}
            </button>
          ))}
        </div>
        {picked !== null && (
          <div>
            <div
              className="mt-3 rounded border p-2.5 text-[0.85rem]"
              style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
            >
              {st.o[picked].f}
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  if (step + 1 >= steps.length) {
                    setState((s) => ({
                      ...s,
                      done: { ...s.done, ["sim-" + simId]: true },
                      scores: { ...s.scores, ["sim-" + simId]: score },
                    }));
                    setFinished(true);
                  } else {
                    setStep((v) => v + 1);
                    setPicked(null);
                  }
                }}
                className="rounded border px-4 py-2 text-sm font-medium"
                style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
