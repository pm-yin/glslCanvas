import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

export const CRAFT_PATH = "src/data/craft";

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

export const collections = { craft };