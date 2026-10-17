"use client";
import { useState } from "react";
import { COC } from "@cyberlex/content";
import { useStore } from "@/lib/store";

export function CustodyBench() {
  const { setState } = useStore();
  const steps = COC;
  const [order, setOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const remaining = steps.map((_, i) => i).filter((i) => !order.includes(i));

  const check = () => {
    const correct = order.every((v, i) => v === i) && order.length === steps.length;
    setOk(correct);
    if (correct) {
      setFeedback("Correct. Every link in the chain is documented, in order, with no gaps.");
      setState((s) => ({ ...s, scores: { ...s.scores, coc: steps.length } }));
    } else {
      setFeedback(
        order.length < steps.length
          ? "Place every step before checking."
          : "Not quite. A gap anywhere in this sequence is where the defence will drive its case — rebuild it from seizure."
      );
    }
  };

  return (
    <div
      className="rounded border p-5"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <p className="text-[0.9rem]">
        Chain of custody is a chronology with signatures. Arrange the eight links from seizure to
        production — one gap and the exhibit is vulnerable.
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
            className="max-w-[22rem] rounded-full border px-3 py-1.5 text-left text-[0.82rem]"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)" }}
          >
            {steps[i]}
          </button>
        ))}
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
            {steps[v]}
            <button
              type="button"
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
          Check the chain
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
