import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

export const CRAFT_PATH = "src/data/craft";
export const SHOWCASE_PATH = "src/data/showcase";

const craft = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${CRAFT_PATH}` }),
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
  loader: glob({ pattern: "**/*.md", base: `./${SHOWCASE_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: z.string(),
      pubDate: z.coerce.date(),
      heroImage: image().or(z.string()).optional(),
    }),
});

export const collections = { craft, showcase };