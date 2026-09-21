import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The five page files. `site.md` is excluded; it is global config, not a page.
const pages = defineCollection({
  loader: glob({ pattern: ['*.md', '!site.md'], base: './content' }),
  schema: z.object({
    sheet: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    published: z.string().optional(),
    revised: z.string().optional(),
    revision: z.number().optional(),
    displayDate: z.string().optional(),
    image: z.string().optional(),
    openingImage: z.string().optional(),
  }),
});

// Global strings, navigation, metadata, structured-data seed. Single entry: `site`.
const image = z.object({ alt: z.string(), caption: z.string().optional() });
const site = defineCollection({
  loader: glob({ pattern: 'site.md', base: './content' }),
  schema: z.object({
    siteName: z.string(),
    title: z.string(),
    canonicalHost: z.string().url(),
    email: z.string(),
    linkedin: z.string().url(),
    location: z.string(),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    meta: z.record(
      z.object({ title: z.string(), description: z.string().optional() })
    ),
    share: z.object({ title: z.string(), description: z.string() }),
    person: z.object({
      name: z.string(),
      jobTitle: z.string(),
      alumniOf: z.string(),
      knowsAbout: z.array(z.string()),
    }),
    images: z.record(image),
    verification: z.string().optional(),
    closingBlock: z.string(),
    closingLink: z.string(),
    titleBlock: z.object({
      practice: z.string(),
      labels: z.object({
        sheet: z.string(),
        date: z.string(),
        revision: z.string(),
        contact: z.string(),
        elsewhere: z.string(),
      }),
      elsewhere: z.string(),
    }),
    notFound: z.object({
      headline: z.string(),
      body: z.string(),
      links: z.array(z.object({ label: z.string(), href: z.string() })),
    }),
    bios: z.object({ short: z.string(), long: z.string() }),
  }),
});

export const collections = { pages, site };
