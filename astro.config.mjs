// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host is www (bare host 301s to www at the Cloudflare zone).
export default defineConfig({
  site: 'https://www.willgodfrey.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  // SmartyPants would turn straight quotes into curly quotes and -- into dashes,
  // both banned by the copy rules. Keep GFM (tables) but leave text as authored.
  markdown: { smartypants: false },
});
