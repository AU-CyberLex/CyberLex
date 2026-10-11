"use client";
import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

type Q = { q: string; a: string[]; c: number; e: string };

export function Quiz({ moduleId, quiz }: { moduleId: string; quiz: Q[] }) {
  const { setState } = useStore();
  const [locked, setLocked] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const answered = Object.keys(locked).length;
  const correct = Object.entries(locked).filter(([i, j]) => quiz[+i].c === Number(j)).length;

  const answer = (i: number, j: number) => {
    if (locked[i] !== undefined) return;
    const next = { ...locked, [i]: j };
    setLocked(next);
    if (Object.keys(next).length === quiz.length) {
      const score = Object.entries(next).filter(([qi, qj]) => quiz[+qi].c === Number(qj)).length;
      setState((s) => ({
        ...s,
        done: { ...s.done, [moduleId]: true },
        scores: { ...s.scores, [moduleId]: score },
      }));
      setDone(true);
    }
  };

  return (
    <div>
      {quiz.map((q, i) => (
        <div key={i} className="mb-5">
          <p className="mb-2 text-[0.9rem] font-medium">
            {i + 1}. {q.q}
          </p>
          <div className="grid gap-1.5">
            {q.a.map((a, j) => {
              const isLocked = locked[i] !== undefined;
              const isCorrect = q.c === j;
              const picked = locked[i] === j;
              return (
                <button
                  key={j}
                  type="button"
                  disabled={isLocked}
                  onClick={() => answer(i, j)}
                  className="rounded border px-3 py-2 text-left text-[0.86rem]"
                  style={{
                    borderColor: "var(--rule)",
                    background: isLocked && isCorrect
                      ? "var(--forensic-soft)"
                      : picked && !isCorrect
                        ? "var(--seal-soft)"
                        : "var(--surface-2)",
                    color: isLocked && isCorrect
                      ? "var(--forensic)"
                      : picked && !isCorrect
                        ? "var(--seal)"
                        : "var(--text)",
                    cursor: isLocked ? "default" : "pointer",
                  }}
                >
                  {a}
                </button>
              );
            })}
          </div>
          {locked[i] !== undefined && (
            <div
              className="mt-2 rounded border p-2.5 text-[0.85rem]"
              style={{
                borderColor: "var(--rule)",
                background: "var(--surface-2)",
              }}
            >
              <b>{locked[i] === q.c ? "Correct. " : "Not quite. "}</b>
              {q.e}
            </div>
          )}
        </div>
      ))}
      {done && (
        <div
          className="rounded border-l-4 p-4 text-[0.9rem]"
          style={{ background: "var(--forensic-soft)", borderColor: "var(--forensic)" }}
        >
          <b>Module complete.</b> You scored {correct} of {quiz.length}.{" "}
          <Link href="/modules" className="underline">
            Back to the modules
          </Link>
        </div>
      )}
      {answered > 0 && answered < quiz.length && (
        <p className="text-[0.82rem]" style={{ color: "var(--muted)" }}>
          {answered} of {quiz.length} answered
        </p>
      )}
    </div>
  );
}
