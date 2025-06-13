// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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