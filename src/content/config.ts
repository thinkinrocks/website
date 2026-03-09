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

const hardware = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()).optional(),
    imageCaptions: z.array(z.string()).optional(),
    categories: z.array(z.string()),
    status: z.enum(["available", "coming-soon", "maintenance"]),
    availableSince: z.string().optional(),
    isNew: z.boolean().optional(),
    related: z.array(z.string()),
  }),
});

export const collections = {
  initiatives,
  log,
  hardware,
};

