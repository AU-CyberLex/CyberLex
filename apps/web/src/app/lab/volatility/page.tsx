"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { VOL } from "@cyberlex/content";
import { useStore } from "@/lib/store";
import { POINT_RULES } from "@/lib/progress";

const LAB_PAGES = [
  { href: "/lab/integrity", label: "1. Integrity" },
  { href: "/lab/volatility", label: "2. Volatility" },
  { href: "/lab/signature", label: "3. Signature" },
] as const;

const BUTTON_BASE =
  "inline-flex items-center justify-center rounded-md border px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40";

const PRIMARY_BUTTON =
  `${BUTTON_BASE} border-[#00EA64] bg-[#00EA64] text-black enabled:hover:-translate-y-0.5 enabled:hover:bg-[#00ce58] enabled:hover:shadow-[0_5px_18px_rgba(0,234,100,0.22)]`;

const SECONDARY_BUTTON =
  `${BUTTON_BASE} border-[var(--rule)] bg-[var(--surface)] text-[var(--text)] enabled:hover:border-[#00EA64] enabled:hover:bg-[var(--accent-soft)]`;

function ChallengeNavigation() {
  return (
    <nav
      aria-label="Forensics lab challenges"
      className="flex flex-wrap items-center justify-between gap-3 border-b pb-3"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/lab"
          className="mr-2 text-sm transition-colors hover:text-[var(--accent-ink)]"
          style={{ color: "var(--muted)" }}
        >
          ← Forensics lab
        </Link>

        <span style={{ color: "var(--rule)" }}>/</span>

        {LAB_PAGES.map((page) => {
          const active = page.href === "/lab/volatility";

          return (
            <Link
              key={page.href}
              href={page.href}
              aria-current={active ? "page" : undefined}
              className="rounded-md border px-3 py-2 text-sm font-semibold no-underline transition-all duration-200"
              style={
                active
                  ? {
                      borderColor: "var(--accent)",
                      background: "var(--accent)",
                      color: "var(--on-accent)",
                    }
                  : {
                      borderColor: "transparent",
                      background: "transparent",
                      color: "var(--muted)",
                    }
              }
            >
              {page.label}
            </Link>
          );
        })}
      </div>

      <span
        className="font-mono text-[0.65rem] tracking-[0.12em]"
        style={{ color: "var(--muted)" }}
      >
        CYBERLEX&nbsp; / &nbsp;FORENSICS
      </span>
    </nav>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="font-mono text-xs font-bold"
        style={{ color: "var(--accent-ink)" }}
      >
        {number}
      </span>
      <h2
        className="whitespace-nowrap font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em]"
        style={{ color: "var(--muted)" }}
      >
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: "var(--rule)" }} />
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 px-4 py-3.5 sm:px-5">
      <p
        className="mb-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </p>
      <p className="text-sm font-bold tracking-wide">{value}</p>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="overflow-hidden rounded-lg border"
      style={{
        borderColor: "var(--rule)",
        background: "var(--surface)",
      }}
    >
      <div className="p-5 sm:p-6">
        <h3 className="mb-3 text-lg font-bold tracking-tight">{title}</h3>
        {children}
      </div>
    </section>
  );
}

/**
 * VOL is already stored in the correct RFC 3227 collection order.
 * Shuffle only the available options; the learner must reconstruct that order.
 */
function shuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, index) => index);

  do {
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  } while (
    length > 1 &&
    indices.every((value, index) => value === index)
  );

  return indices;
}

type Result = {
  marks: boolean[];
  right: number;
};

export default function VolatilityCheckPage() {
  const { state, setState } = useStore();

  const [pool, setPool] = useState<number[] | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    document.title = "Volatility check — CyberLex";
    setPool(shuffledIndices(VOL.length));
  }, []);

  const total = VOL.length;
  const allPlaced = picked.length === total;
  const best = state.scores.vol;
  const maxPoints = total * POINT_RULES.labCorrect;

  const place = (index: number) => {
    setPicked((current) =>
      current.includes(index) ? current : [...current, index]
    );
    setResult(null);
  };

  const remove = (position: number) => {
    setPicked((current) => current.filter((_, index) => index !== position));
    setResult(null);
  };

  const reset = () => {
    setPicked([]);
    setResult(null);
    setPool(shuffledIndices(total));
  };

  const check = () => {
    if (!allPlaced) return;

    const marks = picked.map((value, position) => value === position);
    const right = marks.filter(Boolean).length;

    setResult({ marks, right });

    setState((current) => ({
      ...current,
      scores: {
        ...current.scores,
        vol: Math.max(current.scores.vol ?? 0, right),
      },
    }));
  };

  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 pb-16 pt-7 sm:px-8">
      <ChallengeNavigation />

      {/* Challenge introduction */}
      <header className="mb-8 mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex rounded-sm px-2 py-1 font-mono text-[0.68rem] font-bold tracking-wider"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-ink)",
            }}
          >
            DIGITAL FORENSICS
          </span>
          <span style={{ color: "var(--muted)" }}>/</span>
          <span
            className="font-mono text-[0.68rem] font-semibold tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            CHALLENGE 02
          </span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <h1 className="border-l-[5px] border-[#00EA64] pl-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Volatility check
            </h1>
            <p
              className="mt-4 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: "var(--muted)" }}
            >
              Identify the order in which digital evidence must be collected,
              starting with the most volatile data.
            </p>
          </div>

          <span
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs font-semibold uppercase"
            style={{
              borderColor: "var(--accent)",
              background: "var(--accent-soft)",
              color: "var(--accent-ink)",
            }}
          >
            <span className="h-2 w-2 rounded-full bg-[#00EA64]" />
            Medium
          </span>
        </div>

        {/* Challenge metadata */}
        <div
          className="mt-7 grid grid-cols-2 overflow-hidden rounded-lg border sm:grid-cols-4"
          style={{
            borderColor: "var(--rule)",
            background: "var(--surface)",
          }}
        >
          <div className="border-b sm:border-b-0 sm:border-r" style={{ borderColor: "var(--rule)" }}>
            <Stat label="Reference" value="RFC 3227" />
          </div>
          <div className="border-b sm:border-b-0 sm:border-r" style={{ borderColor: "var(--rule)" }}>
            <Stat label="Sources" value={`${total} EVIDENCE ITEMS`} />
          </div>
          <div className="border-r" style={{ borderColor: "var(--rule)" }}>
            <Stat label="Objective" value="EVIDENCE PRESERVATION" />
          </div>
          <Stat label="Max score" value={`${maxPoints} POINTS`} />
        </div>
      </header>

      {/* Main two-column challenge layout */}
      <div className="grid items-start gap-7 lg:grid-cols-[0.88fr_1.12fr]">
        {/* Challenge / explanation */}
        <section className="min-w-0">
          <SectionLabel number="01">THE CHALLENGE</SectionLabel>

          <InfoCard title="Which evidence should you collect first?">
            <div
              className="space-y-4 text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              <p>
                Evidence decays at very different speeds. Collecting
                information in the wrong order can destroy valuable evidence
                before investigators have a chance to preserve it.
              </p>

              <p>
                Consider a running computer. Its CPU registers, cache and RAM
                contain temporary information that may disappear immediately
                when power is removed.
              </p>

              <p>
                Your task is to arrange all {total} evidence sources according
                to their volatility, starting with the information most likely
                to disappear.
              </p>
            </div>

            <div
              className="mt-6 rounded-md border-l-4 p-4"
              style={{
                borderColor: "var(--accent)",
                background: "var(--accent-soft)",
              }}
            >
              <p className="text-sm leading-6" style={{ color: "var(--text)" }}>
                <strong>Why is this a legal question?</strong> A first responder
                who powers a machine down to “preserve” it has made an
                irreversible choice that destroys everything above the disk.
                That decision must be recorded and justified in the seizure
                memo, because it will be asked about.
              </p>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center gap-3">
                <h3
                  className="whitespace-nowrap font-mono text-[0.68rem] font-bold uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  Important distinctions
                </h3>
                <div className="h-px flex-1" style={{ background: "var(--rule)" }} />
              </div>

              <ol className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-6">
                  <span className="font-mono font-bold" style={{ color: "var(--accent-ink)" }}>
                    01
                  </span>
                  <span>CPU registers and cache disappear extremely quickly.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-6">
                  <span className="font-mono font-bold" style={{ color: "var(--accent-ink)" }}>
                    02
                  </span>
                  <span>RAM may contain encryption keys and active processes.</span>
                </li>
              </ol>
            </div>

            {result && (
              <div className="mt-7">
                <div className="mb-3 flex items-center gap-3">
                  <h3
                    className="whitespace-nowrap font-mono text-[0.68rem] font-bold uppercase tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    RFC 3227 reference order
                  </h3>
                  <div className="h-px flex-1" style={{ background: "var(--rule)" }} />
                </div>

                <ol className="space-y-2">
                  {VOL.map((item, index) => (
                    <li
                      key={item.t}
                      className="flex gap-3 rounded-md border px-3 py-2.5 text-sm"
                      style={{
                        borderColor: "var(--rule)",
                        background: "var(--surface-2)",
                      }}
                    >
                      <span className="font-mono font-bold" style={{ color: "var(--accent-ink)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong className="font-semibold" style={{ color: "var(--text)" }}>
                          {item.t}
                        </strong>
                        <span className="mt-0.5 block text-xs leading-5" style={{ color: "var(--muted)" }}>
                          {item.e}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </InfoCard>
        </section>

        {/* Interactive workspace */}
        <section className="min-w-0">
          <SectionLabel number="03">INTERACTIVE WORKSPACE</SectionLabel>

          <div className="overflow-hidden rounded-lg border border-[#183c2a] bg-[#07150e] text-[#e8f5ec] shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
            {/* Workspace heading */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c3b2b] bg-[#0b1c12] px-5 py-4">
              <div>
                <p className="text-sm font-bold tracking-wide">
                  Evidence collection sequence
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-[#8cae98]">
                  RFC 3227 · Evidence preservation
                </p>
              </div>

              <button
                type="button"
                onClick={reset}
                className="rounded-md border border-[#31523e] px-3 py-2 text-xs font-semibold text-[#d6e8dc] transition-colors hover:border-[#00EA64] hover:bg-[#12351f] hover:text-[#00EA64]"
              >
                ↺ Reset
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-[#c0d2c6]">
                  Select the evidence sources in collection order.
                </p>
                <span className="font-mono text-xs font-bold text-[#00EA64]">
                  {picked.length}/{total} SELECTED
                </span>
              </div>

              <p className="mb-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] text-[#8cae98]">
                Available evidence · click to place
              </p>

              {/* Available evidence buttons */}
              <div
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                aria-busy={pool === null}
              >
                {pool?.map((index) => {
                  const used = picked.includes(index);

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={used}
                      onClick={() => place(index)}
                      className="volatility-option min-h-[52px] rounded-md border border-[#d5e1d9] bg-[#f4f8f5] px-3 py-2.5 text-left text-[0.78rem] font-semibold leading-5 text-[#14251a] transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:border-[#00EA64] enabled:hover:bg-[#d9fbe6] enabled:hover:text-[#006b31] enabled:hover:shadow-[0_4px_14px_rgba(0,234,100,0.16)] disabled:cursor-default disabled:opacity-35"
                    >
                      {VOL[index].t}
                    </button>
                  );
                })}
              </div>

              {/* Ordered sequence */}
              <div className="mt-6 flex items-center justify-between gap-3 font-mono text-[0.67rem] font-semibold uppercase tracking-wider">
                <span className="text-[#a9c2b1]">Most volatile ↑</span>
                <span className="text-[#00EA64]">
                  {picked.length}/{total} placed
                </span>
              </div>

              <ol
                className="mt-3 min-h-[66px] space-y-2 rounded-md border border-dashed border-[#31523e] bg-[#0b1b11] p-3"
                aria-label="Your evidence collection sequence"
              >
                {picked.length === 0 && (
                  <li className="flex min-h-10 items-center justify-center text-center text-sm text-[#91a99a]">
                    Your sequence appears here.
                  </li>
                )}

                {picked.map((value, position) => {
                  const mark = result ? result.marks[position] : null;

                  return (
                    <li
                      key={value}
                      className="flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors"
                      style={{
                        borderColor:
                          mark === null
                            ? "#31523e"
                            : mark
                              ? "#00EA64"
                              : "#d66b6b",
                        background:
                          mark === null
                            ? "#102419"
                            : mark
                              ? "#10351f"
                              : "#351a1a",
                      }}
                    >
                      <span className="font-mono text-xs text-[#9db6a5]">
                        {String(position + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 leading-5">
                        {VOL[value].t}
                      </span>

                      {mark !== null && (
                        <span
                          className="font-mono font-bold"
                          style={{ color: mark ? "#00EA64" : "#ff8585" }}
                          aria-label={mark ? "Correct position" : "Wrong position"}
                        >
                          {mark ? "✓" : "✕"}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => remove(position)}
                        aria-label={`Remove ${VOL[value].t}`}
                        className="rounded px-2 py-1 text-xs text-[#9db6a5] transition-colors hover:bg-[#294333] hover:text-white"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-3 font-mono text-[0.67rem] font-semibold uppercase tracking-wider text-[#a9c2b1]">
                Least volatile ↓
              </div>

              {/* Submit and progress */}
              <div className="mt-5">
                <button
                  type="button"
                  disabled={!allPlaced}
                  onClick={check}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#00EA64] bg-[#00EA64] px-4 py-3 text-sm font-bold text-[#06130b] transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:bg-[#00d85b] enabled:hover:shadow-[0_6px_20px_rgba(0,234,100,0.22)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Check the order <span aria-hidden="true">→</span>
                </button>

                {!allPlaced && (
                  <p className="mt-3 text-center text-xs text-[#9db6a5]">
                    Place all {total} sources to submit ({total - picked.length} left).
                  </p>
                )}
              </div>

              {/* Result feedback */}
              <div className="mt-4" role="status" aria-live="polite">
                {result && (
                  <div
                    className="rounded-md border p-4"
                    style={{
                      borderColor: result.right === total ? "#00EA64" : "#526b59",
                      background: result.right === total ? "#10351f" : "#102419",
                    }}
                  >
                    <p className="text-sm font-bold" style={{ color: result.right === total ? "#00EA64" : "#f0f5f1" }}>
                      {result.right === total
                        ? "✓ Perfect sequence — challenge completed!"
                        : `${result.right} of ${total} in the correct position.`}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#b4c8ba]">
                      {result.right === total
                        ? "Most volatile first, archival media last. That is the RFC 3227 collection order."
                        : "Review the marked positions and rebuild your sequence. The reference order is shown in the challenge panel."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Score / progress card */}
          <div
            className="mt-5 rounded-lg border p-4 sm:p-5"
            style={{
              borderColor: "var(--rule)",
              background: "var(--surface)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p
                  className="font-mono text-[0.68rem] font-bold uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  Challenge progress
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {result?.right === total
                    ? "All evidence sources correctly ordered"
                    : result
                      ? "Review your collection order"
                      : "Build the collection sequence"}
                </p>
              </div>

              <span
                className="font-mono text-sm font-bold"
                style={{ color: "var(--accent-ink)" }}
              >
                {result ? `${result.right}/${total}` : `${picked.length}/${total}`}
              </span>
            </div>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full"
              style={{ background: "var(--rule)" }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={result ? result.right : picked.length}
              aria-label="Volatility challenge progress"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((result ? result.right : picked.length) / total) * 100}%`,
                  background: "var(--accent)",
                }}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span style={{ color: "var(--muted)" }}>
                Best score saved on this device
              </span>
              <strong style={{ color: "var(--accent-ink)" }}>
                {best ?? 0}/{total} · {(best ?? 0) * POINT_RULES.labCorrect} pts
              </strong>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
        style={{
          borderColor: "var(--rule)",
          color: "var(--muted)",
        }}
      >
        <span className="font-mono text-[0.67rem] uppercase tracking-wider">
          CYBERLEX · DIGITAL FORENSICS
        </span>

        <Link
          href="/lab/signature"
          className="text-sm font-semibold transition-colors hover:text-[var(--accent-ink)]"
          style={{ color: "var(--text)" }}
        >
          Next challenge: Signature →
        </Link>
      </footer>
    </main>
  );
}
