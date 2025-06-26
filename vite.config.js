// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'html', // if your index.html lives in /html/index.html
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});