/**
 * Build the self-contained Phase-1 demo pages in flow/.
 *
 *   node flow/build.mjs
 *
 * Source fragments live in flow/src/. The output files are standalone HTML:
 * styles, shared demo state and page script are inlined so a single file can be
 * sent to a reviewer and opened without a server.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "src");

const shell = readFileSync(join(src, "shell.html"), "utf8");
const styles = readFileSync(join(src, "styles.css"), "utf8");
const shared = readFileSync(join(src, "shared.js"), "utf8");

const pages = [
  {
    file: "index.html",
    body: "index.body.html",
    title: "CyberLex · Phase-1 demo hub · P7",
    description:
      "Role-by-role demo for CyberLex Phase-1: learner, faculty, admin and reviewer views, plus the end-to-end node workflow.",
    page: "index",
    roleLabel: "Demo hub",
    roleClass: "navy",
    wrapClass: "",
  },
  {
    file: "client.html",
    body: "client.body.html",
    title: "Learner / client view · CyberLex Phase-1",
    description:
      "What a learner sees and can do: modules, case cards, videos, progress, points, badges and a device-local leaderboard.",
    page: "client",
    roleLabel: "Learner view",
    roleClass: "",
    wrapClass: "",
  },
  {
    file: "faculty.html",
    body: "faculty.body.html",
    title: "Faculty / instructor view · CyberLex Phase-1",
    description:
      "What faculty sees and can do: attach lesson videos, check module readiness, run the lab in class and review a local cohort snapshot.",
    page: "faculty",
    roleLabel: "Faculty view",
    roleClass: "amber",
    wrapClass: "",
  },
  {
    file: "admin.html",
    body: "admin.body.html",
    title: "Administrator view · CyberLex Phase-1",
    description:
      "What an administrator sees and can do: video registry health, local progress import/export, gamification rules and the role/permission audit.",
    page: "admin",
    roleLabel: "Admin view",
    roleClass: "ox",
    wrapClass: "",
  },
  {
    file: "reviewer.html",
    body: "reviewer.body.html",
    title: "Reviewer / team lead view · CyberLex Phase-1",
    description:
      "The P7 acceptance dashboard: scope, test matrix, demo script and sign-off for the team leader.",
    page: "reviewer",
    roleLabel: "Reviewer view",
    roleClass: "navy",
    wrapClass: "narrow",
  },
  {
    file: "workflow.html",
    body: "workflow.body.html",
    title: "End-to-end workflow · CyberLex Phase-1",
    description:
      "A node-style map of the learner, faculty and admin journey from first visit to progress export and sign-off.",
    page: "workflow",
    roleLabel: "Workflow",
    roleClass: "navy",
    wrapClass: "wide",
  },
];

for (const page of pages) {
  const body = readFileSync(join(src, page.body), "utf8");
  const html = shell
    .replaceAll("{{TITLE}}", page.title)
    .replaceAll("{{DESCRIPTION}}", page.description)
    .replaceAll("{{STYLES}}", styles)
    .replaceAll("{{SHARED}}", shared)
    .replaceAll("{{BODY}}", body)
    .replaceAll("{{PAGE}}", page.page)
    .replaceAll("{{ROLE_LABEL}}", page.roleLabel)
    .replaceAll("{{ROLE_CLASS}}", page.roleClass)
    .replaceAll("{{WRAP_CLASS}}", page.wrapClass);
  writeFileSync(join(here, page.file), html, "utf8");
  console.log("wrote", page.file, "(" + html.length.toLocaleString() + " bytes)");
}
