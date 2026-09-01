import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server", // or "hybrid"
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});