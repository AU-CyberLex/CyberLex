/**
 * Canonical shapes for the teaching content. Every data file is annotated with
 * these types, so the compiler — and the content test in ../test — catches a
 * malformed record before it can reach a lesson.
 */

export type QuizQuestion = {
  /** The prompt. */
  q: string;
  /** Answer options. */
  a: string[];
  /** Index of the correct option in `a`. */
  c: number;
  /** Explanation revealed after answering. */
  e: string;
};

export type Module = {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  video: string;
  /** Doctrine body, authored as a small HTML fragment (h3/p/ul/table). */
  body: string;
  quiz: QuizQuestion[];
};

export type SimOption = {
  /** Option text. */
  t: string;
  /** Score delta, −2..2. */
  s: number;
  /** Consequence feedback. */
  f: string;
};

export type SimStep = {
  /** Step narrative. */
  n: string;
  o: SimOption[];
};

export type Sim = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  steps: SimStep[];
};

export type CaseAuthority = {
  /** Case name. */
  n: string;
  /** Citation. */
  c: string;
  /** Holding. */
  h: string;
};

export type VolSource = {
  /** Source name. */
  t: string;
  /** Why it ranks where it ranks. */
  e: string;
};

export type SigFile = {
  /** File name as seized. */
  n: string;
  /** First sixteen bytes as hex. */
  hex: string;
  /** The same bytes rendered as ASCII. */
  asc: string;
  /** What the header actually is. */
  v: string;
  /** Whether the header matches the extension. */
  ok: boolean;
  /** Examiner's explanation. */
  e: string;
};

export type CertScenario = {
  /** The certificate scenario. */
  t: string;
  /** Whether the record gets in. */
  ok: boolean;
  /** Why. */
  e: string;
};

export type ToolCard = {
  /** Tool name. */
  n: string;
  /** Category. */
  c: string;
  /** What it does. */
  d: string;
  /** What it proves. */
  p: string;
  /** Its limits. */
  l: string;
};
