"use client";
import { useEffect, useState } from "react";
import { embedUrl } from "@cyberlex/core";
import { useStore } from "@/lib/store";
import { VIDEOS } from "@cyberlex/content";

const PROVIDERS = "YouTube, Vimeo, Google Drive or a direct .mp4 / .webm / .ogg file";

function providerLabel(raw: string): string {
  if (/youtu\.?be/i.test(raw)) return "YouTube";
  if (/vimeo\.com/i.test(raw)) return "Vimeo";
  if (/drive\.google\.com/i.test(raw)) return "Google Drive";
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(raw)) return "Direct file";
  return "Embed";
}

export function VideoBlock({ moduleId, title }: { moduleId: string; title: string }) {
  const { state, setState } = useStore();
  const stored = state.videos?.[moduleId];
  const shipped = VIDEOS[moduleId];
  const raw =
    typeof stored === "string" && stored
      ? stored
      : typeof shipped === "string"
        ? shipped
        : "";
  const v = embedUrl(raw);
  const custom = typeof stored === "string" && stored.length > 0;
  const [draft, setDraft] = useState(raw);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    setDraft(raw);
    setFileError(false);
  }, [moduleId, raw]);

  const attach = (value: string) => {
    const next = value.trim();
    if (!next) {
      setError("Paste a lesson link first, or cancel to keep the slot empty.");
      return;
    }
    if (!embedUrl(next)) {
      setError(
        `That link is not a supported ${PROVIDERS} URL. Use a public https:// link from one of those providers.`
      );
      return;
    }
    setState((s) => ({ ...s, videos: { ...s.videos, [moduleId]: next } }));
    setDraft(next);
    setEditing(false);
    setError("");
  };

  const remove = () => {
    setState((s) => {
      const videos = { ...s.videos };
      delete videos[moduleId];
      return { ...s, videos };
    });
    setEditing(false);
    setError("");
  };

  if (!v || editing) {
    return (
      <div>
        {!v && !editing ? (
          <div
            className="rounded border p-5 text-center"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
          >
            <div
              className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-sm"
              style={{ borderColor: "var(--rule)", color: "var(--muted)", background: "var(--surface-2)" }}
              aria-hidden="true"
            >
              ▶
            </div>
            <b className="font-serif text-[1.05rem]">{title}</b>
            <p className="mx-auto mt-2 max-w-[46ch] text-[0.85rem]" style={{ color: "var(--muted)" }}>
              No lesson linked yet. Paste a {PROVIDERS} link to attach one. The link stays on this
              device and overrides any shipped default.
            </p>
          </div>
        ) : (
          <div
            className="rounded border p-4"
            style={{ background: "var(--surface)", borderColor: "var(--rule)" }}
          >
            <p className="text-[0.86rem]">
              {editing ? "Replace the lesson link for " : "Attach a lesson link for "}
              <b>{title}</b>.
            </p>
            {v ? (
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setError("");
                  setDraft(raw);
                }}
                className="mt-2 rounded border px-2.5 py-1.5 text-[0.8rem]"
                style={{ borderColor: "var(--rule)", background: "var(--surface-2)", color: "var(--muted)" }}
              >
                Cancel and keep current link
              </button>
            ) : null}
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <input
            type="url"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") attach(draft);
            }}
            placeholder="https://youtu.be/…"
            aria-label={"Video link for " + title}
            aria-invalid={!!error}
            aria-describedby={`video-help-${moduleId}`}
            className="min-w-0 flex-1 rounded border px-2.5 py-2 text-sm"
            style={{
              borderColor: error ? "var(--seal)" : "var(--rule)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          />
          <button
            type="button"
            onClick={() => attach(draft)}
            className="rounded border px-3 py-2 text-sm font-medium"
            style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "var(--on-accent)" }}
          >
            {editing ? "Save" : "Attach"}
          </button>
        </div>
        {error ? (
          <p
            id={`video-help-${moduleId}`}
            role="alert"
            className="mt-1 text-[0.82rem]"
            style={{ color: "var(--seal)" }}
          >
            {error}
          </p>
        ) : (
          <p
            id={`video-help-${moduleId}`}
            className="mt-1 text-[0.76rem]"
            style={{ color: "var(--muted)" }}
          >
            Accepted: public https:// links from YouTube, Vimeo or Google Drive, or a direct
            .mp4/.webm/.ogg file.
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
          fileError ? (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center" style={{ background: "var(--surface)" }}>
              <b className="font-serif text-[1.05rem]">{title}</b>
              <p className="max-w-[46ch] text-[0.85rem]" style={{ color: "var(--muted)" }}>
                The video file could not be loaded. Check that the URL is public and points directly
                at a media file, or attach a different link.
              </p>
              <a href={raw} target="_blank" rel="noreferrer" className="text-[0.82rem] underline">
                Open the source in a new tab
              </a>
            </div>
          ) : (
            <video
              controls
              playsInline
              preload="metadata"
              src={v.src}
              className="aspect-video w-full"
              onError={() => setFileError(true)}
            />
          )
        ) : (
          <iframe
            src={v.src}
            title={`${title} lesson video`}
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
            className="aspect-video w-full"
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="mr-auto text-[0.82rem]" style={{ color: "var(--muted)" }}>
          <span
            className="mr-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide"
            style={{ borderColor: "var(--rule)", color: "var(--muted)", background: "var(--surface)" }}
          >
            {providerLabel(raw)}
          </span>
          {title}
          {custom ? " · linked on this device" : " · shipped default"}
        </span>
        <a
          href={raw}
          target="_blank"
          rel="noreferrer"
          className="rounded border px-2.5 py-1.5 text-[0.82rem] no-underline"
          style={{ borderColor: "var(--rule)", background: "var(--surface)", color: "var(--text)" }}
        >
          Open source
        </a>
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
        {custom ? (
          <button
            type="button"
            onClick={remove}
            className="rounded border px-2.5 py-1.5 text-[0.82rem]"
            style={{ borderColor: "var(--rule)", background: "var(--surface)" }}
          >
            Remove
          </button>
        ) : null}
      </div>
      <p className="mt-1.5 text-[0.74rem]" style={{ color: "var(--muted)" }}>
        Player is sandboxed. It can run the lesson player, but cannot navigate this page or read its
        storage.
      </p>
    </div>
  );
}
