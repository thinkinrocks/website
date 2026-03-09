import { defineCollection, z } from "astro:content";

const initiatives = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const log = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    timestamp: z.string(),
    tags: z.array(z.string()),
    type: z.string(),
  }),
});

export const collections = {
  initiatives,
  log,
};

