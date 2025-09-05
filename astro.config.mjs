// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://Yuan0100.github.io",
  base: "cmh-glslcanvas",
  integrations: [react(), mdx()],
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Noto Sans TC",
      cssVariable: "--font-noto-sans-tc",
    }, {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist-sans"
    }, {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
    }]
  }
});