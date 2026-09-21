// Rehype plugin: turn the content convention "Link: label (/url/)" (and
// "Links: a (/x/) | b (/y/)") in a paragraph into real anchors. Keeps the
// visible labels; drops the "Link:" marker and the raw URL text.

function textOf(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
}

function walk(node, fn) {
  if (node.children) {
    for (const child of node.children) {
      if (child.type === 'element') fn(child);
      walk(child, fn);
    }
  }
}

export default function rehypeLinks() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.tagName !== 'p') return;
      const text = textOf(node).trim();
      const m = text.match(/^Links?:\s*(.+)$/s);
      if (!m) return;
      const links = m[1]
        .split('|')
        .map((s) => s.trim())
        .map((s) => s.match(/^(.*?)\s*\((\/[^)]*)\)\s*$/))
        .filter(Boolean);
      if (!links.length) return;
      const children = [];
      links.forEach((lm, i) => {
        if (i > 0) children.push({ type: 'text', value: ' ' });
        children.push({
          type: 'element',
          tagName: 'a',
          properties: { href: lm[2], className: ['pill'] },
          children: [{ type: 'text', value: lm[1].trim() }],
        });
      });
      node.children = children;
      node.properties = { ...(node.properties || {}), className: ['link-row'] };
    });
  };
}
