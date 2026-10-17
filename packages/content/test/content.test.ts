import { test } from "node:test";
import assert from "node:assert/strict";
import { MODULES } from "../src/modules";
import { SIMS } from "../src/sims";
import { CASES } from "../src/cases";
import { VOL } from "../src/vol";
import { SIGS } from "../src/sigs";
import { COC } from "../src/coc";
import { CERTS } from "../src/certs";
import { TOOLS } from "../src/tools";
import { VIDEOS } from "../src/videos";

test("nine modules, unique ids, three well-formed drill items each", () => {
  assert.equal(MODULES.length, 9);
  assert.equal(new Set(MODULES.map((m) => m.id)).size, MODULES.length);
  for (const m of MODULES) {
    for (const field of ["id", "tag", "title", "blurb", "body"] as const) {
      assert.ok(m[field].length > 0, `${m.id}: ${field} must not be empty`);
    }
    assert.equal(m.quiz.length, 3, `${m.id}: exactly three quiz items`);
    m.quiz.forEach((q, i) => {
      assert.ok(
        q.q.length > 0 && q.e.length > 0,
        `${m.id} quiz ${i + 1}: prompt and explanation required`,
      );
      assert.ok(q.a.length >= 2, `${m.id} quiz ${i + 1}: at least two options`);
      assert.ok(
        Number.isInteger(q.c) && q.c >= 0 && q.c < q.a.length,
        `${m.id} quiz ${i + 1}: answer index out of range`,
      );
    });
  }
});

test("three branching investigations with four scored steps each", () => {
  assert.equal(SIMS.length, 3);
  assert.equal(new Set(SIMS.map((s) => s.id)).size, SIMS.length);
  for (const s of SIMS) {
    assert.equal(s.steps.length, 4, `${s.id}: four decision points`);
    s.steps.forEach((step, i) => {
      assert.ok(step.n.length > 0, `${s.id} step ${i + 1}: narrative required`);
      assert.ok(step.o.length >= 2, `${s.id} step ${i + 1}: at least two options`);
      for (const o of step.o) {
        assert.ok(
          o.t.length > 0 && o.f.length > 0,
          `${s.id} step ${i + 1}: option text and feedback required`,
        );
        assert.ok(
          Number.isInteger(o.s) && o.s >= -2 && o.s <= 2,
          `${s.id} step ${i + 1}: score delta out of range`,
        );
      }
    });
  }
});

test("twelve landmark authorities, fully cited", () => {
  assert.equal(CASES.length, 12);
  for (const c of CASES) {
    assert.ok(c.n.length > 0 && c.c.length > 0 && c.h.length > 0);
  }
});

test("lab benches have their expected data", () => {
  assert.equal(VOL.length, 8, "RFC 3227 order");
  assert.equal(COC.length, 8, "chain of custody steps");
  assert.equal(SIGS.length, 5, "seized files");
  assert.equal(SIGS.filter((s) => s.ok).length, 2, "exactly two headers match their extensions");
  assert.equal(CERTS.length, 5, "certificate scenarios");
  assert.equal(TOOLS.length, 8, "toolkit cards");
});

test("video slots are strings", () => {
  for (const [id, url] of Object.entries(VIDEOS)) {
    assert.equal(typeof url, "string", `${id} video slot`);
  }
});
