"use client";
import Link from "next/link";
import { SIMS } from "@cyberlex/content";
import { useStore } from "@/lib/store";

export function SimGrid() {
  const { state } = useStore();
  return (
    <div
      className="mt-6 grid gap-px overflow-hidden rounded border sm:grid-cols-2 lg:grid-cols-3"
      style={{ background: "var(--rule)", borderColor: "var(--rule)" }}
    >
      {SIMS.map((s) => (
        <Link
          key={s.id}
          href={"/sims/" + s.id}
          className="flex min-h-full flex-col gap-2 p-4 no-underline"
          style={{ background: "var(--surface)", color: "var(--text)" }}
        >
          <span
            className="w-fit whitespace-nowrap rounded-sm border px-1.5 py-0.5 font-mono text-[0.78rem]"
            style={{
              color: "var(--seal)",
              borderColor: "var(--rule)",
              background: "var(--surface)",
            }}
          >
            {s.tag}
          </span>
          <h3 className="font-serif text-[1.06rem] font-medium">{s.title}</h3>
          <p className="m-0 text-[0.85rem]" style={{ color: "var(--muted)" }}>
            {s.blurb}
          </p>
          <span className="mt-auto pt-2 text-[0.74rem]" style={{ color: "var(--muted)" }}>
            {s.steps.length} decisions
            {state.scores["sim-" + s.id] !== undefined
              ? " · score " + state.scores["sim-" + s.id] + "/" + s.steps.length * 2
              : ""}
          </span>
        </Link>
      ))}
    </div>
  );
}
