// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // GitHub Pages: set `site` to your Pages URL. If this is a *project* page
  // (username.github.io/repo-name, not a custom domain or user/org root page),
  // also set base: '/repo-name'.
  site: 'https://jankuchnia.github.io/sliwa-fh',
  base: '/sliwa-fh',

  server: { port: 5173, open: true },

  vite: {
    plugins: [tailwindcss()]
  }
});