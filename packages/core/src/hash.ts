/**
 * SHA-256 of a UTF-8 string as a lowercase hex digest.
 *
 * Returns null when the runtime cannot produce a digest — typically a browser
 * on an insecure context (http://), where crypto.subtle is withheld. Callers
 * must treat null as "unavailable", never as a match: two nulls are not an
 * integrity result.
 */
export async function sha256Hex(text: string): Promise<string | null> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return null;
  try {
    const buf = await subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return null;
  }
}
