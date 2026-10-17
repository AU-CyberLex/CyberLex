import { test } from "node:test";
import assert from "node:assert/strict";
import { sha256Hex } from "../src/hash";

test("known vector: empty string", async () => {
  assert.equal(
    await sha256Hex(""),
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  );
});

test("known vector: abc", async () => {
  assert.equal(
    await sha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
  );
});

test("non-ASCII input still yields a 64-char hex digest", async () => {
  const h = await sha256Hex("§63 BSA — certificate");
  assert.equal(typeof h, "string");
  assert.match(h ?? "", /^[0-9a-f]{64}$/);
});

test("returns null when crypto.subtle is unavailable", async (t) => {
  const desc = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  if (!desc?.configurable) {
    t.skip("globalThis.crypto is not configurable in this runtime");
    return;
  }
  Object.defineProperty(globalThis, "crypto", { value: undefined, configurable: true });
  try {
    assert.equal(await sha256Hex("anything"), null);
  } finally {
    Object.defineProperty(globalThis, "crypto", desc);
  }
});
