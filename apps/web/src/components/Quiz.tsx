"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { POINT_RULES } from "@/lib/progress";

type Q = { q: string; a: string[]; c: number; e: string };

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function Quiz({ moduleId, quiz }: { moduleId: string; quiz: Q[] }) {
  const { state, setState } = useStore();
  /** question index -> chosen option index (an answer locks once given) */
  const [locked, setLocked] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const answered = Object.keys(locked).length;
  const correct = Object.entries(locked).filter(([i, j]) => quiz[+i].c === Number(j)).length;
  const best = state.scores[moduleId];

  const answer = (i: number, j: number) => {
    if (locked[i] !== undefined) return;
    const next = { ...locked, [i]: j };
    setLocked(next);
    if (Object.keys(next).length === quiz.length) {
      const score = Object.entries(next).filter(([qi, qj]) => quiz[+qi].c === Number(qj)).length;
      setState((s) => ({
        ...s,
        done: { ...s.done, [moduleId]: true },
        // keep the best attempt so a weaker retake never lowers the saved score
        scores: { ...s.scores, [moduleId]: Math.max(s.scores[moduleId] ?? 0, score) },
      }));
      setDone(true);
    }
  };

  const points = POINT_RULES.moduleComplete + correct * POINT_RULES.drillCorrect;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: "var(--rule)" }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={quiz.length}
          aria-valuenow={answered}
          aria-label="Drill progress"
        >
          <div
            className="h-full transition-all"
            style={{ width: (answered / quiz.length) * 100 + "%", background: "var(--accent)" }}
          />
        </div>
        <span className="font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
          {answered}/{quiz.length}
        </span>
        {best !== undefined && (
          <span
            className="whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.72rem]"
            style={{ borderColor: "var(--accent-ink)", color: "var(--accent-ink)" }}
            title="Best score saved on this device"
          >
            best {best}/{quiz.length}
          </span>
        )}
      </div>

      {quiz.map((q, i) => {
        const isLocked = locked[i] !== undefined;
        return (
          <div key={i} className="mb-6" role="group" aria-label={`Question ${i + 1}`}>
            <p className="mb-2.5 text-[0.92rem] font-medium">
              <span className="mr-2 font-mono text-[0.78rem]" style={{ color: "var(--accent-ink)" }}>
                Q{i + 1}
              </span>
              {q.q}
            </p>
            <div className="grid gap-1.5">
              {q.a.map((a, j) => {
                const isCorrect = q.c === j;
                const picked = locked[i] === j;
                const good = isLocked && isCorrect;
                const bad = isLocked && picked && !isCorrect;
                return (
                  <button
                    key={j}
                    type="button"
                    disabled={isLocked}
                    onClick={() => answer(i, j)}
                    className="flex items-start gap-3 rounded border px-3 py-2 text-left text-[0.86rem] transition-colors enabled:hover:border-[color:var(--accent)]"
                    style={{
                      borderColor: good ? "var(--accent)" : bad ? "var(--seal)" : "var(--rule)",
                      background: good
                        ? "var(--accent-soft)"
                        : bad
                          ? "var(--seal-soft)"
                          : "var(--surface-2)",
                      color: "var(--text)",
                      opacity: isLocked && !good && !bad ? 0.55 : 1,
                      cursor: isLocked ? "default" : "pointer",
                    }}
                  >
                    <span
                      className="flex h-5 w-5 flex-none items-center justify-center rounded-sm border font-mono text-[0.7rem]"
                      style={{
                        borderColor: good ? "var(--accent)" : bad ? "var(--seal)" : "var(--rule)",
                        background: good ? "var(--accent)" : "transparent",
                        color: good ? "var(--on-accent)" : bad ? "var(--seal)" : "var(--muted)",
                      }}
                      aria-hidden="true"
                    >
                      {good ? "✓" : bad ? "✗" : LETTERS[j]}
                    </span>
                    <span>{a}</span>
                  </button>
                );
              })}
            </div>
            {isLocked && (
              <div
                role="status"
                className="mt-2 rounded border-l-4 p-2.5 text-[0.85rem]"
                style={{
                  borderColor: locked[i] === q.c ? "var(--accent)" : "var(--seal)",
                  background: "var(--surface-2)",
                }}
              >
                <b style={{ color: locked[i] === q.c ? "var(--accent-ink)" : "var(--seal)" }}>
                  {locked[i] === q.c ? "Correct. " : "Not quite. "}
                </b>
                {q.e}
              </div>
            )}
          </div>
        );
      })}

      {done && (
        <div
          role="status"
          className="rounded border p-4 text-[0.9rem]"
          style={{ background: "var(--accent-soft)", borderColor: "var(--accent)" }}
        >
          <b style={{ color: "var(--accent-ink)" }}>Module complete.</b> You scored {correct} of{" "}
          {quiz.length} <span className="font-mono">(+{points} pts)</span>.{" "}
          <Link href="/modules" className="underline">
            Back to the modules
          </Link>
        </div>
      )}
    </div>
  );
}
