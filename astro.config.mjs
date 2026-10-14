// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://2dshow.dan.kim',
  // Keep the podcast's original dated .html episode URLs.
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
});
