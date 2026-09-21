// Text-diff check: proves the visible text in each built page's <main> matches
// the words in its content/ markdown body. Guards the "no copy in components"
// and "content is the source of truth" invariants. Run after `astro build`.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const PAGES = [
  { content: 'home.md', html: 'index.html' },
  { content: 'venture-architect.md', html: 'venture-architect/index.html' },
  { content: 'work.md', html: 'work/index.html' },
  { content: 'about.md', html: 'about/index.html' },
  { content: 'contact.md', html: 'contact/index.html' },
];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(?:39|x27);/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const norm = (s) => decode(s).replace(/\s+/g, ' ').trim();

// Visible text inside <main>, minus design-only chrome marked data-diff-skip.
function htmlText(file) {
  const html = readFileSync(join(root, 'dist', file), 'utf8');
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) throw new Error(`no <main> in ${file}`);
  const stripped = m[1].replace(/<(\w+)[^>]*\sdata-diff-skip[^>]*>[\s\S]*?<\/\1>/g, ' ');
  return norm(stripped.replace(/<[^>]*>/g, ' '));
}

// Visible text from a markdown body (frontmatter stripped, syntax removed).
function mdText(file) {
  let src = readFileSync(join(root, 'content', file), 'utf8');
  src = src.replace(/^---\n[\s\S]*?\n---\n/, ''); // frontmatter
  const out = [];
  for (const raw of src.split('\n')) {
    let line = raw.replace(/<!--[\s\S]*?-->/g, '').trim();
    if (!line) continue;
    if (/^Links?:/.test(line)) {
      // "Link: label (/url/) | ..." renders as anchors showing only the labels.
      const labels = line
        .replace(/^Links?:/, '')
        .split('|')
        .map((s) => s.replace(/\(\/[^)]*\)/g, '').trim())
        .filter(Boolean);
      out.push(labels.join(' '));
      continue;
    }
    if (/^\|/.test(line)) {
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-+:?$/.test(c) || c === '')) {
        if (cells.some((c) => /-/.test(c))) continue; // separator row
      }
      out.push(cells.filter(Boolean).join(' '));
      continue;
    }
    line = line.replace(/^#{1,6}\s+/, ''); // headings
    line = line.replace(/^(?:[-*]|\d+\.)\s+/, ''); // list markers
    line = line.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); // links -> text
    line = line.replace(/\*\*|\*|`/g, ''); // emphasis/code
    out.push(line);
  }
  return norm(out.join(' '));
}

let failures = 0;
for (const p of PAGES) {
  const a = mdText(p.content);
  const b = htmlText(p.html);
  if (a === b) {
    console.log(`ok    ${p.content}`);
    continue;
  }
  failures++;
  // Find and show the first divergence.
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  console.error(`DIFF  ${p.content} at char ${i}`);
  console.error(`  content: ...${a.slice(Math.max(0, i - 40), i + 60)}...`);
  console.error(`  built:   ...${b.slice(Math.max(0, i - 40), i + 60)}...`);
}

if (failures) {
  console.error(`\ntext diff: ${failures} page(s) differ`);
  process.exit(1);
}
console.log('\ntext diff: all pages match content');
