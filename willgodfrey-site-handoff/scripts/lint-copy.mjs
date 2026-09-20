#!/usr/bin/env node
// Copy lint for content/. Fails the build on punctuation and vocabulary
// that Will does not allow, and on unfilled TODO markers in production.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = process.env.CONTENT_DIR || "content";
const PRODUCTION_BRANCH = process.env.PRODUCTION_BRANCH || "main";
const strictTodos =
  process.env.STRICT_TODOS === "1" ||
  process.env.CF_PAGES_BRANCH === PRODUCTION_BRANCH;

const BANNED = [
  "leading global expert", "serial entrepreneur", "thought leader",
  "icbuild", "r-squared", "r squared",
  "rsquared", "leverage", "utilize", "delve", "pivotal", "seamless",
  "robust", "game-changer", "game changer", "passionate",
];

const rules = [
  { name: "em dash", test: /\u2014/ },
  { name: "curly quote", test: /[\u2018\u2019\u201C\u201D]/ },
  { name: "en dash outside a numeric range", test: /(?<!\d)\u2013|\u2013(?!\d)/ },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
  });
}

let findings = 0;
for (const file of walk(CONTENT_DIR)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const where = `${file}:${i + 1}`;
    for (const r of rules) {
      if (r.test.test(line)) { console.error(`${where}  ${r.name}`); findings++; }
    }
    const lower = line.toLowerCase();
    for (const word of BANNED) {
      if (lower.includes(word)) { console.error(`${where}  banned: "${word}"`); findings++; }
    }
    if (strictTodos && line.includes("[[TODO")) {
      console.error(`${where}  unfilled TODO in a production build`); findings++;
    }
  });
}

if (findings) {
  console.error(`\ncopy lint failed: ${findings} finding(s)`);
  process.exit(1);
}
console.log(`copy lint passed${strictTodos ? " (strict TODO mode)" : ""}`);
