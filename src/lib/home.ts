// Parse content/home.md into its named blocks so the home page can lay each one
// out deliberately. Block delimiters look like: <!-- block: hero -->
// or <!-- block: stages | numbered: true -->. Words are never changed here.

export interface LinkItem {
  label: string;
  href: string;
}
export type Node =
  | { type: 'h1' | 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'links'; links: LinkItem[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface Block {
  name: string;
  opts: Record<string, string>;
  nodes: Node[];
}

function parseLinks(rest: string): LinkItem[] {
  return rest
    .split('|')
    .map((s) => s.trim())
    .map((s) => s.match(/^(.*?)\s*\((\/[^)]*)\)\s*$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => ({ label: m[1].trim(), href: m[2] }));
}

function parseNodes(body: string): Node[] {
  const lines = body.split('\n');
  const nodes: Node[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) {
      nodes.push({ type: 'p', text: para.join(' ').trim() });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^#\s+/.test(line)) {
      flush();
      nodes.push({ type: 'h1', text: line.replace(/^#\s+/, '') });
    } else if (/^##\s+/.test(line)) {
      flush();
      nodes.push({ type: 'h2', text: line.replace(/^##\s+/, '') });
    } else if (/^Links?:/.test(line)) {
      flush();
      nodes.push({ type: 'links', links: parseLinks(line.replace(/^Links?:/, '')) });
    } else if (/^\|/.test(line)) {
      flush();
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        const cells = lines[i].split('|').slice(1, -1).map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      i--;
      const [head, ...rest] = rows;
      nodes.push({ type: 'table', head, rows: rest });
    } else if (/^([-*]|\d+\.)\s+/.test(line)) {
      flush();
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].trim().replace(/^([-*]|\d+\.)\s+/, ''));
        i++;
      }
      i--;
      nodes.push({ type: 'list', ordered, items });
    } else {
      para.push(line);
    }
  }
  flush();
  return nodes;
}

export function parseHome(body: string): Block[] {
  const re = /<!--\s*block:\s*([^|>]+?)(?:\s*\|\s*([^>]*?))?\s*-->/g;
  const markers: { name: string; opts: Record<string, string>; start: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const opts: Record<string, string> = {};
    (m[2] ?? '')
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((pair) => {
        const [k, ...v] = pair.split(':');
        opts[k.trim()] = v.join(':').trim();
      });
    markers.push({ name: m[1].trim(), opts, start: re.lastIndex });
  }
  return markers.map((mk, idx) => {
    const end = idx + 1 < markers.length ? markers[idx + 1].start : body.length;
    const raw = body.slice(mk.start, end).replace(/<!--[\s\S]*?-->/g, '');
    return { name: mk.name, opts: mk.opts, nodes: parseNodes(raw) };
  });
}
