// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host is www (bare host 301s to www at the Cloudflare zone).
export default defineConfig({
  site: 'https://www.willgodfrey.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // The 404 is not a sitemap entry.
      filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404.html'),
    }),
  ],
});
