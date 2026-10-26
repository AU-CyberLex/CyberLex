"use client";
import Link from "next/link";
import { MODULES } from "@cyberlex/content";
import { useStore } from "@/lib/store";

export function ModuleGrid() {
  const { state } = useStore();
  return (
    <div
      className="mt-6 grid gap-px overflow-hidden rounded border sm:grid-cols-2 lg:grid-cols-3"
      style={{ background: "var(--rule)", borderColor: "var(--rule)" }}
    >
      {MODULES.map((m) => (
        <Link
          key={m.id}
          href={"/modules/" + m.id}
          className="flex min-h-full flex-col gap-2 p-4 text-left no-underline"
          style={{ background: "var(--surface)", color: "var(--text)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className="whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.78rem]"
              style={{
                color: "var(--seal)",
                borderColor: "var(--rule)",
                background: "var(--surface)",
              }}
            >
              {m.tag}
            </span>
          </div>
          <h3 className="font-serif text-[1.06rem] font-medium">{m.title}</h3>
          <p className="m-0 text-[0.85rem]" style={{ color: "var(--muted)" }}>
            {m.blurb}
          </p>
          <span
            className="mt-auto flex items-center gap-2 pt-2 text-[0.74rem]"
            style={{ color: "var(--muted)" }}
          >
            <span
              className="h-[7px] w-[7px] flex-none rounded-full"
              style={{ background: state.done[m.id] ? "var(--forensic)" : "var(--rule)" }}
            />
            {state.done[m.id] ? "Completed" : "Not started"} {" · drill " + (state.scores[m.id] ?? 0) + "/" + m.quiz.length}
          </span>
        </Link>
      ))}
    </div>
  );
}
