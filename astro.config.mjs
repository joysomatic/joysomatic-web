import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://joysomatic.com',
  trailingSlash: 'always', // or 'never'
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'esbuild',
    },
  },
});