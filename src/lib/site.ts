import { getEntry } from 'astro:content';

// Global site config from content/site.md. Cached by Astro's content layer.
export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('content/site.md not found in the site collection');
  return entry.data;
}

export type SiteData = Awaited<ReturnType<typeof getSite>>;
