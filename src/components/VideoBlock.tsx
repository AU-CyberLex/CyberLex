"use client";
import { useEffect, useState } from "react";
import { embedUrl } from "@/lib/video";
import { useStore } from "@/lib/store";
import { VIDEOS } from "@/data/videos";

export function VideoBlock({ moduleId, title }: { moduleId: string; title: string }) {
  const { state, setState } = useStore();
  const raw = state.videos?.[moduleId] || VIDEOS[moduleId] || "";
  const v = embedUrl(raw);
  const custom = !!state.videos?.[moduleId];
  const [draft, setDraft] = useState(raw);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft(raw);
  }, [moduleId, raw]);

  const attach = (val: string) => {
    if (!embedUrl(val)) {
      setError("That is not a link this player recognises. Try a YouTube, Vimeo, Drive or .mp4 URL.");
      return;
    }
    setError("");
    setState((s) => ({ ...s, videos: { ...s.videos, [moduleId]: val.trim() } }));
    setEditing(false);
  };

  if (!v || editing) {
    return (
      <div>
        {!v && !editing && (
          <div
            className="rounded border p-5 text-center"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
          >
            <div className="mb-2 text-2xl">▶</div>
            <b className="font-serif text-[1.05rem]">{title}</b>
            <p className="mx-auto mt-2 max-w-[46ch] text-[0.85rem]" style={{ color: "var(--muted)" }}>
              No lesson linked yet. Paste a YouTube, Vimeo, Google Drive or direct video link to
              attach one.
            </p>
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") attach(draft);
            }}
            placeholder={error || "https://youtu.be/…"}
            aria-label={"Video link for " + moduleId}
            className="min-w-0 flex-1 rounded border px-2.5 py-2 text-sm"
            style={{
              borderColor: "var(--rule)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          />
          <button
            type="button"
            onClick={() => attach(draft)}
            className="rounded border px-3 py-2 text-sm font-medium"
            style={{ background: "var(--seal)", borderColor: "var(--seal)", color: "#fff" }}
          >
            {editing ? "Save" : "Attach"}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-[0.82rem]" style={{ color: "var(--seal)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="overflow-hidden rounded border"
        style={{ background: "#000", borderColor: "var(--rule)" }}
      >
        {v.kind === "file" ? (
          <video controls playsInline preload="metadata" src={v.src} className="aspect-video w-full" />
        ) : (
          <iframe
            src={v.src}
            title={title}
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full"
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="mr-auto text-[0.82rem]" style={{ color: "var(--muted)" }}>
          {title}
          {custom ? " · linked on this device" : ""}
        </span>
        <button
          type="button"
          onClick={() => {
            setDraft(raw);
            setEditing(true);
          }}
          className="rounded border px-2.5 py-1.5 text-[0.82rem]"
          style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
        >
          Change link
        </button>
        {custom && (
          <button
            type="button"
            onClick={() =>
              setState((s) => {
                const videos = { ...s.videos };
                delete videos[moduleId];
                return { ...s, videos };
              })
            }
            className="rounded border px-2.5 py-1.5 text-[0.82rem]"
            style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
