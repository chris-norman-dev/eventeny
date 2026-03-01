import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chris-norman-dev.github.io',
  base: '/eventeny/',
  build: {
    format: 'file',
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',
        },
      },
    },
    css: {
      transformer: 'lightningcss',
    },
  },
});
