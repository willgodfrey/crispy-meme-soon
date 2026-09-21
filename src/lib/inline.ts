// Render inline markdown inside a paragraph: [label](url) links and
// [[TODO: ...]] placeholder chips. Content is trusted (our own files); text
// segments are still escaped.
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function inlineHtml(text: string): string {
  let out = '';
  let last = 0;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    out += esc(text.slice(last, m.index));
    out += `<a href="${esc(m[2])}">${esc(m[1])}</a>`;
    last = re.lastIndex;
  }
  out += esc(text.slice(last));
  return out.replace(/\[\[TODO[^\]]*\]\]/g, '<span class="todo">$&</span>');
}
