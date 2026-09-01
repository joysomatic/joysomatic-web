import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Prevents Vite from throwing deprecation warnings for legacy plugins
      noDiscovery: false,
    },
  },

  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
});