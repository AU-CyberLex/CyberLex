"use client";
import { useState } from "react";
import { VOL } from "@/data/vol";
import { useStore } from "@/lib/store";

export function VolatilityBench() {
  const { setState } = useStore();
  const [order, setOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  const remaining = VOL.map((_, i) => i).filter((i) => !order.includes(i));

  const check = () => {
    const correct = order.every((v, i) => v === i) && order.length === VOL.length;
    setOk(correct);
    if (correct) {
      setFeedback("Correct. Most volatile first, archival media last — that is RFC 3227.");
      setState((s) => ({ ...s, scores: { ...s.scores, vol: VOL.length } }));
    } else {
      const firstWrong = order.findIndex((v, i) => v !== i);
      setFeedback(
        order.length < VOL.length
          ? "Place every source before checking — the partial order cannot be verified."
          : "Not quite. Position " +
              (firstWrong + 1) +
              " is wrong: " +
              (VOL as Array<{ t: string; e: string }>)[order[firstWrong]].t +
              " does not belong there. " +
              (VOL as Array<{ t: string; e: string }>)[firstWrong].e
      );
    }
  };

  return (
    <div
      className="rounded border p-5"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <p className="text-[0.9rem]">
        Evidence decays at very different speeds. Click the sources in the order you would collect
        them, most volatile first.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {remaining.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setOrder((o) => [...o, i]);
              setFeedback(null);
              setOk(null);
            }}
            className="rounded-full border px-3 py-1.5 text-[0.82rem]"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            {(VOL as Array<{ t: string }>)[i].t}
          </button>
        ))}
        {remaining.length === 0 && (
          <span className="text-[0.85rem]" style={{ color: "var(--muted)" }}>
            All sources placed.
          </span>
        )}
      </div>
      <ol className="mt-4 grid gap-1.5">
        {order.map((v, pos) => (
          <li
            key={pos}
            className="flex items-center gap-3 rounded border px-3 py-2 text-[0.86rem]"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            <span className="font-mono" style={{ color: "var(--muted)" }}>
              {pos + 1}.
            </span>
            {(VOL as Array<{ t: string }>)[v].t}
            <button
              type="button"
              aria-label="Remove"
              onClick={() => setOrder((o) => o.filter((_, k) => k !== pos))}
              className="ml-auto text-[0.8rem] underline"
              style={{ color: "var(--muted)" }}
            >
              remove
            </button>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={check}
          className="rounded border px-3 py-2 text-sm font-medium"
          style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
        >
          Check the order
        </button>
        <button
          type="button"
          onClick={() => {
            setOrder([]);
            setFeedback(null);
            setOk(null);
          }}
          className="rounded border px-3 py-2 text-sm"
          style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
        >
          Reset
        </button>
      </div>
      {feedback && (
        <div
          className="mt-3 rounded border p-2.5 text-[0.85rem]"
          style={
            ok
              ? {
                  background: "var(--forensic-soft)",
                  borderColor: "var(--forensic)",
                  color: "var(--forensic)",
                }
              : {
                  background: "var(--seal-soft)",
                  borderColor: "var(--seal)",
                  color: "var(--seal)",
                }
          }
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
