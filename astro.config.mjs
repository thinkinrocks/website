// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [{
        provider: fontProviders.google(),
        name: "Noto Sans",
        cssVariable: "--font-noto-sans",
      },
      {
        provider: fontProviders.google(),
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
      },
      {
        provider: fontProviders.google(),
        name: "Alkatra",
        cssVariable: "--font-alkatra",
      }
    ],
  },
  integrations: [react()],
});