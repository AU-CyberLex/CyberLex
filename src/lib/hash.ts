export async function sha256Hex(text: string): Promise<string> {
  if (typeof window === "undefined" || !(window.crypto as Crypto | undefined)?.subtle)
    return "sha-256 unavailable in this context";
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, "0")).join("");
  } catch {
    return "sha-256 unavailable in this context";
  }
}
