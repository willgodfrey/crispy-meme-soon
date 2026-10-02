import type { APIRoute } from 'astro';
import { common, home, practice, commissions, work, about, contact } from '../lib/content';

export const GET: APIRoute = ({ site }) => {
  const pages = [home, practice, commissions, work, about, contact];
  const text = [
    `# ${common.siteName}`,
    '',
    `> ${home.seo.description}`,
    '',
    ...pages.map((page) => `- [${page.seo.title}](${new URL(page.route, site)}): ${page.seo.description}`),
    '',
    `[${common.email}](${common.emailHref})`,
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
