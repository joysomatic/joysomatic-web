import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // or 'hybrid'
  adapter: cloudflare({
    imageService: 'cloudflare',
    // Set platformProxy or disable session KV binding auto-generation if not bound to an actual KV namespace ID
    session: false, 
  }),
});