"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, COC, MODULES, SIMS, VOL } from "@cyberlex/content";
import { useStore } from "@/lib/store";
import {
  badgesFor,
  boardWithCurrent,
  completedModules,
  exportProgress,
  importProgress,
  levelFor,
  MAX_IMPORT_CHARS,
  MAX_POINTS,
  pointRows,
  reviewedCases,
  saveBoardEntry,
  totalPoints,
  type Badge,
} from "@/lib/gamification";

const TONE: Record<Badge["tone"], { bg: string; border: string; ink: string }> = {
  teal: { bg: "var(--forensic-soft)", border: "var(--forensic)", ink: "var(--forensic)" },
  amber: { bg: "var(--amber-soft)", border: "var(--amber)", ink: "var(--amber)" },
  oxblood: { bg: "var(--seal-soft)", border: "var(--seal)", ink: "var(--seal)" },
  navy: { bg: "var(--surface-2)", border: "var(--rule)", ink: "var(--text)" },
};

function Stat({
  label,
  value,
  note,
  tone = "var(--forensic)",
}: {
  label: string;
  value: string | number;
  note: string;
  tone?: string;
}) {
  return (
    <div
      className="rounded border p-4"
      style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
    >
      <div className="font-mono text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      <div className="mt-1 font-serif text-2xl font-semibold" style={{ color: tone }}>
        {value}
      </div>
      <div className="mt-1 text-[0.78rem]" style={{ color: "var(--muted)" }}>
        {note}
      </div>
    </div>
  );
}

function BadgeTile({ badge }: { badge: Badge }) {
  const tone = TONE[badge.tone];
  const pct = badge.target ? Math.round((badge.progress / badge.target) * 100) : 0;
  return (
    <div
      className="rounded border p-3.5"
      style={{
        background: badge.earned ? tone.bg : "var(--surface)",
        borderColor: badge.earned ? tone.border : "var(--rule)",
        opacity: badge.earned ? 1 : 0.78,
      }}
      title={badge.description}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="flex h-9 w-9 flex-none items-center justify-center rounded-sm border font-mono text-[0.72rem] font-semibold"
          style={{
            background: badge.earned ? tone.border : "var(--surface-2)",
            borderColor: badge.earned ? tone.border : "var(--rule)",
            color: badge.earned ? "#fff" : "var(--muted)",
          }}
        >
          {badge.mark}
        </span>
        <div className="min-w-0">
          <div className="text-[0.86rem] font-medium">
            {badge.name}
            {badge.earned ? (
              <span className="ml-1.5 font-mono text-[0.66rem] uppercase tracking-wide" style={{ color: tone.ink }}>
                earned
              </span>
            ) : null}
          </div>
          <div className="mt-0.5 text-[0.76rem]" style={{ color: "var(--muted)" }}>
            {badge.description}
          </div>
        </div>
      </div>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
        <i
          className="block h-full"
          style={{ width: pct + "%", background: badge.earned ? tone.border : "var(--muted)" }}
        />
      </div>
      <div className="mt-1 font-mono text-[0.68rem]" style={{ color: "var(--muted)" }}>
        {badge.progress} / {badge.target}
      </div>
    </div>
  );
}

export function ProgressView() {
  const { state, setState } = useStore();
  const [name, setName] = useState(state.profile || "");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(state.profile || "");
  }, [state.profile]);

  const points = totalPoints(state);
  const level = levelFor(points);
  const rows = pointRows(state);
  const badges = useMemo(() => badgesFor(state), [state]);
  const earnedBadges = badges.filter((b) => b.earned).length;
  const modules = completedModules(state);
  const cases = reviewedCases(state);
  const board = boardWithCurrent(state);
  const savedRow = state.profile
    ? (state.board || []).find(
        (row) => row.name.trim().toLowerCase() === state.profile?.trim().toLowerCase()
      )
    : undefined;
  const snapshotIsStale = !!savedRow && savedRow.points !== points;
  const modulePct = Math.round((modules / MODULES.length) * 100);
  const casePct = Math.round((cases / CASES.length) * 100);

  const saveScore = () => {
    const clean = name.trim();
    if (!clean) {
      setStatus({ kind: "error", text: "Enter a display name before saving a leaderboard entry." });
      return;
    }
    setState((s) => saveBoardEntry(s, clean));
    setStatus({ kind: "ok", text: `Saved ${clean} at ${points} points on this device.` });
  };

  const download = () => {
    try {
      const blob = new Blob([exportProgress(state)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cyberlex-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStatus({ kind: "ok", text: "Progress exported as a JSON file." });
    } catch {
      setStatus({ kind: "error", text: "The browser blocked the download. Try again in a secure context." });
    }
  };

  const readImport = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_IMPORT_CHARS) {
      setStatus({
        kind: "error",
        text: "That file is too large to be a CyberLex progress export (limit 1 MB).",
      });
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    try {
      const result = importProgress(await file.text());
      setState(result.state);
      setStatus({
        kind: "ok",
        text:
          "Progress imported." +
          (result.warnings.length ? " " + result.warnings.join(" ") : ""),
      });
    } catch (error) {
      setStatus({
        kind: "error",
        text: error instanceof Error ? error.message : "The file could not be read.",
      });
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const reset = () => {
    if (
      !window.confirm(
        "Clear modules, drills, lab and simulation scores, case reviews and the local leaderboard? Lesson links, theme and display name are kept."
      )
    ) {
      return;
    }
    setState((s) => ({ ...s, done: {}, scores: {}, flipped: {}, board: [] }));
    setStatus({ kind: "ok", text: "Learning progress cleared. Lesson links and theme were kept." });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-[clamp(1.45rem,3vw,2rem)] font-medium">Your progress</h2>
            <p className="mt-2 max-w-[66ch] text-sm" style={{ color: "var(--muted)" }}>
              Stored in this browser only. Points, badges and the local leaderboard are derived from
              what you actually completed — there is no account and nothing is uploaded.
            </p>
          </div>
          <span
            className="rounded-sm border px-2 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--rule)", color: "var(--muted)", background: "var(--surface)" }}
          >
            local · no server
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Points" value={points} note={`of ${MAX_POINTS} available`} tone="var(--seal)" />
        <Stat label="Level" value={level.level} note={level.name} tone="var(--forensic)" />
        <Stat label="Modules" value={`${modules}/${MODULES.length}`} note={`${modulePct}% complete`} />
        <Stat label="Cases" value={`${cases}/${CASES.length}`} note={`${earnedBadges} of ${badges.length} badges earned`} tone="var(--amber)" />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-medium">Modules completed</h3>
            <span className="font-mono text-[0.78rem]" style={{ color: "var(--muted)" }}>
              {modules} of {MODULES.length}
            </span>
          </div>
          <div
            className="my-3 h-2 overflow-hidden rounded-full"
            style={{ background: "var(--surface-2)" }}
            role="progressbar"
            aria-label="Modules completed"
            aria-valuemin={0}
            aria-valuemax={MODULES.length}
            aria-valuenow={modules}
          >
            <i className="block h-full" style={{ width: modulePct + "%", background: "var(--forensic)" }} />
          </div>
          <div>
            {MODULES.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2.5 border-t py-2 text-[0.86rem]"
                style={{ borderColor: "var(--rule)" }}
              >
                <span
                  className="h-[7px] w-[7px] flex-none rounded-full"
                  style={{ background: state.done[m.id] ? "var(--forensic)" : "var(--rule)" }}
                />
                <span>{m.title}</span>
                <span className="ml-auto font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
                  {state.scores[m.id] !== undefined ? state.scores[m.id] + "/" + m.quiz.length : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-medium">Level {level.level}</h3>
              <span className="font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
                {level.name}
              </span>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full"
              style={{ background: "var(--surface-2)" }}
              role="progressbar"
              aria-label="Progress to the next level"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(level.progress * 100)}
            >
              <i className="block h-full" style={{ width: Math.round(level.progress * 100) + "%", background: "var(--seal)" }} />
            </div>
            <p className="mt-2 text-[0.82rem]" style={{ color: "var(--muted)" }}>
              {level.next === null
                ? "Top level reached."
                : `${level.next - points} points to the next level.`}
            </p>
          </div>

          <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-medium">Case review</h3>
              <span className="font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
                {cases} of {CASES.length}
              </span>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full"
              style={{ background: "var(--surface-2)" }}
              role="progressbar"
              aria-label="Case cards reviewed"
              aria-valuemin={0}
              aria-valuemax={CASES.length}
              aria-valuenow={cases}
            >
              <i className="block h-full" style={{ width: casePct + "%", background: "var(--amber)" }} />
            </div>
            <p className="mt-2 text-[0.82rem]" style={{ color: "var(--muted)" }}>
              Open the Case law page, reveal a card, and it is counted here.
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
          <h3 className="font-serif text-lg font-medium">Points breakdown</h3>
          <div className="mt-3">
            {rows.map((row) => (
              <div key={row.id} className="border-t py-2.5" style={{ borderColor: "var(--rule)" }}>
                <div className="flex items-baseline justify-between gap-3 text-[0.86rem]">
                  <span>{row.label}</span>
                  <span className="font-mono text-[0.78rem]" style={{ color: "var(--muted)" }}>
                    {row.earned} / {row.max}
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                  <i
                    className="block h-full"
                    style={{ width: (row.max ? (row.earned / row.max) * 100 : 0) + "%", background: "var(--forensic)" }}
                  />
                </div>
                <div className="mt-1 text-[0.74rem]" style={{ color: "var(--muted)" }}>
                  {row.detail}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[0.76rem]" style={{ color: "var(--muted)" }}>
            Points are computed from saved progress, never awarded twice. Re-answering a drill cannot
            farm points because only the saved score counts.
          </p>
        </div>

        <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-lg font-medium">Badges</h3>
            <span className="font-mono text-[0.76rem]" style={{ color: "var(--muted)" }}>
              {earnedBadges} of {badges.length}
            </span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {badges.map((badge) => (
              <BadgeTile key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      </div>

      <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h3 className="font-serif text-lg font-medium">Local leaderboard</h3>
            <p className="mt-1 text-[0.82rem]" style={{ color: "var(--muted)" }}>
              Scores saved on this browser only. Nothing is shared between devices or learners.
            </p>
          </div>
          <span className="font-mono text-[0.72rem]" style={{ color: "var(--muted)" }}>
            {board.length} saved {board.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-2">
          <label className="min-w-[220px] flex-1">
            <span className="mb-1 block text-[0.78rem]" style={{ color: "var(--muted)" }}>
              Display name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveScore();
              }}
              maxLength={60}
              autoComplete="nickname"
              placeholder="e.g. Aarav Mehta"
              className="w-full rounded border px-3 py-2 text-sm"
              style={{ background: "var(--surface-2)", borderColor: "var(--rule)", color: "var(--text)" }}
            />
          </label>
          <button
            type="button"
            onClick={saveScore}
            className="rounded border px-3 py-2 text-sm font-medium"
            style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
          >
            Save score
          </button>
          {savedRow ? (
            <span className="text-[0.8rem]" style={{ color: "var(--muted)" }}>
              Saved snapshot: {savedRow.points} pts
              {snapshotIsStale ? " · save again to update your row" : ""}
            </span>
          ) : null}
        </div>

        {board.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-[0.86rem]">
              <caption className="sr-only">
                Local leaderboard. Scores are saved snapshots stored in this browser only.
              </caption>
              <thead>
                <tr style={{ background: "var(--surface-2)" }}>
                  {["#", "Learner", "Saved points", "Modules", "Cases", "Saved"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border px-3 py-2 text-left font-medium"
                      style={{ borderColor: "var(--rule)", color: "var(--muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {board.map((row, i) => {
                  const isYou = !!state.profile && row.name.trim().toLowerCase() === state.profile.trim().toLowerCase();
                  return (
                    <tr key={row.name + row.updatedAt} style={isYou ? { background: "var(--forensic-soft)" } : undefined}>
                      <td className="border px-3 py-2 font-mono" style={{ borderColor: "var(--rule)", color: "var(--muted)" }}>
                        {i + 1}
                      </td>
                      <td className="border px-3 py-2" style={{ borderColor: "var(--rule)" }}>
                        {row.name}
                        {isYou ? (
                          <span className="ml-2 font-mono text-[0.66rem] uppercase" style={{ color: "var(--forensic)" }}>
                            you
                          </span>
                        ) : null}
                      </td>
                      <td className="border px-3 py-2 font-mono" style={{ borderColor: "var(--rule)" }}>
                        {row.points}
                      </td>
                      <td className="border px-3 py-2 font-mono" style={{ borderColor: "var(--rule)" }}>
                        {row.modules}
                      </td>
                      <td className="border px-3 py-2 font-mono" style={{ borderColor: "var(--rule)" }}>
                        {row.cases}
                      </td>
                      <td className="border px-3 py-2 text-[0.78rem]" style={{ borderColor: "var(--rule)", color: "var(--muted)" }}>
                        {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 rounded border border-dashed p-4 text-[0.86rem]" style={{ borderColor: "var(--rule)", color: "var(--muted)" }}>
            No local scores saved yet. Finish a module, drill or investigation, then save your score
            above to start a device-local leaderboard.
          </p>
        )}
      </div>

      <div className="rounded border p-5" style={{ background: "var(--surface)", borderColor: "var(--rule)" }}>
        <h3 className="font-serif text-lg font-medium">Move or clear your progress</h3>
        <p className="mt-1 max-w-[72ch] text-[0.84rem]" style={{ color: "var(--muted)" }}>
          Export a versioned JSON snapshot before changing device. Import replaces the learning state
          on this browser; lesson links, theme, display name and leaderboard are included in the file.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={download}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)", color: "var(--text)" }}
          >
            Export progress (.json)
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--rule)", background: "var(--surface-2)", color: "var(--text)" }}
          >
            Import progress
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => void readImport(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={reset}
            className="rounded border px-3 py-2 text-sm"
            style={{ borderColor: "var(--seal)", background: "var(--seal-soft)", color: "var(--seal)" }}
          >
            Clear all saved progress
          </button>
        </div>
        {status ? (
          <p
            role={status.kind === "error" ? "alert" : "status"}
            aria-live="polite"
            className="mt-3 rounded border p-2.5 text-[0.84rem]"
            style={
              status.kind === "ok"
                ? { background: "var(--forensic-soft)", borderColor: "var(--forensic)", color: "var(--forensic)" }
                : { background: "var(--seal-soft)", borderColor: "var(--seal)", color: "var(--seal)" }
            }
          >
            {status.text}
          </p>
        ) : null}
        <p className="mt-3 text-[0.76rem]" style={{ color: "var(--muted)" }}>
          Clearing progress keeps lesson links and theme. Export first if you want a copy.
        </p>
      </div>

      <div className="grid gap-3 text-[0.8rem] sm:grid-cols-3" style={{ color: "var(--muted)" }}>
        <p className="rounded border p-3" style={{ borderColor: "var(--rule)" }}>
          <b style={{ color: "var(--text)" }}>Lab checks.</b> Volatility {state.scores.vol ?? 0}/{VOL.length} ·
          chain {state.scores.coc ?? 0}/{COC.length}.
        </p>
        <p className="rounded border p-3" style={{ borderColor: "var(--rule)" }}>
          <b style={{ color: "var(--text)" }}>Investigations.</b>{" "}
          {SIMS.filter((s) => state.scores["sim-" + s.id] !== undefined).length} of {SIMS.length} finished.
        </p>
        <p className="rounded border p-3" style={{ borderColor: "var(--rule)" }}>
          <b style={{ color: "var(--text)" }}>No accounts.</b> There is no sign-in and no server-side
          learner record.
        </p>
      </div>
    </div>
  );
}
