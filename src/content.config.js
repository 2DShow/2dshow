import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const episodes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/episodes', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    mp3_url: z.url(),
    duration: z.string(),
    length: z.number().int().positive(),
    guid: z.url(),
    enclosure_url: z.url(),
  }),
});

export const collections = { episodes };
