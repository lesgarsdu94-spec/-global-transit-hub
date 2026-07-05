import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // S'assure que les ressources (JS, CSS, images) pointent vers la bonne racine en production
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Allège le build final pour GitHub Pages
  },
  server: {
    port: 3000,
    open: true
  }
});
