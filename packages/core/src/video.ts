export type Embed = { kind: "file" | "frame"; src: string };

/**
 * Normalises a lesson link into something embeddable: direct media files and
 * YouTube, Vimeo and Google Drive pages. Returns null for anything the player
 * cannot recognise.
 */
export function embedUrl(raw: string): Embed | null {
  const u = (raw || "").trim();
  if (!u) return null;
  if (/^https?:\/\/\S+\.(mp4|webm|ogg)(\?\S*)?$/i.test(u)) return { kind: "file", src: u };
  let m: RegExpMatchArray | null;
  if ((m = u.match(/(?:youtube\.com\/(?:watch\?(?:\S*&)?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{11})/)))
    return { kind: "frame", src: "https://www.youtube-nocookie.com/embed/" + m[1] + "?rel=0" };
  if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
    return { kind: "frame", src: "https://player.vimeo.com/video/" + m[1] };
  if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/)))
    return { kind: "frame", src: "https://drive.google.com/file/d/" + m[1] + "/preview" };
  if (/^https?:\/\//i.test(u)) return { kind: "frame", src: u };
  return null;
}
