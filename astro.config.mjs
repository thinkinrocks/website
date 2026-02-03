// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server", // Server mode with selective prerendering
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: vercel({
    imageService: true,
    devImageService: "sharp",
  }),
});
