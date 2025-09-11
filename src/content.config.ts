import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

export const DEMOS_PATH = "src/data/demos";
export const SHOWCASE_PATH = "src/data/showcase";

const demos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${DEMOS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().or(z.string()).optional(),
      shader: z.object({
        src: z.string(),
        textures: z.string().optional(),
      }).optional(),
    }),
});

const showcase = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `./${SHOWCASE_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      creator: z.string(),
      pubDate: z.coerce.date(),
      heroImage: image().or(z.string()).optional(),
      demoUrl: z.string().url().optional(),
    }),
});

export const collections = { demos, showcase };