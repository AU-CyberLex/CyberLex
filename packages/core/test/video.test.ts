import { test } from "node:test";
import assert from "node:assert/strict";
import { embedUrl } from "../src/video";

const YT = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0";

test("youtube links become nocookie embeds", () => {
  assert.deepEqual(embedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), {
    kind: "frame",
    src: YT,
  });
  assert.deepEqual(embedUrl("https://www.youtube.com/watch?t=42&v=dQw4w9WgXcQ"), {
    kind: "frame",
    src: YT,
  });
  assert.deepEqual(embedUrl("https://youtu.be/dQw4w9WgXcQ"), { kind: "frame", src: YT });
  assert.deepEqual(embedUrl("https://www.youtube.com/shorts/dQw4w9WgXcQ"), {
    kind: "frame",
    src: YT,
  });
  assert.deepEqual(embedUrl("https://www.youtube.com/embed/dQw4w9WgXcQ"), {
    kind: "frame",
    src: YT,
  });
});

test("vimeo, drive and direct media files", () => {
  assert.deepEqual(embedUrl("https://vimeo.com/76979871"), {
    kind: "frame",
    src: "https://player.vimeo.com/video/76979871",
  });
  assert.deepEqual(embedUrl("https://player.vimeo.com/video/76979871"), {
    kind: "frame",
    src: "https://player.vimeo.com/video/76979871",
  });
  assert.deepEqual(embedUrl("https://drive.google.com/file/d/1AbC_dEf/view"), {
    kind: "frame",
    src: "https://drive.google.com/file/d/1AbC_dEf/preview",
  });
  assert.deepEqual(embedUrl("https://cdn.example.edu/lecture-03.mp4"), {
    kind: "file",
    src: "https://cdn.example.edu/lecture-03.mp4",
  });
  assert.deepEqual(embedUrl("https://cdn.example.edu/lecture-03.mp4?token=abc"), {
    kind: "file",
    src: "https://cdn.example.edu/lecture-03.mp4?token=abc",
  });
});

test("generic https links are framed as-is", () => {
  assert.deepEqual(embedUrl("https://lectures.example.edu/embed?id=7"), {
    kind: "frame",
    src: "https://lectures.example.edu/embed?id=7",
  });
});

test("empty and unrecognised input returns null", () => {
  assert.equal(embedUrl(""), null);
  assert.equal(embedUrl("   "), null);
  assert.equal(embedUrl("not a url"), null);
  assert.equal(embedUrl("ftp://example.com/video.mp4"), null);
});
