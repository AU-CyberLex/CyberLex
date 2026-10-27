export type Embed = { kind: "file" | "frame"; src: string };

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_HASH = /^[A-Za-z0-9]+$/;
const DRIVE_ID = /^[A-Za-z0-9_-]+$/;

/**
 * Parses only absolute HTTPS URLs. Credentials are rejected so a pasted link
 * cannot smuggle a user name or password into an exported progress file.
 */
function parseHttps(raw: unknown): URL | null {
  if (typeof raw !== "string") return null;
  try {
    const url = new URL(raw.trim());
    if (url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    return url;
  } catch {
    return null;
  }
}

function hostIs(url: URL, domain: string): boolean {
  return url.hostname === domain || url.hostname.endsWith("." + domain);
}

function pathParts(url: URL): string[] {
  return url.pathname.split("/").filter(Boolean);
}

function youtubeEmbed(url: URL): Embed | null {
  if (!hostIs(url, "youtube.com") && !hostIs(url, "youtube-nocookie.com") && !hostIs(url, "youtu.be")) {
    return null;
  }

  const parts = pathParts(url);
  let id: string | null | undefined;
  if (hostIs(url, "youtu.be")) {
    id = parts[0];
  } else if (parts[0] === "watch") {
    id = url.searchParams.get("v");
  } else if (["embed", "live", "shorts", "v"].includes(parts[0])) {
    id = parts[1];
  }

  if (!id || !YOUTUBE_ID.test(id)) return null;
  return {
    kind: "frame",
    src: "https://www.youtube-nocookie.com/embed/" + id + "?rel=0",
  };
}

function vimeoEmbed(url: URL): Embed | null {
  if (!hostIs(url, "vimeo.com")) return null;
  const parts = pathParts(url);
  let id: string | undefined;
  let pathHash: string | undefined;

  if (parts[0] === "video") {
    id = parts[1];
    pathHash = parts[2];
  } else {
    id = parts[0];
    pathHash = parts[1];
  }

  if (!id || !/^\d+$/.test(id)) return null;
  if (pathHash && !VIMEO_HASH.test(pathHash)) return null;

  const queryHash = url.searchParams.get("h");
  const hash = pathHash || (queryHash && VIMEO_HASH.test(queryHash) ? queryHash : undefined);
  return {
    kind: "frame",
    src: "https://player.vimeo.com/video/" + id + (hash ? "?h=" + hash : ""),
  };
}

function driveEmbed(url: URL): Embed | null {
  if (!hostIs(url, "drive.google.com")) return null;
  const parts = pathParts(url);
  let id: string | null | undefined;

  if (parts[0] === "file" && parts[1] === "d") id = parts[2];
  else if (parts[0] === "open") id = url.searchParams.get("id");

  if (!id || !DRIVE_ID.test(id)) return null;
  return {
    kind: "frame",
    src: "https://drive.google.com/file/d/" + id + "/preview",
  };
}

function directFile(url: URL): Embed | null {
  if (!/\.(mp4|webm|ogg)$/i.test(url.pathname)) return null;
  return { kind: "file", src: url.href };
}

/**
 * Normalises a lesson link into something embeddable. Only the providers the
 * product actually supports are accepted: YouTube, Vimeo, Google Drive share
 * links and direct HTTPS media files. Anything else is rejected instead of
 * being framed as an arbitrary third-party page.
 */
export function embedUrl(raw: string): Embed | null {
  const url = parseHttps(raw);
  if (!url) return null;
  return directFile(url) || youtubeEmbed(url) || vimeoEmbed(url) || driveEmbed(url);
}
